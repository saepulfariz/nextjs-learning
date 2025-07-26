"use client";

import { useState } from "react";
import Link from "next/link";
import { set } from "zod";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      alert("Register success");
      setLoading(false);
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    } else {
      setLoading(false);
      alert(data.error || "Register failed");
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>
        <div className="space-y-4">
          <input
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
          <input
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            type="email"
          />
          <input
            placeholder="Password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?
          <Link href="/login" className="text-blue-500 hover:underline ml-1">
            Login here
          </Link>
        </p>
      </div>
    </>
  );
}
