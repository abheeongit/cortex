import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("register", { username, email, password });
    nav("/universe");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full p-3 rounded-md bg-white/3" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-md bg-white/3" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 rounded-md bg-white/3" />
          <button className="w-full py-3 rounded-md bg-indigo-600 font-semibold">Create account</button>
        </form>
      </div>
    </div>
  );
}
