import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CO from './CO'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
	children: {
		transition: 'all 300ms ease',
		opacity: 1
	},
	openChildren: {
		opacity: 1
	},
	closeChildren: {
		opacity: 0
	},


}))

function FadeLoader(props) {
	//Hooks
	const classes = useStyles()

	//Redux

	//State
	const [showLoader, setShowLoader] = useState(false)

	//Const
	const { on, onChange } = props

	//useCallbacks

	//useEffects
	useEffect(() => {
		if (on && !showLoader) {
			setShowLoader(true)
			setTimeout(async () => {
				await onChange()
				setShowLoader(false)
			}, 500)
		}
	}, [on, onChange, showLoader])
	//Handlers


	const { children, circularClasses } = props
	const childrenClasses = cx({
		[classes.children]: true,
		[classes.openChildren]: !showLoader,
		[classes.closeChildren]: showLoader
	})

	return (
		<Fragment>
			<div style={{ position: 'relative' }}>
				<CO overlay={showLoader} className={circularClasses} />
				<div className={childrenClasses}>
					{children}
				</div>
			</div>

		</Fragment>
	)
}

FadeLoader.propTypes = {
	on: PropTypes.bool.isRequired,
	notCentered: PropTypes.bool,
	circularClasses: PropTypes.object,
	onChange: PropTypes.func.isRequired,
}
export default FadeLoader
