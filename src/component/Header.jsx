import { useEffect } from 'react'
import { X, ChevronDown } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { baseSelector, setBase, switchBase } from '../features/BaseSlice'
import styled from 'styled-components'
import { StyledCol, StyledIcon, StyledRow, StyledSubTitle } from 'StyledComponent'
import { userSelector } from 'features/UserSlice'
import { useHistory } from '../../node_modules/react-router-dom/index'
import {  RefreshCw } from '../../node_modules/react-feather/dist/index'
import { setShow } from 'features/GlobalStateSlice'
import { refreshMetaEvent, switchBaseEvent } from 'features/events'

const StyledHeader = styled.div`
	padding: 5px 10px;
	background-color: #4a8bd4;
	height: 95px;
	overflow: hidden;

	.HeadTop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 5px;
	}
	.HeadTitle {
		font-size: 16px;
		font-weight: bold;
		color: #fff;
		flex: 1;
		display: flex;
		align-items: center;
		img {
			width: 28px;
			height: 28px;
			object-fit: contain;
			border-radius: 28px;
			overflow: hidden;
		}
		.logoText {
			width: 28px;
			height: 28px;
			object-fit: contain;
			border-radius: 28px;
			overflow: hidden;
			text-align: center;
			line-height: 28px;
			background: #ccc;
		}
	}
	.HeadTitle Select {
		background-color: transparent;
		color: #fff;
		outline: none;
		border: none;
		width: 100px;
		text-overflow: ellipsis;
	}
	.HeadSearch input {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		font-variant: tabular-nums;
		list-style: none;
		-webkit-font-feature-settings: 'tnum';
		font-feature-settings: 'tnum';
		position: relative;
		display: inline-block;
		width: 100%;
		min-width: 0;
		padding: 4px 11px;
		color: rgba(0, 0, 0, 0.85);
		font-size: 14px;
		line-height: 1.5715;
		background-color: #fff;
		background-image: none;
		border: 1px solid #d9d9d9;
		border-radius: 2px;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
		outline: none;
		border-radius: 3px;
	}
`

export default function Header() {
	const dispatch = useDispatch()
	const history = useHistory()
	const { bases, base } = useSelector(baseSelector)
	const { user } = useSelector(userSelector)

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
		dispatch(setShow({data: false}))
		document.getElementById('searchtext').value = ''
	}
	const _refresh = () => {
		refreshMetaEvent()
	}
	
	const currentProject = (projid) => {		
		const newbase = bases.find((o) => o.id === parseInt(projid))
		if (newbase) {
			dispatch(setBase({ data: newbase }))
			dispatch(switchBase({ baseId: newbase.id  })).then(()=>{
				switchBaseEvent(newbase)				
			})
		}	
		history.push(`/`)
	}

	useEffect(() => {
		if (bases?.length) {
			//dispatch(setBase({ data: bases[0] }))
		}
	}, [bases])

	return (
		<>
			<StyledHeader>
				<div className={'HeadTop'}>
					<div className={'HeadTitle'}>
						{base.logo ? <img alt='' src={base.logo} /> : <div className='logoText'>{base?.name && base?.name[0]}</div>}
						<StyledCol>
							<StyledRow style={{ alignItems: 'center' }}>
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
							</StyledRow>
							<StyledSubTitle style={{ color: '#FFF' }}>{user.name}</StyledSubTitle>
						</StyledCol>
					</div>
					<StyledRow style={{ width: 45, justifyContent: 'space-between', alignItems: 'center' }}>
						<StyledIcon onClick={_refresh}>
							<RefreshCw color={'#FFF'} size={18} />
						</StyledIcon>
						<StyledIcon onClick={_reset}>
							<X color={'#FFF'} size={20} />
						</StyledIcon>
					</StyledRow>
				</div>
				<div className={'HeadSearch'}>
					<input
						id='searchtext'
						type='search'
						placeholder='Search....'
						//defaultValue={searchtext}
						onKeyDown={_searchChange}
					/>
				</div>
			</StyledHeader>
		</>
	)
}
