import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';
import 'Bab1MenuScreen.dart';
import 'arabic_fonts.dart';

class Bab1SectionScreen extends StatefulWidget {
  final Bab1SectionType sectionType;
  final String sectionTitle;

  const Bab1SectionScreen({
    super.key,
    required this.sectionType,
    required this.sectionTitle,
  });

  @override
  State<Bab1SectionScreen> createState() => _Bab1SectionScreenState();
}

class _Bab1SectionScreenState extends State<Bab1SectionScreen> {
  late final AudioPlayer _audioPlayer;
  int? _activeIndex;

  bool get _hasAudio => widget.sectionType == Bab1SectionType.hurufHijaiyyah;

  // Huruf Hijaiyyah layout (rows) with audio mapping
  // Adjust row grouping/order to match the PDF exactly if needed.
  static const List<List<Map<String, String>>> _hurufHijaiyyahRows = [
    [
      {'letter': 'ا', 'audio': '001-alif.mp3'},
      {'letter': 'ب', 'audio': '002-ba.mp3'},
      {'letter': 'ت', 'audio': '003-taa.mp3'},
    ],
    [
      {'letter': 'ث', 'audio': '004-tha.mp3'},
      {'letter': 'ج', 'audio': '005-jeem.mp3'},
      {'letter': 'ح', 'audio': '006-haa.mp3'},
    ],
    [
      {'letter': 'خ', 'audio': '007-khaa.mp3'},
      {'letter': 'د', 'audio': '008-dal.mp3'},
      {'letter': 'ذ', 'audio': '009-dhal.mp3'},
    ],
    [
      {'letter': 'ر', 'audio': '010-raa.mp3'},
      {'letter': 'ز', 'audio': '011-jaa.mp3'},
      {'letter': 'س', 'audio': '012-seen.mp3'},
    ],
    [
      {'letter': 'ش', 'audio': '013-sheen.mp3'},
      {'letter': 'ص', 'audio': '014-saad.mp3'},
      {'letter': 'ض', 'audio': '015-dhaad.mp3'},
    ],
    [
      {'letter': 'ط', 'audio': '016-toa.mp3'},
      {'letter': 'ظ', 'audio': '017-dhaa.mp3'},
      {'letter': 'ع', 'audio': '018-ain.mp3'},
    ],
    [
      {'letter': 'غ', 'audio': '019-ghain.mp3'},
      {'letter': 'ف', 'audio': '020-faa.mp3'},
      {'letter': 'ق', 'audio': '021-qaaf.mp3'},
    ],
    [
      {'letter': 'ك', 'audio': '022-kaaf.mp3'},
      {'letter': 'ل', 'audio': '023-laam.mp3'},
      {'letter': 'م', 'audio': '024-meem.mp3'},
    ],
    [
      {'letter': 'ن', 'audio': '025-noon.mp3'},
      {'letter': 'و', 'audio': '026-waw.mp3'},
      {'letter': 'ه', 'audio': '027-ha.mp3'},
    ],
    [
      {'letter': 'ء', 'audio': '028-hamza.mp3'},
      {'letter': 'ي', 'audio': '029-yaa.mp3'},
    ],
  ];

  // Satu Sukukata layouts (no audio) - adjust rows to match PDF
  static const List<String> _satuSukuFathahList = [
    'بَ', 'تَ', 'ثَ', 'جَ', 'حَ', 'خَ',
    'دَ', 'ذَ', 'رَ', 'زَ', 'سَ', 'شَ',
    'صَ', 'ضَ', 'طَ', 'ظَ', 'عَ', 'غَ',
    'فَ', 'قَ', 'كَ', 'لَ', 'مَ', 'نَ',
    'وَ', 'هَ', 'يَ'
  ];

  static const List<List<String>> _satuSukuFathahRows = [
    ['بَ', 'تَ', 'ثَ'],
    ['جَ', 'حَ', 'خَ'],
    ['دَ', 'ذَ', 'رَ'],
  ];

  static const List<List<String>> _satuSukuKasrahRows = [
    ['بِ', 'تِ', 'ثِ'],
    ['جِ', 'حِ', 'خِ'],
    ['دِ', 'ذِ', 'رِ'],
  ];

