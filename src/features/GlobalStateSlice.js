import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLogin: true,
	isShow: false,
	page: 'Home',
	subpage: '',
	params: {},
	isAnimating: false,
} 

export const globalStateSlice = createSlice({
	name: 'globalState',
	initialState: initialState,
	reducers: {
		setShow: (state, { payload }) => {
			state.isShow = payload.data
			return state
		},
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
		},
		setAnimation: (state, { payload }) => {
			if (state.isAnimating !== payload.data) {
				state.isAnimating = payload.data
			}
			return state
		}
	},
	extraReducers: {}
})

export const { setPage, setSubpage, setParams, setAnimation, setShow } = globalStateSlice.actions

export const globalStateSelector = (state) => state.globalState
