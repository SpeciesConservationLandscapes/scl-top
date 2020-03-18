import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
// import styled from 'styled-components/macro'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../../lib/leaflet-tilelayer-subpixel-fix'
import MapLayerList from '../MapLayerList'
import DateSlider from '../DateSlider'

const mapStyle = makeStyles(() => ({
  mapcontainer: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: '49px',
    bottom: '35px',
    background: 'black',

    // paddingRight: '${props => (props.sidePanelOpen ? '650px' : '0px')}';
    // @media (min-width: 0px) {
    //   padding-right: ${props => (props.sidePanelOpen ? '350px' : '0px')};
    // }
    // @media (min-width: 960px) {
    //   padding-right: ${props => (props.sidePanelOpen ? '500px' : '0px')};
    // }
    // @media (min-width: 1280px) {
    //   padding-right: ${props => (props.sidePanelOpen ? '650px' : '0px')};
    // }
  },
  mapcanvas: {
    width: '100%',
    height: '100%',
  },
  lmContainer: {
    marginTop: '49px',
    marginBottom: '32px',
  },
  lmContainerRoot: {
    height: '600px',
  },
  drawerPaper: {
    height: '500px',
    width: 'auto',
    marginTop: '49px',
    // marginBottom: '32px',
    overflow: 'auto',
    borderBottomLeftRadius: '4px',
  },
  dateSliderContainer: {
    height: '150px',
    background: 'transparent',
    border: 0
  }
}))

const LeafletMap = () => {
  const map = useRef(null)

  const classes = mapStyle()
  const drawerClasses = {
    paper: classes.drawerPaper,
  }
  const dateDrawerClasses = {
    paper: classes.dateSliderContainer
  }

  useEffect(() => {
    const worldImageryMapLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      },
    )

    const mapProperty = {
      center: [31.821628051276857, 103.62284012465541],
      zoom: 3,
      minZoom: 3,
      maxZoom: 16,
      zoomControl: true,
      layers: [worldImageryMapLayer],
    }

    map.current = L.map('map', mapProperty)
  }, [])

  return (
    <div className={classes.mapcontainer}>
      <div className={classes.mapcanvas} id="map" />
      <Drawer
        anchor="right"
        variant="persistent"
        classes={drawerClasses}
        open
      >
        <MapLayerList map={map}/>
      </Drawer>
      <Drawer
        anchor="bottom"
        variant="persistent"
        classes={dateDrawerClasses}
        open
      >
        <DateSlider />
      </Drawer>
    </div>
  )
}

export default LeafletMap
