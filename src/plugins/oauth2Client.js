import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.VUE_APP_GG_CLIENT_ID,
  process.env.VUE_APP_GG_CLIENT_SECRET,
  process.env.VUE_APP_GG_REDIRECT_URL
)

const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar'
]

const authUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
})

export default authUrl
