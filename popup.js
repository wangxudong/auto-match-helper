document.getElementById('uploadBtn').addEventListener('click', function() {
	const fileInput = document.getElementById('csvFile');
	const file = fileInput.files[0];

	if (!file) {
		alert('请上传一个 CSV 文件');
		return;
	}

	const reader = new FileReader();
	reader.onload = function(event) {
		const csvData = event.target.result;
		const lines = csvData.split('\n');
		let data = [];

		// 解析 CSV 数据
		lines.forEach(line => {
			data.unshift(line)
		});

		// 发送消息到 content.js
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { action: "upload", data });
		});
	};
	// reader.readAsText(file);
	reader.readAsText(file, 'UTF-8');
});

document.getElementById('matchBtn').addEventListener('click', function() {
	// 发送消息到 content.js
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
	});
});

document.getElementById('pauseBtn').addEventListener('click', function() {
	// 发送消息到 content.js
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: "pause" });
	});
});