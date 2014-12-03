/*global _ */

var Backbone = require('backbone');
require('marionette');
require('jcanvas');

var Utility = require('../../Utility/Utility');

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

		this.makeControllerCanvas(this.ui.controllerCanvas);
	},

	makeControllerCanvas: function(query) {
		'use strict';

		var x = 150;
		var y = 150;

		// 左アナログスティック.
		this.makeAnalogStick(query, x, y, 'leftAnalogStick');

		x = 600;
		y = 350;

		// 右アナログスティック.
		this.makeAnalogStick(query, x, y, 'rightAnalogStick');

		x = 300;
		y = 300;

		// 上ボタン.
		this.makeUpButton(query, x, y);

		// 下ボタン.
		this.makeDownButton(query, x, y);

		// 左ボタン.
		this.makeLeftButton(query, x, y);

		// 右ボタン.
		this.makeRightButton(query, x, y);

		x = 850;
		y = 150;

		// Aボタン.
		this.makeAButton(query, x, y);

		// Bボタン.
		this.makeBButton(query, x, y);

		// Xボタン.
		this.makeXButton(query, x, y);

		// Yボタン.
		this.makeYButton(query, x, y);

		// 描画.
		_.each(query.getLayerGroup('visible'), function(v) {
			query.drawLayer(v.name);
		});
	},

	makeYButton: function(query, x, y) {
		'use strict';

		query.addLayer({
			type: 'arc',
			groups: ['visible'],
			name: 'YButton',
			fillStyle: '#008b8b',	// darkcyan.
			strokeStyle: '#000000',
			strokeWidth: 3,
			x: x + 40, y: y - 80,
			radius: 40,
			mouseup: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#006400'/* darkgreen */}).drawLayers();
			},
			mousedown: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#2f4f4f'/* darkslategray */}).drawLayers();
			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#006400'/* darkgreen */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#008b8b'/* darkcyan */}).drawLayers();
			},
		}).addLayer({
			type: 'text',
			groups: ['visible'],
			name: 'YButton-label',
			fillStyle: '#FFFFFF',
			x: x + 40, y: y - 80,
			fontFamily: 'sans-serif',
			fontSize: 30,
			text: 'Y'
		});
	},

	makeXButton: function(query, x, y) {
		'use strict';

		query.addLayer({
			type: 'arc',
			groups: ['visible'],
			name: 'XButton',
			fillStyle: '#008b8b',	// darkcyan.
			strokeStyle: '#000000',
			strokeWidth: 3,
			x: x - 80, y: y - 40,
			radius: 40,
			mouseup: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#006400'/* darkgreen */}).drawLayers();
			},
			mousedown: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#2f4f4f'/* darkslategray */}).drawLayers();
			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#006400'/* darkgreen */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#008b8b'/* darkcyan */}).drawLayers();
			},
		}).addLayer({
			type: 'text',
			groups: ['visible'],
			name: 'XButton-label',
			fillStyle: '#FFFFFF',
			x: x - 80, y: y - 40,
			fontFamily: 'sans-serif',
			fontSize: 30,
			text: 'X'
		});
	},

	makeBButton: function(query, x, y) {
		'use strict';

		query.addLayer({
			type: 'arc',
			groups: ['visible'],
			name: 'BButton',
			fillStyle: '#008b8b',	// darkcyan.
			strokeStyle: '#000000',
			strokeWidth: 3,
			x: x + 80, y: y + 40,
			radius: 40,
			mouseup: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#006400'/* darkgreen */}).drawLayers();
			},
			mousedown: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#2f4f4f'/* darkslategray */}).drawLayers();
			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#006400'/* darkgreen */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#008b8b'/* darkcyan */}).drawLayers();
			},
		}).addLayer({
			type: 'text',
			groups: ['visible'],
			name: 'BButton-label',
			fillStyle: '#FFFFFF',
			x: x + 80, y: y + 40,
			fontFamily: 'sans-serif',
			fontSize: 30,
			text: 'B'
		});
	},

	makeAButton: function(query, x, y) {
		'use strict';

		query.addLayer({
			type: 'arc',
			groups: ['visible'],
			name: 'AButton',
			fillStyle: '#008b8b',	// darkcyan.
			strokeStyle: '#000000',
			strokeWidth: 3,
			x: x - 40, y: y + 80,
			radius: 40,
			mouseup: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#006400'/* darkgreen */}).drawLayers();
			},
			mousedown: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#2f4f4f'/* darkslategray */}).drawLayers();
			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#006400'/* darkgreen */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#008b8b'/* darkcyan */}).drawLayers();
			},
		}).addLayer({
			type: 'text',
			groups: ['visible'],
			name: 'AButton-label',
			fillStyle: '#FFFFFF',
			x: x - 40, y: y + 80,
			fontFamily: 'sans-serif',
			fontSize: 30,
			text: 'A'
		});
	},

	makeAnalogStick: function(query, x, y, name) {
		'use strict';

		query.addLayer({
			type: 'arc',
			groups: ['visible', name + 'Group'],
			dragGroups: [name + 'Group'],
			name: name,
			draggable: true,
			bringToFront: false,
			strokeStyle: '#000',
			strokeWidth: 5,
			x: x, y: y,
			radius: 50,
			data: {
				baseX: x,
				baseY: y,
			},
			// Show pointer cursor on hover
			cursors: {
			  // Show pointer on hover
				mouseover: 'pointer',
				// Show 'move' cursor on mousedown
				mousedown: 'move',
				// Revert cursor on mouseup
				mouseup: 'pointer'
			},
			dragstart: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#ffffe0'/* lightyellow */}).drawLayers();
			},
			drag: function(layer) {

				var distX = Math.floor(layer.x - layer.data.baseX);
				var distY = Math.floor(layer.y - layer.data.baseY);

				//斜辺の長さ c を求める。
				var c = Math.floor(Math.sqrt ( Math.pow(distX, 2) + Math.pow(distY, 2) ));

				if (Math.abs(c) > 20) {

					// xとyから角度(ラジアンを取得).
					var CT_RADIAN = Math.atan2(Math.abs(distY), Math.abs(distX));
					//斜辺 c の長さ。
					var CT_RADIUS = 20;

					// xを取得.
					var dx = Math.floor(CT_RADIUS * Math.cos(CT_RADIAN));
					distX = (distX < 0) ? dx * -1 : dx;
					distX += layer.data.baseX;
					$(this).setLayerGroup(layer.name + 'Group', {x: distX});

					// yを取得.
					var dy = Math.floor(CT_RADIUS * Math.sin(CT_RADIAN));
					distY = (distY < 0) ? dy * -1 : dy;
					distY += layer.data.baseY;
					$(this).setLayerGroup(layer.name + 'Group', {y: distY});

					_.each($(this).getLayerGroup(layer.name + 'Group'), function(v) {
						$(this).drawLayer(v.name);
					});
				} else {
					distX += layer.data.baseX;
					distY += layer.data.baseY;
				}

				$(this).setLayer(layer.name + '-label', {
					text: 'x: ' + distX + ', y: ' + distY
				}).drawLayers();
			},
			dragstop: function(layer) {

				$(this).setLayer(layer.name, {
					x: layer.data.baseX,
					y: layer.data.baseY,
					fillStyle: '#f5f5f5'/* whitesmoke */
				}).drawLayers();

   				$(this).setLayer(layer.name + '-label', {
					text: 'x: ' + layer.data.baseX + ', y: ' + layer.data.baseY
				}).drawLayers();
			},
//			mousemove: function(layer) {
//			},
//			mouseup: function(layer) {
//				layer.fillStyle = '#f5f5f5';	// whitesmoke.
//			},
//			mousedown: function(layer) {
//				layer.fillStyle = '#ffffe0';	// lightyellow.
//			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#FFFFFF'}).drawLayers();
			},
		}).addLayer({
			type: 'arc',
			groups: ['visible', name + 'GroupBase'],
			name: name + 'Base',
			draggable: false,
			strokeStyle: '#000',
			strokeWidth: 5,
			x: x, y: y,
			radius: 10,
		}).addLayer({
			type: 'text',
			groups: ['visible', name + 'GroupBase'],
			name: name + '-label',
			fillStyle: '#000000',
			x: x, y: y -80,
			fontFamily: 'sans-serif',
			fontSize: 20,
			text: 'x: ' + x + ', y: ' + y
		});
	},

	makeRightButton: function(query, x, y) {
		'use strict';

		query.addLayer({
			type: 'polygon',
			groups: ['visible'],
			name: 'rightButton',
			fillStyle: '#36c',
			strokeStyle: '#f60',
			strokeWidth: 5,
			x: x + 55, y: y + 50,
			radius: 50,
			sides: 3,
			concavity: -0.5,
			rotate: 270,
			mouseup: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mousedown: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#ffffe0'/* lightyellow */}).drawLayers();
			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#FFFFFF'}).drawLayers();
			},
		});
	},

	makeLeftButton: function(query, x, y) {
		'use strict';

		query.addLayer({
			type: 'polygon',
			groups: ['visible'],
			name: 'leftButton',
			fillStyle: '#36c',
			strokeStyle: '#f60',
			strokeWidth: 5,
			x: x - 55, y: y + 50,
			radius: 50,
			sides: 3,
			concavity: -0.5,
			rotate: 90,
			mouseup: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mousedown: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#ffffe0'/* lightyellow */}).drawLayers();
			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#FFFFFF'}).drawLayers();
			},
		});
	},

	makeDownButton: function(query, x, y) {
		'use strict';

		query.addLayer({
			type: 'polygon',
			groups: ['visible'],
			name: 'downButton',
			fillStyle: '#36c',
			strokeStyle: '#f60',
			strokeWidth: 5,
			x: x, y: y + 105,
			radius: 50,
			sides: 3,
			concavity: -0.5,
			rotate: 0,
			mouseup: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mousedown: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#ffffe0'/* lightyellow */}).drawLayers();
			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#FFFFFF'}).drawLayers();
			},
		});
	},

	makeUpButton: function(query, x, y) {
		'use strict';

		query.addLayer({
			type: 'polygon',
			groups: ['visible'],
			name: 'upButton',
			fillStyle: '#36c',
			strokeStyle: '#f60',
			strokeWidth: 5,
			x: x, y: y - 5,
			radius: 50,
			sides: 3,
			concavity: -0.5,
			rotate: 180,
			mouseup: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mousedown: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#ffffe0'/* lightyellow */}).drawLayers();
			},
			mouseover: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#f5f5f5'/* whitesmoke */}).drawLayers();
			},
			mouseout: function(layer) {
				$(this).setLayer(layer.name, {fillStyle: '#FFFFFF'}).drawLayers();
			},
		});
	},

	onClickMovieCanvas: function() {
		'use strict';
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

		this.bindUIElements();
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
