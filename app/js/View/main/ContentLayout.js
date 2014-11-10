var Backbone = require('backbone');
require('marionette');

var UserList = require('../../Collection/UserCollection');
var SearchView  = require('./SearchView');

// Content部.
module.exports = Backbone.Marionette.Layout.extend({

	template: '#ContentTemplate',
	templateHelpers: function() {
		'use strict';
		return {};
	},

	ui: {
		filter: '#filter'
	},
	regions: {
		filterRegion: '#filter'
	},

	events: {
	},

	initialize: function(/* options */) {
		'use strict';

		// templateを追加.
		var html = require('./template/ContentTemplate.html');
		$('body').append(html);

		$.ajaxSetup({
			cache: false,
			async: true,
			dataType:'json',
//			headers: headers,
//			contentType : '',
//			mimeType: '',
			beforeSend: function(XMLHttpRequest){
				// アクセストークンをヘッダーにセットする必要がある.
				var tokenResult = JSON.parse(localStorage.getItem('tokenResult'));
				var header = 'Bearer ' + tokenResult.access_token;
				XMLHttpRequest.setRequestHeader('Authorization', header);
			},
		});
	},

	// View がレンダリングされて画面に表示された後に呼ばれるメソッド。
	onShow: function() {
		'use strict';

		var searchView = new SearchView({collection: new UserList({})});

		// 検索部をrender.
		this.filterRegion.show(searchView);

		// Get rid of that pesky wrapping-div.
		// Assumes 1 child element present in template.
		this.$el = this.$el.children();
		// Unwrap the element to prevent infinitely 
		// nesting elements during re-render.
		this.$el.unwrap();
		this.setElement(this.$el);
		this.bindUIElements();
	},
});
