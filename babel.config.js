module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: ["./src"],
        alias: {
          "@ENUMS": "./src/enums",
          "@HOOKS": "./src/hooks",
          "@ROUTER": "./src/router",
          "@SCREENS": "./src/screens",
        },
      },
    ],
  ],
};
