package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

const port string = "8000"

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
const redirectUri = "http://localhost:" + port + "/redirect"

func mapQueryStringToUrl(base string, query map[string]string) string {
	result := base + "?"
	for k := range query {
		result += "&" + k + "=" + query[k]
	}
	return result
}

// Schema for claiming access_token and id_token (DTO)
type ClaimDTO struct {
	Code         string `json:"code"`
	ClientId     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	GrantType    string `json:"grant_type"`
}

func main() {
	r := gin.Default()

	r.GET("/signin", func(c *gin.Context) {
		c.Redirect(http.StatusTemporaryRedirect, mapQueryStringToUrl(
			"https://app.kraikub.com/signin",
			map[string]string{
				"client_id":     clientId,
				"scope":         "openid%20student%20educations",
				"redirect_uri":  redirectUri,
				"response_type": "code",
			},
		))
	})

	r.GET("/redirect", func(c *gin.Context) {
		code := c.Query("code")
		payload := ClaimDTO{
			Code:         code,
			ClientId:     clientId,
			ClientSecret: secret,
			GrantType:    "authorization_code",
		}
		b, err := json.Marshal(&payload)
		if err != nil {
			c.JSON(500, err.Error())
			return
		}
		body := bytes.NewReader(b)
		res, err := http.Post(oauthClaimApi, "application/json", body)
		if err != nil {
			c.JSON(500, err.Error())
			return
		}
		resBody, err := ioutil.ReadAll(res.Body)
		res.Body.Close()
		c.JSON(http.StatusOK, string(resBody))
	})
	r.Run(":" + port) // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
