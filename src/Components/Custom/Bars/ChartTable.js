import React from 'react'
import { useLocalization } from 'Hooks'
import { ItemG } from 'Components'
import T from 'Components/Typography/T'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
	lineMargin: {
		marginTop: 16
	},
	text: {
	},
}))

const ChartTable = props => {
	//Hooks
	const t = useLocalization()
	const classes = useStyles()
	//Redux

	//State

	//Const
	const { chart } = props
	//useCallbacks

	//useEffects

	//Handlers

	//Renders
	const renderWaterUsageTable = () => {
		return <ItemG container>
			<ItemG className={classes.lineMargin} container xs={12}>
				<ItemG xs={5}>
					<T>
						{t('chartTable.waterusage.line1')}
					</T>
				</ItemG>
				<ItemG xs={3} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						m3
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={5}>
					<T>
						{t('chartTable.waterusage.line2')}
					</T>
				</ItemG>
				<ItemG xs={3} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						m3
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={5}>
					<T>
						{t('chartTable.waterusage.line3')}
					</T>
				</ItemG>
				<ItemG xs={3} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						m3
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={5}>
					<T>
						{t('chartTable.waterusage.line4')}
					</T>
				</ItemG>
				<ItemG xs={3} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						m3
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
		</ItemG>
	}
	const renderTemperatureTable = () => {
		return <ItemG container>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.temperature.line1')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.waterusage.line2')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.waterusage.line3')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.waterusage.line4')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
		</ItemG>
	}
	const renderWaterFlowTable = () => {
		return <ItemG container>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.waterflow.line1')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.waterflow.line2')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.waterflow.line3')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
		</ItemG>
	}
	const renderReadingTable = () => {
		return <ItemG container>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.readings.line1')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.readings.line2')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.readings.line3')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG className={classes.lineMargin} xs={12} container>
				<ItemG xs={6}>
					<T>
						{t('chartTable.readings.line4')}
					</T>
				</ItemG>
				<ItemG xs={2} container justify={'center'}>
					<T>
						0,2
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						C*
					</T>
				</ItemG>
				<ItemG container xs={2} justify={'center'}>
					<T>
						11%
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
		</ItemG>

	}
	const renderTable = () => {
		switch (chart) {
			case 'waterusage':
				return renderWaterUsageTable()
			case 'temperature':
				return renderTemperatureTable()
			case 'waterflow':
				return renderWaterFlowTable()
			case 'readings':
				return renderReadingTable()
			default:
				return null
		}
	}
	return renderTable()
}

export default ChartTable
