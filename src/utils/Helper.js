/* eslint-disable no-undef */
import toast from 'react-hot-toast'
import dayjs from './dayjs'

export const copylink = (note) => {
	const name = note.title.replace(/[\W_]+/g, '-').toLowerCase()
	const str = `https://wiki.app/note/${note.id}/${name}`
	copytext(str)
	toast.success('Link Copied...')
	window.open(str, '_blank')
}
export function copyRichText(text) {
	const listener = function (ev) {
		ev.preventDefault()
		ev.clipboardData.setData('text/html', text)
		ev.clipboardData.setData('text/plain', text)
	}
	document.addEventListener('copy', listener)
	document.execCommand('copy')
	document.removeEventListener('copy', listener)
}
export const copytext = async (text) => {
	var tempInput = document.createElement('input')
	tempInput.value = text
	document.body.appendChild(tempInput)
	tempInput.select()
	document.execCommand('copy')
	document.body.removeChild(tempInput)
}

export const GetToken = () => {
	const state = {} //useTrackedState()
	return [state]
}
var check
export const checkExtensionInstalled = async (extensionid) => {
	// window.clearTimeout(check);
	// const url = `chrome-extension://${extensionid}/bundle.min.js`;
	// try {
	//     const response = await fetch(url);
	//     if (response.status === 200) {
	//         check = window.setTimeout(() => {
	//             checkExtensionInstalled(extensionid);
	//         }, 2000);
	//     }
	// } catch (err) {
	//     check = window.setTimeout(() => {
	//         checkExtensionInstalled(extensionid);
	//     }, 2000);
	//     // const rootnode = document.querySelector("#wikiapp-root");
	//     // const scriptnode = document.querySelector("#wikiapp-bundle");
	//     // if (rootnode) {
	//     //     rootnode.remove();
	//     // }
	//     // if (scriptnode) {
	//     //     scriptnode.remove();
	//     // }
	//     // document.querySelectorAll("script[id*=wikiapp-bundle]").forEach((e, i) => {
	//     //     e.remove();
	//     // });
	// }
}
export const timeAgo = (time, format = '') => {
	const user = JSON.parse(localStorage.getItem('@user')) || {}
	if (format) {
		return dayjs(time).tz(user.timezone).format(format)
	}
	const date = dayjs(time).tz(user.timezone)
	return timeSince(date)
}
function timeSince(date) {
	var seconds = Math.floor((new Date() - date) / 1000)

	var interval = seconds / 31536000

	if (interval > 1) {
		return Math.floor(interval) + ' yr ago'
	}
	interval = seconds / 2592000
	if (interval > 1) {
		return Math.floor(interval) + ' mn ago'
	}
	interval = seconds / 86400
	if (interval > 1) {
		return Math.floor(interval) + ' d ago'
	}
	interval = seconds / 3600
	if (interval > 1) {
		return Math.floor(interval) + ' hr ago'
	}
	interval = seconds / 60
	if (interval > 1) {
		return Math.floor(interval) + ' min ago'
	}
	if (seconds < 10) {
		return 'Just now'
	}
	return Math.floor(seconds) + ' secs ago'
}