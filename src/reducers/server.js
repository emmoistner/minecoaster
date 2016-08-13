import _ from 'lodash'

import {
  REQUEST_SERVER_PING,
  RECEIVE_SERVER_PING,
  ERROR_SERVER_PING
} from '../actions/server'

const initState = {
  isFetching: false,
  players: [],
  maxplayers: 0,
  version: '',
  description: ''
}

export default function server(state = initState, action) {
  switch (action.type) {

    case REQUEST_SERVER_PING: {
      return {
        ...state,
        isFetching: true
      }
    }

    case RECEIVE_SERVER_PING: {
      const response = action.json
      return {
        ...state,
        isFetching: false,
        players: _.sortBy(response.players, ['name']),
        maxplayers: response.maxplayers,
        version: response.raw.version,
        description: response.raw.description
      }
    }

    case ERROR_SERVER_PING: {
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    }

    default: {
      return state
    }
  }
}
