/* eslint-disable indent */
import React, { useState } from 'react'
import { makeStyles, Container } from '@material-ui/core'
import { headerColor } from '../../../Styles/mainStyles'
import { AccountCircle, Notifications, Timeline, Search } from '../../../variables/icons'

const useStyles = makeStyles(theme => ({
  container: {
    height: 60,
    background: headerColor,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  }
}))

// BOTTOM NAVIGATION PANEL WITH DARK BACKGROUND

const BottomNavigation = props => {
  const [currentIcon, setCurrentIcon] = useState(0)

  const classes = useStyles()

  const icons = [
    {
      icon: Timeline
    },
    {
      icon: Search
    },
    {
      icon: Notifications
    },
    {
      icon: AccountCircle
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

  return (
    <Container fixed className={classes.container}>
      {icons.map(({ icon: Icon }, index) =>
        currentIcon === index ? (
          <div className={classes.icon} style={{ backgroundColor: 'white', color: 'black' }}>
            <Icon
              onClick={() => setCurrentIcon(index)}
              style={index === currentIcon ? pickedStyle : defaultStyle}
            />
          </div>
        ) : (
            <div className={classes.icon}>
              <Icon
                onClick={() => setCurrentIcon(index)}
                style={index === currentIcon ? pickedStyle : defaultStyle}
              />
            </div>
          )
      )}
    </Container>
  )
}

export default BottomNavigation