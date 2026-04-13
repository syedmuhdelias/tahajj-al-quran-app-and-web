import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Quran-style Arabic font family name.
///
/// When you add the KFGQPC font file to your project and register it in
/// `pubspec.yaml` under `flutter: fonts:`, keep the `family:` value exactly the
/// same as this constant.
const String kKfgqpcUthmanTahaNaskhFamily = 'KFGQPCUthmanTahaNaskh';

/// Toggle to use the bundled KFGQPC font (once you've added & registered it).
///
/// Set this to true to use the local KFGQPC font family registered in
/// `pubspec.yaml`. When false, we use a Google Fonts Arabic fallback (Amiri).
const bool kUseBundledKfgqpcFont = true;

TextStyle arabicQuranTextStyle({
  double? fontSize,
  FontWeight? fontWeight,
  Color? color,
  double? height,
}) {
  final fallback = GoogleFonts.amiri(
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color,
    height: height,
  );

  if (!kUseBundledKfgqpcFont) return fallback;

  // If the font isn't registered in pubspec.yaml yet, Flutter will silently
  // fall back to the default font.
  return fallback.copyWith(fontFamily: kKfgqpcUthmanTahaNaskhFamily);
}


