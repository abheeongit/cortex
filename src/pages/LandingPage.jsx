import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <header className="w-full max-w-5xl flex justify-between items-center py-6">
        <div className="text-2xl font-bold">Cortex</div>
        <nav className="space-x-4">
          <Link to="/login" className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700">Get Started</Link>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-extrabold mb-4">Cortex — Your 3D Memory Universe</h1>
        <p className="text-lg text-slate-300 max-w-2xl mb-8">
          Turn notes into planets, connect ideas, navigate your knowledge in 3D. Build a memory palace that actually looks like a spaceship.
        </p>
        <Link to="/universe" className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-black font-semibold">
          Enter Cortex
        </Link>
      </main>

      <footer className="w-full max-w-5xl py-6 text-sm text-slate-400">
        Built with ❤️ — frontend-first prototype
      </footer>
    </div>
  );
}
