/* eslint-disable no-undef */
var apibrowser = typeof browser !== 'undefined' ? browser : chrome
const uniqueArray = (arr, key) => {
	var result = arr.reduce((unique, o) => {
		if (!unique.some((obj) => obj[key] === o[key])) {
			unique.push(o)
		}
		return unique
	}, [])
	return result
}
//Listener
apibrowser.runtime.onMessage.addListener((message, sender, response) => {
	console.log(message)
	if (message.CMD === 'SET_LOGIN' && message.payload) {
		if (sender.url.indexOf('://wiki.app') > -1) {
			window.localStorage.setItem('@token', message.payload)
			response({
				CMD: message.CMD,
				payload: 'token received. Thankyou'
			})
			initialData()
		}
	}
	if (message.CMD === 'META_DATA') {
		const meta = window.localStorage
		apibrowser.tabs.query({}, function (tabs) {
			tabs.forEach((tab) => {
				if (tab.url.indexOf('http') === 0) {
					apibrowser.tabs.sendMessage(tab.id, {
						CMD: 'META_DATA',
						payload: meta
					})
				}
			})
		})
	}
	if (message.CMD === 'CHECK_LOGIN') {
		response({
			CMD: message.CMD,
			payload: window.localStorage.getItem('@token') || ''
		})
	}
	if (message.CMD === 'GET_USER') {
		response({
			CMD: message.CMD,
			payload: window.localStorage.getItem('@user') || {}
		})
	}
	if (message.CMD === 'GET_BASES') {
		response({
			CMD: message.CMD,
			payload: window.localStorage.getItem('@bases') || '[]'
		})
	}
	if (message.CMD === 'SWITCH_BASE') {
		window.localStorage.setItem('@base', JSON.stringify(message.payload))
		initialData()
	}
	if (message.CMD === 'REFRESH_META') {
		initialData()
	}
	if (message.CMD === 'SET_RECENT_ELEMENT' && message.payload) {
		const {base, wikielement} = message.payload
		const recent = window.localStorage.getItem('@recent') || '{}'
		const data = recent ? JSON.parse(recent) : {}
		if(!data[base?.id])data[base?.id] = []
		data[base?.id] = uniqueArray([wikielement, ...data[base?.id]], 'id')
		window.localStorage.setItem('@recent', JSON.stringify(data))
		response({
			CMD: message.CMD,
			payload: 'item set'
		})
	}
	if (message.CMD === 'GET_RECENT_ELEMENT') {
		response({
			CMD: message.CMD,
			payload: window.localStorage.getItem('@recent') || '[]'
		})
	}
	return true
})
const initialData = async () => {
	const userresponse = await getUser()
	if (userresponse.status === 200) {
		const user = userresponse.data.user
		window.localStorage.setItem('@user', JSON.stringify(user))
	}
	const basesresponse = await listBase()
	if (basesresponse.status === 200) {
		const bases = basesresponse.data.bases
		window.localStorage.setItem('@bases', JSON.stringify(bases))
		let base = null
		if (userresponse?.data?.user?.current_base && bases.length) {
			base = bases.find((o) => o.id === userresponse?.data?.user?.current_base) || {}
			window.localStorage.setItem('@base', JSON.stringify(base))
		} else if (bases.length) {
			base = bases[0]
			window.localStorage.setItem('@base', JSON.stringify(base))
		}
		if (base?.id) {
			const response3 = await getChannels(base?.id)
			if (response3.status === 200) {
				const channels = {}
				channels[base?.id] = response3.data.channels
				window.localStorage.setItem('@channels', JSON.stringify(channels))
			}
			const response4 = await getBaseMembers(base?.id)
			if (response4.status === 200) {
				const members = {}
				members[base?.id] = response4.data.baseMembers
				window.localStorage.setItem('@members', JSON.stringify(members))
			}
		}
	}

	const meta = window.localStorage

	apibrowser.tabs.query({}, function (tabs) {
		tabs.forEach((tab) => {
			if (tab.url.indexOf('http') === 0) {
				apibrowser.tabs.sendMessage(tab.id, {
					CMD: 'META_DATA',
					payload: meta
				})
			}
		})
	})
}

