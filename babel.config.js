module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/proposal-decorators", {"legacy": true}],
    "transform-async-generator-functions",
    "transform-class-properties"
   ]
}
