"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import "../app/globals.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/Login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <form onSubmit={handleSignup} className="mt-4">
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:rind-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:rind-2 focus:ring-blue-500"/>
            </div>
            <button type="submit" disabled={loading} className="w-full mt-6 bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition">{loading ? "Signing up..." : "Sign up"}</button>
        </form>
        <p className="text-center text-gray-600 mt-4">Already have an account?{" "}<a href="/Login" className="text-blue-500 hover:underline">Login</a></p>
      </div>
    </div>
  );
}
