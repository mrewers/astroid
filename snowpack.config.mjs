const snowpackConfig = {
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
  mount: {
    public: {
      static: true,
      url: '/',
    },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-sass',
    '@snowpack/plugin-typescript'
  ],
  workspaceRoot: '/'
};

export default snowpackConfig;