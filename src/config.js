let config
if (process.env.PRODUCTION) {
  config = {
    host: 'http://mine.cool'
  }
} else {
  config = {
    host: 'http://localhost:8080'
  }
}

export default config
