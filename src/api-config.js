let backendHost

let tileHost

const apiVersion = 'v1'

const hostname = window && window.location && window.location.hostname

if (hostname === 'tiger.speciescl.org') {
  backendHost = 'https://api.speciescl.org'
  tileHost = 'https://{s}.speciescl.org'
} else {
  backendHost = 'http://localhost:8181'
  tileHost = 'http://localhost:8181'
}

export const API_ROOT = `${backendHost}/${apiVersion}`
export const TILE_API_ROOT = `${tileHost}/${apiVersion}`
