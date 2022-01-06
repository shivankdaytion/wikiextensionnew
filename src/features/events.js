export const getUser = async () => {
	var message = { CMD: 'GET_USER' }
    console.log(message)
	var event = new CustomEvent('passToBackground', { detail: message })
	window.dispatchEvent(event)
}

export const getBases = async () => {
	var message = { CMD: 'GET_BASES' }
	var event = new CustomEvent('passToBackground', { detail: message })
	window.dispatchEvent(event)
}
export const getMetaData = async () => {
	var message = { CMD: 'META_DATA' }
	var event = new CustomEvent('passToBackground', { detail: message })
	window.dispatchEvent(event)
}
