import React, { useState } from 'react'
import { DMenu } from 'Components'
import { ImportExport, Close, DateRange, AccessTime, KeyboardArrowRight, KeyboardArrowLeft } from 'variables/icons'
import { useLocalization } from 'Hooks'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormGroup, FormControlLabel, FormLabel } from '@material-ui/core'
import CircularLoader from 'Components/Loaders/CircularLoader'
import GridContainer from 'Components/Containers/GridContainer'
import { BPaper } from 'Styles/containerStyle'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'

export const ExportModule = () => {
	const t = useLocalization()
	const [openDialog, setOpenDialog] = useState(true)
	const [loading, setLoading] = useState(false)
	const [sColumns, setSColumns] = useState([])
	const [from, setFrom] = useState(moment())
	const [to, setTo] = useState(moment())
	const menuPoints = [{
		dontShow: false,
		icon: <ImportExport />,
		label: t('actions.export')
	}]
	const columns = [
		{ id: 'name', label: 'Device Name', isReq: true },
		{ id: 'id', label: 'Device ID', isReq: true },
		{ id: 'name', label: 'Device Name' }
	]
	const handleCheckboxClick = (v) => {
		setSColumns([...sColumns, v])
	}
	const handleOpenDialog = () => {
		setOpenDialog(true)
	}
	const handleCloseDialog = () => {
		setOpenDialog(false)
	}
	const getData = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setOpenDialog(false)
		}, 3000);

	}
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
									{columns.map(c =>
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
