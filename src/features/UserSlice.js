/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { DOMAIN } from './config'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
	},
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload.data
		}
	},
	extraReducers: {}
})

export const { setUser } = userSlice.actions

export const userSelector = (state) => state.user
