import React from 'react';
import PropTypes from 'prop-types';


function Success({ ...props }) {
	const { classes, children, className } = props;
	return (
		<div className={classes.defaultFontStyle + ' ' + classes.successText + ' ' + className}>
			{children}
		</div>
	);
}

Success.propTypes = {
	classes: PropTypes.object.isRequired
};

export default (Success);
