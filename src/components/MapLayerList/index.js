import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MapLayerItem from '../MapLayerItem'
import MapLayerType from '../MapLayerType'
import MapLayers from '../../lib/maplayers'
import { AppContext } from '../../contexts'

import usePrevious from '../../lib/usePrevious'

const useStyles = makeStyles(() => ({
  layerTypeStyle: {
    borderTop: '1px solid'
  },
}))

const MapLayerList = ({ map }) => {
  const classes = useStyles()
  const countryContext = useContext(AppContext).countryCode
  const dateContext = useContext(AppContext).date

  const [selectedCountry, setSelectedCountry] = useState('')
  const prevSelectedCountry = usePrevious(selectedCountry)
  const [selectedDate, setSelectedDate] = useState('')
  const prevSelectedDate = usePrevious((selectedDate))

  const species = { id: 1, name: 'Panthera tigris' }

  const mapLayers = new MapLayers()
  const [tclChecked, setTclChecked] = useState(true)
  const [tclLayer, setTclLayer] = useState(null)
  const [restorationChecked, setRestorationChecked] = useState(true)
  const [restorationLayer, setRestorationLayer] = useState(null)
  const [surveyChecked, setSurveyChecked] = useState(true)
  const [surveyLayer, setSurveyLayer] = useState(null)
  const [fragmentChecked, setFragmentChecked] = useState(true)
  const [fragmentLayer, setFragmentLayer] = useState(null)
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

  const fetchLayers = (countryCode, date) => {
    if (!(countryCode === '' || date === '')) {
      setTclLayer(mapLayers.getTclLayer(countryCode, date, species))
      setRestorationLayer(mapLayers.getRestorationLayer(countryCode, date, species))
      setSurveyLayer(mapLayers.getSurveyLayer(countryCode, date, species))
      setFragmentLayer(mapLayers.getFragmentLayer(countryCode, date, species))
    }
  }

  const fetchBaseLayers = () => {
    setSpeciesLayer(mapLayers.getTigerHistoricalRangeLayer(species))
    setProtectedAreaLayer(mapLayers.getProtectedAreaLayer())
    setBiomeLayer(mapLayers.getBiomeLayer())
    setHiiLayer(mapLayers.geHiiLayer())
  }

  const dateConversion = date => {
    const datePart = date.split('/')

    return `${datePart[2]}-${datePart[1]}-${datePart[0]}`
  }

  useEffect(() => {
    fetchBaseLayers()
  }, [])

  useEffect(() => {
    if (countryContext !== '') {
      setSelectedCountry(countryContext)
    }

    if (dateContext !== '') {
      setSelectedDate(dateConversion(dateContext))
    }
  }, [countryContext, dateContext])

  useEffect(() => {
    if (!(selectedCountry === '' || selectedDate === '')) {
      fetchLayers(selectedCountry, selectedDate)
    }
  }, [selectedCountry, selectedDate])

  useEffect(() => {
    if (tclLayer !== null) {
      if (tclChecked) {
        console.log("Add TCL Layer")
        map.current.addLayer(tclLayer)
      } else {
        console.log("Remove TCL Layer")
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

  }, [
    tclLayer,
    tclChecked,
    restorationLayer,
    restorationChecked,
    fragmentLayer,
    fragmentChecked,
    surveyLayer,
    surveyChecked,
    speciesLayer,
    speciesChecked
  ])

  if (selectedCountry !== prevSelectedCountry || selectedDate !== prevSelectedDate) {
    if (tclLayer !== null && map.current.hasLayer(tclLayer)) {
      map.current.removeLayer(tclLayer)
      console.log("CHANGE country, remove old layer")
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

  return (
    <List>
      <ListItem>
        <MapLayerItem layerChecked={tclChecked} handleLayerChange={handleTclChange} label="Tiger Conservation Landscape" legendStyle={{ bgColor: "#B2B4C8", borderColor: "#140BEB" }} />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={restorationChecked} handleLayerChange={handleRestorationChange} label="Tiger Restoration Landscape" legendStyle={{ bgColor: "#D5EBFA", borderColor: "#2C9EEB" }} />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={surveyChecked} handleLayerChange={handleSurveyChange} label="Tiger Survey Landscape" legendStyle={{ bgColor: "#E4CAEF", borderColor: "#9C1EEB" }} />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={fragmentChecked} handleLayerChange={handleFragmentChange} label="Tiger Fragment Landscape" legendStyle={{ bgColor: "#DDCE9B", borderColor: "#EB5423" }} />
      </ListItem>
      <ListItem>
        <MapLayerItem layerChecked={speciesChecked} handleLayerChange={handleSpeciesChange} label="Tiger Historical Landscape" legendStyle={{ bgColor: "white", borderColor: "black" }} />
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
