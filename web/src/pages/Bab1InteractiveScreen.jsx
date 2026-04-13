import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { arabicQuranTextStyle } from '../utils/arabicFonts.js';
import { publicUrl } from '../utils/publicUrl.js';

/**
 * CONVERSION: lib/Bab1InteractiveScreen.dart — not used in Flutter main.dart; full parity.
 */

const hurufList = [
  { letter: 'ا', sound: '001-alif.mp3' },
  { letter: 'ب', sound: '002-ba.mp3' },
  { letter: 'ت', sound: '003-taa.mp3' },
  { letter: 'ث', sound: '004-tha.mp3' },
  { letter: 'ج', sound: '005-jeem.mp3' },
  { letter: 'ح', sound: '006-haa.mp3' },
  { letter: 'خ', sound: '007-khaa.mp3' },
  { letter: 'د', sound: '008-dal.mp3' },
  { letter: 'ذ', sound: '009-dhal.mp3' },
  { letter: 'ر', sound: '010-raa.mp3' },
  { letter: 'ز', sound: '011-jaa.mp3' },
  { letter: 'س', sound: '012-seen.mp3' },
  { letter: 'ش', sound: '013-sheen.mp3' },
  { letter: 'ص', sound: '014-saad.mp3' },
  { letter: 'ض', sound: '015-dhaad.mp3' },
  { letter: 'ط', sound: '016-toa.mp3' },
  { letter: 'ظ', sound: '017-dhaa.mp3' },
  { letter: 'ع', sound: '018-ain.mp3' },
  { letter: 'غ', sound: '019-ghain.mp3' },
  { letter: 'ف', sound: '020-faa.mp3' },
  { letter: 'ق', sound: '021-qaaf.mp3' },
  { letter: 'ك', sound: '022-kaaf.mp3' },
  { letter: 'ل', sound: '023-laam.mp3' },
  { letter: 'م', sound: '024-meem.mp3' },
  { letter: 'ن', sound: '025-noon.mp3' },
  { letter: 'و', sound: '026-waw.mp3' },
  { letter: 'ه', sound: '027-ha.mp3' },
  { letter: 'ء', sound: '028-hamza.mp3' },
  { letter: 'ي', sound: '029-yaa.mp3' },
];

function calculateCrossAxisCount(width) {
  if (width >= 900) return 6;
  if (width >= 600) return 5;
  return 3;
}

/** CONVERSION: Flutter childAspectRatio → CSS aspect-ratio on cells (approximate). */
function gridCellAspectRatio(width) {
  if (width >= 900) return 0.9;
  if (width >= 600) return 0.85;
  return 0.8;
}

export default function Bab1InteractiveScreen() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 600
  );

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    function onResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const playHurufSound = useCallback(async (fileName) => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.src = publicUrl(`assets/audio/${fileName}`);
      await audio.play();
    } catch (e) {
      console.error('Error playing audio:', e);
    }
  }, []);

  const crossAxisCount = calculateCrossAxisCount(viewportWidth);
  const aspect = gridCellAspectRatio(viewportWidth);

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
        <h1 className="app-bar__title">BAB 1 - Huruf Hijaiyyah</h1>
      </header>
      <main className="page-bg-light" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <p className="interactive-hint">Sentuh huruf untuk mendengar bunyinya</p>
        <div style={{ height: 8 }} />
        <div
          className="page-inner page-inner--tiles"
          style={{
            flex: 1,
            overflow: 'auto',
            paddingTop: 8,
            paddingBottom: 20,
          }}
        >
          <div className="glass-tiles-wrap">
            <div
              className="glass-tiles-grid"
              style={{
                gridTemplateColumns: `repeat(${crossAxisCount}, minmax(0, 1fr))`,
              }}
            >
              {hurufList.map((huruf) => (
                <InteractiveHurufCard
                  key={huruf.sound}
                  letter={huruf.letter}
                  soundFileName={huruf.sound}
                  aspectRatio={aspect}
                  onTap={() => playHurufSound(huruf.sound)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/** Glass tiles + press state (no solid green at rest). */
function InteractiveHurufCard({ letter, soundFileName, aspectRatio, onTap }) {
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
      className={`glass-tile glass-tile--free-ratio tile-interactive${
        isPressed ? ' glass-tile--pressed' : ''
      }`}
      onClick={handleTap}
      aria-label={`Main bunyi ${letter}`}
      style={{ aspectRatio: String(aspectRatio) }}
    >
      <span
        dir="rtl"
        className="glass-tile__glyph"
        style={arabicQuranTextStyle({ fontWeight: 800, lineHeight: 1.05 })}
      >
        {letter}
      </span>
      <span className="visually-hidden">{soundFileName}</span>
    </button>
  );
}
