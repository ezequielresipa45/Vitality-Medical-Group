const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const dotenv = require("dotenv");
dotenv.config();

const {
    EMAIL,
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN
} = process.env

const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();

const auth = {
    type: 'OAuth2',
    user: EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken  
}

module.exports = {
    auth
}