// 此程序无法正常使用，请不要尝试使用。
// 虽然尝试使用也不会有什么特别大的后果，但是这不费时间吗？

function newPraise(userName) {
	$.ajax('https://www.ewt360.com/api/authcenter/oauth/login', {
		type: 'post',
		xhrFields: { withCredentials: true },
		data: JSON.stringify({ platform: 1, userName, password: "a7428361def118911783f446a129ffce" }),
		contentType: 'application/json'
	}).done(function (e) {
		if (e.success) {
			console.log('登录成功！');
			const d = e.data;
			$.cookie('token', d.token, { domain: 'ewt360.com' });
			$.cookie('UserID', d.userId, { domain: 'ewt360.com' });
			$.cookie.raw = true;
			$.cookie('user', `tk=${d.token}&info=${d.info}`);
			$.cookie('ewt_user', `tk=${d.token}&info=${d.info}`);
			$.ajax('https://teacher.ewt360.com/bendbff/api/holidayprod/student/study/newPraise?schoolId=15873&studentId=119255912',
				{ xhrFields: { withCredentials: true } }).done(function (e) {
				if (e.success) {
					console.log('点赞成功！');
				} else {
					console.log('点赞失败：' + e.msg);
				}
			});
		} else {
			console.log('登录失败：' + e.msg);
		}
	});
}