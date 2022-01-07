import Header from 'component/Header'
import Progress from 'component/Progress'
import { setAnimation } from 'features/GlobalStateSlice'
import { wikielementNoteDownvote, wikielementNoteUpvote, wikiSelector } from 'features/WikiSlice'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { StyledAvatar, StyledCol, StyledIcon, StyledLink, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'
import { timeAgo } from 'utils/helper'
import { ArrowLeft, Check, CheckCircle, Copy, ExternalLink, Link, ThumbsDown, ThumbsUp } from '../../../node_modules/react-feather/dist/index'
import toast, { Toaster } from 'react-hot-toast'
import ReactTooltip from 'react-tooltip'


const StyledContainer = styled.div`
	overflow-y: auto;
	padding: 10px;
	height: calc(100vh - 130px);
	.row:hover {
		background-color: rgb(243, 248, 253) !important;
	}
`
const StyledEditor = styled.div`
    padding: 8px;
	word-wrap: break-word;
	box-sizing: border-box;
	line-height: 1.42;
	outline: none;
	tab-size: 4;
	-moz-tab-size: 4;
	text-align: left;
	white-space: pre-wrap;
	max-width: 100%;
	overflow: hidden;
	img {
		max-width: 100% !important;
		object-fit: contain !important;
		height: auto !important;
	}
`
export default function WikiElement() {
	const history = useHistory()
	const dispatch = useDispatch()
	const { wikielement } = useSelector(wikiSelector)
	useEffect(()=>{
		dispatch(setAnimation({ data: false }))
	},[dispatch])

	const copyText = useCallback((item) => {
		const blobInput = new Blob([item.content], { type: 'text/html' })
		const clipboardItemInput = new window.ClipboardItem({ 'text/html': blobInput })
		navigator.clipboard.write([clipboardItemInput])
		toast.success('Text Copied...', { icon: <Check size={14} color='green' />, duration: 1000 })
	}, [])
	const copylink = (item) => {
		const str = `https://wiki.app/c/${item.channel_id}/p/${item.id}`
		navigator.clipboard.writeText(str)
		toast.success('Link Copied...', { icon: <Check size={14} color='green' />, duration: 1000 })
	}
	const _wikielementNoteUpvote = (item) => {
		dispatch(wikielementNoteUpvote({ channelId: item.channel_id, elementId: item.id })).then(()=>{
			toast.success('Upvote Successfully...', { icon: <Check size={14} color='green' />, duration: 1000 })
		})
	}
	const _wikielementNoteDownvote = (item) => {
		dispatch(wikielementNoteDownvote({ channelId: item.channel_id, elementId: item.id })).then(() => {
			toast.success('Downvote Successfully...', { icon: <Check size={14} color='green' />, duration: 1000 })
		})
	}
	return (
		<>
			<Header />
			<Progress key={'WikiElement'} />
			<StyledRow style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
				<StyledIcon onClick={() => history.goBack()}>
					<ArrowLeft size={20} />
				</StyledIcon>
				<StyledRow style={{ width: '40%', justifyContent: 'space-between', alignItems: 'center' }}>
					<StyledIcon data-tip data-for='Copy' onClick={() => copyText(wikielement)}>
						<Copy size={18} />
					</StyledIcon>
					<StyledIcon data-tip data-for='Link' onClick={() => copylink(wikielement)}>
						<Link size={18} />
					</StyledIcon>
					<StyledIcon data-tip data-for='ThumbsUp' onClick={() => _wikielementNoteUpvote(wikielement)}>
						<ThumbsUp size={18} />
					</StyledIcon>
					<StyledIcon data-tip data-for='ThumbsDown' onClick={() => _wikielementNoteDownvote(wikielement)}>
						<ThumbsDown size={18} />
					</StyledIcon>
				</StyledRow>
			</StyledRow>
			<StyledContainer>
				<StyledCol>
					<StyledTitle style={{ fontSize: 16 }}>{wikielement.title}</StyledTitle>
					<StyledRow style={{ marginTop: 5, alignItems: 'center' }}>
						<StyledSubTitle>Created {timeAgo(wikielement.created_at)}</StyledSubTitle>
						<StyledSubTitle>&nbsp;&nbsp;&bull;&nbsp;&nbsp;</StyledSubTitle>
						<StyledSubTitle>Updated {timeAgo(wikielement.updated_at)}</StyledSubTitle>
						{wikielement.status === 'verified' && (
							<StyledRow>
								<StyledSubTitle>&nbsp;&nbsp;&bull;&nbsp;&nbsp;</StyledSubTitle>
								<StyledSubTitle style={{ color: '#3575d3' }}>
									<CheckCircle size={10} /> Verified
								</StyledSubTitle>
							</StyledRow>
						)}
					</StyledRow>
				</StyledCol>
				<StyledEditor dangerouslySetInnerHTML={{ __html: wikielement.content }}></StyledEditor>
			</StyledContainer>
			<Toaster position='bottom-right' reverseOrder={true} />
			<ReactTooltip id='Copy' place='top' effect='solid' arrowColor={'#333'}>
				Copy Content
			</ReactTooltip>
			<ReactTooltip id='Link' place='top' effect='solid' arrowColor={'#333'}>
				Copy Url
			</ReactTooltip>
			<ReactTooltip id='ThumbsUp' place='top' effect='solid' arrowColor={'#333'}>
				Upvote
			</ReactTooltip>
			<ReactTooltip id='ThumbsDown' place='top' effect='solid' arrowColor={'#333'}>
				Downvote
			</ReactTooltip>
		</>
	)
}
