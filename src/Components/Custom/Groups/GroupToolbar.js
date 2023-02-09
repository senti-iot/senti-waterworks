import { Button,  Chip, Dialog, DialogActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ItemG from 'Components/Containers/ItemG'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import DSelect from 'Components/Input/DSelect'
import TextF from 'Components/Input/TextF'
import { useDispatch, useLocalization, useSelector } from 'Hooks'
import React, { useState } from 'react'
import { Add, Edit, GroupWorkIcon } from 'variables/icons'
import { tagColors } from 'variables/colors'
import { createTag, deleteTag, editTag,  } from 'data/tags'
import FadeOutLoader from 'Components/Loaders/FadeOutLoader'
import { getTags } from 'Redux/tagManager'
import useSnackbar from 'Hooks/useSnackbar/useSnackbar'
import DeleteDialog from 'Components/Dialogs/DeleteDialog'
import { Delete } from '@material-ui/icons'

const styles = makeStyles(theme => ({
	chipIcon: {
		color: '#fff'
	},
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
const GroupToolbar = props => {
	//Hooks
	const classes = styles()
	const t = useLocalization()
	const s = useSnackbar()
	const dispatch = useDispatch()
	//Redux
	// const devices = useSelector(s => s.data.adminDevices)
	const tags = useSelector(s => s.tagManager.tags)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)

	//State
	const [openAddTags, setOpenAddTags] = useState(false)
	const [creatingTags, setCreatingTags] = useState(false)

	const [openDelete, setOpenDelete] = useState(false)
	const [openEditTags, setOpenEditTags] = useState(false)
	const [editingTags, setEditingTags] = useState(false)
	const [tag, setTag] = useState({
		name: '',
		color: '#2196f3',
		description: '',
		resourceUUID: '',
		resourceType: 11,
	})
	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const handleOpenEditTags = () => {
		let t = tags[tags.findIndex(t => t.uuid === props.tags[0])]
		if (t)
			setTag(t)
		setOpenEditTags(true)
	}

	const handleCloseEditTags = () => {
		setOpenEditTags(false)
		setEditingTags(false)
		setTag({
			name: '',
			color: '#2196f3',
			description: '',
			resourceUUID: '',
			resourceType: 11,
		})
	}

	const handleOpenAddTags = () => setOpenAddTags(true)
	const handleCloseAddTags = () => {
		setOpenAddTags(false)
		setCreatingTags(false)
		setTag({
			name: '',
			color: '#2196f3',
			description: '',
			resourceUUID: '',
			resourceType: 11,
		})
	}


	const handleChangeTag = field => e => {
		setTag({
			...tag,
			[field]: e.target.value
		})
	}
	const handleConfirmCreateTag = () => {
		setCreatingTags(true)
	}
	// const handleConfirmReplaceTag = () => {
	// 	setReplace(true)
	// 	setEditingTags(true)
	// }
	const handleConfirmEditTag = () => {
		setEditingTags(true)
	}
	// const handleSelectEditTag = uuid => () => {
	// 	const currentIndex = selectedTags.indexOf(uuid)
	// 	const newChecked = [...selectedTags]

	// 	if (currentIndex === -1) {
	// 		newChecked.push(uuid)
	// 	} else {
	// 		newChecked.splice(currentIndex, 1)
	// 	}

	// 	setSelectedTags(newChecked)
	// }
	const handleEditTags = async () => {
		let res = await editTag(tag)
		await dispatch(await getTags())
		s.s("snackbars.edit.tag", { tagName: res.name })
		handleCloseEditTags()
	}
	const handleCreateTags = async () => {
		let ftag = await createTag(tag)
		await dispatch(await getTags())
		s.s('snackbars.create.tag', { tagName: ftag.name })
		handleCloseAddTags()
	}

	//Renders
	/* const OldrenderEditTags = () => {
		return <Dialog
			open={openEditTags}
			onClose={handleCloseEditTags}
		>
			<FadeOutLoader overlay on={editingTags} onChange={handleEditTags}>
				<div>
					<DialogHeader label={'tags.editTag'} />
					<ItemG container style={{ padding: 16 }}>

						<ItemG container>
							<ItemG xs={12}>
								<T variant={'h6'} className={classes.section}>{`${t('sidebar.devices')} ${t('tables.selected')}:`}</T>
								<Divider />
							</ItemG>
							<ItemG xs={12}>

								<List dense className={classes.listContainer}>
									{props.devices.map(d => {
										let device = devices[devices.findIndex(f => f.uuid === d)]
										return <ListItem divider>{device?.name} - {device?.uuname}</ListItem>
									})
									}
								</List>
							</ItemG>
							<ItemG xs={12}>
								<T variant={'h6'} className={classes.section}>{`${t('tags.tags')}`}</T>
								<Divider />
							</ItemG>
							<ItemG xs={12}>
								<List dense className={classes.listContainer}>
									{tags.map(t => {
										return (
											<ListItem divider key={t.uuid} dense button onClick={handleSelectEditTag(t.uuid)}>
												<ListItemIcon>
													<Checkbox
														edge="start"
														checked={selectedTags.indexOf(t.uuid) !== -1}
														tabIndex={-1}
														disableRipple
														inputProps={{ 'aria-labelledby': t.name }}
													/>
												</ListItemIcon>
												<ListItemText id={t.uuid} primary={`${t.name}`} />
												<ListItemSecondaryAction>
													<div style={{ borderRadius: 4, background: t.color, width: 16, height: 16 }}></div>
												</ListItemSecondaryAction>
											</ListItem>
										)
									})}
								</List>
							</ItemG>
						</ItemG>
						<ItemG xs={12}>

						</ItemG>
						<DialogActions>

							<ItemG container>
								<Button onClick={handleCloseEditTags}>{t('actions.close')}</Button>
								<Button onClick={handleConfirmReplaceTag}>{t('actions.replace')}</Button>
								<Button onClick={handleConfirmEditTag}>{t('actions.add')}</Button>
							</ItemG>
						</DialogActions>
					</ItemG>
				</div>
			</FadeOutLoader>

		</Dialog>
	} */
	const handleCloseDeleteDialog = () => setOpenDelete(false)
	const handleDelete = () => {
		Promise.all([props.tags.map(u => {
			return deleteTag(u);
		})]).then(async () => {
			setOpenDelete(false)
			// setSelDev([])
			props.setSelected([])
			// await dispatch(await getAdminDevices())
			await dispatch(await getTags())
		})
	}

	const renderDeleteTags = () => {
		let data = props.tags.map(s => tags[tags.findIndex(d => d.uuid === s)])
		return <DeleteDialog
			t={t}
			title={'dialogs.delete.title.groups'}
			message={'dialogs.delete.message.groups'}
			open={openDelete}
			icon={<GroupWorkIcon />}
			handleCloseDeleteDialog={handleCloseDeleteDialog}
			handleDelete={handleDelete}
			data={data}
			dataKey={'name'}
			dataKeySec={'description'}
		/>
	}
	const renderEditTags = () => {
		return <Dialog
			open={openEditTags}
			onClose={handleCloseEditTags}
		>
			<FadeOutLoader overlay on={editingTags} onChange={handleEditTags}>
				<div>

					<DialogHeader label={'tags.editTag'} />
					<ItemG container style={{ padding: 16 }}>

						<ItemG container spacing={1}>
							<ItemG xs={6}>
								<TextF
									fullWidth
									label={t('tags.fields.name')}
									id={'tagName'}
									value={tag.name}
									onChange={handleChangeTag('name')}
								/>
							</ItemG>
							<ItemG xs={6}>
								<DSelect
									fullWidth
									margin={'normal'}
									value={tag.color}
									onChange={handleChangeTag('color')}
									label={t('tags.fields.color')}
									menuProps={{
										PaperProps: {
											style: {
												maxHeight: 400,
											}
										}
									}}
									leftIcon
									menuItems={
										tagColors.map(c => ({
											icon: <div style={{ borderRadius: 4, background: c, width: 16, height: 16 }}></div>,
											label: c, value: c
										}))
									}
								/>
							</ItemG>
							<ItemG xs={12}>
								<TextF
									multiline
									fullWidth
									label={t('tags.fields.description')}
									id={'tagName'}
									value={tag.description}
									onChange={handleChangeTag('description')}
								/>
							</ItemG>
						</ItemG>
						<DialogActions>

							<ItemG container>
								<Button onClick={handleCloseAddTags}>{t('actions.close')}</Button>
								<Button onClick={handleConfirmEditTag}>{t('actions.edit')}</Button>
							</ItemG>
						</DialogActions>
					</ItemG>
				</div>
			</FadeOutLoader>
		</Dialog>
	}
	const renderAddTags = () => {
		return <Dialog
			open={openAddTags}
			onClose={handleCloseAddTags}
		// PaperProps={{
		// 	style: { padding: 16 }
		// }}
		>
			<FadeOutLoader overlay on={creatingTags} onChange={handleCreateTags}>
				<div>

					<DialogHeader label={'tags.createTag'} />
					<ItemG container style={{ padding: 16 }}>

						<ItemG container spacing={1}>
							<ItemG xs={6}>
								<TextF
									fullWidth
									label={t('tags.fields.name')}
									id={'tagName'}
									value={tag.name}
									onChange={handleChangeTag('name')}
								/>
							</ItemG>
							<ItemG xs={6}>
								<DSelect
									fullWidth
									margin={'normal'}
									value={tag.color}
									onChange={handleChangeTag('color')}
									label={t('tags.fields.color')}
									menuProps={{
										PaperProps: {
											style: {
												maxHeight: 400,
											}
										}
									}}
									leftIcon
									menuItems={
										tagColors.map(c => ({
											icon: <div style={{ borderRadius: 4, background: c, width: 16, height: 16 }}></div>,
											label: c, value: c
										}))
									}
								/>
							</ItemG>
							<ItemG xs={12}>
								<TextF
									multiline
									fullWidth
									label={t('tags.fields.description')}
									id={'tagName'}
									value={tag.description}
									onChange={handleChangeTag('description')}
								/>
							</ItemG>
						</ItemG>
						<DialogActions>

							<ItemG container>
								<Button onClick={handleCloseAddTags}>{t('actions.close')}</Button>
								<Button onClick={handleConfirmCreateTag}>{t('actions.create')}</Button>
							</ItemG>
						</DialogActions>
					</ItemG>
				</div>
			</FadeOutLoader>
		</Dialog>
	}
	return (
		<div className={classes.chipContainer}>
			<ItemG container spacing={1} alignItems={'center'}>
				<ItemG>
					<Chip color={'primary'} label={`${props.tags.length} ${t('tables.selected')}`} />
				</ItemG>
				{isSWAdmin ? <>
					<ItemG>
						<Chip className={classes.chipIcon} label={t('actions.addNewTag')} color={'secondary'} onClick={handleOpenAddTags} icon={<Add className={classes.chipIcon} />} />
					</ItemG>
					{(props.tags.length > 1 || props.tags.length === 0) ? null : <ItemG>
						 <Chip className={classes.chipIcon} label={t('menus.edits.group')} color={'secondary'} onClick={handleOpenEditTags} icon={<Edit className={classes.chipIcon} />} />
					</ItemG>}
					{props.tags.length >= 1 ? <ItemG>
						 <Chip className={classes.chipIcon} label={t('menus.deletes.groups')} color={'secondary'} onClick={() => { setOpenDelete(true) }} icon={<Delete className={classes.chipIcon} />} />
					</ItemG> : null}
				</> : null}

			</ItemG>
			{renderEditTags()}
			{renderAddTags()}
			{renderDeleteTags()}
		</div>
	)
}

export default GroupToolbar
