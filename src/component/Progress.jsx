import { NProgress } from '@tanem/react-nprogress'
import { globalStateSelector } from 'features/GlobalStateSlice'
import { useSelector } from 'react-redux'

const Bar = ({ progress, animationDuration }) => (
	<div
		id='bar'
		style={{
			backgroundColor: '#6bb7fd',
			height: 2,
			left: 0,
			marginLeft: `${(-1 + progress) * 100}%`,
			position: 'absolute',
			top: 0,
			transition: `margin-left ${animationDuration}ms linear`,
			width: '100%',
			zIndex: 1031
		}}></div>
)

const Container = ({ animationDuration, children, isFinished }) => (
	<div
		style={{
			opacity: isFinished ? 0 : 1,
			pointerEvents: 'none',
			transition: `opacity ${animationDuration}ms linear`
		}}>
		{children}
	</div>
)

const Progress = () => {
	const { isAnimating } = useSelector(globalStateSelector)
	return (
		<div style={{ position: 'relative' }}>
			<NProgress isAnimating={isAnimating}>
				{({ animationDuration, isFinished, progress }) => (
					<Container animationDuration={animationDuration} isFinished={isFinished}>
						<Bar animationDuration={animationDuration} progress={progress} />
						{/* <Spinner /> */}
					</Container>
				)}
			</NProgress>
		</div>
	)
}

export default Progress
