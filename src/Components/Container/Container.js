import React, { useContext, useEffect } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import { HTitle } from 'App';
import containerStyles from 'Styles/containerStyle';
import { Responsive, WidthProvider } from "react-grid-layout";
import { Paper } from '@material-ui/core';
import LineGraph from 'Components/Graphs/LineGraph';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Container({ ...props }) {
	// const t = useContext(TProvider)
	const setHeader = useContext(HTitle)
	const classes = containerStyles({ color: 'blue' })
	useEffect(() => {
		setHeader('Header Title')
	}, [setHeader])


	//#region Grid Layout
	const gridProps = {
		className: "layout",
		rowHeight: 25,
		preventCollision: false,
		cols: { lg: 12, md: 6, sm: 4, xs: 3, xxs: 3 },
	}
	const onBreakpointChange = () => {
		//TODO
	}

	const onLayoutChange = () => {
		//TODO
	}

	//REMOVE / REPLACE
	const gridDemo = [
		{
			minW: 4,
			minH: 12,
			x: 0,
			y: 0,
			h: 12,
			w: 6
		},
		// {
		// 	minW: 4,
		// 	minH: 12,
		// 	x: 6,
		// 	y: 0,
		// 	h: 12,
		// 	w: 6
		// },
		// {
		// 	minW: 4,
		// 	minH: 12,
		// 	x: 0,
		// 	y: 12,
		// 	h: 12,
		// 	w: 6
		// },
		// {
		// 	minW: 4,
		// 	minH: 12,
		// 	x: 6,
		// 	y: 12,
		// 	h: 12,
		// 	w: 6
		// }
	]
	//#endregion

	return (
		<div className={classes.backgroundColor} style={{ height: 'calc(100vh - 70px)', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
			<ResponsiveReactGridLayout
				{...gridProps}
				onBreakpointChange={onBreakpointChange}
				onLayoutChange={onLayoutChange}
				measureBeforeMount={true}
				// useCSSTransforms={this.state.mounted}
				isResizable={false}
				isDraggable={false}
			>
				{/**
				 * Demo
				 */}

				{gridDemo.map((grid, i) =>
					<Paper className={classes.gridItemBackground} key={i} data-grid={grid}>
						{/* {i} */}
						<LineGraph />
					</Paper>
				)}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default Container
