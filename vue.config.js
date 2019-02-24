module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '^@/': path.resolve('src')
      }
	}
  }
}