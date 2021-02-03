// ==UserScript==
// @name		升学 E 网通广告跳过
// @namespace	https://lcwebsite.cn/
// @version		1.2.4-beta.3
// @description	升学 E 网通广告跳过及视频极速播放
// @author		LC
// @match		http*://web.ewt360.com/site-study/*
// @icon		https://static.lcwebsite.cn/favicon.svg
// @license		MIT License
// ==/UserScript==

/* 公开更新记录
* 1.2：使用 TypeScript 重写，减少错误发生的可能。
* 1.2.1：增加视频静音功能。
* 1.2.3-beta-2：增加刷新按钮、增加课程错误时自动退出功能。
* 1.2.4-beta：增加“刷视频”功能，完善注释。
* 1.2.4-beta.2：增加“刷视频”功能状态临时储存功能。
* 1.2.4-beta.3：优化“刷视频”功能逻辑，改为本地储存。
*/

(function ($) {
	'use strict';
	if (location.protocol !== 'https:') { // HTTP 转 HTTPS
		location.protocol = 'https:';
	} else if (location.hash.substr(1, 10) === "/playVideo") { // 判断是否是播放视频页面
		const intervals = {
			removeAD: 0,
			fastPlay: 0,
			fastPlay_2: 0
		}, loopVideoInput = document.createElement('input'), // 创建刷视频开关 <input>
			body = document.body; // 获取 body
		{
			const div = document.createElement('div'), // 创建刷视频开关的容器 <div>
				label = document.createElement('label'), // 创建刷视频开关的容器 <label>
				input = loopVideoInput, // 获取刷视频开关 <input>
				style = div.style; // 获取容器 <div> 的样式
			if (localStorage.getItem('LC_TampermonkeyScripts_ewtScript_loopVideo') === 'true') { // 检测 localStorage 中是否储存启用刷视频的信息
				input.checked = true; // 若储存则启用
			}
			input.type = 'checkbox'; // 设置样式和 <label> 的内容
			style.width = '17rem';
			style.position = 'absolute';
			style.top = '15%';
			style.right = '5%';
			style.zIndex = '5001';
			style.fontFamily = '"Microsoft YaHei"';
			style.borderRadius = '2rem';
			style.fontSize = '2rem';
			style.background = '#DDD';
			style.textAlign = 'center';
			label.innerText = '刷视频模式：';
			label.style.lineHeight = '4rem';
			label.appendChild(input); // 将刷视频开关加入容器 <label>
			div.appendChild(label); // 将容器 <label> 加入容器 <div>
			body.appendChild(div); // 将容器 <div> 加入 body
			input.addEventListener('change', function () {
				if (this.checked) { // 若启用则储存信息
					localStorage.setItem('LC_TampermonkeyScripts_ewtScript_loopVideo', 'true');
				} else { // 若禁用则删除信息
					localStorage.removeItem('LC_TampermonkeyScripts_ewtScript_loopVideo');
				}
			});
		}
		function closeThisPage() {
			window.close(); // 经测试，在 Microsoft Edge 88 下，若是被 JavaScript 或者 <a> 打开的，可以正常关闭
			const nw = open('', '_self'); // 适配一些旧的浏览器
			if (nw !== null) {
				nw.close();
				window.close();
			}
			location.href = "about:blank";
			window.close(); // 经测试，在 Microsoft Edge 88 下，会打开空页，虽然不会被关闭，但可以减少资源占用
		}
		addEventListener('load', function () {
			setTimeout(() => {
				if ($('.ant-message-custom-content.ant-message-error') !== null) {
					closeThisPage();
				}
			}, 700);
			intervals.removeAD = setInterval(function () {
				const video = $('video[id^="cc_ad_"]'); // 获取广告 <video>
				if (video !== null) { // 若 <video> 存在
					video.playbackRate = 16; // 将广告 16 倍速播放
					video.volume = 0; // 将广告静音
					const button = $('div.ccH5PlayBtn'); // 获取开始播放的 <div> 按钮
					if (button !== null) { // 若 <div> 存在则点击
						button.click();
					}
					clearInterval(intervals.removeAD); // 取消循环检测广告 <video> 是否存在
				}
			}, 500);
			setTimeout(function () {
				intervals.fastPlay = setInterval(function () {
					const video = $('video[id^="cc_"][src^="blob:https://"]'); // 获取学习视频 <video>
					if (video !== null) { // 若 <video> 存在
						video.volume = 0; // 将视频静音
						video.addEventListener('play', function () {
							setTimeout((e) => video.playbackRate = e, 200, 16); // 0.2s 后将视频 16 倍速播放
							intervals.fastPlay_2 = setInterval(function () {
								if (video.playbackRate != 16) { // 若不是则设置
									video.playbackRate = 16;
								} else { // 若是则停止循环检测视频播放速率
									clearInterval(intervals.fastPlay_2);
								}
							}, 1000);
						});
						video.addEventListener('pause', () => setTimeout(video.play.bind(video), 250)); // 视频暂停后 250ms 继续播放
						video.addEventListener('ended', function () {
							if (!loopVideoInput.checked) { // 若关闭刷视频模式才关闭页面
								closeThisPage();
							}
						});
						clearInterval(intervals.fastPlay); // 停止循环检测学习视频 <video> 是否存在
					}
				}, 500);
			}, 4000);
			{ // 创建并添加刷新页面的按钮
				const button = document.createElement('button'), style = button.style;
				style.position = 'absolute';
				style.top = '3%';
				style.right = '5%';
				style.zIndex = '5000';
				style.width = '8rem';
				style.height = '8rem';
				style.fontFamily = '"Microsoft YaHei"';
				style.borderRadius = '50%';
				style.fontSize = '3rem';
				style.border = 'none';
				style.background = '#DDD';
				style.fontWeight = 'bold';
				button.innerText = '刷新';
				button.addEventListener('click', function () {
					location.reload();
				});
				body.appendChild(button);
			}
		});
	}
})(document.querySelector.bind(document));
