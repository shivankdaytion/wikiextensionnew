/** @format */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { DOMAIN } from './config'

export const askQuestions = createAsyncThunk('channel/askQuestions', async ({ baseId, filter = 'all', page = 1 }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/questions?filter=${filter}&page=${page}`
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

export const createQuestion = createAsyncThunk('channel/createQuestion', async ({ baseId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/question`
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

export const getQuestion = createAsyncThunk('channel/getQuestion', async ({ baseId, questionId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/question/${questionId}`
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

export const updateAssignToQuestion = createAsyncThunk('channel/updateAssignToQuestion', async ({ baseId, questionId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/question/${questionId}/assignto`
		const response = await axios.put(URL, postdata)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const changeQuestionStatus = createAsyncThunk('channel/changeQuestionStatus', async ({ baseId, questionId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/question/${questionId}/status`
		const response = await axios.put(URL, postdata)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const getAnswers = createAsyncThunk('channel/getAnswers', async ({ baseId, questionId, page = 1 }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/question/${questionId}/answers?page=${page}`
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

export const createAnswer = createAsyncThunk('channel/createAnswer', async ({ baseId, questionId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/question/${questionId}/answer`
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

export const changeAnswerStatus = createAsyncThunk('channel/changeAnswerStatus', async ({ baseId, questionId, answerId, postdata }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/question/${questionId}/answer/${answerId}/status`
		const response = await axios.put(URL, postdata)
		if (response.status === 200) {
			return response.data
		} else {
			return thunkAPI.rejectWithValue(response.data)
		}
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data)
	}
})

export const deleteAnswer = createAsyncThunk('channel/deleteAnswer', async ({ baseId, questionId, answerId }, thunkAPI) => {
	try {
		const URL = `${DOMAIN}/v1/base/${baseId}/question/${questionId}/answer/${answerId}`
		const response = await axios.delete(URL)
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
	loading: true,
	hasmore: true,
	refreshing: false
}
export const askSlice = createSlice({
	name: 'ask',
	initialState: {
		questions: {},
		question: {},
		questionspagination: paginationObj,
		answers: {},
		answer: {},
		answerspagination: paginationObj
	},
	reducers: {
		setQuestion: (state, { payload }) => {
			state.question = payload.data
		}
	},
	extraReducers: {
		[askQuestions.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.questions[arg.baseId]) state.questions[arg.baseId] = []
			state.questionspagination = {
				...state.questionspagination,
				page: arg.page,
				loading: true
			}
			state.questions[arg.baseId] = arg.page === 1 ? [] : [...state.questions[arg.baseId]]
			return state
		},
		[askQuestions.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.questionspagination = {
				...state.questionspagination,
				page: arg.page + 1,
				loading: false,
				total: payload.data.total
			}
			state.questions[arg.baseId] = arg.page === 1 ? payload.data.questions : [...state.questions[arg.baseId], ...payload.data.questions]
			return state
		},
		[changeQuestionStatus.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			const question = payload.data.question
			if(question.status==='delete'){
				state.questions[arg.baseId] = state.questions[arg.baseId].filter((o) => o.id !== arg.questionId)
				state.question = {}
			}
			return state
		},
		[getAnswers.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.answers[arg.questionId]) state.answers[arg.questionId] = []
			state.answerspagination = { ...state.answerspagination, loading: true }
			return state
		},
		[getAnswers.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.answerspagination = {
				...state.answerspagination,
				page: arg.page + 1,
				loading: false,
				hasmore: arg.page === 1 ? true : state.answerspagination.hasmore
			}
			state.answers[arg.questionId] = arg.page === 1 ? payload.data.answers : [...state.answers[arg.questionId], ...payload.data.answers]
			return state
		},
		[updateAssignToQuestion.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.question = payload.data.question
			state.questions[arg.baseId] = state.questions[arg.baseId].map((o) => (o.id === arg.questionId ? payload.data.question : o))
			return state
		},
		[getQuestion.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.question = payload.data.question
			state.questions[arg.baseId] = state.questions[arg.baseId].map((o) => (o.id === arg.questionId ? payload.data.question : o))
			return state
		},
		[createQuestion.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.question = payload.data.question
			state.questions[arg.baseId] = [...state.questions[arg.baseId], payload.data.question]
			return state
		},
		[createAnswer.pending]: (state, { payload, meta }) => {
			const { arg } = meta
			if (!state.answers[arg.questionId]) state.answers[arg.questionId] = []
			return state
		},
		[createAnswer.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.answers[arg.questionId] = [payload.data.answer, ...state.answers[arg.questionId]]
			return state
		},
		[deleteAnswer.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.answers[arg.questionId] = state.answers[arg.questionId].filter((o) => o.id !== arg.answerId)
			return state
		},
		[changeAnswerStatus.fulfilled]: (state, { payload, meta }) => {
			const { arg } = meta
			state.answers[arg.questionId] = state.answers[arg.questionId].map((o) => (o.id === arg.answerId ? payload.data.answer : o))
			return state
		}
	}
})

export const { setQuestion } = askSlice.actions

export const askSelector = (state) => state.ask
