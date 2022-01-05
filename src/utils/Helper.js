/* eslint-disable no-undef */
import toast from 'react-hot-toast'
// import { useTrackedState } from '../context/Store'

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
