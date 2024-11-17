console.log("自动匹配助手加载")
var intervalID = 0;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	let key = "xiaoming";
	// 上传
	if (request.action === "upload") {
		localStorage.setItem(key, JSON.stringify(request.data));
		console.log("上传成功，请点击\"自动匹配\"按钮开始匹配")
	}

	if (request.action === "start") {
		console.log("开始。。。")
		// 间隔时间
		intervalID = setInterval(doit, 5000);
	}

	if (request.action === "pause") {
		clearInterval(intervalID);
		console.log("已停止");
	}

});

function doit() {
	let key = "xiaoming";
	// 从localStorage中读取JSON字符串，并将其转换回数组
	let storedString = localStorage.getItem(key);
	if (storedString) {
		let data = JSON.parse(storedString);
		const contentDivs = document.querySelectorAll('.neeko-text');
		// debugger

		// 遍历页面元素
		// let i = 0
		// contentDivs.forEach(div => {
		// 	// 检查每个div的文本内容是否为"c3"
		// 	console.log(i++);
		// 	console.log(div.textContent);
		// });
		debugger
		if (contentDivs) {
			let page = contentDivs[3].textContent.trim();
			page = page.replace(/[\r\n]+/g, '')

			console.log("匹配页面内容：" + page)
			let find = findElementContainingString(data, page)
			const audio = new Audio(chrome.runtime.getURL('alarm.wav'));
			debugger
			if (find == '') {
				console.error(`没有找到：` + page);
				audio.play();
			} else {
				console.info('找到啦：' + find);

				const sps = document.querySelectorAll('.arco-select-view-value')
				sps[0].textContent = find
				// let j = 0
				// sps.forEach(tt => {
				// 	console.log(j++);
				// 	console.log(tt);
				// 	tt.textContent = find
				// });

				const results = document.querySelectorAll('.arco-select-view-input')
				// let i = 0
				// results.forEach(test => {
				// 	console.log(i++);
				// 	console.log(test);
				// 	test.value = find
				// });
				results[0].placeholder = find
				results[0].value = find

				// 自动提交
				const submitBtn = document.querySelectorAll('.arco-btn-primary');
				submitBtn[0].click()
			}
		}
	} else {
		console.error("缓存中未找到数据，请重新上传。")
	}

}

function findElementContainingString(dataArray, str) {
	// 截断太长的字符串
	var ll = 60
	if (str.length > ll)
		str = str.substring(0, ll)
	for (let i = 0; i < dataArray.length; i++) {
		var das = dataArray[i]
		das = das.replace(/""/g, '"')

		if (das.includes(str)) {
			var index = das.indexOf("\t")
			var result = das.slice(index + 1)
			// console.log("完整记录：" + das)
			return result
		}
	}
	return '';
}