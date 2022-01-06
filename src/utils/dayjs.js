import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const timezone = require('dayjs/plugin/timezone')
dayjs.extend(timezone)

const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
//dayjs.locale('en')

export default  dayjs 
//module.export = { dayjs }
