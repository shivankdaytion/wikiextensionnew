import { wikiSelector } from 'features/WikiSlice'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { StyledIcon, StyledLink, StyledRow } from 'StyledComponent'
import { ArrowLeft } from '../../../node_modules/react-feather/dist/index'



export default function WikiBreadCrumb() {
	const history = useHistory()
    const { wikibreadcrumb } = useSelector(wikiSelector)
	const params = useParams()
	console.log('params', params)
    if (wikibreadcrumb.length){ 
        const len = wikibreadcrumb.length
        const last = wikibreadcrumb[len-1] || null
        if(last){
            return (
				<StyledRow style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
					<StyledIcon onClick={() => history.goBack()}>
						<StyledRow style={{ alignItems: 'center'}}>
							<ArrowLeft size={20} />
							&nbsp;
							{last.title}
						</StyledRow>
					</StyledIcon>
				</StyledRow>
			) 
        }else{
            return (
				<StyledRow style={{ justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
					<StyledIcon onClick={() => history.goBack()}>
						<ArrowLeft size={20} />
					</StyledIcon>
				</StyledRow>
			) 
        }
    }
    return null
}
