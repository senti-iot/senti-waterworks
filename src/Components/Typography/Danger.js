import React from 'react';
import PropTypes from 'prop-types';


function Danger({ ...props }) {
	const { classes, children } = props;
	return (
		<div className={classes.defaultFontStyle + ' ' + classes.dangerText}>
			{children}
		</div>
	);
}



export default (Danger);
