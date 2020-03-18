import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components/macro'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import usePrevious from '../../lib/usePrevious'

const useStyles = makeStyles({
  formStyle: {
    alignItems: 'start',
  },
  root: {
    flexGrow: 1,
    paddingTop: '10px'
  },
})

const LegendIconStyle = styled('div')`
  height: 16px;
  width: 16px;
  border-radius: 3px;
  background-color: ${props => props.bgColor};
  margin-right: ${props => props.setMarginRight && '8px'};
`

const HiiLegend = styled('div')`
  height: 50px;
  width: 240px;
  border-radius: 3px;
  background: linear-gradient(to right, rgba(156,188,161,1) 0%,rgba(211,211,139,1) 17%,rgba(232,162,109,1) 30%,rgba(175,55,0,1) 57%,rgba(156,0,170,1) 87%,rgba(0,36,0,1) 100%);;
`

const HiiDescription = styled('div')`
  display: flex;
  justify-content: space-between;
`

const PALabel = styled('div')`
  display: inline-flex;
  align-items: center;
  padding-top: 10px;
`

const MapLayerType = ({ map, layers }) => {
  const classes = useStyles()
  const layerNames = Object.keys(layers)
  const [radioValue, setRadioValue] = useState('None')
  const prevRadioValue = usePrevious(radioValue)

  const handleChange = event => {
    setRadioValue(event.target.value)
  }

  useEffect(() => {
    if (radioValue === "None") {
      if (prevRadioValue !== '' && prevRadioValue !== undefined) {
        map.current.removeLayer(layers[prevRadioValue])
      }
    } else if (prevRadioValue === "None") {
      map.current.addLayer(layers[radioValue])
    } else {
      map.current.removeLayer(layers[prevRadioValue])
      map.current.addLayer(layers[radioValue])
    }
  }, [radioValue])

  const labelFormat = name => {
    switch (name) {
      case 'Biome':
        return (
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId="1" label={name}>
              <TreeItem nodeId="2" label="Boreal Forests/Taiga" icon={<LegendIconStyle bgColor="#C5AF69" />}/>
              <TreeItem nodeId="3" label="Deserts & Xeric Shrublands" icon={<LegendIconStyle bgColor="#D0606E" />}/>
              <TreeItem nodeId="4" label="Flooded Grasslands & Savannas" icon={<LegendIconStyle bgColor="#C7DADC" />}/>
              <TreeItem nodeId="5" label="Mangroves" icon={<LegendIconStyle bgColor="#FE00C4" />}/>
              <TreeItem nodeId="6" label="Mediterranean Forests, Woodlands & Scrub" icon={<LegendIconStyle bgColor="#F7100D" />}/>
              <TreeItem nodeId="7" label="Montane Grasslands & Shrublands" icon={<LegendIconStyle bgColor="#C6C8A7" />}/>
              <TreeItem nodeId="8" label="Temperate Broadleaf & Mixed Forests" icon={<LegendIconStyle bgColor="#308366" />}/>
              <TreeItem nodeId="9" label="Temperate Conifer Forests" icon={<LegendIconStyle bgColor="#67A5C6" />}/>
              <TreeItem nodeId="10" label="Temperate Grasslands, Savannas & Shrublands" icon={<LegendIconStyle bgColor="#E3F4AF" />}/>
              <TreeItem nodeId="11" label="Tropical & Subtropical Coniferous Forests" icon={<LegendIconStyle bgColor="#1D8651" />}/>
              <TreeItem nodeId="12" label="Tropical & Subtropical Dry Broadleaf Forests" icon={<LegendIconStyle bgColor="#91CE66" />}/>
              <TreeItem nodeId="13" label="Tropical & Subtropical Grasslands, Savannas & Shrublands" icon={<LegendIconStyle bgColor="#FDD53A" />}/>
              <TreeItem nodeId="14" label="Tropical & Subtropical Moist Broadleaf Forests" icon={<LegendIconStyle bgColor="#C0C95F" />}/>
              <TreeItem nodeId="15" label="Tundra" icon={<LegendIconStyle bgColor="#B3A998" />}/>
            </TreeItem>
          </TreeView>
        )
      case 'Human Influence Index':
        return (
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId="16" label={name}>
              <TreeItem nodeId="17" label="Terrestrial Human Footprint Value"/>
              <TreeItem nodeId="18" label={
                <HiiLegend />
              }/>
              <TreeItem nodeId="19" label={
                <HiiDescription>
                  <span>Low</span>
                  <span>High</span>
                </HiiDescription>
              }/>
            </TreeItem>
          </TreeView>
        )
      default:
        return (
          <PALabel>
            <LegendIconStyle bgColor="#16A51C" setMarginRight="true" /> {name}
          </PALabel>)
    }
  }

  const layerOptions = layerNames.map(name => {
    return (
      <FormControlLabel
        key={name}
        value={name}
        control={<Radio />}
        label={labelFormat(name)}
        className={classes.formStyle}
      />
    )
  })

  return (
    <FormControl component="fieldset" >
      <RadioGroup aria-label="gender" name="gender1" value={radioValue} onChange={handleChange}>
        {layerOptions}
        <FormControlLabel key="None" value="None" control={<Radio />} label="None" />
      </RadioGroup>
    </FormControl>
  )
}

MapLayerType.propTypes = {
  map: PropTypes.shape({
    current: PropTypes.object
  }).isRequired,
  layers: PropTypes.instanceOf(Object).isRequired
}

export default MapLayerType
