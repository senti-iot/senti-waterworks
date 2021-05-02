import React, { Fragment, useState, useEffect } from 'react'
import { Fade } from '@material-ui/core'
import { CircularLoader } from 'Components'
import { usePrevious } from 'Hooks'
import PropTypes from 'prop-types'
import CircularOverlay from './CircularOverlay'
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

function FadeOutLoader(props) {
	//Hooks
	const classes = useStyles()

	//Redux

	//State
	const [loading, setLoading] = useState(false)
	const [showLoader, setShowLoader] = useState(false)

	//Const
	const on = props.on
	const prevOn = usePrevious(on)

	//useCallbacks

	//useEffects

	//Handlers

	useEffect(() => {
		async function loadLoader() {
			const execute = async (on) => {
				console.log('on', on)
				if (on) {
					setLoading(true)
					setTimeout(async () => {
						setShowLoader(on)
						setLoading(false)
						await props.onChange()
					}, 1000)
				}
				else {
					setLoading(false)
					setShowLoader(false)
				}
			}
			if ((prevOn !== on) && on) {
				await execute(true)
			}
			if ((prevOn !== on) && !on) {
				await execute(false)
			}
		}
		loadLoader()
		return () => {

		}
	}, [on, prevOn, props])

	const { children, notCentered, circularClasses, overlay, newLoader } = props
	const childrenClasses = cx({
		[classes.children]: true,
		[classes.openChildren]: !showLoader,
		[classes.closeChildren]: showLoader
	})

	return (
		<Fragment>
			{newLoader ? <div style={{ position: 'relative' }}>
				<CO overlay={showLoader} className={circularClasses} />
				<div className={childrenClasses}>

					{children}
				</div>
			</div>
				:
				!overlay ?

					<Fade in={!loading}>
						{!showLoader ?
							children
							: <CircularLoader fill notCentered={notCentered} className={circularClasses} />}
					</Fade>
					: <div>
						<CircularOverlay overlay={showLoader} className={circularClasses} />
						{children}
					</div>

			}
		</Fragment>
	)
}

FadeOutLoader.propTypes = {
	on: PropTypes.bool.isRequired,
	notCentered: PropTypes.bool,
	circularClasses: PropTypes.object,
	onChange: PropTypes.func.isRequired,
}
export default FadeOutLoader
