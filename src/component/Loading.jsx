import styled from 'styled-components'
import Styles from './Loading.module.css'

const StyledLoading = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	justify-content: center;
	align-items: center;
	.loader {
		border: 5px solid #f3f3f3; /* Light grey */
		border-top: 5px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 40px;
		height: 40px;
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


export default function Loading() {
	return (
		<StyledLoading
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200, width: '100%' }}>
			<div className={Styles.loader}></div>
		</StyledLoading>
	)
}
