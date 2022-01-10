import { useEffect } from 'react'

import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './features/store'
import { setBase, setBaseMembers, setBases } from './features/BaseSlice'
import { userSelector, setUser } from './features/UserSlice'
import { globalStateSelector, setAnimation, setRefreshMetaData, setSearchText, setShow } from './features/GlobalStateSlice'
import { getMetaData } from 'features/events'
import { setChannels } from 'features/ChannelSlice'
import styled from 'styled-components'
import Routes from 'router/Routes'
import { setRecentElements } from 'features/WikiSlice'

const GlobalStyle = styled.div`
	#wikiapp-root::before,
	#wikiapp-root::after,
	#wikiapp-root *::before,
	#wikiapp-root *::after {
		all: unset;
	}
	#wikiapp-root * {
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
		color: rgba(0, 0, 0, 0.6) !important;
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

	const _search = async (text) => {

	}

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
				if (CMD === 'SEARCH') {
					dispatch(setShow({ data: true }))
					dispatch(setSearchText({ data: payload }))
				}
				if (CMD === 'META_DATA') {
					dispatch(setRefreshMetaData({ data: false }))
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
					if (payload['@recent']) {
						dispatch(setRecentElements({ data: JSON.parse(payload['@recent']) }))
					}
				}
				if (CMD === 'GET_USER') {
					dispatch(setUser({ data: JSON.parse(payload) }))
				}
				if (CMD === 'GET_BASES') {
					dispatch(setBases({ data: JSON.parse(payload) }))
				}
				if (CMD === 'GET_RECENT_ELEMENT') {
					dispatch(setRecentElements({ data: JSON.parse(payload) }))
					dispatch(setAnimation({ data: false }))
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
	<Provider store={store}>
		<GlobalStyle>
			<App />
		</GlobalStyle>
	</Provider>
)
