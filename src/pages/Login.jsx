import { useEffect } from 'react'
import styled from 'styled-components'

const StyledLogin = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	button {
		padding: 8px 10px;
		color: #fff;
		background: #1890ff;
		border-color: #1890ff;
		text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
		-webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
		box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
		border: none;
		outline: none;
		border-radius: 5px;
		width: 50%;
		font-size: 16px !important;
		cursor: pointer;
	}
`

export default function Login() {
	const moveToLogin = () => {
		const url = 'https://wiki.app'
		window.open(url, '_blank')
	}
	useEffect(()=>{

	},[])
	return (
		<StyledLogin>
			<button onClick={moveToLogin}>Login</button>
		</StyledLogin>
	)
}
