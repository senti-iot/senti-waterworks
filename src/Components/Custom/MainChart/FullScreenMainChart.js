import React from 'react'
import { Dialog } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import SlideT from 'Components/Transitions/SlideT'
import { MainChart } from 'Components/Custom/MainChart/MainChart'
import { BPaper, AppPaper } from 'Styles/containerStyle'
import { setFullScreenLineGraph } from 'Redux/appState'

const useStyles = makeStyles(theme => ({
	dialogRoot: {
		height: 'calc(100vh - 70px)',
		marginTop: 70,
	},
}))

const FullScreenMainChart = props => {
	//Hooks
	const classes = useStyles()
	const dispatch = useDispatch()
	//Redux
	const fsLG = useSelector(s => s.appState.fullScreenLineChart)
	const colorTheme = useSelector((state) => state.settings.colorTheme)

	//State

	//Const
	const { loading, chart, setChart } = props
	//useCallbacks

	//useEffects

	//Handlers
	const handleOnClose = () => {
		if (fsLG) {
			dispatch(setFullScreenLineGraph(false))
		}
	}
	return (
		<Dialog
			fullScreen
			hideBackdrop // hides the dark overlay and makes it 'clickable-through'
			className={classes.dialogRoot}
			open={fsLG}
			TransitionComponent={SlideT}
			onClose={handleOnClose}
			keepMounted
			disablePortal
		>
			<AppPaper color={colorTheme}>
				<BPaper>
					<MainChart fullScreen loading={loading} chart={chart} setChart={setChart} />
				</BPaper>
			</AppPaper>
		</Dialog>
	)
}

export default FullScreenMainChart
