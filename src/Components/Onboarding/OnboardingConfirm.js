import React, { useState } from 'react'
import { T } from 'Components'
// import loginImages from 'assets/imgs/loginImages/loader'
// import sentiIpadIMG from 'assets/imgs/senti-ipad.png'
import sentiIpadIMG from 'assets/imgs/pcdashboard.png'
import ImgTexture from 'assets/imgs/texture_inverted2.png'
import sentiWaterWorks from 'assets/senti.waterworks.svg'
import { useLocalization, useSelector, useHistory } from 'Hooks'
import { makeStyles } from '@material-ui/styles'
import { sideBarColor } from 'Styles/mainStyles'
import styled from 'styled-components'
import { bgColors } from 'Styles/backgroundColors'
import { Button } from '@material-ui/core'
import FadeLoader from 'Components/Loaders/FadeLoader'

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => bgColors[props.color].background};
`
const styles = makeStyles(theme => ({
	container: {
		backgroundImage: `url(${ImgTexture})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "bottom",
		backgroundColor: sideBarColor,
		// background: sideBarColor,
		width: "100%",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	contentWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexFlow: "column",
		margin: '15px 10px',
		[theme.breakpoints.down('lg')]: {
			margin: "0px 0px"
		}
	},
	bold: {
		fontWeight: 600
	},
	message: {
		fontSize: 18,
		color: '#fff',
		// padding: 25,
		// paddingTop: 0,

		maxWidth: '60vw',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '90vw'
		},
		textAlign: 'center',
		margin: 8
		// marginBottom: 30,
		// whiteSpace: "nowrap"
	},
	overcomplicatedButtonTextLight: {
		fontWeight: 300,
		marginRight: 4
	},
	overcomplicatedButtonTextRegular: {
		fontWeight: 700
	},
	button: {
		color: '#FFFfff',
		textTransform: 'none',
		marginBottom: 24,
		boxShadow: 'none'
	},
	img: {
		height: 500,
		[theme.breakpoints.down('xl')]: {
			height: 450
		},
		[theme.breakpoints.down('lg')]: {
			height: 350
		},
		[theme.breakpoints.down('md')]: {
			height: 350
		},
		[theme.breakpoints.down('sm')]: {
			height: 350
		},
		[theme.breakpoints.down('xs')]: {
			height: 200
		}
	},
	sentiDots: {
		height: 75,
		[theme.breakpoints.down('xs')]: {
			height: 55
		},
		marginBottom: 16
	}
}))

const OnboardingConfirm = (props) => {
	//Hooks
	const t = useLocalization()
	const history = useHistory()
	const classes = styles()
	const [loading, setLoading] = useState(true)

	//Redux
	const colorTheme = useSelector(s => s.settings.colorTheme)

	//State

	//Const
	const { success, handleNextStep } = props
	//useCallbacks

	//useEffects

	//Handlers
	const handleTryAgain = () => setLoading(true)

	const handleGoToLogin = () => history.push('/login')

	const handleConfirm = async () => {
		await handleNextStep()
		setLoading(false)
	}
	return (
		<Background color={colorTheme}>
			<div className={classes.contentWrapper}>
				<img src={sentiIpadIMG} className={classes.img} alt="" />
				<img src={sentiWaterWorks} className={classes.sentiDots} alt='' />
				<FadeLoader on={loading} onChange={handleConfirm}>
					<div className={classes.contentWrapper}>

						<T className={classes.message}>
							{success ? t(`signup.confirm.welcome`) + '.' : t('signup.error.error') + '!'}
						</T>
						<T className={classes.message} style={{ marginBottom: 24 }}>
							{success ? t(`signup.confirm.confirmSuccess`) : t('signup.confirm.confirmFail')}
						</T>
						<Button className={classes.button} variant={'contained'} color={'secondary'} onClick={success ? handleGoToLogin : handleTryAgain}>
							{success ? t('actions.goToLogin') : t('actions.retry')}
						</Button>

					</div>
				</FadeLoader>

			</div>
		</Background>
	)
}

export default OnboardingConfirm
