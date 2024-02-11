package main

import (
	"context"
	"strconv"
	"time"

	"firebase.google.com/go/v4/messaging"
)

func SendNotification(msgr *messaging.Client, title string, body string, workout int) (string, error) {
	msg := &messaging.Message{
		Data: map[string]string{
			"workout_seed": strconv.Itoa(workout),
			"timestamp":    time.Now().Format(time.RFC3339),
		},
		Webpush: &messaging.WebpushConfig{
			Notification: &messaging.WebpushNotification{
				Title:              title,
				Body:               body,
				RequireInteraction: true,
			},
			FCMOptions: &messaging.WebpushFCMOptions{
				Link: "https://neovim-btw.web.app/workout",
			},
		},
		Notification: &messaging.Notification{
			Title: title,
			Body:  body,
		},
		Topic: "all",
	}
	something, err := msgr.Send(context.Background(), msg)
	if err != nil {
		return "", err
	}
	return something, nil
}
