import styled from 'styled-components'

const StyledLoading = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	justify-content: center;
	align-items: center;
	.loader {
		border: 2px solid #f3f3f3; /* Light grey */
		border-top: 2px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 20px;
		height: 20px;
		animation: spin 2s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`


export default function Loading({ size }) {
	if(size==='small'){
	return (
		<StyledLoading style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
			<div className={'loader'}></div>
		</StyledLoading>
	)	
	}
	return (
		<StyledLoading
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200, width: '100%' }}>
			<div className={'loader'}></div>
		</StyledLoading>
	)
}
