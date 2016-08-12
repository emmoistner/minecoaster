import React, { Component } from "react"
import _ from 'lodash'

import style from './style.css'
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar'
import SvgIcon from 'material-ui/SvgIcon'
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

const path="M393.26,120.973l7.5-7.5c2.929-2.929,2.929-7.678,0-10.606l-3.631-3.631l19.745-19.746c2.929-2.929,2.929-7.678,0-10.606  l-34.535-34.535c-1.407-1.407-3.314-2.197-5.304-2.197s-3.896,0.79-5.304,2.197l-19.745,19.745l-3.634-3.634  c-2.929-2.929-7.677-2.929-10.607,0l-7.499,7.499c-70.79-53.597-156.184-71.718-224.309-47.223c-3.128,1.125-5.143,4.174-4.95,7.492  c0.192,3.318,2.546,6.114,5.783,6.869c59.962,13.988,118.589,43.771,170.041,86.295l-4.541,4.541  c-1.406,1.406-2.196,3.314-2.196,5.303s0.79,3.897,2.196,5.303l3.635,3.635L2.202,403.879c-2.929,2.929-2.929,7.678,0,10.606  l34.535,34.535c1.464,1.464,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197l273.705-273.704l3.63,3.63  c1.465,1.464,3.385,2.197,5.304,2.197s3.839-0.732,5.304-2.197l4.541-4.541c42.521,51.447,72.302,110.073,86.292,170.037  c0.755,3.237,3.551,5.591,6.869,5.783c0.146,0.009,0.292,0.013,0.438,0.013c3.146,0,5.979-1.973,7.055-4.962  C464.969,277.162,446.851,191.77,393.26,120.973z M377.036,50.258l23.929,23.929l-14.442,14.442L362.594,64.7L377.036,50.258z   M137.29,17.871c24.755-4.432,51.656-3.631,79.16,2.47c35.795,7.94,71.271,24.594,103.086,48.328l-32.069,32.068  C241.723,62.701,190.376,34.407,137.29,17.871z M42.041,433.111l-23.929-23.929l268.401-268.401l23.929,23.928L42.041,433.111z   M288.181,121.236l54.868-54.867l41.801,41.801l-54.867,54.868L288.181,121.236z M433.344,313.925  c-16.536-53.088-44.829-104.433-82.862-150.173l32.068-32.068c23.734,31.821,40.386,67.298,48.325,103.09  C436.975,262.272,437.775,289.173,433.344,313.925z"

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
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
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="mine.cool"
            showMenuIconButton={false}
            iconElementRight={<PickIcon />}
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
