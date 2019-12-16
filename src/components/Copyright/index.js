import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const Copyright = () => {

  return (
    <Typography variant="body2" color="textSecondary" component="span" display="inline">
      Copyright ©
      <Link color="inherit" href="https://www.wcs.org/" target="_blank">
        Wildlife Conservation Society
      </Link>{' '}
      {new Date().getFullYear()}
      .
    </Typography>
  )
}

export default Copyright
