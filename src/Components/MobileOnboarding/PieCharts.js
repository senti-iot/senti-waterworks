/* eslint-disable indent */
import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import graphs from './images/graf.png'

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
  placeholder: {
    width: 200,
    height: 230,
    background: '#eee',
    border: '1px solid red',
    display: 'flex'
  },
  graphs: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: 20
  }
}))

const PieCharts = props => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.text} variant="body1">
        Hold styr på dit forbrug
      </Typography>

      <img src={graphs} alt="senti-usage-graphs" className={classes.graphs} />
    </Container>
  )
}

export default PieCharts