import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox, Hidden } from '@material-ui/core'
// import classNames from 'classnames'
import tableStyles from 'Styles/tableStyles';
import { useSelector } from 'Hooks';
import { T } from 'Components';

const TH = (props) => {
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};
	const color = useSelector(s => s.settings.colorTheme)
	const classes = tableStyles({ color: color })
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, columns, mdDown, customColumn, noCheckbox } = props;
	const selectAllClick = e => {
		onSelectAllClick(e.target.checked)
	}
	return (
		<TableHead>
			<TableRow>
				{noCheckbox ? null : <TableCell className={classes.header}>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount && numSelected > 0}
						disabled={rowCount === 0}
						onChange={selectAllClick}
					/>
				</TableCell>}
				<Hidden mdDown>
					{columns.map((column, i) => {

						return (
							<TableCell
								className={classes.header}
								key={i}
								sortDirection={orderBy === column.id ? order : false}
							>
								<TableSortLabel
									active={orderBy === column.id}
									direction={order === '' ? 'asc' : order}
									disabled={rowCount === 0}
									onClick={createSortHandler(column.id)}>
									{column.checkbox ? column.label : <T>{column.label}</T>}
								</TableSortLabel>
							</TableCell>
						);
					}, this)}
				</Hidden>
				<Hidden lgUp>
					{
						mdDown ? mdDown.map(c => {
							return <TableCell
								className={classes.header}
								key={columns[c].id}
								sortDirection={orderBy === columns[c].id ? order : false}
							>
								<TableSortLabel
									active={orderBy === columns[c].id}
									direction={order}
									onClick={createSortHandler(columns[c].id)}
								>
									<T paragraph>{columns[c].label}</T>
								</TableSortLabel>
							</TableCell>
						}) : customColumn ? customColumn.map(c => {
							return <TableCell
								className={classes.header}
								key={c.id}
								sortDirection={orderBy === c.id ? order : false}>
								<TableSortLabel
									active={orderBy === c.id}
									direction={order}
									onClick={createSortHandler(c.id)}
								>
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