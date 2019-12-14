import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const logoStyles = makeStyles(() => ({
  headerLogoImage: {
    width: 48,
    height: 48,
  },
}))

const HeaderLogo = () => {
  const classes = logoStyles()

  return (
    <img
      src={`${process.env.PUBLIC_URL}/images/header-logo.png`}
      className={classes.headerLogoImage}
      alt="logo"
    />
  )
}

export default HeaderLogo
