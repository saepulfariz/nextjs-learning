"use client";

import Link from "next/link";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ece9ff 0%, #f8f8ff 100%)",
          color: "#333",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "6rem",
            margin: 0,
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#6c63ff",
            textShadow: "0 2px 12px #d1d1ff",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "2rem",
            margin: "16px 0 8px 0",
            fontWeight: 500,
          }}
        >
          Halaman Tidak Ditemukan
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
            marginBottom: 32,
          }}
        >
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>
        <Link
          href="/"
          style={{
            padding: "12px 32px",
            background: "#6c63ff",
            color: "#fff",
            borderRadius: "24px",
            textDecoration: "none",
            fontWeight: 600,
            boxShadow: "0 2px 8px #e0e0ff",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#5548c8")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#6c63ff")}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </>
  );
};

export default NotFound;
