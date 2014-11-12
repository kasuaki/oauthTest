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

	location.href = url;

	var tokenResult = JSON.parse(localStorage.getItem('tokenResult'));
	var accessToken = tokenResult.accessToken;

	if (_.isString(accessToken)) {

//		if (url.indexOf('?') > -1) {
//			accessToken = '&access_token=' + accessToken;
//		} else {
//			accessToken = '?access_token=' + accessToken;
//		}
//
//		location.href = url + accessToken;

//		var form = $('<form id="UserLoginForm" method="post" accept-charset="utf-8"></form>');
//
//		form.attr('action', url)
//		.append($('<input name="_method" type="hidden" value="POST" />'))
//		.append($('<input name="access_token" type="hidden" value="' + accessToken + '" />'))
//		.append($('<input style="width: 0px; height: 0px;" type="submit" id="locationHref">'));
//
//		$('body').append(form);
//		$('#locationHref').click();
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
