const { auth } = require("express-oauth2-jwt-bearer")

require("dotenv").config()

const { AUTH_AUDIENCE, AUTH_ISSUER_BASE_URL} = process.env


const jwtCheck = auth({
    audience: AUTH_AUDIENCE,
    issuerBaseURL: `https://${AUTH_ISSUER_BASE_URL}`,
    tokenSigningAlg: 'RS256'
})

module.exports = jwtCheck