import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Divider, MenuItem, Menu, IconButton, Button, Tooltip } from '@material-ui/core';
import { T, CustomDateTime, ItemG, DSelect } from 'Components';
import { dateTimeFormatter } from 'variables/functions';
import moment from 'moment'
import { DateRange } from 'variables/icons';
import { useLocalization } from 'Hooks';
// import teal from '@material-ui/core/colors/teal'
// import { connect } from 'react-redux'
// import { changeDate, changeHeatMapDate } from 'redux/dateTime';
// import { changeSettingsDate } from 'redux/settings';
// import { compose } from 'recompose';

// const styles = theme => ({
// 	selected: {
// 		backgroundColor: `${teal[500]} !important`,
// 		color: "#fff"
// 	},

// })

const DateFilterMenu = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	state = {
	// 		timeType: props.period !== undefined ? props.period.timeType : 2,
	// 	}
	// }
	const { period, label, icon, button, settings, inputType, buttonProps } = props

	const t = useLocalization()
	const [openCustomDate, setOpenCustomDate] = useState(false)
	const [actionAnchor, setActionAnchor] = useState(null)
	// const [timeType, setTimeType] = useState(props.period !== undefined ? props.period.timeType : 2)
	// const timeTypes = [
	// 	{ id: 0, format: 'lll', chart: 'minute' },
	// 	{ id: 1, format: 'lll', chart: 'hour' },
	// 	{ id: 2, format: 'll', chart: 'day' },
	// 	{ id: 3, format: 'll', chart: 'day' },
	// ]
	const dOptions = [
		{ value: 0, label: t('filters.dateOptions.today') },
		{ value: 1, label: t('filters.dateOptions.yesterday') },
		{ value: 2, label: t('filters.dateOptions.thisWeek') },
		{ value: 3, label: t('filters.dateOptions.7days') },
		{ value: 4, label: t('filters.dateOptions.30days') },
		{ value: 5, label: t('filters.dateOptions.90days') },
		{ value: 6, label: t('filters.dateOptions.custom') },
	]
	const options = [
		{ id: 0, label: t('filters.dateOptions.today') },
		{ id: 1, label: t('filters.dateOptions.yesterday') },
		{ id: 2, label: t('filters.dateOptions.thisWeek') },
		{ id: 3, label: t('filters.dateOptions.7days') },
		{ id: 4, label: t('filters.dateOptions.30days') },
		{ id: 5, label: t('filters.dateOptions.90days') },
		{ id: 6, label: t('filters.dateOptions.custom') },
	]
	const handleSetDate = (menuId, to, from, timeType) => {
		let defaultT = 0
		switch (menuId) {
			case 0: // Today
				from = moment().startOf('day')
				to = moment()
				defaultT = 1
				break;
			case 1: // Yesterday
				from = moment().subtract(1, 'd').startOf('day')
				to = moment().subtract(1, 'd').endOf('day')
				defaultT = 1
				break;
			case 2: // This week
				from = moment().startOf('week').startOf('day')
				to = moment()
				break;
			case 3: // Last 7 days
				from = moment().subtract(7, 'd').startOf('day')
				to = moment()
				defaultT = 2
				break;
			case 4: // last 30 days
				from = moment().subtract(30, 'd').startOf('day')
				to = moment()
				defaultT = 2
				break;
			case 5: // last 90 days
				from = moment().subtract(90, 'd').startOf('day')
				to = moment()
				defaultT = 2
				break;
			case 6:
				from = moment(from)
				to = moment(to)
				defaultT = timeType
				break;
			default:
				break;
		}
		// if (props.settings) {
		// 	if (menuId === 6)
		// 		return props.handleSetSettingsPeriod(menuId, to, from, defaultT, period ? period.id : -1)
		// 	return props.handleSetSettingsPeriod(menuId, undefined, undefined, defaultT, period ? period.id : -1)
		// }
		// if (props.heatmap) {
		// 	return props.handleSetHeatmapDate(menuId, to, from, defaultT)
		// }
		if (props.customSetDate) {
			return props.customSetDate(menuId, to, from, defaultT)
		}
		// props.handleSetDate(menuId, to, from, defaultT, period ? period.id : -1)

	}

	const handleCloseDialog = (to, from, timeType) => {
		// const { period } = props
		this.setState({ openCustomDate: false, actionAnchor: null })
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
			// this.setState({ actionAnchor: null }, () => this.handleSetDate(id))
			setActionAnchor(null)
			handleSetDate(id)
		}
		else {
			// this.setState({ openCustomDate: true })
			setOpenCustomDate(true)
		}
	}

	const handleCustomCheckBox = (e) => {
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
		const { period } = props
		return openCustomDate ? <CustomDateTime
			openCustomDate={openCustomDate}
			handleCloseDialog={handleCloseDialog}//
			to={period ? period.to : undefined}
			from={period ? period.from : undefined}
			timeType={period ? period.timeType : undefined}
			handleCustomCheckBox={handleCustomCheckBox}//
			handleCancelCustomDate={handleCancelCustomDate}//
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

	const isSelected = (value) => value === period ? period.menuId ? true : false : false

	let displayTo = period ? dateTimeFormatter(period.to) : ""
	let displayFrom = period ? dateTimeFormatter(period.from) : ""
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
						{!settings && period && <Fragment>
							<ItemG>
								<T>{options[options.findIndex(d => d.id === period.menuId ? true : false)].label}</T>
								<T>{`${displayFrom} - ${displayTo}`}</T>
							</ItemG>
							<Divider />
						</Fragment>}
						<MenuItem selected={isSelected(0)} /* classes={{ selected: classes.selected }} */ onClick={handleDateFilter} value={0}>{t('filters.dateOptions.today')}</MenuItem>
						<MenuItem selected={isSelected(1)} /* classes={{ selected: classes.selected }} */ onClick={handleDateFilter} value={1}>{t('filters.dateOptions.yesterday')}</MenuItem>
						<MenuItem selected={isSelected(2)} /* classes={{ selected: classes.selected }} */ onClick={handleDateFilter} value={2}>{t('filters.dateOptions.thisWeek')}</MenuItem>
						<MenuItem selected={isSelected(3)} /* classes={{ selected: classes.selected }} */ onClick={handleDateFilter} value={3}>{t('filters.dateOptions.7days')}</MenuItem>
						<MenuItem selected={isSelected(4)} /* classes={{ selected: classes.selected }} */ onClick={handleDateFilter} value={4}>{t('filters.dateOptions.30days')}</MenuItem>
						<MenuItem selected={isSelected(5)} /* classes={{ selected: classes.selected }} */ onClick={handleDateFilter} value={5}>{t('filters.dateOptions.90days')}</MenuItem>

						<Divider />
						<MenuItem selected={isSelected(6)} /* classes={{ selected: classes.selected }} */ onClick={handleDateFilter} value={6}>{t('filters.dateOptions.custom')}</MenuItem>
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