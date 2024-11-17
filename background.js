chrome.runtime.onInstalled.addListener(() => {
	chrome.tabs.create({ url: 'popup.html' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'checkContent') {
		const content = request.content;
		const value = csvMap[content];
		if (value) {
			sendResponse({ found: true, value });
		} else {
			sendResponse({ found: false });
		}
	}
});