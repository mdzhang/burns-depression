const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: './src',
        tsConfigPath: './tsconfig.json',
        source: 'tsconfig',
      },
    },
  ],
  webpack: {
    configure: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  },
};
