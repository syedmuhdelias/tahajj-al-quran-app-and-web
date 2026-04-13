import 'package:flutter/material.dart';
import 'Bab1SectionScreen.dart';
import 'pdf_screen.dart';

enum Bab1SectionType {
  hurufHijaiyyah,
  satuSukukataFathah,
  satuSukukataKasrah,
  satuSukukataDhommah,
  satuSukukataFathatain,
  satuSukukataKasrotain,
  satuSukukataDhommatain,
  madd,
  sukun,
  duaSukukata,
}

class SectionItem {
  final String title;
  final Bab1SectionType type;

  const SectionItem({required this.title, required this.type});
}

class SectionGroup {
  final String header;
  final List<SectionItem> sections;

  const SectionGroup({required this.header, required this.sections});
}

class Bab1MenuScreen extends StatelessWidget {
  const Bab1MenuScreen({super.key});

  static const List<SectionGroup> _sectionGroups = [
    SectionGroup(
      header: 'ASAS',
      sections: [
        SectionItem(
          title: 'Huruf Hijaiyyah',
          type: Bab1SectionType.hurufHijaiyyah,
        ),
      ],
    ),
    SectionGroup(
      header: 'SATU SUKUKATA',
      sections: [
        SectionItem(
          title: 'Fathah',
          type: Bab1SectionType.satuSukukataFathah,
        ),
        SectionItem(
          title: 'Kasrah',
          type: Bab1SectionType.satuSukukataKasrah,
        ),
        SectionItem(
          title: 'Dhommah',
          type: Bab1SectionType.satuSukukataDhommah,
        ),
        SectionItem(
          title: 'Fathatain',
          type: Bab1SectionType.satuSukukataFathatain,
        ),
        SectionItem(
          title: 'Kasrotain',
          type: Bab1SectionType.satuSukukataKasrotain,
        ),
        SectionItem(
          title: 'Dhommatain',
          type: Bab1SectionType.satuSukukataDhommatain,
        ),
      ],
    ),
    SectionGroup(
      header: 'MADD',
      sections: [
        SectionItem(
          title: 'Madd',
          type: Bab1SectionType.madd,
        ),
      ],
    ),
    SectionGroup(
      header: 'SUKUN',
      sections: [
        SectionItem(
          title: 'Sukun',
          type: Bab1SectionType.sukun,
        ),
      ],
    ),
    SectionGroup(
      header: 'DUA SUKUKATA',
      sections: [
        SectionItem(
          title: 'Dua Sukukata',
          type: Bab1SectionType.duaSukukata,
        ),
      ],
    ),
  ];


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'BAB 1 - Menu',
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
          child: ListView(
            padding: const EdgeInsets.all(16.0),
            children: [
              ..._sectionGroups.asMap().entries.map((entry) {
                final groupIndex = entry.key;
                final group = entry.value;
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(
                        top: groupIndex > 0 ? 24.0 : 0,
                        bottom: 12.0,
                      ),
                      child: Text(
                        group.header,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1B5E20),
                        ),
                      ),
                    ),
                    ...group.sections
                        .map((section) => _buildSectionCard(context, section)),
                  ],
                );
              }),
              const SizedBox(height: 24),
              _buildPdfCard(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionCard(BuildContext context, SectionItem section) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8.0),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => Bab1SectionScreen(
                sectionType: section.type,
                sectionTitle: section.title,
              ),
            ),
          );
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          width: double.infinity,
          height: 70,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  section.title,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: Color(0xFF1B5E20),
                  ),
                ),
              ),
              const Icon(
                Icons.chevron_right,
                color: Color(0xFF2E7D32),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPdfCard(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8.0),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const PdfScreen(
                pdfPath: 'assets/pdf/BAB1.pdf',
              ),
            ),
          );
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          width: double.infinity,
          height: 70,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Row(
            children: [
              const Icon(
                Icons.picture_as_pdf,
                color: Color(0xFF2E7D32),
                size: 24,
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Bab 1 (Versi PDF)',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF1B5E20),
                      ),
                    ),
                    Text(
                      'Lihat versi asal dalam PDF',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey[600],
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(
                Icons.chevron_right,
                color: Color(0xFF2E7D32),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

