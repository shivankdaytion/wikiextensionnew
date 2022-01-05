import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Styles from './HomeTab.module.css'

import Starred from './pages/home/Starred'
import Ask from './pages/home/Ask'
import Browse from './pages/home/Browse'
import Home from './pages/home/Home'
import { globalStateSelector, setPage } from 'features/GlobalStateSlice'



const MainComponent = ({ page }) => {
	if (page === 'Home') {
		return <Home />
	} else if (page === 'Channel') {
		return <Browse />
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

	return (
		<div className={Styles.Tab}>
			<div className={Styles.Tabbar}>
				<ul>
					<li onClick={() => dispatch(setPage({ data: 'Home' }))} className={`${page === 'Home' ? Styles.active : null}`}>
						Home
					</li>
					<li onClick={() => dispatch(setPage({ data: 'Channel' }))} className={`${page === 'Channel' ? Styles.active : null}`}>
						Channel
					</li>
					<li onClick={() => dispatch(setPage({ data: 'Ask' }))} className={`${page === 'Ask' ? Styles.active : null}`}>
						Ask
					</li>
					<li onClick={() => dispatch(setPage({ data: 'Starred' }))} className={`${page === 'Starred' ? Styles.active : null}`}>
						Starred
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
