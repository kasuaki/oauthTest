/*global alert */

exports.objDump = function(obj) {
	'use strict';

	var txt = '';
	for (var one in obj){
		txt += one + '=' + obj[one] + '\n';
	}
	alert(txt);
};

exports.locationHref = function(url) {
	'use strict';

	var tokenResult = JSON.parse(localStorage.getItem('tokenResult'));
	var access_token = tokenResult.access_token;

	if (_.isString(access_token)) {

		if (url.indexOf('?') > -1) {
			access_token = '&access_token=' + access_token;
		} else {
			access_token = '?access_token=' + access_token;
		}

		location.href = url + access_token;
	} else {
		alert('アクセストークンなし');
	}
}
