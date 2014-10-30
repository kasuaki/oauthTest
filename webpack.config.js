var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
	"process.env": {
		// This has effect on the react lib size
		"NODE_ENV": JSON.stringify("production")
	}
});

var dedupePlugin = new webpack.optimize.DedupePlugin();

var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin();

var resolverPlugin = new webpack.ResolverPlugin([
	new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
]);

var providePlugin = new webpack.ProvidePlugin({
	jQuery: 'jquery',
	$: 'jquery',
	'_': 'underscore',
	'Backbone': 'backbone',
	'Backbone.Marionette': [path.join(__dirname, 'app/bower_components/backbone.marionette')],
	'Backbone.Stickit': 'stickit',
	'Backbone.Babysitter': 'backbone.babysitter',
	'Backbone.Wreqr': 'backbone.wreqr',
});



module.exports = {

	colors: true,
	progress: true,
	debug: true,
	resolve: {

        root: [path.join(__dirname, 'app/bower_components')],
        extensions: ['', '.js'],
	    alias: {
		    'underscore': [path.join(__dirname, 'app/bower_components/underscore')],
		    'stickit':    [path.join(__dirname, 'app/bower_components/backbone.stickit')],
		    'babysitter': [path.join(__dirname, 'app/bower_components/backbone.babysitter')],
		    'wreqr':      [path.join(__dirname, 'app/bower_components/backbone.wreqr')],
		    'marionette': [path.join(__dirname, 'app/bower_components/backbone.marionette/lib/backbone.marionette.js')],
	    }
	},
	plugins: [resolverPlugin,
			  providePlugin,
			  definePlugin,
			  dedupePlugin,
//			  uglifyJsPlugin,
	],

    entry: {
    	main: './app/js/Entry/main.js',
    	sub: './app/js/Entry/sub.js',
    },
    output: {
        path: '../cakephp-2.5.5/app/webroot/js',
        filename: '[name].js'
    },

	externals: {
        // require('jquery') is external and available
        //  on the global var jQuery
//        'jquery': 'jQuery',
//        'backbone': 'Backbone',
//        'backbone.marionette': 'Backbone.Marionette',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.html$/, loader: 'html' },
//            { test: /\.coffee$/, loader: 'coffee-loader' },
//            { test: /\.js$/, loader: 'jsx-loader?harmony' } // loaders can take parameters as a querystring
        ]
    }
};
