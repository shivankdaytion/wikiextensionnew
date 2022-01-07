import { globalStateSelector } from 'features/GlobalStateSlice'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({ children, ...rest }) {
	const { isLogin } = useSelector(globalStateSelector)
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isLogin ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	)
}
export default ProtectedRoute
