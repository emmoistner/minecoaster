import React, { Component } from 'react'

class Player extends Component {

  render () {
    return (
      <div>
        <img src={`https://crafatar.com/renders/body/${this.props.params.id}`} />
      </div>
    )
  }
}

Player.defaultProps = {
  params: {}
}

export default Player
