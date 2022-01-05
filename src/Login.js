import React from 'react'
import Styles from './Login.module.css'

export default function Login() {
	const moveToLogin = () => {
		const url = 'https://wiki.app'
		window.open(url, '_blank')
	}
	return (
		<div className={Styles.Login}>
			<button onClick={moveToLogin}>Login</button>
		</div>
	)
}
