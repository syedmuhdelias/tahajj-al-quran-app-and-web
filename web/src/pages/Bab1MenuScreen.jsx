import { useNavigate } from 'react-router-dom';
import { Bab1SectionType } from '../constants/bab1SectionTypes.js';

/**
 * CONVERSION: lib/Bab1MenuScreen.dart — SectionGroup/SectionItem data unchanged.
 */
const sectionGroups = [
  {
    header: 'ASAS',
    sections: [
      {
        title: 'Huruf Hijaiyyah',
        type: Bab1SectionType.hurufHijaiyyah,
      },
    ],
  },
  {
    header: 'SATU SUKUKATA',
    sections: [
      { title: 'Fathah', type: Bab1SectionType.satuSukukataFathah },
      { title: 'Kasrah', type: Bab1SectionType.satuSukukataKasrah },
      { title: 'Dhommah', type: Bab1SectionType.satuSukukataDhommah },
      { title: 'Fathatain', type: Bab1SectionType.satuSukukataFathatain },
      { title: 'Kasrotain', type: Bab1SectionType.satuSukukataKasrotain },
      { title: 'Dhommatain', type: Bab1SectionType.satuSukukataDhommatain },
    ],
  },
  {
    header: 'MADD',
    sections: [{ title: 'Madd', type: Bab1SectionType.madd }],
  },
  {
    header: 'SUKUN',
    sections: [{ title: 'Sukun', type: Bab1SectionType.sukun }],
  },
  {
    header: 'DUA SUKUKATA',
    sections: [{ title: 'Dua Sukukata', type: Bab1SectionType.duaSukukata }],
  },
];

export default function Bab1MenuScreen() {
  const navigate = useNavigate();

  function openSection(section) {
    navigate(`/bab1/section/${section.type}`, {
      state: { sectionTitle: section.title },
    });
  }

  function openBab1Pdf() {
    navigate('/pdf?path=' + encodeURIComponent('assets/pdf/BAB1.pdf'));
  }

  return (
    <>
      <header className="app-bar app-bar--center">
        <button
          type="button"
          className="app-bar__back"
          onClick={() => navigate(-1)}
          aria-label="Kembali"
        >
          ←
        </button>
        <h1 className="app-bar__title">BAB 1 - Menu</h1>
      </header>
      <main className="page-bg-light">
        <div className="page-inner">
          {sectionGroups.map((group, groupIndex) => (
            <section key={group.header}>
              <h2
                className={
                  groupIndex > 0
                    ? 'menu-group-heading menu-group-heading--spaced'
                    : 'menu-group-heading'
                }
              >
                {group.header}
              </h2>
              {group.sections.map((section) => (
                <SectionCard
                  key={section.type}
                  title={section.title}
                  onOpen={() => openSection(section)}
                />
              ))}
            </section>
          ))}
          <div style={{ height: 20 }} />
          <PdfVersionCard onOpen={openBab1Pdf} />
        </div>
      </main>
    </>
  );
}

function SectionCard({ title, onOpen }) {
  return (
    <article className="menu-card">
      <button type="button" className="menu-card__btn" onClick={onOpen}>
        <span className="menu-card__label">{title}</span>
        <span className="menu-card__chevron" aria-hidden>
          <ChevronRight />
        </span>
      </button>
    </article>
  );
}

function PdfVersionCard({ onOpen }) {
  return (
    <article className="menu-card">
      <button type="button" className="menu-card__btn menu-card__btn--pdf" onClick={onOpen}>
        <span className="menu-card__icon" aria-hidden>
          <PdfIcon />
        </span>
        <span className="menu-card__body">
          <span className="menu-card__label menu-card__label--block">
            Bab 1 (Versi PDF)
          </span>
          <span className="menu-card__sub">Lihat versi asal dalam PDF</span>
        </span>
        <span className="menu-card__chevron" aria-hidden>
          <ChevronRight />
        </span>
      </button>
    </article>
  );
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#2e7d32" aria-hidden>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#2e7d32" aria-hidden>
      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v4zm4-3H19v4h-1.5v-4zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
    </svg>
  );
}
