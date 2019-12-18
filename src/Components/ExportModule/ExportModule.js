import React, { useState, useEffect } from 'react'
import { DMenu, ItemG } from 'Components'
import { ImportExport, Close, DateRange, AccessTime, KeyboardArrowRight, KeyboardArrowLeft } from 'variables/icons'
import { useLocalization } from 'Hooks'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormGroup, FormControlLabel, FormLabel } from '@material-ui/core'
import GridContainer from 'Components/Containers/GridContainer'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import { getDevicesDataCSV } from 'data/devices'
import DeviceTableExportWidget from 'Components/Custom/DevicesTable/DeviceTableExportWidget'
import FadeOutLoader from 'Components/Loaders/FadeOutLoader'

const columns = [
	{ id: 0, field: 'name', label: 'DeviceName', type: 'device', isReq: true },
	{ id: 1, field: 'uuid', label: 'SigfoxID', type: 'device', isReq: true },
	{ id: 2, field: 'time', label: 'Date', type: 'json', isReq: true, hidden: true },
	{ id: 3, field: 'value', label: 'waterUsage', type: 'json', cf: 53 },
	{ id: 4, field: 'value', label: 'waterReading', type: 'json' },
	{ id: 5, field: 'minWTemp', label: 'minWaterTemperature', type: 'json' },
	{ id: 6, field: 'minATemp', label: 'minAmbientTemperature', type: 'json' },
	{ id: 7, field: 'minFlow', label: 'minWaterFlow', type: 'json' },
	{ id: 8, field: 'maxFlow', label: 'maxWaterFlow', type: 'json' },

]
export const ExportModule = () => {
	const t = useLocalization()
	const [openDialog, setOpenDialog] = useState(true)
	const [loading, setLoading] = useState(false)
	const [sColumns, setSColumns] = useState([]) //selected columns
	const [from, setFrom] = useState(moment().subtract(6, 'day'))
	const [to, setTo] = useState(moment())
	const menuPoints = [{
		dontShow: false,
		icon: <ImportExport />,
		label: t('actions.export')
	}]
	useEffect(() => {
		setSColumns(columns.filter(c => c.isReq).map(c => c.id))
	}, [])
	//#region Handlers

	const handleCheckboxClick = (c) => (e) => {
		console.log(c, e)
		let newSColumns = [...sColumns]
		if (newSColumns.indexOf(c.id) !== -1) {
			newSColumns.splice(newSColumns.indexOf(c.id), 1)
		}
		else {
			newSColumns.push(c.id)
		}
		newSColumns = newSColumns.sort()
		setSColumns(newSColumns)
	}
	const handleOpenDialog = () => {
		setOpenDialog(true)
	}
	const handleCloseDialog = () => {
		setOpenDialog(false)
	}
	const setLoader = () => {
		setLoading(true)
	}
	const getData = async () => {
		// setLoading(true)
		setTimeout(async () => {
			let config = {
				type: 'deviceData',
				config: {
					customerId: 138230100010117,
					columns: columns.filter(f => sColumns.indexOf(f.id) !== -1),
					period: {
						from: from.clone().subtract(1, 'day'),
						to: to
					},
					filters: {
						pre: [{
							"key": "device_id",
							"value": 45,
							"type": "higher"
						}],
						post: [
							{
								type: "datetime",
								key: "time",
								from: "2019-12-11",
								to: "2019-12-17"
							}
						]
					}
				}
			}
			await getDevicesDataCSV(config).then(rs => {
				const url = window.URL.createObjectURL(new Blob([rs]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `senti-waterworks-${moment().valueOf()}.csv`);
				document.body.appendChild(link);
				link.click();
			})
			setOpenDialog(false)
			setLoading(false)
		}, 10000);


	}
	//#endregion
	return (
		<>
			<DMenu
				onChange={handleOpenDialog}
				menuItems={menuPoints}
			/>
			<Dialog
				onClose={loading ? undefined : handleCloseDialog}
				open={openDialog}
			>
				<DialogTitle>
					{t('actions.export')}
				</DialogTitle>
				<FadeOutLoader overlay on={loading} onChange={getData}>
					<DialogContent >

						<GridContainer>
							<ItemG xs={6}>
								<FormGroup>
									<FormLabel>Columns</FormLabel>
									{columns.map((c, i) => {
										console.log(sColumns.indexOf(c.id), sColumns)
										return c.hidden ? null :
											<FormControlLabel
												key={i}
												control={<Checkbox
													onChange={handleCheckboxClick(c)}
													id={c.field}
													disabled={c.isReq}
													checked={c.isReq ? true : sColumns.indexOf(c.id) !== -1 ? true : false} />}
												label={c.label}
											/>
									})}
								</FormGroup>
							</ItemG>
							<ItemG xs={6}>
								<ItemG container spacing={2}>
									<ItemG xs={12}>
										<FormGroup>
											<FormLabel>Period</FormLabel>
											<DatePicker
												autoOk
												ampm={false}
												label={t('filters.startDate')}
												clearable
												format='LLL'
												value={from}
												onChange={e => setFrom(e)}
												animateYearScrolling={false}
												color='primary'
												disableFuture
												dateRangeIcon={<DateRange />}
												timeIcon={<AccessTime />}
												rightArrowIcon={<KeyboardArrowRight />}
												leftArrowIcon={<KeyboardArrowLeft />}

											/>
											<DatePicker
												autoOk
												ampm={false}
												label={t('filters.endDate')}
												clearable
												format='LLL'
												value={to}
												onChange={e => setTo(e)}
												animateYearScrolling={false}
												color='primary'
												disableFuture
												dateRangeIcon={<DateRange />}
												timeIcon={<AccessTime />}
												rightArrowIcon={<KeyboardArrowRight />}
												leftArrowIcon={<KeyboardArrowLeft />}

											/>
										</FormGroup>
									</ItemG>
									<ItemG xs={12}>
										<FormGroup style={{ marginTop: 36 }}>
											<DeviceTableExportWidget />
										</FormGroup>

									</ItemG>
								</ItemG>
							</ItemG>
						</GridContainer>
					</DialogContent>
				</FadeOutLoader>
				<DialogActions>
					<Button onClick={handleCloseDialog}>
						<Close />
						{t('actions.cancel')}
					</Button>
					<Button onClick={setLoader}>
						<ImportExport />
						{t('actions.export')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
