/* eslint-disable indent */
import React, { Fragment } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { ChevronRight } from '../../../variables/icons'

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#fff'
  },
  chevronRight: {
    color: '#fff',
    width: 30,
    height: 30,
    position: 'relative',
    right: -8,
    cursor: 'pointer'
  },
  body1: {
    fontSize: 16,
    color: '#fff',
    margin: '8px 0'
  }
}))

const PriceChart = props => {
  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.flex}>
        <Typography variant="h5" style={{ marginTop: 8, fontWeight: 'bolder' }}>Afregning</Typography>
        <ChevronRight className={classes.chevronRight} />
      </div>
      <Typography variant="body1" className={classes.body1}>Vand: Kr. 78,00</Typography>
      <div className={classes.flex}>
        <Typography variant="body1" className={classes.body1}>Spildevand: Kr. 234,00</Typography>
        <Typography variant="body1">
          Total:
          <span style={{ fontSize: 40 }}>Kr. 312,00</span>
        </Typography>
      </div>
    </Fragment>
  )
}

export default PriceChart