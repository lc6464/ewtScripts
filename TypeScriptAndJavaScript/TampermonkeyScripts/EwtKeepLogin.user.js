// ==UserScript==
// @name		升学 E 网通保持登录
// @namespace	https://lcwebsite.cn/
// @version		0.1.2
// @description	升学 E 网通保持登录。
// @author		LC
// @match		http*://*.ewt360.com/*
// @icon		https://static.lcwebsite.cn/favicon.svg
// @license		MIT License
// ==/UserScript==
// GitHub 仓库地址：https://github.com/lc6464/ewtPrograms

/* 公开更新记录
* 0.1.0：初代版本，失败的版本。
* 0.1.1：解决初代版本在除 web.ewt360.com 外其它 *.ewt360.com 域名时不能使用的问题。
* 0.1.2：修复跨域时 Cookies 传递问题。
*/

(function () {
	"use strict";
	async function getVideoTime() { // 获取周看课时长
		try {
			const response = await fetch('https://web.ewt360.com/customerApi/api/studyprod/lessonCenter/getUserTimeRanking', { // fetch 看课时长 API
				credentials: 'include', // 发送验证信息 (cookies)
				mode: 'cors' // 跨域
			});
			if (response.ok) { // 判断是否出现 HTTP 异常
				return await response.json(); // 如果正常，则获取 JSON 数据
			} else { // 若不正常，返回异常信息
				return { success: false, msg: `服务器返回异常 HTTP 状态码：HTTP ${response.status} ${response.statusText}.` };
			}
		} catch (reason) { // 若与服务器连接异常，返回异常信息
			return { success: false, msg: '连接服务器过程中出现异常，消息：' + reason.message };
		}
	}
	return setInterval(async function () {
		const result = await getVideoTime();
		if (result.success) {
			console.log(`${new Date()} 保持登录成功。`);
		} else {
			console.log('保持登录失败，原因：' + result.msg);
		}
	}, 5500);
})();
