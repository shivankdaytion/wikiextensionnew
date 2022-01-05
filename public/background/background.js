/* eslint-disable no-undef */
var apibrowser = typeof browser !== 'undefined' ? browser : chrome
apibrowser.runtime.onInstalled.addListener(function () {
	apibrowser.tabs.query({}, function (tabs) {
		tabs.forEach((tab) => {
			if (tab.url.indexOf('http') === 0) {
				apibrowser.tabs.executeScript(
					tab.id,
					{
						file: 'context_script/script.js'
					},
					(result) => {
						const lastErr = chrome.runtime.lastError
						if (lastErr) {
							console.error('tab: ' + tabs[index].id + ' lastError: ' + JSON.stringify(lastErr))
						}
					}
				)
			}
		})
	})
	apibrowser.contextMenus.create({
		id: 'Search',
		title: `Search WikiApp for "%s"`,
		type: 'normal',
		contexts: ['selection']
	})
	var newURL = 'https://wiki.app'
	apibrowser.tabs.create({ url: newURL })
})

apibrowser.contextMenus.onClicked.addListener(function (item, tab) {
	apibrowser.tabs.sendMessage(tab.id, { CMD: 'TOKEN', payload: window.localStorage.getItem('token') || '' })
	setTimeout(() => {
		apibrowser.tabs.sendMessage(tab.id, { CMD: 'SEARCH', payload: item.selectionText })
	}, 500)
})
apibrowser.browserAction.onClicked.addListener(function (tab) {
	apibrowser.tabs.sendMessage(tab.id, { CMD: 'TOKEN', payload: window.localStorage.getItem('token') || '' })
	apibrowser.tabs.sendMessage(tab.id, { CMD: 'SHOWPOP' })
})
