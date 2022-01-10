import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Starred from './Starred'
import Ask from './Ask'
import Wiki from './Wiki'
import Home from './Home'
import { globalStateSelector, setAnimation, setPage } from 'features/GlobalStateSlice'
import { setWikiElement } from 'features/WikiSlice'
import styled from 'styled-components'
import Header from 'component/Header'
import Progress from 'component/Progress'
import Recent from './Recent'

const StyledMain = styled.div`
	overflow: hidden;
	max-height: calc(100vh - 95px);
	.Tabbar {
		border-bottom: 1px #eaeaea solid;
		margin-bottom: 1px;
	}
	.Tabbar ul {
		list-style: none;
		padding: 0px;
		margin: 0px;
		display: flex;
		align-items: center;
	}
	.Tabbar ul li {
		list-style: none;
		min-width: 30px;
		margin: 0px 10px;
		padding: 10px;
		outline: none;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
		cursor: pointer;
		font-weight: 500;
		border-bottom: 2px transparent solid;
		color: #4d4d44;
	}
	.Tabbar ul li.active {
		color: #1890ff;
		border-bottom: 2px #1890ff solid;
	}
	.Content {
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
		height: calc(100vh - 140px);
		position: relative;
	}
	.Content.active {
		display: block;
	}

	.meter {
		height: 5px;
		position: relative;
		background: #f3efe6;
		overflow: hidden;
	}

	.meter span {
		display: block;
		height: 100%;
	}

	.progress {
		background-color: #e4c465;
		-webkit-animation: progressBar 3s ease-in-out;
		-webkit-animation-fill-mode: both;
		-moz-animation: progressBar 3s ease-in-out;
		-moz-animation-fill-mode: both;
	}

	@-webkit-keyframes progressBar {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	@-moz-keyframes progressBar {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}
`

const MainComponent = ({ page }) => {
	if (page === 'Home') {
		return <Home />
	} else if (page === 'Wiki') {
		return <Wiki />
	} else if (page === 'Recent') {
		return <Recent />
	} else if (page === 'Starred') {
		return <Starred />
	}
	return null
}

function HomeIndex() {
	const dispatch = useDispatch()
	const { page } = useSelector(globalStateSelector)

	const switchTab = (page) => {
		dispatch(setPage({ data: page }))
		dispatch(setWikiElement({ data: {} }))
		dispatch(setAnimation({ data: true }))
	}

	return (
		<>
			<StyledMain className={'Tab'}>
				<div className={'Tabbar'}>
					<ul>
						<li onClick={() => switchTab('Recent')} className={`${page === 'Recent' ? 'active' : null}`}>
							Recent
						</li>
						<li onClick={() => switchTab('Home')} className={`${page === 'Home' ? 'active' : null}`}>
							Home
						</li>
						<li onClick={() => switchTab('Wiki')} className={`${page === 'Wiki' ? 'active' : null}`}>
							Wiki
						</li>
						<li onClick={() => switchTab('Starred')} className={`${page === 'Starred' ? 'active' : null}`}>
							Starred
						</li>
					</ul>
				</div>
				<Progress key={page} />
				<div className={'Content'}>
					<MainComponent page={page} />
				</div>
			</StyledMain>
		</>
	)
}
export default memo(HomeIndex)
