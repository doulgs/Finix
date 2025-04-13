module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      ["inline-import", { extensions: [".sql"] }],
      "react-native-reanimated/plugin", // ⚠️ sempre por último
    ],
  };
};
