import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	container: {
		background: 'transparent',
		opacity: '0.9',
		height: '50%',
		padding: 20
	},
	textBox: {
		textAlign: 'center',
		color: '#fff'
	},
	flex: {
		marginTop: 32,
		display: 'flex',
		padding: '0 32px',
		justifyContent: 'space-between',
		height: '100%'
	},
	imgBox: {
		flex: 1,
		background: 'rgba(12,59,105,0.7)',
		margin: '0 24px'
	}
}))

const DialogPics = () => {
	const picsPaths = ['familie.svg', 'familie.svg', 'familie.svg', 'familie.svg']

	const classes = useStyles()

	return (
		<div className={classes.container}>
			{/* <div style={{ height: '100%', padding: 32 }}>
				<div className={classes.textBox}>
					<Typography variant="h4">Sådan kan du spare vand</Typography>
				</div>
				<div className={classes.flex}>
					{picsPaths.map((pic, index) => (
						<div key={index} className={classes.imgBox}>
							<img src={require(`./${pic}`)} alt="" />
						</div>
					))}
				</div>
			</div> */}
		</div>
	)
}

export default DialogPics