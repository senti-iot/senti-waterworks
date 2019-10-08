import React from 'react'
import { TablePagination } from '@material-ui/core'
import cx from 'classnames'
import { useLocalization, useState, useSelector } from 'Hooks';
import tableStyles from 'Styles/tableStyles';

const TP = (props) => {
	const { count, page, disableRowsPerPage } = props
	const color = useSelector(s => s.settings.colorTheme)
	const classes = tableStyles({ color: color })
	const t = useLocalization()
	const rowsPerPageDefault = useSelector(s => s.settings.trp)
	const rowsPerPageOptions = useSelector(s => s.settings.rowsPerPageOptions)
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDefault)

	const handleChangeRowsPerPage = e => {
		setRowsPerPage(e.target.value)
	}
	const handleChangePage = (e, page) => {
		props.handleChangePage(e, page)
	}
	const selectClasses = cx({
		[classes.SelectIcon]: disableRowsPerPage,
		[classes.noRows]: disableRowsPerPage
	})
	const iconClass = cx({
		[classes.noRows]: disableRowsPerPage
	})
	return (
		<TablePagination
			component='div'
			count={count}
			rowsPerPage={rowsPerPage}
			page={page}
			backIconButtonProps={{
				'aria-label': t('actions.nextPage'),
			}}
			nextIconButtonProps={{
				'aria-label': t('actions.previousPage'),
			}}
			classes={{
				spacer: classes.spacer,
				input: classes.spaceBetween,
				caption: classes.tablePaginationCaption
			}}
			labelDisplayedRows={({ from, to, count }) => disableRowsPerPage ? `` : `${from}-${to} ${t('tables.of')} ${count}`}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			// labelRowsPerPage={isWidthUp('sm', width) ? disableRowsPerPage ? `` : t('tables.rowsPerPage') : ''}
			rowsPerPageOptions={rowsPerPageOptions}
			SelectProps={{
				renderValue: value => value,
				classes: {
					select: selectClasses,
					icon: iconClass
				}
			}}
		/>
	)
}


export default TP