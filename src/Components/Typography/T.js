import React from 'react'
import { Typography, styled } from '@material-ui/core';


const T = styled(({ bold, reversed, ...props }) => <Typography color={'textPrimary'} {...props}>{props.children}</Typography>)`
	fontWeight: ${props => props.bold ? 600 : undefined};
	color: ${props => props.reversed ? '#000' : '#fff'}
`
export default T