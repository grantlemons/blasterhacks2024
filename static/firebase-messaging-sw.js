// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log('[firebase-messaging-sw.js] Received background message', payload);
	let data = payload.data;

	let localStorage = window.localStorage;
	localStorage.setItem('workout_seed', data.workout_seed);
	localStorage.setItem('timestamp', data.timestamp);
});
