/* eslint-disable indent */
import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'
import logo from 'assets/senti.waterworks.svg'

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 80px)', // otherwise it covers the dots
    paddingTop: 50,
    textAlign: 'center',
    overflow: 'auto'
  },
  welcomeText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 300
  },
  placeholder: {
    width: 150,
    height: 250,
    margin: '0 auto',
    display: 'flex',
    background: '#eee'
  },
  description: {
    fontSize: 18,
    fontWeight: 300,
    marginTop: 20,
    color: '#fff'
  }
}))

const VelkommenTil = props => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.welcomeText} variant="body1">Velkommen til</Typography>
      <img src={logo} alt="senti-logo" />

      <div className={classes.placeholder}>
        <p style={{ margin: 'auto' }}>Placeholder</p>
      </div>

      <Typography variant="body1" className={classes.description}>
        Du er nu klar til at opleve den nye smarte måde at styre dit vandforbrug
      </Typography>
    </Container>
  )
}

export default VelkommenTil