
var Backbone = require('backbone');
require('marionette');

var Utility = require('../Utility/Utility');

// 検索View.
module.exports = Backbone.Marionette.Layout.extend({

	template: '#HeaderTemplate',
	templateHelpers: function() {
		'use strict';
		return {};
	},

	ui: {
	},
	regions: {
	},

	events: {
	},

	initialize: function(/* options */) {
		'use strict';

		// templateを追加.
		var html = require('./template/HeaderTemplate.html');
		Utility.addTemplate(html, 'HeaderTemplate');
	}
});
