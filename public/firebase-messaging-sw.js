// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  // Replace with your actual Firebase config
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/pwa-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Also handle other service worker events
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  event.notification.close();
  
  // This is where you can handle notification clicks
  // For example, you can open a specific URL
  const urlToOpen = '/';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      const matchingClient = windowClients.find((client) => {
        return new URL(client.url).pathname === new URL(urlToOpen, self.location.href).pathname;
      });
      
      // If so, focus that window/tab
      if (matchingClient) {
        return matchingClient.focus();
      }
      
      // If not, open a new window/tab
      return clients.openWindow(urlToOpen);
    })
  );
});
