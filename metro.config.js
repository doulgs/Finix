// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");
const svgTransformer = require.resolve("react-native-svg-transformer");

// Pega a config base do Expo
let config = getDefaultConfig(__dirname);

// Adiciona suporte a .svg e .sql no resolver
const { assetExts, sourceExts } = config.resolver;
config.resolver.assetExts = assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts = [...sourceExts, "svg", "sql"];

// Define o transformer para SVG
config.transformer = {
  ...config.transformer,
  babelTransformerPath: svgTransformer,
};

// Aplica NativeWind
config = withNativeWind(config, { input: "./src/styles/global.css" });

// Aplica Reanimated
config = wrapWithReanimatedMetroConfig(config);

module.exports = config;
