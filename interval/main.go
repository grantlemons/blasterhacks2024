package main

import (
	"context"
	"fmt"
	"log"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

func main() {
	opt := option.WithCredentialsFile("neovim-btw-1b0034d44d78.json")
	config := &firebase.Config{ProjectID: "neovim-btw"}
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		log.Fatalln(err)
	}
	msgr, err := app.Messaging(context.Background())
	if err != nil {
		log.Fatalln(err)
	}
	something, err := msgr.Send(context.Background(), &messaging.Message{
		Notification: &messaging.Notification{
			Title: "Lets Fuckign GO!",
			Body:  "Time for a workout!",
		},
		Topic: "push_notifs",
	})
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(something)
}
