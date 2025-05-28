// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC63M7ZuzHIkxDKVOWOicKkuds0dcDiNQ",
  authDomain: "loov-bd942.firebaseapp.com",
  projectId: "loov-bd942",
  storageBucket: "loov-bd942.firebasestorage.app",
  messagingSenderId: "672250563936",
  appId: "1:672250563936:web:7863dd4640a6ec0346e205",
  measurementId: "G-7X9X0X0YT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Function to request notification permission and get FCM token
export const requestNotificationPermissionAndToken = async () => {
  try {
    // Request permission
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }
    
    // Get FCM token
    // Note: You'll need to generate a VAPID key from Firebase Console
    // Project Settings > Cloud Messaging > Web Push certificates
    const token = await getToken(messaging, {
      vapidKey: 'BIb15bWKykwYL0HnDCkdZ-6z5BnttJZZVQO8HmShXsXQHx7Sv13pAQarDFgf8vMZyarb8lbj5X4_-lcw_-m-v-k' // Replace with your actual VAPID key
    });
    
    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('No registration token available');
      return null;
    }
  } catch (error) {
    console.error('Error getting notification permission or token:', error);
    return null;
  }
};

// Function to handle foreground messages
export const setupMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);
    
    // Show notification when app is in foreground
    if (payload.notification) {
      const { title, body } = payload.notification;
      
      new Notification(title, {
        body,
        icon: '/pwa-192x192.png'
      });
    }
  });
};

export { app, messaging, db, analytics };
