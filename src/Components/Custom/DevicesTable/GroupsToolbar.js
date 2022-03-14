import { Button, Checkbox, Chip, Dialog, DialogActions, Divider, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ItemG from 'Components/Containers/ItemG'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import DSelect from 'Components/Input/DSelect'
import TextF from 'Components/Input/TextF'
import T from 'Components/Typography/T'
import { useDispatch, useLocalization, useSelector } from 'Hooks'
import React, { useState } from 'react'
import { Add, Edit } from 'variables/icons'
import { tagColors } from 'variables/colors'
import { addTagToResources, createTag, replaceTagsToResources } from 'data/tags'
import FadeOutLoader from 'Components/Loaders/FadeOutLoader'
import { getAdminDevices } from 'Redux/data'
import { getTags } from 'Redux/tagManager'
import useSnackbar from 'Hooks/useSnackbar/useSnackbar'

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
const GroupsToolbar = props => {
	//Hooks
	const classes = styles()
	const t = useLocalization()
	const s = useSnackbar()
	const dispatch = useDispatch()
	//Redux
	const devices = useSelector(s => s.data.devices)
	const tags = useSelector(s => s.tagManager.tags)
	//State
	const [openAddTags, setOpenAddTags] = useState(false)
	const [creatingTags, setCreatingTags] = useState(false)

	const [selectedTags, setSelectedTags] = useState([])

	const [openEditTags, setOpenEditTags] = useState(false)
	const [editingTags, setEditingTags] = useState(false)
	const [replace, setReplace] = useState(false)
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
	const handleOpenEditTags = () => setOpenEditTags(true)
	const handleCloseEditTags = () => {
		setReplace(false)
		setOpenEditTags(false)
		setEditingTags(false)
		setSelectedTags([])
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
	const handleConfirmReplaceTag = () => {
		setReplace(true)
		setEditingTags(true)
	}
	const handleConfirmEditTag = () => {
		setReplace(false)
		setEditingTags(true)
	}
	const handleSelectEditTag = uuid => () => {
		const currentIndex = selectedTags.indexOf(uuid)
		const newChecked = [...selectedTags]

		if (currentIndex === -1) {
			newChecked.push(uuid)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		setSelectedTags(newChecked)
	}
	const handleEditTags = async () => {
		let assignTags = props.devices.map(d => ({
			resourceUUID: d,
			resourceType: 11,
		}))
		let fResources = {
			tagUUIDs: selectedTags,
			resources: assignTags
		}
		if (!replace) {
			await addTagToResources(fResources)
		}
		else {
			await replaceTagsToResources(fResources)
		}
		await dispatch(await getAdminDevices())
		await dispatch(await getTags())
		s.s('Created')
		handleCloseEditTags()
	}
	const handleCreateTags = async () => {
		let ftag = await createTag(tag)
		if (ftag.uuid) {

			let assignTags = props.devices.map(d => ({
				resourceUUID: d,
				resourceType: 11,
			}))
			let fResources = {
				tagUUIDs: [ftag.uuid],
				resources: assignTags
			}
			let result = await addTagToResources(fResources)
			console.log(result)
		}
		await dispatch(await getAdminDevices())
		await dispatch(await getTags())
		s.s('Created')
		handleCloseAddTags()
	}

	//Renders
	const renderEditTags = () => {
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
										// console.log(device)
										return <ListItem divider>{device?.name} - {device?.uuname}</ListItem>
									})
									}
								</List>
								{/* <Divider/> */}
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

						<ItemG container>
							<ItemG xs={12}>
								<T variant={'h6'} className={classes.section}>{`${t('sidebar.devices')} ${t('tables.selected')}:`}</T>
								<Divider />
							</ItemG>
							<ItemG xs={12}>

								<List dense className={classes.listContainer}>
									{props.devices.map(d => {
										let device = devices[devices.findIndex(f => f.uuid === d)]
										// console.log(device)
										return <ListItem divider>{device?.name} - {device?.uuname}</ListItem>
									})
									}
								</List>
							</ItemG>
						</ItemG>
						<Divider />
						<ItemG container spacing={1}>
							<ItemG xs={12}>
								<T variant={'h6'} className={classes.section}>{t('tags.createTag')}</T>
								<Divider />
							</ItemG>
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
					<Chip color={'primary'} label={`${props.devices.length} ${t('tables.selected')}`} />
				</ItemG>
				<ItemG>
					<Chip style={{ color: '#fff' }} label={t('actions.addNewTag')} color={'secondary'} onClick={handleOpenAddTags} icon={<Add style={{ color: '#fff' }} />} />
				</ItemG>
				<ItemG>
					<Chip style={{ color: '#fff' }} label={t('actions.editTags')} color={'secondary'} onClick={handleOpenEditTags} icon={<Edit style={{ color: '#fff' }} />} />
				</ItemG>
			</ItemG>
			{renderEditTags()}
			{renderAddTags()}
		</div>
	)
}

export default GroupsToolbar
