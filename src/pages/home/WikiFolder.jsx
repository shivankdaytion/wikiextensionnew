import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { baseSelector } from '../../features/BaseSlice'
import { FileText, Folder } from '../../../node_modules/react-feather/dist/index'
import { channelSelector } from 'features/ChannelSlice'
import { timeAgo } from 'utils/helper'
import { StyledAvatar, StyledCol, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'
import { wikiSelector, setWikiElement, getElements, elementBreadCrumb } from 'features/WikiSlice'
import WikiBreadCrumb from './WikiBreadCrumb'
import Header from 'component/Header'
import Progress from 'component/Progress'
import { setAnimation } from 'features/GlobalStateSlice'
import Nodata from 'component/Nodata'
import InfiniteScroll from '../../../node_modules/react-infinite-scroll-component/dist/index'
import Loading from 'component/Loading'

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

const WikiFolder = () => {
	const history = useHistory()
	const { base, basemembers } = useSelector(baseSelector)
	const { channels } = useSelector(channelSelector)
	const { wikielements, wikielementspagination } = useSelector(wikiSelector)
	const params = useParams()

	const dispatch = useDispatch()

	const channellist = useMemo(() => channels[base?.id] || [], [base?.id, channels])
	const members = useMemo(() => basemembers[base?.id] || [], [base?.id, basemembers])
	// console.log(channellist, list)

	useEffect(() => {
		dispatch(elementBreadCrumb({ channelId: params.channelId, elementId: params?.wikiId }))
		dispatch(getElements({ channelId: params.channelId, parentId: params?.wikiId, status: 'all', page: 1 })).then(() => {
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
	const fetchData = (page) => {
		dispatch(getElements({ channelId: params.channelId, parentId: params?.wikiId, status: 'all', page: page })).then(() => {
			dispatch(setAnimation({ data: false }))
		})
	}

	return (
		<>
			<Progress key={'WikiFolder'} />
			<WikiBreadCrumb />
			<StyledListContainer id='wikifolder'>
				<InfiniteScroll
					dataLength={wikielements.length} //This is important field to render the next data
					next={() => fetchData(wikielementspagination.page)}
					hasMore={true}
					loader={wikielementspagination.loading && <Loading />}
					scrollableTarget='wikifolder'
					endMessage={null}>
					{wikielements.length ? (
						wikielements.map((o) => {
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
						<Nodata loading={wikielementspagination.loading} />
					)}
				</InfiniteScroll>
			</StyledListContainer>
		</>
	)
}
export default WikiFolder
