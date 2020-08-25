import React from 'react'
import useBarStyles from 'Components/Custom/Styles/barStyles'
import cx from 'classnames'
import ItemG from 'Components/Containers/ItemG'
import T from 'Components/Typography/T'

const BarLegend = props => {
	//Hooks
	const classes = useBarStyles()
	//Redux

	//State

	//Const
	const { data } = props
	//useCallbacks

	//useEffects

	//Handlers

	const renderBullet = (className) => {
		const cls = cx({
			[classes.legendBullet]: true,
			[className]: true
		})
		return <div className={cls} />
	}
	return (
		<ItemG container justify={'space-between'} alignItems={'center'} xs={12}>
			{data.map(d => d.hidden ? null : <ItemG key={d.className} container alignItems={'center'} xs={6}>
				<ItemG xs={3} container justify={'center'}>
					{renderBullet(d.className)}
				</ItemG>
				<ItemG xs={9}>
					<T style={{ fontWeight: 500, fontSize: 16 }}>{d.type}</T>
				</ItemG>
			</ItemG>)}
		</ItemG>
	)
}

export default BarLegend
