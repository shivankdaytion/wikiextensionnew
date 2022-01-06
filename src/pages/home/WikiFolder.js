import { userSelector } from 'features/UserSlice'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { baseSelector, getBaseHomeElement, listBase } from '../../features/BaseSlice'
import { Camera } from 'react-feather'
import { FileText } from '../../../node_modules/react-feather/dist/index'
import { channelSelector } from 'features/ChannelSlice'
import { timeAgo } from 'utils/helper'
import { StyledAvatar, StyledCol, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'
import { wikiSelector, setWikiElement, getElements, elementBreadCrumb } from 'features/WikiSlice'
import WikiElement from './WikiElement'
import WikiBreadCrumb from './WikiBreadCrumb'


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

const WikiFolder = ({ active }) => {
	const { basehome, base, basemembers } = useSelector(baseSelector)
	const { channels } = useSelector(channelSelector)
	const { wikielements, wikielement, wikibreadcrumb } = useSelector(wikiSelector)

	const dispatch = useDispatch()

	const channellist = useMemo(() => channels[base?.id] || [], [base?.id, channels])
	const members = useMemo(() => basemembers[base?.id] || [], [base?.id, basemembers])
	// console.log(channellist, list)
	useEffect(() => {
		if (wikielement?.id){
            dispatch(getElements({ channelId: wikielement.channel_id, parentId: wikielement.id, status: 'all', page: 1 })) 
            dispatch(elementBreadCrumb({ channelId: wikielement.channel_id, elementId: wikielement.id }))
        }  
	}, [dispatch, wikielement?.id])

	if (wikielement?.id) {
		return (
			<StyledListContainer>
				<WikiBreadCrumb />
				{wikielements.map((o) => {
					const chn = channellist.find((item) => item.id === o.channel_id) || {}
					return (
						<StyledRow key={o.id} className='row' style={{ padding: 6, cursor: 'pointer' }} onClick={() => dispatch(setWikiElement({ data: o }))}>
							<StyledAvatar style={{ marginTop: 3 }}>
								<FileText />
							</StyledAvatar>
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
		)
	}
	return null
}
export default WikiFolder
