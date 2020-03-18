import React from 'react'
import PropTypes from 'prop-types'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'

import styled from 'styled-components/macro'

const LabelBox = styled(Box)`
  display: flex;
  align-items: center;
`

const LegendIconStyle = styled('div')`
  height: 20px;
  width: 20px;
  border: 2px solid ${props => props.borderColor};
  border-radius: 3px;
  background-color: ${props => props.bgColor};
  margin-right: 10px;
`

const MapLayerItem = ({ layerChecked, handleLayerChange, label, legendStyle }) => {
  const { bgColor, borderColor } = legendStyle
  const labelFormat = (
    <LabelBox><LegendIconStyle bgColor={bgColor} borderColor={borderColor} /> {label}</LabelBox>
  )

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={layerChecked}
          onChange={handleLayerChange}
          color="primary"
        />
      }
      label={labelFormat}
    />
  )
}

MapLayerItem.propTypes = {
  layerChecked: PropTypes.bool.isRequired,
  handleLayerChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  legendStyle: PropTypes.shape({
    bgColor: PropTypes.string,
    borderColor: PropTypes.string
  }).isRequired
}

export default MapLayerItem
