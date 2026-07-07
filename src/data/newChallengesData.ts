// Expanded Challenges Catalog for Divina Palabra
export interface RoscoLetterChallenge {
  letter: string;
  type: 'starts' | 'contains';
  word: string;
  definition: string;
  reference: string;
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface WordSearchSet {
  id: string;
  theme: string;
  words: string[];
  hints?: string[];
  references: string[];
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface ClassificationItem {
  name: string;
  category: string;
  hint?: string;
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface ClassificationSet {
  id: string;
  theme: string;
  categories: string[];
  items: ClassificationItem[];
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface CounselingCase {
  id: string;
  theme?: string;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctIndex: number;
  biblicalSupport: string;
  devotionalExcerpt: string;
  suggestedVerse: string;
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface NewChallengesCatalog {
  rosco: Record<string, RoscoLetterChallenge[][]>;
  wordSearch: Record<string, WordSearchSet[]>;
  classification: ClassificationSet[];
  counseling: CounselingCase[];
}

// SPANISH CATALOG
export const newChallengesEs: NewChallengesCatalog = {
  rosco: {
    principiante: [
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "El padre de la fe, quien obedeció al salir de su tierra.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "La pequeña ciudad donde nació nuestro Salvador Jesús.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Significa \"El Ungido\", el Hijo de Dios que vino a salvarnos.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "El padre de la fe, quien obedeció al salir de su tierra.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "La pequeña ciudad donde nació nuestro Salvador Jesús.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Significa \"El Ungido\", el Hijo de Dios que vino a salvarnos.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "El padre de la fe, quien obedeció al salir de su tierra.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "La pequeña ciudad donde nació nuestro Salvador Jesús.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Significa \"El Ungido\", el Hijo de Dios que vino a salvarnos.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "El padre de la fe, quien obedeció al salir de su tierra.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "La pequeña ciudad donde nació nuestro Salvador Jesús.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Significa \"El Ungido\", el Hijo de Dios que vino a salvarnos.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ]
],
    discipulo: [
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "El padre de la fe, quien obedeció al salir de su tierra.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "La pequeña ciudad donde nació nuestro Salvador Jesús.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Significa \"El Ungido\", el Hijo de Dios que vino a salvarnos.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "El padre de la fe, quien obedeció al salir de su tierra.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "La pequeña ciudad donde nació nuestro Salvador Jesús.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Significa \"El Ungido\", el Hijo de Dios que vino a salvarnos.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "El padre de la fe, quien obedeció al salir de su tierra.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "La pequeña ciudad donde nació nuestro Salvador Jesús.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Significa \"El Ungido\", el Hijo de Dios que vino a salvarnos.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "El padre de la fe, quien obedeció al salir de su tierra.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "La pequeña ciudad donde nació nuestro Salvador Jesús.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Significa \"El Ungido\", el Hijo de Dios que vino a salvarnos.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ]
],
    avanzado: [
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "Patriarca hebreo originario de Ur de los Caldeos con quien Dios pactó la circuncisión.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "Población de Judea donde nació David, llamada antiguamente Efrata.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Título derivado del vocablo hebreo Mesías, el portador de la unción del Padre.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "Patriarca hebreo originario de Ur de los Caldeos con quien Dios pactó la circuncisión.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "Población de Judea donde nació David, llamada antiguamente Efrata.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Título derivado del vocablo hebreo Mesías, el portador de la unción del Padre.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "Patriarca hebreo originario de Ur de los Caldeos con quien Dios pactó la circuncisión.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "Población de Judea donde nació David, llamada antiguamente Efrata.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Título derivado del vocablo hebreo Mesías, el portador de la unción del Padre.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ALTAR",
      "definition": "Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.",
      "reference": "Génesis 8:20"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BALSAMO",
      "definition": "Resina aromática usada en Galaad como símbolo de sanidad.",
      "reference": "Jeremías 8:22"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CREACION",
      "definition": "La obra maestra de Dios al formar el universo en seis días.",
      "reference": "Génesis 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DILUVIO",
      "definition": "El gran juicio de agua que inundó la tierra en los días de Noé.",
      "reference": "Génesis 7"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EXODO",
      "definition": "El libro histórico que narra la salida de Israel del cautiverio egipcio.",
      "reference": "Éxodo 1"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FORTALEZA",
      "definition": "La seguridad y refugio que encontramos al confiar en Dios.",
      "reference": "Salmo 46:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GALILEA",
      "definition": "Región norteña de Israel donde Jesús realizó la mayor parte de su ministerio.",
      "reference": "Mateo 4"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERENCIA",
      "definition": "Las bendiciones y promesas que Dios otorga a sus hijos adoptivos.",
      "reference": "Efesios 1:11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "El nombre dado por Dios a Jacob que luego representó a las doce tribus.",
      "reference": "Génesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JOSE",
      "definition": "Hijo de Jacob vendido por sus hermanos, quien llegó a ser gobernador en Egipto.",
      "reference": "Génesis 37"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAMPARA",
      "definition": "Instrumento de luz: \"Lámpara es a mis pies tu palabra...\".",
      "reference": "Salmo 119:105"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MANA",
      "definition": "El pan del cielo con el que Dios alimentó a los israelitas en el desierto.",
      "reference": "Éxodo 16"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NAZARET",
      "definition": "La aldea de Galilea donde Jesús pasó su infancia.",
      "reference": "Mateo 2:23"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OSEAS",
      "definition": "Profeta que simbolizó el amor incondicional de Dios hacia un pueblo infiel.",
      "reference": "Oseas 1"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PACTO",
      "definition": "La alianza o promesa solemne entre Dios y los seres humanos.",
      "reference": "Génesis 9:9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REINO",
      "definition": "El gobierno espiritual de Dios: \"Venga tu ______...\".",
      "reference": "Mateo 6:10"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SINAGOGA",
      "definition": "El lugar de reunión y enseñanza de las Escrituras para los judíos.",
      "reference": "Lucas 4:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TESTAMENTO",
      "definition": "Cada una de las dos divisiones mayores de las Sagradas Escrituras.",
      "reference": "Hebreos 9:15"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "COMUNION",
      "definition": "La participación común en el cuerpo y espíritu de Cristo (contiene U).",
      "reference": "1 Corintios 10:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIRGEN",
      "definition": "La condición de María al concebir a Jesús por obra del Espíritu Santo.",
      "reference": "Isaías 7:14"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZION",
      "definition": "La colina de Jerusalén y término poético para la ciudad de Dios.",
      "reference": "Salmo 87:2"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "Patriarca hebreo originario de Ur de los Caldeos con quien Dios pactó la circuncisión.",
      "reference": "Génesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BELEN",
      "definition": "Población de Judea donde nació David, llamada antiguamente Efrata.",
      "reference": "Miqueas 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CRISTO",
      "definition": "Título derivado del vocablo hebreo Mesías, el portador de la unción del Padre.",
      "reference": "Mateo 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "El joven pastor que derrotó al gigante Goliat.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "El hermoso jardín donde Dios colocó a Adán y Eva.",
      "reference": "Génesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FE",
      "definition": "Tener la certeza de lo que se espera y la convicción de lo que no se ve.",
      "reference": "Hebreos 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACIA",
      "definition": "El favor inmerecido de Dios por el cual somos salvos.",
      "reference": "Efesios 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HIJO",
      "definition": "Jesucristo es el ______ de Dios enviado al mundo para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "El hijo de la promesa de Abraham y Sara.",
      "reference": "Génesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAS",
      "definition": "El profeta que estuvo tres días dentro de un gran pez.",
      "reference": "Jonás 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARO",
      "definition": "Amigo de Jesús a quien Él resucitó después de cuatro días.",
      "reference": "Juan 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOISES",
      "definition": "El siervo de Dios que guió a Israel fuera de Egipto.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOE",
      "definition": "Construyó el arca para salvar a su familia del diluvio.",
      "reference": "Génesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "ORACION",
      "definition": "La manera en que hablamos con Dios con fe y gratitud.",
      "reference": "Mateo 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PEDRO",
      "definition": "El apóstol pescador de hombres que caminó sobre el agua.",
      "reference": "Mateo 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUT",
      "definition": "Nuera de Noemí, fiel antepasada de Jesús.",
      "reference": "Rut 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SALMOS",
      "definition": "El libro de cantos, poemas y oraciones inspiradas.",
      "reference": "Salmos"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTEO",
      "definition": "Joven ayudante a quien el apóstol Pablo llamó \"hijo en la fe\".",
      "reference": "1 Timoteo 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CRUZ",
      "definition": "El madero donde Jesús entregó su vida por amor a nosotros (contiene U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VERDAD",
      "definition": "Jesús dijo: \"Yo soy el camino, la ________ y la vida\".",
      "reference": "Juan 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZAQUEO",
      "definition": "El cobrador de impuestos que subió a un árbol para ver a Jesús.",
      "reference": "Lucas 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARCA",
      "definition": "El gran barco de madera que construyó Noé por mandato divino.",
      "reference": "Génesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLIA",
      "definition": "La colección de libros inspirados por Dios que es nuestra regla de fe.",
      "reference": "2 Timoteo 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAN",
      "definition": "La tierra prometida por Dios a Abraham y sus descendientes.",
      "reference": "Génesis 17:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DOCE",
      "definition": "El número de discípulos que Jesús escogió para enviarlos a predicar.",
      "reference": "Mateo 10:1"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGIPTO",
      "definition": "La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.",
      "reference": "Éxodo 3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARAON",
      "definition": "El soberano de Egipto que endureció su corazón ante los milagros de Dios.",
      "reference": "Éxodo 7"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIAT",
      "definition": "El temible gigante de los filisteos que fue vencido por una honda.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HERMANO",
      "definition": "Caín fue el primer hombre en matar a su _______ en la historia.",
      "reference": "Génesis 4:8"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "IGLESIA",
      "definition": "El cuerpo místico de Cristo formado por todos los creyentes.",
      "reference": "Efesios 1:22-23"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "El Hijo unigénito de Dios que vino a dar su vida para salvarnos.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUCAS",
      "definition": "El médico y evangelista que detalló el nacimiento y ministerio de Jesús.",
      "reference": "Colosenses 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARIA",
      "definition": "La humilde joven judía elegida por Dios para dar a luz al Salvador.",
      "reference": "Lucas 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINIVE",
      "definition": "La gran ciudad asiria adonde Jonás fue enviado a predicar.",
      "reference": "Jonás 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OBEDIENCIA",
      "definition": "El acto de seguir fielmente los mandamientos y la voluntad de Dios.",
      "reference": "1 Samuel 15:22"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PABLO",
      "definition": "El gran apóstol que persiguió a los cristianos y luego predicó la gracia.",
      "reference": "Gálatas 1"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECCION",
      "definition": "La gloriosa victoria de Cristo sobre la muerte al tercer día.",
      "reference": "1 Corintios 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANSON",
      "definition": "El juez de Israel conocido por su fuerza dada por el Espíritu.",
      "reference": "Jueces 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLO",
      "definition": "El edificio sagrado construido en Jerusalén por el rey Salomón.",
      "reference": "1 Reyes 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNICO",
      "definition": "El _______ Hijo de Dios enviado al mundo para salvación.",
      "reference": "Juan 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VIDA",
      "definition": "Cristo ofrece la ______ eterna a todo aquel que cree en Él.",
      "reference": "Juan 10:28"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACARIAS",
      "definition": "Profeta menor y padre de Juan el Bautista que enmudeció por dudar.",
      "reference": "Lucas 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ANGEL",
      "definition": "Mensajero celestial enviado por Dios para dar anuncios o protección.",
      "reference": "Génesis 19"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BAUTISMO",
      "definition": "El rito del agua que simboliza nuestra muerte y resurrección con Cristo.",
      "reference": "Romanos 6:4"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CORINTO",
      "definition": "Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor.",
      "reference": "1 Corintios 1"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DANIEL",
      "definition": "El profeta que fue protegido por Dios en el foso de los leones.",
      "reference": "Daniel 6"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "ELIAS",
      "definition": "Profeta llevado al cielo en un torbellino con un carro de fuego.",
      "reference": "2 Reyes 2"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FARISEO",
      "definition": "Grupo religioso judío estricto en la ley exterior pero criticado por Jesús.",
      "reference": "Mateo 23"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GEDEON",
      "definition": "Juez que venció al ejército madianita con solo 300 hombres.",
      "reference": "Jueces 7"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREOS",
      "definition": "Epístola que contiene el famoso capítulo de los héroes de la fe.",
      "reference": "Hebreos 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAIAS",
      "definition": "El profeta que vio al Señor en su trono y dijo \"Heme aquí, envíame a mí\".",
      "reference": "Isaías 6"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JERICO",
      "definition": "La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.",
      "reference": "Josué 6"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LEVITICO",
      "definition": "Libro de la ley dedicado al orden sacerdotal y la santidad.",
      "reference": "Levítico"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MESIAS",
      "definition": "El Ungido esperado por las naciones para traer redención.",
      "reference": "Juan 1:41"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NICODEMO",
      "definition": "El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.",
      "reference": "Juan 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFRENDA",
      "definition": "Un sacrificio o contribución dada a Dios con un corazón alegre.",
      "reference": "2 Corintios 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PROVERBIOS",
      "definition": "Libro de sabiduría práctica escrito principalmente por Salomón.",
      "reference": "Proverbios"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "REDENCION",
      "definition": "Acción de rescatar o pagar el precio de nuestra libertad espiritual.",
      "reference": "Colosenses 1:14"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SANTIDAD",
      "definition": "El llamado de Dios: \"Sed santos, porque yo soy santo\".",
      "reference": "1 Pedro 1:16"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TABERNACULO",
      "definition": "El santuario móvil donde Dios habitaba en medio de su pueblo.",
      "reference": "Éxodo 25"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNCION",
      "definition": "Consagración derramada mediante aceite santo.",
      "reference": "1 Samuel 16:13"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORIA",
      "definition": "Dada por Dios: \"Mas gracias sean dadas a Dios, que nos da la ______\".",
      "reference": "1 Corintios 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZOROBABEL",
      "definition": "Líder que guió al pueblo de regreso y sentó las bases del nuevo templo.",
      "reference": "Esdras 3:2"
    }
  ]
]
  },
  wordSearch: {
    principiante: [
      { id: 'ws1', theme: 'Fruto del Espíritu', words: ['AMOR', 'GOZO', 'PAZ', 'BONDAD', 'FE'], references: ['Gálatas 5:22-23'] },
      { id: 'ws2', theme: 'Evangelios', words: ['MATEO', 'MARCOS', 'LUCAS', 'JUAN'], references: ['Nuevo Testamento'] },
      { id: 'ws3', theme: 'Nombres de Dios', words: ['ELOHIM', 'ADONAI', 'PADRE', 'SEÑOR'], references: ['Salmo 8'] },
      { id: 'ws_p4', theme: 'Reyes de Judá', words: ['DAVID', 'SALOMON', 'ROBOAM', 'ASA'], references: ['1 Reyes'] },
      { id: 'ws_p5', theme: 'Profetas del Antiguo', words: ['AMOS', 'Miqueas', 'JOEL', 'JONAS'], references: ['Profetas'] }
    ],
    discipulo: [
      { 
        id: 'ws4', 
        theme: 'La Armadura de Dios', 
        words: ['ESCUDO', 'ELMO', 'ESPADA', 'FE', 'VERDAD'], 
        hints: ['La defensa contra los dardos del maligno', 'El casco de la salvación', 'La Palabra del Espíritu', 'Certeza espiritual', 'Cinto de justicia'],
        references: ['Efesios 6:13-17'] 
      },
      { 
        id: 'ws5', 
        theme: 'Cualidades del Amor', 
        words: ['PACIENTE', 'BONDADOSO', 'SINCERO', 'ETERNO'], 
        hints: ['Soporta con calma', 'Hace el bien', 'No finge ni miente', 'Nunca deja de ser'],
        references: ['1 Corintios 13'] 
      }
    ],
    avanzado: [
      { id: 'ws6', theme: 'Profetas Menores', words: ['OSEAS', 'JOEL', 'AMOS', 'ABDIAS', 'JONAS', 'MIQUEAS'], references: ['Antiguo Testamento'] },
      { id: 'ws7', theme: 'Iglesias del Apocalipsis', words: ['EFESO', 'ESMIRNA', 'PERGAMO', 'TIATIRA', 'SARDIS', 'FILADELFIA'], references: ['Apocalipsis 2-3'] }
    ]
  },
  classification: [
    {
      id: 'cl1',
      theme: 'Testamento de los Libros',
      categories: ['Antiguo Testamento', 'Nuevo Testamento'],
      items: [
        { name: 'Génesis', category: 'Antiguo Testamento', hint: 'El inicio de la creación y la promesa.' },
        { name: 'Mateo', category: 'Nuevo Testamento', hint: 'El Evangelio del Rey y Salvador.' },
        { name: 'Isaías', category: 'Antiguo Testamento', hint: 'Profecías del Mesías sufriente.' },
        { name: 'Romanos', category: 'Nuevo Testamento', hint: 'La carta de Pablo sobre la doctrina de la gracia.' },
        { name: 'Éxodo', category: 'Antiguo Testamento', hint: 'La redención física y la ley.' },
        { name: 'Apocalipsis', category: 'Nuevo Testamento', hint: 'La revelación del fin de los tiempos.' }
      ]
    },
    {
      id: 'cl2',
      theme: 'Secciones Literarias',
      categories: ['Poéticos / Sabiduría', 'Epístolas / Cartas'],
      items: [
        { name: 'Salmos', category: 'Poéticos / Sabiduría', hint: 'Cantos de adoración e íntima comunión.' },
        { name: 'Efesios', category: 'Epístolas / Cartas', hint: 'Carta sobre las bendiciones espirituales en Cristo.' },
        { name: 'Proverbios', category: 'Poéticos / Sabiduría', hint: 'Sabiduría divina para el vivir diario.' },
        { name: 'Gálatas', category: 'Epístolas / Cartas', hint: 'Epístola que defiende la libertad de la ley.' },
        { name: 'Eclesiastés', category: 'Poéticos / Sabiduría', hint: 'Meditación sobre el propósito y la vanidad de la vida.' },
        { name: 'Santiago', category: 'Epístolas / Cartas', hint: 'Carta práctica sobre la fe demostrada en obras.' }
      ]
    }
  ],
  counseling: [
    {
      id: 'co1',
      title: 'Enfrentando el Ofensa',
      description: 'Un compañero de trabajo te ha calumniado falsamente delante de tus superiores para obtener un ascenso. Sientes enojo y deseos de vindicación.',
      question: '¿Cuál es la actitud y el consejo bíblico idóneo para responder a esta ofensa?',
      options: [
        'Afrontarlo públicamente con enojo para demostrar que tienes carácter y evitar que lo vuelva a hacer.',
        'No pagar mal por mal, dejar la justicia en manos del Señor, bendecirlo y buscar resolverlo pacíficamente.',
        'Ignorarlo por completo pero contarle a tus otros compañeros lo malo que es para defender tu reputación.'
      ],
      correctIndex: 1,
      biblicalSupport: 'Romanos 12:17-19',
      devotionalExcerpt: 'La Palabra nos enseña a no pagar a nadie mal por mal. Al encomendar nuestra causa al Señor, manifestamos confianza en Su justicia y guardamos nuestro corazón de raíces de amargura.',
      suggestedVerse: 'Romanos 12:19: "No os venguéis vosotros mismos, amados míos, sino dejad lugar a la ira de Dios; porque escrito está: Mía es la venganza, yo pagaré, dice el Señor."'
    },
    {
      id: 'co2',
      title: 'Ansiedad en la Escasez',
      description: 'Estás pasando por dificultades financieras debido a un despido inesperado. Te cuesta conciliar el sueño pensando en cómo pagar el alquiler y los alimentos de tu hogar.',
      question: '¿Cómo nos enseña el Evangelio a enfrentar la preocupación financiera?',
      options: [
        'Orar y clamar con fe al Padre, recordar que Él cuida de las aves y las flores, y buscar primeramente Su Reino.',
        'Trabajar sin descanso descuidando el día del Señor y tu familia, confiando solo en tus propias fuerzas.',
        'Lamentarte y dudar de la bondad de Dios, creyendo que te ha abandonado a causa de tus pecados pasados.'
      ],
      correctIndex: 0,
      biblicalSupport: 'Mateo 6:31-33',
      devotionalExcerpt: 'Jesucristo nos invita a confiar en nuestro Padre celestial, quien conoce de qué cosas tenemos necesidad. La oración y el orden en prioridades traen paz al alma atribulada.',
      suggestedVerse: 'Mateo 6:33: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas."'
    },
    {
      id: 'co3',
      title: 'Dudas en la Fe',
      description: 'Un amigo te presenta argumentos científicos e históricos complejos que contradicen la creación y milagros de Dios. Sientes que tu confianza en la inspiración de la Biblia flaquea.',
      question: '¿Qué principio bíblico de investigación y firmeza teológica debes aplicar?',
      options: [
        'Ignorar toda ciencia para no contaminarte y mantenerte en una fe ciega sin estudiar los argumentos.',
        'Escudriñar con diligencia las Escrituras, estudiar con apologética sólida y recordar que la fe se apoya en evidencias firmes y en la guía del Espíritu Santo.',
        'Aceptar que la Biblia es solo un libro moral del pasado sin relevancia histórica o científica.'
      ],
      correctIndex: 1,
      biblicalSupport: '1 Pedro 3:15',
      devotionalExcerpt: 'El creyente no teme a la verdad. La Biblia nos insta a estar preparados para presentar defensa con mansedumbre y reverencia ante todo el que demande razón de nuestra esperanza.',
      suggestedVerse: '1 Pedro 3:15: "Sino santificad a Dios el Señor en vuestros corazones, y estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros."'
    }
  ]
};

// ENGLISH CATALOG
export const newChallengesEn: NewChallengesCatalog = {
  rosco: {
    principiante: [
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ]
],
    discipulo: [
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ]
],
    avanzado: [
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ARK",
      "definition": "The large wooden vessel Noah built to save his family.",
      "reference": "Genesis 6:14"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BIBLE",
      "definition": "The inspired Word of God written as our guide for faith.",
      "reference": "2 Timothy 3:16"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CANAAN",
      "definition": "The promised land flowing with milk and honey.",
      "reference": "Exodus 3:8"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DAVID",
      "definition": "The young shepherd boy who defeated the giant Goliath.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EGYPT",
      "definition": "The nation from which God delivered the Israelites through Moses.",
      "reference": "Exodus 13:3"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FAITH",
      "definition": "The assurance of things hoped for, conviction of things unseen.",
      "reference": "Hebrews 11:1"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GRACE",
      "definition": "God's unmerited favor by which we are saved.",
      "reference": "Ephesians 2:8"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEBREWS",
      "definition": "New Testament letter containing the heroes of faith.",
      "reference": "Hebrews 11"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISAAC",
      "definition": "The son of promise born to Abraham and Sarah.",
      "reference": "Genesis 21"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JONAH",
      "definition": "The prophet who spent three days in the belly of a fish.",
      "reference": "Jonah 1"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LAZARUS",
      "definition": "Friend of Jesus raised from the dead after four days.",
      "reference": "John 11"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MOSES",
      "definition": "God's servant who led Israel out of Egyptian bondage.",
      "reference": "Exodus 3"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NOAH",
      "definition": "He built the ark to save his family from the flood.",
      "reference": "Genesis 6"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "OFFERING",
      "definition": "A gift or sacrifice given to God with a cheerful heart.",
      "reference": "2 Corinthians 9:7"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PAUL",
      "definition": "The apostle to the Gentiles, formerly Saul of Tarsus.",
      "reference": "Acts 9"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RESURRECTION",
      "definition": "The glorious victory of Christ over death.",
      "reference": "1 Corinthians 15"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "SAMSON",
      "definition": "The judge known for his supernatural strength.",
      "reference": "Judges 13"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TEMPLE",
      "definition": "The sacred building constructed in Jerusalem by Solomon.",
      "reference": "1 Kings 6"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "UNIQUE",
      "definition": "The one and only Son of God sent to the world.",
      "reference": "John 3:16"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "VICTORY",
      "definition": "Given by God: \"who gives us the ______ through our Lord\".",
      "reference": "1 Corinthians 15:57"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZECHARIAH",
      "definition": "Father of John the Baptist who became mute.",
      "reference": "Luke 1"
    }
  ],
  [
    {
      "letter": "A",
      "type": "starts",
      "word": "ABRAHAM",
      "definition": "The father of faith, who obeyed God by leaving his homeland.",
      "reference": "Genesis 12"
    },
    {
      "letter": "B",
      "type": "starts",
      "word": "BETHLEHEM",
      "definition": "The small town where our Savior Jesus was born.",
      "reference": "Micah 5:2"
    },
    {
      "letter": "C",
      "type": "starts",
      "word": "CHRIST",
      "definition": "Means \"The Anointed One\", the Son of God who came to save us.",
      "reference": "Matthew 16:16"
    },
    {
      "letter": "D",
      "type": "starts",
      "word": "DISCIPLE",
      "definition": "A follower of Jesus who learns and practices His teachings.",
      "reference": "John 8:31"
    },
    {
      "letter": "E",
      "type": "starts",
      "word": "EDEN",
      "definition": "The beautiful garden where God placed Adam and Eve.",
      "reference": "Genesis 2:8"
    },
    {
      "letter": "F",
      "type": "starts",
      "word": "FATHER",
      "definition": "Jesus taught us to pray saying, \"Our ________ in heaven\".",
      "reference": "Matthew 6:9"
    },
    {
      "letter": "G",
      "type": "starts",
      "word": "GOLIATH",
      "definition": "The giant Philistine warrior slain by young David with a sling.",
      "reference": "1 Samuel 17"
    },
    {
      "letter": "H",
      "type": "starts",
      "word": "HEAVENLY",
      "definition": "The home of God; Jesus is our ________ Father.",
      "reference": "Matthew 6:14"
    },
    {
      "letter": "I",
      "type": "starts",
      "word": "ISRAEL",
      "definition": "The name God gave to Jacob, meaning \"struggles with God\".",
      "reference": "Genesis 32:28"
    },
    {
      "letter": "J",
      "type": "starts",
      "word": "JESUS",
      "definition": "The Son of God and Savior of the world.",
      "reference": "Matthew 1:21"
    },
    {
      "letter": "L",
      "type": "starts",
      "word": "LUKE",
      "definition": "The beloved physician who wrote the third Gospel and Acts.",
      "reference": "Colossians 4:14"
    },
    {
      "letter": "M",
      "type": "starts",
      "word": "MARY",
      "definition": "The mother of Jesus, highly favored among women.",
      "reference": "Luke 1"
    },
    {
      "letter": "N",
      "type": "starts",
      "word": "NINEVEH",
      "definition": "The great city to which Jonah was sent to preach repentance.",
      "reference": "Jonah 3"
    },
    {
      "letter": "O",
      "type": "starts",
      "word": "PRAYER",
      "definition": "The way we talk to God in faith (spelled in Spanish O-racion).",
      "reference": "Matthew 6:6"
    },
    {
      "letter": "P",
      "type": "starts",
      "word": "PETER",
      "definition": "The fisherman apostle who walked on water.",
      "reference": "Matthew 14:29"
    },
    {
      "letter": "R",
      "type": "starts",
      "word": "RUTH",
      "definition": "Naomi's daughter-in-law, faithful ancestor of Jesus.",
      "reference": "Ruth 1"
    },
    {
      "letter": "S",
      "type": "starts",
      "word": "PSALMS",
      "definition": "The book of songs, poems, and inspired prayers.",
      "reference": "Psalms"
    },
    {
      "letter": "T",
      "type": "starts",
      "word": "TIMOTHY",
      "definition": "Young helper whom the apostle Paul called his \"son in the faith\".",
      "reference": "1 Timothy 1:2"
    },
    {
      "letter": "U",
      "type": "contains",
      "word": "CROSS",
      "definition": "The beam where Jesus gave His life (spelled Cruz in Spanish, contains U).",
      "reference": "Lucas 23:33"
    },
    {
      "letter": "V",
      "type": "starts",
      "word": "TRUTH",
      "definition": "Jesus said: \"I am the way, the ______ and the life\" (starts with V in Spanish).",
      "reference": "John 14:6"
    },
    {
      "letter": "Z",
      "type": "starts",
      "word": "ZACCHAEUS",
      "definition": "The short tax collector who climbed a tree to see Jesus.",
      "reference": "Luke 19"
    }
  ]
]
  },
  wordSearch: {
    principiante: [
      { id: 'ws1', theme: 'Fruit of the Spirit', words: ['LOVE', 'JOY', 'PEACE', 'KINDNESS', 'FAITH'], references: ['Galatians 5:22-23'] },
      { id: 'ws2', theme: 'Gospels', words: ['MATTHEW', 'MARK', 'LUKE', 'JOHN'], references: ['New Testament'] },
      { id: 'ws3', theme: 'Names of God', words: ['ELOHIM', 'ADONAI', 'FATHER', 'LORD'], references: ['Psalm 8'] }
    ],
    discipulo: [
      { 
        id: 'ws4', 
        theme: 'Armor of God', 
        words: ['SHIELD', 'HELMET', 'SWORD', 'FAITH', 'TRUTH'], 
        hints: ['Defense against arrows of the evil one', 'Helmet of salvation', 'Sword of the Spirit', 'Spiritual certainty', 'Belt of truth'],
        references: ['Ephesians 6:13-17'] 
      }
    ],
    avanzado: [
      { id: 'ws6', theme: 'Minor Prophets', words: ['HOSEA', 'JOEL', 'AMOS', 'OBADIAH', 'JONAH', 'MICAH'], references: ['Old Testament'] }
    ]
  },
  classification: [
    {
      id: 'cl1',
      theme: 'Books Testament',
      categories: ['Old Testament', 'New Testament'],
      items: [
        { name: 'Genesis', category: 'Old Testament', hint: 'The start of creation and promise.' },
        { name: 'Matthew', category: 'New Testament', hint: 'The Gospel of the King and Savior.' }
      ]
    }
  ],
  counseling: [
    {
      id: 'co1',
      title: 'Facing Offense',
      description: 'A coworker has falsely slandered you to superiors to get a promotion. You feel anger and desire for vindication.',
      question: 'What is the ideal attitude and biblical advice to respond to this offense?',
      options: [
        'Confront them publicly with anger to show character and prevent them from doing it again.',
        'Do not repay evil for evil, leave justice in the hands of the Lord, bless them, and seek to resolve it peacefully.',
        'Ignore it completely but tell other coworkers how bad they are to defend your reputation.'
      ],
      correctIndex: 1,
      biblicalSupport: 'Romans 12:17-19',
      devotionalExcerpt: 'The Word teaches us not to repay anyone evil for evil. Committing our cause to the Lord shows trust in His justice and guards our heart from bitterness.',
      suggestedVerse: "Romans 12:19: \"Do not take revenge, my dear friends, but leave room for God's wrath...\""
    }
  ]
};

export const getNewChallenges = (lang: string): NewChallengesCatalog => {
  return lang === 'en' ? newChallengesEn : newChallengesEs;
};
