import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Styles from './HomeTab.module.css'

import Starred from './pages/home/Starred'
import Ask from './pages/home/Ask'
import Wiki from './pages/home/Wiki'
import Home from './pages/home/Home'
import { globalStateSelector, setPage } from 'features/GlobalStateSlice'
import { setWikiElement } from 'features/WikiSlice'



const MainComponent = ({ page }) => {
	if (page === 'Home') {
		return <Home />
	} else if (page === 'Wiki') {
		return <Wiki />
	} else if (page === 'Ask') {
		return <Ask />
	} else if (page === 'Starred') {
		return <Starred />
	}
	return null
}


function Main() {
	const dispatch = useDispatch()
	const { page } = useSelector(globalStateSelector)
	//const [active, setActive] = useState('Home')

	const switchTab = (page) => {
		dispatch(setPage({ data: page }))
		dispatch(setWikiElement({ data: {} }))
	}

	return (
		<div className={Styles.Tab}>
			<div className={Styles.Tabbar}>
				<ul>
					<li onClick={() => switchTab('Home')} className={`${page === 'Home' ? Styles.active : null}`}>
						Home
					</li>
					<li onClick={() => switchTab('Wiki')} className={`${page === 'Wiki' ? Styles.active : null}`}>
						Wiki
					</li>
					<li onClick={() => switchTab('Starred')} className={`${page === 'Starred' ? Styles.active : null}`}>
						Starred
					</li>
					<li onClick={() => switchTab('Ask')} className={`${page === 'Ask' ? Styles.active : null}`}>
						Ask
					</li>
				</ul>
			</div>
			<div className={`${Styles.Content}`}>
				<MainComponent page={page} />
			</div>
		</div>
	)
}
export default Main
