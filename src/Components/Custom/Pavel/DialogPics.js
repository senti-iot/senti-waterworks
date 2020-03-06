import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	container: {
		background: 'transparent',
		opacity: '0.9',
		height: '50%',
		padding: 32,
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column'
	},
	textBox: {
		textAlign: 'center',
		color: '#fff'
	},
	flex: {
		// margin: '32px 0',
		display: 'flex',
		padding: 32,
		justifyContent: 'space-between',
		flex: 1,
		boxSizing: 'border-box'
	},
	imgBox: {
		flex: 1,
		background: 'rgba(12,59,105,0.7)',
		margin: '0 24px',
		padding: 16,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		boxSizing: 'border-box',
		borderRadius: 4,
		cursor: 'pointer',
		width: '25%'
	},
	img: {
		// flex: 1,
		width: '100%',
		height: 'auto',
		maxWidth: 150,
		maxHeight: 120
	}
}))

const DialogPics = props => {
	const picsAndText = [
		{
			imgSrc: 'toilet.svg',
			text: 'Toilet'
		},
		{
			imgSrc: 'bath.svg',
			text: 'Bad'
		},
		{
			imgSrc: 'washmachine.svg',
			text: 'Tøjvask'
		},
		{
			imgSrc: 'dishwasher.svg',
			text: 'Opvask'
		}
	]

	const classes = useStyles()

	return (
		<div className={classes.container}>
			<Typography variant="h4" className={classes.textBox}
				style={{ marginBottom: 16, fontWeight: 'bolder' }}
			>Sådan kan du spare vand</Typography>

			<div className={classes.flex}>
				{picsAndText.map(({ imgSrc, text }, index) => (
					<div key={index} className={classes.imgBox} onClick={() => {
						props.setDescriptionOpen(true)
						props.setChosenDescription(index)
					}}>
						<img src={require(`./${imgSrc}`)} alt="" className={classes.img} />
						<Typography variant="h6" style={{ color: '#fff', marginTop: 8 }}>{text}</Typography>
					</div>
				))}
			</div>
		</div>
	)
}

export default DialogPics