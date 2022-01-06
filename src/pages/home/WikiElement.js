import React from 'react'
import styled from 'styled-components'
import { StyledCol, StyledRow, StyledSubTitle, StyledTitle } from 'StyledComponent'
import { timeAgo } from 'utils/helper'

const StyledContainer = styled.div`
	overflow-y: auto;
	padding: 10px;
	height: 100%;
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
export default function WikiElement({ wikielement }) {
	return (
		<StyledContainer>
			<StyledCol>
				<StyledTitle style={{ fontSize: 16 }}>{wikielement.title}</StyledTitle>
				<StyledRow style={{ marginTop: 5 }}>
					<StyledSubTitle>Created {timeAgo(wikielement.created_at)}</StyledSubTitle>
					<StyledSubTitle>&nbsp;&nbsp;&bull;&nbsp;&nbsp;</StyledSubTitle>
					<StyledSubTitle>Updated {timeAgo(wikielement.updated_at)}</StyledSubTitle>
				</StyledRow>
			</StyledCol>
            <StyledEditor dangerouslySetInnerHTML={{__html: wikielement.content}}></StyledEditor>
		</StyledContainer>
	)
}
