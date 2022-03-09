const axios = require('axios')

class ExpressTools {

    static setCacheHeaders(options = []) {
      return (req, res, next) => {
        if (options && options.length) {
          res.removeHeader("X-Powered-By")
          res.set('Cache-Control', options.join(', '))
          res.set('Access-Control-Allow-Credentials', true)
          next()
        }
      }
    }

    static recaptcha(req, res, next) {
      // implements Google Recaptcha v3
      const { token } = req.body
      if (!token) return res.status(400).send('no token')
      if (token) {
        const q = {
          secret: process.env.RECAPTCHA_SECRET,
          response: token,
          remoteip: req.ip,
          url: process.env.RECAPTCHA_URL,
          headers: {
            "accept": "application/json",
            "cache-control": "no-cache"
          }
        }
        axios.post( `${q.url}?secret=${q.secret}&response=${q.response}&remoteip=${q.remoteip}`, q.headers)
          .then( (response) => {
              const {success, score} = response.data
              if (success && score > process.env.RECAPTCHA_SCORE) return next()
              if (!res.headerSent) return res.status(400).send('invalid')
          })
          .catch((error) => {
              return res.status(400).send(error.response.data)
          });
      }
    }

    static allowedOrigins() {
      const allowedOrigins = (process.env.CORS_ENABLER).split(',')
      return {
        optionsSuccessStatus: 200,
        origin: (origin, callback) => {
            console.log('origin >>>', origin)
            if (allowedOrigins.indexOf(origin) === -1 &&
              (process.env.NODE_ENV === 'DEV' && 
              origin === 'undefined')) {
              let msg = `The CORS policy error - not allowed`
              return callback(msg, false)
            }
            return callback(null, true)
          }
        }
    }
}

module.exports = ExpressTools