/* eslint-disable indent */
import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleProfileInfo } from '../../Redux/mobileOnboarding'
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
    minWidth: '65vw'
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
  const dispatch = useDispatch()
  const profile = useSelector(state => state.mobileOnboarding.profile)

  // to fix the label line-through -------------------------------- //
  const inputLabelAdults = useRef(null)                             //
  const inputLabelChildren = useRef(null)                           //
  const [labelWidthAdults, setLabelWidthAdults] = useState(0)       //
  const [labelWidthChildren, setLabelWidthChildren] = useState(0)   //
  useEffect(() => {                                                 //
    setLabelWidthAdults(inputLabelAdults.current.offsetWidth)       //
    setLabelWidthChildren(inputLabelChildren.current.offsetWidth)   //
  }, []);//-------------------------------------------------------- //

  const handleSubmit = e => {
    e.preventDefault()
    props.goToWelcome(prevStep => prevStep + 1)
  }

  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.headline}>Færdiggør din brugerprofil</Typography>

        <form onSubmit={handleSubmit}>
          {/* TEXT FIELDS */}
          <Typography variant="body1" style={{ marginBottom: 16 }}>Vælg e-mail og adgangskode til login</Typography>
          <TextField
            type="email"
            name="email"
            size="small"
            variant="outlined"
            label="E-mail"
            fullWidth
            value={profile.email}
            onChange={e => dispatch(handleProfileInfo(e.target.name, e.target.value))}
            className={classes.field}
          />
          <TextField
            name="password"
            type="password"
            size="small"
            variant="outlined"
            label="Andgangskode"
            fullWidth
            value={profile.password}
            onChange={e => dispatch(handleProfileInfo(e.target.name, e.target.value))}
            className={classes.field}
          />
          <TextField
            name="passwordRepeat"
            type="password"
            size="small"
            variant="outlined"
            label="Gentag andgangskode"
            fullWidth
            value={profile.passwordRepeat}
            onChange={e => dispatch(handleProfileInfo(e.target.name, e.target.value))}
            className={classes.field}
          />

          {/* THE TWO SELECTS FOR ADULTS AND CHILDREN =========================================== */}
          <Typography variant="body1" style={{ margin: '16px 0 8px 0' }}>Tilføj venligst husstandens antal beobere:</Typography>
          <FormControl variant="outlined" className={classes.field}>
            <InputLabel ref={inputLabelAdults} id="adults-label">Antal voksne</InputLabel>
            <Select
              labelWidth={labelWidthAdults}
              name="adults"
              size="small"
              label="Antal voksne"
              value={profile.adults}
              onChange={e => dispatch(handleProfileInfo(e.target.name, e.target.value))}
            >
              <MenuItem value="one">One</MenuItem>
              <MenuItem value="two">Two</MenuItem>
              <MenuItem value="three">Three</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.field}>
            <InputLabel ref={inputLabelChildren} id="adults-label">Antal børn under 18</InputLabel>
            <Select
              labelWidth={labelWidthChildren}
              name="children"
              size="small"
              label="Antal børn under 18"
              value={profile.children}
              onChange={e => dispatch(handleProfileInfo(e.target.name, e.target.value))}
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
              name="acceptedTerms"
              size="small"
              className={classes.checkbox}
              checked={profile.acceptedTerms}
              onChange={e => dispatch(handleProfileInfo(e.target.name, e.target.checked))}
            />
            <p className={classes.checkboxText}>Ja, jeg accepterer vilkar og betingelser for <a href="#b">persondatapolitik</a></p>
          </div>

          {/* SUBMIT BUTTON */}
          <div className={classes.buttonWrapper}>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained" color="secondary" style={{ color: '#fff' }}>Bekæft</Button>
          </div>
        </form>
      </Paper>
    </Container>
  )
}

export default Profile