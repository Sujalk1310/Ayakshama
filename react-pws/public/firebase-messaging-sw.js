importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDF2ggxTlHs9jOZng2CTG7ZbdB23OfgchU",
  authDomain: "test-e3771.firebaseapp.com",
  projectId: "test-e3771",
  storageBucket: "test-e3771.appspot.com",
  messagingSenderId: "305329559705",
  appId: "1:305329559705:web:b3e216d28390f1d0098008",
  measurementId: "G-XL32TW8KCP"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });