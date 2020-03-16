/* eslint-disable indent */
import React from 'react'
import logo from 'assets/senti.waterworks.svg'
import mobile from './images/mobile1.png'
import { Container, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '70px 0',
    height: 'calc(100vh - 140px)'
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    color: '#fff'
  },
  mobile: {
    maxWidth: 120,
    height: 'auto'
  }
}))

const Intro = props => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Container fixed className={classes.container}>
        <img src={mobile} alt="senti-mobile-phone" className={classes.mobile} />
        <img src={logo} alt="senti-logo" />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => props.setStep(prevStep => prevStep + 1)}
        >Kom igang</Button>
      </Container>
    </div>
  )
}

export default Intro