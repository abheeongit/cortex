import React from "react";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white/5 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>Theme: <select className="bg-white/5 p-2 rounded"><option>Galaxy</option><option>Aurora</option><option>Neon</option></select></div>
          <div>Account: demo@cortex.local</div>
          <Link to="/" className="inline-block mt-4 px-4 py-2 bg-indigo-600 rounded">Back</Link>
        </div>
      </div>
    </div>
  );
}
