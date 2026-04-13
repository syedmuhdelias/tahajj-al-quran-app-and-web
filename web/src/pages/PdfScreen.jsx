import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { publicUrl } from '../utils/publicUrl.js';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

/**
 * Bundled worker (Vite ?url) keeps pdf.js version in sync.
 * PDF bytes are loaded via fetch + Uint8Array so pdf.js does not use Range requests
 * against the Vite dev server (those can return HTTP 204 and break the viewer).
 */
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export default function PdfScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pdfPath = searchParams.get('path') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [docKey, setDocKey] = useState(0);
  const [pdfData, setPdfData] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 800
  );

  const fileUrl = useMemo(() => {
    if (!pdfPath) return null;
    const trimmed = pdfPath.replace(/^\//, '');
    return publicUrl(trimmed);
  }, [pdfPath]);

  useEffect(() => {
    function onResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!fileUrl) {
      setPdfData(null);
      setIsLoading(false);
      return undefined;
    }

    let cancelled = false;
    setIsLoading(true);
    setErrorMessage(null);
    setNumPages(null);
    setPdfData(null);

    fetch(fileUrl, { cache: 'no-store' })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 204) {
          throw new Error(
            'Tiada kandungan (HTTP 204). Pastikan PDF ada dalam web/public/assets/pdf/ — dalam folder web jalankan: npm run sync-assets'
          );
        }
        if (!res.ok) {
          throw new Error(
            `HTTP ${res.status}. Jika 404, jalankan npm run sync-assets (folder web) supaya fail disalin dari projek Flutter.`
          );
        }
        const buf = await res.arrayBuffer();
        if (!buf.byteLength) {
          throw new Error('Fail PDF kosong (0 bait).');
        }
        if (cancelled) return;
        setPdfData(new Uint8Array(buf));
      })
      .catch((err) => {
        if (!cancelled) {
          setIsLoading(false);
          setErrorMessage(`Gagal memuat PDF.\n${err.message}`);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fileUrl, docKey]);

  const onDocumentLoadSuccess = useCallback(({ numPages: n }) => {
    setNumPages(n);
    setIsLoading(false);
    setErrorMessage(null);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    setIsLoading(false);
    setErrorMessage(`Gagal membuka PDF.\n${err?.message || String(err)}`);
  }, []);

  const retry = useCallback(() => {
    setIsLoading(true);
    setErrorMessage(null);
    setNumPages(null);
    setPdfData(null);
    setDocKey((k) => k + 1);
  }, []);

  const pageWidth = Math.min(800, Math.max(280, viewportWidth - 32));

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
        <h1 className="app-bar__title">Baca</h1>
      </header>
      <main className="pdf-screen-main">
        {!pdfPath ? (
          <div style={{ padding: 24, color: '#fff', textAlign: 'center' }}>
            Tiada fail PDF ditentukan. Gunakan parameter <code>path</code>.
          </div>
        ) : errorMessage != null ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: 480 }}>
              <ErrorIcon />
              <p
                style={{
                  whiteSpace: 'pre-wrap',
                  fontSize: 16,
                  color: '#fff',
                  margin: '16px 0',
                }}
              >
                {errorMessage}
              </p>
              <button type="button" className="btn-elevated" onClick={retry}>
                Cuba Lagi
              </button>
            </div>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                  background: 'rgba(82, 82, 82, 0.85)',
                }}
              >
                <div
                  role="status"
                  aria-label="Memuatkan"
                  style={{
                    width: 40,
                    height: 40,
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#2e7d32',
                    borderRadius: '50%',
                    animation: 'pdf-spin 0.8s linear infinite',
                  }}
                />
                <style>{`
                  @keyframes pdf-spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            ) : null}
            <div className="pdf-screen-scroll">
              {pdfData ? (
                <Document
                  key={docKey}
                  file={{ data: pdfData }}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null}
                >
                  {numPages
                    ? Array.from({ length: numPages }, (_, i) => (
                        <div key={`page_${i + 1}`} className="pdf-page-wrap">
                          <Page
                            pageNumber={i + 1}
                            width={pageWidth}
                            renderTextLayer
                            renderAnnotationLayer
                          />
                        </div>
                      ))
                    : null}
                </Document>
              ) : null}
            </div>
          </>
        )}
      </main>
    </>
  );
}

function ErrorIcon() {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 24 24"
      fill="#ef5350"
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}
