let backendHost

let tileHost

const apiVersion = 'v1'

const hostname = window && window.location && window.location.hostname

if (hostname === 'tiger.speciescl.org') {
  backendHost = 'http://localhost:8181'
  tileHost = 'http://{s}.localhost:8181'
} else {
  backendHost = 'http://localhost:8181'
  tileHost = 'http://localhost:8181'
}

export const API_ROOT = `${backendHost}/${apiVersion}`
export const TILE_API_ROOT = `${tileHost}/${apiVersion}`
