import React from "react";

export function Button({ className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-bold transition";
  const variants = {
    default: "bg-green-500 text-black hover:bg-green-400",
    secondary: "bg-blue-600 text-white hover:bg-blue-500",
    ghost: "bg-transparent text-white hover:bg-white/10",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props} />
  );
}

