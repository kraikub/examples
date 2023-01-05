import uvicorn
import requests
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()

port = 8000

oauthClaimApi = "https://app.kraikub.com/api/oauth/v1/token"

# These configs should be initialized on https://app.kraikub.com/a
# or create a new application at https://app.kraikub.com/a/create.
# Once you get the credentials (Client ID and Secret), paste them here.

clientId = "<paste-your-clientId>"
secret = "<paste-your-secret>"

# Once you've created an application, please add a rediect uri at
# the section "ADD/EDIT REDIRECT URLS" on your application page on 
# Kraikub website.
# Example, click "+ Add an URL" then type 'http://localhost:8000/redirect' 
# if you are using port 8000. Once you are done, click save at the bottom 
# of your screen.
redirectUri = f"http://localhost:{port}/redirect"


def map_query_string_to_url(base, query):
  result = base+"?"
  for key in query.keys():
    result += f"&{key}={query[key]}"
  return result

@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.get("/signin")
def get_signin():
  return RedirectResponse(
    map_query_string_to_url("https://app.kraikub.com/signin", {
      "client_id": clientId,
      "scope": "openid%20student%20educations",
      "redirect_uri": redirectUri,
      "response_type": "code"
    })
  )

@app.get("/redirect")
def get_redirect(code: str = ""):
  body = {
    "code": code,
    "client_id": clientId,
    "client_secret": secret,
    "grant_type": "authorization_code",
  }
  response = requests.post(oauthClaimApi, json = body)
  return response.text

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=port)