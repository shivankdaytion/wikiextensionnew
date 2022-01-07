import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { baseSelector } from '../../features/BaseSlice'
import { ArrowLeft, FileText, Folder } from '../../../node_modules/react-feather/dist/index'
import { channelSelector } from 'features/ChannelSlice'
import { timeAgo } from 'utils/helper'
import { StyledAvatar, StyledCol, StyledIcon, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'
import { wikiSelector, setWikiElement, getElements, elementBreadCrumb } from 'features/WikiSlice'

import Header from 'component/Header'
import Progress from 'component/Progress'
import { setAnimation } from 'features/GlobalStateSlice'

const StyledListContainer = styled.div`
	overflow-y: auto;
	height: 100%;
	.row:hover {
		background-color: rgb(243, 248, 253) !important;
	}
`

const RenderContent = ({ item, members }) => {
	if (item.mode === 'folder') {
		return (
			<>
				<StyledSubTitle>&nbsp;&nbsp;&bull;&nbsp;&nbsp;</StyledSubTitle>
				{item.folders === 0 && item.notes === 0 ? (
					<StyledSubTitle>{`Empty Folder`}</StyledSubTitle>
				) : (
					<>
						<StyledSubTitle>{item.folders} Folders</StyledSubTitle>
						<StyledSubTitle>&nbsp;&nbsp;&bull;&nbsp;&nbsp;</StyledSubTitle>
						<StyledSubTitle>{item.notes} Notes</StyledSubTitle>
					</>
				)}
			</>
		)
	}
	if (item.status_change_by) {
		const mem = members.find((o) => o.id === item.status_change_by) || {}
		return (
			<>
				<StyledSubTitle>&nbsp;&nbsp;&bull;&nbsp;&nbsp;</StyledSubTitle>
				<StyledSubTitle>
					Update by {mem.name} {timeAgo(item.updated_at)}
				</StyledSubTitle>
			</>
		)
	}
	return (
		<>
			<StyledSubTitle>&nbsp;&nbsp;&bull;&nbsp;&nbsp;</StyledSubTitle>
			<StyledSubTitle>Updated {timeAgo(item.updated_at)}</StyledSubTitle>
		</>
	)
}

const ChannelIndex = () => {
	const history = useHistory()
	const { base, basemembers } = useSelector(baseSelector)
	const { channels } = useSelector(channelSelector)
	const { wikielements } = useSelector(wikiSelector)
	const params = useParams()

	const dispatch = useDispatch()

	const channellist = useMemo(() => channels[base?.id] || [], [base?.id, channels])
	const members = useMemo(() => basemembers[base?.id] || [], [base?.id, basemembers])
	// console.log(channellist, list)

	useEffect(() => {
		dispatch(getElements({ channelId: params.channelId, parentId: params?.wikiId, status: 'all', page: 1 })).then(()=>{
			dispatch(setAnimation({ data: false }))
		})
	}, [dispatch, params.channelId, params?.wikiId])

	const moveToDetail = (o) => {
		dispatch(setWikiElement({ data: o }))
		dispatch(setAnimation({ data: true }))
		if (o.mode === 'folder') {
			history.push(`/base/${base?.id}/channel/${o.channel_id}/wiki/folder/${o.id}`)
		} else {
			history.push(`/base/${base?.id}/channel/${o.channel_id}/wiki/${o.id}`)
		}
	}

	return (
		<>
			<Header />
			<Progress key={'ChannelIndex'} />
			<StyledRow style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
				<StyledIcon onClick={() => history.goBack()}>
					<ArrowLeft size={20} />
				</StyledIcon>
			</StyledRow>
			<StyledListContainer>
				{wikielements.map((o) => {
					const chn = channellist.find((item) => item.id === o.channel_id) || {}
					return (
						<StyledRow key={o.id} className='row' style={{ padding: 6, cursor: 'pointer' }} onClick={() => moveToDetail(o)}>
							<StyledAvatar style={{ marginTop: 3 }}>{o.mode === 'folder' ? <Folder /> : <FileText />}</StyledAvatar>
							<StyledCol>
								<StyledTitle>{o.title}</StyledTitle>
								<StyledRow>
									<StyledSubTitle>#{chn.name}</StyledSubTitle>
									<RenderContent item={o} members={members} />
								</StyledRow>
							</StyledCol>
						</StyledRow>
					)
				})}
			</StyledListContainer>
		</>
	)
}
export default ChannelIndex
