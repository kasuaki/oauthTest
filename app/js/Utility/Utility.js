/*global alert */

exports.objDump = function(obj) {
	'use strict';

	var txt = '';
	for (var one in obj){
		txt += one + '=' + obj[one] + '\n';
	}
	alert(txt);
};
