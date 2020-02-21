/* eslint-disable indent */
import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 80px)', // otherwise it covers the dots
    paddingTop: 50,
    textAlign: 'center',
    overflow: 'auto'
  },
  text: {
    fontSize: 24,
    fontWeight: 300,
    color: '#fff',
    margin: '40px 0 40px 0'
  },
  placeholder: {
    width: 200,
    height: 230,
    background: '#eee',
    border: '1px solid red',
    display: 'flex'
  }
}))

const PieCharts = props => {
  const classes = useStyles()
  const tempStyle = {
    alignSelf: 'flex-end',
    position: 'relative',
    top: '-150px'
  }

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.text} variant="body1">
        Hold styr på dit forbrug
      </Typography>

      {/* will be replaced with the actual graphs */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={classes.placeholder}>
          <p style={{ margin: 'auto' }}>placeholder</p>
        </div>
        <div className={classes.placeholder} style={tempStyle}>
          <p style={{ margin: 'auto' }}>placeholder</p>
        </div>
      </div>
    </Container>
  )
}

export default PieCharts