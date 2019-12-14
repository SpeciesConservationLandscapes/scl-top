import axios from 'axios'
import TokenUtil from './token'

class SecureApi {
  constructor() {
    this.tokenUtil = new TokenUtil()
  }

  getData(url) {
    const { token } = this.tokenUtil
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    return axios.get(url, config)
  }
}

export default SecureApi
