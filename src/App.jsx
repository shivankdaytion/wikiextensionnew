import { useEffect } from 'react'

import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './features/store'
import { setBase, setBaseMembers, setBases } from './features/BaseSlice'
import { userSelector, setUser } from './features/UserSlice'
import { globalStateSelector, setShow } from './features/GlobalStateSlice'
import { getMetaData } from 'features/events'
import { setChannels } from 'features/ChannelSlice'
import styled from 'styled-components'
import Routes from 'router/Routes'

const GlobalStyle = styled.div`
	#wikiapp-root::before,
	#wikiapp-root::after,
	#wikiapp-root *::before,
	#wikiapp-root *::after {
		all: unset;
	}
	.__react_component_tooltip {
		padding: 4px 10px !important;
		font-size: 14px !important;
	}
	> * {
		font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
		scroll-behavior: smooth !important;
	}
	.App {
		width: 0px;
		height: 100vh;
		position: absolute;
		top: 0px;
		bottom: 0px;
		right: 0px;
		background-color: #fff;
		box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}

	.App.SlideIn {
		animation: slideIn 0.5s backwards;
		-webkit-animation: slideIn 0.5s backwards;
	}

	.App.SlideOut {
		animation: slideOut 0.5s forwards;
		-webkit-animation: slideOut 0.5s forwards;
	}

	@keyframes slideIn {
		0% {
			transform: translateX(calc(100% + 350px));
		}
		100% {
			transform: translateX(0%);
		}
	}

	@-webkit-keyframes slideIn {
		100% {
			-webkit-transform: translateX(0%);
		}
	}

	@keyframes slideOut {
		0% {
			-webkit-transform: translateX(0%);
		}
		100% {
			-webkit-transform: translateX(calc(100% + 350px));
		}
	}

	@-webkit-keyframes slideOut {
		0% {
			-webkit-transform: translateX(0%);
		}
		100% {
			-webkit-transform: translateX(calc(100% + 350px));
		}
	}
	.App * {
		font-size: 14px;
		box-sizing: border-box;
	}
	.App select,
	.App input {
		line-height: unset;
		height: auto;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
	.App *::-webkit-scrollbar {
		width: 5px;
		height: 5px;
		overflow: hidden;
	}
	.App *::-webkit-scrollbar-thumb {
		background: #888;
	}
	.App *::-webkit-scrollbar-track {
		background: #f1f1f1;
		height: 5px;
	}
`

function App() {
	const { isShow, isLogin, page } = useSelector(globalStateSelector)
	const { user } = useSelector(userSelector)
	const dispatch = useDispatch()

	console.log(isShow, isLogin)
	//const { extensionid, projects, , searchtext, notedetail, recent } = {}

	const _isshow = () => {
		// if (isshow) {
		// 	dispatch({ type: 'ISSHOW', payload: false })
		// } else {
		// 	dispatch({ type: 'ISSHOW', payload: true })
		// }
	}
	const _search = async (text) => {
		// dispatch({ type: 'ISSHOW', payload: true })
		// dispatch({ type: 'SETSEARCH', payload: text })
		// dispatch({ type: 'SET_PAGE', payload: 'SEARCH' })
		// const searchnode = document.getElementById('searchtext')
		// if (searchnode) {
		// 	searchnode.value = text
		// }
		// dispatch({ type: 'NOTEDETAIL', payload: {} })
		// dispatch({ type: 'SEARCHRESULTLOADING', payload: true })
		// dispatch({ type: 'SEARCHRESULT', payload: [] })
		// if (user.current_project) {
		// 	search(user.current_project, text)
		// }
	}
	const isJson = (str) => {
		try {
			JSON.parse(str)
		} catch (e) {
			return false
		}
		return true
	}
	const updateDispatch = (data) => {
		// if (isJson(data.payload)) {
		// 	data.payload = JSON.parse(data.payload)
		// }
		// if (Array.isArray(data.payload)) {
		// 	data.payload = data.payload
		// }
		// dispatch(data)
	}
	const mergeDispatch = (data) => {
		// if (isJson(data.payload)) {
		// 	data.payload = [...recent, ...JSON.parse(data.payload)]
		// }
		// if (Array.isArray(data.payload)) {
		// 	data.payload = [...recent, ...data.payload]
		// }
		// dispatch(data)
	}
	window._isshow = _isshow
	window._search = _search
	window.updateDispatch = updateDispatch
	window.mergeDispatch = mergeDispatch

	useEffect(() => {
		setTimeout(() => {
			getMetaData()
		}, 1000)
	}, [])

	useEffect(() => {
		const passToReact = (evt) => {
			if (evt?.detail) {
				const { CMD, payload } = evt?.detail
				if (CMD === 'SHOWPOP') {
					dispatch(setShow({ data: true }))
				}
				if (CMD === 'META_DATA') {
					if (payload['@user']) {
						dispatch(setUser({ data: JSON.parse(payload['@user']) }))
					}
					if (payload['@bases']) {
						dispatch(setBases({ data: JSON.parse(payload['@bases']) }))
					}
					if (payload['@channels']) {
						dispatch(setChannels({ data: JSON.parse(payload['@channels']) }))
					}
					if (payload['@members']) {
						dispatch(setBaseMembers({ data: JSON.parse(payload['@members']) }))
					}
					if (payload['@base']) {
						dispatch(setBase({ data: JSON.parse(payload['@base']) }))
					}
				}
				if (CMD === 'GET_USER') {
					dispatch(setUser({ data: JSON.parse(payload) }))
				}
				if (CMD === 'GET_BASES') {
					dispatch(setBases({ data: JSON.parse(payload) }))
				}
			}
		}
		window.addEventListener('passToReact', passToReact, false) //sender
		return () => {
			window.removeEventListener('passToReact', passToReact, false) //sender
		}
	}, [dispatch])
	return (
		<div className={`${'App'} ${isShow ? 'SlideIn' : 'SlideOut'}`} style={{ width: isShow ? '350px' : '0px', overflow: 'hidden' }}>
			<Routes />
		</div>
	)

	// if (isLogin) {
	//
	// } else {
	// 	return (
	// 		<div
	// 			className={`${Styles.App} ${isShow ? Styles.SlideIn : Styles.SlideOut}`}
	// 			style={{ width: isShow ? '350px' : '0px', overflow: isShow ? 'visible' : 'hidden' }}>
	// 			<Login />
	// 		</div>
	// 	)
	// }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
	<Provider store={store}>
		<GlobalStyle>
			<App />
		</GlobalStyle>
	</Provider>
)
