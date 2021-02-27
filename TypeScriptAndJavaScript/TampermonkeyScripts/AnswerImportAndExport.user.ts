// ==UserScript==
// @name         升学E网通试卷答案导入/导出
// @namespace    https://lcwebsite.cn/
// @version      0.1.0
// @description  获取升学E网通已完成的试卷选择题答案，快速录入未完成试卷答案。
// @author       LC
// @icon         https://static.lcwebsite.cn/favicon.ico
// @match        https://web.ewt360.com/mystudy/*
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.all.min.js
// @require      https://cdn.jsdelivr.net/npm/js-base64@3.6.0/base64.min.js
// ==/UserScript==
// GitHub 仓库地址：https://github.com/lc6464/ewtPrograms

/* 公开更新记录
* 0.1.0：初代版本，测试 TypeScript 重写。
*/

var Swal: { fire: Function };
var Base64: { encode: Function, decode: Function }; // 这两个是油猴导入的，只能这样子写一下，防止报错，其实没什么意义。

(function ($: any) {
	'use strict';

	const hash = location.hash;
	if (hash.substr(1, 14) === '/exam/analysis') {
		function get() {
			const ans: string[] = [];
			$('.correct-answer.answer-box.status-correct').each(function (this: HTMLElement) {
				ans.push(this.innerText);
			});
			return ans;
		}
		$(document).ready(function () {
			setTimeout(function () {
				Swal.fire({
					title: '升学E网通试卷答案导出',
					html: '请使用配套程序导入以下数据：<br/>' + Base64.encode(JSON.stringify(get())),
					icon: 'info',
					footer: '<a href="https://lcwebsite.cn/" target="_blank">By LC</a>'
				});
			}, 3000);
		});

	} else if (hash.substr(1, 12) === '/exam/answer') {
		function set(ans: string) {
			const choices = { A: 0, B: 1, C: 2, D: 3 };
			$('.question-options').each(function (this: HTMLElement, i: number) {
				const self = $(this);
				ans[i].split(',').forEach(function (thisAns: string) {
					self.find('.option-item')[choices[thisAns]].click(); // 这个报错我试了好多种办法都解决不了，无语了……
				});
			});
		}
		$(document).ready(function () {
			setTimeout(function () {
				Swal.fire({
					title: '升学E网通试卷答案导入',
					input: 'text',
					inputAttributes: { required: 'required' },
					icon: 'question',
					cancelButtonText: '取消',
					showCancelButton: true,
					confirmButtonText: '导入',
					footer: '<a href="https://lcwebsite.cn/" target="_blank">By LC</a>',
					preConfirm: (data: string) => { try { set(JSON.parse(Base64.decode(data))); return [true, data]; } catch { return [false, data]; } }
				}).then(function (e: { isConfirmed: boolean; value: any }) {
					if (e.isConfirmed) {
						setTimeout(function () {
							if (e.value[0]) {
								Swal.fire({
									title: '升学E网通试卷答案导入',
									html: '导入成功！<br/>是否需要自动提交？',
									icon: 'success',
									cancelButtonText: '否',
									showCancelButton: true,
									confirmButtonText: '是',
									footer: '<a href="https://lcwebsite.cn/" target="_blank">By LC</a>'
								}).then(function (e: { isConfirmed: boolean }) {
									if (e.isConfirmed) {
										$('.commit-btn button').click();
									}
								});
							} else {
								Swal.fire({
									title: '升学E网通试卷答案导入',
									html: '导入失败！<br/>您输入的数据：' + e.value[1],
									icon: 'error',
									footer: '<a href="https://lcwebsite.cn/" target="_blank">By LC</a>'
								});
							}
						}, 1000);
					}
				});
			}, 3000);
		});
	}
})(jQuery); // 这个会报错，但不这么写又一堆报错，烦死。