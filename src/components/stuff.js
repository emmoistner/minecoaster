import React, { Component } from 'react'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import Players from './players'

class Stuff extends Component {
  render () {
    return (
      <div style={{margin: '0 25%'}}>
        <Card style={{marginTop: '25px', cursor: 'pointer'}} onClick={() => window.location = '/map'}>
          <CardTitle title='Map' />
        </Card>
        <Card style={{marginTop: '25px'}}>
          <CardTitle title='Players' subtitle={`${this.props.players.length}/${this.props.maxplayers}`} />
          <CardText>
            <Players players={this.props.players} />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Stuff
