import { getWikiElement, setWikiElement, wikiSelector } from 'features/WikiSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { StyledRow, StyledSubTitle } from 'StyledComponent'
import { ArrowLeft } from '../../../node_modules/react-feather/dist/index'

const StyledLink = styled.a`
	color: #3575d3 !important;
	margin: 15px 10px 5px 10px;
	font-size: 14px;
    cursor: pointer;	
`


export default function WikiBreadCrumb() {
    const dispatch = useDispatch()
    const { wikibreadcrumb, wikielement } = useSelector(wikiSelector)
    console.log(wikibreadcrumb)
    if (wikibreadcrumb.length){ 
        const len = wikibreadcrumb.length
        const last = wikibreadcrumb[len-2] || null
        if(last){
            return (
				<StyledRow>
					<StyledLink onClick={() => dispatch(getWikiElement({ channelId: wikielement.channel_id, elementId: last?.id }))}>
						{`ᐸ`}&nbsp;
						{last.title}
					</StyledLink>
				</StyledRow>
			) 
        }else{
            return (
				<StyledRow>
					<StyledLink onClick={()=>dispatch(setWikiElement({ data: {} }))}>
						{`ᐸ`}&nbsp;
						{`Go back`}
					</StyledLink>
				</StyledRow>
			) 
        }
    }
    return null
}
