import React, { Component } from 'react'
import _ from 'lodash'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import { connect } from 'react-redux'

const cardTitleStyle = {
  height: '122px',
  display: 'flex',
  alignItems: 'center',
  jusitifyContent: 'center',
  marginLeft: '132px',
  fontSize: '24px',
  fontWeight: '500'
}

class Player extends Component {

  render () {
    return (
      <div style={{margin: '0 25%'}}>
        <Card style={{marginTop: '25px', position: 'relative'}}>
          <div style={{padding: '16px'}}>
            <img
              style={{height: '122px', width: '122px', position: 'absolute' }}
              src={`https://crafatar.com/renders/head/${this.props.params.id}`}
            />
            <div
              style={cardTitleStyle}>
              {this.props.name}
            </div>
          </div>
          <CardTitle title='Stats' subtitle='Coming Soon!'/>
        </Card>
      </div>
    )
  }
}

Player.defaultProps = {
  params: {}
}

function mapStateToProps(state, props) {
  const { server } = state
  const player = _.find(server.players, { id: props.params.id}) || {}

  return {
    name: player.name,
  }
}

export default connect(mapStateToProps)(Player)
