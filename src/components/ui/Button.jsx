import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button className={`px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 ${className}`} {...props}>
      {children}
    </button>
  );
}
