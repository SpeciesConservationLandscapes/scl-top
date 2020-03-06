import { API_ROOT } from '../api-config'
import SecureApi from './api'
import TokenUtil from './token'

class Profile {
  constructor() {
    this.api = new SecureApi()
    this.tokenUtil = new TokenUtil()
    this._profile = null
  }

  _fetchProfile() {
    const url = `${API_ROOT}/me/`

    return this.api.getData(url).then(resp => {
      this._profile = resp.data
    })
  }

  get token() {
    return this.tokenUtil.token
  }

  getCountries() {
    const self = this

    if (this._profile !== null) {
      return Promise.resolve(self._profile.countries)
    }

    return this._fetchProfile().then(() => {
      return self.getCountries()
    })
  }
}

export default Profile
