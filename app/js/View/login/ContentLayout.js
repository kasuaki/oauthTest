/*global _ */
/*global alert */

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
		UserUsername: '#UserUsername',
		UserPassword: '#UserPassword',
		Login: '#Login',
	},
	regions: {
	},

	events: {
		'click @ui.Login': 'onClickLogin',
	},

	onClickLogin: function() {
		'use strict';

		var UserUsername = this.ui.UserUsername.val();
		var UserPassword = this.ui.UserPassword.val();

		if ((_.isString(UserUsername) === false) ||
			(UserUsername === '')) {
			alert('UserUsername不正');
			return false;
		}

		if ((_.isString(UserPassword) === false) ||
			(UserPassword === '')) {
			alert('UserPassword不正');
			return false;
		}

		var data = {
			User: {
				username: UserUsername,
				password: UserPassword
			},
		};

		var url = '/logins/login';

		$.ajax({
			data: data,
			type:'post',
			url: url,
		}).done(function(json/* , textStatus, jqXHR */) {

			if (json.result === 'success') {
				localStorage.setItem('tokenResult', JSON.stringify(json));

				Utility.locationHref('/main/index');
			} else {

				alert('loginに失敗');
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alert(jqXHR.responseText);
			alert(textStatus);
			Utility.objDump(errorThrown);
		});
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
	},
});
