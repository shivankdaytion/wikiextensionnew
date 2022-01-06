import { baseSelector } from 'features/BaseSlice'
import { channelSelector } from 'features/ChannelSlice'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { StyledAvatar, StyledCol, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'
import { Hash } from '../../../node_modules/react-feather/dist/index'

const StyledListContainer = styled.div`
	overflow-y: auto;
	height: 100%;
	.row:hover {
		background-color: rgb(243, 248, 253) !important;
	}
`

export default function Wiki() {
	const { base } = useSelector(baseSelector)
	const { channels } = useSelector(channelSelector)
	const list = useMemo(() => channels[base?.id] || [], [base?.id, channels])

	return (
		<StyledListContainer>
			{list.map((o) => {
				return (
					<StyledRow className='row' key={o.id} style={{ alignItems: 'center', padding: 6, cursor: 'pointer' }}>
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
