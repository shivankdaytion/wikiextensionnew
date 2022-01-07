import styled from 'styled-components'
const StyledNoData = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	min-height: 300px;
	height: calc(100vh - 245px);
	justify-content: center;
	align-items: center;
	.Nodatabox {
		padding: 20px;
		font-size: 16px !important;
		color: '#333';
		font-weight: 600;
	}
`

export default function Nodata() {
	return (
		<StyledNoData>
			<div className={'Nodatabox'}>No Data</div>
		</StyledNoData>
	)
}
