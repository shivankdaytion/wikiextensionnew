//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = function override(config) {
	console.log(JSON.stringify(config.plugins[4]))
	config.plugins[4].options.filename = 'static/css/main.css'
	config.optimization.minimize = false
	config.optimization.splitChunks = {
		cacheGroups: {
			default: false
		}
	}
	// Move runtime into bundle instead of separate file
	config.optimization.runtimeChunk = false
	// JS
	config.output.filename = 'static/js/[name].js'
	return config
}
