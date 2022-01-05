/** @format */

import { createSlice } from '@reduxjs/toolkit'


export const helperSlice = createSlice({
	name: 'helper',
	initialState: {
		showpop: false,
		popdata: {}
	},
	reducers: {
		setShowPop: (state, { payload }) => {
			state.showpop = payload.data
		},
		setPopdata: (state, { payload }) => {
			state.popdata = payload.data
		}
	},
	extraReducers: {}
})

export const { setShowPop, setPopdata } = helperSlice.actions

export const helperSelector = (state) => state.helper
