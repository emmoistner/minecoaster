let config

if (ENV.DEV) {
  config = {
    host: 'http://localhost:8080'
  }
} else {
  config = {
    host: 'http://mine.cool'
  }
}

export default config
