import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Styles from './Search.module.css'
import { ArrowLeft } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import Detail from './Detail'
import Loading from './component/Loading'
import Nodata from './component/Nodata'

export default function Header() {
	//const state = useTrackedState()
	const dispatch = useDispatch()

	const { searchresult, searchresultloading, notedetail, token, searchresultuuid, user } = {}
	const _reset = () => {
		dispatch({ type: 'SET_PAGE', payload: 'HOME' })
		dispatch({ type: 'SEARCHRESULT', payload: [] })
		dispatch({ type: 'SETSEARCH', payload: '' })
		dispatch({ type: 'NOTEDETAIL', payload: {} })
		dispatch({ type: 'SEARCHRESULTUUID', payload: {} })
		document.getElementById('searchtext').value = ''
	}
	const _getNoteDetail = async (item) => {
		//const response = await showNote(item.element_id)
	}
	return (
		<div className={Styles.Search}>
			{notedetail.id ? (
				<Detail />
			) : (
				<>
					<div className={Styles.SearchGoback}>
						<a href='javascript:void(0)' onClick={_reset}>
							<ArrowLeft color={'#3575d3'} size={18} style={{ marginRight: 10 }} />
							Go Back
						</a>
					</div>
					{searchresult.length === 0 && searchresultloading ? <Loading /> : null}
					{searchresult.length === 0 && searchresultloading === false ? <Nodata /> : null}
					{searchresult.map((o, i) => {
						if (o.element_type === 'note') {
							return (
								<div className={Styles.SearchRow} onClick={() => _getNoteDetail(o)}>
									<div
										className={Styles.SearchRowTitle}
										dangerouslySetInnerHTML={{
											__html: o.title.replace(/<[^>]*>\s*<\/[^>]*>/g, '')
										}}
									/>
									<div
										className={Styles.SearchRowDescription}
										dangerouslySetInnerHTML={{
											__html: o.content.replace(/<[^>]*>\s*<\/[^>]*>/g, '')
										}}
									/>
								</div>
							)
						}
						return null
					})}
				</>
			)}
		</div>
	)
}
