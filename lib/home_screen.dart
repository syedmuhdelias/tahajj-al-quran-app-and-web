import 'package:flutter/material.dart';
import 'pdf_screen.dart';
import 'Bab1MenuScreen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Asas Tahajji Al-Quran',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: const Color(0xFF2E7D32),
        elevation: 0,
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF2E7D32),
              Color(0xFF1B5E20),
            ],
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Image.asset(
                      'image/logo.png',
                      height: 150,
                      width: 150,
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Center(
                    child: Text(
                      'Selamat Datang',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Center(
                    child: Text(
                      'Pilih Bab untuk Mula Belajar',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                    ),
                  ),
                  const SizedBox(height: 40),
                  _buildSectionTitle('Asas'),
                  const SizedBox(height: 16),
                  _buildBab1Card(context),
                  const SizedBox(height: 12),
                  _buildButtonCard(
                    context,
                    'BAB 2 – Latihan Tahajji',
                    'assets/pdf/BAB2.pdf',
                    const Color(0xFF66BB6A),
                  ),
                  const SizedBox(height: 12),
                  _buildButtonCard(
                    context,
                    'BAB 3 – Latihan Makhraj',
                    'assets/pdf/BAB3.pdf',
                    const Color(0xFF81C784),
                  ),
                  const SizedBox(height: 12),
                  _buildButtonCard(
                    context,
                    'BAB 4 – Perbezaan Makhraj',
                    'assets/pdf/BAB4.pdf',
                    const Color(0xFFA5D6A7),
                  ),
                  const SizedBox(height: 32),
                  _buildSectionTitle('Nota & Teori'),
                  const SizedBox(height: 16),
                  _buildButtonCard(
                    context,
                    'BAB 5',
                    'assets/pdf/BAB5.pdf',
                    const Color(0xFF4CAF50),
                  ),
                  const SizedBox(height: 32),
                  _buildSectionTitle('Latihan Surah'),
                  const SizedBox(height: 16),
                  _buildButtonCard(
                    context,
                    'BAB 6',
                    'assets/pdf/BAB6.pdf',
                    const Color(0xFF4CAF50),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 22,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
    );
  }

  Widget _buildBab1Card(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const Bab1MenuScreen(),
            ),
          );
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          width: double.infinity,
          height: 70,
          decoration: BoxDecoration(
            color: const Color(0xFF4CAF50),
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Center(
            child: Text(
              'BAB 1 – Asas Tahajji',
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildButtonCard(
    BuildContext context,
    String title,
    String pdfPath,
    Color buttonColor,
  ) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => PdfScreen(
                pdfPath: pdfPath,
              ),
            ),
          );
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          width: double.infinity,
          height: 70,
          decoration: BoxDecoration(
            color: buttonColor,
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Center(
            child: Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ),
    );
  }
}
