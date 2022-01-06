import { userSelector } from 'features/UserSlice'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { baseSelector, getBaseHomeElement, getBaseStarredElement, listBase } from '../../features/BaseSlice'
import { Camera } from 'react-feather'
import { FileText } from '../../../node_modules/react-feather/dist/index'
import { channelSelector } from 'features/ChannelSlice'
import { timeAgo } from 'utils/helper'
import { StyledAvatar, StyledCol, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'

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

const Starred = ({ active }) => {
	const { basestarred, base, basemembers } = useSelector(baseSelector)
	const { channels } = useSelector(channelSelector)
	const dispatch = useDispatch()
	const list = useMemo(() => basestarred[base?.id] || [], [base?.id, basestarred])
	const channellist = useMemo(() => channels[base?.id] || [], [base?.id, channels])
	const members = useMemo(() => basemembers[base?.id] || [], [base?.id, basemembers])
	// console.log(channellist, list)
	useEffect(() => {
		if (base?.id) dispatch(getBaseStarredElement({ baseId: base?.id, page: 1 }))
	}, [base?.id, dispatch])

	return (
		<StyledListContainer>
			{list.map((o) => {
				const chn = channellist.find((item) => item.id === o.channel_id) || {}
				return (
					<StyledRow key={o.id} className='row' style={{ padding: 6, cursor: 'pointer' }}>
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
export default Starred
