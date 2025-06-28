const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle potential module resolution issues
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Clear cache on start
config.resetCache = true;

module.exports = config;