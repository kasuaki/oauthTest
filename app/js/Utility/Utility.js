/*global _ */
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
	var accessToken = tokenResult.accessToken;

	if (_.isString(accessToken)) {

		if (url.indexOf('?') > -1) {
			accessToken = '&access_token=' + accessToken;
		} else {
			accessToken = '?access_token=' + accessToken;
		}

		location.href = url + accessToken;
	} else {
		alert('アクセストークンなし');
	}
};

exports.addTemplate = function(html, id) {
	'use strict';

	if ($('#' + id).size() <= 0) {

		$('body').append(html);
	}
};
