/* eslint-disable no-undef */
const DOMAIN = `https://api.wiki.app`
const errorHandle = (err) => {
	if (err.response) {
		if (err.response.status === 401) {
			return err.response.data
		} else {
			return err.response.data
		}
	} else if (err.message === 'Network Error') {
		return { status: 504, message: 'Network Error', data: [] }
	} else {
		return { status: 504, message: 'Other Error', data: [] }
	}
}
axios.interceptors.request.use(function (config) {
	const token = localStorage.getItem('token')
	config.headers.Authorization = `Bearer ${token}`
	return config
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//USER
const getUser = async () => {
	const URL = DOMAIN + '/v1/profile'
	try {
		const response = await axios.get(URL)
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}

const listBase = async () => {
	const URL = DOMAIN + '/v1/base'
	try {
		const response = await axios.get(URL)
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}


//PROJECT

// const listBase = async () => {
// 	const URL = DOMAIN + '/v1/base'
// 	try {
// 		const response = await axios.get(URL)
// 		return response.data
// 	} catch (err) {
// 		return errorHandle(err)
// 	}
// }
const getBaseById = async (id) => {
	const URL = DOMAIN + `/v1/base/${id}`
	try {
		const response = await axios.get(URL)
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}

//SEARCH
let cancelTokenSource
const search = async (baseId, keyword = '') => {
	if (cancelTokenSource) {
		cancelTokenSource.cancel()
	}
	const URL = DOMAIN + `/v1/project/${baseId}/search?keyword=${keyword}`
	try {
		cancelTokenSource = axios.CancelToken.source()
		const response = await axios.get(URL, {
			cancelToken: cancelTokenSource.token
		})
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}

const searchScroll = async (id, baseId) => {
	const URL = DOMAIN + `/v1/base/${baseId}/search/scroll?id=${id}`
	try {
		const response = await axios.get(URL)
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}

//NOTE

const showNote = async (noteId) => {
	const URL = DOMAIN + `/v1/note/${noteId}`
	try {
		const response = await axios.get(URL)
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}

const noteCopy = async (noteId) => {
	const URL = DOMAIN + `/v1/note/${noteId}/copy/count`
	try {
		const response = await axios.post(URL, {})
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}

const noteUpvote = async (channelId, noteId) => {
	const URL = DOMAIN + `/v1/channel/${channelId}/note/${noteId}/upvote`
	try {
		const response = await axios.post(URL, {})
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}
const noteDownvote = async (channelId, noteId) => {
	const URL = DOMAIN + `/v1/channel/${channelId}/note/${noteId}/downvote`
	try {
		const response = await axios.post(URL, {})
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}

//Tracking

const track = async (baseId, postdata) => {
	if (cancelTokenSource) {
		cancelTokenSource.cancel()
	}
	const URL = DOMAIN + `/v1/base/${baseId}/track`
	try {
		cancelTokenSource = axios.CancelToken.source()
		const response = await axios.post(URL, postdata, {
			cancelToken: cancelTokenSource.token
		})
		return response.data
	} catch (err) {
		return errorHandle(err)
	}
}
