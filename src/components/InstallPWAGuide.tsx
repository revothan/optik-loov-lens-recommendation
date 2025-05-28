import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const InstallPWAGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if it's an iOS device
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOSDevice(iOS);

    // Check if the app is already in standalone mode (installed to home screen)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone || 
                      document.referrer.includes('android-app://');
    setIsStandalone(standalone);

    // Only show the guide if it's an iOS device and not already installed
    if (iOS && !standalone) {
      setIsVisible(true);
    }
  }, []);

  const dismissGuide = () => {
    setIsVisible(false);
    // Remember that the user has dismissed the guide
    localStorage.setItem('pwaBannerDismissed', 'true');
  };

  if (!isVisible || !isIOSDevice || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-200 p-4 z-50">
      <button 
        onClick={dismissGuide}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      
      <div className="flex flex-col items-center">
        <h3 className="font-semibold text-blue-800 mb-2">Aktifkan Notifikasi di iPhone</h3>
        <p className="text-blue-700 text-sm mb-3 text-center">
          Untuk menerima notifikasi, silakan tambahkan aplikasi ini ke layar utama Anda:
        </p>
        
        <ol className="text-blue-700 text-sm mb-3 list-decimal pl-5">
          <li className="mb-1">Tap ikon <span className="inline-block px-1">↑</span> di Safari</li>
          <li className="mb-1">Pilih "Add to Home Screen"</li>
          <li className="mb-1">Buka aplikasi dari layar utama</li>
          <li>Izinkan notifikasi saat diminta</li>
        </ol>
        
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={dismissGuide}
        >
          Mengerti
        </Button>
      </div>
    </div>
  );
};

export default InstallPWAGuide;