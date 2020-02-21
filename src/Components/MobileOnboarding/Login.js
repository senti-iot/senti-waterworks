/* eslint-disable indent */
import React, { useState } from 'react'
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
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = () => {
    props.setStep(prevStep => prevStep + 1)
  }

  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Paper className={classes.paper}>
        <img src={logo} alt="senti-logo" style={{ marginTop: 50 }} />
        <p style={{ marginTop: 0 }}>Indtast installationsnummer og engangskode du har faet tilsendt af dit vandmaerk.</p>

        <div className={classes.form}>
          <TextField
            fullWidth
            className={classes.textField}
            variant="outlined"
            label="Installationsnummer"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            className={classes.textField}
            variant="outlined"
            label="Adgangskode"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
          <Button color="secondary" className={classes.button} variant="contained" onClick={handleSubmit}>Log ind</Button>
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
        </div>
      </Paper>
    </Container>
  )
}

export default Login