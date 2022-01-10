import Nodata from "component/Nodata"
import { baseSelector } from "features/BaseSlice"
import { channelSelector } from "features/ChannelSlice"
import { recentEvent } from "features/events"
import { setAnimation } from "features/GlobalStateSlice"
import { setWikiElement, wikiSelector } from "features/WikiSlice"
import { useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import styled from 'styled-components'
import { StyledAvatar, StyledCol, StyledIcon, StyledRow, StyledSubTitle, StyledTitle } from "StyledComponent"
import { timeAgo } from "utils/helper"
import { ArrowLeft, FileText, Folder } from "../../../node_modules/react-feather/dist/index"
import { useHistory } from "../../../node_modules/react-router-dom/cjs/react-router-dom.min"

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
export default function Recent() {
	const history = useHistory()
	const dispatch = useDispatch()
	const { base, basemembers } = useSelector(baseSelector)
	const { wikirecentelements } = useSelector(wikiSelector)
	const { channels } = useSelector(channelSelector)
	const channellist = useMemo(() => channels[base?.id] || [], [base?.id, channels])
	const members = useMemo(() => basemembers[base?.id] || [], [base?.id, basemembers])

	const list = useMemo(() => wikirecentelements[base?.id] || [], [base?.id, wikirecentelements])
	useEffect(()=>{
		recentEvent()
	},[])

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
		<StyledListContainer>
			{list.length ? (
				list.map((o) => {
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
				})
			) : (
				<Nodata />
			)}
		</StyledListContainer>
	)
}
