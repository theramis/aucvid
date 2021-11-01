const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
module.exports = {
  target: "serverless",
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: "./data/**",
            },
          ],
        })
      );
    }

    // Important: return the modified config
    return config;
  },
};
