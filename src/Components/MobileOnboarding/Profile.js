/* eslint-disable indent */
import React, { useState } from 'react'
import { Container, Paper, makeStyles, Typography, TextField, Select, MenuItem, Checkbox, FormControl, InputLabel, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    background: '#fff',
    padding: '0 20px',
    overflow: 'auto'
  },
  container: {
    height: '100%',
    paddingTop: 50,
    paddingBottom: 50,
  },
  headline: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30
  },
  field: {
    marginBottom: 16,
    minWidth: '45vw'
  },
  checkbox: {
    // padding: 0
  },
  checkboxText: {
    fontSize: 12,
    position: 'relative',
    top: -5
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 50
  }
}))

const Profile = props => {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [adults, setAdults] = useState('')
  const [children, setChildren] = useState('')

  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.headline}>Færdiggør din brugerprofil</Typography>

        <Typography variant="body1" style={{ marginBottom: 16 }}>Vælg e-mail og adgangskode til login</Typography>
        <TextField
          size="small"
          variant="outlined"
          label="E-mail"
          fullWidth
          // value={name}
          // onChange={e => setName(e.target.value)}
          className={classes.field}
        />
        <TextField
          type="password"
          size="small"
          variant="outlined"
          label="Andgangskode"
          fullWidth
          className={classes.field}
        />
        <TextField
          type="password"
          size="small"
          variant="outlined"
          label="Gentag andgangskode"
          fullWidth
          className={classes.field}
        />

        {/* THE TWO SELECTS FOR ADULTS AND CHILDREN =========================================== */}
        <Typography variant="body1" style={{ margin: '16px 0 8px 0' }}>Tilføj venligst husstandens antal beobere:</Typography>
        <FormControl variant="outlined" className={classes.field}>
          <InputLabel id="adults-label">Antal voksne</InputLabel>
          <Select
            size="small"
            label="Antal voksne"
            value={adults}
            onChange={e => setAdults(e.target.value)}
          >
            <MenuItem value="one">One</MenuItem>
            <MenuItem value="two">Two</MenuItem>
            <MenuItem value="three">Three</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.field}>
          <InputLabel id="adults-label">Antal børn</InputLabel>
          <Select
            size="small"
            label="Antal børn"
            value={children}
            onChange={e => setChildren(e.target.value)}
          >
            <MenuItem value="one">One</MenuItem>
            <MenuItem value="two">Two</MenuItem>
            <MenuItem value="three">Three</MenuItem>
          </Select>
        </FormControl>
        {/* END OF THE TWO SELECTS FOR ADULTS AND CHILDREN ==================================== */}

        <Typography variant="body1" style={{ marginTop: 16 }}>Persondata tilladelse</Typography>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Checkbox
            size="small"
            className={classes.checkbox}
            checked={termsAccepted}
            onChange={e => setTermsAccepted(e.target.checked)}
          />
          <p className={classes.checkboxText}>Ja, jeg accepterer vilkar og betingelser for <a href="#b">persondatapolitik</a></p>
        </div>

        <div className={classes.buttonWrapper}>
          <Button
            onClick={() => props.goToWelcome(prevStep => prevStep + 1)}
            variant="contained" color="secondary" style={{ color: '#fff' }}>Bekæft</Button>
        </div>
      </Paper>
    </Container>
  )
}

export default Profile