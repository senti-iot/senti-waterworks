import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import Warning from '@material-ui/icons/Warning'
import amber from '@material-ui/core/colors/amber';
import { StylesProvider } from "@material-ui/styles";
import styled from 'styled-components'
import { SnackbarContent } from '@material-ui/core';

const IconWarn = styled(Warning)`
	font-size: 16px;
	opacity: 0.9;
	margin-right: 8px;
`
const UpdateSnackbar = styled(SnackbarContent)`
	background: ${amber[700]};
`
const RefreshButton = styled(Button)`
	color: #fff;
	background :${amber[700]};
	&:hover {
    	background: ${amber[500]};
  	}
`
const Message = styled.span`
	display: flex;
	align-items: center;
`

function NewContent(props) {

	const handleClose = () => {
		window.location.reload()
	};
	return (
		<StylesProvider injectFirst>

			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={true}
			>
				<UpdateSnackbar
					message={<Message>
						<IconWarn />
						{props.installing ? 'Caching application ...' : 'Update Available'}
					</Message>}
					action={<RefreshButton size="small" onClick={handleClose}>
						REFRESH</RefreshButton>}
				>
				</UpdateSnackbar>
			</Snackbar>
		</StylesProvider>
	);
}

export default NewContent