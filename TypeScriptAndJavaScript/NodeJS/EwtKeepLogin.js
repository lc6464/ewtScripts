"use strict";
const request = require('request');
function EwtKeepLogin(Cookie) {
	request({
		url: 'https://web.ewt360.com/customerApi/api/studyprod/lessonCenter/getUserTimeRanking',
		method: "GET",
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.56",
			Cookie
		},
		timeout: 5000
	}, function (error, response, body) {
		const status = response.statusCode;
		if (!error && ((status >= 200 && status < 300) || status == 304)) {
			console.log(body);
		}
	});
}
(function () {
	const args = process.argv;
	args.shift();
	args.shift();
	if (args.length > 1) {
		console.log("Args > 1!");
	} else if (args.length == 0) {
		console.log("EwtKeepLogin.exe \"you cookies...\"");
	} else if (args.length == 1) {
		if (args[0] == "--help" || args[0] == "-h" || args[0] == "-?") {
			console.log("EwtKeepLogin.exe \"you cookies...\"");
		} else {
			setInterval(EwtKeepLogin, 5500, args[0]);
			console.log('由于 JavaScript 语言特性，此程序不支持控制台清屏及退出功能。');
		}
	}
})();
