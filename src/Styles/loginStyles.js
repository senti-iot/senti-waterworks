import styled from 'styled-components'
import size from './themes/mediaQueries'
import Paper from '@material-ui/core/Paper'
import { IconButton, ButtonBase, Button } from '@material-ui/core'
import { ItemG, Muted, T, TextF } from 'Components'
// import { container, primaryColor } from "assets/jss/material-dashboard-react";
// import teal from '@material-ui/core/colors/teal'

// wrapper: {
// 	display: 'flex',
// 		// height: '100vh',
// 		overflow: 'auto',
// 			// position: 'fixed',
// 			[theme.breakpoints.up('md')]: {
// 		height: '100vh'
// 	}
// },
export const LoginWrapper = styled.div`
	display: flex;
	overflow: auto;
	@media ${size.up.md} {
		height: 100vh;
	}
`
export const MobileContainer = styled.div`
	@media ${size.down.sm} {
		padding: 16px;
	}
	@media ${size.down.xs} {
		padding: 16px 4px;
	}
`

export const ImgLogo = styled.img`
	height: 64px;
	margin: 8px;
	margin-top: 36px;
	@media ${size.down.lg} {
		height: 54px;
		margin-top: 0px;
	}
`
export const SmallActionButton = styled(IconButton)`
	padding: 0;
	&:hover {
		background: initial;
	}
`
export const Footer = styled(ItemG)`
	padding: 16px;
	flex: 0;
`
export const FooterText = styled(Muted)`
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 300;
	line-height: 1.5em;
	font-size: 13px;

`

export const MutedButton = styled(ButtonBase)`
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 300;
	line-height: 1.5em;
	font-size: 13px;
	margin: 0px 4px;
	text-decoration: underline;
`

export const InputContainer = styled.div`
	flex:1;
	overflow:auto;
	padding: 24px;
	@media ${size.down.md} {
		padding: 16px;
	}
	@media ${size.down.xs} {
		padding: 8px;
	}
`
export const LeftPanel = styled(Paper)`
	overflow: hidden;
	transition: all 300ms ease;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-radius: 0px;
	@media ${size.up.md} {
		height: 100vh;
	}
	@media ${size.down.sm} {
		border-radius: 8px;
	}
`
export const NeedAccountT = styled(T)`
	font-size: 1rem;
	margin: 8px;
	@media ${size.down.md} {
		margin: 8px;
	}
`
export const LoginButton = styled(Button)`
	margin: 8px 0px;
	color: #fff;
	@media ${size.down.md} {
		max-width: 100%;
		margin: 8px 0px;
	}
`
export const ResetPasswordButton = styled(Button)`
	margin: 8px 0px;
	@media ${size.down.md} {
		max-width: 100%;
		margin: 8px 0px;
	}
`
export const NextStepButton = styled(Button)`
	margin-top: 16px;
	color: #fff;
	@media ${size.down.md} {
		max-width: 100%;
		margin: 8px 0px;
	}
`
export const LoginTF = styled(TextF)`
	@media ${size.down.md} {
		margin: 8px 0px;
	}
`

export const AdressTF = styled(TextF)`
	min-width: 0;
	@media ${size.down.md} {
		margin: 8px 0px;
	}
`
