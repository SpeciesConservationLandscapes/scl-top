import React, { useState, useEffect, useContext } from 'react'

import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import styled from 'styled-components/macro'
import AvailabelDate from '../../lib/availabledate'
import { AppContext } from '../../contexts'

const DateSliderBox = styled(Box)`
  padding: 40px 40px 0 40px;
`

const DateSlider = () => {
  const countryContext = useContext(AppContext).countryCode
  const context = useContext(AppContext)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const species = { id: 1, name: 'Panthera tigris' }
  const availableDate = new AvailabelDate()
  const [dates, setDates] = useState([])
  const [dateValue, setDateValue] = useState([])
  const [selectedDate, setSelectedDate] = useState('')

  const convertNewDate = date => {
    const datePart = date.split('-')

    return new Date(Number(datePart[0]), Number(datePart[1]) - 1, Number(datePart[2]))
  }

  const calRelativeValue = (min, max, n) => {
    const numerator = n - min
    const denominator = max - min

    return numerator / denominator * 100
  }

  const dateMarksFormat = array => {
    const valueLength = array.length
    const firstDate = new Date(array[0]).getTime()
    const lastDate = new Date(array[valueLength - 1]).getTime()

    let result = []

    if (valueLength === 1) {
      result.push({ value: 100, label: convertNewDate(array[0]).toLocaleDateString() })
    } else {
      result = array.map(date => {
        const dateTime = new Date(date).getTime()

        return {
          value: calRelativeValue(firstDate, lastDate, dateTime),
          label: convertNewDate(date).toLocaleDateString()
        }
      })
    }

    return result
  }

  const getCurrentDate = currentDate => {
    dateValue.forEach(e => {
      if (currentDate === e.value) {
        setSelectedDate(e.label)
      }
    })
  }

  useEffect(() => {
    setSelectedCountry(countryContext)
  }, [countryContext])

  useEffect(() => {
    if (!(selectedCountry === null || selectedCountry === '')) {
      availableDate.getDate(selectedCountry, species).then(date => {
        setDates(date.data)
      })
    }
  }, [selectedCountry])

  useEffect(() => {
    if (dates.length > 0) {
      const newDate = dateMarksFormat(dates)

      setDateValue(newDate)
    }
  }, [dates])

  useEffect(() => {
    context.setDate(selectedDate)
  }, [selectedDate])

  return (
    <DateSliderBox>
      <Slider
        defaultValue={100}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        getAriaValueText={getCurrentDate}
        marks={dateValue}
      />
    </DateSliderBox>
  )
}

export default DateSlider
