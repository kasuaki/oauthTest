
var Backbone = require('backbone');
require('marionette');
require('stickit');

var BodyLayout = require('../View/BodyLayout');
var ContentLayout = require('../View/login/ContentLayout');

// アプリクラス.
var app = new Backbone.Marionette.Application();

app.addRegions({
  bodyRegion: '#body',
});

app.addInitializer(function(/* options */){
	'use strict';

	var bodyLayout = new BodyLayout();
	app.bodyRegion.attachView(bodyLayout);

	app.bodyRegion.currentView.contentRegion.show(new ContentLayout());
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
