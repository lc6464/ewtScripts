// 务必要在 https://*.ewt360.com:443 下运行！
// 需要 jQuery 才能正常运行！

function openVideoPages(start: number, end: number, $: { ajax: any }) {
	if (start > end) {
		return { code: 1, windows: '', error: 'start 值不能大于 end!' };
	} else {
		const windows: Window[] = [];
		for (let i = start; i <= end; i++) {
			$.ajax('https://web.ewt360.com/customerApi/api/studyprod/course/detail', {
				type: 'post',
				data: JSON.stringify({ "courseId": i }),
				contentType: "application/json",
				dataType: "json",
				xhrFields: { withCredentials: true }
			}).done(function (e: { success: boolean }) {
				if (e.success) {
					const nw = open(`https://web.ewt360.com/site-study/#/playVideo?courseId=${i}`, '_blank');
					if (nw !== null) {
						windows.push(nw);
						window['LC_BrowserScripts_openPages_openedWindows'] = windows;
					}
				}
			});
		}
		return { code: 0, windows: "window['LC_BrowserScripts_openPages_openedWindows']", error: '' };
	}
}