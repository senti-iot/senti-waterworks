/* eslint-disable indent */
import React, { useState } from 'react'
import { Tabs, Tab, makeStyles } from '@material-ui/core'

import ContactInfo from './ContactInfo'
import Profile from './Profile'

const useStyles = makeStyles(theme => ({
  tabs: {
    // background: theme.palette.primary.main,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    color: '#fff'
  }
}))

export default function Stepper(props) {
  const [step, setStep] = useState(0)

  const handleTabChange = (event, newValue) => {
    setStep(newValue)
  }

  const screens = [
    {
      step: 0,
      component: <ContactInfo setStep={setStep} />,
      label: 'Contact'
    },
    {
      step: 1,
      component: <Profile setStep={setStep} goToWelcome={props.setStep} />,
      label: 'Profile'
    }
  ]

  const classes = useStyles()

  return (
    <>
      {/* showing different screens based on 'step' state */}
      {screens[step] && screens[step].component}
      <Tabs scrollButtons="auto" className={classes.tabs} value={step} onChange={handleTabChange}>
        {screens.map(({ step, label }) => (
          <Tab label={label} key={step} />
        ))}
      </Tabs>
    </>
  )
}
