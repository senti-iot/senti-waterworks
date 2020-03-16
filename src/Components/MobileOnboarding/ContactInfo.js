/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleContactInfo } from '../../Redux/mobileOnboarding'
import { Container, Paper, makeStyles, TextField, Select, MenuItem, InputLabel, FormControl, Typography, Button } from '@material-ui/core'
import BoldText from 'Components/Typography/T'

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
  bold: {
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 500,
    marginBottom: 32
  },
  field: {
    marginBottom: 16
  },
  confirmText: {
    marginTop: 48,
    marginBottom: 24,
    fontWeight: 500
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 50
  },
  button: {
    minWidth: 110
  }
}))

const ContactInfo = props => {
  const dispatch = useDispatch()
  const contact = useSelector(state => state.mobileOnboarding.contact)

  // to fix the label line-through ---------------------- //
  const inputLabel = useRef(null);                        //
  const [labelWidth, setLabelWidth] = useState(0)         //
  useEffect(() => {                                       //
    setLabelWidth(inputLabel.current.offsetWidth);        //
  }, []);//---------------------------------------------- //

  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Paper className={classes.paper}>
        <BoldText className={classes.bold}>Følgende bopæl er fundet frem for det
        indtastede installationsnummer:</BoldText>

        <TextField
          name="name"
          variant="outlined"
          label="Fornavn"
          fullWidth
          value={contact.name}
          onChange={e => dispatch(handleContactInfo(e.target.name, e.target.value))}
          className={classes.field}
        />
        <TextField
          name="surname"
          variant="outlined"
          label="Efternavn"
          fullWidth
          value={contact.surname}
          onChange={e => dispatch(handleContactInfo(e.target.name, e.target.value))}
          className={classes.field}
        />
        <TextField
          name="email"
          type="email"
          variant="outlined"
          label="E-mail"
          fullWidth
          value={contact.email}
          onChange={e => dispatch(handleContactInfo(e.target.name, e.target.value))}
          className={classes.field}
        />
        <TextField
          name="phone"
          type="number"
          variant="outlined"
          label="Telefonnr."
          fullWidth
          value={contact.phone}
          onChange={e => dispatch(handleContactInfo(e.target.name, e.target.value))}
          className={classes.field}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            name="address"
            style={{ minWidth: 80, width: 'calc(67% - 16px)' }}
            variant="outlined"
            label="Adresse"
            value={contact.address}
            onChange={e => dispatch(handleContactInfo(e.target.name, e.target.value))}
            className={classes.field}
          />
          <TextField
            name="postCode"
            type="number"
            style={{ minWidth: 80, width: '33%' }}
            variant="outlined"
            label="Postnr."
            value={contact.postCode}
            onChange={e => dispatch(handleContactInfo(e.target.name, e.target.value))}
            className={classes.field}
          />
        </div>
        <FormControl fullWidth variant="outlined">
          <InputLabel ref={inputLabel} id="country-label">Land</InputLabel>
          <Select
            labelWidth={labelWidth}
            name="country"
            label="Land"
            value={contact.country}
            onChange={e => dispatch(handleContactInfo(e.target.name, e.target.value))}
          >
            <MenuItem value="denmark">Denmark</MenuItem>
            <MenuItem value="sweden">Sweden</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body1" className={classes.confirmText}>
          Er disse informationer korrekte:
        </Typography>
        <div className={classes.flex}>
          <Button color="secondary" className={classes.button} variant="contained" style={{ color: '#fff' }}
            onClick={() => props.setStep(prevStep => prevStep + 1)}
          >Ja</Button>
          <Button color="secondary" className={classes.button} variant="outlined">Nej</Button>
        </div>
      </Paper>
    </Container>
  )
}

export default ContactInfo