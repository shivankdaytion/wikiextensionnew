import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Main from './Main'

import Header from './Header'
import Login from './Login'
import Search from './Search'
import Detail from './Detail'
import { Provider, useDispatch, useSelector } from 'react-redux'

import { checkExtensionInstalled } from './utils/Helper'
import store from './features/store'
import Styles from './App.module.css'
import { baseSelector, listBase } from './features/BaseSlice'
import { userSelector } from './features/UserSlice'
import { globalStateSelector } from './features/GlobalStateSlice'
import { getBases, getUser } from 'features/events'

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
		//checkExtensionInstalled(extensionid)
		setTimeout(() => {
			getBases()
			getUser()
		}, 5000)
	}, [])

	useEffect(() => {
		const passToReact = (evt) => {
			console.log(evt.detail)
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

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
	<Provider store={store}>
		<App />
	</Provider>
)
