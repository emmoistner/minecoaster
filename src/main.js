/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill'

// Libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

// Redux Store configure
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

// Intialize Redux Store
const store = configureStore()

// Needed for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Routes
import Routes from './common/routes'

// Base styling
import './common/base.css'

// ID of the DOM element to mount app on
const DOM_ID = 'app'

// Render the router
ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      {Routes}
    </Router>
  </Provider>
), document.getElementById(DOM_ID));
