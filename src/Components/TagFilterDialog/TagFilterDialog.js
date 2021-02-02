import { Dialog, DialogActions,  makeStyles } from '@material-ui/core'
import { DSelect, ItemG, T } from 'Components'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import { useLocalization } from 'Hooks'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeOpenTagFilter, setTagFilter } from 'Redux/appState'

const styles = makeStyles(theme => ({
	section: {
		margin: 8
	},
	listContainer: {
		maxHeight: 300,
		overflow: 'auto',
		minWidth: 300
	},
	chipContainer: {
		background: 'rgba(0, 0, 0, 0.1)',
		display: 'flex',
		borderRadius: 4,
		minHeight: 40,
		padding: 12,

	},
}))

const TagFilterDialog = () => {
	//Hooks
	const dispatch = useDispatch()
	const classes = styles()
	const t = useLocalization()
	//Redux
	const open = useSelector(s => s.appState.openTagFilter)
	const selectedTag = useSelector(s => s.appState.selectedTag)
	const tags = useSelector(s => s.tagManager.tags)
	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const handleSelectEditTag = (e) => {
		dispatch(setTagFilter(e.target.value))
	}
	const handleClose = () => {
		dispatch(changeOpenTagFilter())
	}
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll="paper"
		>
			<DialogHeader label={'tags.filter.title'}/>
			<ItemG container style={{ padding: 16 }}>

				<ItemG container>
					<ItemG xs={12}>
						<T variant={'h6'} className={classes.section}>{`${t('tags.tag')} ${t('tables.selected')}:`}</T>
						<DSelect
							leftIcon
							value={selectedTag}
							onChange={handleSelectEditTag}
							menuItems={[{ value: -1, label: t("no.tag") }, ...tags.map(tag => ({
								value: tag.uuid,
								label: tag.name,
								icon: <div style={{ borderRadius: 4, background: tag.color, width: 16, height: 16 }}></div>
							}))]}
						/>
					</ItemG>

				</ItemG>
			</ItemG>
			<DialogActions>

			</DialogActions>
		</Dialog>
	)
}

export default TagFilterDialog
