/*global _ */

var Backbone = require('backbone');
require('marionette');
require('stickit');

var BodyLayout = require('../View/BodyLayout');
var ContentLayout = require('../View/main/ContentLayout');
var SubContentLayout = require('../View/main/SubContentLayout');

// アプリクラス.
var app = new Backbone.Marionette.Application();

app.addRegions({
  bodyRegion: '#body',
});

app.addInitializer(function(/* options */){
	'use strict';

	var bodyLayout = new BodyLayout();
	app.bodyRegion.attachView(bodyLayout);

	var Controller = Backbone.Marionette.Controller.extend({

	    main: function() {
			app.bodyRegion.currentView.contentRegion.close();
			app.bodyRegion.currentView.contentRegion.show(new ContentLayout());
	    },
	    sub: function() {

			app.bodyRegion.currentView.contentRegion.close();
			app.bodyRegion.currentView.contentRegion.show(new SubContentLayout());
	    }
	});

	app.Router = new Backbone.Marionette.AppRouter({
		controller: new Controller(),
		appRoutes: {
			'': 'main',
			'main': 'main',
			'main/index': 'main',
			'main/sub': 'sub',
		},
	});

//	app.Router.on('route', function() {
//		alert('route');
//	});

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

//	app.bodyRegion.currentView.contentRegion.show(new ContentLayout());
});

app.on('start', function(/* options */){
	'use strict';

	if (Backbone.history){
		Backbone.history.start({pushState: true});
	}
});

$(function(){
	'use strict';

	// backboneスタート.
	app.start();
});
