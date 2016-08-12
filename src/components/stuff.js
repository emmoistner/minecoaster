import React, { Component } from 'react'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
class Stuff extends Component {

  renderList() {
    return this.props.players.map(player => {
      return <ListItem key={player.name} primaryText={player.name} />
    })
  }

  render () {
    return (
      <div style={{margin: '0 25%'}}>
        <Card style={{marginTop: '25px', cursor: 'pointer'}} onClick={() => window.location = '/map'}>
          <CardTitle title='Map' />
        </Card>
        <Card style={{marginTop: '25px'}}>
          <CardTitle title='Players' subtitle={`${this.props.players.length}/${this.props.maxplayers}`} />
          <CardText>
            { this.props.players.length > 0 &&
              <List>
                {this.renderList()}
              </List>
            }
          </CardText>
        </Card>
        <Card style={{marginTop: '25px'}}>
          <CardTitle title='Version' subtitle={this.props.version} />
        </Card>
        <Card style={{marginTop: '25px'}}>
          <CardTitle title='Description' subtitle={this.props.description} />
        </Card>
      </div>
    )
  }
}

export default Stuff
