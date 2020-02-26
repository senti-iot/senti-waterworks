/* eslint-disable indent */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleLoginInfo } from '../../Redux/mobileOnboarding'
import logo from 'assets/senti.waterworks.black.svg'
import { Paper, makeStyles, Container, TextField, Button, InputAdornment, IconButton } from '@material-ui/core'
// import { LoginTF } from 'Styles/loginStyles'
import Caption from 'Components/Typography/Caption'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    background: '#fff',
    padding: '0 20px',
    textAlign: 'center',
    overflow: 'auto'
  },
  container: {
    height: '100%',
    paddingTop: 50,
    paddingBottom: 50,
  },
  form: {
    marginTop: 48
  },
  textField: {
    marginBottom: 24,
    display: 'block'
  },
  button: {
    display: 'block',
    margin: '0 auto 30px auto',
    color: '#fff'
  }
}))

const Login = props => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.mobileOnboarding.login)

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    props.setStep(prevStep => prevStep + 1)
  }

  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Paper className={classes.paper}>
        <img src={logo} alt="senti-logo" style={{ marginTop: 50 }} />
        <p style={{ marginTop: 0 }}>Indtast installationsnummer og engangskode du har faet tilsendt af dit vandmaerk.</p>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="number"
            fullWidth
            className={classes.textField}
            variant="outlined"
            label="Installationsnummer"
            value={login.number}
            onChange={e => dispatch(handleLoginInfo(e.target.name, e.target.value))}
          />
          <TextField
            name="password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            className={classes.textField}
            variant="outlined"
            label="Adgangskode"
            value={login.password}
            onChange={e => dispatch(handleLoginInfo(e.target.name, e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" edge="end" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            color="secondary"
            className={classes.button}
            variant="contained"
            onClick={handleSubmit}
            type="submit"
          >Log ind</Button>
          <Caption>
            &copy; 2016-2019 All rights reserved. Senti is an open source IoT Service Platform designed
            and developed with <span style={{ color: 'red' }}>❤</span> in Aalborg, Denmark
          </Caption>

          <div style={{ textAlign: 'center' }}>
            <a href="#anchor" style={{ marginRight: 10 }}>
              <Caption>Cookie politik</Caption>
            </a>
            <a href="#anchor" style={{ marginLeft: 10 }}>
              <Caption>Persondatapolitik</Caption>
            </a>
          </div>
        </form>
      </Paper>
    </Container>
  )
}

export default Login