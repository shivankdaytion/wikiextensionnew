import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Styles from './Header.module.css'
import { X, ChevronDown } from 'react-feather'
//import { useTrackedState, useDispatch } from './context/Store'
import { useSelector, useDispatch } from 'react-redux'
import { baseSelector, setBase } from './features/BaseSlice'

export default function Header() {
	const dispatch = useDispatch()
	const { bases, base } = useSelector(baseSelector)
	//const { isshow, token, user, projects, searchtext } = state
	const _searchChange = async (e) => {
		// const text = e.currentTarget.value
		// if (e.keyCode === 13 && text.length > 3) {
		// 	dispatch({ type: 'NOTEDETAIL', payload: {} })
		// 	dispatch({ type: 'SEARCHRESULTLOADING', payload: true })
		// 	dispatch({ type: 'SEARCHRESULT', payload: [] })
		// 	dispatch({ type: 'SET_PAGE', payload: 'SEARCH' })
		// 	//const projectId = user.current_project
		// 	//search(projectId, text)
		// 	return
		// }
		// dispatch({ type: 'SETSEARCH', payload: text })
	}
	const _reset = () => {
		// dispatch({ type: 'NOTEDETAIL', payload: {} })
		// dispatch({ type: 'ISSHOW', payload: false })
		// dispatch({ type: 'SET_PAGE', payload: 'HOME' })
		// dispatch({ type: 'SEARCHRESULT', payload: [] })
		// dispatch({ type: 'SETSEARCH', payload: '' })
		// dispatch({ type: 'SEARCHRESULTUUID', payload: {} })
		// document.getElementById('searchtext').value = ''
	}
	const currentProject = (projid) => {
		//console.log(typeof projid, bases)
		const newbase = bases.find((o) => o.id === parseInt(projid))
		console.log('newbase', newbase)
		if(newbase)	dispatch(setBase({ data: newbase }))
	}

	useEffect(() => {
		if (bases?.length) {
			dispatch(setBase({ data: bases[0] }))
		}
	}, [bases])

	return (
		<div className={Styles.Head}>
			<div className={Styles.HeadTop}>
				<div className={Styles.HeadTitle}>
					<span>Mission Internet</span>
					<div className={Styles.HeadTitleDropDown}>
						<select value={base?.id || 0} onChange={(e) => currentProject(e.currentTarget.value)}>
							{bases.map((o, i) => {
								return (
									<option key={o.id} value={o.id}>
										{o.name}
									</option>
								)
							})}
						</select>
						<ChevronDown style={{ marginLeft: -20 }} color={'#FFF'} size={18} />
					</div>
				</div>
				<div className={Styles.HeadClose} onClick={_reset}>
					<X color={'#FFF'} size={16} />
				</div>
			</div>
			<div className={Styles.HeadSearch}>
				<input
					id='searchtext'
					type='search'
					placeholder='Search....'
					//defaultValue={searchtext}
					onKeyDown={_searchChange}
				/>
			</div>
		</div>
	)
}
