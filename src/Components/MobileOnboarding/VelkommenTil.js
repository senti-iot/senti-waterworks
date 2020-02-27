/* eslint-disable indent */
import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'
import logo from 'assets/senti.waterworks.svg'
import mobile from './images/mobile2.png'

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
  },
  mobile: {
    maxWidth: 200,
    height: 'auto',
    marginTop: 20
  }
}))

const VelkommenTil = props => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.welcomeText} variant="body1">Velkommen til</Typography>
      <img src={logo} alt="senti-logo" />

      <img src={mobile} alt="senti-mobile-phone" className={classes.mobile} />

      <div style={{ padding: '0 32px' }}>
        <Typography variant="body1" className={classes.description}>
          Du er nu klar til at opleve den nye smarte måde at styre dit vandforbrug
        </Typography>
      </div>
    </Container>
  )
}

export default VelkommenTil