  static const List<List<String>> _satuSukuDhommahRows = [
    ['بُ', 'تُ', 'ثُ'],
    ['جُ', 'حُ', 'خُ'],
    ['دُ', 'ذُ', 'رُ'],
  ];

  static const List<List<String>> _satuSukuFathatainRows = [
    ['بً', 'تً', 'ثً'],
    ['جً', 'حً', 'خً'],
    ['دً', 'ذً', 'رً'],
  ];

  static const List<List<String>> _satuSukuKasrotainRows = [
    ['بٍ', 'تٍ', 'ثٍ'],
    ['جٍ', 'حٍ', 'خٍ'],
    ['دٍ', 'ذٍ', 'رٍ'],
  ];

  static const List<List<String>> _satuSukuDhommatainRows = [
    ['بٌ', 'تٌ', 'ثٌ'],
    ['جٌ', 'حٌ', 'خٌ'],
    ['دٌ', 'ذٌ', 'رٌ'],
  ];

  // Madd layout
  static const List<List<String>> _maddRows = [
    ['بَا', 'تَا', 'ثَا'],
    ['بِي', 'تِي', 'ثِي'],
    ['بُو', 'تُو', 'ثُو'],
  ];

  // Sukun layout
  static const List<List<String>> _sukunRows = [
    ['بْ', 'تْ', 'ثْ'],
    ['جْ', 'حْ', 'خْ'],
    ['دْ', 'ذْ', 'رْ'],
  ];

  // Dua Sukukata layout (all combinations) - example rows
  static const List<List<String>> _duaSukuRows = [
    ['بَتْ', 'بَثْ', 'بَجْ'],
    ['بِتْ', 'بِثْ', 'بِجْ'],
    ['بُتْ', 'بُثْ', 'بُجْ'],
    ['بَتًا', 'بِتٍ', 'بُتٌ'],
    ['بَتَا', 'بِتِي', 'بُتُو'],
  ];

