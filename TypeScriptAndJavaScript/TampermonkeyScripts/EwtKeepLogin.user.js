// ==UserScript==
// @name		升学 E 网通保持登录
// @namespace	https://lcwebsite.cn/
// @version		0.1.0
// @description	升学 E 网通保持登录。
// @author		LC
// @match		http*://*.ewt360.com/*
// @icon		https://static.lcwebsite.cn/favicon.svg
// @license		MIT License
// ==/UserScript==
// GitHub 仓库地址：https://github.com/lc6464/ewtPrograms

(function () {
	"use strict";
	async function getVideoTime() {
		try {
			const response = await fetch('/customerApi/api/studyprod/lessonCenter/getUserTimeRanking', {
				credentials: 'same-origin' // 发送验证信息 (cookies)
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
