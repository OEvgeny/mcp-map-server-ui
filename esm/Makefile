export PATH := $(realpath ../node_modules/.bin):$(PATH)

ASSETS := $(wildcard ../dist/*.html)

# entry points
SERVER_SRC := ../dist/server.js
INDEX_SRC := entry/index.js
MCP_SRC := entry/mcp.js
WEBMCP_SRC := entry/webmcp.ts
ZOD_SRC := module/zod.js

# build targets
SERVER_OUT := out/server.js
INDEX_OUT := out/index.js
MCP_OUT := out/mcp.js
WEBMCP_OUT := out/webmcp.js
ZOD_OUT := out/zod.js

# build options
SHARED_FLAGS := --sourcemap --format=esm --bundle --platform=browser

# aliases
ALIAS_CRYPTO := --alias:crypto=./module/crypto.js
ALIAS_FS := --alias:fs/promises=./module/fs.js --alias:node:fs/promises=./module/fs.js \
            --alias:runtime:fs/promises=node:fs/promises --alias:runtime:url=node:url --external:node:fs/promises --external:node:url
ALIAS_PATH := --alias:path=pathe --alias:node:path=pathe
ALIAS_ZOD := --alias:zod/v4=./zod.js --external:./zod.js
ALIAS_MCP := --alias:@modelcontextprotocol/sdk/types.js=./mcp.js --external:./mcp.js
ALIAS_PROCESS := --alias:process=node:process --alias:node:process=./process.js --external:./process.js

# deps specific options
SERVER_FLAGS := --define:import.meta.dirname=\".\" --define:import.meta.filename=\"server.js\"

ENTRY_FLAGS := --alias:out-root/server.js=./server.js --external:./server.js \
               --alias:out-root/mcp.js=./mcp.js --external:./mcp.js

# build rules
$(ZOD_OUT): $(ZOD_SRC)
	@mkdir -p out
	esbuild $(ZOD_SRC) --outfile=$@ \
		$(SHARED_FLAGS)

$(ZOD_OUT): Makefile

$(MCP_OUT): $(MCP_SRC) $(ZOD_OUT)
	@mkdir -p out
	esbuild $(MCP_SRC) --outfile=$@ \
		$(SHARED_FLAGS) \
		$(ALIAS_ZOD)

$(MCP_OUT): Makefile

$(SERVER_OUT): $(SERVER_SRC) $(ZOD_OUT)
	@mkdir -p out
	esbuild $(SERVER_SRC) --outfile=$@ \
		$(SHARED_FLAGS) \
		$(SERVER_FLAGS) \
		$(ALIAS_FS) \
		$(ALIAS_PATH) \
		$(ALIAS_ZOD) \
		$(ALIAS_CRYPTO)

$(SERVER_OUT): Makefile

$(INDEX_OUT): $(INDEX_SRC) $(MCP_OUT) $(SERVER_OUT)
	@mkdir -p out
	esbuild $(INDEX_SRC) --outfile=$@ \
		$(SHARED_FLAGS) \
		$(ENTRY_FLAGS)

$(INDEX_OUT): Makefile

$(WEBMCP_OUT): $(ZOD_OUT) $(MCP_OUT)
$(WEBMCP_OUT): $(WEBMCP_SRC)
	@mkdir -p out
	esbuild $(WEBMCP_SRC) --outfile=$@ \
		$(SHARED_FLAGS) \
		$(ALIAS_MCP) \
		$(ALIAS_ZOD)

$(WEBMCP_OUT): Makefile

assets:
	mkdir -p out
	cp $(ASSETS) out

all: assets $(INDEX_OUT) $(WEBMCP_OUT)

clean:
	rm -rf out/*

.PHONY: all assets clean