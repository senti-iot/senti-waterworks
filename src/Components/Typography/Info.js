import React from 'react';
import {  Typography } from '@material-ui/core';

function Info({ ...props }) {
	const { paragraphCell, noWrap, children, rest, noParagraph, className } = props;
	return (
		<Typography {...rest} noWrap={noWrap ? true : false} paragraph={noParagraph ? false : true} classes={{ root: paragraphCell }} className={className}>{children}</Typography>
	);
}

export default Info;
