import React from 'react'
import Button from '@material-ui/core/Button'
// import chartsButtonStyles from '../Styles/chartsButtonStyles'
import styled from 'styled-components';
import { emphasize } from '@material-ui/core/styles';
import size from 'Styles/themes/mediaQueries';
// const ChartsButton = ({ active, ...rest }) => {
// 	const classes = chartsButtonStyles({ active })
// 	return (
// 		<Button {...rest} className={classes.mainButton}>
// 			{rest.children}
// 		</Button>
// 	)
// }

const ChartsButton = styled(({ isActive, ...props }) => <Button {...props} classes={{
	root: 'root'
}} />)`
	background: ${({ theme, isActive }) => isActive ? theme.activeChartButton : theme.chartButton};
	width: calc(100% - 16px);
	margin: 8px;
	@media ${size.down.md} {
		font-size: 0.87rem;
		height: 36px;
		min-width: 50px;
	}
	min-width: 100px;
	color: #fff;
	text-transform: none;
	height: 46px;
	font-size: 1.25rem;
	border-radius: 8px;
	&:hover {
		background: ${({ theme, isActive }) => isActive ? emphasize(theme.activeChartButton, 0.2) : emphasize(theme.chartButton, 0.2)};
	}
`

export default ChartsButton
