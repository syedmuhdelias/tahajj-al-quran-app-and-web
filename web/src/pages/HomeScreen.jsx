import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicUrl } from '../utils/publicUrl.js';

export default function HomeScreen() {
  const navigate = useNavigate();

  function goPdf(pdfPath) {
    navigate(`/pdf?path=${encodeURIComponent(pdfPath)}`);
  }

  function goBab1Menu() {
    navigate('/bab1');
  }

  return (
    <>
      <header className="app-bar app-bar--flat">
        <h1 className="app-bar__title app-bar__title--start">
          Asas Tahajji Al-Quran
        </h1>
      </header>
      <main className="home-main">
        <div className="home-inner">
          <BrandLogo />

          <div className="home-spacer-md" />
          <h2 className="home-headline">
            Welcome to Asas Tahajji Al-Quran
          </h2>
          <p className="home-sub">
            Selamat datang — pilih bab di bawah untuk mula belajar.
          </p>
          <div className="home-spacer-lg" />

          <div className="home-menu">
            <p className="home-menu-label">Menu</p>
            <div className="home-spacer-sm" />

            <SectionTitle>Asas</SectionTitle>
            <div className="home-spacer-md" />
            <Bab1Card onClick={goBab1Menu} />
            <div className="home-spacer-sm" />
            <PdfButtonCard
              title="BAB 2 – Latihan Tahajji"
              pdfPath="assets/pdf/BAB2.pdf"
              variant="asas-b"
              onOpen={goPdf}
            />
            <div className="home-spacer-sm" />
            <PdfButtonCard
              title="BAB 3 – Latihan Makhraj"
              pdfPath="assets/pdf/BAB3.pdf"
              variant="asas-c"
              onOpen={goPdf}
            />
            <div className="home-spacer-sm" />
            <PdfButtonCard
              title="BAB 4 – Perbezaan Makhraj"
              pdfPath="assets/pdf/BAB4.pdf"
              variant="asas-d"
              onOpen={goPdf}
            />
            <div className="home-spacer-lg" />

            <SectionTitle>Nota & Teori</SectionTitle>
            <div className="home-spacer-md" />
            <PdfButtonCard
              title="BAB 5"
              pdfPath="assets/pdf/BAB5.pdf"
              variant="section"
              onOpen={goPdf}
            />
            <div className="home-spacer-lg" />

            <SectionTitle>Latihan Surah</SectionTitle>
            <div className="home-spacer-md" />
            <PdfButtonCard
              title="BAB 6"
              pdfPath="assets/pdf/BAB6.pdf"
              variant="section"
              onOpen={goPdf}
            />
            <div className="home-spacer-md" />
          </div>
        </div>
      </main>
    </>
  );
}

function BrandLogo() {
  const [useFallback, setUseFallback] = useState(false);
  const primary = publicUrl('image/logo.png');
  const fallback = publicUrl('image/playstore_icon_512.png');

  return (
    <div className="home-logo-wrap">
      <img
        className="home-logo"
        src={useFallback ? fallback : primary}
        onError={() => setUseFallback(true)}
        alt=""
        width={160}
        height={160}
        decoding="async"
      />
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 className="home-section-title">{children}</h3>;
}

function Bab1Card({ onClick }) {
  return (
    <article className="action-card action-card--primary">
      <button
        type="button"
        className="action-card__btn action-card__label"
        onClick={onClick}
      >
        <span className="action-card__text">BAB 1 – Asas Tahajji</span>
      </button>
    </article>
  );
}

function PdfButtonCard({ title, pdfPath, variant = 'section', onOpen }) {
  return (
    <article className={`action-card action-card--${variant}`}>
      <button
        type="button"
        className="action-card__btn action-card__label"
        onClick={() => onOpen(pdfPath)}
      >
        <span className="action-card__text">{title}</span>
      </button>
    </article>
  );
}
