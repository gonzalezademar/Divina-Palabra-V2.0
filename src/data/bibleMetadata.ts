export interface BookMetadata {
  id: string;
  nameEs: string;
  nameEn: string;
  chapters: number;
}

export const bibleBooks: BookMetadata[] = [
  // Antiguo Testamento / Old Testament
  { id: "genesis", nameEs: "Génesis", nameEn: "Genesis", chapters: 50 },
  { id: "exodo", nameEs: "Éxodo", nameEn: "Exodus", chapters: 40 },
  { id: "levitico", nameEs: "Levítico", nameEn: "Leviticus", chapters: 27 },
  { id: "numeros", nameEs: "Números", nameEn: "Numbers", chapters: 36 },
  { id: "deuteronomio", nameEs: "Deuteronomio", nameEn: "Deuteronomy", chapters: 34 },
  { id: "josue", nameEs: "Josué", nameEn: "Joshua", chapters: 24 },
  { id: "jueces", nameEs: "Jueces", nameEn: "Judges", chapters: 21 },
  { id: "rut", nameEs: "Rut", nameEn: "Ruth", chapters: 4 },
  { id: "1samuel", nameEs: "1 Samuel", nameEn: "1 Samuel", chapters: 31 },
  { id: "2samuel", nameEs: "2 Samuel", nameEn: "2 Samuel", chapters: 24 },
  { id: "1reyes", nameEs: "1 Reyes", nameEn: "1 Kings", chapters: 22 },
  { id: "2reyes", nameEs: "2 Reyes", nameEn: "2 Kings", chapters: 25 },
  { id: "1cronicas", nameEs: "1 Crónicas", nameEn: "1 Chronicles", chapters: 29 },
  { id: "2cronicas", nameEs: "2 Crónicas", nameEn: "2 Chronicles", chapters: 36 },
  { id: "esdras", nameEs: "Esdras", nameEn: "Ezra", chapters: 10 },
  { id: "nehemias", nameEs: "Nehemías", nameEn: "Nehemiah", chapters: 13 },
  { id: "ester", nameEs: "Ester", nameEn: "Esther", chapters: 10 },
  { id: "job", nameEs: "Job", nameEn: "Job", chapters: 42 },
  { id: "salmos", nameEs: "Salmos", nameEn: "Psalms", chapters: 150 },
  { id: "proverbios", nameEs: "Proverbios", nameEn: "Proverbs", chapters: 31 },
  { id: "eclesiastes", nameEs: "Eclesiastés", nameEn: "Ecclesiastes", chapters: 12 },
  { id: "cantares", nameEs: "Cantares", nameEn: "Song of Solomon", chapters: 8 },
  { id: "isaias", nameEs: "Isaías", nameEn: "Isaiah", chapters: 66 },
  { id: "jeremias", nameEs: "Jeremías", nameEn: "Jeremiah", chapters: 52 },
  { id: "lamentaciones", nameEs: "Lamentaciones", nameEn: "Lamentations", chapters: 5 },
  { id: "ezequiel", nameEs: "Ezequiel", nameEn: "Ezekiel", chapters: 48 },
  { id: "daniel", nameEs: "Daniel", nameEn: "Daniel", chapters: 12 },
  { id: "oseas", nameEs: "Oseas", nameEn: "Hosea", chapters: 14 },
  { id: "joel", nameEs: "Joel", nameEn: "Joel", chapters: 3 },
  { id: "amos", nameEs: "Amós", nameEn: "Amos", chapters: 9 },
  { id: "abdias", nameEs: "Abdías", nameEn: "Obadiah", chapters: 1 },
  { id: "jonas", nameEs: "Jonás", nameEn: "Jonah", chapters: 4 },
  { id: "miqueas", nameEs: "Miqueas", nameEn: "Micah", chapters: 7 },
  { id: "nahum", nameEs: "Nahum", nameEn: "Nahum", chapters: 3 },
  { id: "habacuc", nameEs: "Habacuc", nameEn: "Habakkuk", chapters: 3 },
  { id: "sofonias", nameEs: "Sofonías", nameEn: "Zephaniah", chapters: 3 },
  { id: "hageo", nameEs: "Hageo", nameEn: "Haggai", chapters: 2 },
  { id: "zacarias", nameEs: "Zacarías", nameEn: "Zechariah", chapters: 14 },
  { id: "malaquias", nameEs: "Malaquías", nameEn: "Malachi", chapters: 4 },

  // Nuevo Testamento / New Testament
  { id: "mateo", nameEs: "Mateo", nameEn: "Matthew", chapters: 28 },
  { id: "marcos", nameEs: "Marcos", nameEn: "Mark", chapters: 16 },
  { id: "lucas", nameEs: "Lucas", nameEn: "Luke", chapters: 24 },
  { id: "juan", nameEs: "Juan", nameEn: "John", chapters: 21 },
  { id: "hechos", nameEs: "Hechos", nameEn: "Acts", chapters: 28 },
  { id: "romanos", nameEs: "Romanos", nameEn: "Romans", chapters: 16 },
  { id: "1corintios", nameEs: "1 Corintios", nameEn: "1 Corinthians", chapters: 16 },
  { id: "2corintios", nameEs: "2 Corintios", nameEn: "2 Corinthians", chapters: 13 },
  { id: "galatas", nameEs: "Gálatas", nameEn: "Galatians", chapters: 6 },
  { id: "efesios", nameEs: "Efesios", nameEn: "Ephesians", chapters: 6 },
  { id: "filipenses", nameEs: "Filipenses", nameEn: "Philippians", chapters: 4 },
  { id: "colosenses", nameEs: "Colosenses", nameEn: "Colossians", chapters: 4 },
  { id: "1tesalonicenses", nameEs: "1 Tesalonicenses", nameEn: "1 Thessalonians", chapters: 5 },
  { id: "2tesalonicenses", nameEs: "2 Tesalonicenses", nameEn: "2 Thessalonians", chapters: 3 },
  { id: "1timoteo", nameEs: "1 Timoteo", nameEn: "1 Timothy", chapters: 6 },
  { id: "2timoteo", nameEs: "2 Timoteo", nameEn: "2 Timothy", chapters: 4 },
  { id: "tito", nameEs: "Tito", nameEn: "Titus", chapters: 3 },
  { id: "filemon", nameEs: "Filemón", nameEn: "Philemon", chapters: 1 },
  { id: "hebreos", nameEs: "Hebreos", nameEn: "Hebrews", chapters: 13 },
  { id: "santiago", nameEs: "Santiago", nameEn: "James", chapters: 5 },
  { id: "1pedro", nameEs: "1 Pedro", nameEn: "1 Peter", chapters: 5 },
  { id: "2pedro", nameEs: "2 Pedro", nameEn: "2 Peter", chapters: 3 },
  { id: "1juan", nameEs: "1 Juan", nameEn: "1 John", chapters: 5 },
  { id: "2juan", nameEs: "2 Juan", nameEn: "2 John", chapters: 1 },
  { id: "3juan", nameEs: "3 Juan", nameEn: "3 John", chapters: 1 },
  { id: "judas", nameEs: "Judas", nameEn: "Jude", chapters: 1 },
  { id: "apocalipsis", nameEs: "Apocalipsis", nameEn: "Revelation", chapters: 22 }
];

