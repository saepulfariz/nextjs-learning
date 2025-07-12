"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi kirim pesan
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage("Pesan berhasil terkirim!");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Info Kontak */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Hubungi Kami
        </h1>

        <hr className="mb-6" />
        <div className="text-center text-lg text-gray-700 dark:text-gray-300 mb-4">
          <p className="font-medium">Nama: Saepul Hidayat</p>
          <p className="font-medium">Email: saepulhidayat302@gmail.com</p>
          <p className="font-medium">
            GitHub:
            <a
              href="https://github.com/saepulfariz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/saepulfariz
            </a>
          </p>
          <p className="font-medium">
            Instagram:
            <a
              href="https://instagram.com/saepulfariz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @saepulfariz
            </a>
          </p>
          <p className="font-medium">
            LinkedIn:
            <a
              href="https://linkedin.com/in/saepul-hidayat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              linkedin.com/in/saepul-hidayat
            </a>
          </p>
        </div>
      </div>
      <hr className="mb-6" />

      {/* Status Message */}
      {statusMessage && (
        <div className="mb-6 text-center text-green-600 dark:text-green-400">
          {statusMessage}
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
          />
        </div>

        {/* Pesan */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            required
            className="w-full mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
          />
        </div>

        {/* Tombol Kirim */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 mt-4 rounded-md font-semibold text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-600`}
          >
            {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </div>
      </form>
    </div>
  );
}
