/**
 * CONVERSION: Mirrors lib/arabic_fonts.dart — Amiri as Google Fonts fallback;
 * KFGQPCUthmanTahaNaskh if you register @font-face in index.css (kUseBundledKfgqpcFont).
 */
export const kKfgqpcUthmanTahaNaskhFamily = 'KFGQPCUthmanTahaNaskh';

/** Set false to use only Amiri (same toggle intent as Dart). */
export const kUseBundledKfgqpcFont = true;

/**
 * @param {object} opts
 * @param {number} [opts.fontSize]
 * @param {number|string} [opts.fontWeight]
 * @param {string} [opts.color]
 * @param {number} [opts.lineHeight] — maps to Flutter TextStyle.height
 */
export function arabicQuranTextStyle({
  fontSize,
  fontWeight,
  color,
  lineHeight,
} = {}) {
  const fontFamily = kUseBundledKfgqpcFont
    ? `'${kKfgqpcUthmanTahaNaskhFamily}', 'Amiri', serif`
    : `'Amiri', serif`;

  return {
    fontFamily,
    fontSize: fontSize != null ? `${fontSize}px` : undefined,
    fontWeight: fontWeight ?? undefined,
    color: color ?? undefined,
    lineHeight: lineHeight != null ? String(lineHeight) : undefined,
  };
}
