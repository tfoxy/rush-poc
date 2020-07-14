#!/usr/bin/env bash

# Usage: ./build.sh command_to_execute
# Example: ./build.sh rename_js_to_mjs

set -e

SCRIPT_DIR=$(dirname "$0")
ROOT="$SCRIPT_DIR/.."
SRC="$ROOT/src"
DIST="$ROOT/dist"

function rename_js_to_mjs {
  files=$(find "$DIST" -type f -name '*.js')

  "$SCRIPT_DIR/renameJsToMjs.js" $files
}

"$1"
