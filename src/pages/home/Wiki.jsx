import { baseSelector } from 'features/BaseSlice'
import { channelSelector } from 'features/ChannelSlice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { StyledAvatar, StyledCol, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'
import { Hash } from '../../../node_modules/react-feather/dist/index'
import { useHistory } from 'react-router-dom'
import { setAnimation } from 'features/GlobalStateSlice'
import { setWikiElements } from 'features/WikiSlice'

const StyledListContainer = styled.div`
	overflow-y: auto;
	height: 100%;
	.row:hover {
		background-color: rgb(243, 248, 253) !important;
	}
`

export default function Wiki() {
	const dispatch = useDispatch()
	const history = useHistory()
	const { base } = useSelector(baseSelector)
	const { channels } = useSelector(channelSelector)
	const list = useMemo(() => channels[base?.id] || [], [base?.id, channels])
	const moveToChannel = (channelId) => {
		dispatch(setWikiElements({ data:[] }))
		dispatch(setAnimation({ data: true }))
		history.push(`/base/${base.id}/channel/${channelId}`)
	}
	useEffect(()=>{
		dispatch(setAnimation({ data: false }))
	},[dispatch])

	return (
		<StyledListContainer>
			{list.map((o) => {
				return (
					<StyledRow className='row' key={o.id} style={{ alignItems: 'center', padding: 6, cursor: 'pointer' }} onClick={()=>moveToChannel(o.id)}>
						<StyledAvatar>
							<Hash size={20} />
						</StyledAvatar>
						<StyledCol>
							<StyledTitle>{o.name}</StyledTitle>
							<StyledSubTitle>{o.purpose}</StyledSubTitle>
						</StyledCol>
					</StyledRow>
				)
			})}
		</StyledListContainer>
	)
}
