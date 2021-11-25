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
  routes: [
    {
      dest: '/index.html',
      match: 'routes',
      src: '.*',
    },
  ],
  workspaceRoot: '/'
};

export default snowpackConfig;