
var Backbone = require('backbone');
require('marionette');
var Header = require('./HeaderLayout');

// 検索View.
module.exports = Backbone.Marionette.Layout.extend({

	el: 'body',

	ui: {
		content: '#content',
		container: '#container',
		header: '#header',
		footer: '#footer'
	},
	regions: {
		contentRegion: '#content',
		containerRegion: '#container',
		headerRegion: '#header',
		footerRegion: '#footer'
	},

	events: {
	},

	initialize: function(/* options */) {
		'use strict';

		this.bindUIElements();
		this.headerRegion.show(new Header());
	}
});
