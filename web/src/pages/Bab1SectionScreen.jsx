import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Bab1SectionType,
  ALL_SECTION_TYPES,
} from '../constants/bab1SectionTypes.js';
import { arabicQuranTextStyle } from '../utils/arabicFonts.js';
import { publicUrl } from '../utils/publicUrl.js';

/**
 * CONVERSION: lib/Bab1SectionScreen.dart — StatefulWidget → hooks.
 * Audio: Flutter assets/audio/* → public/assets/audio/ (sync-assets script).
 */

const TITLE_BY_TYPE = {
  [Bab1SectionType.hurufHijaiyyah]: 'Huruf Hijaiyyah',
  [Bab1SectionType.satuSukukataFathah]: 'Fathah',
  [Bab1SectionType.satuSukukataKasrah]: 'Kasrah',
  [Bab1SectionType.satuSukukataDhommah]: 'Dhommah',
  [Bab1SectionType.satuSukukataFathatain]: 'Fathatain',
  [Bab1SectionType.satuSukukataKasrotain]: 'Kasrotain',
  [Bab1SectionType.satuSukukataDhommatain]: 'Dhommatain',
  [Bab1SectionType.madd]: 'Madd',
  [Bab1SectionType.sukun]: 'Sukun',
  [Bab1SectionType.duaSukukata]: 'Dua Sukukata',
};

const hurufHijaiyyahRows = [
  [
    { letter: 'ا', audio: '001-alif.mp3' },
    { letter: 'ب', audio: '002-ba.mp3' },
    { letter: 'ت', audio: '003-taa.mp3' },
  ],
  [
    { letter: 'ث', audio: '004-tha.mp3' },
    { letter: 'ج', audio: '005-jeem.mp3' },
    { letter: 'ح', audio: '006-haa.mp3' },
  ],
  [
    { letter: 'خ', audio: '007-khaa.mp3' },
    { letter: 'د', audio: '008-dal.mp3' },
    { letter: 'ذ', audio: '009-dhal.mp3' },
  ],
  [
    { letter: 'ر', audio: '010-raa.mp3' },
    { letter: 'ز', audio: '011-jaa.mp3' },
    { letter: 'س', audio: '012-seen.mp3' },
  ],
  [
    { letter: 'ش', audio: '013-sheen.mp3' },
    { letter: 'ص', audio: '014-saad.mp3' },
    { letter: 'ض', audio: '015-dhaad.mp3' },
  ],
  [
    { letter: 'ط', audio: '016-toa.mp3' },
    { letter: 'ظ', audio: '017-dhaa.mp3' },
    { letter: 'ع', audio: '018-ain.mp3' },
  ],
  [
    { letter: 'غ', audio: '019-ghain.mp3' },
    { letter: 'ف', audio: '020-faa.mp3' },
    { letter: 'ق', audio: '021-qaaf.mp3' },
  ],
  [
    { letter: 'ك', audio: '022-kaaf.mp3' },
    { letter: 'ل', audio: '023-laam.mp3' },
    { letter: 'م', audio: '024-meem.mp3' },
  ],
  [
    { letter: 'ن', audio: '025-noon.mp3' },
    { letter: 'و', audio: '026-waw.mp3' },
    { letter: 'ه', audio: '027-ha.mp3' },
  ],
  [
    { letter: 'ء', audio: '028-hamza.mp3' },
    { letter: 'ي', audio: '029-yaa.mp3' },
  ],
];

const satuSukuFathahList = [
  'بَ',
  'تَ',
  'ثَ',
  'جَ',
  'حَ',
  'خَ',
  'دَ',
  'ذَ',
  'رَ',
  'زَ',
  'سَ',
  'شَ',
  'صَ',
  'ضَ',
  'طَ',
  'ظَ',
  'عَ',
  'غَ',
  'فَ',
  'قَ',
  'كَ',
  'لَ',
  'مَ',
  'نَ',
  'وَ',
  'هَ',
  'يَ',
];

