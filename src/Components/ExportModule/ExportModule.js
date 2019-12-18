import React, { useState, useEffect } from 'react'
import { DMenu } from 'Components'
import { ImportExport, Close, DateRange, AccessTime, KeyboardArrowRight, KeyboardArrowLeft } from 'variables/icons'
import { useLocalization } from 'Hooks'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormGroup, FormControlLabel, FormLabel } from '@material-ui/core'
import CircularLoader from 'Components/Loaders/CircularLoader'
import GridContainer from 'Components/Containers/GridContainer'
import { BPaper } from 'Styles/containerStyle'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import { getDevicesDataCSV } from 'data/devices'

const columns = [
	{ field: 'name', label: 'DeviceName', type: 'device', isReq: true },
	{ field: 'uuid', label: 'SigfoxID', type: 'device', isReq: true },
	{ field: 'time', label: 'Date', type: 'json', isReq: true, hidden: true },
	{ field: 'value', label: 'waterUsage', type: 'json', cf: 53 },
	{ field: 'value', label: 'waterReading', type: 'json', isReq: true },
	{ field: 'minWTemp', label: 'minWaterTemperature', type: 'json' },
	{ field: 'minATemp', label: 'minAmbientTemperature', type: 'json' },
	{ field: 'minFlow', label: 'minWaterFlow', type: 'json' },
	{ field: 'maxFlow', label: 'maxWaterFlow', type: 'json' },

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
		setSColumns(columns.filter(c => c.isReq))
	}, [])
	//#region Handlers

	const handleCheckboxClick = (v) => {
		setSColumns([...sColumns, v])
	}
	const handleOpenDialog = () => {
		setOpenDialog(true)
	}
	const handleCloseDialog = () => {
		setOpenDialog(false)
	}
	const getData = async () => {
		setLoading(true)
		let config = {
			type: 'deviceData',
			config: {
				customerId: 138230100010117,
				columns: sColumns,
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
		console.log(config)
		await getDevicesDataCSV(config).then(rs => {
			const url = window.URL.createObjectURL(new Blob([rs]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `senti-waterworks-${moment().valueOf()}.csv`);
			document.body.appendChild(link);
			link.click();
		})
		setLoading(false)
		setOpenDialog(false)

	}

	//#endregion
	return (
		<>
			<DMenu
				onChange={handleOpenDialog}
				menuItems={menuPoints}
			/>
			<Dialog
				onClose={handleCloseDialog}
				open={openDialog}
			>
				<DialogTitle>
					{t('actions.export')}
				</DialogTitle>
				<DialogContent>
					{loading ? <CircularLoader fill /> :
						<GridContainer>
							<BPaper>
								<FormGroup>
									<FormLabel>Columns</FormLabel>
									{columns.map(c => c.hidden ? null :
										<FormControlLabel
											control={<Checkbox onClick={handleCheckboxClick} id={c.id} disabled={c.isReq} checked={c.isReq ? true : sColumns.indexOf(c.id) !== -1 ? true : false} />}
											label={c.label}
										/>

									)}
								</FormGroup>
							</BPaper>
							<BPaper>
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
							</BPaper>
						</GridContainer>
					}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>
						<Close />
						{t('actions.cancel')}
					</Button>
					<Button onClick={getData}>
						<ImportExport />
						{t('actions.export')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
