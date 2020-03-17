import { API_ROOT } from '../api-config'
import SecureApi from './api'

class AvailableDate {
  constructor() {
    this.api = new SecureApi()
  }

  getDate(country, species) {
    const speciesId = species.id
    const url = `${API_ROOT}/sclstats/available_dates/?country=${country}&scl__species=${speciesId}`

    return this.api.getData(url)
  }
}

export default AvailableDate
