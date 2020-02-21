/* eslint-disable indent */
import React, { useState } from 'react'
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
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const classes = useStyles()

  return (
    <Container fixed className={classes.container}>
      <Paper className={classes.paper}>
        <BoldText className={classes.bold}>Følgende bopæl er fundet frem for det
        indtastede installationsnummer:</BoldText>

        <TextField
          variant="outlined"
          label="Fornavn"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          className={classes.field}
        />
        <TextField
          variant="outlined"
          label="Efternavn"
          fullWidth
          value={surname}
          onChange={e => setSurname(e.target.value)}
          className={classes.field}
        />
        <TextField
          type="email"
          variant="outlined"
          label="E-mail"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={classes.field}
        />
        <TextField
          type="number"
          variant="outlined"
          label="Telefonnr."
          fullWidth
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className={classes.field}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            style={{ minWidth: 80, width: 'calc(67% - 16px)' }}
            variant="outlined"
            label="Adresse"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className={classes.field}
          />
          <TextField
            type="number"
            style={{ minWidth: 80, width: '33%' }}
            variant="outlined"
            label="Postnr."
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            className={classes.field}
          />
        </div>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="country-label">Land</InputLabel>
          <Select
            // labelId="country-label"
            label="Land"
            // fullWidth
            // variant="outlined"
            value={country}
            onChange={e => setCountry(e.target.value)}
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