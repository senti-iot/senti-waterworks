/* eslint-disable indent */
import React from 'react'
import { makeStyles, Container, Typography } from '@material-ui/core'
import lineGraph from './images/graf2.svg'

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
    width: '100%',
    height: 'auto',
    marginTop: 70
  }
}))

const LineGraph = props => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.text} variant="body1">
        Hold dig opdateret<br />gennem alarmer
      </Typography>

      <img src={lineGraph} alt="senti-line-graph" className={classes.lineGraph} />
    </Container>
  )
}

export default LineGraph