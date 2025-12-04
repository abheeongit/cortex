import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-6xl font-black mb-4">404</h1>
      <p className="mb-6">This page went missing in the cosmos.</p>
      <Link to="/" className="px-4 py-2 rounded-md bg-indigo-600">Go Home</Link>
    </div>
  );
}
