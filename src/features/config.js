import axios from 'axios'
export const DOMAIN = process.env.REACT_APP_API_ENDPOINT //process.env.NODE_ENV === 'development' ? `https://8f8f-182-77-0-114.ap.ngrok.io` : `${process.env.REACT_APP_API_ENDPOINT}`
export const URL = `${DOMAIN}/v1`
const app = axios.create({
    DOMAIN,
    withCredentials: true
})
//app.defaults.timeout = 5000
app.interceptors.request.use(function (config) {
    config.withCredentials = true
    return config
})
app.CancelToken = axios.CancelToken
app.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default app
