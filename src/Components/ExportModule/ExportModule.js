import React, { useState } from 'react'
import { DSelect, ItemG } from 'Components'
import { ImportExport, Close, DateRange, AccessTime, KeyboardArrowRight, KeyboardArrowLeft } from 'variables/icons'
import { useLocalization, useSelector } from 'Hooks'
import { Dialog, DialogContent, DialogActions, Button, Checkbox, FormGroup, FormControlLabel, FormLabel, DialogTitle, Collapse } from '@material-ui/core'
import GridContainer from 'Components/Containers/GridContainer'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import { getExportData } from 'data/waterworks'
import DeviceTableExportWidget from 'Components/Custom/DevicesTable/DeviceTableExportWidget'
import FadeOutLoader from 'Components/Loaders/FadeOutLoader'
import styled from 'styled-components'


const MDialogHeader = styled(DialogTitle)`
	background: ${({ theme }) => theme.palette.type === 'dark' ? theme.chartButton : undefined};
`

const MDialogContent = styled(DialogContent)`
	background: ${({ theme }) => theme.palette.type === 'dark' ? theme.boxBackground : undefined};
`
const MDialogActions = styled(DialogActions)`
	background: ${({ theme }) => theme.palette.type === 'dark' ? theme.boxBackground : undefined};
`



export const ExportModule = props => {
	//Hooks
	const t = useLocalization()
	//Redux
	const selectedInstallations = useSelector(s => s.appState.selectedExportInstallations)
	const orgUUID = useSelector(s => s.settings.user?.org.uuid)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)
	// const language = useSelector(s => s.settings.language)
	//State
	const [fileType, setFileType] = useState('csv')
	const [loading, setLoading] = useState(false)
	const [sColumns, setSColumns] = useState([]) //selected columns
	const [from, setFrom] = useState(moment().subtract(6, 'day').startOf('day'))
	const [to, setTo] = useState(moment().startOf('day'))
	const [locale, setLocale] = useState(-1)
	//Const
	const { open, handleCloseExport } = props
	const columns = isSWAdmin ? ['usage', 'benchmark', 'temperature', 'waterflow', 'reading'] : ["usage", "benchmark", "reading"]

	//useCallbacks

	//useEffects

	//Handlers


	// useEffect(() => {
	// 	// setSColumns(columns.filter(c => c.isReq).map(c => c.id))
	// }, [])
	//#region Handlers

	const handleCheckboxClick = (c) => (e) => {
		let newSColumns = [...sColumns]
		if (newSColumns.indexOf(c) !== -1) {
			newSColumns.splice(newSColumns.indexOf(c), 1)
		}
		else {
			newSColumns.push(c)
		}
		newSColumns = newSColumns.sort()
		setSColumns(newSColumns)
	}

	const setLoader = () => {
		setLoading(true)
	}
	const getData = async () => {
		// setLoading(true)
		let config = {
			"dateFormat": "YYYY-MM-DD HH:mm:ss",
			"dateLang": "da",
			"fields": sColumns,
			"isAdmin": isSWAdmin,
			"orgUUID": orgUUID,
			"type": fileType,
			"from": from,
			"to": to,
			"uuids": selectedInstallations.length > 0 ? selectedInstallations : null,
			"locale": locale === 'da' ? 'da-DK' : 'en-US'
		}

		await getExportData(config).then(async rs => {
			if (rs) {
				const linkSource = `data:application/zip;base64,${rs}`;
				const downloadLink = document.createElement('a');
				const fileName = "SW-data-export" + moment().format('YYYY-MM-DD_HH-mm') + ".zip"

				downloadLink.href = linkSource;
				downloadLink.download = fileName;
				downloadLink.click();
				// var fileName = "SW-data-export" + moment().format('YYYY-MM-DD_HH-mm') + ".zip"
				// saveAs(blob, fileName)
				handleCloseExport()
				setLoading(false)
			}
			else {
				setLoading(false)
				alert('Error')
			}
		})
	}

	const handleSelectFileType = e => {
		setFileType(e.target.value)
	}

	//#endregion
	return (
		<Dialog
			onClose={loading ? undefined : handleCloseExport}
			open={open}
		>
			<MDialogHeader>
				{t('actions.export')}
			</MDialogHeader>
			<FadeOutLoader overlay on={loading} onChange={getData}>
				<MDialogContent >

					<GridContainer>
						<ItemG xs={6} container>
							<ItemG xs={12}>

								<FormGroup>
									<FormLabel>{t('exports.files')}</FormLabel>
									{columns.map((c, i) => {
										return <FormControlLabel
											key={i}
											control={<Checkbox
												onChange={handleCheckboxClick(c)}
												id={c}
												checked={sColumns.indexOf(c) !== -1 ? true : false} />}
											label={t("exports.fields." + c)}
											style={{ marginTop: 8 }}
										/>
									})}
									<Collapse in={sColumns.indexOf('reading') !== -1 ? true : false}>
										<FormControlLabel

											control={<Checkbox
												onChange={handleCheckboxClick('onlyLast')}
												checked={sColumns.indexOf('onlyLast') !== -1 ? true : false} />}
											label={t('exports.fields.onlyLast')}
											style={{ marginTop: 0, marginLeft: 8 }}
										/>
									</Collapse>
								</FormGroup>
							</ItemG>
							<ItemG xs={12}>
								<DSelect
									label={t('exports.fileType')}
									simple
									value={fileType}
									onChange={handleSelectFileType}
									menuItems={["csv", 'json']}
								/>
							</ItemG>
						</ItemG>
						<ItemG xs={6} container>
							<ItemG container spacing={2}>
								<ItemG xs={12}>
									<FormGroup>
										<FormLabel>{t('exports.period')}</FormLabel>
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
									<DSelect
										label={t('exports.locale')}
										value={locale}
										menuItems={[
											{ value: -1, label: t("exports.noLocale") },
											{ value: 'da', label: t("settings.languages.da") + " - da-DK" },
											{ value: 'en', label: t("settings.languages.en") + " - en-US" },

										]}
										onChange={(e) => setLocale(e.target.value)}
									/>
								</ItemG>
								<ItemG xs={12}>
									<FormGroup style={{ marginTop: 0 }}>
										<DeviceTableExportWidget />
									</FormGroup>

								</ItemG>
							</ItemG>
						</ItemG>
					</GridContainer>
				</MDialogContent>
			</FadeOutLoader>
			<MDialogActions>
				<Button onClick={handleCloseExport}>
					<Close />
					{t('actions.cancel')}
				</Button>
				<Button onClick={setLoader}>
					<ImportExport />
					{t('actions.export')}
				</Button>
			</MDialogActions>
		</Dialog>
	)
}
