export const port = 8000;
export const signinUrl = "https://app.kraikub.com/signin";
export const oauthClaimApi = "https://app.kraikub.com/api/oauth/v1/token";

// These configs should be initialized on https://app.kraikub.com/a
// or create a new application at https://app.kraikub.com/a/create.
// Once you get the credentials (Client ID and Secret), paste them here.

export const clientId = "dc1805859399c7c00cf5f2a75cd69e66";
export const secret = "7006ce1287de19c856756db2197c7c05d31f7390b453c25883494d5f";

// Once you've created an application, please add a rediect uri at
// the section "ADD/EDIT REDIRECT URLS" on your application page on
// Kraikub website.
// Example, click "+ Add an URL" then type 'http://localhost:8000/redirect'
// if you are using port 8000. Once you are done, click save at the bottom
// of your screen.
export const redirectUri = `http://localhost:${port}/redirect`;
