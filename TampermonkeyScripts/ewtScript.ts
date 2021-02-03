// ==UserScript==
// @name		升学 E 网通广告跳过
// @namespace	https://lcwebsite.cn/
// @version		1.2.5-beta.2
// @description	升学 E 网通广告跳过及视频极速播放
// @author		LC
// @match		http*://web.ewt360.com/site-study/*
// @icon		https://static.lcwebsite.cn/favicon.svg
// @license		MIT License
// ==/UserScript==

/* 公开更新记录
* 1.2：使用 TypeScript 重写，减少错误发生的可能。
* 1.2.1：增加视频静音功能。
* 1.2.3-beta-2：增加刷新按钮；增加课程错误时自动退出功能。
* 1.2.4-beta：增加“刷视频”功能；完善注释。
* 1.2.4-beta.2：增加“刷视频”功能状态临时储存功能。
* 1.2.4-beta.3：优化“刷视频”功能逻辑；改为本地储存。
* 1.2.5-beta：修复增加的按钮定位问题；修改储存状态逻辑以防止多标签页干扰。
* 1.2.5-beta.2：检测看课进度上传失败的错误提示，若出现则刷新页面；优化按钮添加顺序。
*/

(function ($) {
	'use strict';
	if (location.protocol !== 'https:') { // HTTP 转 HTTPS
		location.protocol = 'https:';
	} else if (location.hash.substr(1, 10) === "/playVideo") { // 判断是否是播放视频页面
		const intervals = { // setInterval 的 ID
			removeAD: 0,
			fastPlay: 0,
			fastPlay_2: 0,
			uploadError: 0
		},
			loopVideoInput: HTMLInputElement = document.createElement('input'), // 创建刷视频开关 <input>
			body = document.body; // 获取 body
		function setPublicStyle(style: CSSStyleDeclaration) {
			style.position = 'fixed';
			style.right = '5%';
			style.background = '#DDD';
			style.fontFamily = '"Microsoft YaHei"';
		}
		{
			const div: HTMLDivElement = document.createElement('div'), // 创建刷视频开关的容器 <div>
				label: HTMLLabelElement = document.createElement('label'), // 创建刷视频开关的容器 <label>
				input = loopVideoInput, // 获取刷视频开关 <input>
				style = div.style; // 获取容器 <div> 的样式
			if (sessionStorage.getItem('LC_TampermonkeyScripts_ewtScript_loopVideo') === 'true') { // 检测 sessionStorage 中是否储存启用刷视频的信息
				input.checked = true; // 若储存则启用
				sessionStorage.removeItem('LC_TampermonkeyScripts_ewtScript_loopVideo'); // 删除储存信息
			}
			input.type = 'checkbox'; // 设置样式和 <label> 的内容
			setPublicStyle(style);
			style.width = '17rem';
			style.top = '12%';
			style.zIndex = '5001';
			style.borderRadius = '2rem';
			style.fontSize = '2rem';
			style.textAlign = 'center';
			label.innerText = '刷视频模式：';
			label.style.lineHeight = '4rem';
			label.appendChild(input); // 将刷视频开关加入容器 <label>
			div.appendChild(label); // 将容器 <label> 加入容器 <div>
			body.appendChild(div); // 将容器 <div> 加入 body
			window.addEventListener('beforeunload', function () { // 标签页被关闭之前执行
				if (input.checked) { // 若刷视频功能已启用则写入 sessionStorage
					sessionStorage.setItem('LC_TampermonkeyScripts_ewtScript_loopVideo', 'true');
				}
			});
		}
		{ // 创建并添加刷新页面的按钮
			const button: HTMLButtonElement = document.createElement('button'), style = button.style;
			setPublicStyle(style);
			style.top = '3%';
			style.zIndex = '5000';
			style.width = '8rem';
			style.height = '8rem';
			style.borderRadius = '50%';
			style.fontSize = '3rem';
			style.border = 'none';
			style.fontWeight = 'bold';
			button.innerText = '刷新';
			button.addEventListener('click', function () {
				location.reload();
			});
			body.appendChild(button);
		}
		function closeThisPage() { // 关闭标签页
			window.close(); // 经测试，在 Microsoft Edge 88 下，若是被 JavaScript 或者 <a> 打开的，可以正常关闭
			const nw: Window | null = open('', '_self'); // 适配一些旧的浏览器
			if (nw !== null) { nw.close(); window.close(); }
			location.href = "about:blank"; window.close(); // 经测试，在 Microsoft Edge 88 下，会打开空页，虽然不会被关闭，但可以减少资源占用
		}
		addEventListener('load', function () { // 页面加载完成后执行的代码
			setTimeout(() => { // 0.7s 后检测是否有错误提示，如果有则关闭标签页
				if ($('.ant-message-custom-content.ant-message-error') !== null) {
					closeThisPage();
				}
			}, 700);
			intervals.removeAD = setInterval(function () { // 每 0.5s 检测广告 <video> 是否存在
				const video: HTMLVideoElement | null = $('video[id^="cc_ad_"]'); // 获取广告 <video>
				if (video !== null) { // 若 <video> 存在
					video.playbackRate = 16; // 将广告 16 倍速播放
					video.volume = 0; // 将广告静音
					const button: HTMLDivElement | null = $('div.ccH5PlayBtn'); // 获取开始播放的 <div> 按钮
					if (button !== null) { // 若 <div> 存在则点击
						button.click();
					}
					clearInterval(intervals.removeAD); // 取消循环检测广告 <video> 是否存在
				}
			}, 500);
			setTimeout(function () { // 4s 后执行
				intervals.fastPlay = setInterval(function () { // 每 0.5s 检测学习视频 <video> 是否存在
					const video: HTMLVideoElement | null = $('video[id^="cc_"][src^="blob:https://"]'); // 获取学习视频 <video>
					if (video !== null) { // 若 <video> 存在
						video.volume = 0; // 将视频静音
						video.addEventListener('play', function () { // 视频开始播放事件
							setTimeout((e: number) => video.playbackRate = e, 200, 16); // 0.2s 后将视频 16 倍速播放
							intervals.fastPlay_2 = setInterval(function () { // 每 1s 检测视频播放速率是否为 16 倍
								if (video.playbackRate != 16) { // 若不是则设置
									video.playbackRate = 16;
								} else { // 若是则停止循环检测视频播放速率
									clearInterval(intervals.fastPlay_2);
								}
							}, 1000);
						});
						video.addEventListener('pause', () => setTimeout(video.play.bind(video), 250)); // 视频暂停后 250ms 继续播放
						video.addEventListener('ended', function () { // 视频结束事件
							if (!loopVideoInput.checked) { // 若关闭刷视频模式才关闭页面
								closeThisPage();
							}
						});
						clearInterval(intervals.fastPlay); // 停止循环检测学习视频 <video> 是否存在
					}
				}, 500);
				intervals.uploadError = setInterval(function () { // 每隔 2.s 检测是否出现课程同步失败信息
					if ($('img[alt="课程同步失败了"]') !== null) { // 若出现则刷新页面
						location.reload();
					}
				}, 2500);
			}, 4000);
		});
	}
})(document.querySelector.bind(document));