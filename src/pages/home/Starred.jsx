import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { baseSelector, getBaseStarredElement } from '../../features/BaseSlice'
import { FileText, Folder } from '../../../node_modules/react-feather/dist/index'
import { channelSelector } from 'features/ChannelSlice'
import { timeAgo } from 'utils/helper'
import { StyledAvatar, StyledCol, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'
import { setWikiElement } from 'features/WikiSlice'
import { useHistory } from '../../../node_modules/react-router-dom/index'
import { setAnimation } from 'features/GlobalStateSlice'
import Loading from 'component/Loading'
import InfiniteScroll from '../../../node_modules/react-infinite-scroll-component/dist/index'
import Nodata from 'component/Nodata'

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

const Starred = () => {
	const history = useHistory()
	const { basestarred, basestarredpagination, base, basemembers } = useSelector(baseSelector)
	const { channels } = useSelector(channelSelector)
	const dispatch = useDispatch()
	const list = useMemo(() => basestarred[base?.id] || [], [base?.id, basestarred])
	const channellist = useMemo(() => channels[base?.id] || [], [base?.id, channels])
	const members = useMemo(() => basemembers[base?.id] || [], [base?.id, basemembers])

	useEffect(() => {
		if (base?.id)
			dispatch(setAnimation({ data: true }))
			dispatch(getBaseStarredElement({ baseId: base?.id, page: 1 })).then((response) => {
				dispatch(setAnimation({ data: false }))
			})
	}, [base?.id, dispatch])

	const moveToDetail = (o) => {
		dispatch(setWikiElement({ data: o }))
		dispatch(setAnimation({ data: true }))
		if (o.mode === 'folder') {
			history.push(`/base/${base?.id}/channel/${o.channel_id}/wiki/folder/${o.id}`)
		} else {
			history.push(`/base/${base?.id}/channel/${o.channel_id}/wiki/${o.id}`)
		}
	}
	const fetchData = (page) => {
		dispatch(getBaseStarredElement({ baseId: base?.id, page: page })).then((response) => {
			dispatch(setAnimation({ data: false }))
		})
	}
	return (
		<StyledListContainer id='starred'>
			<InfiniteScroll
				dataLength={list.length} //This is important field to render the next data
				next={() => fetchData(basestarredpagination.page)}
				hasMore={true}
				loader={basestarredpagination.loading && list.length > 0 && <Loading />}
				scrollableTarget='starred'
				endMessage={null}>
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
			</InfiniteScroll>
		</StyledListContainer>
	)
}
export default Starred
