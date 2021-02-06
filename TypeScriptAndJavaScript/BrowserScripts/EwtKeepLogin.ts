function EwtKeepLogin() {
	async function getVideoTime() { // 获取周看课时长
		try {
			const response = await fetch('/customerApi/api/studyprod/lessonCenter/getUserTimeRanking', { // fetch 看课时长 API
				credentials: 'same-origin' // 发送验证信息 (cookies)
			});
			if (response.ok) { // 判断是否出现 HTTP 异常
				return response.json(); // 如果正常，则获取 JSON 数据
			} else { // 若不正常，返回异常信息
				return new Promise(function (resolve) { // 这里用 Promise 的原因是 response.json 返回的是 Promise，方便统一处理，下面那个 Promise 也是同理
					resolve({ success: false, msg: `服务器返回异常 HTTP 状态码：HTTP ${response.statusText}.` });
				});
			}
		} catch (reason) { // 若与服务器连接异常
			return await new Promise(function (resolve) { // 使用 Promise 的原因同上
				resolve({ success: false, msg: '连接服务器过程中出现异常，消息：' + reason.message });
			});
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
}