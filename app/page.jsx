
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setStatus('');
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/log-click`, {
        timestamp: new Date().toISOString(),
        action: 'button_clicked'
      });
      
      setStatus('Success! Entry added to MongoDB.');
    } catch (error) {
      console.error('Error logging click:', error);
      setStatus('Error: Failed to log click. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-md p-10 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">Simple Click Logger</h1>
        
        <button
          onClick={handleClick}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Log Click to MongoDB'}
        </button>
        
        {status && (
          <div className={`mt-4 p-3 rounded-md text-center ${
            status.startsWith('Success') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </div>
        )}
      </div>
    </main>
  );
}
