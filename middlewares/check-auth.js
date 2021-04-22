const jwt = require('jsonwebtoken')
// const { JWT_SECRET } = require('../config.js')
const Logger = require('../logger')

module.exports = (req, res, next) => {
    const JWT_SECRET=process.env.JWT_ENCRYPTION
  const { authorization } = req.headers
  Logger.info(authorization)
  if (!authorization) {
    const err = new Error()
    err.status = 401;
    err.message = 'Unauthorized access'
    next(err)
  }
  const token = authorization.split(" ")[1]
  console.log(token)
  try {
    const decoded = jwt.verify(token, JWT_SECRET, null)
    req.userData = decoded
    Logger.info(decoded)
    next()
  } catch (error) {
      console.log(error)
      return res.status(401).json({
          message:"Auth failed",
          error: error.message
      })
  }
}
