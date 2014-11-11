
var Backbone = require('backbone');
require('marionette');

var Utility = require('../../Utility/Utility');

// Content部.
module.exports = Backbone.Marionette.Layout.extend({

	template: '#ContentTemplate',
	templateHelpers: function() {
		'use strict';
		return {};
	},

	ui: {
		mainButton: '#main',
	},
	regions: {
	},

	events: {
		'click @ui.mainButton': 'onClickMainButton',
	},

	onClickMainButton: function() {
		'use strict';

		Utility.locationHref('/main/index');
	},

	initialize: function(/* options */) {
		'use strict';

		// templateを追加.
		var html = require('./template/ContentTemplate.html');
		Utility.addTemplate(html, 'ContentTemplate');

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
				if (tokenResult !== null) {
					var header = 'Bearer ' + tokenResult.accessToken;
					XMLHttpRequest.setRequestHeader('Authorization', header);
				}
			},
		});
	},

	// View がレンダリングされて画面に表示された後に呼ばれるメソッド。
	onShow: function() {
		'use strict';

		// Get rid of that pesky wrapping-div.
		// Assumes 1 child element present in template.
		this.$el = this.$el.children();
		// Unwrap the element to prevent infinitely 
		// nesting elements during re-render.
		this.$el.unwrap();
		this.setElement(this.$el);
		this.bindUIElements();

		$('#main').on('click', this.onClickMainButton);
	},
});
