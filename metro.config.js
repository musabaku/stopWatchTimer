const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// This is the important line:
// It adds 'wasm' to the list of file extensions Metro will recognize.
config.resolver.assetExts.push('wasm');

module.exports = config;