import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLogin: true,
	isShow: true,
	page: 'Home',
	subpage: '',
	params: {}
} 

export const globalStateSlice = createSlice({
	name: 'globalState',
	initialState: initialState,
	reducers: {
		setParams: (state, { payload }) => {
			state.params = payload.data
			return state
		},
		setPage: (state, { payload }) => {
			state.page = payload.data
			return state
		},
		setSubpage: (state, { payload }) => {
			state.subpage = payload.data
			return state
		}
	},
	extraReducers: {}
})

export const { setPage, setSubpage, setParams } = globalStateSlice.actions

export const globalStateSelector = (state) => state.globalState
