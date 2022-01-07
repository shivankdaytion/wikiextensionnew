import ChannelIndex from 'pages/channel/ChannelIndex'
import HomeIndex from 'pages/home/HomeIndex'
import WikiElement from 'pages/home/WikiElement'
import WikiFolder from 'pages/home/WikiFolder'
import Login from 'pages/Login'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Progress from 'component/Progress'


const Screens = () => {
	return (
		<Switch>
			{/* AUTH ROUTES */}
			<ProtectedRoute exact path='/'>
				<HomeIndex />
			</ProtectedRoute>
			<ProtectedRoute exact path='/base/:baseId/channel/:channelId/wiki/folder/:wikiId'>
				<WikiFolder />
			</ProtectedRoute>
			<ProtectedRoute exact path='/base/:baseId/channel/:channelId/wiki/:wikiId'>
				<WikiElement />
			</ProtectedRoute>
			<ProtectedRoute exact path='/base/:baseId/channel/:channelId'>
				<ChannelIndex />
			</ProtectedRoute>
			<Route exact path='/login'>
				<Login />
			</Route>
		</Switch>
	)
}
const Routes = () => {
	return (
		<>
			<MemoryRouter initialIndex={0}>
				<Screens />
			</MemoryRouter>
		</>
	)
}

export default Routes
