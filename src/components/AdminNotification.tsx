import React, { useState } from 'react';
import { sendNotification, requestNotificationPermission, subscribeToPushNotifications } from '../lib/notificationUtils';

const AdminNotification: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [notificationTitle, setNotificationTitle] = useState<string>('');
  const [notificationBody, setNotificationBody] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('');

  // Handle code verification
  const handleVerify = () => {
    if (code === '3374') {
      setIsAuthenticated(true);
      setMessage('Kode berhasil diverifikasi. Anda dapat mengirim notifikasi sekarang.');
    } else {
      setMessage('Kode salah. Silakan coba lagi.');
    }
  };

  // Handle subscription to notifications
  const handleSubscribe = async () => {
    setSubscriptionStatus('Meminta izin notifikasi...');
    const permissionGranted = await requestNotificationPermission();
    
    if (permissionGranted) {
      setSubscriptionStatus('Izin diberikan, mendaftarkan subscription...');
      const subscription = await subscribeToPushNotifications();
      
      if (subscription) {
        setSubscriptionStatus('Berhasil berlangganan notifikasi!');
      } else {
        setSubscriptionStatus('Gagal berlangganan notifikasi.');
      }
    } else {
      setSubscriptionStatus('Izin notifikasi ditolak.');
    }
  };

  // Handle sending notification
  const handleSendNotification = async () => {
    if (!notificationTitle) {
      setMessage('Judul notifikasi wajib diisi.');
      return;
    }

    try {
      await sendNotification(notificationTitle, {
        body: notificationBody || 'Notifikasi dari Optik LOOV',
      });
      setMessage('Notifikasi berhasil dikirim!');
      
      // Clear form
      setNotificationTitle('');
      setNotificationBody('');
    } catch (error) {
      console.error('Error sending notification:', error);
      setMessage('Gagal mengirim notifikasi. Lihat konsol untuk detail.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Admin Notifikasi</h2>
      
      {!isAuthenticated ? (
        <div>
          <p className="mb-4">Masukkan kode untuk mengakses halaman admin:</p>
          <div className="flex gap-2 mb-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Masukkan kode"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <button
              onClick={handleVerify}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Verifikasi
            </button>
          </div>
          {message && <p className="text-red-500 mb-2">{message}</p>}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Langganan Notifikasi</h3>
            <button
              onClick={handleSubscribe}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Minta Izin Notifikasi
            </button>
            {subscriptionStatus && (
              <p className="mt-2 text-sm text-gray-600">{subscriptionStatus}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Kirim Notifikasi</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Notifikasi*
                </label>
                <input
                  id="title"
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="Judul notifikasi"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                  Isi Notifikasi
                </label>
                <textarea
                  id="body"
                  value={notificationBody}
                  onChange={(e) => setNotificationBody(e.target.value)}
                  placeholder="Isi notifikasi (opsional)"
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSendNotification}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Kirim Notifikasi
          </button>
          
          {message && (
            <p className={`mt-4 text-sm ${message.includes('berhasil') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNotification;