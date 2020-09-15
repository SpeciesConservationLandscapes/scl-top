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
  const prevSpeciesLayer = usePrevious(speciesLayer)
  const [protectedAreaLayer, setProtectedAreaLayer] = useState(null)
  const [biomeLayer, setBiomeLayer] = useState(null)
  const [hiiLayer, setHiiLayer] = useState(null)
  const prevHiiLayer = usePrevious(hiiLayer)
  const [structuralHabitatLayer, setStructuralHabitatLayer] = useState(null)
  const prevStructuralHabitatLayer = usePrevious(structuralHabitatLayer)
  const [baseLayerChange, setBaseLayerChange] = useState(false)
  const [sHBaseLayerChange, setSHBaseLayerChange] = useState(false)
  const [radioValue, setRadioValue] = useState('None')

  const handleTclChange = e => setTclChecked(e.target.checked)
  const handleRestorationChange = e => setRestorationChecked(e.target.checked)
  const handleSurveyChange = e => setSurveyChecked(e.target.checked)
  const handleFragmentChange = e => setFragmentChecked(e.target.checked)
  const handleSpeciesChange = e => setSpeciesChecked(e.target.checked)

  const handleTclLayer = layer => setTclLayer(layer)
  const handleRestorationLayer = layer => setRestorationLayer(layer)
  const handleSurveyLayer = layer => setSurveyLayer(layer)
  const handleFragmentLayer = layer => setFragmentLayer(layer)
  const handleRadioChange = event => setRadioValue(event.target.value)

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

  const fetchBaseLayers = date => {
    setSpeciesLayer(mapLayers.getTigerHistoricalRangeLayer(species))
    setProtectedAreaLayer(mapLayers.getProtectedAreaLayer())
    setBiomeLayer(mapLayers.getBiomeLayer())
    setHiiLayer(mapLayers.geHiiLayer(date))
    setStructuralHabitatLayer(mapLayers.getStructuralHabitat(species, date))
  }

  const layerManagement = (curLayer, prevLayer, layerChecked) => {
    if (layerChecked) {
      const currentLayer = curLayer && curLayer._leaflet_id
      const previousLayer = prevLayer && prevLayer._leaflet_id

      if (currentLayer !== previousLayer) {
        if (previousLayer) map.current.removeLayer(prevLayer)
        if (currentLayer) {
          map.current.addLayer(curLayer)
        }
      } else {
        map.current.addLayer(curLayer)
      }
    } else {
      map.current.removeLayer(curLayer)
    }
  }

  if (
    hiiLayer !== null &&
    baseLayerChange &&
    radioValue === 'Human Influence Index'
  ) {
    map.current.removeLayer(prevHiiLayer)
    map.current.addLayer(hiiLayer)
    setBaseLayerChange(false)
  }

  if (
    structuralHabitatLayer !== null &&
    sHBaseLayerChange &&
    radioValue === 'Structural Habitat'
  ) {
    map.current.removeLayer(prevStructuralHabitatLayer)
    map.current.addLayer(structuralHabitatLayer)
    setSHBaseLayerChange(false)
  }

  if (tclLayer !== null) layerManagement(tclLayer, prevTclLayer, tclChecked)

  if (restorationLayer !== null)
    layerManagement(restorationLayer, prevRestorationLayer, restorationChecked)

  if (surveyLayer !== null)
    layerManagement(surveyLayer, prevSurveyLayer, surveyChecked)

  if (fragmentLayer !== null)
    layerManagement(fragmentLayer, prevFragmentLayer, fragmentChecked)

  if (speciesLayer !== null)
    layerManagement(speciesLayer, prevSpeciesLayer, speciesChecked)

  useEffect(() => {
    const date = dateFormat(dateContext)

    setBaseLayerChange(true)
    setSHBaseLayerChange(true)
    fetchBaseLayers(date)
  }, [dateContext])

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
            'Structural Habitat': structuralHabitatLayer,
            Biome: biomeLayer,
            'Human Influence Index': hiiLayer,
          }}
          radioValue={radioValue}
          handleRadioChange={handleRadioChange}
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
