/* eslint-disable indent */
import React from 'react'
import logo from 'assets/senti.waterworks.svg'
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
  }
}))

const Intro = props => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Container fixed className={classes.container}>
        <p>image</p>
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