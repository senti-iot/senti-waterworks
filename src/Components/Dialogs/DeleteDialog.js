import React from 'react'
import { Dialog, DialogContent, DialogContentText, List, Divider, ListItem, ListItemIcon, ListItemText, DialogActions, Button } from '@material-ui/core';
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'

function DeleteDialog(props) {
	const { t, message, messageOpts, title, icon, single, open, data,
		dataKey, dataKeySec, handleCloseDeleteDialog, handleDelete } = props
	return (
		<Dialog
			open={open}
			onClose={handleCloseDeleteDialog}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogHeader label={title}/>
			{/* <DialogTitle disableTypography id='alert-dialog-title'>
				{t(title)}
			</DialogTitle> */}
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{t(message, messageOpts)}
				</DialogContentText>
				{single ? null :
					<List dense={true}>
						<Divider />
						{data.map(s => {
							return <ListItem divider key={s.id}>
								<ListItemIcon>
									{icon}
								</ListItemIcon>
								<ListItemText primary={s[dataKey]} secondary={s[dataKeySec]}/>
							</ListItem>
						})
						}
					</List>
				}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDelete} color='primary' autoFocus>
					{t('actions.yes')}
				</Button>
				<Button onClick={handleCloseDeleteDialog} color='primary'>
					{t('actions.no')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DeleteDialog
