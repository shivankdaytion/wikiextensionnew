/* eslint-disable no-undef */
var apibrowser = typeof browser !== 'undefined' ? browser : chrome
var extensionid = chrome.runtime.id
console.log(extensionid)
function init() {
	setTimeout(() => {
		// var time = new Date().getTime()
		// var id = `wikiapp-bundle-script-execute-SETEXTENSION-${time}`
		// var newscript = document.createElement('script')
		// newscript.id = id
		// newscript.type = 'text/javascript'
		// newscript.innerHTML = ` window.wikidispatch({ type:'SET_EXTENSION', payload: '${extensionid}'  }); setTimeout(() => {
		// 	document.querySelector("#${id}").remove()
		// }, 500);`
		// document.body.appendChild(newscript)
	}, 300)
	setTimeout(() => {
		// chrome.runtime.sendMessage(
		// 	{
		// 		CMD: 'REQUESTTOKEN'
		// 	},
		// 	function (response) {
		// 		if (!response) {
		// 			return
		// 		}
		// 		var time = new Date().getTime()
		// 		var id = `wikiapp-bundle-script-execute-REQUESTTOKEN-${time}`
		// 		var newscript = document.createElement('script')
		// 		newscript.id = id
		// 		newscript.type = 'text/javascript'
		// 		newscript.innerHTML = ` window.wikidispatch({ type:'SET_TOKEN', payload: '${response.data}'  }); setTimeout(() => {
		// 			document.querySelector("#${id}").remove()
		// 		}, 500);`
		// 		document.body.appendChild(newscript)
		// 	}
		// )
		// chrome.runtime.sendMessage(
		// 	{
		// 		CMD: 'REQUESTUSER'
		// 	},
		// 	function (response) {
		// 		if (!response) {
		// 			return
		// 		}

		// 		var time = new Date().getTime()
		// 		var id = `wikiapp-bundle-script-execute-REQUESTUSER-${time}`
		// 		var newscript = document.createElement('script')
		// 		newscript.id = id
		// 		newscript.type = 'text/javascript'
		// 		newscript.innerHTML = ` window.updateDispatch({ type:'SET_USER', payload: '${response.data}'  }); setTimeout(() => {
		// 			document.querySelector("#${id}").remove()
		// 		}, 500);`
		// 		document.body.appendChild(newscript)
		// 	}
		// )
		// chrome.runtime.sendMessage(
		// 	{
		// 		CMD: 'REQUESTPROJECT'
		// 	},
		// 	function (response) {
		// 		if (!response) {
		// 			return
		// 		}
		// 		var time = new Date().getTime()
		// 		var id = `wikiapp-bundle-script-execute-REQUESTPROJECT-${time}`
		// 		var newscript = document.createElement('script')
		// 		newscript.id = id
		// 		newscript.type = 'text/javascript'
		// 		newscript.innerHTML = ` window.updateDispatch({ type:'PROJECTS', payload: '${response.data}'  }); setTimeout(() => {
		// 			document.querySelector("#${id}").remove()
		// 		}, 500);`
		// 		document.body.appendChild(newscript)
		// 	}
		// )
	}, 300)
}
function createHtml() {
	document.querySelectorAll('*[id*=wikiapp-]').forEach((e, i) => {
		e.remove()
	})
	const node = document.querySelector('#wikiapp-root')
	if (node) {
		node.remove()
	}
	const scriptnode = document.querySelector('#wikiapp-bundle')
	if (scriptnode) {
		scriptnode.remove()
	}
	var div = document.createElement('div')
	div.id = 'wikiapp-root'
	div.style.position = 'fixed'
	div.style.top = '0px'
	div.style.right = '0px'
	div.style.bottom = '0px'
	div.style.width = 'auto'
	div.style.overflow = 'visible'
	div.style.zIndex = 10000
	div.style.backgroundColor = 'transparent'
	document.body.appendChild(div)
	setTimeout(() => {
		var script = document.createElement('script')
		script.id = 'wikiapp-bundle'
		script.type = 'text/javascript'
		script.src = chrome.extension.getURL('static/js/main.js')
		document.body.appendChild(script)
		var css = document.createElement('link')
		css.rel = 'preload'
		css.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
		css.as = 'style'
		document.head.appendChild(css)
		setTimeout(() => {
			init()
		}, 300)
	}, 300)
}

const passToReact = (cmd, payload) => {
	//console.log(window.location.href)
	var message = { CMD: cmd, payload: payload }
	var event = new CustomEvent('passToReact', { detail: message })
	window.dispatchEvent(event)
}

//createHtml()
const onMessage = (request, sender, response) => {
	if (!sender) {
		return
	}
	passToReact(request.CMD, request.payload)	
	return true
}

const passToBackground = (evt) => {
	if (!evt) {
		return
	}
	if (!chrome) {
		return
	}
	chrome.runtime.sendMessage(evt.detail, function (response) {
		passToReact(response.CMD, response.payload)
	})
}
const initListener = async () => {
	//console.log(window)
	await chrome.runtime.onMessage.addListener(onMessage) //receiver
	window.addEventListener('passToBackground', passToBackground, false) //sender
}
initListener()
