import { bgColors } from './backgroundColors'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import size from 'Styles/themes/mediaQueries'

// const containerStyles = makeStyles(theme => ({
// 	backgroundColor: {
// 		background: props => bgColors[props.color].background
// 	},
// 	gridItemBackground: {
// 		position: 'relative',
// 		height: 'calc(100% - 32px)',
// 		padding: '8px 16px',
// 		margin: 8,
// 		background: props => darken(hexToRgba(colors[props.color][700], 0.7), 0.5),
// 	}
// }))

export const BPaper = styled(Paper)`
	position: relative;
	height: calc(100% - 32px);
	padding: 8px 16px;
	margin: 8px;
	color: #fff;
	background: ${({ theme }) => theme.boxBackground};
	`
export const AppPaper = styled(Paper)`
	position: relative;
	height: 100%;
	color: #fff;
	background: ${props => bgColors[props.color].background};
	`
export const DPaper = styled(Paper)`
	position: relative;
	height: 100%;
	padding: 8px 16px;
	margin: 8px;
	color: #fff;
	`
export const AppBackground = styled.div`
	margin-top: 70px;
	height: calc(100vh - 70px);
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	background: ${props => bgColors[props.color].background};
	@media ${size.down.sm} {
		padding: '8px 8px 78px 8px';
	}
	`