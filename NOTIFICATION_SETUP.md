# Optik LOOV PWA Push Notification Setup

This document explains how to set up and use push notifications for the Optik LOOV Lens Recommendation PWA.

## Overview

The push notification system allows you to send notifications to all users who have installed the PWA and granted notification permission. This is implemented using Firebase Cloud Messaging (FCM) and Firebase Cloud Functions.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Add a web app to your Firebase project
4. Take note of your Firebase configuration (apiKey, authDomain, etc.)

### 2. Update Firebase Configuration

Replace the placeholder values in these files with your actual Firebase configuration:

- `src/lib/firebase.ts`
- `public/firebase-messaging-sw.js`

### 3. Set up Firebase Cloud Messaging

1. In Firebase Console, go to Project Settings
2. Go to the Cloud Messaging tab
3. Generate a new Web Push certificate
4. Copy the VAPID key and replace `YOUR_VAPID_KEY` in `src/lib/firebase.ts`

### 4. Deploy Firebase Cloud Functions

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`
4. Select "Functions" when prompted
5. Deploy the function: `firebase deploy --only functions`
6. Copy the function URL and update it in `src/components/AdminNotification.tsx`

## How to Use

### Register Devices

1. Each user needs to install the PWA and grant notification permission
2. This is done by visiting the admin page and clicking "Daftarkan Perangkat Ini"
3. Users on iOS must add the app to their home screen first

### Send Notifications

1. Visit the admin page at `/admin`
2. Enter the code: `3374`
3. Fill in the notification title and body
4. Click "Kirim Notifikasi ke Semua Perangkat"
5. The notification will be sent to all registered devices

## Troubleshooting

### iOS Devices Not Receiving Notifications

- Ensure iOS version is 16.4 or newer
- Make sure the PWA is installed to the home screen
- Open the app from the home screen, not from Safari
- Check that notification permission is granted in iOS settings

### Android Devices Not Receiving Notifications

- Ensure notification permission is granted
- Check that the service worker is registered correctly
- Make sure the device has an internet connection

### No Devices Registered

- Check the Firebase Console to verify FCM is set up correctly
- Ensure users have granted notification permission
- Check Firestore to see if tokens are being saved correctly

## Maintenance

- Periodically check for expired or invalid tokens in Firestore
- Update the Firebase dependencies when new versions are released
- Monitor the Firebase Console for any issues with messaging

## Security Considerations

- The admin code (`3374`) is used for basic protection, but for a production app, consider implementing proper authentication
- The FCM tokens are stored in Firestore - ensure proper security rules are set
- The Cloud Function should validate the admin code to prevent unauthorized notification sending

## Additional Resources

- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [Firebase Cloud Functions Documentation](https://firebase.google.com/docs/functions)
- [Web Push Notifications Guide](https://web.dev/articles/push-notifications-overview)
