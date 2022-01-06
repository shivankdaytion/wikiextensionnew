/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { DOMAIN } from './config'

export const browseChannel = createAsyncThunk('channel/browseChannel', async ({ baseId, type = 'all', query = '', page = 1 }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/channels?type=${type}&query=${query}&page=${page}`
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

export const createChannel = createAsyncThunk('channel/createChannel', async ({ baseId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/channel`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const getChannel = createAsyncThunk('channel/getChannel', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}`
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

export const listChannel = createAsyncThunk('channel/listChannel', async ({ baseId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/channel/me`
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

export const listChannelMembers = createAsyncThunk('channel/listChannelMembers', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/members`
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

export const listChannelAttachments = createAsyncThunk('channel/listChannelAttachments', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/attachments`
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

export const listQuickReplies = createAsyncThunk('channel/listQuickReplies', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/quickReplies`
		const response = await axios.get(URL)
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

export const updateChannelDetail = createAsyncThunk('channel/updateChannelDetail', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}`
		const response = await axios.put(URL, postdata)
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

export const leaveChannel = createAsyncThunk('channel/leaveChannel', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/leave`
		const response = await axios.get(URL)
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

export const joinChannel = createAsyncThunk('channel/joinChannel', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/join`
		const response = await axios.get(URL)
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

export const archiveChannel = createAsyncThunk('channel/archiveChannel', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/archive`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const updateChannelPrivacy = createAsyncThunk('channel/updateChannelPrivacy', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/privacy`
		const response = await axios.put(URL, postdata)
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

export const getChannelMemberInvitations = createAsyncThunk('channel/getChannelMemberInvitations', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/invitations`
		const response = await axios.get(URL)
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

export const sendChannelMemberInvite = createAsyncThunk('channel/sendChannelMemberInvite', async ({ baseId, channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/channel/${channelId}/invite`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const deleteChannelMemberInvite = createAsyncThunk('channel/deleteChannelMemberInvite', async ({ channelId, memberId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/invitation/${memberId}`
		const response = await axios.delete(URL)
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

export const deleteChannelMember = createAsyncThunk('channel/deleteChannelMember', async ({ channelId, memberId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/member/${memberId}`
		const response = await axios.delete(URL)
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

export const updateChannelMemberRole = createAsyncThunk('channel/updateChannelMemberRole', async ({ channelId, memberId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/member/${memberId}`
		const response = await axios.put(URL, postdata)
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

export const getAutoReply = createAsyncThunk('channel/getAutoReply', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/autoreply`
		const response = await axios.get(URL)
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

export const autoReplyUpdate = createAsyncThunk('channel/autoReplyUpdate', async ({ channelId, autoreplyId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/autoreply/${autoreplyId}`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const updateQuickReplies = createAsyncThunk('channel/updateQuickReplies', async ({ channelId, quickReplyId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/quickReply/${quickReplyId}`
		const response = await axios.put(URL, postdata)
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

export const createQuickReplies = createAsyncThunk('channel/createQuickReplies', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/quickreply`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const deleteQuickReplies = createAsyncThunk('channel/deleteQuickReplies', async ({ channelId, quickReplyId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/quickReply/${quickReplyId}`
		const response = await axios.delete(URL)
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

export const getQuickReplies = createAsyncThunk('channel/getQuickReplies', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/quickReplies`
		const response = await axios.get(URL)
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

export const updateChannelAttachment = createAsyncThunk('channel/updateChannelAttachment', async ({ channelId, attachmentId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/attachment/${attachmentId}`
		const response = await axios.put(URL, postdata)
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

export const removeChannelAttachment = createAsyncThunk('channel/removeChannelAttachment', async ({ channelId, attachmentId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/attachment/${attachmentId}`
		const response = await axios.delete(URL)
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

export const getSignature = createAsyncThunk('channel/getSignature', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/setting/signature`
		const response = await axios.get(URL)
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

export const createSignature = createAsyncThunk('channel/createSignature', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/setting/signature`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const channelWhatsappSetting = createAsyncThunk('channel/channelWhatsappSetting', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/setting/whatsapp`
		const response = await axios.get(URL)
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

export const updatechannelWhatsappSetting = createAsyncThunk('channel/updatechannelWhatsappSetting', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/setting/whatsapp`
		const response = await axios.put(URL, postdata)
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

export const getAnalytics = createAsyncThunk('channel/getAnalytics', async ({ channelId, startDate, endDate }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/analytics/${channelId}?startDate=${startDate}&endDate=${endDate}`
		const response = await axios.get(URL)
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

export const getTicketOpenChannelId = createAsyncThunk('channel/getTicketOpenChannelId', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/analytics/${channelId}/open`
		const response = await axios.get(URL)
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

export const getWikiAnalytics = createAsyncThunk('channel/getWikiAnalytics', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/analytics/${channelId}/wiki`
		const response = await axios.get(URL)
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

export const getWikiAnalyticsElements = createAsyncThunk('channel/getWikiAnalyticsElements', async ({ channelId, status }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/analytics/${channelId}/wiki/${status}`
		const response = await axios.get(URL)
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

//Sequences

export const listSequences = createAsyncThunk('channel/listSequences', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/sequences`
		const response = await axios.get(URL)
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

export const createSequence = createAsyncThunk('channel/createSequence', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/sequence`
		const response = await axios.put(URL, postdata)
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

export const deleteSequence = createAsyncThunk('channel/deleteSequence', async ({ channelId, sequenceId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/sequence/${sequenceId}`
		const response = await axios.delete(URL)
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

export const updateSequence = createAsyncThunk('channel/updateSequence', async ({ channelId, sequenceId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/sequence/${sequenceId}`
		const response = await axios.put(URL, postdata)
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

//Templates

export const listTemplate = createAsyncThunk('channel/listTemplate', async ({ channelId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/templates`
		const response = await axios.get(URL)
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

export const refreshTemplates = createAsyncThunk('channel/refreshTemplates', async ({ channelId, templateId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/templates/refresh`
		const response = await axios.get(URL)
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

export const updateTemplate = createAsyncThunk('channel/updateTemplate', async ({ channelId, templateId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/template/${templateId}`
		const response = await axios.put(URL, postdata)
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

export const createTemplate = createAsyncThunk('channel/createTemplate', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/template`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const deleteTemplate = createAsyncThunk('channel/deleteTemplate', async ({ channelId, templateId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/template/${templateId}`
		const response = await axios.get(URL)
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

export const autoReplyStatus = createAsyncThunk('channel/autoReplyStatus', async ({ channelId, autoreplyId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/autoreply/${autoreplyId}/status`
		const response = await axios.post(URL, postdata)
		if (response.status === 201) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		console.log('Error', e.response.data)
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const uploadFile = createAsyncThunk('channel/uploadFile', async ({ channelId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/channel/${channelId}/file/upload`
		const response = await axios.post(URL, postdata)
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
export const channelSlice = createSlice({
	name: 'channel',
	initialState: {
		channel: {},
		channels: {},
		channelmembs: {},
		channelquickreplies: {},
		channelattachments: {},
		channelsequences: {},
		channeltemplates: {},
		channelsignature: {}
	},
	reducers: {
		setChannels: (state, { payload }) => {
			state.channels = payload.data
		},
		setChannel: (state, { payload }) => {
			state.channel = payload.data
		}
	},
	extraReducers: {
		[listChannel.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channels[arg.baseId] = payload.data.channels
			state.channelmembs[arg.baseId] = payload.data.members
			return state
		},
		[getChannel.fulfilled]: (state, { payload, meta }) => {
			state.channel = payload.data.channel
			return state
		},
		[listChannelAttachments.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelattachments[arg.channelId] = payload.data.attachments
			return state
		},
		[listSequences.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelsequences[arg.channelId] = payload.data.sequences
			return state
		},
		[updateSequence.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelsequences[arg.channelId] = (state.channelsequences[arg.channelId] || []).map((o) =>
				o.id === arg.sequenceId ? payload.data.sequence : o
			)
			return state
		},
		[createSequence.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelsequences[arg.channelId] = [payload.data.sequence, ...state.channelsequences[arg.channelId]]
			return state
		},
		[deleteSequence.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelsequences[arg.channelId] = (state.channelsequences[arg.channelId] || []).filter((o) => o.id !== arg.sequenceId)
			return state
		},
		[listTemplate.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channeltemplates[arg.channelId] = payload.data.templates
			return state
		},
		[refreshTemplates.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channeltemplates[arg.channelId] = payload.data.templates
			return state
		},
		[updateTemplate.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channeltemplates[arg.channelId] = payload.data.templates
			return state
		},
		[leaveChannel.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			//state.channels[arg.baseId] = (state.channels[arg.baseId] || []).map((o, i) => o.id === arg.channelId ? { ...o, role: '' } : o)
			state.channel = payload.data.channel
			return state
		},
		[updateChannelPrivacy.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			//state.channels[arg.baseId] = (state.channels[arg.baseId] || []).map((o, i) => o.id === arg.channelId ? { ...o, role: '' } : o)
			state.channel = payload.data.channel
			return state
		},
		[updateChannelDetail.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			//state.channels[arg.baseId] = (state.channels[arg.baseId] || []).map((o, i) => o.id === arg.channelId ? { ...o, role: '' } : o)
			state.channel = payload.data.channel
			return state
		},
		[getSignature.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.channelsignature[arg.channelId]) state.channelsignature[arg.channelId] = {}
			return state
		},
		[getSignature.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			const { channelMemberSignature } = payload.data
			state.channelsignature[arg.channelId] = channelMemberSignature
			return state
		},
		[listQuickReplies.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.channelquickreplies[arg.channelId]) state.channelquickreplies[arg.channelId] = []
			return state
		},
		[listQuickReplies.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelquickreplies[arg.channelId] = payload.data.quickReplies
			return state
		},
		[createQuickReplies.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelquickreplies[arg.channelId] = [payload.data.quickReply, ...state.channelquickreplies[arg.channelId]]
			return state
		},
		[updateQuickReplies.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelquickreplies[arg.channelId] = (state.channelquickreplies[arg.channelId] || []).map((o) =>
				o.id === arg.quickReplyId ? payload.data.quickReply : o
			)
			return state
		},
		[deleteQuickReplies.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelquickreplies[arg.channelId] = (state.channelquickreplies[arg.baseId] || []).filter((o) => o.id !== arg.quickReplyId)
			return state
		},
		[sendChannelMemberInvite.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.channelinvites[arg.channelId]) state.channelinvites[arg.channelId] = []
			return state
		},
		[sendChannelMemberInvite.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.channelinvites[arg.channelId] = [...state.channelinvites[arg.channelId]]
			return state
		},
		[updateChannelAttachment.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			const { attachment } = payload.data
			state.channelattachments[arg.channelId] = (state.channelattachments[arg.channelId] || []).map((o, i) =>
				o.id === arg.attachmentId ? attachment : o
			)
			return state
		}
	}
})

export const { setChannels, setChannel } = channelSlice.actions

export const channelSelector = (state) => state.channel
