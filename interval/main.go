package main

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"google.golang.org/api/option"
)

func main() {
	l := log.New(os.Stdout, "", log.LstdFlags|log.Lshortfile)

	opt := option.WithCredentialsJSON([]byte(`{
  "type": "service_account",
  "project_id": "neovim-btw",
  "private_key_id": "1b0034d44d78d16ef2ae93e70b28301cfbdf3279",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCTAP/Gg2XlfH+E\nVa6PE1ooe75TEBfQO2EUL4lTWeW/976jYYp18ejZp4I5IkKR/U1fQ92540w6Anxm\nPzi4OlG18hNgdyxW8/xi/dR06TXyJOOVGxQ262j6fnLSpI2LR63xj9peao4jjHNt\nxQ5GUEAy73TrmNyE9MO3RMkf+Spd/vB384cnOQhTXiRCpFhL1nyhxpqbifMYjndu\noUE3eKXqcmny5IJw4NwrJGtPmVtuZkMAHy/xn9Ibj/apLvC+fffoF1eVcJYvgZOC\nNodIZmzt7333JWFQ8BZeRs94MXOKdQOZDZfVqq1+m+r10MIdLsFh4EMiFPBWjOq3\nxjA/V2KPAgMBAAECggEAOVwWcXsr81OU3iogpqtCbrF6HicVY6cHxjyWNPPK9hDR\nTibtRABUfzkhUvHPT++qlRWCGtpaD/iQWcUpeJko8Pm4HdficTtaq7WnhMbKyeUi\n+DdMt/E7USKt4wtaP5KEiNE8v8KMG8rd72MIot8FbdqJoLRQt4BaLdSlNdifc3VD\nJSf7x8IVTjGLVoYucwJJT6czrf3YiEHLCt+vUgAweaqsO40OPJ24tNcxK8XQkSyk\nXPEcdaCZ34mqxDnANvNY1W/VCdtkk6wJsMy4ZQtwWzGftyZFk9CdLdWXYZu/S/x6\nlWY3vrpdWHPaJbNh0dm0g+5BamQ6idpB4Sa+TdpuAQKBgQDHTL8FlSjk15mUfxrK\nNANjGbyivAG7P23IAKPS3NuxKzN226/gR2a33tcVI/0xDhnJTKAFpEOYnveo8tCA\na1PlcknKzNNtW86h6CqTKG2JNo8Fp04hnW3dWWYm6KIO/Xsb4xLDQ0uC94itNEV3\n260DoSJ5lQxk9AO8ehQSjN6MzwKBgQC803pVSOJl35GHy17mDq/wJZDsKx6Y7u2i\n7ecQjfRES6XiFv4Tbd9RuNyiGo+/oShXKuSAh3QD/J6bf5+0rC+j7nK+8Q3HP+Qk\n2XOx9HI/jOkcPlJgUOYfPxLSNt8w5ZhprJn+NTVwk3oMNNCcVVVPGHMXlvzh5hJf\nlLRnaWy+QQKBgBC1GFZpeLImeNOADEjjL12BbNTfme2Ola9sjk9BAJHLo1bVd9r/\nYVcMsU8uYy1Xl0XOzKNsb9Y9jVl2cZAybygO+qyrmxXR2nKsOdV4UCZuknLQ4bXj\nsrAZrHyah+tlyIo/8PS5kXz7L1QFy8UOf2SMf41dt1pHMoD8Yu5jLMz1AoGAfERI\ny/utUxHw+ocyqwCbdNWkLGisOEV1irY6TMC/Mnr+bm5nQ24Ze/TG7r/APoLWw5bs\nzlFWXpFP6FHzTrnKmH4Ccfq98JTxlfatlz2iOoSHnRi+qbhT2dhukH2gINPYnCMF\nLTDjPHUx6vqPF3NpMyaKB8pMHnaFPPXmS/ArqoECgYEAwpVJfJyP8yy6QSqdRsbK\niNZDO+3OIk8uv7lzVKF5VW6dGXVKhYucsWEUKrFrbDeaZ0MpBvhG7CdTcPFLrKYg\nCRu6Y8x98aw/3PdEpb3PR3dHxQTPUsr8KddRKqHyke2J241BGQriuV91ApNb543p\nWvU/XwT+gofAOdOIPo+u0Kc=\n-----END PRIVATE KEY-----\n",
  "client_email": "notify@neovim-btw.iam.gserviceaccount.com",
  "client_id": "102927605157219477742",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/notify%40neovim-btw.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
`))

	config := &firebase.Config{ProjectID: "neovim-btw"}
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		l.Fatalln(err)
	}
	msgr, err := app.Messaging(context.Background())
	if err != nil {
		l.Fatalln(err)
	}

	go func(msgr *messaging.Client) {
		for {
			randTime := rand.Intn(15)*30 + 15
			l.Printf("sleep time %d\n", randTime)
			time.Sleep(time.Duration(randTime) * time.Second)
			id, err := SendNotification(msgr, "StandUp", "Time to stand up and exercise", rand.Intn(100000000))
			if err != nil {
				l.Printf("sending %s notification %s", id, err.Error())
			} else {
				l.Printf("sending %s notification %s", id, "no-error")
			}
		}
	}(msgr)

	r := mux.NewRouter()
	r.Path("/register").Methods("POST", "OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "https://neovim-btw.web.app")
		w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Expose-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		b, err := io.ReadAll(r.Body)
		var data RegisterClient
		err = json.Unmarshal(b, &data)
		if err != nil {
			l.Printf("err 400: body was not json: %s\n", string(b))
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		resp, err := msgr.SubscribeToTopic(context.Background(), []string{data.Token}, "all")
		if err != nil {
			l.Printf("err: on subscribe to topic %s\n", err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if resp.FailureCount == 1 {
			l.Printf("err: on subscribe to topic %s\n", resp.Errors[0].Reason)
			http.Error(w, resp.Errors[0].Reason, http.StatusInternalServerError)
			return
		}
		l.Printf("successfully registered %s device\n", data.Token)
		w.WriteHeader(http.StatusAccepted)

	})
	handlers.LoggingHandler(os.Stdout, r)
	l.Println("listening on :8080")
	l.Fatalln(http.ListenAndServe(":8080", r))

}
