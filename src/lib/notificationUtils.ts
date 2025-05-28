// src/lib/notificationUtils.ts

/**
 * Function to request notification permission from the user
 * @returns Promise<boolean> - Whether permission was granted
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Subscribe to push notifications
 * @returns Promise<PushSubscription | null> - The push subscription object or null if failed
 */
export const subscribeToPushNotifications = async (): Promise<PushSubscription | null> => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications are not supported by this browser');
    return null;
  }

  try {
    // Get the service worker registration
    const registration = await navigator.serviceWorker.ready;
    
    // Get the push subscription
    let subscription = await registration.pushManager.getSubscription();
    
    // If no subscription exists, create one
    if (!subscription) {
      // Generate VAPID keys on your server and replace these placeholder values
      // For testing, you can use a service like https://web-push-codelab.glitch.me/
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
      
      // Convert the public key to an array buffer
      const applicationServerKey = urlB64ToUint8Array(vapidPublicKey);
      
      // Create a new subscription
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });
    }
    
    // Store the subscription on your server
    await saveSubscription(subscription);
    
    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
};

/**
 * Function to save the subscription to local storage
 * In a real app, this would send the subscription to your server
 * @param subscription - The push subscription object
 */
export const saveSubscription = async (subscription: PushSubscription): Promise<void> => {
  // For this example, we'll just save to localStorage
  // In a real app, you would send this to your server
  localStorage.setItem('pushSubscription', JSON.stringify(subscription));
  
  // You would normally do something like this:
  // await fetch('/api/save-subscription', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(subscription),
  // });
};

/**
 * Send a notification to all subscribed users
 * @param title - The title of the notification
 * @param options - Additional options for the notification
 */
export const sendNotification = async (title: string, options: NotificationOptions = {}): Promise<void> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return;
  }
  
  if (Notification.permission === 'granted') {
    // For testing purposes, we'll show a notification directly
    // In a real app, this would be triggered from your server
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      body: options.body || 'Notifikasi dari Optik LOOV',
      icon: options.icon || '/pwa-192x192.png',
      ...options
    });
  }
};

/**
 * Utility function to convert a base64 string to Uint8Array
 * @param base64String - Base64 encoded string
 * @returns Uint8Array
 */
function urlB64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}
