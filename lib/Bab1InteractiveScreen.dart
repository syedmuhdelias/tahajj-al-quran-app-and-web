import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';
import 'arabic_fonts.dart';

const List<Map<String, String>> _hurufList = [
  {'letter': 'ا', 'sound': '001-alif.mp3'},
  {'letter': 'ب', 'sound': '002-ba.mp3'},
  {'letter': 'ت', 'sound': '003-taa.mp3'},
  {'letter': 'ث', 'sound': '004-tha.mp3'},
  {'letter': 'ج', 'sound': '005-jeem.mp3'},
  {'letter': 'ح', 'sound': '006-haa.mp3'},
  {'letter': 'خ', 'sound': '007-khaa.mp3'},
  {'letter': 'د', 'sound': '008-dal.mp3'},
  {'letter': 'ذ', 'sound': '009-dhal.mp3'},
  {'letter': 'ر', 'sound': '010-raa.mp3'},
  {'letter': 'ز', 'sound': '011-jaa.mp3'},
  {'letter': 'س', 'sound': '012-seen.mp3'},
  {'letter': 'ش', 'sound': '013-sheen.mp3'},
  {'letter': 'ص', 'sound': '014-saad.mp3'},
  {'letter': 'ض', 'sound': '015-dhaad.mp3'},
  {'letter': 'ط', 'sound': '016-toa.mp3'},
  {'letter': 'ظ', 'sound': '017-dhaa.mp3'},
  {'letter': 'ع', 'sound': '018-ain.mp3'},
  {'letter': 'غ', 'sound': '019-ghain.mp3'},
  {'letter': 'ف', 'sound': '020-faa.mp3'},
  {'letter': 'ق', 'sound': '021-qaaf.mp3'},
  {'letter': 'ك', 'sound': '022-kaaf.mp3'},
  {'letter': 'ل', 'sound': '023-laam.mp3'},
  {'letter': 'م', 'sound': '024-meem.mp3'},
  {'letter': 'ن', 'sound': '025-noon.mp3'},
  {'letter': 'و', 'sound': '026-waw.mp3'},
  {'letter': 'ه', 'sound': '027-ha.mp3'},
  {'letter': 'ء', 'sound': '028-hamza.mp3'},
  {'letter': 'ي', 'sound': '029-yaa.mp3'},
];

class Bab1InteractiveScreen extends StatefulWidget {
  const Bab1InteractiveScreen({super.key});

  @override
  State<Bab1InteractiveScreen> createState() => _Bab1InteractiveScreenState();
}

class _Bab1InteractiveScreenState extends State<Bab1InteractiveScreen> {
  late final AudioPlayer _audioPlayer;

  @override
  void initState() {
    super.initState();
    _audioPlayer = AudioPlayer();
  }

  Future<void> _playHurufSound(String fileName) async {
    try {
      await _audioPlayer.stop();
      await _audioPlayer.play(AssetSource('audio/$fileName'));
    } catch (e) {
      debugPrint('Error playing audio: $e');
    }
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  int _calculateCrossAxisCount(double width) {
    if (width >= 900) return 6;
    if (width >= 600) return 5;
    return 3;
  }

  double _calculateChildAspectRatio(double width) {
    if (width >= 900) return 0.9;
    if (width >= 600) return 0.85;
    return 0.8;
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final crossAxisCount = _calculateCrossAxisCount(size.width);
    final childAspectRatio = _calculateChildAspectRatio(size.width);

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'BAB 1 - Huruf Hijaiyyah',
          style: TextStyle(
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
          child: Column(
            children: [
              const Padding(
                padding: EdgeInsets.fromLTRB(16, 16, 16, 8),
                child: Text(
                  'Sentuh huruf untuk mendengar bunyinya',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Color(0xFF1B5E20),
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Expanded(
                child: GridView.builder(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: childAspectRatio,
                  ),
                  itemCount: _hurufList.length,
                  itemBuilder: (context, index) {
                    final huruf = _hurufList[index];
                    return HurufCard(
                      letter: huruf['letter']!,
                      soundFileName: huruf['sound']!,
                      onTap: () => _playHurufSound(huruf['sound']!),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class HurufCard extends StatefulWidget {
  final String letter;
  final String soundFileName;
  final VoidCallback onTap;

  const HurufCard({
    super.key,
    required this.letter,
    required this.soundFileName,
    required this.onTap,
  });

  @override
  State<HurufCard> createState() => _HurufCardState();
}

class _HurufCardState extends State<HurufCard> {
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
      child: Material(
        color: Colors.white,
        elevation: 4,
        shadowColor: const Color(0x80227F3B),
        borderRadius: BorderRadius.circular(20),
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          splashColor: const Color(0x332E7D32),
          highlightColor: const Color(0x112E7D32),
          onTap: _handleTap,
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              gradient: const LinearGradient(
                colors: [
                  Color(0xFFB9F6CA),
                  Color(0xFFA5D6A7),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Center(
              child: FittedBox(
                fit: BoxFit.scaleDown,
                child: Text(
                  widget.letter,
                  textAlign: TextAlign.center,
                    style: arabicQuranTextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF1B5E20),
                      height: 1.0,
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

