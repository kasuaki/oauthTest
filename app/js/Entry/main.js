
var Backbone = require('backbone');
require('marionette');
require('stickit');

var UserList = require('../Collection/UserCollection');
var SearchView  = require('../View/main/SearchView');

// アプリクラス.
var app = new Backbone.Marionette.Application();

app.addRegions({
  filterRegion: '#filter',
});

app.addInitializer(function(/* options */){
	'use strict';

	// 検索部をrender.
	app.filterRegion.show(new SearchView({collection: new UserList({})}));
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
