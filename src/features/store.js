/** @format */

import { reduxBatch } from '@manaflair/redux-batch'
import { configureStore } from '@reduxjs/toolkit'
import { baseSlice } from './BaseSlice'
import { channelSlice } from './ChannelSlice'
import { helperSlice } from './HelperSlice'
import { wikiSlice } from './WikiSlice'
import { globalStateSlice } from './GlobalStateSlice'
import { askSlice } from './AskSlice'
import { userSlice } from './UserSlice'

export default configureStore({
	//middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	devTools: process.env.NODE_ENV !== 'production',
	reducer: {
		user: userSlice.reducer,
		base: baseSlice.reducer,
		channel: channelSlice.reducer,
		wiki: wikiSlice.reducer,
		helper: helperSlice.reducer,
		ask: askSlice.reducer,
		globalState: globalStateSlice.reducer
	},
	enhancers: [reduxBatch]
})
