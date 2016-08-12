import React from 'react'
import { Route, IndexRoute, browserHistory, Router } from 'react-router'

import App from './App'
import HomePage from '../../components/home'
import Player from '../../components/player'


export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path='player/:id' component={Player} />
    </Route>
  </Router>
)
