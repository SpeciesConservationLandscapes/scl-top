import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useAuth0 } from '../../react-auth0-spa'
import Copyright from '../Copyright'
import OrgsPanel from '../OrgsPanel'
import CountrySelector from '../CountrySelector'
import MapLayers from '../../lib/maplayers'
import { AppContext } from '../../contexts'
import { dateFormat } from '../../helpers'

const footerStyles = makeStyles(theme => ({
  footer: {
    bottom: 0,
    width: '100%',
    padding: theme.spacing(1),
    position: 'fixed',
    textAlign: 'center',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
  },
  country: {
    float: 'left',
  },
  downloadButton: {
    marginLeft: theme.spacing(2),
  },
}))

const Footer = () => {
  const classes = footerStyles()
  const countryContext = useContext(AppContext).countryCode
  const dateContext = useContext(AppContext).date
  const mapLayers = new MapLayers()
  const { isAuthenticated } = useAuth0()

  const downloadReport = () => {
    const date = dateFormat(dateContext)

    mapLayers.downloadReport(countryContext, date)
  }

  return (
    <footer className={classes.footer}>
      <Grid container spacing={1}>
        <Grid
          item
          xs={3}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          {isAuthenticated && (
            <>
              <CountrySelector />
              <Button
                onClick={downloadReport}
                variant="contained"
                size="small"
                className={classes.downloadButton}
              >
                Download report
              </Button>
            </>
          )}
        </Grid>
        <Grid
          item
          xs
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Copyright />
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <OrgsPanel />
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
