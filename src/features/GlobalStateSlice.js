import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLogin: true,
	isShow: true,
	page: 'Recent',
	subpage: '',
	params: {},
	isAnimating: false,
	refreshMetaData: false,
	searchText: '',
} 

export const globalStateSlice = createSlice({
	name: 'globalState',
	initialState: initialState,
	reducers: {
		setRefreshMetaData: (state, { payload }) => {
			state.refreshMetaData = payload.data
			return state
		},
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
		},
		setSearchText:(state, { payload }) =>{
			state.searchText = payload.data
			return state
		}
	},
	extraReducers: {}
})

export const { setPage, setSubpage, setParams, setAnimation, setShow, setRefreshMetaData, setSearchText } = globalStateSlice.actions

export const globalStateSelector = (state) => state.globalState
