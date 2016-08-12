import React, { Component } from "react"
import _ from 'lodash'

import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'

import config from '../config'
import Stuff from './stuff'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    shadowColor: '#000000',
  }
});

const PickIcon = (props) => (
  <SvgIcon {...props} color='#ffffff'>
    <path d={path} fill='000000' />
  </SvgIcon>
)

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      maxplayers: 0,
      version: '',
      description: ''
    }
  }

  componentDidMount() {
    function poll(timeout = 20000) {
      function fetchStatus(timeout) {
        return fetch(`${config.host}/status`)
          .then((response) => {
            if (response && response.status === 200) {
              return response.json()
            } else {
              return null
            }
          })
          .then((response) => {
            if (response) {
              const newState = {
                players: _.sortBy(response.players, ['name']),
                maxplayers: response.maxplayers,
                version: response.raw.version,
                description: response.raw.description
              }
              this.setState(newState)
            }

            poll = poll.bind(this)
            return poll(timeout)
          })
          .catch(e => {
            poll = poll.bind(this)
            return poll(100000)
          })
      }
      setTimeout(fetchStatus.bind(this), timeout)
    }

    poll = poll.bind(this)
    poll(0)
  }


  render() {
    const style = {
      marginTop: '0',
      marginRight: '0',
      merginLeft: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff'
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="MineCool"
            showMenuIconButton={false}
            iconStyleRight={style}
            iconElementRight={<div>{this.state.version}</div>}
          />
          <Stuff
            players={this.state.players}
            maxplayers={this.state.maxplayers}
            version={this.state.version}
            description={this.state.description}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
