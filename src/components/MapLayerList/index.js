import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MapLayerItem from '../MapLayerItem'
import MapLayers from '../../lib/maplayers'
import { AppContext } from '../../contexts'

const MapLayerList = ({ map }) => {
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
  const [protectedAreaChecked, setProtectedAreaChecked] = useState(false)
  const [protectedAreaLayer, setProtectedAreaLayer] = useState(null)
  const [biomeChecked, setBiomeChecked] = useState(false)
  const [biomeLayer, setBiomeLayer] = useState(null)
  const [hiiChecked, setHiiChecked] = useState(false)
  const [hiiLayer, setHiiLayer] = useState(null)
  const [speciesChecked, setSpeciesChecked] = useState(false)
  const [speciesLayer, setSpeciesLayer] = useState(null)

  const handleTclChange = e => setTclChecked(e.target.checked)
  const handleRestorationChange = e => setRestorationChecked(e.target.checked)
  const handleSurveyChange = e => setSurveyChecked(e.target.checked)
  const handleFragmentChange = e => setFragmentChecked(e.target.checked)
  const handleProtectedAreaChange = e => setProtectedAreaChecked(e.target.checked)
  const handleBiomeChange = e => setBiomeChecked(e.target.checked)
  const handleHiiChange = e => setHiiChecked(e.target.checked)
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

  if (protectedAreaLayer !== null) {
    if (protectedAreaChecked) {
      map.current.addLayer(protectedAreaLayer)
    } else {
      map.current.removeLayer(protectedAreaLayer)
    }
  }

  if (biomeLayer !== null) {
    if (biomeChecked) {
      map.current.addLayer(biomeLayer)
    } else {
      map.current.removeLayer(biomeLayer)
    }
  }

  if (hiiLayer !== null) {
    if (hiiChecked) {
      map.current.addLayer(hiiLayer)
    } else {
      map.current.removeLayer(hiiLayer)
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
    if (map.current.hasLayer(tclLayer)) {
      map.current.removeLayer(tclLayer)
    }

    if (map.current.hasLayer(restorationLayer)) {
      map.current.removeLayer(restorationLayer)
    }

    if (map.current.hasLayer(surveyLayer)) {
      map.current.removeLayer(surveyLayer)
    }

    if (map.current.hasLayer(fragmentLayer)) {
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
      <ListItem>
        <MapLayerItem layerChecked={protectedAreaChecked} handleLayerChange={handleProtectedAreaChange} label="Protected Area" />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={biomeChecked} handleLayerChange={handleBiomeChange} label="Biome" />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={hiiChecked} handleLayerChange={handleHiiChange} label="Human Influence Index" />
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
