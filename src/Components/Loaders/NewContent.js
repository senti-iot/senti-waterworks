import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Warning from '@material-ui/icons/Warning'
import amber from '@material-ui/core/colors/amber'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { ItemG, Link } from 'Components'
import { closeIsBeta } from 'Redux/serviceWorkerRedux'
import { Close } from 'variables/icons'
import { lightGreen } from '@material-ui/core/colors'

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
	background :#4caf50;
	&:hover {
    	background: ${lightGreen[500]};
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
	// console.log('serviceWorkerUpdated', serviceWorkerUpdated)
	// console.log('isBeta', isBeta)
	const handleClose = () => {
		window.localStorage.clear()
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
						{'Opdatering tilgængelig'}
					</Message>}
					action={<RefreshButton size="small" onClick={handleClose}>
						Genindlæs</RefreshButton>}
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
							<ItemG xs={1} container justifyContent={'center'} alignItems={'center'}>
								<IconWarn />
							</ItemG>
							<ItemG xs={8} container alignItems={'center'}>
								<ItemG xs={12}>
									<Message>
										{`Du kører på "beta"-versionen af senti.waterworks!`}
									</Message>
								</ItemG>
								<ItemG xs={12}>
									<Message>
										Overvej venligst at skifte til den stabile version på
									</Message>
									<Link href={'https://waterworks.senti.io'}>
										https://waterworks.senti.io
									</Link>
								</ItemG>
							</ItemG>
							<ItemG xs={3} container alignItems={'center'}>
								<SuccessButton size="small" onClick={handleGoToApp}>
									Gå til App
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