import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MapLayerItem from '../MapLayerItem'
import MapLayerType from '../MapLayerType'
import MapLayers from '../../lib/maplayers'
import { AppContext } from '../../contexts'

const useStyles = makeStyles(() => ({
  layerTypeStyle: {
    borderTop: '1px solid'
  },
}))
const MapLayerList = ({ map }) => {
  const classes = useStyles()
  const countryContext = useContext(AppContext).countryCode
  const [oldCountryContext, setOldCountryContext] = useState()

  const date = '2006-01-01'
  const species = { id: 1, name: 'Panthera tigris' }

  const mapLayers = new MapLayers()
  const [tclChecked, setTclChecked] = useState(false)
  const [tclLayer, setTclLayer] = useState(null)
  const [restorationChecked, setRestorationChecked] = useState(false)
  const [restorationLayer, setRestorationLayer] = useState(null)
  const [surveyChecked, setSurveyChecked] = useState(false)
  const [surveyLayer, setSurveyLayer] = useState(null)
  const [fragmentChecked, setFragmentChecked] = useState(false)
  const [fragmentLayer, setFragmentLayer] = useState(null)
  const [protectedAreaLayer, setProtectedAreaLayer] = useState(null)
  const [biomeLayer, setBiomeLayer] = useState(null)
  const [hiiLayer, setHiiLayer] = useState(null)
  const [speciesChecked, setSpeciesChecked] = useState(false)
  const [speciesLayer, setSpeciesLayer] = useState(null)

  const handleTclChange = e => setTclChecked(e.target.checked)
  const handleRestorationChange = e => setRestorationChecked(e.target.checked)
  const handleSurveyChange = e => setSurveyChecked(e.target.checked)
  const handleFragmentChange = e => setFragmentChecked(e.target.checked)
  const handleSpeciesChange = e => setSpeciesChecked(e.target.checked)

  const fetchLayers = countryCode => {
    setTclLayer(mapLayers.getTclLayer(countryCode, date, species))
    setRestorationLayer(mapLayers.getRestorationLayer(countryCode, date, species))
    setSurveyLayer(mapLayers.getSurveyLayer(countryCode, date, species))
    setFragmentLayer(mapLayers.getFragmentLayer(countryCode, date, species))
    setProtectedAreaLayer(mapLayers.getProtectedAreaLayer())
    setBiomeLayer(mapLayers.getBiomeLayer())
    setHiiLayer(mapLayers.geHiiLayer())
    setSpeciesLayer(mapLayers.getTigerHistoricalRangeLayer(species))
  }

  if (tclLayer !== null) {
    if (tclChecked) {
      map.current.addLayer(tclLayer)
    } else {
      map.current.removeLayer(tclLayer)
    }
  }

  if (restorationLayer !== null) {
    if (restorationChecked) {
      map.current.addLayer(restorationLayer)
    } else {
      map.current.removeLayer(restorationLayer)
    }
  }

  if (surveyLayer !== null) {
    if (surveyChecked) {
      map.current.addLayer(surveyLayer)
    } else {
      map.current.removeLayer(surveyLayer)
    }
  }

  if (fragmentLayer !== null) {
    if (fragmentChecked) {
      map.current.addLayer(fragmentLayer)
    } else {
      map.current.removeLayer(fragmentLayer)
    }
  }

  if (speciesLayer !== null) {
    if (speciesChecked) {
      map.current.addLayer(speciesLayer)
    } else {
      map.current.removeLayer(speciesLayer)
    }
  }

  if (oldCountryContext !== '' && countryContext !== '' && oldCountryContext !== countryContext) {
    if (tclLayer !== null && map.current.hasLayer(tclLayer)) {
      map.current.removeLayer(tclLayer)
    }

    if (restorationLayer !== null && map.current.hasLayer(restorationLayer)) {
      map.current.removeLayer(restorationLayer)
    }

    if (surveyLayer !== null && map.current.hasLayer(surveyLayer)) {
      map.current.removeLayer(surveyLayer)
    }

    if (fragmentLayer !== null && map.current.hasLayer(fragmentLayer)) {
      map.current.removeLayer(fragmentLayer)
    }
  }

  useEffect(() => {
    if (countryContext !== '') {
      fetchLayers(countryContext)
    }
    setOldCountryContext(countryContext)
  }, [countryContext])

  return (
    <List>
      <ListItem>
        <MapLayerItem layerChecked={tclChecked} handleLayerChange={handleTclChange} label="Tiger Conservation Landscape" />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={restorationChecked} handleLayerChange={handleRestorationChange} label="Tiger Restoration Landscape" />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={surveyChecked} handleLayerChange={handleSurveyChange} label="Tiger Survey Landscape" />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={fragmentChecked} handleLayerChange={handleFragmentChange} label="Tiger Fragment Landscape" />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={speciesChecked} handleLayerChange={handleSpeciesChange} label="Tiger Historical Landscape" />
      </ListItem>
      <ListItem className={classes.layerTypeStyle}>
        <MapLayerType map={map} layers={{ "Protected Area": protectedAreaLayer, "Biome": biomeLayer, "Human Influence Index": hiiLayer }} />
      </ListItem>
    </List>
  )
}

MapLayerList.propTypes = {
  map: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
}

export default MapLayerList
