import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { DOMAIN } from './config'

export const uploadFile = createAsyncThunk('channel/uploadFile', async ({ channelId, postdata, cancelTokenSource = null }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/file/upload`
		const response = await axios.post(URL, postdata, {
			cancelToken: cancelTokenSource.token
		})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})
export const uploadSlice = createSlice({
	name: 'upload',
	initialState: {
		response: {},
        loading: false,
		error: "",
        progress: "",
	},
	reducers: {
		setLoading:(state, { payload }) => {
			state.loading = payload.data
		},
	}
})    
export const { setLoading } = uploadSlice.actions

export const uploadSelector = (state) => state.upload