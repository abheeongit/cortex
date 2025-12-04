import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // placeholder: login flow -> later call backend
    console.log("login", { email, password });
    nav("/universe");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4">Sign in to Cortex</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-md bg-white/3" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 rounded-md bg-white/3" />
          <button className="w-full py-3 rounded-md bg-indigo-600 font-semibold">Sign In</button>
        </form>
        <p className="mt-4 text-sm text-slate-300">Don’t have an account? <Link to="/register" className="text-indigo-400">Register</Link></p>
      </div>
    </div>
  );
}
