/* eslint-disable no-undef */
var apibrowser = typeof browser !== 'undefined' ? browser : chrome
apibrowser.runtime.onMessage.addListener((message, sender, response) => {
	if (message.CMD === 'SET_LOGIN' && message.payload) {
		if (sender.url.indexOf('://wiki.app') > -1) {
			window.localStorage.setItem('@token', message.payload)
			response({
				data: 'token received. Thankyou'
			})
			initialData()
		}
	}
	if (message.CMD === 'CHECK_LOGIN') {
		response({
			CMD: message.CMD,
			data: window.localStorage.getItem('@token') || ''
		})
	}
	if (message.CMD === 'GET_USER') {
		response({
			CMD: message.CMD,
			data: window.localStorage.getItem('@user') || {}
		})
	}
	if (message.CMD === 'GET_BASES') {
		response({
			CMD: message.CMD,
			data: window.localStorage.getItem('@bases') || '[]'
		})
	}
	return true
})
const initialData = async () => {
	const response1 = await listBase()
	if (response1.status === 200) {
		window.localStorage.setItem('@bases', JSON.stringify(response1.data.bases))
		apibrowser.tabs.query({}, function (tabs) {
			tabs.forEach((tab) => {
				if (tab.url.indexOf('http') === 0) {
					apibrowser.tabs.sendMessage(tab.id, {
						CMD: 'SET_BASES',
						payload: response1.data.bases
					})
				}
			})
		})
	}
	const response2 = await getUser()
	if (response2.status === 200) {
		window.localStorage.setItem('@user', JSON.stringify(response2.data.user))
		apibrowser.tabs.query({}, function (tabs) {
			tabs.forEach((tab) => {
				if (tab.url.indexOf('http') === 0) {
					apibrowser.tabs.sendMessage(tab.id, {
						CMD: 'SET_USER',
						payload: response2.data.user
					})
				}
			})
		})
	}
}
