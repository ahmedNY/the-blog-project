module.exports = {
  publicPath: '/admin/',
  devServer: {
    proxy: 'http://localhost:3000/',
  },
};
