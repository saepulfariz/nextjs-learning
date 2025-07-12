import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="max-w-xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Tentang Saya</h1>
        <hr className="mb-6" />

        <div className="mb-6 flex justify-center">
          <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-gray-300">
            <Image
              src="/assets/images/saepulfariz.jpg" // Ganti dengan nama file foto kamu
              alt="Foto Profil"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          Saya adalah seseorang yang memiliki semangat tinggi dalam belajar.
          Bagi saya, kerja keras dan terus belajar adalah kunci untuk mencapai
          kehidupan yang lebih baik. Setiap hari saya berusaha menjadi versi
          terbaik dari diri saya sendiri demi masa depan yang lebih cerah.
        </p>
      </div>
    </>
  );
}
