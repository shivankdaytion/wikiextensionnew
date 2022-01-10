import { useEffect, memo, useRef } from 'react'
import { X, ChevronDown } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { baseSelector, setBase, switchBase } from '../features/BaseSlice'
import styled from 'styled-components'
import { StyledCol, StyledIcon, StyledRow, StyledSubTitle } from 'StyledComponent'
import { userSelector } from 'features/UserSlice'
import { useHistory } from '../../node_modules/react-router-dom/index'
import { RefreshCw } from '../../node_modules/react-feather/dist/index'
import { globalStateSelector, setRefreshMetaData, setSearchText, setShow } from 'features/GlobalStateSlice'
import { refreshMetaEvent, switchBaseEvent } from 'features/events'
import Loading from './Loading'
import ReactTooltip from 'react-tooltip'

const StyledRefreshCw = styled(RefreshCw)`
	animation: spin 2s linear infinite;
	animation-fill-mode: forwards;
	animation-play-state: ${(props) => (props.loading ? 'running' : 'paused')};
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`


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
	.HeadTitle select {
		background-color: transparent;
		color: #fff;
		outline: none;
		border: none;
		width: 100px;
		text-overflow: ellipsis;
	}
	select:after {
		content: '▼';
		position: absolute;
		left: 18px;
		top: 50px;
		width: 0;
		height: 0;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;
		border-top: 20px solid #000;
		clear: both;
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
const Header = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { bases, base } = useSelector(baseSelector)
	const { user } = useSelector(userSelector)
	const { refreshMetaData, searchText } = useSelector(globalStateSelector)

	const searchTextRef = useRef(null)
	const selectRef = useRef(null)

	
	const _reset = () => {
		dispatch(setShow({ data: false }))
		dispatch(setSearchText({ data: '' }))
		document.getElementById('searchtext').value = ''
		history.push(`/`)
	}
	const _refresh = () => {
		dispatch(setRefreshMetaData({ data: true }))
		refreshMetaEvent()
	}
	useEffect(() => {
		searchTextRef.current.value = searchText
		if(searchText.length){
			history.push(`/base/${base?.id}/search`)
		}
	}, [base?.id, history, searchText])

	const currentProject = (projid) => {
		const newbase = bases.find((o) => o.id === parseInt(projid))
		if (newbase) {
			dispatch(setBase({ data: newbase }))
			dispatch(switchBase({ baseId: newbase.id })).then(() => {
				switchBaseEvent(newbase)
			})
		}
		history.push(`/`)
	}
	return (
		<>
			<StyledHeader>
				<div className={'HeadTop'}>
					<div className={'HeadTitle'}>
						{base.logo ? <img alt='' src={base.logo} /> : <div className='logoText'>{base?.name && base?.name[0]}</div>}
						<StyledCol>
							<StyledRow style={{ alignItems: 'center' }}>
								<select ref={selectRef} value={base?.id || 0} onChange={(e) => currentProject(e.currentTarget.value)}>
									{bases.map((o) => {
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
						<StyledIcon data-tip data-for='Refresh' onClick={_refresh}>
							<StyledRefreshCw loading={refreshMetaData} color={'#FFF'} size={18} />
						</StyledIcon>
						<StyledIcon onClick={_reset}>
							<X color={'#FFF'} size={20} />
						</StyledIcon>
					</StyledRow>
				</div>
				<div className={'HeadSearch'}>
					<input id='searchtext' type='search' ref={searchTextRef} placeholder='Search....' defaultValue={searchText} />
				</div>
			</StyledHeader>
			<ReactTooltip id='Refresh' place='top' effect='solid' arrowColor={'#333'}>
				Refresh
			</ReactTooltip>
		</>
	)
}

export default Header
