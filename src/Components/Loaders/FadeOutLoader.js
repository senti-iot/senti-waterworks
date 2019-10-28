import React, { Fragment, useState, useEffect } from 'react'
import { Fade } from '@material-ui/core';
import { CircularLoader } from 'Components';
import { usePrevious } from 'Hooks';

function FadeOutLoader(props) {
	const [loading, setLoading] = useState(false)
	const [showLoader, setShowLoader] = useState(false)

	const on = props.on
	const prevOn = usePrevious(on)
	useEffect(() => {
		async function loadLoader() {
			const execute = async (on) => {
				if (on) {
					setLoading(true)
					setTimeout(async () => {
						setShowLoader(on)
						setLoading(false)
						await props.onChange()
					}, 1000);
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
		loadLoader();
		return () => {

		}
	}, [on, prevOn, props])

	const { children, notCentered, circularClasses } = props

	return (
		<Fragment>
			<Fade in={!loading}>
				{!showLoader ?
					children
					: <CircularLoader notCentered={notCentered} className={circularClasses} />}
			</Fade>
		</Fragment>
	)
}


export default FadeOutLoader
