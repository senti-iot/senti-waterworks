import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Divider, MenuItem, Menu, IconButton, Button, Tooltip } from '@material-ui/core';
import { CustomDateTime, ItemG, DSelect } from 'Components';
import moment from 'moment'
import { DateRange } from 'variables/icons';
import { useLocalization, useDispatch, useSelector } from 'Hooks';
import { changeDate } from 'Redux/dateTime';

const DateFilterMenu = (props) => {

	//Hooks
	const dispatch = useDispatch()

	//Redux
	const period = useSelector(s => s.dateTime.period)
	//State

	//Const
	const { label, icon, button, inputType, buttonProps } = props

	//useCallbacks

	//useEffects

	//Handlers

	const uInternal = useSelector(s => s.settings.user?.internal)
	const t = useLocalization()
	const [openCustomDate, setOpenCustomDate] = useState(false)
	const [actionAnchor, setActionAnchor] = useState(null)

	const dOptions = [
		{ value: 0, label: t('filters.dateOptions.today') },
		// { value: 1, label: t('filters.dateOptions.yesterday') },
		{ value: 1, label: t('filters.dateOptions.thisWeek') },
		{ value: 2, label: t('filters.dateOptions.7days') },
		{ value: 3, label: t('filters.dateOptions.month') },
		{ value: 4, label: t('filters.dateOptions.year') },
		{ value: 5, label: t('filters.dateOptions.90days') },
		{ value: 6, label: t('filters.dateOptions.custom') },
	]
	// const options = [
	// 	{ id: 0, label: t('filters.dateOptions.today') },
	// 	// { id: 1, label: t('filters.dateOptions.yesterday') },
	// 	{ id: 1, label: t('filters.dateOptions.thisWeek') },
	// 	{ id: 2, label: t('filters.dateOptions.7days') },
	// 	{ id: 3, label: t('filters.dateOptions.month') },
	// 	{ id: 4, label: t('filters.dateOptions.year') },
	// 	{ id: 5, label: t('filters.dateOptions.90days') },
	// 	{ id: 6, label: t('filters.dateOptions.custom') },
	// 	{ id: 7, label: t('filters.dateOptions.30days') },
	// ]
	/* TODO: Fix the Custom Date Time for >30 days set for monthly */
	// const handleTimeType = (from, to) => {
	// 	let diff = moment(from).diff(to, 'day')
	// 	return 2
	// }
	const handleSetDate = (menuId, to, from, timeType) => {
		let defaultT = 0
		switch (menuId) {
			case 0: // Today
				from = moment().startOf('day')
				to = moment().endOf('day')
				defaultT = 1
				break;
			// case 1: // Yesterday
			// 	from = moment().subtract(1, 'd').startOf('day')
			// 	to = moment().subtract(1, 'd').startOf('day')
			// 	defaultT = 1
			// 	break;
			case 1: // This week
				from = moment().startOf('week').startOf('day')
				to = moment().startOf('day')
				defaultT = 2
				break;
			case 2: // Last 7 days
				from = moment().subtract(7, 'd').startOf('day')
				to = moment().startOf('day')
				defaultT = 2
				break;
			case 3: // this month
				// from = moment().subtract(30, 'd').startOf('day')
				from = moment().startOf('month').endOf('day')
				to = moment().startOf('day')
				defaultT = 2
				break;
			case 4: // this year
				from = moment().startOf('year')
				to = moment().startOf('day')
				defaultT = 4
				break;
			case 5: // last 90 days
				from = moment().subtract(90, 'd').startOf('day')
				to = moment().startOf('day')
				defaultT = 2
				break;
			case 7: // last 30 days
				from = moment().subtract(30, 'd').startOf('day')
				to = moment().startOf('day')
				defaultT = 2;
				break;
			case 6:
				from = moment(from)
				to = moment(to)
				defaultT = timeType
				break;
			default:
				break;
		}

		dispatch(changeDate(menuId, to, from, defaultT))
		// if (props.customSetDate) {
		// return props.customSetDate(menuId, to, from, defaultT)
		// }

	}

	const handleCloseDialog = (to, from, timeType) => {
		// const { period } = props
		// this.setState({ openCustomDate: false, actionAnchor: null })
		setOpenCustomDate(false)
		setActionAnchor(null)
		handleSetDate(6, to, from, timeType)
	}
	/**
	 * Menu Handling, close the menu and set the date or open Custom Date
	 */
	const handleDateFilter = (event) => {
		let id = event.target.value
		if (id !== 6) {
			setActionAnchor(null)
			handleSetDate(id)
		}
		else {
			// this.setState({ openCustomDate: true })
			setOpenCustomDate(true)
		}
	}

	const handleCustomCheckBox = () => {
		// this.setState({ timeType: parseInt(e.target.value, 10) })
		// setTimeType(parseInt(e.target.value, 10))
	}

	const handleCancelCustomDate = () => {
		// this.setState({
		// loading: false, openCustomDate: false
		// })
		// setLoading(false)
		setOpenCustomDate(false)
	}
	const renderCustomDateDialog = () => {
		return openCustomDate ? <CustomDateTime
			openCustomDate={openCustomDate}
			handleCloseDialog={handleCloseDialog}//
			to={period.to}
			from={period.from}
			timeType={period.timeType}
			handleCustomCheckBox={handleCustomCheckBox}//
			handleCancelCustomDate={handleCancelCustomDate}//
			uInternal={uInternal}
		// t={t}
		/> : null
	}
	const handleOpenMenu = e => {
		// this.setState({ actionAnchor: e.currentTarget })
		setActionAnchor(e.currentTarget)
	}
	const handleCloseMenu = () => {
		// this.setState({ actionAnchor: null })
		setActionAnchor(null)
	}

	const isSelected = (value) => value === period.menuId ? true : false

	// let displayTo = period ? dateTimeFormatter(period.to) : ""
	// let displayFrom = period ? dateTimeFormatter(period.from) : ""
	return (
		inputType ? <DSelect
			onChange={handleDateFilter}
			label={label}
			value={period.menuId}
			menuItems={dOptions}
		/> :
			<Fragment>
				{button && <Button

					aria-label='More'
					aria-owns={actionAnchor ? 'long-menu' : null}
					aria-haspopup='true'
					style={{ color: 'rgba(0, 0, 0, 0.54)' }}
					onClick={handleOpenMenu}
					{...buttonProps}
				>
					{icon ? icon : <DateRange />}
				</Button>}
				{!button && <Tooltip title={t('tooltips.chart.period')}>
					<IconButton
						aria-label='More'
						aria-owns={actionAnchor ? 'long-menu' : null}
						aria-haspopup='true'
						onClick={handleOpenMenu}>
						{icon ? icon : <DateRange />}
					</IconButton>
				</Tooltip>}
				<Menu
					disableAutoFocus
					disableRestoreFocus
					id='long-menu'
					anchorEl={actionAnchor}
					open={Boolean(actionAnchor)}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					onClose={handleCloseMenu}
					getContentAnchorEl={null}
					PaperProps={{
						style: {
							minWidth: 250
						}
					}}>
					<ItemG container direction={'column'}>
						{/* {!settings && period && <Fragment>
							<ItemG>
								<T>{options[options.findIndex(d => d.id === period.menuId ? true : false)].label}</T>
								<T>{`${displayFrom} - ${displayTo}`}</T>
							</ItemG>
							<Divider />
						</Fragment>} */}
						{uInternal?.sentiWaterworks?.timeType === 1 ?
							<MenuItem selected={isSelected(0)} onClick={handleDateFilter} value={0}>{t('filters.dateOptions.today')}</MenuItem> : null}
						<MenuItem selected={isSelected(1)} onClick={handleDateFilter} value={1}>{t('filters.dateOptions.thisWeek')}</MenuItem>
						<MenuItem selected={isSelected(2)} onClick={handleDateFilter} value={2}>{t('filters.dateOptions.7days')}</MenuItem>
						<MenuItem selected={isSelected(3)} onClick={handleDateFilter} value={3}>{t('filters.dateOptions.thisMonth')}</MenuItem>
						<MenuItem selected={isSelected(7)} onClick={handleDateFilter} value={7}>{t('filters.dateOptions.30days')}</MenuItem>
						<MenuItem selected={isSelected(5)} onClick={handleDateFilter} value={5}>{t('filters.dateOptions.90days')}</MenuItem>
						<MenuItem selected={isSelected(4)} onClick={handleDateFilter} value={4}>{t('filters.dateOptions.thisYear')}</MenuItem>

						<Divider />
						<MenuItem selected={isSelected(6)} onClick={handleDateFilter} value={6}>{t('filters.dateOptions.custom')}</MenuItem>
					</ItemG>
					{renderCustomDateDialog()}
				</Menu>
			</Fragment>
	)

}
DateFilterMenu.propTypes = {
	classes: PropTypes.object,
	to: PropTypes.instanceOf(moment),
	from: PropTypes.instanceOf(moment),
	t: PropTypes.func,
	dateFilterInputID: PropTypes.number,
	handleDateFilter: PropTypes.func,
}

// const mapDispatchToProps = (dispatch) => ({
// 	handleSetDate: (id, to, from, timeType, pId) => dispatch(changeDate(id, to, from, timeType, pId)),
// 	handleSetSettingsPeriod: (id, to, from, timeType, pId) => dispatch(changeSettingsDate(id, to, from, timeType, pId)),
// 	handleSetHeatmapDate: (id, to, from, timeType) => dispatch(changeHeatMapDate(id, to, from, timeType))
// })

export default DateFilterMenu