// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBC63M7ZuzHIkxDKVOWOicKkuds0dcDiNQ",
  authDomain: "loov-bd942.firebaseapp.com",
  projectId: "loov-bd942",
  storageBucket: "loov-bd942.firebasestorage.app",
  messagingSenderId: "672250563936",
  appId: "1:672250563936:web:7863dd4640a6ec0346e205",
  measurementId: "G-7X9X0X0YT8"
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
