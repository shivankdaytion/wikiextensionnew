import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Main from './Main'

import Header from './Header'
import Login from './Login'
import Search from './Search'
import Detail from './Detail'
import { Provider, useDispatch, useSelector } from 'react-redux'

import { checkExtensionInstalled } from './utils/helper'
import store from './features/store'
import Styles from './App.module.css'
import { baseSelector, setBase, setBaseMembers, setBases } from './features/BaseSlice'
import { userSelector, setUser } from './features/UserSlice'
import { globalStateSelector } from './features/GlobalStateSlice'
import { getBases, getMetaData, getUser } from 'features/events'
import { setChannels } from 'features/ChannelSlice'
import styled from 'styled-components'

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
			if(evt?.detail){
				const { CMD, payload } = evt?.detail
				console.log(CMD, payload)
				if(CMD==='META_DATA'){
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
				if(CMD==='GET_USER'){
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

	if (isLogin) {
		return (
			<div
				className={`${Styles.App} ${isShow ? Styles.SlideIn : Styles.SlideOut}`}
				style={{ width: isShow ? '350px' : '0px', overflow: isShow ? 'visible' : 'hidden' }}>
				<Header />
				<Main />
			</div>
		)
	} else {
		return (
			<div
				className={`${Styles.App} ${isShow ? Styles.SlideIn : Styles.SlideOut}`}
				style={{ width: isShow ? '350px' : '0px', overflow: isShow ? 'visible' : 'hidden' }}>
				<Login />
			</div>
		)
	}
}

const GlobalStyle = styled.div`
	> * {
		font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
		scroll-behavior: smooth !important;
	}
`


// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
	<Provider store={store}>
		<GlobalStyle>
			<App />
		</GlobalStyle>
	</Provider>
)
