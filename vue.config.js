const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
	configureWebpack: {
		devServer: {
			watchOptions: {
				poll: true,
			},
		},
		plugins: [new VuetifyLoaderPlugin()],
	},
};
