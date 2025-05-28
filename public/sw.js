// Custom service worker for handling push notifications
// This will be generated in the public directory during build

// Listen for push events
self.addEventListener('push', (event) => {
  let notificationData = {};
  
  try {
    // Try to parse the data from the push event
    notificationData = event.data.json();
  } catch (e) {
    // If parsing fails, use default content
    notificationData = {
      title: 'Optik LOOV',
      body: 'Ada pemberitahuan baru untuk Anda',
      icon: '/pwa-192x192.png'
    };
  }
  
  // Show the notification
  const showNotification = self.registration.showNotification(
    notificationData.title || 'Optik LOOV', 
    {
      body: notificationData.body || 'Ada pemberitahuan baru untuk Anda',
      icon: notificationData.icon || '/pwa-192x192.png',
      badge: '/apple-touch-icon.png',
      data: notificationData.data || {}
    }
  );
  
  // Wait until the notification is shown
  event.waitUntil(showNotification);
});

// Listen for notification clicks
self.addEventListener('notificationclick', (event) => {
  // Close the notification
  event.notification.close();
  
  // Get the URL to open from the notification data, or use default URL
  const urlToOpen = event.notification.data.url || '/';
  
  // Open the URL
  const openUrl = clients.matchAll({
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
  });
  
  event.waitUntil(openUrl);
});

// Listen for subscription change event
self.addEventListener('pushsubscriptionchange', (event) => {
  // Handle subscription change if needed
  // This is for when the subscription is expired or changed
  console.log('Subscription changed', event);
});
