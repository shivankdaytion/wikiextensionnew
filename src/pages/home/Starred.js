import React from 'react'
// import Styles from './Recent.module.css'

import InfiniteScroll from 'react-infinite-scroll-component'


//import { inboxnotes, showNote } from '../model/Api'

import Detail from '../../Detail'

import Loading from '../../component/Loading'
import Nodata from '../../component/Nodata'

const Styles = {}

export default function Starred() {
	// const state = useTrackedState()
	// const dispatch = useDispatch()

	const { notedetail, token, user, recent, recentloading, recentpaging } = {}

	const _inboxnotes = async (paging) => {
		// if (user.current_project && recentloading === false) {
		// 	dispatch({ type: 'RECENTLOADING', payload: true })
		// 	if (paging === 1) {
		// 		dispatch({ type: 'RECENT', payload: [] })
		// 	}
		// 	inboxnotes(user.current_project, paging)
		// }
	}
	const _getNoteDetail = async (noteId) => {
		//showNote(noteId)
	}
	React.useEffect(() => {
		_inboxnotes(1)
	}, [user])
	const isFloat = (n) => {
		return n === 0 ? false : Number(n) === n && n % 1 !== 0
	}
	if (notedetail?.id) {
		return <Detail />
	}
	return (
		<div className={Styles.Recent} id='recent'>
			{recentloading && recent.length === 0 ? <Loading /> : null}
			{recentloading === false && recent.length === 0 ? <Nodata /> : null}
			<InfiniteScroll
				dataLength={recent.length} //This is important field to render the next data
				next={() => _inboxnotes(recentpaging)}
				hasMore={!isFloat(recent.length / 30)}
				loader={null}
				endMessage={null}
				scrollableTarget={'recent'}>
				<ul>
					{recent.map((o, i) => {
						return (
							<li key={`list${i}`} onClick={() => _getNoteDetail(o.id)}>
								{o.title}
							</li>
						)
					})}
				</ul>
			</InfiniteScroll>
		</div>
	)
}
