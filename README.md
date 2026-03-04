# MCP Apps Testing Server

Comprehensive MCP Apps capability testing suite featuring a Weather Dashboard and 3D Globe viewer. This project systematically tests and demonstrates all Model Context Protocol (MCP) Apps features.

## Table of Contents

- [Project Purpose](#-project-purpose)
- [Recent Updates](#-recent-updates)
- [What's Included](#-whats-included)
- [MCP Apps Features - Testing Progress](#-mcp-apps-features---testing-progress)
- [Weather Dashboard Features](#️-weather-dashboard-features)
- [Globe Viewer Features](#️-globe-viewer-features)
- [Getting Started](#-getting-started)
- [Conformance Tests](#-conformance-tests)
- [Testing](#-testing)
- [How to See Each MCP Apps Function Being Tested](#-how-to-see-each-mcp-apps-function-being-tested)
- [Testing Checklist](#-testing-checklist)
- [Available Tools](#-available-tools)
- [Architecture](#️-architecture)
- [MCP Client Configuration](#-mcp-client-configuration)
- [Learning Resources](#-learning-resources)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Links](#-links)

## 🎯 Project Purpose

This server demonstrates and tests the full spectrum of MCP Apps capabilities through interactive UI applications that communicate bidirectionally with MCP servers and host applications.

## 🆕 Recent Updates

### Progressive Weather Streaming Analysis (Latest)
- ✨ **New Tool**: `uzir-weather-stream` - Progressive 5-phase weather analysis
- 🌊 **Real-time Updates**: Data streams in at 1-second intervals
- 🎨 **Beautiful UI**: Full-screen modal with progress bar and animated phase arrivals
- 📊 **5 Analysis Phases**: Conditions → Patterns → Historical → Forecast → Recommendations
- 🔒 **App-Only**: Tool is hidden from model, only callable by the app
- 📱 **Compact Design**: Optimized viewport (790px base, 20% smaller on mobile)
- ⭐ **Persistence**: Favorites and search history with localStorage
- 📚 **Documentation**: New [CUSTOM-API-GUIDE.md](./CUSTOM-API-GUIDE.md) with implementation details

**Try it:** Load weather for any city, click "🌊 Stream Analysis" button!

## 📦 What's Included

### 1. **Weather Dashboard** (Primary Test App)
Interactive weather application with comprehensive MCP Apps API testing.

### 2. **3D Globe Viewer**
CesiumJS-based globe with OpenStreetMap tiles for geographic visualization.

---

## ✅ MCP Apps Features - Testing Progress

### **Fully Implemented & Tested** ✅

| Feature | API | Implementation | Status |
|---------|-----|----------------|--------|
| **Tool Calling from UI** | `callServerTool()` | Search box + Quick city buttons | ✅ Complete |
| **Chat Integration** | `sendMessage()` | "Tell Claude" button | ✅ Complete |
| **External Links** | `sendOpenLink()` | "Open Weather.com" button | ✅ Complete |
| **Structured Logging** | `sendLog()` | Activity log panel (3 levels) | ✅ Complete |
| **Size Hints** | `sendSizeChanged()` | Dynamic viewport height | ✅ Complete |
| **Tool Results** | `ontoolresult` | Initial weather data handler | ✅ Complete |
| **Tool Input** | `ontoolinput` | Parameter handling | ✅ Complete |
| **Error Handling** | `onerror` | App-level error handler | ✅ Complete |
| **Teardown** | `onteardown` | Cleanup handler | ✅ Complete |
| **UI Resources** | `registerAppResource()` | 2 UI resources (weather + map) | ✅ Complete |
| **CSP Configuration** | `_meta.ui.csp` | External domain whitelisting | ✅ Complete |
| **Tool Metadata** | `_meta` | Weather data + viewUUID | ✅ Complete |
| **Display Modes** | `requestDisplayMode()` | Fullscreen/inline with toggle button | ✅ Complete |
| **Host Context** | `onhostcontextchanged` | Display mode and theme detection | ✅ Complete |
| **Keyboard Shortcuts** | Event handlers | Esc (exit fullscreen), Ctrl+Enter (toggle) | ✅ Complete |
| **Theme Detection** | `onhostcontextchanged` | Light/dark theme adaptation | ✅ Complete |
| **State Persistence** | localStorage | Favorites, history, bookmarks with notes | ✅ Complete |
| **Progressive Streaming** | Custom tool | 5-phase streaming analysis | ✅ Complete |
| **Model Context Updates** | `updateModelContext()` | Weather summary sent to Claude | ✅ Complete |
| **Bookmarks with Notes** | localStorage + UI | Save locations with custom notes | ✅ Complete |
| **Tool List Changes** | `setNotificationHandler()` | Animated toast notifications for tool updates | ✅ Complete |

### **Partially Implemented** 🚧

| Feature | Status | Notes |
|---------|--------|-------|
| **PiP Display Mode** | 🟡 Partial | CSS ready, awaiting host support |

### **Not Yet Implemented** ❌

| Feature | Priority | Effort | Notes |
|---------|----------|--------|-------|
| **Real-time Updates** | Medium | Medium | Auto-refresh, live weather data |
| **Comparison Mode** | Low | High | Multiple locations side-by-side |
| **Advanced Forms** | Low | Medium | Multi-step forms, validation |
| **Accessibility** | Low | Medium | Full ARIA, screen reader support |
| **Offline Mode** | Low | High | Service worker, caching |
| **Performance Metrics** | Low | Low | Telemetry and monitoring |

---

## 🌦️ Weather Dashboard Features

The Weather Dashboard is the primary testing application demonstrating core MCP Apps capabilities:

### **Interactive Features**
- 🔍 **Location Search** - Search any city or place using `callServerTool()`
- 🌍 **Quick Cities** - One-click weather for 6 popular cities
- 💬 **Tell Claude** - Send weather summaries to chat via `sendMessage()`
- 🌐 **Open Weather.com** - External browser links via `sendOpenLink()`
- 📝 **Activity Log** - Real-time structured logging with `sendLog()`
- ⛶ **Fullscreen Mode** - Toggle display modes with `requestDisplayMode()`
- 🎨 **Theme Detection** - Responds to light/dark mode changes
- ⌨️ **Keyboard Shortcuts** - Ctrl+Enter (toggle fullscreen), Escape (exit)
- 🌊 **Progressive Streaming Analysis** - Live 5-phase weather analysis with real-time updates
- ⭐ **Favorites & History** - Save favorite locations and search history (localStorage)
- 🧠 **Model Context Updates** - Sends weather data to Claude's context via `updateModelContext()`
- 📌 **Bookmarks with Notes** - Save locations with custom notes, timestamps, and full edit/delete support

### **Weather Data**
- Current conditions with temperature, humidity, wind speed, UV index
- 7-day forecast with high/low temperatures (collapsible)
- Weather condition icons
- Geo-coordinates display

### **Progressive Streaming Analysis** 🆕
The weather dashboard includes an advanced streaming tool that demonstrates **progressive data delivery**:

- **5 Streaming Phases** - Data arrives in real-time over 5 seconds
  1. **Current Conditions** (1s) - Live temperature, humidity, wind, pressure
  2. **Pattern Analysis** (2s) - Temperature trends, precipitation risk
  3. **Historical Comparison** (3s) - Deviations from averages, unusual factors
  4. **Forecast Predictions** (4s) - Short-term and medium-term forecasts
  5. **Recommendations** (5s) - Clothing and activity suggestions

- **Beautiful Streaming UI**
  - Full-screen modal with animated phase arrivals
  - Progress bar showing completion status
  - Real-time timestamps for each phase
  - Color-coded sections with green gradient headers
  - Responsive grid layouts for data display

- **App-Only Tool** - `uzir-weather-stream` is hidden from the model and only callable by the app
- **Simulated Real-Time Updates** - Demonstrates "multiple values over time" pattern

**How to test:** Load any weather location, click "🌊 Stream Analysis" button, watch phases arrive progressively!

### **Technical Details**
- Uses Open-Meteo API (no API key required)
- OpenStreetMap Nominatim for geocoding
- Compact viewport height (790px base, expands dynamically)
- Mobile-optimized design (20% smaller on ≤600px screens)
- Responsive design with media queries
- Theme adaptation (light/dark backgrounds)
- Error handling and recovery
- localStorage persistence for favorites and search history

---

## 🗺️ Globe Viewer Features

Interactive 3D globe with geographic visualization:

- **3D Globe Rendering** - CesiumJS with OpenStreetMap tiles
- **Geocoding Integration** - Search and locate places
- **Camera Persistence** - Saves view state in localStorage
- **Display Modes** - Fullscreen and inline support
- **Model Context Updates** - Sends screenshots to Claude
- **Shuffle Cities** - Random city exploration
- **Keyboard Shortcuts** - Esc, Ctrl+Enter for fullscreen control

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Development

```bash
npm run dev
```

Runs both Vite watcher and HTTP server concurrently with hot reload.

### Production

```bash
npm run start        # or npm run start:http
```

Server runs at `http://localhost:3001/mcp`

For stdio transport:
```bash
npm run start:stdio
```

---

## 🧪 Conformance Tests

The project includes 5 conformance test apps that run as a **separate MCP server**, testing core MCP Apps spec compliance:

| Test App | Tool | What It Tests |
|----------|------|---------------|
| Lifecycle | `show-lifecycle` | MCP Apps §3 — init, teardown, tool input/result |
| Host Context | `show-host-context` | MCP Apps §4 — theme, display mode, context changes |
| Messaging | `show-messaging` | MCP Apps §5 — sendMessage, sendLog, sendOpenLink |
| Domain & CORS | `show-domain-cors` | MCP Apps §2.4 — domain declaration, CORS preflight |
| Theming | `show-theming` | MCP Apps §4.5 — CSS variables, theme adaptation |

Additional server-only tools: `echo-tool`, `slow-task`, `slow-echo`, `test-resources-notification`, `test-tools-notification`.

### Running with Docker

```bash
# Build and start the conformance server on port 3002
docker compose up -d --build

# Verify it's running
curl http://localhost:3002/health
# → {"status":"ok"}

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Running without Docker

```bash
npm run build
npm run start:conformance
```

### Claude Desktop Configuration (WSL2)

Add both servers to `claude_desktop_config.json` (`%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "mcp-map-server": {
      "command": "wsl",
      "args": ["/home/<user>/.nvm/versions/node/<version>/bin/node", "/path/to/mcp-map-server-ui/dist/index.js", "--stdio"]
    },
    "mcp-conformance-tests": {
      "command": "wsl",
      "args": ["/home/<user>/.nvm/versions/node/<version>/bin/node", "/path/to/mcp-map-server-ui/dist/conformance-index.js", "--stdio"]
    }
  }
}
```

> **Note:** Use the full path to `node` (e.g. from `which node`) since WSL launched by Claude Desktop doesn't load your shell profile.

### Test Prompts

- "Show lifecycle tests"
- "Show host context tests"
- "Show messaging tests"
- "Show domain cors tests"
- "Show theming tests"

---

## 🧪 Testing

### Option 1: Basic-Host Test Interface

The [ext-apps basic-host](https://github.com/modelcontextprotocol/ext-apps/tree/main/examples/basic-host) provides a simple test UI:

```bash
# Clone ext-apps repo
git clone https://github.com/modelcontextprotocol/ext-apps
cd ext-apps/examples/basic-host

# Install and start
npm install
SERVERS='["http://localhost:3001/mcp"]' npm start
```

Open `http://localhost:8080` and test the tools.

### Option 2: Claude (Web or Desktop) - **Recommended for Model Context Testing**

Use [custom connectors](https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp) to connect Claude to your deployed server.

**For local testing with Claude Desktop:**
```json
// Add to claude_desktop_config.json
{
  "mcpServers": {
    "weather-map": {
      "command": "node",
      "args": ["/path/to/mcp-map-server-ui/dist/index.js", "--stdio"]
    }
  }
}
```

**For Claude Web with local server:**
```bash
npx cloudflared tunnel --url http://localhost:3001
```
Add the generated URL as a custom connector in Claude settings.

**For Claude Web with Azure deployment:**
- Add custom connector with URL: `https://mcp-apps-020426.azurewebsites.net/mcp`

**Testing Model Context Updates:**
1. Say: "Show me the weather in Tokyo"
2. Then ask: "What's the current temperature?" or "Should I bring an umbrella?"
3. Claude should answer using the model context! ✨

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing instructions.

### Option 3: VS Code (Insiders)

VS Code Insiders supports MCP Apps. Configure your server in VS Code settings.

---

## 🔬 How to See Each MCP Apps Function Being Tested

This section provides **specific prompts** and **observable behaviors** for testing each MCP Apps API.

### 1. **`ontoolresult` - Initial Tool Result Handler**

**How It's Tested:** Receives weather data when tool is first called

**Prompt:**
```
Show me the weather in Seattle
```

**What to Observe:**
- ✅ Weather dashboard loads immediately
- ✅ Current temperature, conditions, and 7-day forecast display
- ✅ Activity log shows: "Initial weather data rendered for Seattle"
- ✅ No errors in console

**Behind the Scenes:**
The `ontoolresult` handler receives the `show-weather` tool result containing weather data in `_meta.weatherData`, then renders the UI.

---

### 2. **`callServerTool()` - Search Box**

**How It's Tested:** Search input calls `show-weather` tool from the UI

**Prompt:**
1. First get the weather dashboard loaded (use prompt above)
2. In the search box, type: `Tokyo`
3. Click "🔍 Search" or press Enter

**What to Observe:**
- ✅ Search button shows loading spinner
- ✅ Weather updates to Tokyo
- ✅ Activity log shows:
  ```
  Searching for location: Tokyo
  Weather tool result received
  Weather rendered for Tokyo
  ```
- ✅ Search button re-enables after completion

**Behind the Scenes:**
The UI calls `app.callServerTool({ name: "show-weather", arguments: { location: "Tokyo" }})` which makes a round-trip to the MCP server.

---

### 3. **`callServerTool()` - Quick City Buttons**

**How It's Tested:** City chips call `show-weather` tool with preset locations

**Prompt:**
1. Load weather dashboard
2. Click any city chip (e.g., "Paris", "London", "Dubai")

**What to Observe:**
- ✅ Weather immediately updates to selected city
- ✅ Activity log shows: "Searching for location: [City]"
- ✅ All UI elements update (temp, forecast, location header)
- ✅ Button remains clickable (no loading state needed for presets)

**Behind the Scenes:**
Each city chip triggers `callServerTool()` with a known city name, testing batch tool calls.

---

### 4. **`sendMessage()` - Tell Claude Button**

**How It's Tested:** Sends weather summary to chat

**Prompt:**
1. Load weather dashboard for any location
2. Click "💬 Tell Claude" button

**What to Observe:**
- ✅ A new message appears in the chat from you (the user):
  ```
  The weather in Tokyo is currently 12°C and partly cloudy.
  It feels like 10°C with 65% humidity.
  ```
- ✅ Activity log shows:
  ```
  Sending message to chat [message content]
  Message sent to chat successfully
  ```
- ✅ Claude can now respond to this weather information

**Behind the Scenes:**
The UI calls `app.sendMessage({ content: [{ type: "text", text: message }], role: "user" })` which posts a message to the chat as if you typed it.

---

### 5. **`sendOpenLink()` - Open Weather.com Button**

**How It's Tested:** Opens external URL in browser

**Prompt:**
1. Load weather dashboard for any location
2. Click "🌐 View on Weather.com" button

**What to Observe:**
- ✅ Browser opens a new tab/window with Weather.com
- ✅ URL includes coordinates: `https://weather.com/weather/today/l/[lat],[lon]`
- ✅ Weather.com shows the same location
- ✅ Activity log shows:
  ```
  Opening Weather.com for Tokyo https://weather.com/weather/today/l/35.68,139.69
  Link opened successfully
  ```

**Behind the Scenes:**
The UI calls `app.sendOpenLink({ url: "https://weather.com/..." })` which requests the host to open the URL.

---

### 6. **`sendLog()` - Activity Log Panel**

**How It's Tested:** All app activities are logged with different levels

**Prompt:**
1. Load weather dashboard
2. Perform various actions (search, click cities, tell Claude, etc.)
3. Click "📝 Activity Log" header to expand

**What to Observe:**
- ✅ Log panel shows all activities with timestamps
- ✅ Color-coded entries:
  - **Blue (info)**: Normal operations (searches, renders)
  - **Yellow (warning)**: Warnings (no data, edge cases)
  - **Red (error)**: Errors (failed API calls, exceptions)
- ✅ Auto-scrolls to latest entry
- ✅ Log count updates: "(12)" shows number of log entries
- ✅ Can collapse/expand with ▼/▶ arrow

**Behind the Scenes:**
Every significant action calls `app.sendLog({ level: "info"|"warning"|"error", data: message, logger: "weather-app" })` which sends structured logs to the host.

---

### 7. **`sendSizeChanged()` - Viewport Height Hint**

**How It's Tested:** App requests preferred height on load

**Prompt:**
```
Show me the weather in any city
```

**What to Observe:**
- ✅ Weather dashboard renders at 1200px height
- ✅ No scrolling needed inside the viewport
- ✅ All content (search, forecast, log) is visible without scrolling
- ✅ Activity log shows: "Sent initial size 1200"

**Behind the Scenes:**
On initialization, the app calls `app.sendSizeChanged({ height: 1200 })` to tell the host its preferred size.

---

### 8. **`ontoolinput` - Tool Parameter Handler**

**How It's Tested:** Receives tool parameters before result

**Prompt:**
```
Show me the weather in Paris with coordinates 48.8566, 2.3522
```

**What to Observe:**
- ✅ Weather loads for Paris
- ✅ Activity log may show tool input received (if logged)
- ✅ Parameters are processed correctly

**Behind the Scenes:**
The `ontoolinput` handler receives parameters before the tool executes, allowing the UI to prepare or show loading states.

---

### 9. **`onerror` - Error Handler**

**How It's Tested:** Handles app-level errors gracefully

**Prompt:**
1. Load weather dashboard
2. Search for invalid/nonsense location: `asdfghjkl12345`

**What to Observe:**
- ✅ Error message displays in the UI
- ✅ App doesn't crash
- ✅ Activity log shows red error entry
- ✅ Search box remains functional
- ✅ Can search for valid location after error

**Behind the Scenes:**
The `onerror` handler catches unhandled errors and logs them via `sendLog()` instead of crashing.

---

### 10. **`onteardown` - Cleanup Handler**

**How It's Tested:** Called when app is being destroyed

**Prompt:**
1. Load weather dashboard
2. Navigate away or close the chat

**What to Observe:**
- ✅ Activity log shows: "App is being torn down" (before navigation)
- ✅ No memory leaks or errors
- ✅ Clean shutdown

**Behind the Scenes:**
The `onteardown` handler performs cleanup (clear timers, close connections) before the app is removed.

---

### 11. **UI Resources - Weather Dashboard HTML**

**How It's Tested:** Server serves bundled HTML via `registerAppResource()`

**Prompt:**
```
Show me the weather in Berlin
```

**What to Observe:**
- ✅ Complete weather UI loads (not raw HTML)
- ✅ All styles and scripts are embedded
- ✅ Interactive elements work (buttons, inputs)
- ✅ Single HTML file (no external JS/CSS)

**Behind the Scenes:**
The server's `registerAppResource()` serves the bundled `weather-app.html` which includes all CSS/JS inline (via vite-plugin-singlefile).

---

### 12. **Tool Metadata - Weather Data in `_meta`**

**How It's Tested:** Server includes weather data in tool result metadata

**Prompt:**
```
Show me the weather in Sydney
```

**What to Observe:**
- ✅ Weather data loads correctly
- ✅ All fields present (temp, humidity, forecast, etc.)
- ✅ No "undefined" values in UI

**Behind the Scenes:**
The server's `show-weather` tool returns:
```javascript
{
  content: [...],
  _meta: {
    viewUUID: "...",
    weatherData: { location: "Sydney", current: {...}, forecast: [...] }
  }
}
```

---

### 13. **CSP Configuration - External API Access**

**How It's Tested:** App can fetch from Open-Meteo and OSM via CSP whitelist

**Prompt:**
```
Show me the weather in Mumbai
```

**What to Observe:**
- ✅ Weather data loads (from Open-Meteo API)
- ✅ Geocoding works (from OSM Nominatim)
- ✅ No CSP errors in browser console
- ✅ All images/icons load

**Behind the Scenes:**
The server's resource registration includes:
```javascript
_meta: {
  ui: {
    csp: {
      connectDomains: ["https://api.open-meteo.com", "https://*.openstreetmap.org"],
      resourceDomains: [...]
    }
  }
}
```

---

### 14. **`requestDisplayMode()` - Fullscreen Toggle**

**How It's Tested:** Fullscreen button switches display modes

**Prompt:**
1. Load weather dashboard for any location
2. Click the fullscreen button (⛶) in the top-right corner
3. Or press **Ctrl+Enter** (or Cmd+Enter on Mac)

**What to Observe:**
- ✅ Weather dashboard expands to fullscreen
- ✅ Fullscreen button icon changes to compress icon (⛶ → ⛉)
- ✅ Button tooltip updates: "Exit fullscreen"
- ✅ Activity log shows: "Requesting display mode: fullscreen"
- ✅ Press **Escape** or click button again to exit fullscreen
- ✅ Activity log shows: "Requesting display mode: inline"

**Behind the Scenes:**
The UI calls `app.requestDisplayMode({ mode: "fullscreen" })` which asks the host to change the display mode. The host responds via `onhostcontextchanged`.

---

### 15. **`onhostcontextchanged` - Display Mode & Theme**

**How It's Tested:** App responds to host context changes

**Prompt:**
1. Load weather dashboard
2. Change your system theme (light ↔ dark) or display mode

**What to Observe:**
- ✅ Activity log shows: "Host context changed { theme: 'light'|'dark', displayMode: '...' }"
- ✅ Background gradient adapts:
  - **Light theme**: Purple gradient (#667eea → #764ba2)
  - **Dark theme**: Dark blue gradient (#2c3e50 → #34495e)
- ✅ Display mode CSS classes applied to body
- ✅ UI responds immediately without reload

**Behind the Scenes:**
The `onhostcontextchanged` handler receives context updates from the host and applies theme/mode classes to `document.body`.

---

### 16. **Keyboard Shortcuts - Display Mode Control**

**How It's Tested:** Keyboard commands for fullscreen

**Actions:**
1. Load weather dashboard
2. Press **Ctrl+Enter** (or **Cmd+Enter** on Mac)
3. Press **Escape** when in fullscreen

**What to Observe:**
- ✅ **Ctrl+Enter**: Toggles fullscreen on/off
- ✅ **Escape**: Exits fullscreen (only works when in fullscreen)
- ✅ Activity log shows mode change requests
- ✅ Fullscreen button state syncs with keyboard actions
- ✅ Search input shortcuts still work (Enter to search)

**Behind the Scenes:**
Global `keydown` event listener detects shortcuts and calls `toggleFullscreen()` which uses `requestDisplayMode()`.

---

### 17. **Tool List Changed Notifications - Dynamic Tool Updates**

**How It's Tested:** Apps receive and display notifications when server tools change

**Prompt:**
1. Load weather dashboard or globe viewer
2. Call the `test-tools-notification` tool (this simulates the server adding/removing tools)

**What to Observe:**
- ✅ Beautiful animated toast notification slides in from top-right
- ✅ Purple gradient background with spinning refresh icon (🔄)
- ✅ Message displays: "Tools Updated - New tools are now available"
- ✅ Notification auto-dismisses after 5 seconds
- ✅ Can manually close with × button
- ✅ Activity log shows: "Received notifications/tools/list_changed"
- ✅ Multiple notifications stack properly if tools change frequently

**Behind the Scenes:**
- Apps register notification handler: `app.setNotificationHandler(ToolListChangedNotificationSchema, handler)`
- When server calls `server.server.notification({ method: "notifications/tools/list_changed" })`, all connected apps receive it
- The `showToolsChangedNotification()` function creates an animated DOM element with the notification UI
- CSS animations provide smooth slide-in from right and fade-out on dismiss

**Note:** This notification is primarily intended for MCP host applications. In production, the host receives the notification and can either:
1. Refresh its tool list automatically
2. Forward the notification to connected apps (as demonstrated here)
3. Show its own UI notification to the user

See [TEST_RESULTS.md](./TEST_RESULTS.md) for detailed testing documentation with Playwright MCP.

---

## 🎯 Testing Checklist

Use this checklist to verify all MCP Apps features:

**Core APIs (Phase 1):**
- [ ] **ontoolresult** - Weather loads on initial call
- [ ] **callServerTool** - Search box updates weather
- [ ] **callServerTool** - Quick city buttons work
- [ ] **sendMessage** - Tell Claude sends message to chat
- [ ] **sendOpenLink** - Weather.com opens in browser
- [ ] **sendLog** - Activity log shows all actions
- [ ] **sendSizeChanged** - UI is 1200px tall, no scrolling
- [ ] **ontoolinput** - Parameters handled correctly
- [ ] **onerror** - Invalid searches show errors gracefully
- [ ] **onteardown** - Clean shutdown on navigation
- [ ] **UI Resources** - Complete dashboard loads
- [ ] **Tool Metadata** - All weather data displays
- [ ] **CSP Config** - External APIs work without errors

**Display & Themes (Phase 2):**
- [ ] **requestDisplayMode** - Fullscreen button toggles mode
- [ ] **onhostcontextchanged** - Theme and display mode changes applied
- [ ] **Keyboard Shortcuts** - Ctrl+Enter toggles, Escape exits fullscreen
- [ ] **Theme Detection** - Light/dark theme switching works
- [ ] **Fullscreen Button** - Icon updates, tooltip changes

**Notifications (Phase 4):**
- [ ] **Tool List Changed** - Toast notification appears when tools update
- [ ] **Animated UI** - Notification slides in smoothly with spinning icon
- [ ] **Auto-dismiss** - Notification disappears after 5 seconds
- [ ] **Manual Close** - × button closes notification immediately

**All features passing?** ✅ MCP Apps APIs fully tested!

---

## 🔧 Available Tools

### `show-weather`

Display weather dashboard for a location.

**Parameters:**
- `location` (string, optional) - City or place name
- `latitude` (number, optional) - Latitude coordinate
- `longitude` (number, optional) - Longitude coordinate

**Example:**
```json
{
  "location": "Paris"
}
```

Returns weather dashboard UI with current conditions and 7-day forecast.

### `uzir-weather-stream` (App-Only)

Progressive weather analysis streaming tool with 5 phases of data delivered over time.

**Visibility:** App-only (hidden from model)

**Parameters:**
- `location` (string, optional) - City or place name
- `latitude` (number, optional) - Latitude coordinate
- `longitude` (number, optional) - Longitude coordinate

**Example:**
```json
{
  "location": "Tokyo"
}
```

**Returns:** Streaming analysis with 5 phases:
1. Current Conditions (temperature, humidity, wind, pressure)
2. Pattern Analysis (trends, precipitation risk)
3. Historical Comparison (deviations, unusual factors)
4. Forecast Predictions (short-term, medium-term)
5. Recommendations (clothing, activities)

Data arrives progressively at 1-second intervals, demonstrating "multiple values over time" streaming pattern.

### `show-map`

Display 3D globe at a bounding box location.

**Parameters:**
- `west` (number) - Western longitude
- `south` (number) - Southern latitude
- `east` (number) - Eastern longitude
- `north` (number) - Northern latitude
- `label` (string, optional) - Location label

**Example:**
```json
{
  "west": 2.29,
  "south": 48.85,
  "east": 2.3,
  "north": 48.86,
  "label": "Eiffel Tower"
}
```

### `shuffle-cities`

Display a random city on the map.

**Parameters:** None

### `geocode`

Search for places and get coordinates.

**Parameters:**
- `query` (string) - Place name or address

**Example:**
```json
{
  "query": "Golden Gate Bridge"
}
```

Returns up to 5 matches with coordinates and bounding boxes.

### `test-tools-notification`

Trigger a `tools/list_changed` notification to test dynamic tool list updates.

**Parameters:** None

**What It Does:**
- Sends `notifications/tools/list_changed` to all connected clients
- Simulates what happens when the server dynamically adds or removes tools
- Connected apps display a notification: "Tools Updated - New tools are now available"
- Demonstrates protocol-level notifications from server to apps

**Example Usage:**
```
Call the test-tools-notification tool
```

**Expected Result:**
- Tool returns: "Sent tools/list_changed notification to all connected clients"
- Apps show animated toast notification in top-right corner
- Notification auto-dismisses after 5 seconds

**Use Case:** Testing notification handlers and demonstrating that apps can respond to server-side tool list changes in real-time.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│  MCP Host (Claude, VS Code, etc.)      │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  MCP App UI (Sandboxed iframe)   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │  Weather Dashboard          │ │ │
│  │  │  - Search box               │ │ │
│  │  │  - Quick cities             │ │ │
│  │  │  - Tell Claude button       │ │ │
│  │  │  - Open web button          │ │ │
│  │  │  - Activity log             │ │ │
│  │  └─────────────────────────────┘ │ │
│  │                                   │ │
│  │  postMessage ↕ AppBridge          │ │
│  └───────────────────────────────────┘ │
│                                         │
│         HTTP/SSE ↕                      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  MCP Server (Node.js + Express)         │
│  - show-weather tool                    │
│  - show-map tool                        │
│  - geocode tool                         │
│  - UI resources (bundled HTML)          │
│  - Open-Meteo API integration           │
│  - Nominatim geocoding                  │
└─────────────────────────────────────────┘
```

---

## 📝 MCP Client Configuration

### For stdio transport:

```json
{
  "mcpServers": {
    "weather-map": {
      "command": "node",
      "args": ["/path/to/dist/index.js", "--stdio"]
    }
  }
}
```

### For HTTP transport with Claude:

Add as a custom connector:
- Name: Weather & Maps
- URL: `https://your-server.com/mcp` (or cloudflared tunnel URL)

---

## 🎓 Learning Resources

- [MCP Apps Documentation](https://modelcontextprotocol.io/docs/extensions/apps)
- [MCP Apps API Reference](https://modelcontextprotocol.github.io/ext-apps/api/)
- [MCP Apps GitHub](https://github.com/modelcontextprotocol/ext-apps)
- [MCP Specification](https://modelcontextprotocol.io/specification)

---

## 📂 Project Structure

```
mcp-map-server-ui/
├── apps/
│   ├── globe/               # CesiumJS 3D globe app
│   ├── weather/             # Weather dashboard app
│   ├── clock/               # Clock timer app
│   ├── lifecycle/           # Conformance: lifecycle tests
│   ├── host-context/        # Conformance: host context tests
│   ├── messaging/           # Conformance: messaging tests
│   ├── domain-cors/         # Conformance: domain & CORS tests
│   ├── theming/             # Conformance: theming tests
│   └── shared/              # Shared test utilities
├── server.ts                # Main MCP server (globe, weather, clock)
├── main.ts                  # Main server HTTP entrypoint
├── conformance-server.ts    # Conformance MCP server (5 test apps)
├── conformance-main.ts      # Conformance server HTTP entrypoint
├── Dockerfile               # Multi-stage Docker build
├── docker-compose.yml       # Runs conformance server on port 3002
├── .dockerignore
├── dist/                    # Built artifacts
│   ├── apps/                # Bundled HTML apps
│   ├── server.js            # Compiled main server
│   ├── index.js             # Compiled main entrypoint
│   ├── conformance-server.js # Compiled conformance server
│   └── conformance-index.js  # Compiled conformance entrypoint
├── package.json
├── vite.config.ts
├── tsconfig.json
├── TESTING_GUIDE.md         # Detailed testing instructions
├── CUSTOM-API-GUIDE.md      # Progressive streaming API extension guide
└── README.md                # This file
```

---

## 🚢 Deployment

This server can be deployed to any Node.js hosting platform:

- Azure App Service (see `.github/workflows/`)
- AWS Lambda / ECS
- Google Cloud Run
- Heroku
- Railway
- Vercel / Netlify (with serverless functions)

Ensure your deployment exposes the `/mcp` endpoint and supports:
- HTTP POST requests
- SSE (Server-Sent Events) for streaming
- CORS headers
- JSON request/response bodies

---

## 🔜 Roadmap

### Phase 1: Core Features (✅ Complete)
- [x] Tool calling from UI
- [x] Chat integration
- [x] External links
- [x] Structured logging
- [x] Error handling

### Phase 2: Display & Themes (✅ Complete)
- [x] Inline display mode
- [x] Fullscreen mode (both apps)
- [x] Theme detection (light/dark)
- [x] Keyboard shortcuts (Esc, Ctrl+Enter)
- [x] Host context change handling
- [x] Responsive layouts per mode
- [x] PiP mode CSS (ready for host support)

### Phase 3: Persistence & Context (✅ Complete)
- [x] Favorites management (⭐ star button)
- [x] Search history (localStorage)
- [x] Cross-session persistence (viewUUID-based keys)
- [x] Progressive streaming analysis (5 phases)
- [x] Compact viewport design (790px, mobile-optimized)
- [x] Model context updates (weather app sends current weather to Claude)
- [x] Bookmark locations with notes (📌 button with custom notes)

### Phase 4: Advanced Features (🚧 Partially Complete)
- [x] Progressive streaming tool (uzir-weather-stream)
- [x] Real-time phase-based updates
- [x] Tool list change notifications (animated toast UI)
- [x] Notification handler registration (`setNotificationHandler`)
- [x] Test tool for notifications (`test-tools-notification`)
- [ ] Comparison mode (multiple locations)
- [ ] Advanced forms and validation
- [ ] Keyboard shortcuts (weather-specific)

### Phase 5: Polish & Production
- [ ] Full accessibility (ARIA, screen reader)
- [ ] Offline mode with service workers
- [ ] Performance monitoring
- [ ] Analytics and telemetry
- [ ] E2E testing suite

---

## 🤝 Contributing

This is a testing and demonstration project for MCP Apps capabilities. Contributions welcome!

---

## 📄 License

MIT

---

## 🔗 Links

- **Live Demo**: TBD (coming soon)
- **MCP Apps Docs**: https://modelcontextprotocol.io/docs/extensions/apps
- **GitHub Issues**: Report bugs and request features
- **Testing Guide**: See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing instructions

---

**Built with:** Node.js, TypeScript, Express, Vite, CesiumJS, MCP SDK, Open-Meteo API, OpenStreetMap
