import React from 'react'
import Styles from './Loading.module.css'

export default function Loading() {
	return (
		<div
			className={Styles.Loading}
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200, width: '100%' }}>
			<div className={Styles.loader}></div>
		</div>
	)
}
