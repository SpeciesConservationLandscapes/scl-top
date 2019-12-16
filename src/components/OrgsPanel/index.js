import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const orgsPanelStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(1),
    margin: theme.spacing(0, 1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img: {
    position: 'relative',
    top: '4px'
  }
}))

const OrgsPanel = () => {
  const classes = orgsPanelStyles()

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid
            item
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Paper className={classes.paper}>
              <a href="https://www.wcs.org/our-work/species/tigers">
                <img
                  className={classes.img}
                  alt="WCS"
                  src={`${process.env.PUBLIC_URL}/images/wcs_logo.svg`}
                />
              </a>
            </Paper>
            <Paper className={classes.paper}>
              <a href="https://www.wcs.org/our-work/species/tigers">
                <img
                  className={classes.img}
                  alt="WWF"
                  src={`${process.env.PUBLIC_URL}/images/placeholder.png`}
                />
              </a>
            </Paper>
            <Paper className={classes.paper}>
              <a href="https://www.wcs.org/our-work/species/tigers">
                <img
                  className={classes.img}
                  alt="Panthera"
                  src={`${process.env.PUBLIC_URL}/images/placeholder.png`}
                />
              </a>
            </Paper>
            <Paper className={classes.paper}>
              <a href="https://www.wcs.org/our-work/species/tigers">
                <img
                  className={classes.img}
                  alt="NASA"
                  src={`${process.env.PUBLIC_URL}/images/placeholder.png`}
                />
              </a>
            </Paper>
            <Paper className={classes.paper}>
              <a href="https://www.wcs.org/our-work/species/tigers">
                <img
                  className={classes.img}
                  alt="UMD"
                  src={`${process.env.PUBLIC_URL}/images/placeholder.png`}
                />
              </a>
            </Paper>
            <Paper className={classes.paper}>
              <a href="https://www.wcs.org/our-work/species/tigers">
                <img
                  className={classes.img}
                  alt="Indonession Gov"
                  src={`${process.env.PUBLIC_URL}/images/placeholder.png`}
                />
              </a>
            </Paper>
            <Paper className={classes.paper}>
              <a href="https://www.wcs.org/our-work/species/tigers">
                <img
                  className={classes.img}
                  alt="Thai Gov"
                  src={`${process.env.PUBLIC_URL}/images/placeholder.png`}
                />
              </a>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default OrgsPanel
