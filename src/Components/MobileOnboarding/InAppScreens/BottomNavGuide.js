/* eslint-disable indent */
import React, { useState } from 'react'
import { makeStyles, Container, Typography } from '@material-ui/core'
import { AccountCircle, Notifications, Timeline, Search } from '../../../variables/icons'
import BottomNavigation from './BottomNavigation'

const useStyles = makeStyles(theme => ({
  background: {
    background: `linear-gradient(to bottom,#64b5f6,rgb(19,90,145))`,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  container: {
    height: 60,
    background: 'rgb(19,90,145)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textBox: {
    height: 170,
    padding: '6px 0',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    background: '#64b5f6',
    color: '#fff',
    overflow: 'auto'
  },
  textboxHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  cross: {
    borderRadius: '50%',
    background: 'rgb(19,90,145)',
    width: 32,
    height: 32,
    display: 'flex'
  }
}))

const BottomNavGuide = props => {
  const classes = useStyles()
  const [textBoxOpen, setTextBoxOpen] = useState(true)
  const [currentIcon, setCurrentIcon] = useState(0)

  const data = [
    {
      icon: Timeline,
      heading: 'Dashboard',
      text: `Under dashboard kan nemt skifte i mellem de forskellige katagori
      af måle typer. Herefter vil indholdet i dashboardet skifte efter den valgte type.`
    },
    {
      icon: Search,
      heading: 'Benchmark',
      text: `Under benchmark kan du finde dit forbrug benchmarket med en familie på sammestørrelse.
      Herudover kan du finde tips og tricks til at sparre vand i din hverdag.`
    },
    {
      icon: Notifications,
      heading: 'Notifikationer',
      text: `Under notifikationer kan du tilgå og se alle de alarmer der der gået samt oprette
      nye alarmer efter dine behov.`
    },
    {
      icon: AccountCircle,
      heading: 'Bruger',
      text: `Under bruger kan du tilgå din profil og finde dine måler. Herudover kan du tilgå
      indstillinger og eksportere dine data. Under dette punkt kan du også finde hjælp og
      informationer om Senti.waterworks.`
    }
  ]

  // different styles for the bottom nav icons
  const defaultStyle = {
    fontSize: 32,
    color: '#fff'
  }
  const pickedStyle = {
    fontSize: 32,
    color: '#ff9800' // orange when active
  }

  const textBox = (
    <div className={classes.textBox}>
      <Container fixed>
        <div className={classes.textboxHeader}>
          <div className={classes.cross}>
            <span onClick={() => setTextBoxOpen(false)} style={{ fontSize: 24, margin: 'auto' }}>X</span>
          </div>
          <Typography onClick={() => setCurrentIcon(prevIcon => prevIcon + 1)} variant="body1">Næste</Typography>
        </div>

        <div style={{ textAlign: 'center', overflow: 'scroll', padding: '0 16px' }}>
          <Typography variant="h6">{data[currentIcon].heading}</Typography>
          <Typography variant="body1">{data[currentIcon].text}</Typography>
        </div>
      </Container>
    </div>
  )

  return (
    <div className={classes.background}>
      <BottomNavigation /> {/* temporary */}
      {textBoxOpen && textBox}
      <Container fixed className={classes.container}>
        {data.map(({ icon: Icon }, index) => index === currentIcon && !!textBoxOpen ? (
          <div onClick={() => {
            if (!textBoxOpen) setTextBoxOpen(true)
            setCurrentIcon(index)
          }}
            key={index} className={classes.icon} style={{ backgroundColor: 'white', color: 'black' }}>
            <Icon style={pickedStyle} />
          </div>
        ) : (
            <div onClick={() => {
              if (!textBoxOpen) setTextBoxOpen(true)
              setCurrentIcon(index)
            }}
              key={index} className={classes.icon}>
              <Icon style={defaultStyle} />
            </div>
          ))}
      </Container>
    </div>
  )
}

export default BottomNavGuide