import React from 'react';
import AdminNotification from '../components/AdminNotification';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Optik LOOV Admin</h1>
        <AdminNotification />
      </div>
    </div>
  );
};

export default Admin;