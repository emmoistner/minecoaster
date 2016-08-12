import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

class Players extends Component {

  renderList() {
    return this.props.players.map(player => {
      return (
        <ListItem
          onClick={() => { browserHistory.push(`/player/${player.id}`) }}
          leftAvatar={<Avatar style={{borderRadius: '0px'}} src={`https://crafatar.com/avatars/${player.id}`} />}
          key={player.name}
          primaryText={player.name}
        />
      )
    })
  }

  render () {
    if (this.props.players.length) {
      return (
        <List>
          {this.renderList()}
        </List>
      )
    } else {
      return null
    }
  }
}

export default Players