  @override
  void initState() {
    super.initState();
    _audioPlayer = AudioPlayer();
    _audioPlayer.onPlayerComplete.listen((_) {
      if (!mounted) return;
      setState(() {
        _activeIndex = null;
      });
    });
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  Future<void> _playAudio(String assetPath) async {
    if (!_hasAudio) return;
    try {
      await _audioPlayer.stop();
      await _audioPlayer.play(AssetSource('audio/$assetPath'));
    } catch (e) {
      debugPrint('Error playing audio: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.sectionTitle,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: const Color(0xFF2E7D32),
        foregroundColor: Colors.white,
        elevation: 4,
        centerTitle: true,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color(0xFFE8F5E9),
              Color(0xFFC8E6C9),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: _buildContent(),
          ),
        ),
      ),
    );
  }

  Widget _buildContent() {
    switch (widget.sectionType) {
      case Bab1SectionType.hurufHijaiyyah:
        return _buildHurufHijaiyyah();
      case Bab1SectionType.satuSukukataFathah:
        return _buildSatuSukuFathah();
      case Bab1SectionType.satuSukukataKasrah:
        return _buildRows(_satuSukuKasrahRows);
      case Bab1SectionType.satuSukukataDhommah:
        return _buildRows(_satuSukuDhommahRows);
      case Bab1SectionType.satuSukukataFathatain:
        return _buildRows(_satuSukuFathatainRows);
      case Bab1SectionType.satuSukukataKasrotain:
        return _buildRows(_satuSukuKasrotainRows);
      case Bab1SectionType.satuSukukataDhommatain:
        return _buildRows(_satuSukuDhommatainRows);
      case Bab1SectionType.madd:
        return _buildRows(_maddRows);
      case Bab1SectionType.sukun:
        return _buildRows(_sukunRows);
      case Bab1SectionType.duaSukukata:
        return _buildRows(_duaSukuRows);
    }
  }

  Widget _buildHurufHijaiyyah() {
    final flatList = _hurufHijaiyyahRows.expand((row) => row).toList();

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 520),
        child: Directionality(
          textDirection: TextDirection.rtl,
          child: GridView.builder(
            padding: const EdgeInsets.all(20),
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 1,
            ),
            itemCount: flatList.length,
            itemBuilder: (context, index) {
              final item = flatList[index];
              final isActive = _activeIndex == index;

              return HurufCard(
                letter: item['letter']!,
                audioPath: item['audio']!,
                isActive: isActive,
                onTap: () {
                  setState(() {
                    _activeIndex = index;
                  });
                  _playAudio(item['audio']!);
                },
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _buildSatuSukuFathah() {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 520),
        child: Directionality(
          textDirection: TextDirection.rtl,
          child: GridView.builder(
            padding: const EdgeInsets.all(20),
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 1,
            ),
            itemCount: _satuSukuFathahList.length,
            itemBuilder: (context, index) {
              final text = _satuSukuFathahList[index];
              return SukuKataInteractiveCard(
                text: text,
                onTap: () {
                  // Audio can be added here later
                },
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _buildRows(List<List<String>> rows) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final row in rows) ...[
            Row(
              textDirection: TextDirection.rtl,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (final text in row)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 6.0),
                    child: SukuKataCard(text: text),
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class HurufCard extends StatelessWidget {
  final String letter;
  final String audioPath;
  final VoidCallback onTap;
  final bool isActive;

  const HurufCard({
    super.key,
    required this.letter,
    required this.audioPath,
    required this.onTap,
    required this.isActive,
  });

  @override
  Widget build(BuildContext context) {
    final bgColors = isActive
        ? const [Color(0xFF2E7D32), Color(0xFF1B5E20)]
        : const [Color(0xFFB9F6CA), Color(0xFFA5D6A7)];

    final boxShadow = isActive
        ? const [
            BoxShadow(
              color: Color(0x80227F3B),
              blurRadius: 12,
              offset: Offset(0, 4),
              spreadRadius: 1,
            ),
          ]
        : const [
            BoxShadow(
              color: Color(0x33227F3B),
              blurRadius: 4,
              offset: Offset(0, 2),
            ),
          ];

    return AnimatedScale(
      scale: isActive ? 1.05 : 1.0,
      duration: const Duration(milliseconds: 150),
      curve: Curves.easeOut,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(18),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(18),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(18),
                gradient: LinearGradient(
                  colors: bgColors,
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: boxShadow,
              ),
              child: Center(
                child: Directionality(
                  textDirection: TextDirection.rtl,
                  child: Text(
                    letter,
                    textAlign: TextAlign.center,
                    style: arabicQuranTextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w800,
                      color: isActive ? Colors.white : const Color(0xFF1B5E20),
                      height: 1.6,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class SukuKataInteractiveCard extends StatefulWidget {
  final String text;
  final VoidCallback onTap;

  const SukuKataInteractiveCard({
    super.key,
    required this.text,
    required this.onTap,
  });

  @override
  State<SukuKataInteractiveCard> createState() => _SukuKataInteractiveCardState();
}

class _SukuKataInteractiveCardState extends State<SukuKataInteractiveCard> {
  bool _isPressed = false;

  Future<void> _handleTap() async {
    setState(() => _isPressed = true);
    await Future.delayed(const Duration(milliseconds: 80));
    if (mounted) {
      setState(() => _isPressed = false);
    }
    widget.onTap();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedScale(
      scale: _isPressed ? 0.94 : 1.0,
      duration: const Duration(milliseconds: 120),
      curve: Curves.easeOut,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(18),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: _handleTap,
            borderRadius: BorderRadius.circular(18),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(18),
                gradient: const LinearGradient(
                  colors: [
                    Color(0xFFB9F6CA),
                    Color(0xFFA5D6A7),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x33227F3B),
                    blurRadius: 4,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              child: Center(
                child: Directionality(
                  textDirection: TextDirection.rtl,
                  child: Text(
                    widget.text,
                    textAlign: TextAlign.center,
                    style: arabicQuranTextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF1B5E20),
                      height: 1.6,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class SukuKataCard extends StatelessWidget {
  final String text;

  const SukuKataCard({
    super.key,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: const LinearGradient(
          colors: [
            Color(0xFFE8F5E9),
            Color(0xFFC8E6C9),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x1F000000),
            blurRadius: 3,
            offset: Offset(0, 1),
          ),
        ],
      ),
      child: Center(
        child: Directionality(
          textDirection: TextDirection.rtl,
          child: Text(
            text,
            textAlign: TextAlign.center,
            style: arabicQuranTextStyle(
              fontSize: 52,
              fontWeight: FontWeight.w700,
              color: const Color(0xFF1B5E20),
              height: 1.6,
            ),
          ),
        ),
      ),
    );
  }
}

