/* eslint-disable indent */
import React from 'react'
import { makeStyles, Container, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 80px)', // otherwise it covers the dots
    padding: '50px 0 0 0',
    textAlign: 'center',
    overflow: 'auto'
  },
  text: {
    fontSize: 24,
    fontWeight: 300,
    color: '#fff',
    margin: '40px 0 40px 0'
  },
  lineGraph: {
    marginTop: 100,
    width: '100%',
    height: 250,
    background: '#eee',
    display: 'flex'
  }
}))

const LineGraph = props => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.text} variant="body1">
        Hold dig opdateret<br />gennem alarmer
      </Typography>

      <div className={classes.lineGraph}>
        <Typography style={{ margin: 'auto' }}>Placeholder</Typography>
      </div>
    </Container>
  )
}

export default LineGraph