/* eslint-disable indent */
import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'

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
    marginTop: 100,
    height: 250,
    background: '#eee',
    display: 'flex'
  }
}))

const UsageStatus = props => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.text} variant="body1">
        Benchmark og målret den grønne omstilling
      </Typography>

      <div className={classes.waterUsage}>
        <Typography style={{ margin: 'auto' }}>Placeholder</Typography>
      </div>
    </Container>
  )
}

export default UsageStatus