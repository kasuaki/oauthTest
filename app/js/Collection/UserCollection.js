/*global Backbone */

var User = require('../Model/User');

module.exports = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: User,

  // Save all of the User items under the `'users-backbone'` namespace.
//    localStorage: new Backbone.LocalStorage('users-backbone'),

  url: '/users',

  parse: function(response/* , xhr */) {
	'use strict';

	var users = response.users !== undefined ? response.users : response;

    return users;
  },

  // Filter down the list of all user items that are finished.
  done: function() {
	'use strict';
    return this.where({done: true});
  },

  // Filter down the list to only user items that are still not finished.
  remaining: function() {
	'use strict';
    return this.where({done: false});
  },

  // We keep the Users in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder: function() {
	'use strict';
    if (!this.length) { return 1; }
    return this.last().get('order') + 1;
  },

  // Users are sorted by their original insertion order.
  comparator: 'id'

});
