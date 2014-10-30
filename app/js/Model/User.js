/*global Backbone */

module.exports = Backbone.Model.extend({

	url: '/users',

	defaults: {
		'id' : null,
		'username' : null,
		'password' : null,
		'role' : null,
		'created' : null,
		'modified' : null,
	},

	// 独自Sync.
	// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	// var methodMap = {
	//   'create': 'POST',
	//   'update': 'PUT',
	//   'patch':  'PATCH',
	//   'delete': 'DELETE',
	//   'read':   'GET'
	// };
	sync: function(method, model, options) {
		'use strict';

		switch(method) {
			case 'read':	// GET.
			case 'update':	// PUT.
			case 'delete':	// DELETE.
				options.url = model.url + '/' + model.get('id') + '.json';
				break;
			default:
			case 'create':	// POST.
				options.url = model.url + '.json';
				break;
		}

		return Backbone.sync(method, model, options);
	},
});
