/** CONVERSION: Dart enum Bab1SectionType → string union for URLs and switch. */
export const Bab1SectionType = {
  hurufHijaiyyah: 'hurufHijaiyyah',
  satuSukukataFathah: 'satuSukukataFathah',
  satuSukukataKasrah: 'satuSukukataKasrah',
  satuSukukataDhommah: 'satuSukukataDhommah',
  satuSukukataFathatain: 'satuSukukataFathatain',
  satuSukukataKasrotain: 'satuSukukataKasrotain',
  satuSukukataDhommatain: 'satuSukukataDhommatain',
  madd: 'madd',
  sukun: 'sukun',
  duaSukukata: 'duaSukukata',
};

export const ALL_SECTION_TYPES = new Set(Object.values(Bab1SectionType));
