import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox, Hidden, Typography } from '@material-ui/core'
import classNames from 'classnames'
import tableStyles from 'Styles/tableStyles';
import { useSelector } from 'Hooks';

const TH = (props) => {
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};
	const color = useSelector(s => s.settings.colorTheme)
	const classes = tableStyles({ color: color })
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, columns, mdDown, customColumn, noCheckbox } = props;
	return (
		<TableHead>
			<TableRow>
				{noCheckbox ? null : <TableCell className={classes.header + ' ' + classes.tablecellcheckbox}>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount && numSelected > 0}
						disabled={rowCount === 0}
						onChange={onSelectAllClick}
						className={classes.checkbox}
					/>
				</TableCell>}
				<Hidden mdDown>
					{columns.map((column, i) => {
						let tcClasses = classNames({
							[classes.header]: classes,
							[classes.tableCell]: classes,
							[classes.centered]: classes && column.centered,
							[classes.tablecellcheckbox]: classes && column.checkbox,
							[classes.noCheckbox]: noCheckbox
						})
						return (
							<TableCell
								key={i}
								padding={column.disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === column.id ? order : false}
								className={tcClasses}
							>
								<TableSortLabel
									active={orderBy === column.id}
									direction={order === '' ? 'asc' : order}
									disabled={rowCount === 0}
									onClick={createSortHandler(column.id)}
									classes={{
										root: classes.HeaderLabelActive, active: classes.HeaderLabelActive, icon: classNames({
											[classes.hideIcon]: !(orderBy === column.id) ? true : false
										}),


									}}>
									{column.checkbox ? column.label : <Typography paragraph classes={{ root: classes.paragraphCell }}>{column.label}</Typography>}
								</TableSortLabel>
							</TableCell>
						);
					}, this)}
				</Hidden>
				<Hidden lgUp>
					{
						mdDown ? mdDown.map(c => {
							return <TableCell
								key={columns[c].id}
								padding={columns[c].disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === columns[c].id ? order : false}
								className={classes.header + ' ' + classes.tableCell}>
								<TableSortLabel
									active={orderBy === columns[c].id}
									direction={order}
									onClick={createSortHandler(columns[c].id)}
									classes={{
										root: classes.HeaderLabelActive, active: classes.HeaderLabelActive, icon: classNames({
											[classes.hideIcon]: !(orderBy === columns[c].id) ? true : false
										})
									}}>
									<Typography paragraph classes={{ root: classes.paragraphCell + ' ' + classes.headerCell }}>{columns[c].label}</Typography>
								</TableSortLabel>
							</TableCell>
						}) : customColumn ? customColumn.map(c => {
							return <TableCell
								key={c.id}
								padding={c.checkbox ? 'checkbox' : 'default'}
								sortDirection={orderBy === c.id ? order : false}
								className={c.checkbox ? classes.header + ' ' + classes.tablecellcheckbox : classes.header + ' ' + classes.tableCell}>
								<TableSortLabel
									active={orderBy === c.id}
									direction={order}
									onClick={createSortHandler(c.id)}
									classes={{
										root: classes.HeaderLabelActive, active: classes.HeaderLabelActive, icon: classNames({
											[classes.hideIcon]: !(orderBy === c.id) ? true : false
										})
									}}>
									{c.label}
								</TableSortLabel>
							</TableCell>
						}) : null
					}
				</Hidden>

			</TableRow>
		</TableHead>
	);

}

TH.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
	columns: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired
};

export default TH