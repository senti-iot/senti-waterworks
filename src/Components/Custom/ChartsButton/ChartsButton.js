import React from 'react'
import Button from '@material-ui/core/Button'
// import chartsButtonStyles from '../Styles/chartsButtonStyles'
import styled from 'styled-components';
import { emphasize } from '@material-ui/core/styles';
// const ChartsButton = ({ active, ...rest }) => {
// 	const classes = chartsButtonStyles({ active })
// 	return (
// 		<Button {...rest} className={classes.mainButton}>
// 			{rest.children}
// 		</Button>
// 	)
// }

const ChartsButton = styled(props => <Button {...props} classes={{
	root: 'root'
}} />)`
	background: ${({ theme, active }) => active ? theme.palette.secondary.main : theme.palette.primary.main};
	width: calc(100% - 16px);
	margin: 8px;
	min-width: 100px;
	color: #fff;
	text-transform: none;
	height: 46px;
	font-size: 1.25rem;
	border-radius: 8px;
	&:hover {
		background: ${({ theme, active }) => active ? emphasize(theme.palette.secondary.main, 0.2) : emphasize(theme.palette.primary.main, 0.2)};
	}
`

export default ChartsButton
