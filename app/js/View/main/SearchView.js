/*global _ */
/*global alert */

var Backbone = require('backbone');
require('marionette');

var Utility = require('../../Utility/Utility');

var TableItemView = require('./TableItemView');

// 検索View.
module.exports = Backbone.Marionette.CompositeView.extend({

	itemView: TableItemView,
//	itemViewOptions : function () {		'use strict';	},
	itemViewContainer: '#body',

	template: '#SearchViewTemplate',
	templateHelpers: function() {
		'use strict';
		return {};
	},

	ui: {
		addButton: '#add',
		addAjaxButton: '#addAjax',
		editButton: '#edit',
		editAjaxButton: '#editAjax',
		deleteButton: '#delete',
		deleteAjaxButton: '#deleteAjax',
		viewButton: '#view',
		viewAjaxButton: '#viewAjax',
		indexButton: '#index',
		indexAjaxButton: '#indexAjax',
		subButton: '#sub',
		eventName: '#eventName',
	},
	events: {
		'click @ui.addButton': 'onClickAddButton',
		'click @ui.addAjaxButton': 'onClickAddAjaxButton',
		'click @ui.editButton': 'onClickEditButton',
		'click @ui.editAjaxButton': 'onClickEditAjaxButton',
		'click @ui.deleteButton': 'onClickDeleteButton',
		'click @ui.deleteAjaxButton': 'onClickDeleteAjaxButton',
		'click @ui.viewButton': 'onClickViewButton',
		'click @ui.viewAjaxButton': 'onClickViewAjaxButton',
		'click @ui.indexButton': 'onClickIndexButton',
		'click @ui.indexAjaxButton': 'onClickIndexAjaxButton',
		'click @ui.subButton': 'onClickSubButton',
	},

	initialize: function(/* options */) {
		'use strict';

		// templateを追加.
		var html = require('./template/SearchViewTemplate.html');
		$('body').append(html);

		// イベント監視.
		this.collection.on('all', _.bind(function(eventName, a, b/* , c */) {

			var self = this;
			var old = self.ui.eventName.text();
			self.ui.eventName.text(old + ' ' + eventName);

			switch(eventName) {
				case 'error':
					var xhr = b;
//					var model = a;
//					var options = c;

					alert(xhr.status);

					switch (xhr.status) {
						case 401:		// Unauthorized OAuth による認可が失敗しています
							location.href = '/logins/login';
							break;
						default:
						case 500:		// Internal Server Error API 側の問題による失敗です
						case 405:		// Method Not Allowed メソッドが許可されていません
						case 202:		// Accepted リクエストが正常に受け付けられました
						case 400:		// Bad Request リクエストデータに不正値があります
						case 404:		// Not Found リソースが存在しません
						case 503:		// Service Unavailable 一時的に API アクセスが出来ません
						case 200:		// OK 成功
						case 201:		// Created 新しいリソースの生成が成功しました
							break;
					}
					break;
			}
		}, this));

//		var headers = {};

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

	onClickSubButton: function() {
		'use strict';

		location.href = '/main/sub';
	},

	onClickAddButton: function() {
		'use strict';

		var self = this;
		var data = { 
			username: 'addTest',
			password: 'add',
			role: 'admin'
		};

		var model = new self.collection.model();

		model.on('sync', _.bind(function(model/* , resp, options */) {

			model.off('sync');

			this.collection.add(model);
		}, self));
		model.save(data);
	},

	onClickAddAjaxButton: function() {
		'use strict';

		var data = { User: {
			username: 'addTest',
			password: 'add',
			role: 'admin'
			}
		};

		var url = '/users.json';

		$.ajax({
			data: data,
			type:'post',
			url: url,
		}).done(function(json/* , textStatus, jqXHR */) {

			alert(json.message);
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alert(jqXHR.responseText);
			alert(textStatus);
			Utility.objDump(errorThrown);
		});
	},

	onClickEditAjaxButton: function() {
		'use strict';

		var self = this;
		var model = self.collection.last();

		var data = { User: {
			username: 'editTest',
			password: 'edit',
			role: 'author'
			}
		};

		var url = '/users/' + model.get('id') + '.json';

		$.ajax({
			data: data,
			type:'put',
			url: url,
		}).done(function(json/* , textStatus, jqXHR */) {


			alert(json.message);
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alert(jqXHR.responseText);
			alert(textStatus);
			Utility.objDump(errorThrown);
		});
	},

	onClickEditButton: function() {
		'use strict';

		var self = this;
		var model = self.collection.last();

		var data = {
			username: 'editTest',
			password: 'edit',
			role: 'author'
		};

		model.save(data);
	},

	onClickDeleteButton: function() {
		'use strict';

		var self = this;
		var model = self.collection.last();

		model.on('destroy', _.bind(function(model, collection/* , options */) {

			this.off('destroy');

			collection.remove(model);
		}, self));

		model.destroy();
	},

	onClickDeleteAjaxButton: function() {
		'use strict';

		var self = this;
		var model = self.collection.last();

		var url = '/users/' + model.get('id') + '.json';

		$.ajax({
			type:'delete',
			url: url,
		}).done(function(json/* , textStatus, jqXHR */) {

			alert(json.message);
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alert(jqXHR.responseText);
			alert(textStatus);
			Utility.objDump(errorThrown);
		});
	},

	onClickViewButton: function() {
		'use strict';
		var self = this;
		var model = self.collection.last();

		model.fetch();
	},

	onClickViewAjaxButton: function() {
		'use strict';

		var url = '/users/6.json';

		$.ajax({
			type:'get',
			url: url,
		}).done(function(json/* , textStatus, jqXHR */) {

			Utility.objDump(json);
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alert(jqXHR.responseText);
			alert(textStatus);
			Utility.objDump(errorThrown);
		});
	},

	onClickIndexButton: function() {
		'use strict';
		var self = this;
		self.collection.fetch();
	},

	onClickIndexAjaxButton: function() {
		'use strict';

		var url = '/users.json';

		$.ajax({
			type:'get',
			url: url,
		}).done(function(json/* , textStatus, jqXHR */) {

			_.each(json, function(value/* , key */) {

				Utility.objDump(value);
			});
		}).fail(function(jqXHR, textStatus, errorThrown) {

			alert(jqXHR.responseText);
			alert(textStatus);
			Utility.objDump(errorThrown);
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

		this.collection.fetch();
		
		$('#sub').on('click', this.onClickSubButton);
	},
});