const satuSukuFathahRows = [
  ['بَ', 'تَ', 'ثَ'],
  ['جَ', 'حَ', 'خَ'],
  ['دَ', 'ذَ', 'رَ'],
];

const satuSukuKasrahRows = [
  ['بِ', 'تِ', 'ثِ'],
  ['جِ', 'حِ', 'خِ'],
  ['دِ', 'ذِ', 'رِ'],
];

const satuSukuDhommahRows = [
  ['بُ', 'تُ', 'ثُ'],
  ['جُ', 'حُ', 'خُ'],
  ['دُ', 'ذُ', 'رُ'],
];

const satuSukuFathatainRows = [
  ['بً', 'تً', 'ثً'],
  ['جً', 'حً', 'خً'],
  ['دً', 'ذً', 'رً'],
];

const satuSukuKasrotainRows = [
  ['بٍ', 'تٍ', 'ثٍ'],
  ['جٍ', 'حٍ', 'خٍ'],
  ['دٍ', 'ذٍ', 'رٍ'],
];

const satuSukuDhommatainRows = [
  ['بٌ', 'تٌ', 'ثٌ'],
  ['جٌ', 'حٌ', 'خٌ'],
  ['دٌ', 'ذٌ', 'رٌ'],
];

const maddRows = [
  ['بَا', 'تَا', 'ثَا'],
  ['بِي', 'تِي', 'ثِي'],
  ['بُو', 'تُو', 'ثُو'],
];

const sukunRows = [
  ['بْ', 'تْ', 'ثْ'],
  ['جْ', 'حْ', 'خْ'],
  ['دْ', 'ذْ', 'رْ'],
];

const duaSukuRows = [
  ['بَتْ', 'بَثْ', 'بَجْ'],
  ['بِتْ', 'بِثْ', 'بِجْ'],
  ['بُتْ', 'بُثْ', 'بُجْ'],
  ['بَتًا', 'بِتٍ', 'بُتٌ'],
  ['بَتَا', 'بِتِي', 'بُتُو'],
];

export default function Bab1SectionScreen() {
  const { sectionType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const resolvedTitle =
    location.state?.sectionTitle ??
    TITLE_BY_TYPE[sectionType] ??
    'BAB 1';

  const hasAudio = sectionType === Bab1SectionType.hurufHijaiyyah;
  const [activeIndex, setActiveIndex] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const onEnded = () => setActiveIndex(null);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playAudio = useCallback(
    async (assetPath) => {
      if (!hasAudio) return;
      const audio = audioRef.current;
      if (!audio) return;
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.src = publicUrl(`assets/audio/${assetPath}`);
        await audio.play();
      } catch (e) {
        console.error('Error playing audio:', e);
      }
    },
    [hasAudio]
  );

  if (!sectionType || !ALL_SECTION_TYPES.has(sectionType)) {
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
          <h1 className="app-bar__title">Ralat</h1>
        </header>
        <main className="page-bg-light">
          <div className="page-inner" style={{ paddingTop: 24 }}>
            <p>Jenis seksyen tidak sah.</p>
            <button type="button" className="btn-elevated" onClick={() => navigate('/bab1')}>
              Ke menu BAB 1
            </button>
          </div>
        </main>
      </>
    );
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
        <h1 className="app-bar__title">{resolvedTitle}</h1>
      </header>
      <main className="page-bg-light">
        <div className="page-inner page-inner--tiles">
          <SectionContent
            sectionType={sectionType}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            playAudio={playAudio}
          />
        </div>
      </main>
    </>
  );
}

