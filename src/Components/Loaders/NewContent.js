import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Warning from '@material-ui/icons/Warning'
import amber from '@material-ui/core/colors/amber'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { ItemG, Link } from 'Components'
import { Close } from 'variables/icons'
import { closeIsBeta } from 'Redux/serviceWorkerRedux'
import { lighten } from '@material-ui/core/styles'

const IconWarn = styled(Warning)`
	color: #ffffff;
	font-size: 24px;
	opacity: 0.9;
	margin-right: 8px;
`
const UpdateSnackbar = styled(SnackbarContent)`
	background: ${amber[700]};
`
const SuccessButton = styled(Button)`
	color: #ffffff;
	padding: 8px;
	margin: 0px 8px;
	background :#1a1b32;
	&:hover {
    	background: ${lighten('#1a1b32', 0.3)};
  	}
`
const RefreshButton = styled(Button)`
	color: #ffffff;
	background :${amber[700]};
	&:hover {
    	background: ${amber[500]};
  	}
`
const Message = styled.span`
	max-width: 800px;
	color: #ffffff;
	display: flex;
	align-items: center;
`

function NewContent(props) {
	const dispatch = useDispatch()
	// const history = useHistory()
	const serviceWorkerUpdated = useSelector(s => s.serviceWorkerReducer.serviceWorkerUpdated)
	const isBeta = useSelector(s => s.serviceWorkerReducer.isBeta)
	const handleClose = () => {
		window.location.reload()
	}
	const handleBetaClose = () => {
		dispatch(closeIsBeta())
	}
	const handleGoToApp = () => {
		window.location.href = 'https://waterworks.senti.io'
	}
	return (
		<>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={serviceWorkerUpdated}
			>
				<UpdateSnackbar
					message={<Message>
						<IconWarn />
						{'Update Available'}
					</Message>}
					action={<RefreshButton size="small" onClick={handleClose}>
						REFRESH</RefreshButton>}
				>
				</UpdateSnackbar>
			</Snackbar>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={isBeta}
			>
				<UpdateSnackbar
					message={
						<ItemG container>
							<ItemG xs={1} container justify={'center'} alignItems={'center'}>
								<IconWarn />
							</ItemG>
							<ItemG xs={7} container alignItems={'center'}>
								<ItemG xs={12}>
									<Message>
										{`You are running on the \`beta\` version of Senti.Waterworks!`}
									</Message>
								</ItemG>
								<ItemG xs={12}>
									<Message>
										Please consider switching to the stable version at
									</Message>
									<Link href={'https://waterworks.senti.io'}>
										https://waterworks.senti.io
									</Link>
								</ItemG>
							</ItemG>
							<ItemG xs={4} container alignItems={'center'}>
								<SuccessButton size="small" onClick={handleGoToApp}>
									Go to Waterworks
								</SuccessButton>
								<RefreshButton onClick={handleBetaClose}>
									<Close />
								</RefreshButton>
							</ItemG>
						</ItemG>
					}
					// action={

				// }
				>
				</UpdateSnackbar>
			</Snackbar>
		</>

	)
}

export default NewContent