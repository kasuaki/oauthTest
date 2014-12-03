/*global _ */

var Backbone = require('backbone');
require('marionette');
require('stickit');

var BodyLayout = require('../View/BodyLayout');
var ContentLayout = require('../View/another/ContentLayout');

// アプリクラス.
var app = new Backbone.Marionette.Application();

app.addRegions({
  bodyRegion: '#body',
});

app.addInitializer(function(/* options */){
	'use strict';

	var bodyLayout = new BodyLayout();
	app.bodyRegion.attachView(bodyLayout);

	// サイドバー削除.
	app.bodyRegion.currentView.ui.sideBar.remove();
	// コンテンツを12カラムに変更.
	app.bodyRegion.currentView.ui.content.removeClass('col-lg-10');
	app.bodyRegion.currentView.ui.content.addClass('col-lg-12');

	var Controller = Backbone.Marionette.Controller.extend({

	    main: function() {
			app.bodyRegion.currentView.contentRegion.close();
			app.bodyRegion.currentView.contentRegion.show(new ContentLayout());
	    }
	});

	app.Router = new Backbone.Marionette.AppRouter({
		controller: new Controller(),
		appRoutes: {
			'': 'main',
			'main': 'main',
			'main/index': 'main',
		},
	});

	// 現在のURLを取得して手動でルーティング.
	var url = location.href;
	var elm = $('<a>', { href:url } )[0];
	var pathName = elm.pathname;
	pathName = pathName.replace('/^\//', '');

	var appRoutes = app.Router.options.appRoutes;
	if (_.has(appRoutes, pathName)) {
		var methodName = appRoutes[pathName];
		app.Router.options.controller[methodName]();
	}
});

app.on('start', function(/* options */){
	'use strict';

	if (Backbone.history){ Backbone.history.start(); }
});

$(function(){
	'use strict';

	// backboneスタート.
	app.start();
});
