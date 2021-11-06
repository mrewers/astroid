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
  plugins: ['@snowpack/plugin-typescript'],
};

export default snowpackConfig;