export interface DailyVerse {
  textEs: string;
  referenceEs: string;
  textEn: string;
  referenceEn: string;
}

export const dailyVerses: DailyVerse[] = [
  {
    textEs: "Todo lo puedo en Cristo que me fortalece.",
    referenceEs: "Filipenses 4:13",
    textEn: "I can do all things through Christ who strengthens me.",
    referenceEn: "Philippians 4:13"
  },
  {
    textEs: "El Señor es mi pastor; nada me faltará.",
    referenceEs: "Salmos 23:1",
    textEn: "The Lord is my shepherd; I shall not want.",
    referenceEn: "Psalms 23:1"
  },
  {
    textEs: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
    referenceEs: "Juan 3:16",
    textEn: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    referenceEn: "John 3:16"
  },
  {
    textEs: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
    referenceEs: "Josué 1:9",
    textEn: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
    referenceEn: "Joshua 1:9"
  },
  {
    textEs: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
    referenceEs: "Proverbios 3:5-6",
    textEn: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    referenceEn: "Proverbs 3:5-6"
  },
  {
    textEs: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
    referenceEs: "Isaías 40:31",
    textEn: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
    referenceEn: "Isaiah 40:31"
  },
  {
    textEs: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
    referenceEs: "Romanos 8:28",
    textEn: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
    referenceEn: "Romans 8:28"
  },
  {
    textEs: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    referenceEs: "Salmos 119:105",
    textEn: "Your word is a lamp to my feet and a light to my path.",
    referenceEn: "Psalms 119:105"
  },
  {
    textEs: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",
    referenceEs: "Mateo 6:33",
    textEn: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
    referenceEn: "Matthew 6:33"
  },
  {
    textEs: "Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?",
    referenceEs: "Salmos 27:1",
    textEn: "The Lord is my light and my salvation; whom shall I fear? The Lord is the stronghold of my life; of whom shall I be afraid?",
    referenceEn: "Psalms 27:1"
  }
];

