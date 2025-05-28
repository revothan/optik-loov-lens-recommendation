import React, { useState, useEffect } from 'react';
import { requestNotificationPermissionAndToken } from '../lib/firebase';
import { saveToken, getAllTokens } from '../lib/firestore';

const AdminNotification: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [notificationTitle, setNotificationTitle] = useState<string>('');
  const [notificationBody, setNotificationBody] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('');
  const [registeredDevices, setRegisteredDevices] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check for existing authentication
  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      fetchRegisteredDevicesCount();
    }
  }, []);

  // Fetch the count of registered devices
  const fetchRegisteredDevicesCount = async () => {
    try {
      const tokens = await getAllTokens();
      setRegisteredDevices(tokens.length);
    } catch (error) {
      console.error('Error fetching registered devices:', error);
    }
  };

  // Handle code verification
  const handleVerify = () => {
    if (code === '3374') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setMessage('Kode berhasil diverifikasi. Anda dapat mengirim notifikasi sekarang.');
      fetchRegisteredDevicesCount();
    } else {
      setMessage('Kode salah. Silakan coba lagi.');
    }
  };

  // Handle subscription to notifications
  const handleSubscribe = async () => {
    setIsLoading(true);
    setSubscriptionStatus('Meminta izin notifikasi...');
    
    try {
      const fcmToken = await requestNotificationPermissionAndToken();
      
      if (fcmToken) {
        setSubscriptionStatus('Token FCM diperoleh, menyimpan ke database...');
        
        const saved = await saveToken(fcmToken);
        
        if (saved) {
          setSubscriptionStatus('Berhasil berlangganan notifikasi!');
          fetchRegisteredDevicesCount();
        } else {
          setSubscriptionStatus('Gagal menyimpan token ke database.');
        }
      } else {
        setSubscriptionStatus('Gagal mendapatkan token FCM. Periksa izin notifikasi.');
      }
    } catch (error) {
      console.error('Error in subscription process:', error);
      setSubscriptionStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending notification to all devices
  const handleSendNotification = async () => {
    if (!notificationTitle) {
      setMessage('Judul notifikasi wajib diisi.');
      return;
    }

    setIsLoading(true);
    setMessage('Mengirim notifikasi ke semua perangkat...');

    try {
      // This would be your Firebase Cloud Function URL
      const functionUrl = 'https://us-central1-your-project-id.cloudfunctions.net/sendNotificationToAll';
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: notificationTitle,
          body: notificationBody || 'Notifikasi dari Optik LOOV',
          adminCode: '3374' // This should be securely handled in production
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage(`Notifikasi berhasil dikirim ke ${result.sent} dari ${result.total} perangkat!`);
        
        // Clear form
        setNotificationTitle('');
        setNotificationBody('');
      } else {
        setMessage(`Gagal mengirim notifikasi: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setMessage(`Gagal mengirim notifikasi: ${error.message}`);
    } finally {
      setIsLoading(false);
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
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Perangkat terdaftar: {registeredDevices}</span>
              <button
                onClick={fetchRegisteredDevicesCount}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                Refresh
              </button>
            </div>
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className={`w-full px-4 py-2 bg-green-500 text-white rounded-md ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
            >
              {isLoading ? 'Memproses...' : 'Daftarkan Perangkat Ini'}
            </button>
            {subscriptionStatus && (
              <p className="mt-2 text-sm text-gray-600">{subscriptionStatus}</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Kirim Notifikasi ke Semua Perangkat</h3>
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
            disabled={isLoading || registeredDevices === 0}
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${
              isLoading || registeredDevices === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Mengirim...' : 'Kirim Notifikasi ke Semua Perangkat'}
          </button>
          
          {message && (
            <p className={`mt-4 text-sm ${message.includes('berhasil') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
          
          {registeredDevices === 0 && (
            <p className="mt-2 text-xs text-amber-600">
              Tidak ada perangkat terdaftar. Daftarkan perangkat ini atau tambahkan perangkat lain terlebih dahulu.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNotification;