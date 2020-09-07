import React from 'react'
import { makeStyles } from '@material-ui/core'
// import familyIcon from 'assets/icons/familie.svg'
// import waterDrop from 'assets/icons/water.drop.blue.svg'
import { useSelector } from 'react-redux'
import { useLocalization } from 'Hooks'
import ItemG from 'Components/Containers/ItemG'
import GridContainer from 'Components/Containers/GridContainer'
import { HeaderText } from 'Components/Custom/Styles/arcGraphStyles'
import T from 'Components/Typography/T'

const useStyles = makeStyles(theme => ({
	dataBlock: {
		marginTop: 16
	},
	dataBox: {
		background: theme.contrastBoxBackground,
		borderRadius: 4,
		padding: 24,
		margin: 8,
		minHeight: 350
	},
	dataBoxAlt: {
		background: theme.contrastBoxBackgroundAlt
	},
	container: {
		// boxSizing: 'border-box',
		// minHeight: '55%',
		// height: 'fit-content',
		background: theme.boxBackgroundAlt,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		display: 'flex',
		marginBottom: 48,
		padding: 24
	},
	value: {
		fontSize: 30,
		fontWeight: 500
	},
	secondaryValue: {
		fontSize: 24,
		fontWeight: 500
	},
	greenValue: {
		color: '#6DD400',
		marginRight: 4
	},
	benchmarkValue: {
		color: '#F7DC00',
		marginRight: 4

	}
}))

