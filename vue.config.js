module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '^@/': resolve('src')
      }
	}
  }
}