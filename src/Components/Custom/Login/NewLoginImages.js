import React from 'react'
import { T } from 'Components';
// import loginImages from 'assets/imgs/loginImages/loader'
import sentiIpadIMG from 'assets/imgs/senti-ipad.png'
import ImgTexture from 'assets/imgs/texture_inverted2.png'
import sentiWaterWorks from 'assets/senti.waterworks.svg'
import { useLocalization, useSelector } from 'Hooks';
import { makeStyles } from '@material-ui/styles';
import { sideBarColor } from 'Styles/mainStyles';
import styled from 'styled-components';
import { bgColors } from 'Styles/backgroundColors';

const Background = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => bgColors[props.color].background};
`
const styles = makeStyles(() => ({
	container: {
		backgroundImage: `url(${ImgTexture})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "bottom",
		backgroundColor: sideBarColor,
		// background: sideBarColor,
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	contentWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexFlow: "column",
		margin: '15px 150px'
	},
	bold: {
		fontWeight: 600
	},
	message: {
		color: '#fff',
		padding: 25,
		paddingTop: 0,
		maxWidth: 615,
		marginBottom: 30
	},
	overcomplicatedButtonTextLight: {
		fontWeight: 300,
		marginRight: 4
	},
	overcomplicatedButtonTextRegular: {
		fontWeight: 700
	},
	button: {
		color: '#000',
		marginBottom: 40,
		boxShadow: 'none'
	},
	img: {
		height: 650,
	},
	sentiDots: {
		height: 75,
		margin: 50,
		marginTop: 100,
		marginBottom: 0
	}
}))

function LoginImages() {

	const t = useLocalization()
	const classes = styles()
	// const getRndInteger = () => {
	// 	let min = 0
	// 	let max = loginImages.length
	// 	return Math.floor(Math.random() * (max - min)) + min;
	// }
	// const [number] = useState(getRndInteger())
	const colorTheme = useSelector(s => s.settings.colorTheme)
	return (
		<Background color={colorTheme}>
			<div className={classes.contentWrapper}>

				<img src={sentiIpadIMG} className={classes.img} alt="" />
				<img src={sentiWaterWorks} className={classes.sentiDots} alt='' />
				<T variant={'h5'} className={classes.message}>
					{t(`login.text`)}
				</T>

			</div>
		</Background>
	)
}


export default LoginImages
