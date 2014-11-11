
var Backbone = require('backbone');
require('marionette');

var Utility = require('../../Utility/Utility');

var User = require('../../Model/User');

module.exports = Backbone.Marionette.ItemView.extend({

	tagName: 'tr',
	model: User,
	template: '#ItemViewTemplate',
//	getTemplate: function(){
//		'use strict';
//		return _.template(html);;
//	},
	templateHelpers: function() {
		'use strict';
		return {};
	},

	// ViewとModelのBinding.
	bindings: {
		'td#id': 'id',
		'td#username': 'username',
		'td#password': 'password',
		'td#role': 'role',
		'td#created': 'created',
		'td#modified': 'modified',
	},

	initialize: function(/* options */) {
		'use strict';

		// templateを追加.
		var html = require('./template/ItemViewTemplate.html');
		Utility.addTemplate(html, 'ItemViewTemplate');
	},

	// View がレンダリングされた後に呼ばれるメソッド。
	onRender: function() {
		'use strict';
	},

	// View がレンダリングされて画面に表示された後に呼ばれるメソッド。
	onShow: function() {
		'use strict';
		this.stickit();
	},
});
