
var Utility = require('../Utility/Utility');

$(function(){
	'use strict';

	$('#mainButton').on('click', function() {
		Utility.locationHref('/main/index');
	});
});
