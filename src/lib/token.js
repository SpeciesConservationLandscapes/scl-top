import { useAuth0 } from '../react-auth0-spa'

class TokenUtil {
  constructor() {
    const { accessToken } = useAuth0()

    // const { getTokenSilently, accessToken } = useAuth0()
    this.token = accessToken
  }
}

export default TokenUtil
