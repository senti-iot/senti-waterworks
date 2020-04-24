import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import familyIcon from 'assets/icons/familie.svg'
import waterDrop from 'assets/icons/water.drop.blue.svg'
import { useSelector } from 'react-redux'
import { useLocalization } from 'Hooks'
import ItemG from 'Components/Containers/ItemG'
import GridContainer from 'Components/Containers/GridContainer'

const useStyles = makeStyles(theme => ({
	container: {
		boxSizing: 'border-box',
		minHeight: '55%',
		height: 'fit-content',
		background: 'rgba(12,59,105,0.7)',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		display: 'flex',
		padding: '24px 0'
	},
	half: {
		height: '100%',
		width: '50%',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 48
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
		marginBottom: 32,
		[theme.breakpoints.down('lg')]: {
			marginBottom: 8
		}
	},
	descriptionBox: {
		color: '#fff',
		width: '50%',
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	dataBox: {
		width: '50%',
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	waterDrop: {
		marginLeft: 20,
		width: 30
	}
}))

const DialogDetails = () => {
	//Hooks
	const t = useLocalization()

	//Redux
	const avgData = useSelector(s => s.data.avgData)
	const noOfAdults = useSelector(s => s.settings.user.aux.sentiWaterworks.extendedProfile.noOfAdults)
	const noOfChildren = useSelector(s => s.settings.user.aux.sentiWaterworks.extendedProfile.noOfChildren)
	const mUnit = useSelector(s => s.settings.mUnit)

	let noOfPeople = noOfAdults + noOfChildren
	if (noOfPeople === 0) {
		noOfPeople = 1
	}
	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	const classes = useStyles()

	// the JSX should map these panels instead of hardcoding it
	const panels = [
		{
			headline: t('Usage.dashboardUsage.dailyConsumption'),
			subheadline: 'Min husstand',
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
				cubicMetres: avgData.waterusagem3,
				forbrugPerson: (avgData.waterusagem3) / noOfPeople,
			}
		},
		{
			headline: t('Usage.dashboardUsage.comparison'),
			subheadline: ' Mit vandværk',
			descriptions: [
				'Gennemsnitligt daglige vandforbrug for andre boliger',
				'Forbrug pr. person',
				'Gennemsnitlig månedlige vandforbrug for andre boliger. Dette svarer til ca. 1,506 kg CO2 pr. måned'
			],
			style: {
				dataColor: '#F7DC00',
				textBelowHeadline: false
			},
			data: {
				cubicMetres: avgData.benchmarkm3,
				forbrugPerson: (avgData.benchmarkm3) / noOfPeople,
			}
		},
		{
			headline: '',
			subheadline: 'Andre vandværker',
			descriptions: [
				'Gennemsnitligt daglige vandforbrug for andre boliger',
				'Forbrug pr. person',
				'Gennemsnitlig månedlige vandforbrug for andre boliger. Dette svarer til ca. 1,506 kg CO2 pr. måned'
			],
			style: {
				dataColor: '#F7DC00',
				textBelowHeadline: false
			},
			data: {
				cubicMetres: avgData.benchmarkm3,
				forbrugPerson: (avgData.benchmarkm3) / noOfPeople,
			}
		}
	]

	return (
		<GridContainer className={classes.container}>
			{panels.map(({ headline, subheadline, descriptions, style, data }, index) => (
				<ItemG xs={12} md={4} key={Math.random()} className={classes.half}>
					{/* header with icon */}
					<div className={classes.header} style={{ padding: '0 24px', visibility: index !== 2 ? 'visible' : 'hidden' }}>
						<img src={familyIcon} alt="senti-family-icon" className={classes.icon} />
						<Typography variant="h5" className={classes.headline} style={{ color: index % 2 === 1 ? style.dataColor : '#fff' }}>{headline}</Typography>
					</div>
					{/* optional text below headline */}
					<div style={{ padding: '0 24px', borderRight: index === 0 && '2px solid #fff' }}>{/* correct place */}
						{style.textBelowHeadline ?
							<Typography variant="h6" className={classes.optionalParagraph} style={{ marginBottom: 12 }}>{noOfPeople} personer i husstanden</Typography> :
							<Typography variant="h6" className={classes.optionalParagraph} style={{ visibility: 'hidden', marginBottom: 0 }}>{noOfPeople} personer i husstanden</Typography>
						}
					</div>

					<div style={{ paddingLeft: 24, borderRight: index === 0 && '2px solid #fff' }}>
						<Typography variant="h6" style={{ marginBottom: 24 }}>{subheadline}</Typography>
					</div>

					{/* descriptions */}
					<div style={{ display: 'flex', flex: 1 }}>
						<div className={classes.descriptionBox} style={{ paddingLeft: 24 }}>
							{descriptions.map(desc => <Typography variant="body1">{desc}</Typography>)}
						</div>

						{/* data display */}
						<div className={classes.dataBox} style={{ borderRight: index !== 2 && '2px solid #fff' }}>{/* correct place */}
							<div style={{ display: 'flex' }}>
								<div style={{ textAlign: 'center' }}>
									<Typography variant="h4" style={{ color: style.dataColor }}>{parseFloat(data.cubicMetres).toFixed(3)}
										<span style={{ fontSize: 16 }}>{mUnit === 'm3' ? " m³" : " L"}</span></Typography>
								</div>
								<img src={waterDrop} alt="senti-water-drop" className={classes.waterDrop} />
							</div>
							<Typography variant="h5" style={{ color: style.dataColor }}>
								{parseFloat(data.forbrugPerson).toFixed(3)} {mUnit === 'm3' ? " m³" : " L"}
								<span style={{ marginLeft: 20 }}>
									<img src={waterDrop} alt="senti-water-drop" className={classes.waterDrop} />
								</span>
							</Typography>
							<img src={familyIcon} alt="" style={{ height: 70 }} />
						</div>
					</div>
				</ItemG>
			))}
		</GridContainer>
	)
}

export default DialogDetails