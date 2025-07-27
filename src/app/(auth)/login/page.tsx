"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoaderSpinner from "@/app/ui/loader-spinner";
import BaseAlert from "@/app/ui/base-alert";

export default function LoginPage() {
  const router = useRouter(); // tambahkan ini

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });

  const [loading, setLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      console.log("Login error:", res.error);
      setAlert({
        type: "error",
        message: res.error,
        isShow: true,
      });
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/dashboard"); // ganti ke halaman tujuanmu
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    const res = await signIn("google", {
      callbackUrl: "/dashboard", // arahkan ke dashboard setelah login berhasil
    });
    console.log(res, "Google sign-in response");
    if (res?.error) {
      setAlert({
        type: "error",
        message: res.error,
        isShow: true,
      });
      setIsLoadingGoogle(false);
    } else {
      router.push("/dashboard"); // ganti ke halaman tujuanmu
      setIsLoadingGoogle(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <div className="space-y-4">
          <div className="mb-6">
            {alert.isShow && <BaseAlert alert={alert} />}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              placeholder="Email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              type="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>

        <span className="mt-2 text-center flex w-full mb-2 justify-center">
          or
        </span>
        <button
          type="button"
          className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3 cursor-pointer mb-6"
          disabled={isLoadingGoogle}
          onClick={handleGoogleLogin}
        >
          {isLoadingGoogle ? "Loading" : "Login to your account Google"}
          {isLoadingGoogle && <LoaderSpinner />}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          {"Don't have an account?"}
          <Link href="/register" className="text-blue-500 hover:underline ml-1">
            Register here
          </Link>
        </p>
      </div>
    </>
  );
}
