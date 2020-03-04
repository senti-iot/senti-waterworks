/* eslint-disable indent */
import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import usage from './images/benchmark.pictore.svg'

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 80px)', // otherwise it covers the dots
    paddingTop: 50,
    textAlign: 'center',
    overflow: 'auto'
  },
  text: {
    fontSize: 24,
    fontWeight: 300,
    color: '#fff',
    margin: '40px 0 40px 0'
  },
  waterUsage: {
    marginTop: 30,
    maxWidth: '100%',
    height: 'auto'
  }
}))

const UsageStatus = props => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.text} variant="body1">
        Benchmark og målret den grønne omstilling
      </Typography>

      <img src={usage} alt="senti-usage-status" className={classes.waterUsage} />
    </Container>
  )
}

export default UsageStatus