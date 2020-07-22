import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MapLayerItem from '../MapLayerItem'
import MapLayerType from '../MapLayerType'
import MapLayers from '../../lib/maplayers'
import { AppContext } from '../../contexts'
import { dateFormat } from '../../helpers'

import usePrevious from '../../lib/usePrevious'

const useStyles = makeStyles(() => ({
  layerTypeStyle: {
    borderTop: '1px solid',
  },
}))

const MapLayerList = ({ map }) => {
  const classes = useStyles()
  const countryContext = useContext(AppContext).countryCode
  const dateContext = useContext(AppContext).date

  const species = { id: 1, name: 'Panthera tigris' }

  const mapLayers = new MapLayers()
  const [tclChecked, setTclChecked] = useState(true)
  const [tclLayer, setTclLayer] = useState(null)
  const prevTclLayer = usePrevious(tclLayer)
  const [restorationChecked, setRestorationChecked] = useState(true)
  const [restorationLayer, setRestorationLayer] = useState(null)
  const prevRestorationLayer = usePrevious(restorationLayer)
  const [surveyChecked, setSurveyChecked] = useState(true)
  const [surveyLayer, setSurveyLayer] = useState(null)
  const prevSurveyLayer = usePrevious(surveyLayer)
  const [fragmentChecked, setFragmentChecked] = useState(true)
  const [fragmentLayer, setFragmentLayer] = useState(null)
  const prevFragmentLayer = usePrevious(fragmentLayer)
  const [speciesChecked, setSpeciesChecked] = useState(true)
  const [speciesLayer, setSpeciesLayer] = useState(null)
  const [protectedAreaLayer, setProtectedAreaLayer] = useState(null)
  const [biomeLayer, setBiomeLayer] = useState(null)
  const [hiiLayer, setHiiLayer] = useState(null)

  const handleTclChange = e => setTclChecked(e.target.checked)
  const handleRestorationChange = e => setRestorationChecked(e.target.checked)
  const handleSurveyChange = e => setSurveyChecked(e.target.checked)
  const handleFragmentChange = e => setFragmentChecked(e.target.checked)
  const handleSpeciesChange = e => setSpeciesChecked(e.target.checked)

  const handleTclLayer = layer => setTclLayer(layer)
  const handleRestorationLayer = layer => setRestorationLayer(layer)
  const handleSurveyLayer = layer => setSurveyLayer(layer)
  const handleFragmentLayer = layer => setFragmentLayer(layer)

  const fetchLayers = (countryCode, date) => {
    mapLayers.getTclLayer(
      countryCode,
      date,
      species,
      handleTclLayer,
      map.current,
    )
    mapLayers.getRestorationLayer(
      countryCode,
      date,
      species,
      handleRestorationLayer,
    )
    mapLayers.getSurveyLayer(countryCode, date, species, handleSurveyLayer)
    mapLayers.getFragmentLayer(countryCode, date, species, handleFragmentLayer)
  }

  const fetchBaseLayers = () => {
    setSpeciesLayer(mapLayers.getTigerHistoricalRangeLayer(species))
    setProtectedAreaLayer(mapLayers.getProtectedAreaLayer())
    setBiomeLayer(mapLayers.getBiomeLayer())
    setHiiLayer(mapLayers.geHiiLayer())
  }

  if (tclLayer !== null) {
    if (tclChecked) {
      const currentLayer = tclLayer && tclLayer._leaflet_id
      const prevLayer = prevTclLayer && prevTclLayer._leaflet_id

      if (currentLayer !== prevLayer) {
        if (prevLayer) map.current.removeLayer(prevTclLayer)
        if (currentLayer) {
          map.current.addLayer(tclLayer)
        }
      } else {
        map.current.addLayer(tclLayer)
      }
    } else {
      map.current.removeLayer(tclLayer)
    }
  }

  if (restorationLayer !== null) {
    if (restorationChecked) {
      const currentLayer = restorationLayer && restorationLayer._leaflet_id
      const prevLayer = prevRestorationLayer && prevRestorationLayer._leaflet_id

      if (currentLayer !== prevLayer) {
        if (prevLayer) map.current.removeLayer(prevRestorationLayer)
        if (currentLayer) {
          map.current.addLayer(restorationLayer)
        }
      } else {
        map.current.addLayer(restorationLayer)
      }
    } else {
      map.current.removeLayer(restorationLayer)
    }
  }

  if (surveyLayer !== null) {
    if (surveyChecked) {
      const currentLayer = surveyLayer && surveyLayer._leaflet_id
      const prevLayer = prevSurveyLayer && prevSurveyLayer._leaflet_id

      if (currentLayer !== prevLayer) {
        if (prevLayer) map.current.removeLayer(prevSurveyLayer)
        if (currentLayer) {
          map.current.addLayer(surveyLayer)
        }
      } else {
        map.current.addLayer(surveyLayer)
      }
    } else {
      map.current.removeLayer(surveyLayer)
    }
  }

  if (fragmentLayer !== null) {
    if (fragmentChecked) {
      const currentLayer = fragmentLayer && fragmentLayer._leaflet_id
      const prevLayer = prevFragmentLayer && prevFragmentLayer._leaflet_id

      if (currentLayer !== prevLayer) {
        if (prevLayer) map.current.removeLayer(prevFragmentLayer)
        if (currentLayer) {
          map.current.addLayer(fragmentLayer)
        }
      } else {
        map.current.addLayer(fragmentLayer)
      }
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

    if (map.current.hasLayer(speciesLayer)) {
      speciesLayer.bringToFront()
    }
  }

  useEffect(() => {
    fetchBaseLayers()
  }, [])

  useEffect(() => {
    const date = dateFormat(dateContext)

    if (!(countryContext === null || countryContext === '')) {
      fetchLayers(countryContext, date)
    }
  }, [countryContext, dateContext])

  return (
    <List>
      <ListItem>
        <MapLayerItem
          layerChecked={tclChecked}
          handleLayerChange={handleTclChange}
          label="Tiger Conservation Landscape"
          legendStyle={{ bgColor: '#B2B4C8', borderColor: '#140BEB' }}
        />
      </ListItem>
      <ListItem>
        <MapLayerItem
          layerChecked={restorationChecked}
          handleLayerChange={handleRestorationChange}
          label="Tiger Restoration Landscape"
          legendStyle={{ bgColor: '#D5EBFA', borderColor: '#2C9EEB' }}
        />
      </ListItem>
      <ListItem>
        <MapLayerItem
          layerChecked={surveyChecked}
          handleLayerChange={handleSurveyChange}
          label="Tiger Survey Landscape"
          legendStyle={{ bgColor: '#E4CAEF', borderColor: '#9C1EEB' }}
        />
      </ListItem>
      <ListItem>
        <MapLayerItem
          layerChecked={fragmentChecked}
          handleLayerChange={handleFragmentChange}
          label="Tiger Fragment Landscape"
          legendStyle={{ bgColor: '#DDCE9B', borderColor: '#EB5423' }}
        />
      </ListItem>
      <ListItem>
        <MapLayerItem
          layerChecked={speciesChecked}
          handleLayerChange={handleSpeciesChange}
          label="Tiger Historical Landscape"
          legendStyle={{ bgColor: 'white', borderColor: 'black' }}
        />
      </ListItem>
      <ListItem className={classes.layerTypeStyle}>
        <MapLayerType
          map={map}
          layers={{
            'Protected Area': protectedAreaLayer,
            Biome: biomeLayer,
            'Human Influence Index': hiiLayer,
          }}
        />
      </ListItem>
    </List>
  )
}

MapLayerList.propTypes = {
  map: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
}

export default MapLayerList
