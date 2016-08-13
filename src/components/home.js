import React, { Component } from "react"
import _ from 'lodash'
import { connect } from 'react-redux'

import Stuff from '../components/stuff'

class HomePage extends Component {
  render() {
    return (
      <Stuff
        players={this.props.players}
        maxplayers={this.props.maxplayers}
        version={this.props.version}
        description={this.props.description}
      />
    )
  }
}

function mapStateToProps(state) {
  const { server } = state
  return {
    players: server.players,
    maxplayers: server.maxplayers
  }
}

export default connect(mapStateToProps)(HomePage)
