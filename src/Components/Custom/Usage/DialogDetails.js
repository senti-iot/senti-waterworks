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
		margin: 8
	},
	container: {
		// boxSizing: 'border-box',
		// minHeight: '55%',
		// height: 'fit-content',
		background: theme.boxBackground,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		display: 'flex',
		marginBottom: 48,
		padding: 24
	},
	value: {
		fontSize: 30,
	}
}))

const DialogDetails = () => {
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
			<ItemG xs={6}>
				<HeaderText variant='h4' >
					{'My waterworks'}
				</HeaderText>
			</ItemG>
			<ItemG xs={6}>
				<HeaderText variant='h4'>
					{'Other waterworks'}
				</HeaderText>
			</ItemG>
			<ItemG xs={12} md={3} key={Math.random()} className={classes.dataBox}>
				<HeaderText variant="h5" style={{ margin: 0 }}>
					{t('usage.dashboardUsage.dailyConsumption')}
				</HeaderText>
				{isSWAdmin ?  null : <T variant={'body1'}>
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
			</ItemG>
			<ItemG xs={12} md={3} key={Math.random()} className={classes.dataBox}>
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
			</ItemG>
			<ItemG xs={12} md={3} key={Math.random()} className={classes.dataBox}>
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
			</ItemG>
			<ItemG xs={12} md={3} key={Math.random()} className={classes.dataBox}>
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
			</ItemG>
			{/* <div style={{ display: 'flex', flex: 1 }}>
						<div className={classes.descriptionBox} style={{ paddingLeft: 24 }}>
							{descriptions.map(desc => <Typography variant="body1">{desc}</Typography>)}
						</div>

						<div className={classes.dataBox} style={{ borderRight: index !== 2 && '2px solid #fff' }}>
							<div style={{ display: 'flex' }}>
								<div style={{ textAlign: 'center' }}>
									<Typography variant="h4" style={{ color: style.dataColor }}>{parseFloat(data.cubicMetres).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')}
										<span style={{ fontSize: 16 }}>{mUnit === 'm3' ? " m³" : " L"}</span></Typography>
								</div>
								<img src={waterDrop} alt="senti-water-drop" className={classes.waterDrop} />
							</div>
							<Typography variant="h5" style={{ color: style.dataColor }}>
								{parseFloat(data.forbrugPerson).toFixed(mUnit === 'm3' ? 2 : 0).replace('.', ',')} {mUnit === 'm3' ? " m³" : " L"}
								<span style={{ marginLeft: 20 }}>
									<img src={waterDrop} alt="senti-water-drop" className={classes.waterDrop} />
								</span>
							</Typography>
							<img src={familyIcon} alt="" style={{ height: 70 }} />
						</div>
					</div> */}

		</GridContainer>
	)
}

export default DialogDetails