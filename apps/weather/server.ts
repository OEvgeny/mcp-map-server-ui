/**
 * Weather MCP Server
 *
 * Provides tools for:
 * - show-weather: Display a weather dashboard for a location
 * - compare-weather: Side-by-side weather comparison for multiple locations
 * - uzir-weather-stream: Progressive weather analysis stream
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  CallToolResult,
  ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
  RESOURCE_URI_META_KEY,
} from "@modelcontextprotocol/ext-apps/server";
import { randomUUID } from "crypto";

const log = {
  tool: (name: string, input: Record<string, unknown>) =>
    console.log(`[TOOL] ${name} called`, Object.keys(input).length ? JSON.stringify(input) : ""),
  done: (name: string, summary?: string) =>
    console.log(`[TOOL] ${name} done${summary ? ` — ${summary}` : ""}`),
  error: (name: string, err: unknown) =>
    console.error(`[ERROR] ${name} failed:`, err instanceof Error ? err.stack ?? err.message : err),
};

const DIST_DIR = import.meta.filename.endsWith(".ts")
  ? path.join(import.meta.dirname, "dist")
  : import.meta.dirname;
const WEATHER_RESOURCE_URI = "ui://weather-dashboard/weather-app.html";

// Nominatim API response type
interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  boundingbox: [string, string, string, string];
  class: string;
  type: string;
  importance: number;
}

// Open-Meteo API response types
interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    uv_index_max: number[];
  };
}

// Rate limiting for Nominatim (1 request per second per their usage policy)
let lastNominatimRequest = 0;
const NOMINATIM_RATE_LIMIT_MS = 1100;

function getWeatherCondition(weatherCode: number): string {
  if (weatherCode === 0) return "Clear Sky";
  if (weatherCode === 1) return "Mainly Clear";
  if (weatherCode === 2) return "Partly Cloudy";
  if (weatherCode === 3) return "Overcast";
  if (weatherCode <= 48) return "Foggy";
  if (weatherCode <= 57) return "Drizzle";
  if (weatherCode <= 67) return "Rain";
  if (weatherCode <= 77) return "Snow";
  if (weatherCode <= 82) return "Rain Showers";
  if (weatherCode <= 86) return "Snow Showers";
  if (weatherCode <= 99) return "Thunderstorm";
  return "Unknown";
}

async function fetchWeatherData(
  latitude: number,
  longitude: number,
): Promise<OpenMeteoResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,weather_code,uv_index_max",
    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
  );

  if (!response.ok) {
    throw new Error(
      `Open-Meteo API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<OpenMeteoResponse>;
}

async function geocodeWithNominatim(query: string): Promise<NominatimResult[]> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastNominatimRequest;
  if (timeSinceLastRequest < NOMINATIM_RATE_LIMIT_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, NOMINATIM_RATE_LIMIT_MS - timeSinceLastRequest),
    );
  }
  lastNominatimRequest = Date.now();

  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: "5",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params}`,
    {
      headers: {
        "User-Agent":
          "MCP-WeatherDashboard-Example/1.0 (https://github.com/modelcontextprotocol)",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Nominatim API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<NominatimResult[]>;
}

export function createServer(): McpServer {
  const server = new McpServer(
    {
      name: "Weather Dashboard Server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: { listChanged: true },
        resources: { listChanged: true },
      },
    }
  );

  const weatherCspMeta = {
    ui: {
      csp: {
        connectDomains: ["https://api.open-meteo.com"],
        resourceDomains: ["https://api.open-meteo.com"],
      },
    },
  };

  registerAppResource(
    server,
    WEATHER_RESOURCE_URI,
    WEATHER_RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => {
      try {
        const html = await fs.readFile(
          path.join(DIST_DIR, "weather-app.html"),
          "utf-8",
        );
        return {
          contents: [
            {
              uri: WEATHER_RESOURCE_URI,
              mimeType: RESOURCE_MIME_TYPE,
              text: html,
              _meta: weatherCspMeta,
            },
          ],
        };
      } catch (err) {
        log.error("resource:weather-app.html", err);
        throw err;
      }
    },
  );

  registerAppTool(
    server,
    "show-weather",
    {
      title: "Show Weather",
      description:
        "Display a weather dashboard with current conditions and 7-day forecast for a location. Accepts either coordinates or a city name.",
      inputSchema: {
        location: z.string().optional().describe(
          "City name or place to get weather for (e.g., 'Paris', 'New York'). If provided, coordinates are ignored.",
        ),
        latitude: z.number().optional().describe(
          "Latitude of the location (-90 to 90). Used if location is not provided.",
        ),
        longitude: z.number().optional().describe(
          "Longitude of the location (-180 to 180). Used if location is not provided.",
        ),
      },
      _meta: { [RESOURCE_URI_META_KEY]: WEATHER_RESOURCE_URI },
    },
    async ({ location, latitude, longitude }): Promise<CallToolResult> => {
      log.tool("show-weather", { location, latitude, longitude });
      try {
        let lat: number;
        let lon: number;
        let locationName: string;

        if (location) {
          const geocodeResults = await geocodeWithNominatim(location);
          if (geocodeResults.length === 0) {
            return {
              content: [{ type: "text", text: `Could not find location: ${location}` }],
              isError: true,
            };
          }
          const firstResult = geocodeResults[0];
          lat = parseFloat(firstResult.lat);
          lon = parseFloat(firstResult.lon);
          locationName = firstResult.display_name.split(",")[0];
        } else if (latitude !== undefined && longitude !== undefined) {
          lat = latitude;
          lon = longitude;
          locationName = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
        } else {
          return {
            content: [
              {
                type: "text",
                text: "Please provide either a location name or coordinates (latitude and longitude)",
              },
            ],
            isError: true,
          };
        }

        const weatherData = await fetchWeatherData(lat, lon);

        const formattedData = {
          location: locationName,
          latitude: lat,
          longitude: lon,
          current: {
            temperature: weatherData.current.temperature_2m,
            condition: getWeatherCondition(weatherData.current.weather_code),
            feelsLike: weatherData.current.apparent_temperature,
            humidity: weatherData.current.relative_humidity_2m,
            windSpeed: weatherData.current.wind_speed_10m,
            uvIndex: weatherData.daily.uv_index_max[0],
            weatherCode: weatherData.current.weather_code,
          },
          forecast: weatherData.daily.time.map((date, index) => ({
            date,
            tempMax: weatherData.daily.temperature_2m_max[index],
            tempMin: weatherData.daily.temperature_2m_min[index],
            weatherCode: weatherData.daily.weather_code[index],
            condition: getWeatherCondition(weatherData.daily.weather_code[index]),
          })),
        };

        log.done("show-weather", `${locationName} ${formattedData.current.temperature.toFixed(1)}°C`);
        return {
          content: [
            {
              type: "text",
              text: `Showing weather for ${locationName}: ${formattedData.current.temperature.toFixed(1)}°C, ${formattedData.current.condition}`,
            },
          ],
          _meta: {
            viewUUID: randomUUID(),
            weatherData: formattedData,
          },
        };
      } catch (error) {
        log.error("show-weather", error);
        return {
          content: [
            {
              type: "text",
              text: `Weather error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  registerAppTool(
    server,
    "compare-weather",
    {
      title: "Compare Weather",
      description:
        "Compare weather conditions for 2-4 locations side-by-side. Perfect for comparing vacation destinations, planning travel, or checking weather across different cities.",
      inputSchema: {
        locations: z
          .array(z.string())
          .min(2)
          .max(4)
          .describe(
            "List of 2-4 city names or places to compare (e.g., ['Paris', 'Tokyo', 'New York'])",
          ),
      },
      _meta: {
        [RESOURCE_URI_META_KEY]: WEATHER_RESOURCE_URI,
        ui: {
          displayMode: "fullscreen",
        },
      },
    },
    async ({ locations }): Promise<CallToolResult> => {
      log.tool("compare-weather", { locations });
      try {
        if (locations.length < 2 || locations.length > 4) {
          return {
            content: [{ type: "text", text: "Please provide between 2 and 4 locations to compare." }],
            isError: true,
          };
        }

        const weatherPromises = locations.map(async (location) => {
          const geocodeResults = await geocodeWithNominatim(location);
          if (geocodeResults.length === 0) {
            throw new Error(`Could not find location: ${location}`);
          }

          const firstResult = geocodeResults[0];
          const lat = parseFloat(firstResult.lat);
          const lon = parseFloat(firstResult.lon);
          const locationName = firstResult.display_name.split(",")[0];

          const weatherData = await fetchWeatherData(lat, lon);

          return {
            location: locationName,
            latitude: lat,
            longitude: lon,
            current: {
              temperature: weatherData.current.temperature_2m,
              condition: getWeatherCondition(weatherData.current.weather_code),
              feelsLike: weatherData.current.apparent_temperature,
              humidity: weatherData.current.relative_humidity_2m,
              windSpeed: weatherData.current.wind_speed_10m,
              uvIndex: weatherData.daily.uv_index_max[0],
              weatherCode: weatherData.current.weather_code,
            },
            forecast: weatherData.daily.time.map((date, index) => ({
              date,
              tempMax: weatherData.daily.temperature_2m_max[index],
              tempMin: weatherData.daily.temperature_2m_min[index],
              weatherCode: weatherData.daily.weather_code[index],
              condition: getWeatherCondition(weatherData.daily.weather_code[index]),
            })),
          };
        });

        const weatherDataArray = await Promise.all(weatherPromises);

        log.done("compare-weather", locations.join(", "));
        const summaryText = weatherDataArray
          .map(
            (data) =>
              `${data.location}: ${data.current.temperature.toFixed(1)}°C, ${data.current.condition}`,
          )
          .join(" | ");

        return {
          content: [
            {
              type: "text",
              text: `Comparing weather for ${locations.join(", ")}: ${summaryText}`,
            },
          ],
          _meta: {
            viewUUID: randomUUID(),
            comparisonData: {
              locations: weatherDataArray,
              mode: "comparison",
            },
          },
        };
      } catch (error) {
        log.error("compare-weather", error);
        return {
          content: [
            {
              type: "text",
              text: `Comparison error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

  registerAppTool(
    server,
    "uzir-weather-stream",
    {
      title: "Stream Weather Analysis",
      description:
        "Start a progressive weather analysis stream that returns data over time. App-only tool.",
      inputSchema: {
        location: z.string().optional().describe("Location name"),
        latitude: z.number().optional().describe("Latitude"),
        longitude: z.number().optional().describe("Longitude"),
      },
      _meta: {
        [RESOURCE_URI_META_KEY]: WEATHER_RESOURCE_URI,
        ui: {
          visibility: ["app"],
        },
      },
    },
    async ({ location, latitude, longitude }): Promise<CallToolResult> => {
      try {
        if (!location && (!latitude || !longitude)) {
          return {
            content: [
              {
                type: "text",
                text: "Error: Either location or coordinates required",
              },
            ],
            isError: true,
          };
        }

        const streamId = randomUUID();
        const loc = location || `${latitude},${longitude}`;

        const updates = [
          {
            phase: 1,
            delay: 1000,
            title: "Current Conditions",
            data: {
              temperature: 15 + Math.random() * 15,
              humidity: 40 + Math.random() * 40,
              windSpeed: Math.random() * 20,
              pressure: 990 + Math.random() * 40,
            },
          },
          {
            phase: 2,
            delay: 2000,
            title: "Pattern Analysis",
            data: {
              temperatureTrend: {
                direction: Math.random() > 0.5 ? "increasing" : "decreasing",
                rate: Math.random() * 2,
                confidence: 0.7 + Math.random() * 0.2,
              },
              precipitationRisk: {
                next24h: Math.random() * 100,
                next72h: Math.random() * 100,
              },
            },
          },
          {
            phase: 3,
            delay: 3000,
            title: "Historical Comparison",
            data: {
              temperatureDeviation: -5 + Math.random() * 10,
              humidityDeviation: -10 + Math.random() * 20,
              unusualFactors: [
                ...(Math.random() > 0.5 ? ["Higher than average temperature"] : []),
                ...(Math.random() > 0.6 ? ["Unusual wind patterns"] : []),
              ],
            },
          },
          {
            phase: 4,
            delay: 4000,
            title: "Forecast Predictions",
            data: {
              shortTerm: {
                nextHours: 6,
                expectedChange: Math.random() > 0.5 ? "improving" : "deteriorating",
                confidence: 0.8 + Math.random() * 0.15,
              },
              mediumTerm: {
                nextDays: 3,
                expectedPattern: ["stable", "variable", "stormy"][
                  Math.floor(Math.random() * 3)
                ],
              },
            },
          },
          {
            phase: 5,
            delay: 5000,
            title: "Recommendations",
            data: {
              clothing: [
                "Light jacket recommended",
                "Sunglasses suggested",
                "Umbrella not needed",
              ][Math.floor(Math.random() * 3)],
              activities: [
                "Good for outdoor activities",
                "Indoor day recommended",
                "Perfect for hiking",
              ][Math.floor(Math.random() * 3)],
              alerts: Math.random() > 0.7 ? ["Weather change expected in 6-12 hours"] : [],
            },
          },
        ];

        return {
          content: [
            {
              type: "text",
              text: `Started weather analysis stream for ${loc}`,
            },
          ],
          _meta: {
            streamId,
            location: loc,
            totalPhases: 5,
            estimatedDuration: 5000,
            updates,
          },
        };
      } catch (err) {
        log.error("uzir-weather-stream", err);
        throw err;
      }
    }
  );

  return server;
}
