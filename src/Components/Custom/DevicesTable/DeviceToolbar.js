import { Button, Chip, Dialog, DialogActions, Divider, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ItemG from 'Components/Containers/ItemG'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import DSelect from 'Components/Input/DSelect'
import TextF from 'Components/Input/TextF'
import T from 'Components/Typography/T'
import { useLocalization, useSelector } from 'Hooks'
import React, { useState } from 'react'
import { Add, Edit } from 'variables/icons'
import { colors } from 'variables/colors'

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
const DeviceToolbar = props => {
	//Hooks
	const classes = styles()
	const t = useLocalization()

	//Redux
	const devices = useSelector(s => s.data.devices)
	//State
	const [openAddTags, setOpenAddTags] = useState(false)
	// const [openEditTags, setOpenEditTags] = useState(false)
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
	const handleOpenAddTags = () => setOpenAddTags(true)
	const handleCloseAddTags = () => setOpenAddTags(false)


	const handleChangeTag = field => e => {
		setTag({
			...tag,
			[field]: e.target.value
		})
	}
	//Renders
	const renderAddTags = () => {
		return <Dialog
			open={openAddTags}
			onClose={handleCloseAddTags}
		// PaperProps={{
		// 	style: { padding: 16 }
		// }}
		>
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
								console.log(device)
								return <ListItem divider>{device.name} - {device.uuname}</ListItem>
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
								colors.map(c => ({
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
							value={tag.name}
							onChange={handleChangeTag('description')}
						/>
					</ItemG>
				</ItemG>
				<DialogActions>

					<ItemG container>
						<Button onClick={handleCloseAddTags}>{t('actions.close')}</Button>
					</ItemG>
				</DialogActions>
			</ItemG>
		</Dialog>
	}
	return (
		<div className={classes.chipContainer}>
			<ItemG container spacing={1} alignItems={'center'}>
				<ItemG>
					<Chip color={'primary'} label={`${props.devices.length} ${t('tables.selected')}`} />
				</ItemG>
				<ItemG>
					<Chip style={{ color: '#fff' }} label={'Add Tags'} color={'secondary'} onClick={handleOpenAddTags} icon={<Add style={{ color: '#fff' }} />} />
				</ItemG>
				<ItemG>
					<Chip style={{ color: '#fff' }} label={'Edit Tags'} color={'secondary'} onClick={() => alert('Edit Tags')} icon={<Edit style={{ color: '#fff' }} />} />
				</ItemG>
			</ItemG>
			{renderAddTags()}
		</div>
	)
}

export default DeviceToolbar
