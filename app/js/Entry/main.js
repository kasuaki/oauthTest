/*global alert */

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
			'main/index': 'main',
			'main/sub': 'sub',
		},
	});

//	app.Router.on('route', function() {
//		alert('route');
//	});

	var bodyLayout = new BodyLayout();
	app.bodyRegion.attachView(bodyLayout);

	app.bodyRegion.currentView.contentRegion.show(new ContentLayout());
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
