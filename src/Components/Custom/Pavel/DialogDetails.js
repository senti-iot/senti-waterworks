import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import familyIcon from './familie.svg'

const useStyles = makeStyles(theme => ({
	container: {
		boxSizing: 'border-box',
		height: '50%',
		background: 'rgba(12,59,105,0.7)',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		display: 'flex',
		padding: '24px 0'
	},
	half: {
		padding: '0 24px',
		height: '100%',
		width: '50%',
		display: 'flex',
		flexDirection: 'column'
	},
	header: {
		display: 'flex',
		alignItems: 'flex-end'
	},
	icon: {
		width: 64,
		marginRight: 8
	},
	headline: {
		fontSize: '1.75rem',
		position: 'relative',
		top: 6
	},
	optionalParagraph: {
		marginTop: 12,
		fontWeight: 300,
		color: '#fff',
		marginBottom: 32
	}
}))

const DialogDetails = () => {
	const classes = useStyles()

	// the JSX should map these panels instead of hardcoding it
	const panels = [
		{
			headline: 'Daglight forbrug',
			descriptions: [
				'Mit gennemsnitlige daglige vandforbrug',
				'Forbrug pr. person',
				'Mit gennemsnitlige månedlige vandforbrug. Dette svarer til ca. 1,182 kg CO2 pr. måned'
			],
			style: {
				dataColor: '#6DD400',
				textBelowHeadline: true
			},
			data: {
				cubicMetres: 0.197,
				forbrugPerson: 49.25,
				manedlige: 5910
			}
		},
		{
			headline: 'Benchmark',
			descriptions: [
				'Gennemsnitligt daglige vandforbrug for andre boliger',
				'Forbrug pr. person',
				'Gennemsnitlig månedlige vandforbrug for andre boliger. Dette svarer til ca. 1,506 kg CO2 pr. måned'
			],
			style: {
				dataColor: '#32FFE1',
				textBelowHeadline: false
			},
			data: {
				cubicMetres: 0.251,
				forbrugPerson: 53.75,
				manedlige: 7530
			}
		}
	]

	return (
		<div className={classes.container}>
			<div className={classes.half} style={{ borderRight: '2px solid #fff' }}>
				<div className={classes.header}>
					<img src={familyIcon} alt="senti-family-icon" className={classes.icon} />
					<Typography variant="h5" className={classes.headline}>Daglight forbrug</Typography>
				</div>
				<Typography variant="h6" className={classes.optionalParagraph}>4 personer i husstanden</Typography>

				<div style={{ display: 'flex', flex: 1 }}>
					<div style={{ width: '50%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
						<Typography variant="body2">
							Mit gennemsnitlige daglige vandforbrug
						</Typography>
						<Typography variant="body2">
							Forbrug pr. person
						</Typography>
						<Typography variant="body2">
							Mit gennemsnitlige månedlige vandforbrug. Dette svarer til ca. 1,182 kg CO2 pr. måned.
						</Typography>
					</div>

					<div style={{ width: '50%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
						<div>
							<Typography variant="h4" style={{ color: '#6DD400' }}>0,197<span style={{ fontSize: 16 }}>m3</span></Typography>
							<Typography variant="body1" style={{ textAlign: 'center' }}>197 L</Typography>
						</div>
						<Typography variant="h5" style={{ color: '#6DD400' }}>49,25 L</Typography>
						<img src={familyIcon} alt="" style={{ height: 70 }} />
					</div>
				</div>
			</div>

			<div className={classes.half} style={{ borderLeft: '2px solid #fff' }}>
				<div className={classes.header}>
					<img src={familyIcon} alt="senti-family-icon" className={classes.icon} style={{ color: '#659866' }} />
					<Typography variant="h5" className={classes.headline} style={{ color: '#32FFE1' }}>Benchmark</Typography>
				</div>
				<Typography variant="h6" className={classes.optionalParagraph} style={{ visibility: 'hidden' }}>4 personer i husstanden</Typography>

				<div style={{ width: 100, height: 100, background: 'red' }}></div>
			</div>
		</div >
	)
}

export default DialogDetails