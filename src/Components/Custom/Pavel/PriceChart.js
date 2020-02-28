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
    margin: '4px 0'
  },
  priceTag: {
    marginLeft: 8,
    color: '#6DD400',
    fontSize: 26,
    // textDecoration: 'underline #fff',
    // paddingBottom: 2,
    borderBottom: '2px solid #fff',
    // textDecorationStyle: 'solid'
  }
}))

const PriceChart = props => {
  const classes = useStyles()

  const handleClick = () => {
    console.log('arrow clicked')
  }

  return (
    <Fragment>
      <div className={classes.flex}>
        <Typography variant="h5" style={{ margin: '8px 0 16px 0', fontWeight: 'bolder' }}>Afregning</Typography>
        <ChevronRight className={classes.chevronRight} onClick={handleClick} />
      </div>
      <Typography variant="body1" className={classes.body1}>Vand: Kr. 78,00</Typography>
      <div className={classes.flex} style={{ maxHeight: 32, overflow: 'visible', alignItems: 'flex-end' }}>
        <Typography variant="body1" className={classes.body1}>Spildevand: Kr. 234,00</Typography>
        <Typography variant="body1" className={classes.body1}>
          Total:
          <span className={classes.priceTag}>
            Kr. 312,00
          </span>
        </Typography>
      </div>
    </Fragment>
  )
}

export default PriceChart