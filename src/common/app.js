import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { connect } from 'react-redux'
import { serverPingPoll } from '../actions/server'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#1976D2',
    primary2Color: '#2196F3',
    primary3Color: '#BDBDBD',
    accent1Color: '#FFC107',
    accent2Color: '#F5F5F5',
    accent3Color: '#9E9E9E',
    textColor: 'rgba(0, 0, 0, 0.87)',
    alternateTextColor: '#ffffff',
    canvasColor: '#ffffff',
    borderColor: '#e0e0e0',
    pickerHeaderColor: '#1976D2',
    shadowColor: '#000000'
  }
})

const style = {
  marginTop: '0',
  marginRight: '0',
  merginLeft: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff'
}

export default class App extends Component {

  componentDidMount() {
    this.props.dispatch(serverPingPoll(0))
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="MineCool"
            showMenuIconButton={false}
            iconStyleRight={style}
            iconElementRight={<div>{this.props.version}</div>}
          />
          <div id="container">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { server } = state
  return {
    version: server.version
  }
}

export default connect(mapStateToProps)(App)
