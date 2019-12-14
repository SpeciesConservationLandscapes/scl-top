import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const logoStyles = makeStyles(() => ({
  headerLogoImage: {
    width: 48,
    height: 48,
  },
}))

const HeaderLogo = () => {
  const classes = logoStyles()

  return (
    <Link to="/">
      <img
        src={`${process.env.PUBLIC_URL}/images/header-logo.png`}
        className={classes.headerLogoImage}
        alt="logo"
      />
    </Link>
  )
}

export default HeaderLogo
