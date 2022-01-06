import React from 'react'
import { X, Copy, CheckCircle, AlertCircle, ThumbsUp, ThumbsDown, Link, ArrowLeft, ExternalLink } from 'react-feather'
import ReactTooltip from 'react-tooltip'
import toast, { Toaster } from 'react-hot-toast'
import Styles from './Detail.module.css'
import PreviewEditor from './editor/PreviewEditor'
import { useDispatch } from 'react-redux'

//import { useTrackedState, useDispatch } from './context/Store'

import { copylink, copyRichText } from './utils/helper'

export default function Detail() {
	//const state = useTrackedState()
	const dispatch = useDispatch()

	const { notedetail, searchresultuuid, user, token } = {}
	const _reset = () => {
		dispatch({ type: 'NOTEDETAIL', payload: {} })
	}
	const tracking = (action) => {
		if (searchresultuuid['uuid']) {
			// const projectId = user.current_project
			// const postdata = {
			// 	uid: searchresultuuid['uuid'] || '',
			// 	keyword: searchresultuuid['keyword'] || '',
			// 	note_id: notedetail.id,
			// 	channel_id: notedetail.channel_id,
			// 	action: action
			// }
			// track(projectId, postdata)
		}
	}
	const _copytext = async () => {
		// const html = document.getElementById(notedetail.id).innerHTML
		// copyRichText(html)
		// await noteCopy(notedetail.id)
		// tracking('copied')
		// toast.success('Content copied...')
	}
	const _linkopen = async () => {
		// await copylink(notedetail)
		// tracking('open')
		// toast.success('Note opened...')
	}
	const _thumpup = async () => {
		// await noteUpvote(notedetail.channel_id, notedetail.id)
		// tracking('upvote')
		// toast.success('Note upvoted...')
	}
	const _thumpdown = async () => {
		// await noteDownvote(notedetail.channel_id, notedetail.id)
		// tracking('downvote')
		// toast.success('Note downvoted...')
	}
	React.useEffect(() => {
		tracking('open')
	}, [])
	return (
		<div className={Styles.Detail} style={{ display: notedetail.id ? 'block' : 'none' }}>
			<div className={Styles.DetailContainer}>
				<div className={Styles.DetailContainerbox}>
					<div className={Styles.Goback}>
						<a href='javascript:void(0)' onClick={_reset}>
							<ArrowLeft color={'#3575d3'} size={18} style={{ marginRight: 10 }} />
							Go Back
						</a>
					</div>
					<h4>
						{notedetail.title}{' '}
						{notedetail.verification === 'unverified' ? (
							<AlertCircle size={18} color={'red'} />
						) : (
							<CheckCircle size={18} color={'green'} />
						)}
					</h4>
					<PreviewEditor id={notedetail.id} initialValue={JSON.parse(notedetail.content)} />
				</div>

				<Toaster
					containerStyle={{
						position: 'absolute'
					}}
					toastOptions={{
						className: '',
						style: {
							position: 'fixed',
							right: '80px',
							top: '100px'
						}
					}}
				/>
			</div>
			<div className={Styles.Footer}>
				<div data-tip data-for='copied' className={Styles.Icon} onClick={() => _copytext()}>
					<Copy size={18} color={'#000'} />
				</div>
				<ReactTooltip id='copied' place='top' effect='float'>
					<span>Copy Note</span>
				</ReactTooltip>
				<div data-tip data-for='link' className={Styles.Icon} onClick={() => _linkopen()}>
					<ExternalLink size={18} color={'#000'} />
				</div>
				<ReactTooltip id='link' place='top' effect='float'>
					<span>Open Link</span>
				</ReactTooltip>
				<div data-tip data-for='thumpsup' className={Styles.Icon} onClick={() => _thumpup()}>
					<ThumbsUp size={18} color={'#000'} />
				</div>
				<ReactTooltip id='thumpsup' place='top' effect='float'>
					<span>Was Useful</span>
				</ReactTooltip>
				<div data-tip data-for='thumpsdown' className={Styles.Icon} onClick={() => _thumpdown()}>
					<ThumbsDown size={18} color={'#000'} />
				</div>
				<ReactTooltip id='thumpsdown' place='top' effect='float'>
					<span>Not Useful</span>
				</ReactTooltip>
			</div>
		</div>
	)
}
