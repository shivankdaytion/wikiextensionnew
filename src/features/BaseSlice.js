/** @format */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { DOMAIN } from './config'

export const switchBase = createAsyncThunk('base/switchBase', async ({ baseId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/switch`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const listBase = createAsyncThunk('base/listBase', async ({}, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base`

		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const baseById = createAsyncThunk('base/baseById', async ({ baseId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const baseMembers = createAsyncThunk('base/baseMembers', async ({ baseId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/members`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const getBaseHomeElement = createAsyncThunk('base/getBaseHomeElement', async ({ baseId, page }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/home?page=${page}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const getBaseStarredElement = createAsyncThunk(
	'base/getBaseStarredElement',
	async ({ baseId, page = 1 }, thunkAPI) => {
		try {
			const URL = `${DOMAIN}/v1/base/${baseId}/starred?page=${page}`
			const response = await axios.get(URL)
			if (response.status === 200) {
				return response.data
			} else {
				return thunkAPI.rejectWithValue(response.data)
			}
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const getBaseDraftsElement = createAsyncThunk(
	'base/getBaseDraftsElement',
	async ({ baseId, page }, thunkAPI) => {
		try {
			const URL = `${DOMAIN}/v1/base/${baseId}/drafts?page=${page}`
			const response = await axios.get(URL)
			if (response.status === 200) {
				return response.data
			} else {
				return thunkAPI.rejectWithValue(response.data)
			}
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const getBaseActivity = createAsyncThunk('base/getBaseActivity', async ({ baseId, page, filter }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/activity?page=${page}&filter=${filter}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

const paginationObj = {
	page: 1,
	total: 0,
	loading: true,
	hasmore: true,
	refreshing: false
}

export const baseSlice = createSlice({
	name: 'base',
	initialState: {
		bases: [],
		base: {},
		basetags: {},
		basemembers: {},
		baseinvites: {},
		baseattributes: {},
		basehome: {},
		basehomepagination: paginationObj,
		basedrafts: {},
		basedraftspagination: paginationObj,
		basestarred: {},
		basestarredpagination: paginationObj,
		baseactivity: {},
		baseactivitypagination: paginationObj
	},
	reducers: {
		setBases: (state, { payload }) => {
			state.bases = payload.data
		},
		setBase: (state, { payload }) => {
			state.base = payload.data
		},
		setBaseMembers: (state, { payload }) => {
			state.basemembers = payload.data
		}
	},
	extraReducers: {
		[listBase.fulfilled]: (state, { payload }) => {
			state.bases = payload.data.bases
			return state
		},
		[baseMembers.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.basemembers[arg.baseId] = payload.data.baseMembers
			return state
		},
		[getBaseHomeElement.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.basehome[arg.baseId]) state.basehome[arg.baseId] = []

			state.basehomepagination = {
				...state.basehomepagination,
				loading: true
			}
			return state
		},
		[getBaseHomeElement.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.basehome[arg.baseId] = arg.page === 1 ? payload.data.data : [...state.basehome[arg.baseId], ...payload.data.data]
			state.basehomepagination = {
				...state.basehomepagination,
				page: arg.page + 1,
				loading: false,
				total: payload.data.total
			}
			return state
		},
		[getBaseStarredElement.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.basestarred[arg.baseId]) state.basestarred[arg.baseId] = []
			state.basestarredpagination = {
				...state.basestarredpagination,
				loading: true
			}
			return state
		},
		[getBaseStarredElement.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.basestarred[arg.baseId] = arg.page === 1 ? payload.data.data : [...state.basestarred[arg.baseId], ...payload.data.data]
			state.basestarredpagination = {
				...state.basestarredpagination,
				page: arg.page + 1,
				loading: false,
				total: payload.data.total
			}
			return state
		},
		[getBaseDraftsElement.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.basedrafts[arg.baseId]) state.basedrafts[arg.baseId] = []
			state.basedraftspagination = {
				...state.basedraftspagination,
				loading: true
			}
			return state
		},
		[getBaseDraftsElement.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.basedrafts[arg.baseId] = arg.page === 1 ? payload.data.data : [...state.basedrafts[arg.baseId], ...payload.data.data]
			state.basedraftspagination = {
				...state.basedraftspagination,
				page: arg.page + 1,
				loading: false,
				total: payload.data.total
			}
			return state
		},
		[getBaseActivity.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.baseactivity[arg.baseId]) state.baseactivity[arg.baseId] = []
			state.baseactivitypagination = {
				...state.baseactivitypagination,
				page: arg.page,
				loading: true
			}
			state.baseactivity[arg.baseId] = arg.page === 1 ? [] : [...state.baseactivity[arg.baseId]]
			return state
		},
		[getBaseActivity.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.baseactivitypagination = {
				...state.baseactivitypagination,
				page: arg.page + 1,
				loading: false,
				total: payload.data.total
			}

			state.baseactivity[arg.baseId] = arg.page === 1 ? payload.data.data : [...state.baseactivity[arg.baseId], ...payload.data.data]

			return state
		}
	}
})

export const { setPage, setHasMore, setLoadMore, setBase, setBases, setBaseMembers } = baseSlice.actions

export const baseSelector = (state) => state.base
