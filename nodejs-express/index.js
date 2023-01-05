const express = require('express');
const axios = require('axios').default;
const app = express();
const port = 8000;

const oauthClaimApi = "https://app.kraikub.com/api/oauth/v1/token"

// These configs should be initialized on https://app.kraikub.com/a
// or create a new application at https://app.kraikub.com/a/create.
// Once you get the credentials (Client ID and Secret), paste them here.

const clientId = "<paste-your-clientId>"
const secret = "<paste-your-secret>"

// Once you've created an application, please add a rediect uri at
// the section "ADD/EDIT REDIRECT URLS" on your application page on 
// Kraikub website.
// Example, click "+ Add an URL" then type 'http://localhost:8000/redirect' 
// if you are using port 8000. Once you are done, click save at the bottom 
// of your screen.
const redirectUri = `http://localhost:${port}/redirect`

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/signin', (req, res) => {
  res.redirect(
    mapQueryStringToUrl("https://app.kraikub.com/signin", {
      client_id: clientId,
      scope: "openid%20student%20educations",
      redirect_uri: redirectUri,
      response_type: "code"
    })
  )
})

app.get('/redirect', async (req, res) => {
  const { code } = req.query;
  const body = {
    code: code,
    client_id: clientId,
    client_secret: secret,
    grant_type: "authorization_code",
  }
  const a = await axios.post(oauthClaimApi, body)
  res.send(a.data);
})



app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});



/// Utilities functions

function mapQueryStringToUrl(base, query) {
  let result = base + "?";
  const queryKeys = Object.keys(query);
  for (const key of queryKeys) {
    result += `&${key}=${query[key]}`
  }
  return result;
}