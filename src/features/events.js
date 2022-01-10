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
export const switchBaseEvent = async (payload) => {
	var message = { CMD: 'SWITCH_BASE', payload: payload }
	var event = new CustomEvent('passToBackground', { detail: message })
	window.dispatchEvent(event)
}
export const refreshMetaEvent = async () => {
	var message = { CMD: 'REFRESH_META' }
	var event = new CustomEvent('passToBackground', { detail: message })
	window.dispatchEvent(event)
}
export const recentEvent = async () => {
	var message = { CMD: 'GET_RECENT_ELEMENT' }
	var event = new CustomEvent('passToBackground', { detail: message })
	window.dispatchEvent(event)
}
export const setRecentEvent = async (payload) => {
	var message = { CMD: 'SET_RECENT_ELEMENT', payload: payload }
	var event = new CustomEvent('passToBackground', { detail: message })
	window.dispatchEvent(event)
}