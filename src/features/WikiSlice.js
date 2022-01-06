/** @format */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { DOMAIN } from './config'

export const getElements = createAsyncThunk('wiki/getElements', async ({ channelId, parentId = 0, status = 'all', page = 1 }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/parent/${parentId}?status=${status}&page=${page}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const getElement = createAsyncThunk('wiki/getElement', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}`
		const response = await axios.get(URL)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementArchivedList = createAsyncThunk('wiki/elementArchivedList', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/archived`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementArchive = createAsyncThunk('wiki/elementArchive', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/archive`
		const response = await axios.put(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementUnarchive = createAsyncThunk('wiki/elementUnarchive', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/archive`
		const response = await axios.delete(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementTrashList = createAsyncThunk('wiki/elementTrashList', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/trash`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementTrash = createAsyncThunk('wiki/elementTrash', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/trash`
		const response = await axios.delete(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementRestore = createAsyncThunk('wiki/elementRestore', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/restore`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementPermanentDelete = createAsyncThunk('wiki/elementPermanentDelete', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/delete/permanently`
		const response = await axios.delete(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementStarredList = createAsyncThunk('wiki/elementStarredList', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/starred`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementAddStar = createAsyncThunk('wiki/elementAddStar', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/starred`
		const response = await axios.put(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementDeleteStar = createAsyncThunk('wiki/elementDeleteStar', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/starred`
		const response = await axios.delete(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementNoteVerify = createAsyncThunk('wiki/elementNoteVerify', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/verified`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementNoteUpvote = createAsyncThunk('wiki/elementNoteUpvote', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/upvote`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementNoteDownvote = createAsyncThunk('wiki/elementNoteDownvote', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/downvote`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementBreadCrumb = createAsyncThunk('wiki/elementBreadCrumb', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/breadcrumb`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementAddMessage = createAsyncThunk('wiki/elementAddMessage', async ({ channelId, elementId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/message`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementMessages = createAsyncThunk('wiki/elementMessages', async ({ channelId, elementId, page }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}/messages?page=${page}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementDraftList = createAsyncThunk('wiki/elementDraftList', async ({ channelId, elementId, page }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/draft`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const enableNoteEditing = createAsyncThunk('wiki/enableNoteEditing', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/editing`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const cancelNoteEditing = createAsyncThunk('wiki/cancelNoteEditing', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/editing`
		const response = await axios.delete(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const elementReorder = createAsyncThunk('wiki/elementReorder', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/reorder`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiChannelList = createAsyncThunk('wiki/wikiChannelList', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/channel/list`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiChannels = createAsyncThunk('wiki/wikiChannels', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/channels`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiAddChannel = createAsyncThunk('wiki/wikiAddChannel', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/channel`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiRemoveChannel = createAsyncThunk('wiki/wikiRemoveChannel', async ({ channelId, rowId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/channel/${rowId}`
		const response = await axios.delete(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiAttachedChannel = createAsyncThunk('wiki/wikiAttachedChannel', async ({ channelId, rowId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/attached/wiki/channels`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiAttachedWikiElement = createAsyncThunk('wiki/wikiAttachedWikiElement', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/attached/wiki/element/${elementId}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiAttachedWikiFolder = createAsyncThunk('wiki/wikiAttachedWikiFolder', async ({ channelId, parentId, page }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/attached/wiki/parent/${parentId}?page=${page}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiNoteVerified = createAsyncThunk('wiki/wikiNoteVerified', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/verified`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiPublishNote = createAsyncThunk('wiki/wikiPublishNote', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/publish`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiNoteSwitchDraft = createAsyncThunk('wiki/wikiNoteSwitchDraft', async ({ channelId, noteId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/switchdraft`
		const response = await axios.put(URL, postdata)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const saveCollaborator = createAsyncThunk('wiki/saveCollaborator', async ({ channelId, noteId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/collaborator`
		const response = await axios.put(URL, postdata)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const getWikiElement = createAsyncThunk('wiki/getWikiElement', async ({ channelId, elementId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/element/${elementId}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiSearch = createAsyncThunk('wiki/wikiSearch', async ({ channelId, keyword, channels }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/search?keyword=${keyword}${channels ? `&channels=${channels}` : ''}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const wikiSearchScroll = createAsyncThunk('wiki/wikiSearchScroll', async ({ channelId, scrollId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/search/scroll?id=${scrollId}`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})
export const wikielementNoteUpvote = createAsyncThunk('wiki/wikielementNoteUpvote', async ({ channelId, elementId = 0 }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/attached/wiki/element/${elementId}/upvote`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})
export const wikielementNoteDownvote = createAsyncThunk('wiki/wikielementNoteDownvote', async ({ channelId, elementId = 0 }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/attached/wiki/element/${elementId}/downvote`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const followupList = createAsyncThunk('wiki/followupList', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/followup`
		const response = await axios.get(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})
export const createFollowRequestAll = createAsyncThunk('wiki/createFollowRequestAll', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/followup/all`
		const response = await axios.post(URL, {})
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const createFollowRequest = createAsyncThunk('wiki/createFollowRequest', async ({ channelId, noteId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/followup`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const updateFollowRequest = createAsyncThunk('wiki/updateFollowRequest', async ({ channelId, noteId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/followup`
		const response = await axios.put(URL, {})
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const deleteFollowRequest = createAsyncThunk('wiki/deleteFollowRequest', async ({ channelId, noteId, userId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/wiki/note/${noteId}/followup/${userId}`
		const response = await axios.delete(URL)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

const paginationObj = {
	page: 1,
	loading: true,
	hasmore: true,
	refreshing: false
}
export const wikiSlice = createSlice({
	name: 'wiki',
	initialState: {
		wikielements: [],
		wikielement: {},
		wikielementspagination: paginationObj,
		wikibreadcrumb: []
	},
	reducers: {
		setWikiElements: (state, { payload }) => {
			// state.wikielements = payload.data
		},
		setWikiElement: (state, { payload }) => {
			state.wikielement = payload.data
		}
	},
	extraReducers: {
		[getElements.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			state.wikielementspagination = { ...state.wikielementspagination[arg.channelId], loading: true }
			state.wikielements = arg.page === 1 ? [] : state.wikielements
			return state
		},
		[getElements.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.wikielementspagination = {
				...state.wikielementspagination,
				page: arg.page + 1,
				loading: false,
				hasmore: arg.page === 1 ? true : state.wikielementspagination.hasmore
			}
			state.wikielements = arg.page === 1 ? payload.data.data : [...payload.data.data, ...state.wikielements]
			return state
		},
		[getWikiElement.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.wikielement = payload.data.element
		},
		[elementBreadCrumb.fulfilled]: (state, { payload, meta }) => {
			state.wikibreadcrumb = payload.data.breadcrumb
		},
		[enableNoteEditing.fulfilled]: (state, { payload, meta }) => {
			state.wikielement = payload.data.element
		},
		[wikiNoteSwitchDraft.fulfilled]: (state, { payload, meta }) => {
			state.wikielement = payload.data.element
		},

		[saveCollaborator.fulfilled]: (state, { payload, meta }) => {
			state.wikielement = payload.data.element
		},
		[wikiPublishNote.fulfilled]: (state, { payload, meta }) => {
			state.wikielement = payload.data.element
		}
	}
})

export const { setWikiElement } = wikiSlice.actions

export const wikiSelector = (state) => state.wiki
