import React from 'react'

import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import styled from 'styled-components/macro'

const DateSliderBox = styled(Box)`
  padding: 40px 30px 0 30px;
`

const marks = [
  {
    value: 0,
    label: '3/23/16',
  },
  {
    value: 20,
    label: '11/2/16',
  },
  {
    value: 37,
    label: '7/4/18',
  },
  {
    value: 100,
    label: '9/30/19',
  },
]

function valuetext(value) {
  return `${value}°C`
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1
}

const DateSlider = () => {
  return (
    <DateSliderBox>
      <Slider
        defaultValue={20}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </DateSliderBox>
  )
}

export default DateSlider
