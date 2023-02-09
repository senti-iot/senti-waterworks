import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { T, ItemG } from 'Components'
import { useLocalization, useSelector } from 'Hooks'
import { green, red } from '@material-ui/core/colors'
// import { KeyboardArrowRight } from 'variables/icons'
// import { IconButton } from '@material-ui/core'
import styled from 'styled-components'
import size from 'Styles/themes/mediaQueries'

const TextContainer = styled(ItemG)`
	/* max-width: 45%; */
	@media ${size.down.md} {
		margin-left: 8px;
	}
	margin-left: 16px;
`
const Title = styled(T)`
	@media ${size.down.md} {
		margin-top: 8px;
		margin-left: 8px;
		font-size: 0.875em;
	}
	margin: 16px;
	font-weight: 600;
	font-size: 1.5em;
	letter-spacing: 1.5px;
`

const devicesWidgetStyles = makeStyles(theme => ({
	text: {
		whiteSpace: 'nowrap',
		marginTop: 8,
		[theme.breakpoints.down('lg')]: {
			fontSize: '0.875rem'
		},
		fontSize: '1rem'
	},
	devices: {
		minWidth: '100px',
		width: '100px',
		textAlign: 'center',
		marginTop: 4,
		// fontSize: '1.25rem',
		fontWeight: 500
	},
	activeDevices: {
		color: green[500]
	},
	inactiveDevices: {
		color: red[500]
	},

}))


const DevicesWidget = () => {
	const classes = devicesWidgetStyles()
	const t = useLocalization()
	const devices = useSelector(s => s.data.adminDevices)
	const inactiveDevices = devices.filter(d => !d.communication)
	const activeDevices = devices.filter(d => d.communication)
	return (
		<>
			<Title variant={'h5'} /* className={classes.title} */>{t('charts.devices')}</Title>
			<ItemG container>
				<TextContainer container direction={'column'}>
					<ItemG container alignItems={'center'}>
						<T className={classes.text}>{t('charts.device.active')}:</T><T className={classes.devices + " " + classes.activeDevices}>{activeDevices.length}</T>
					</ItemG>
					<ItemG container alignItems={'center'}>
						<T className={classes.text}>{t('charts.device.inactive')}:</T><T className={classes.devices + " " + classes.inactiveDevices}>{inactiveDevices.length}</T>
					</ItemG>
				</TextContainer>
				{/* <TextContainer container direction={'column'}>
					{/* <T variant={'h5'} className={classes.title}>{t('charts.devices')}</T>
					<ItemG container alignItems={'center'}>

					</ItemG>
					<ItemG container alignItems={'center'}>

					</ItemG>
				</TextContainer> */}
			</ItemG>
		</>
	)
}

export default DevicesWidget
