/* eslint-disable indent */
import React, { useState } from 'react'
import { makeStyles, Grid, Dialog, AppBar, Toolbar, DialogContent, Typography, IconButton, Slide } from '@material-ui/core'
// import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { CallMade, Close } from '../../../variables/icons'
import familyIcon from './familie.svg'
import waterdrop from './water.drop.blue.svg'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    padding: '8px 0',
    height: '100%'
  },
  callMade: {
    position: 'absolute',
    top: 0,
    right: -8,
    color: '#fff',
    cursor: 'pointer'
  },
  itemG: {
    flex: 1
  },
  dialogTitle: {
    marginLeft: 16
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bolder',
    alignSelf: 'flex-end',
    marginLeft: 16,
    position: 'relative',
    top: 6 // to align it with the bottom edge of the icon
  },
  familyIcon: {
    maxWidth: 38,
    height: 'auto'
  },
  cubicValue: {
    fontSize: 42,
    marginTop: 16
  },
  blueWaterdrop: {
    position: 'absolute',
    bottom: -16,
    right: 16,
    maxWidth: 30,
    height: 'auto'
  }
}))

const Usage = props => {
  const [fsDialogOpen, setFsDialogOpen] = useState(false)
  const classes = useStyles()

  const columns = [
    {
      familyIcon: <img src={familyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#fff' }} />,
      headline: 'Dagligt forbrug',
      cubicMetres: 0.197
    },
    {
      familyIcon: <img src={familyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#32FFE1' }} />,
      headline: 'Benchmark',
      cubicMetres: 0.251
    }
  ]

  const leftColumnStyle = {
    borderRight: '1px solid #fff',
    paddingRight: 16,
    position: 'relative'
  }

  const rightColumnStyle = {
    borderLeft: '1px solid #fff',
    paddingLeft: 16,
    position: 'relative'
  }

  // does not work when clicking the close icon inside dialog and opens only once
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  return (
    <Grid container className={classes.container}>
      {columns.map(({ familyIcon, headline, cubicMetres }, index) => (
        <ItemG key={index} className={classes.itemG} style={index % 2 === 0 ? leftColumnStyle : rightColumnStyle}>
          <div style={{ display: 'flex' }}>
            {familyIcon}
            <Typography variant="body1" className={classes.headline} style={{ color: index % 2 === 0 ? '#fff' : '#32FFE1' }}>{headline}</Typography>
          </div>
          <Typography variant="h2" className={classes.cubicValue} style={{ color: index % 2 === 0 ? '#6DD400' : '#32FFE1' }}>
            {cubicMetres.toLocaleString()}<span style={{ fontSize: 14 }}>m3</span>
          </Typography>
          <Typography variant="body2" style={{ color: index % 2 === 0 ? '#6DD400' : '#32FFE1', marginLeft: 72 }}>
            {(cubicMetres * 1000).toFixed(0)} L
          </Typography>

          <img src={waterdrop} className={classes.blueWaterdrop} alt="senti-waterdrop" />
        </ItemG>
      ))}
      <CallMade className={classes.callMade} onClick={() => setFsDialogOpen(true)} />

      <Dialog fullScreen open={fsDialogOpen}
        onChange={() => setFsDialogOpen(false)}
      // TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton edge="start" onClick={() => setFsDialogOpen(false)}>
              <Close style={{ color: '#fff' }} />
            </IconButton>
            <Typography className={classes.dialogTitle} variant="h6">Hi I'm a dialog title</Typography>
          </Toolbar>
        </AppBar>

        <DialogContent style={{ marginTop: 64 }}>{/* because of fixed AppBar */}
          <p>I'm a dialog content</p>
        </DialogContent>
      </Dialog>
    </Grid >
  )
}

export default Usage