export PATH := $(realpath ../node_modules/.bin):$(PATH)

ASSETS := $(wildcard ../dist/*.html)

# entry points
SERVER_SRC := ../dist/server.js
INDEX_SRC := entry/index.js
PROCESS_SRC := module/process.js

# build targets
SERVER_OUT := out/server.js
INDEX_OUT := out/index.js
PROCESS_OUT := out/process.js

# build options
SHARED_FLAGS := --sourcemap --format=esm --bundle --platform=browser

# aliases
ALIAS_CRYPTO := --alias:crypto=./module/crypto.js
ALIAS_FS := --alias:fs/promises=./module/fs.js --alias:node:fs/promises=./module/fs.js
ALIAS_PATH := --alias:path=pathe --alias:node:path=pathe
ALIAS_PROCESS := --alias:process=node:process --alias:node:process=./process.js --external:./process.js

# deps specific options
SERVER_FLAGS := --define:import.meta.dirname=\".\" --define:import.meta.filename=\"server.js\"

ENTRY_FLAGS := --alias:out-root/server.js=./server.js --external:./server.js

# build rules
$(PROCESS_OUT): $(PROCESS_SRC)
	@mkdir -p out
	esbuild $(PROCESS_SRC) --outfile=$@ \
		$(SHARED_FLAGS)


$(SERVER_OUT): $(SERVER_SRC)
	@mkdir -p out
	esbuild $(SERVER_SRC) --outfile=$@ \
		$(SHARED_FLAGS) \
		$(SERVER_FLAGS) \
		$(ALIAS_FS) \
		$(ALIAS_PATH) \
		$(ALIAS_CRYPTO)

$(SERVER_OUT): Makefile

$(INDEX_OUT): $(INDEX_SRC) $(PROCESS_OUT) $(SERVER_OUT)
	@mkdir -p out
	esbuild $(INDEX_SRC) --outfile=$@ \
		$(SHARED_FLAGS) \
		$(ENTRY_FLAGS) \
		$(ALIAS_PROCESS)

$(INDEX_OUT): Makefile

assets:
	mkdir -p out
	cp $(ASSETS) out

all: assets $(INDEX_OUT)

clean:
	rm -rf out/*

.PHONY: all assets clean