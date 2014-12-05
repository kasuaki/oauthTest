/*global window */

var Backbone = require('backbone');
require('babysitter');
require('wreqr');
require('marionette');
var Gamepad = require('gamepad').Gamepad;

var Utility = require('../../Utility/Utility');

var GamepadView = require('./GamepadView');

// Content部.
module.exports = Backbone.Marionette.Layout.extend({

	template: '#ContentTemplate',
	templateHelpers: function() {
		'use strict';
		return {};
	},

	ui: {
		movieCanvas: '#movie',
		controllerCanvas: '#controller',
	},
	regions: {
		controllerRegion: '#controller',
	},

	events: {
		'click @ui.movieCanvas': 'onClickMovieCanvas',
	},

	onRender: function() {
		'use strict';

		this.ui.movieCanvas.drawRect({
			fillStyle: '#8080ff',     // 塗りつぶし色
//			x: 0, y: 0,           // 位置
			width: 1000, height: 500    // サイズ
		});
	},

	initialize: function(/* options */) {
		'use strict';
		var self = this;

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
		var self = this;

		// Get rid of that pesky wrapping-div.
		// Assumes 1 child element present in template.
		this.$el = this.$el.children();
		// Unwrap the element to prevent infinitely 
		// nesting elements during re-render.
		this.$el.unwrap();
		this.setElement(this.$el);
		this.bindUIElements();

		$('#main').on('click', this.onClickMainButton);

		var gamepad = new Gamepad();
		if (gamepad.init()) {

			if (gamepad.count > 0) {

				self.controllerRegion.show(new GamepadView({gamepad: gamepad, index: 0}));
			}

			gamepad.bind(Gamepad.Event.CONNECTED, _.bind(function(device) {

				self.controllerRegion.show(new GamepadView({gamepad: this, index: 0}));
			}, gamepad));

			gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
			    // gamepad disconnected
			});
		} else {
			self.ui.controllerCanvas.parent.text('not supported');
		}
	},
});
