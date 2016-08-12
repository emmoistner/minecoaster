import express from 'express';
const app = express();

import gamedig from 'gamedig'
import favicon from 'serve-favicon'

/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 ************************************************************/

app.use(favicon(__dirname + '/build/favicon.ico'))

// Serve index page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

// Serve application file depending on environment
app.get('/app.js', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/app.js');
  } else {
    res.redirect('//localhost:9090/build/app.js');
  }
});

// Serve up static map assests
app.use(express.static(__dirname + '/map'))

app.get('/map', (req, res) => {
  res.sendFile(__dirname + '/map/map.html')
})

app.get('/status', (req, res) => {
  let params = { type: 'minecraftping', host: 'mine.cool' }

  gamedig.query(params, (state) => {
    if (state.error) {
      console.log("Server is offline")
      res.status(404).send('Server is offline')
    } else {
      res.json(state)
    }
  })
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', (req, res) => {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/style.css');
  } else {
    res.redirect('//localhost:9090/build/style.css');
  }
});

/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
  });
}


/******************
 *
 * Express server
 *
 *****************/

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