function SectionContent({
  sectionType,
  activeIndex,
  setActiveIndex,
  playAudio,
}) {
  switch (sectionType) {
    case Bab1SectionType.hurufHijaiyyah:
      return (
        <HurufHijaiyyahGrid
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          playAudio={playAudio}
        />
      );
    case Bab1SectionType.satuSukukataFathah:
      return <SatuSukuFathahGrid />;
    case Bab1SectionType.satuSukukataKasrah:
      return <RowColumns rows={satuSukuKasrahRows} />;
    case Bab1SectionType.satuSukukataDhommah:
      return <RowColumns rows={satuSukuDhommahRows} />;
    case Bab1SectionType.satuSukukataFathatain:
      return <RowColumns rows={satuSukuFathatainRows} />;
    case Bab1SectionType.satuSukukataKasrotain:
      return <RowColumns rows={satuSukuKasrotainRows} />;
    case Bab1SectionType.satuSukukataDhommatain:
      return <RowColumns rows={satuSukuDhommatainRows} />;
    case Bab1SectionType.madd:
      return <RowColumns rows={maddRows} />;
    case Bab1SectionType.sukun:
      return <RowColumns rows={sukunRows} />;
    case Bab1SectionType.duaSukukata:
      return <RowColumns rows={duaSukuRows} />;
    default:
      return null;
  }
}

function HurufHijaiyyahGrid({ activeIndex, setActiveIndex, playAudio }) {
  const flatList = hurufHijaiyyahRows.flat();

  return (
    <div className="glass-tiles-wrap">
      <div className="glass-tiles-grid" dir="rtl">
        {flatList.map((item, index) => (
          <SectionHurufCard
            key={`${item.letter}-${item.audio}`}
            letter={item.letter}
            audioPath={item.audio}
            isActive={activeIndex === index}
            onTap={() => {
              setActiveIndex(index);
              playAudio(item.audio);
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * CONVERSION: Flutter used GridView for Fathah list; _satuSukuFathahRows exists in Dart
 * but _buildSatuSukuFathah uses _satuSukuFathahList — preserved that behavior.
 */
function SatuSukuFathahGrid() {
  return (
    <div className="glass-tiles-wrap">
      <div className="glass-tiles-grid" dir="rtl">
        {satuSukuFathahList.map((text) => (
          <SukuKataInteractiveCard
            key={text}
            text={text}
            onTap={() => {
              /* CONVERSION: placeholder — "Audio can be added here later" in Dart */
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RowColumns({ rows }) {
  return (
    <div className="glass-tiles-wrap glass-tiles-wrap--rows">
      <div dir="rtl" className="glass-row-stack">
        {rows.map((row, ri) => (
          <div key={ri} dir="rtl" className="glass-row">
            {row.map((text) => (
              <div key={text} className="glass-row__cell">
                <SukuKataCard text={text} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Glass tile default; green fill only while active (audio playing). */
function SectionHurufCard({ letter, audioPath, isActive, onTap }) {
  return (
    <button
      type="button"
      className={`glass-tile tile-interactive${isActive ? ' glass-tile--active' : ''}`}
      onClick={onTap}
      aria-label={`Main bunyi ${letter}`}
      aria-pressed={isActive}
    >
      <span
        dir="rtl"
        className="glass-tile__glyph"
        style={arabicQuranTextStyle({ fontWeight: 800, lineHeight: 1.6 })}
      >
        {letter}
      </span>
      <span className="visually-hidden">{audioPath}</span>
    </button>
  );
}

function SukuKataInteractiveCard({ text, onTap }) {
  const [isPressed, setIsPressed] = useState(false);

  async function handleTap() {
    setIsPressed(true);
    await new Promise((r) => setTimeout(r, 80));
    setIsPressed(false);
    onTap();
  }

  return (
    <button
      type="button"
      className={`glass-tile tile-interactive${isPressed ? ' glass-tile--pressed' : ''}`}
      onClick={handleTap}
    >
      <span
        dir="rtl"
        className="glass-tile__glyph"
        style={arabicQuranTextStyle({ fontWeight: 800, lineHeight: 1.6 })}
      >
        {text}
      </span>
    </button>
  );
}

function SukuKataCard({ text }) {
  return (
    <div className="glass-tile-readonly">
      <span
        dir="rtl"
        className="glass-tile__glyph"
        style={arabicQuranTextStyle({ fontWeight: 700, lineHeight: 1.6 })}
      >
        {text}
      </span>
    </div>
  );
}
