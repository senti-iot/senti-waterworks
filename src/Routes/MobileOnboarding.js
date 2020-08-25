/* eslint-disable indent */
import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { AppBackground } from 'Styles/containerStyle';
import { makeStyles } from '@material-ui/core'
import Intro from 'Components/MobileOnboarding/Intro'
import Login from 'Components/MobileOnboarding/Login'
import Stepper from 'Components/MobileOnboarding/Stepper'
import WelcomeScreen from 'Components/MobileOnboarding/WelcomeScreen'

const useStyles = makeStyles(theme => ({
  background: {
    background: `linear-gradient(to bottom,#64b5f6,rgb(19,90,145))`,
    height: '100vh'
  }
}))

const MobileOnboarding = props => {
  const [step, setStep] = useState(0)
  const classes = useStyles()

  const screens = [
    {
      step: 0,
      component: <Intro setStep={setStep} />
    },
    {
      step: 1,
      component: <Login setStep={setStep} />
    },
    {
      step: 2,
      component: <Stepper setStep={setStep} />
    },
    {
      step: 3,
      component: <WelcomeScreen />
    }
  ]

  return (
    <div className={classes.background}>
      {screens[step] && screens[step].component}
    </div>
  )
}

export default MobileOnboarding