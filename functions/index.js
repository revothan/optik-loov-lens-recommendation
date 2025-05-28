// functions/index.js
// This file would be deployed to Firebase Cloud Functions

/**
 * This is a reference implementation for a Firebase Cloud Function 
 * that would send notifications to all registered devices.
 * 
 * To use this, you would need to:
 * 1. Set up Firebase Cloud Functions in your project
 * 2. Deploy this function to Firebase
 * 3. Call this function from your admin panel
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Send a notification to all registered devices
 * 
 * Triggered by an HTTP request:
 * https://us-central1-your-project-id.cloudfunctions.net/sendNotificationToAll
 * 
 * Request body:
 * {
 *   "title": "Notification Title",
 *   "body": "Notification Body",
 *   "adminCode": "3374" // Security check
 * }
 */
exports.sendNotificationToAll = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }
  
  // Ensure this is a POST request
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  
  try {
    const { title, body, adminCode } = req.body;
    
    // Check required fields
    if (!title || !body) {
      res.status(400).send('Missing required fields: title and body');
      return;
    }
    
    // Verify admin code
    if (adminCode !== '3374') {
      res.status(403).send('Unauthorized: Invalid admin code');
      return;
    }
    
    // Get all tokens from Firestore
    const snapshot = await admin.firestore().collection('notification_tokens').get();
    
    if (snapshot.empty) {
      res.status(404).send('No notification tokens found');
      return;
    }
    
    // Extract tokens
    const tokens = snapshot.docs.map(doc => doc.data().token);
    
    // Prepare notification message
    const message = {
      notification: {
        title,
        body,
      },
      data: {
        url: '/',
        clickAction: 'FLUTTER_NOTIFICATION_CLICK',
      },
      tokens,
    };
    
    // Send multicast message to all tokens
    const response = await admin.messaging().sendMulticast(message);
    
    console.log('Notifications sent successfully:', response);
    
    // Return response with success count
    res.status(200).json({
      success: true,
      sent: response.successCount,
      failed: response.failureCount,
      total: tokens.length,
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send(`Error sending notifications: ${error.message}`);
  }
});

// Example usage (this would be called from your frontend):
/*
fetch('https://us-central1-your-project-id.cloudfunctions.net/sendNotificationToAll', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Sale!',
    body: 'Get 20% off on all lenses this weekend!',
    adminCode: '3374'
  }),
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
*/