const UsageStatistics = () => {
	//Hooks
	const t = useLocalization()

	//Redux
	const avgData = useSelector(s => s.priceUsageData.usage)
	const noOfAdults = useSelector(s => s.settings.user.aux.sentiWaterworks.extendedProfile.noOfAdults)
	const noOfChildren = useSelector(s => s.settings.user.aux.sentiWaterworks.extendedProfile.noOfChildren)
	const mUnit = useSelector(s => s.settings.mUnit)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)
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
			headline: t('usage.dashboardUsage.dailyConsumption'),
			subheadline: 'Min husstand',
			descriptions: [
				'Mit gennemsnitlige daglige vandforbrug',
				isSWAdmin ? 'Forbrug pr. person' : ""
				// 'Mit gennemsnitlige månedlige vandforbrug. Dette svarer til ca. 1,182 kg CO2 pr. måned'
			],
			style: {
				dataColor: '#6DD400',
				textBelowHeadline: true
			},
			data: {
				cubicMetres: mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL,
				forbrugPerson: !isSWAdmin ? ((mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL) / noOfPeople) : null,
			}
		},
		{
			headline: t('usage.dashboardUsage.comparison'),
			subheadline: ' Mit vandværk',
			descriptions: [
				'Gennemsnitligt daglige vandforbrug for andre boliger',
				isSWAdmin ? 'Forbrug pr. person' : null,
				'Gennemsnitlig månedlige vandforbrug for andre boliger. Dette svarer til ca. 1,506 kg CO2 pr. måned'
			],
			style: {
				dataColor: '#F7DC00',
				textBelowHeadline: false
			},
			data: {
				cubicMetres: mUnit === "m3" ? avgData.benchmarkm3 : avgData.benchmarkL,
				forbrugPerson: !isSWAdmin ? ((mUnit === "m3" ? avgData.benchmarkm3 : avgData.benchmarkL) / noOfPeople) : null,
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
				cubicMetres: mUnit === "m3" ? avgData.benchmarkm3 : avgData.benchmarkL,
				forbrugPerson: (mUnit === "m3" ? avgData.benchmarkm3 : avgData.benchmarkL) / noOfPeople,
			}
		}
	]

	return (
		<GridContainer className={classes.container}>
			<ItemG xs={4} container justify={'center'}>
				<HeaderText variant='h4' >
					{t('usage.waterworks.usageHouse')}
				</HeaderText>
			</ItemG>
			<ItemG xs={8} container justify={'center'}>
				<HeaderText variant='h4'>
					{t('usage.waterworks.usageWaterworks')}
				</HeaderText>
			</ItemG>
			<ItemG xs={12} md>
				<div className={classes.dataBox}>
					<ItemG xs={12} style={{ minHeight: 50 }}>
						<HeaderText variant="h5" style={{ margin: 0 }}>
							{t('usage.dashboardUsage.dailyConsumption')}
						</HeaderText>
						{isSWAdmin ?  null : <T variant={'body1'}>
							{noOfPeople} {t('usage.panel.personsInHousehold')}
						</T>}
					</ItemG>
					<ItemG container xs={12} className={classes.dataBlock}>
						<ItemG xs={5}>
							{t('usage.panel.myAverageWaterConsumption')}
						</ItemG>
						<ItemG container justify={'flex-end'} className={classes.value}>
							<span className={classes.greenValue}>
								{parseFloat(mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')}
							</span>
							{mUnit === 'm3' ? ` m³` : ` L`}
						</ItemG>
					</ItemG>
					{isSWAdmin ? null :
						<ItemG container xs={12} className={classes.dataBlock}>
							<ItemG xs={5}>
								{t('usage.panel.usagePerPerson')}
							</ItemG>
							<ItemG container justify={'flex-end'} className={classes.secondaryValue}>
								<span className={classes.greenValue}>
									{parseFloat((mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL) / noOfPeople).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')}
								</span>
								{mUnit === 'm3' ? ` m³` : ` L`}
							</ItemG>
						</ItemG>
					}
					<ItemG container xs={12} className={classes.dataBlock}>
						<ItemG xs={5}>
							{t('usage.panel.periodTotalCO2', { totalCO2: '1182' })}
						</ItemG>
						<ItemG container xs={7} justify={'flex-end'} className={classes.secondaryValue}>
							<div style={{ borderRadius: 100, border: '3px solid white', height: 125, width: 125, position: 'relative' }}>
								<div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', left: '50%', top: '50%', whiteSpace: 'nowrap' }}>

									<span className={classes.greenValue}>
										{/* {parseFloat((mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL) / noOfPeople).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')} */}
										{'123,12'}
										<span style={{ color: 'white' }}>
											{mUnit === 'm3' ? ` m³` : ` L`}
										</span>
									</span>
								</div>
							</div>
						</ItemG>
					</ItemG>
				</div>
			</ItemG>
			{/* Land Usage Benchmark */}
			{/* <ItemG xs={12} md={3}>
				<div className={classes.dataBox}>

					<HeaderText variant="h5" style={{ margin: 0 }}>
						{t('usage.dashboardUsage.dailyConsumption')}
					</HeaderText>
					{isSWAdmin ? null : <T variant={'body1'}>
						{noOfPeople} {t('usage.panel.personsInHousehold')}
					</T>}
					<ItemG container xs={12} className={classes.dataBlock}>
						<ItemG xs>
							{t('usage.panel.myAverageWaterConsumption')}
						</ItemG>
						<ItemG className={classes.value}>
							{parseFloat(mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')}{mUnit === 'm3' ? " m³" : " L"}
						</ItemG>
					</ItemG>
					{isSWAdmin ? null :
						<ItemG container xs={12} className={classes.dataBlock}>
							<ItemG xs>
								{t('usage.panel.usagePerPerson')}
							</ItemG>
							<ItemG>
								{parseFloat((mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL) / noOfPeople).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')} {mUnit === 'm3' ? " m³" : " L"}
							</ItemG>
						</ItemG>
					}
				</div>

			</ItemG> */}
			<ItemG xs={12} md>
				<div className={classes.dataBox + ' ' + classes.dataBoxAlt}>
					<ItemG xs={12} style={{ minHeight: 50 }}>
						<HeaderText variant="h5" style={{ margin: 0 }}>
							{t('usage.waterworks.myWaterworks')}
						</HeaderText>
					</ItemG>

					{/* {isSWAdmin ? null : <T variant={'body1'}>
						{noOfPeople} {t('usage.panel.personsInHousehold')}
					</T>} */}
					<ItemG container xs={12} className={classes.dataBlock}>
						<ItemG xs={5}>
							{t('usage.panel.myAverageWaterConsumption')}
						</ItemG>
						<ItemG container justify={'flex-end'} className={classes.value}>
							<span className={classes.benchmarkValue}>
								{parseFloat(mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')}
							</span>
							{mUnit === 'm3' ? ` m³` : ` L`}
						</ItemG>
					</ItemG>
					{isSWAdmin ? null :
						<ItemG container xs={12} className={classes.dataBlock}>
							<ItemG xs={5}>
								{t('usage.panel.usagePerPerson')}
							</ItemG>
							<ItemG container justify={'flex-end'} className={classes.secondaryValue}>
								<span className={classes.benchmarkValue}>
									{parseFloat((mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL) / noOfPeople).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')}
								</span>
								{mUnit === 'm3' ? ` m³` : ` L`}
							</ItemG>
						</ItemG>
					}
					<ItemG container xs={12} className={classes.dataBlock}>
						<ItemG xs={5}>
							{t('usage.panel.periodTotalCO2', { totalCO2: '1182' })}
						</ItemG>
						<ItemG container xs={7} justify={'flex-end'} className={classes.secondaryValue}>
							<div style={{ borderRadius: 100, border: '3px solid white', height: 125, width: 125, position: 'relative' }}>
								<div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', left: '50%', top: '50%', whiteSpace: 'nowrap' }}>

									<span className={classes.benchmarkValue}>
										{/* {parseFloat((mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL) / noOfPeople).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')} */}
										{'123,12'}
										<span style={{ color: 'white' }}>
											{mUnit === 'm3' ? ` m³` : ` L`}
										</span>
									</span>
								</div>
							</div>
						</ItemG>
					</ItemG>
				</div>

			</ItemG>
			<ItemG xs={12} md>
				<div className={classes.dataBox}>
					<ItemG xs={12} style={{ minHeight: 50 }}>
						<HeaderText variant="h5" style={{ margin: 0 }}>
							{t('usage.waterworks.otherWaterworks')}
						</HeaderText>
					</ItemG>

					<ItemG container xs={12} className={classes.dataBlock}>
						<ItemG xs={5}>
							{t('usage.panel.myAverageWaterConsumption')}
						</ItemG>
						<ItemG container justify={'flex-end'} className={classes.value}>
							<span className={classes.benchmarkValue}>
								{parseFloat(mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')}
							</span>
							{mUnit === 'm3' ? ` m³` : ` L`}
						</ItemG>
					</ItemG>
					{isSWAdmin ? null :
						<ItemG container xs={12} className={classes.dataBlock}>
							<ItemG xs={5}>
								{t('usage.panel.usagePerPerson')}
							</ItemG>
							<ItemG container justify={'flex-end'} className={classes.secondaryValue}>
								<span className={classes.benchmarkValue}>
									{parseFloat((mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL) / noOfPeople).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')}
								</span>
								{mUnit === 'm3' ? ` m³` : ` L`}
							</ItemG>
						</ItemG>
					}
					<ItemG container xs={12} className={classes.dataBlock}>
						<ItemG xs={5}>
							{t('usage.panel.periodTotalCO2', { totalCO2: '1182' })}
						</ItemG>
						<ItemG container xs={7} justify={'flex-end'} className={classes.secondaryValue}>
							<div style={{ borderRadius: 100, border: '3px solid white', height: 125, width: 125, position: 'relative' }}>
								<div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', left: '50%', top: '50%', whiteSpace: 'nowrap' }}>

									<span className={classes.benchmarkValue}>
										{/* {parseFloat((mUnit === "m3" ? avgData.waterusagem3 : avgData.waterusageL) / noOfPeople).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')} */}
										{'123,12'}
										<span style={{ color: 'white' }}>
											{mUnit === 'm3' ? ` m³` : ` L`}
										</span>
									</span>
								</div>
							</div>
						</ItemG>
					</ItemG>
				</div>

			</ItemG>

		</GridContainer>
	)
}

export default UsageStatistics