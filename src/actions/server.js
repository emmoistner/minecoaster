export const REQUEST_SERVER_PING = 'REQUEST_SERVER_PING'
export const RECEIVE_SERVER_PING = 'RECEIVE_SERVER_PING'
export const ERROR_SERVER_PING = 'ERROR_SERVER_PING'

import config from '../config'

export function requestServerPing(reddit) {
  return {
    type: REQUEST_SERVER_PING
  }
}

function receiveServerPing(json) {
  return {
    type: RECEIVE_SERVER_PING,
    json
  }
}

function errorServerPing(error) {
  return {
    type: ERROR_SERVER_PING,
    error
  }
}

export function serverPingPoll(timeout = 20000) {
  return dispatch => {
    setTimeout(() => dispatch(serverPing()), timeout)
  }

  function serverPing () {
    return dispatch => {
      dispatch(requestServerPing())
      return fetch(`${config.host}/status`)
        .then(response => {
          if (response && response.status === 200) {
            return response.json()
          } else {
            return null
          }
        })
        .then(json => {
          if (json) {
            dispatch(receiveServerPing(json))
          }
          dispatch(serverPingPoll())
        })
        .catch(error => {
          dispatch(serverPingPoll(100000))
          dispatch(errorServerPing(error))
        })
    }
  }
}
