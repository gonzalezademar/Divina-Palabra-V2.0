export interface RoscoLetterChallenge {
  letter: string;
  type: 'starts' | 'contains'; // 'Empieza con' o 'Contiene'
  word: string;
  definition: string;
  reference: string;
}

export interface WordSearchSet {
  id: string;
  theme: string;
  words: string[];
  hints?: string[]; // Para nivel Crecimiento
  references: string[];
}

export interface ClassificationItem {
  name: string;
  category: string;
  hint?: string;
}

export interface ClassificationSet {
  id: string;
  theme: string;
  categories: string[];
  items: ClassificationItem[];
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
}

export interface NewChallengesCatalog {
  rosco: Record<string, RoscoLetterChallenge[][]>; // record of difficulty -> array of sets of letters
  wordSearch: Record<string, WordSearchSet[]>;
  classification: ClassificationSet[];
  counseling: CounselingCase[];
}

// DATASETS IN SPANISH
export const newChallengesEs: NewChallengesCatalog = {
  rosco: {
    principiante: [
      // SET A
      [
        { letter: 'A', type: 'starts', word: 'ABRAHAM', definition: 'El padre de la fe, quien obedeció al salir de su tierra.', reference: 'Génesis 12' },
        { letter: 'B', type: 'starts', word: 'BELEN', definition: 'La pequeña ciudad donde nació nuestro Salvador Jesús.', reference: 'Miqueas 5:2' },
        { letter: 'C', type: 'starts', word: 'CRISTO', definition: 'Significa "El Ungido", el Hijo de Dios que vino a salvarnos.', reference: 'Mateo 16:16' },
        { letter: 'D', type: 'starts', word: 'DAVID', definition: 'El joven pastor que derrotó al gigante Goliat.', reference: '1 Samuel 17' },
        { letter: 'E', type: 'starts', word: 'EDEN', definition: 'El hermoso jardín donde Dios colocó a Adán y Eva.', reference: 'Génesis 2:8' },
        { letter: 'F', type: 'starts', word: 'FE', definition: 'Tener la certeza de lo que se espera y la convicción de lo que no se ve.', reference: 'Hebreos 11:1' },
        { letter: 'G', type: 'starts', word: 'GRACIA', definition: 'El favor inmerecido de Dios por el cual somos salvos.', reference: 'Efesios 2:8' },
        { letter: 'H', type: 'starts', word: 'HIJO', definition: 'Jesucristo es el ______ de Dios enviado al mundo.', reference: 'Juan 3:16' },
        { letter: 'I', type: 'starts', word: 'ISAAC', definition: 'El hijo de la promesa de Abraham y Sara.', reference: 'Génesis 21' },
        { letter: 'J', type: 'starts', word: 'JONAS', definition: 'El profeta que estuvo tres días dentro de un gran pez.', reference: 'Jonás 1' },
        { letter: 'L', type: 'starts', word: 'LAZARO', definition: 'Amigo de Jesús a quien Él resucitó después de cuatro días.', reference: 'Juan 11' },
        { letter: 'M', type: 'starts', word: 'MOISES', definition: 'El siervo de Dios que guió a Israel fuera de Egipto.', reference: 'Éxodo 3' },
        { letter: 'N', type: 'starts', word: 'NOE', definition: 'Construyó el arca para salvar a su familia del diluvio.', reference: 'Génesis 6' },
        { letter: 'O', type: 'starts', word: 'ORACION', definition: 'La manera en que hablamos con Dios con fe y gratitud.', reference: 'Mateo 6:6' },
        { letter: 'P', type: 'starts', word: 'PEDRO', definition: 'El apóstol pescador de hombres que caminó sobre el agua.', reference: 'Mateo 14:29' },
        { letter: 'R', type: 'starts', word: 'RUT', definition: 'Nuera de Noemí, fiel antepasada de Jesús.', reference: 'Rut 1' },
        { letter: 'S', type: 'starts', word: 'SALMOS', definition: 'El libro de cantos, poemas y oraciones inspiradas.', reference: 'Salmos' },
        { letter: 'T', type: 'starts', word: 'TIMOTEO', definition: 'Joven ayudante a quien el apóstol Pablo llamó "hijo en la fe".', reference: '1 Timoteo 1:2' },
        { letter: 'U', type: 'contains', word: 'CRUZ', definition: 'El madero donde Jesús entregó su vida por amor a nosotros.', reference: 'Lucas 23:33' },
        { letter: 'V', type: 'starts', word: 'VERDAD', definition: 'Jesús dijo: "Yo soy el camino, la ________ y la vida".', reference: 'Juan 14:6' },
        { letter: 'Z', type: 'starts', word: 'ZAQUEO', definition: 'El cobrador de impuestos de baja estatura que subió a un árbol para ver a Jesús.', reference: 'Lucas 19' }
      ],
      // SET B
      [
        { letter: 'A', type: 'starts', word: 'ARCA', definition: 'El gran barco de madera que construyó Noé por mandato divino.', reference: 'Génesis 6:14' },
        { letter: 'B', type: 'starts', word: 'BIBLIA', definition: 'La colección de libros inspirados por Dios que es nuestra regla de fe.', reference: '2 Timoteo 3:16' },
        { letter: 'C', type: 'starts', word: 'CANAN', definition: 'La tierra prometida por Dios a Abraham y sus descendientes.', reference: 'Génesis 17:8' },
        { letter: 'D', type: 'starts', word: 'DOCE', definition: 'El número de discípulos que Jesús escogió para enviarlos a predicar.', reference: 'Mateo 10:1' },
        { letter: 'E', type: 'starts', word: 'EGIPTO', definition: 'La nación de donde Moisés liberó al pueblo de Dios de la esclavitud.', reference: 'Éxodo 3' },
        { letter: 'F', type: 'starts', word: 'FARAON', definition: 'El soberano de Egipto que endureció su corazón ante los milagros de Dios.', reference: 'Éxodo 7' },
        { letter: 'G', type: 'starts', word: 'GOLIAT', definition: 'El temible gigante de los filisteos que fue vencido por una honda.', reference: '1 Samuel 17' },
        { letter: 'H', type: 'starts', word: 'HERMANO', definition: 'Caín fue el primer hombre en matar a su _______ en la historia.', reference: 'Génesis 4:8' },
        { letter: 'I', type: 'starts', word: 'IGLESIA', definition: 'El cuerpo místico de Cristo formado por todos los creyentes en el mundo.', reference: 'Efesios 1:22-23' },
        { letter: 'J', type: 'starts', word: 'JESUS', definition: 'El Hijo unigénito de Dios que vino a dar su vida para salvarnos del pecado.', reference: 'Juan 3:16' },
        { letter: 'L', type: 'starts', word: 'LUCAS', definition: 'El médico y evangelista que detalló el nacimiento y ministerio de Jesús.', reference: 'Colosenses 4:14' },
        { letter: 'M', type: 'starts', word: 'MARIA', definition: 'La humilde joven judía elegida por Dios para dar a luz al Salvador.', reference: 'Lucas 1' },
        { letter: 'N', type: 'starts', word: 'NINIVE', definition: 'La gran ciudad asiria adonde Jonás fue enviado a predicar el arrepentimiento.', reference: 'Jonás 3' },
        { letter: 'O', type: 'starts', word: 'OBEDIENCIA', definition: 'El acto de seguir fielmente los mandamientos y la voluntad de Dios.', reference: '1 Samuel 15:22' },
        { letter: 'P', type: 'starts', word: 'PABLO', definition: 'El gran apóstol que persiguió a los cristianos y luego predicó la gracia.', reference: 'Gálatas 1' },
        { letter: 'R', type: 'starts', word: 'RESURRECCION', definition: 'La gloriosa victoria de Cristo sobre la muerte al tercer día.', reference: '1 Corintios 15' },
        { letter: 'S', type: 'starts', word: 'SANSON', definition: 'El juez de Israel conocido por su fuerza dada por el Espíritu de Dios.', reference: 'Jueces 13' },
        { letter: 'T', type: 'starts', word: 'TEMPLO', definition: 'El edificio sagrado construido en Jerusalén por el rey Salomón para Dios.', reference: '1 Reyes 6' },
        { letter: 'U', type: 'starts', word: 'UNICO', definition: 'El _______ Hijo de Dios enviado al mundo.', reference: 'Juan 3:16' },
        { letter: 'V', type: 'starts', word: 'VIDA', definition: 'Cristo ofrece la ______ eterna a todo aquel que cree en Él.', reference: 'Juan 10:28' },
        { letter: 'Z', type: 'starts', word: 'ZACARIAS', definition: 'El profeta del Antiguo Testamento que anunció la entrada del Rey humilde sobre un asno.', reference: 'Zacarías 9:9' }
      ]
    ],
    discipulo: [
      // SET A
      [
        { letter: 'A', type: 'starts', word: 'APOSTOL', definition: 'Uno enviado oficialmente por Cristo para predicar el Evangelio.', reference: 'Mateo 10:1' },
        { letter: 'B', type: 'starts', word: 'BALSAMO', definition: 'Resina aromática usada en Galaad como símbolo de sanidad.', reference: 'Jeremías 8:22' },
        { letter: 'C', type: 'contains', word: 'PACTO', definition: 'Contrato o promesa solemne entre Dios y los hombres.', reference: 'Génesis 9:9' },
        { letter: 'D', type: 'starts', word: 'DISCIPULO', definition: 'Aquel que sigue las enseñanzas de Jesús y las pone en práctica.', reference: 'Juan 8:31' },
        { letter: 'E', type: 'starts', word: 'ELIAS', definition: 'Profeta llevado al cielo en un torbellino con un carro de fuego.', reference: '2 Reyes 2' },
        { letter: 'F', type: 'starts', word: 'FILIPENSES', definition: 'Libro donde se nos exhorta a estar siempre gozosos en el Señor.', reference: 'Filipenses 4:4' },
        { letter: 'G', type: 'starts', word: 'GEDEON', definition: 'Juez que venció al ejército madianita con solo 300 hombres.', reference: 'Jueces 7' },
        { letter: 'H', type: 'starts', word: 'HEBREOS', definition: 'Epístola que contiene el famoso capítulo de los héroes de la fe.', reference: 'Hebreos 11' },
        { letter: 'I', type: 'starts', word: 'ISAIAS', definition: 'El profeta que vio al Señor en su trono y dijo "Heme aquí, envíame a mí".', reference: 'Isaías 6' },
        { letter: 'J', type: 'starts', word: 'JERUSALEN', definition: 'La ciudad santa donde David reinó y Jesús fue crucificado.', reference: 'Salmos 122' },
        { letter: 'L', type: 'starts', word: 'LEVITICO', definition: 'Libro de la ley dedicado al orden sacerdotal y la santidad de Dios.', reference: 'Levítico' },
        { letter: 'M', type: 'starts', word: 'MESIAS', definition: 'El Ungido esperado por las naciones para traer redención.', reference: 'Juan 1:41' },
        { letter: 'N', type: 'starts', word: 'NAZARET', definition: 'La aldea de Galilea donde Jesús pasó su infancia y juventud.', reference: 'Mateo 2:23' },
        { letter: 'O', type: 'starts', word: 'OFRENDA', definition: 'Un sacrificio o contribución dada a Dios con un corazón alegre.', reference: '2 Corintios 9:7' },
        { letter: 'P', type: 'starts', word: 'PROVERBIOS', definition: 'Libro de sabiduría práctica escrito principalmente por Salomón.', reference: 'Proverbios' },
        { letter: 'R', type: 'starts', word: 'REDENCION', definition: 'Acción de rescatar o pagar el precio de nuestra libertad.', reference: 'Colosenes 1:14' },
        { letter: 'S', type: 'starts', word: 'SANTIDAD', definition: 'El llamado de Dios: "Sed santos, porque yo soy santo".', reference: '1 Pedro 1:16' },
        { letter: 'T', type: 'starts', word: 'TABERNACULO', definition: 'El santuario móvil donde Dios habitaba en medio de su pueblo.', reference: 'Éxodo 25' },
        { letter: 'U', type: 'contains', word: 'UNCION', definition: 'Consagración derramada mediante aceite santo.', reference: '1 Samuel 16:13' },
        { letter: 'V', type: 'starts', word: 'VICTORIA', definition: 'Dada por Dios: "Mas gracias sean dadas a Dios, que nos da la ______".', reference: '1 Corintios 15:57' },
        { letter: 'Z', type: 'starts', word: 'ZACARIAS', definition: 'Profeta menor y padre de Juan el Bautista que enmudeció por dudar.', reference: 'Lucas 1' }
      ],
      // SET B
      [
        { letter: 'A', type: 'starts', word: 'ALTAR', definition: 'Lugar de piedra donde se presentaban sacrificios y ofrendas a Dios.', reference: 'Génesis 8:20' },
        { letter: 'B', type: 'starts', word: 'BAUTISMO', definition: 'El rito del agua que simboliza nuestra muerte y resurrección con Cristo.', reference: 'Romanos 6:4' },
        { letter: 'C', type: 'starts', word: 'CORINTO', definition: 'Ciudad griega célebre a la cual Pablo escribió dos cartas detallando el amor y la conducta.', reference: '1 Corintios 1' },
        { letter: 'D', type: 'starts', word: 'DEUTERONOMIO', definition: 'El quinto libro del Pentateuco cuyo nombre significa "segunda ley".', reference: 'Deuteronomio 1' },
        { letter: 'E', type: 'starts', word: 'EXODO', definition: 'El libro histórico que narra la salida de Israel del cautiverio egipcio.', reference: 'Éxodo 1' },
        { letter: 'F', type: 'starts', word: 'FARISEO', definition: 'Grupo religioso judío estricto en la ley exterior pero a menudo criticado por Jesús.', reference: 'Mateo 23' },
        { letter: 'G', type: 'starts', word: 'GALATAS', definition: 'Epístola paulina donde se defiende con firmeza la justificación por la fe sola.', reference: 'Gálatas 2:16' },
        { letter: 'H', type: 'starts', word: 'HIPOCRESIA', definition: 'La actitud de fingir piedad o bondad que Jesús denunció en los líderes religiosos.', reference: 'Lucas 12:1' },
        { letter: 'I', type: 'starts', word: 'ISRAEL', definition: 'El nombre dado por Dios a Jacob que luego representó a las doce tribus.', reference: 'Génesis 32:28' },
        { letter: 'J', type: 'starts', word: 'JERICO', definition: 'La primera ciudad cananea cuyas murallas cayeron al sonar de las trompetas.', reference: 'Josué 6' },
        { letter: 'L', type: 'starts', word: 'LUCAS', definition: 'El autor del tercer Evangelio y del libro de los Hechos de los Apóstoles.', reference: 'Lucas 1' },
        { letter: 'M', type: 'starts', word: 'MANA', definition: 'El pan del cielo con el que Dios alimentó a los israelitas en el desierto.', reference: 'Éxodo 16' },
        { letter: 'N', type: 'starts', word: 'NICODEMO', definition: 'El principal judío que visitó a Jesús de noche y aprendió del nuevo nacimiento.', reference: 'Juan 3' },
        { letter: 'O', type: 'starts', word: 'ORACION', definition: 'El medio de comunión donde el creyente eleva sus peticiones y alabanzas a Dios.', reference: 'Filipenses 4:6' },
        { letter: 'P', type: 'starts', word: 'PENTECOSTES', definition: 'La fiesta solemne en la cual descendió el Espíritu Santo sobre la iglesia primitiva.', reference: 'Hechos 2' },
        { letter: 'R', type: 'starts', word: 'RECONCILIACION', definition: 'La restauración de la comunión entre el pecador y Dios por medio de Cristo.', reference: '2 Corintios 5:18' },
        { letter: 'S', type: 'starts', word: 'SINAGOGA', definition: 'El lugar de reunión y enseñanza de las Escrituras para los judíos del Nuevo Testamento.', reference: 'Lucas 4:16' },
        { letter: 'T', type: 'starts', word: 'TESTAMENTO', definition: 'Cada una de las dos divisiones mayores de las Sagradas Escrituras.', reference: 'Hebreos 9:15' },
        { letter: 'U', type: 'contains', word: 'COMUNION', definition: 'La participación común de los santos en la mesa y en el Espíritu.', reference: '1 Corintios 10:16' },
        { letter: 'V', type: 'starts', word: 'VIRGEN', definition: 'La condición de María al concebir a Jesús por obra del Espíritu Santo.', reference: 'Isaías 7:14' },
        { letter: 'Z', type: 'starts', word: 'ZOROBABEL', definition: 'Líder que guió al pueblo judío de regreso a Jerusalén y sentó las bases del nuevo templo.', reference: 'Esdras 3:2' }
      ]
    ],
    avanzado: [
      // SET A
      [
        { letter: 'A', type: 'starts', word: 'APOLOGETICA', definition: 'Defensa razonada y sistemática de la fe cristiana.', reference: '1 Pedro 3:15' },
        { letter: 'B', type: 'starts', word: 'BEREA', definition: 'Ciudad cuyos habitantes escudriñaban diariamente las Escrituras.', reference: 'Hechos 17:11' },
        { letter: 'C', type: 'starts', word: 'CRONOLOGIA', definition: 'El ordenamiento de los reyes, profetas y pactos en el tiempo.', reference: '1 Crónicas' },
        { letter: 'D', type: 'starts', word: 'DOCTRINA', definition: 'Enseñanza sólida de la fe: "Ten cuidado de ti mismo y de la ______".', reference: '1 Timoteo 4:16' },
        { letter: 'E', type: 'starts', word: 'ESCATOLOGIA', definition: 'El estudio teológico de las últimas cosas y profecías del fin.', reference: 'Apocalipsis' },
        { letter: 'F', type: 'starts', word: 'FILEMON', definition: 'Epístola sobre el perdón dirigida a un amo por su esclavo Onésimo.', reference: 'Filemón' },
        { letter: 'G', type: 'starts', word: 'GALATAS', definition: 'Epístola que combate la herejía judaizante de la justificación por obras.', reference: 'Gálatas' },
        { letter: 'H', type: 'starts', word: 'HERMENEUTICA', definition: 'Ciencia y arte de la correcta interpretación de las Escrituras.', reference: '2 Timoteo 2:15' },
        { letter: 'I', type: 'starts', word: 'INERRANCIA', definition: 'Doctrina de que la Palabra original escrita por Dios no contiene error.', reference: 'Salmo 19:7' },
        { letter: 'J', type: 'starts', word: 'JUSTIFICACION', definition: 'Acto judicial divino por el cual nos declara limpios mediante la fe.', reference: 'Romanos 5:1' },
        { letter: 'L', type: 'starts', word: 'LAMENTACIONES', definition: 'Libro de endechas y lamento escrito por el profeta Jeremías.', reference: 'Lamentaciones' },
        { letter: 'M', type: 'starts', word: 'MELQUISEDEC', definition: 'Rey de Salem y sacerdote de Dios Altísimo, figura de Cristo.', reference: 'Hebreos 7' },
        { letter: 'N', type: 'starts', word: 'NEHEMIAS', definition: 'Gobernador celoso que dirigió la reconstrucción física de los muros.', reference: 'Nehemías' },
        { letter: 'O', type: 'starts', word: 'ONESIMO', definition: 'Esclavo fugitivo que se convirtió bajo el ministerio de Pablo.', reference: 'Filemón' },
        { letter: 'P', type: 'starts', word: 'PENTATEUCO', definition: 'Nombre griego para la Ley o Torá dada por Dios a Moisés.', reference: 'Deuteronomio' },
        { letter: 'R', type: 'starts', word: 'REVELACION', definition: 'La manifestación de la verdad de Dios que estaba oculta.', reference: 'Efesios 3:3' },
        { letter: 'S', type: 'starts', word: 'SOTERIOLOGIA', definition: 'Parte de la teología que estudia la doctrina de la salvación.', reference: 'Romanos' },
        { letter: 'T', type: 'starts', word: 'TEOLOGIA', definition: 'Estudio de la persona, carácter y revelación de Dios.', reference: 'Colosenses 2:8' },
        { letter: 'U', type: 'contains', word: 'SANTUARIO', definition: 'El lugar Santísimo donde habitaba la presencia del Dios Vivo.', reference: 'Hebreos 9:3' },
        { letter: 'V', type: 'starts', word: 'VOCACION', definition: 'Llamado eficaz que Dios hace al creyente para el ministerio.', reference: 'Efesios 4:1' },
        { letter: 'Z', type: 'starts', word: 'ZOROBABEL', definition: 'Gobernador que lideró el retorno del exilio y reedificó el templo.', reference: 'Hageo 2:2' }
      ],
      // SET B
      [
        { letter: 'A', type: 'starts', word: 'ANTROPOLOGIA', definition: 'El estudio teológico del origen, naturaleza y caída del ser humano.', reference: 'Génesis 1:27' },
        { letter: 'B', type: 'starts', word: 'BABILONIA', definition: 'El gran imperio que llevó al exilio al reino del sur de Judá.', reference: '2 Reyes 24' },
        { letter: 'C', type: 'starts', word: 'CANON', definition: 'La lista oficial de libros inspirados reconocidos como parte de la Biblia.', reference: 'Apocalipsis 22' },
        { letter: 'D', type: 'starts', word: 'DECALOGO', definition: 'El término teológico usado para referirse a los Diez Mandamientos de la ley.', reference: 'Éxodo 20' },
        { letter: 'E', type: 'starts', word: 'EXEGESIS', definition: 'La extracción sistemática del significado original e histórico de un texto bíblico.', reference: 'Nehemías 8:8' },
        { letter: 'F', type: 'starts', word: 'FILACTERIA', definition: 'Pequeñas cajas con textos de la ley que los judíos se ataban a la frente y brazos.', reference: 'Mateo 23:5' },
        { letter: 'G', type: 'starts', word: 'GENTILES', definition: 'Las naciones o pueblos no judíos que también fueron incluidos en el pacto de gracia.', reference: 'Efesios 3:6' },
        { letter: 'H', type: 'starts', word: 'HIPOSTATICA', definition: 'La unión _______ es la doctrina que explica la doble naturaleza divina y humana de Jesús.', reference: 'Colosenses 2:9' },
        { letter: 'I', type: 'starts', word: 'INSPIRACION', definition: 'La acción del Espíritu Santo por la cual sopló sobre los autores bíblicos al escribir.', reference: '2 Timoteo 3:16' },
        { letter: 'J', type: 'starts', word: 'JUDEA', definition: 'La región del sur donde Jesús nació y predicó antes de ir a Jerusalén.', reference: 'Mateo 2:1' },
        { letter: 'L', type: 'starts', word: 'LITURGIA', definition: 'El orden estructurado de los ritos y servicios religiosos establecidos.', reference: 'Hebreos 9' },
        { letter: 'M', type: 'starts', word: 'MONOTEISMO', definition: 'La creencia fundamental de que existe un solo Dios verdadero.', reference: 'Deuteronomio 6:4' },
        { letter: 'N', type: 'starts', word: 'NICODEMO', definition: 'El fariseo miembro del concilio judío que ayudó a sepultar el cuerpo de Jesús.', reference: 'Juan 19:39' },
        { letter: 'O', type: 'starts', word: 'ORTODOXIA', definition: 'La conformidad con las verdades doctrinales y enseñanzas bíblicas correctas.', reference: 'Tito 2:1' },
        { letter: 'P', type: 'starts', word: 'PROVIDENCIA', definition: 'El cuidado continuo e inteligente con el que Dios gobierna toda su creación.', reference: 'Mateo 10:29' },
        { letter: 'R', type: 'starts', word: 'REDENCION', definition: 'El rescate del pecador mediante el precio de la sangre de Jesucristo.', reference: 'Efesios 1:7' },
        { letter: 'S', type: 'starts', word: 'SANTIFICACION', definition: 'El proceso progresivo en el cual el Espíritu Santo purifica al creyente.', reference: '1 Tesalonicenses 4:3' },
        { letter: 'T', type: 'starts', word: 'TRINIDAD', definition: 'La doctrina de la existencia de un solo Dios en tres Personas divinas.', reference: 'Mateo 28:19' },
        { letter: 'U', type: 'contains', word: 'TRIBULACION', definition: 'El periodo de gran sufrimiento profetizado al fin de los tiempos.', reference: 'Mateo 24:21' },
        { letter: 'V', type: 'starts', word: 'VERACIDAD', definition: 'El atributo divino por el cual Dios cumple enteramente Sus promesas.', reference: 'Números 23:19' },
        { letter: 'Z', type: 'starts', word: 'ZACARIAS', definition: 'El sacerdote y profeta asesinado entre el altar y el templo en el Antiguo Testamento.', reference: 'Mateo 23:35' }
      ]
    ]
  },
  wordSearch: {
    principiante: [
      { id: 'ws1', theme: 'Fruto del Espíritu', words: ['AMOR', 'GOZO', 'PAZ', 'BONDAD', 'FE'], references: ['Gálatas 5:22-23'] },
      { id: 'ws2', theme: 'Evangelios', words: ['MATEO', 'MARCOS', 'LUCAS', 'JUAN'], references: ['Nuevo Testamento'] },
      { id: 'ws3', theme: 'Nombres de Dios', words: ['ELOHIM', 'ADONAI', 'PADRE', 'SEÑOR'], references: ['Salmo 8'] }
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

// DATASETS IN ENGLISH
export const newChallengesEn: NewChallengesCatalog = {
  rosco: {
    principiante: [
      // SET A
      [
        { letter: 'A', type: 'starts', word: 'ABRAHAM', definition: 'The father of faith, who obeyed God by leaving his homeland.', reference: 'Genesis 12' },
        { letter: 'B', type: 'starts', word: 'BETHLEHEM', definition: 'The small town where our Savior Jesus was born.', reference: 'Micah 5:2' },
        { letter: 'C', type: 'starts', word: 'CHRIST', definition: 'Means "The Anointed One", the Son of God who came to save us.', reference: 'Matthew 16:16' },
        { letter: 'D', type: 'starts', word: 'DAVID', definition: 'The young shepherd boy who defeated the giant Goliath.', reference: '1 Samuel 17' },
        { letter: 'E', type: 'starts', word: 'EDEN', definition: 'The beautiful garden where God placed Adam and Eve.', reference: 'Genesis 2:8' },
        { letter: 'F', type: 'starts', word: 'FAITH', definition: 'The assurance of things hoped for, the conviction of things not seen.', reference: 'Hebrews 11:1' },
        { letter: 'G', type: 'starts', word: 'GRACE', definition: 'God\'s unmerited favor by which we are saved.', reference: 'Ephesians 2:8' },
        { letter: 'H', type: 'starts', word: 'HEAVEN', definition: 'The dwelling place of God and our eternal home with Christ.', reference: 'Revelation 21' },
        { letter: 'I', type: 'starts', word: 'ISAAC', definition: 'The son of promise born to Abraham and Sarah.', reference: 'Genesis 21' },
        { letter: 'J', type: 'starts', word: 'JONAH', definition: 'The prophet who spent three days in the belly of a great fish.', reference: 'Jonah 1' },
        { letter: 'L', type: 'starts', word: 'LAZARUS', definition: 'Friend of Jesus whom He raised from the dead after four days.', reference: 'John 11' },
        { letter: 'M', type: 'starts', word: 'MOSES', definition: 'God\'s servant who led Israel out of Egypt.', reference: 'Exodus 3' },
        { letter: 'N', type: 'starts', word: 'NOAH', definition: 'He built the ark to save his family from the flood.', reference: 'Genesis 6' },
        { letter: 'O', type: 'starts', word: 'PRAYER', definition: 'The way we talk to God in faith and thanksgiving (spelled in Spanish O-racion).', reference: 'Matthew 6:6' },
        { letter: 'P', type: 'starts', word: 'PETER', definition: 'The fisherman apostle who walked on water.', reference: 'Matthew 14:29' },
        { letter: 'R', type: 'starts', word: 'RUTH', definition: 'Naomi\'s daughter-in-law, faithful ancestor of Jesus.', reference: 'Ruth 1' },
        { letter: 'S', type: 'starts', word: 'PSALMS', definition: 'The book of songs, poems, and inspired prayers.', reference: 'Psalms' },
        { letter: 'T', type: 'starts', word: 'TIMOTHY', definition: 'Young helper whom the apostle Paul called his "son in the faith".', reference: '1 Timothy 1:2' },
        { letter: 'U', type: 'contains', word: 'CROSS', definition: 'The wooden beam where Jesus gave His life out of love for us (spelled C-r-u-z in Spanish).', reference: 'Lucas 23:33' },
        { letter: 'V', type: 'starts', word: 'TRUTH', definition: 'Jesus said: "I am the way, the ______ and the life".', reference: 'John 14:6' },
        { letter: 'Z', type: 'starts', word: 'ZACCHAEUS', definition: 'The short tax collector who climbed a tree to see Jesus.', reference: 'Luke 19' }
      ],
      // SET B
      [
        { letter: 'A', type: 'starts', word: 'ARK', definition: 'The large wooden vessel Noah built to save his family from the flood.', reference: 'Genesis 6:14' },
        { letter: 'B', type: 'starts', word: 'BIBLE', definition: 'The inspired Word of God written as our guide for faith and life.', reference: '2 Timothy 3:16' },
        { letter: 'C', type: 'starts', word: 'CANAAN', definition: 'The promised land flowing with milk and honey given to Abraham\'s seed.', reference: 'Exodus 3:8' },
        { letter: 'D', type: 'starts', word: 'DISCIPLE', definition: 'A follower of Jesus who learns and practices His teachings.', reference: 'John 8:31' },
        { letter: 'E', type: 'starts', word: 'EGYPT', definition: 'The nation from which God delivered the Israelites through Moses.', reference: 'Exodus 13:3' },
        { letter: 'F', type: 'starts', word: 'FATHER', definition: 'Jesus taught us to pray saying, "Our ________ in heaven".', reference: 'Matthew 6:9' },
        { letter: 'G', type: 'starts', word: 'GOLIATH', definition: 'The giant Philistine warrior slain by young David with a sling.', reference: '1 Samuel 17' },
        { letter: 'H', type: 'starts', word: 'HEAVENLY', definition: 'The home of God; Jesus is our ________ Father.', reference: 'Matthew 6:14' },
        { letter: 'I', type: 'starts', word: 'ISRAEL', definition: 'The name God gave to Jacob, meaning "struggles with God".', reference: 'Genesis 32:28' },
        { letter: 'J', type: 'starts', word: 'JESUS', definition: 'The Son of God and Savior of the world who died on the cross.', reference: 'Matthew 1:21' },
        { letter: 'L', type: 'starts', word: 'LUKE', definition: 'The beloved physician who wrote the third Gospel and Acts.', reference: 'Colossians 4:14' },
        { letter: 'M', type: 'starts', word: 'MARY', definition: 'The mother of Jesus, highly favored among women.', reference: 'Luke 1' },
        { letter: 'N', type: 'starts', word: 'NINEVEH', definition: 'The great city to which Jonah was sent to preach repentance.', reference: 'Jonah 3' },
        { letter: 'O', type: 'starts', word: 'OBEDIENCE', definition: 'The act of doing what God commands in His Word.', reference: '1 John 5:3' },
        { letter: 'P', type: 'starts', word: 'PAUL', definition: 'The apostle of the Gentiles who wrote many Epistles in the New Testament.', reference: 'Romans 1:1' },
        { letter: 'R', type: 'starts', word: 'RESURRECTION', definition: 'The glorious rising of Christ from the dead on the third day.', reference: '1 Corinthians 15' },
        { letter: 'S', type: 'starts', word: 'SAMSON', definition: 'The strong judge of Israel whose hair was cut by Delilah.', reference: 'Judges 16' },
        { letter: 'T', type: 'starts', word: 'TEMPLE', definition: 'The holy house built by Solomon in Jerusalem for worship.', reference: '1 Kings 6' },
        { letter: 'U', type: 'starts', word: 'UNITY', definition: 'How good and pleasant it is when brothers live together in ________.', reference: 'Psalm 133:1' },
        { letter: 'V', type: 'starts', word: 'LIFE', definition: 'Jesus said: "I am the way, the truth, and the ________".', reference: 'John 14:6' },
        { letter: 'Z', type: 'starts', word: 'ZECHARIAH', definition: 'The Old Testament prophet who foretold the King riding on a donkey.', reference: 'Zechariah 9:9' }
      ]
    ],
    discipulo: [
      // SET A
      [
        { letter: 'A', type: 'starts', word: 'APOSTLE', definition: 'One officially sent by Christ to preach the Gospel.', reference: 'Matthew 10:1' },
        { letter: 'B', type: 'starts', word: 'BALM', definition: 'Aromatic resin used in Gilead as a symbol of healing.', reference: 'Jeremiah 8:22' },
        { letter: 'C', type: 'starts', word: 'COVENANT', definition: 'Solemn promise or contract between God and mankind.', reference: 'Genesis 9:9' },
        { letter: 'D', type: 'starts', word: 'DISCIPLE', definition: 'One who follows the teachings of Jesus and puts them into practice.', reference: 'John 8:31' },
        { letter: 'E', type: 'starts', word: 'ELIJAH', definition: 'Prophet taken up to heaven in a whirlwind with a chariot of fire.', reference: '2 Kings 2' },
        { letter: 'F', type: 'starts', word: 'PHILIPPIANS', definition: 'Book where we are exhorted to always rejoice in the Lord.', reference: 'Philippians 4:4' },
        { letter: 'G', type: 'starts', word: 'GIDEON', definition: 'Judge who defeated the Midianite army with only 300 men.', reference: 'Judges 7' },
        { letter: 'H', type: 'starts', word: 'HEBREWS', definition: 'Epistle containing the famous chapter of the heroes of faith.', reference: 'Hebrews 11' },
        { letter: 'I', type: 'starts', word: 'ISAIAH', definition: 'The prophet who saw the Lord on His throne and said "Here am I, send me".', reference: 'Isaiah 6' },
        { letter: 'J', type: 'starts', word: 'JERUSALEM', definition: 'The holy city where David reigned and Jesus was crucified.', reference: 'Psalms 122' },
        { letter: 'L', type: 'starts', word: 'LEVITICUS', definition: 'Book of law dedicated to the priestly order and God\'s holiness.', reference: 'Leviticus' },
        { letter: 'M', type: 'starts', word: 'MESSIAH', definition: 'The Anointed One expected by the nations to bring redemption.', reference: 'John 1:41' },
        { letter: 'N', type: 'starts', word: 'NAZARETH', definition: 'The Galilean village where Jesus spent His childhood and youth.', reference: 'Matthew 2:23' },
        { letter: 'O', type: 'starts', word: 'OFFERING', definition: 'A sacrifice or contribution given to God with a cheerful heart.', reference: '2 Corinthians 9:7' },
        { letter: 'P', type: 'starts', word: 'PROVERBS', definition: 'Book of practical wisdom written mainly by Solomon.', reference: 'Proverbs' },
        { letter: 'R', type: 'starts', word: 'REDEMPTION', definition: 'Action of rescuing or paying the price of our freedom.', reference: 'Colossians 1:14' },
        { letter: 'S', type: 'starts', word: 'HOLINESS', definition: 'God\'s calling: "Be holy, because I am holy".', reference: '1 Peter 1:16' },
        { letter: 'T', type: 'starts', word: 'TABERNACLE', definition: 'The mobile sanctuary where God dwelt in the midst of His people.', reference: 'Exodus 25' },
        { letter: 'U', type: 'contains', word: 'ANOINTING', definition: 'Consecration poured out using holy oil.', reference: '1 Samuel 16:13' },
        { letter: 'V', type: 'starts', word: 'VICTORY', definition: 'Given by God: "But thanks be to God, who gives us the ______".', reference: '1 Corinthians 15:57' },
        { letter: 'Z', type: 'starts', word: 'ZECHARIAH', definition: 'Minor prophet and father of John the Baptist who became mute for doubting.', reference: 'Luke 1' }
      ],
      // SET B
      [
        { letter: 'A', type: 'starts', word: 'ALTAR', definition: 'A place made of stone where sacrifices and offerings were made to God.', reference: 'Genesis 8:20' },
        { letter: 'B', type: 'starts', word: 'BAPTISM', definition: 'The sacrament of water signifying our union with Christ\'s death and resurrection.', reference: 'Romans 6:4' },
        { letter: 'C', type: 'starts', word: 'CORINTH', definition: 'A prominent Greek city where Paul established a church and wrote two letters.', reference: '1 Corinthians 1' },
        { letter: 'D', type: 'starts', word: 'DEUTERONOMY', definition: 'The fifth book of the Pentateuch, meaning "second law".', reference: 'Deuteronomy' },
        { letter: 'E', type: 'starts', word: 'EXODUS', definition: 'The biblical book describing Israel\'s departure from Egyptian bondage.', reference: 'Exodus' },
        { letter: 'F', type: 'starts', word: 'PHARISEE', definition: 'A member of a strict Jewish sect concerned with outward law keeping.', reference: 'Matthew 23' },
        { letter: 'G', type: 'starts', word: 'GALATIANS', definition: 'Paul\'s letter defending justification by faith alone against legalism.', reference: 'Galatians 2:16' },
        { letter: 'H', type: 'starts', word: 'HYPOCRISY', definition: 'The pretense of having moral standards or beliefs that one does not practice.', reference: 'Luke 12:1' },
        { letter: 'I', type: 'starts', word: 'ISRAEL', definition: 'The collective name for the twelve tribes descended from Jacob.', reference: 'Exodus 1:1' },
        { letter: 'J', type: 'starts', word: 'JERICHO', definition: 'The first city conquered in Canaan, whose walls collapsed after a shout.', reference: 'Joshua 6' },
        { letter: 'L', type: 'starts', word: 'LUKE', definition: 'The author of the third Gospel and the Acts of the Apostles.', reference: 'Luke 1' },
        { letter: 'M', type: 'starts', word: 'MANNA', definition: 'The bread from heaven that God provided to sustain Israel in the wilderness.', reference: 'Exodus 16' },
        { letter: 'N', type: 'starts', word: 'NICODEMUS', definition: 'A Pharisee and member of the Sanhedrin who came to Jesus by night.', reference: 'John 3' },
        { letter: 'O', type: 'starts', word: 'OVERCOME', definition: '"Do not be ________ by evil, but ________ evil with good."', reference: 'Romans 12:21' },
        { letter: 'P', type: 'starts', word: 'PENTECOST', definition: 'The day the Holy Spirit descended upon the early church in Jerusalem.', reference: 'Acts 2' },
        { letter: 'R', type: 'starts', word: 'RECONCILIATION', definition: 'The restoration of friendly relations between God and humanity.', reference: '2 Corinthians 5:18' },
        { letter: 'S', type: 'starts', word: 'SYNAGOGUE', definition: 'The local place of assembly and instruction for Jewish communities.', reference: 'Luke 4:16' },
        { letter: 'T', type: 'starts', word: 'TESTAMENT', definition: 'One of the two primary divisions of the holy scriptures.', reference: 'Hebrews 9:15' },
        { letter: 'U', type: 'contains', word: 'COMMUNION', definition: 'The sharing of intimate thoughts and feelings or the Lord\'s Supper.', reference: '1 Corinthians 10:16' },
        { letter: 'V', type: 'starts', word: 'VIRGEN', definition: 'The status of Mary when she conceived Jesus by the Holy Spirit (spelled Virgen/Virgin).', reference: 'Isaiah 7:14' },
        { letter: 'Z', type: 'starts', word: 'ZERUBBABEL', definition: 'The governor who led the return from exile and rebuilt the temple.', reference: 'Ezra 3:2' }
      ]
    ],
    avanzado: [
      // SET A
      [
        { letter: 'A', type: 'starts', word: 'APOLOGETICS', definition: 'Reasoned and systematic defense of the Christian faith.', reference: '10 Pedro 3:15' },
        { letter: 'B', type: 'starts', word: 'BEREA', definition: 'City whose inhabitants searched the Scriptures daily.', reference: 'Acts 17:11' },
        { letter: 'C', type: 'starts', word: 'CHRONOLOGY', definition: 'The ordering of kings, prophets, and covenants in time.', reference: '1 Chronicles' },
        { letter: 'D', type: 'starts', word: 'DOCTRINE', definition: 'Sound teaching of faith: "Watch your life and ______ closely".', reference: '1 Timothy 4:16' },
        { letter: 'E', type: 'starts', word: 'ESCHATOLOGY', definition: 'The theological study of end-time things and prophecy.', reference: 'Revelation' },
        { letter: 'F', type: 'starts', word: 'PHILEMON', definition: 'Epistle about forgiveness addressed to a master by his slave Onesimus.', reference: 'Philemon' },
        { letter: 'G', type: 'starts', word: 'GALATIANS', definition: 'Epistle combating the legalistic heresy of justification by works.', reference: 'Galatians' },
        { letter: 'H', type: 'starts', word: 'HERMENEUTICS', definition: 'Science and art of the correct interpretation of Scriptures.', reference: '2 Timothy 2:15' },
        { letter: 'I', type: 'starts', word: 'INERRANCY', definition: 'Doctrine that the original Word written by God contains no error.', reference: 'Psalm 19:7' },
        { letter: 'J', type: 'starts', word: 'JUSTIFICATION', definition: 'Divine judicial act declaring us righteous through faith.', reference: 'Romans 5:1' },
        { letter: 'L', type: 'starts', word: 'LAMENTATIONS', definition: 'Book of sorrow and mourning written by the prophet Jeremiah.', reference: 'Lamentations' },
        { letter: 'M', type: 'starts', word: 'MELCHIZEDEK', definition: 'King of Salem and priest of God Most High, a figure of Christ.', reference: 'Hebrews 7' },
        { letter: 'N', type: 'starts', word: 'NEHEMIAH', definition: 'Zealous governor who led the physical rebuilding of the walls.', reference: 'Nehemiah' },
        { letter: 'O', type: 'starts', word: 'ONESIMUS', definition: 'Runaway slave who converted under Paul\'s ministry.', reference: 'Philemon' },
        { letter: 'P', type: 'starts', word: 'PENTATEUCH', definition: 'Greek name for the Law or Torah given by God to Moses.', reference: 'Deuteronomy' },
        { letter: 'R', type: 'starts', word: 'REVELATION', definition: 'The manifestation of God\'s truth that was previously hidden.', reference: 'Ephesians 3:3' },
        { letter: 'S', type: 'starts', word: 'SOTERIOLOGY', definition: 'The study of the doctrine of salvation.', reference: 'Romans' },
        { letter: 'T', type: 'starts', word: 'THEOLOGY', definition: 'Study of the person, character, and revelation of God.', reference: 'Colossians 2:8' },
        { letter: 'U', type: 'contains', word: 'SANCTUARY', definition: 'The Most Holy place where the presence of the Living God dwelt.', reference: 'Hebrews 9:3' },
        { letter: 'V', type: 'starts', word: 'VOCATION', definition: 'Effectual calling that God makes to the believer for ministry.', reference: 'Ephesians 4:1' },
        { letter: 'Z', type: 'starts', word: 'ZERUBBABEL', definition: 'Governor who led the return from exile and rebuilt the temple.', reference: 'Haggai 2:2' }
      ],
      // SET B
      [
        { letter: 'A', type: 'starts', word: 'ANTHROPOLOGY', definition: 'The theological study of the origin, nature, and fall of humanity.', reference: 'Genesis 1:27' },
        { letter: 'B', type: 'starts', word: 'BABYLON', definition: 'The empire that took the southern kingdom of Judah into exile.', reference: '2 Kings 24' },
        { letter: 'C', type: 'starts', word: 'CANON', definition: 'The official list of inspired books accepted as scripture.', reference: 'Revelation 22' },
        { letter: 'D', type: 'starts', word: 'DECALOGUE', definition: 'The theological term for the Ten Commandments of the law.', reference: 'Exodus 20' },
        { letter: 'E', type: 'starts', word: 'EXEGESIS', definition: 'The critical and historical interpretation of a biblical text.', reference: 'Nehemiah 8:8' },
        { letter: 'F', type: 'starts', word: 'PHYLACTERY', definition: 'A small leather box containing Hebrew texts worn by Jews during prayer.', reference: 'Matthew 23:5' },
        { letter: 'G', type: 'starts', word: 'GENTILES', definition: 'Non-Jewish nations who became fellow heirs of the promise of grace.', reference: 'Ephesians 3:6' },
        { letter: 'H', type: 'starts', word: 'HYPOSTATIC', definition: 'The ________ union describes the combining of divine and human natures in Jesus.', reference: 'Colossians 2:9' },
        { letter: 'I', type: 'starts', word: 'INSPIRATION', definition: 'The divine influence by which the Holy Spirit guided human authors.', reference: '2 Timothy 3:16' },
        { letter: 'J', type: 'starts', word: 'JUDEA', definition: 'The southern region of Palestine where Jesus was born.', reference: 'Matthew 2:1' },
        { letter: 'L', type: 'starts', word: 'LITURGY', definition: 'A prescribed form or set of rites for public worship.', reference: 'Hebrews 9' },
        { letter: 'M', type: 'starts', word: 'MONOTHEISM', definition: 'The fundamental doctrine that there is only one true God.', reference: 'Deuteronomy 6:4' },
        { letter: 'N', type: 'starts', word: 'NICODEMUS', definition: 'The Pharisee who helped Joseph of Arimathea bury Jesus.', reference: 'John 19:39' },
        { letter: 'O', type: 'starts', word: 'ORTHODOXY', definition: 'Conformance to correct theological beliefs and biblical truth.', reference: 'Tito 2:1' },
        { letter: 'P', type: 'starts', word: 'PROVIDENCE', definition: 'God\'s continuous preservation and government of all creation.', reference: 'Matthew 10:29' },
        { letter: 'R', type: 'starts', word: 'REDEMPTION', definition: 'The rescue of sinners through the blood of Jesus Christ.', reference: 'Ephesians 1:7' },
        { letter: 'S', type: 'starts', word: 'SANCTIFICATION', definition: 'The progressive work of the Holy Spirit in making a believer holy.', reference: '1 Thessalonians 4:3' },
        { letter: 'T', type: 'starts', word: 'TRINITY', definition: 'The doctrine of one God existing in three co-equal divine Persons.', reference: 'Matthew 28:19' },
        { letter: 'U', type: 'contains', word: 'TRIBULATION', definition: 'The period of great suffering prophesied at the end of age.', reference: 'Matthew 24:21' },
        { letter: 'V', type: 'starts', word: 'VERACITY', definition: 'The attribute of God by which He is completely truthful and faithful.', reference: 'Numbers 23:19' },
        { letter: 'Z', type: 'starts', word: 'ZECHARIAH', definition: 'The priest and prophet murdered between the temple and the altar.', reference: 'Matthew 23:35' }
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
        hints: ['Defense against fiery darts', 'Helmet of salvation', 'Sword of the Spirit', 'Spiritual assurance', 'Belt of truth'],
        references: ['Ephesians 6:13-17'] 
      },
      { 
        id: 'ws5', 
        theme: 'Love Qualities', 
        words: ['PATIENT', 'KIND', 'TRUTHFUL', 'ETERNAL'], 
        hints: ['Endures with calm', 'Acts in goodness', 'Rejoices with truth', 'Never fails'],
        references: ['1 Corinthians 13'] 
      }
    ],
    avanzado: [
      { id: 'ws6', theme: 'Minor Prophets', words: ['HOSEA', 'JOEL', 'AMOS', 'OBADIAH', 'JONAH', 'MICAH'], references: ['Old Testament'] },
      { id: 'ws7', theme: 'Churches of Revelation', words: ['EPHESUS', 'SMYRNA', 'PERGAMUM', 'THYATIRA', 'SARDIS', 'PHILADELPHIA'], references: ['Revelation 2-3'] }
    ]
  },
  classification: [
    {
      id: 'cl1',
      theme: 'Books Testament',
      categories: ['Old Testament', 'New Testament'],
      items: [
        { name: 'Genesis', category: 'Old Testament', hint: 'The start of creation and promise.' },
        { name: 'Matthew', category: 'New Testament', hint: 'The Gospel of the King and Savior.' },
        { name: 'Isaiah', category: 'Old Testament', hint: 'Prophecies of the suffering Messiah.' },
        { name: 'Romans', category: 'New Testament', hint: 'Paul\'s letter on the doctrine of grace.' },
        { name: 'Exodus', category: 'Old Testament', hint: 'Physical redemption and the law.' },
        { name: 'Revelation', category: 'New Testament', hint: 'The revelation of the end times.' }
      ]
    },
    {
      id: 'cl2',
      theme: 'Literary Sections',
      categories: ['Poetic / Wisdom', 'Epistles / Letters'],
      items: [
        { name: 'Psalms', category: 'Poetic / Wisdom', hint: 'Songs of worship and intimate fellowship.' },
        { name: 'Ephesians', category: 'Epistles / Letters', hint: 'Letter on spiritual blessings in Christ.' },
        { name: 'Proverbs', category: 'Poetic / Wisdom', hint: 'Divine wisdom for daily living.' },
        { name: 'Galatians', category: 'Epistles / Letters', hint: 'Epistle defending freedom from the law.' },
        { name: 'Ecclesiastes', category: 'Poetic / Wisdom', hint: 'Meditation on purpose and vanity of life.' },
        { name: 'James', category: 'Epistles / Letters', hint: 'Practical letter on faith proven by works.' }
      ]
    }
  ],
  counseling: [
    {
      id: 'co1',
      theme: 'Facing Offense',
      title: 'Facing Offense',
      description: 'A coworker has falsely slandered you in front of superiors to get a promotion. You feel anger and desire for vindication.',
      question: 'What is the appropriate biblical attitude and counsel to respond to this offense?',
      options: [
        'Confront them publicly with anger to show you have character and prevent them from doing it again.',
        'Do not repay evil for evil, leave justice in the Lord\'s hands, bless them, and seek to resolve it peacefully.',
        'Ignore it completely but tell your other coworkers how bad they are to defend your reputation.'
      ],
      correctIndex: 1,
      biblicalSupport: 'Romans 12:17-19',
      devotionalExcerpt: 'The Word teaches us not to repay anyone evil for evil. Committing our cause to the Lord shows trust in His justice and guards our heart from bitterness.',
      suggestedVerse: 'Romans 12:19: "Do not take revenge, my dear friends, but leave room for God\'s wrath, for it is written: \'It is mine to avenge; I will repay,\' says the Lord."'
    },
    {
      id: 'co2',
      theme: 'Anxiety in Scarcity',
      title: 'Anxiety in Scarcity',
      description: 'You are going through financial difficulties due to an unexpected layoff. You have trouble sleeping thinking about how to pay rent and buy food.',
      question: 'How does the Gospel teach us to face financial worry?',
      options: [
        'Pray and cry out in faith to the Father, remember that He feeds the birds and clothes the flowers, and seek first His Kingdom.',
        'Work without rest neglecting the Lord\'s day and your family, trusting only in your own strength.',
        'Lament and doubt God\'s goodness, believing He has abandoned you because of past sins.'
      ],
      correctIndex: 0,
      biblicalSupport: 'Matthew 6:31-33',
      devotionalExcerpt: 'Jesus invites us to trust in our heavenly Father, who knows what things we need. Prayer and alignment of priorities bring peace to the troubled soul.',
      suggestedVerse: 'Matthew 6:33: "But seek first his kingdom and his righteousness, and all these things will be given to you as well."'
    },
    {
      id: 'co3',
      theme: 'Doubts in Faith',
      title: 'Doubts in Faith',
      description: 'A friend presents complex scientific and historical arguments contradicting God\'s creation and miracles. You feel your trust in the Bible\'s inspiration waver.',
      question: 'What biblical principle of research and theological firmness should you apply?',
      options: [
        'Ignore all science so as not to contaminate yourself, keeping a blind faith without studying arguments.',
        'Search the Scriptures diligently, study with sound apologetics, and remember that faith rests on firm evidences and the Holy Spirit.',
        'Accept that the Bible is only a moral book of the past without historical or scientific relevance.'
      ],
      correctIndex: 1,
      biblicalSupport: '1 Peter 3:15',
      devotionalExcerpt: 'The believer does not fear truth. The Bible urges us to be prepared to make a defense with gentleness and respect to everyone who asks us for a reason for our hope.',
      suggestedVerse: '1 Peter 3:15: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect."'
    }
  ]
};

export const getNewChallenges = (lang: string): NewChallengesCatalog => {
  return lang === 'en' ? newChallengesEn : newChallengesEs;
};
