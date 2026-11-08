// Catálogo de actividades educativas. Las consignas no son citas textuales.
export interface RoscoLetterChallenge {
  letter: string;
  type: 'starts' | 'contains';
  word: string;
  acceptedAnswers?: string[];
  definition: string;
  reference: string;
  contextNote?: string;
  guidance?: string;
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface WordSearchSet {
  id: string;
  theme: string;
  words: string[];
  hints?: string[];
  references: string[];
  contextNote?: string;
  guidance?: string;
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface ClassificationItem {
  name: string;
  category: string;
  hint?: string;
  contextNote?: string;
  guidance?: string;
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface ClassificationSet {
  id: string;
  theme: string;
  categories: string[];
  items: ClassificationItem[];
  contextNote?: string;
  guidance?: string;
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
  contextNote?: string;
  guidance?: string;
  metadata?: import('../utils/doctrinalFilter').DoctrinalMetadata;
}

export interface NewChallengesCatalog {
  rosco: Record<string, RoscoLetterChallenge[][]>;
  wordSearch: Record<string, WordSearchSet[]>;
  classification: ClassificationSet[];
  counseling: CounselingCase[];
}

export const newChallengesEs: NewChallengesCatalog = {
  "rosco": {
    "principiante": [
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABRAHAM",
          "definition": "Nombre que Dios dio a Abram al establecer su pacto con él.",
          "reference": "Génesis 17:5"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BELÉN",
          "definition": "Ciudad de Judea donde nació Jesús, según Mateo.",
          "reference": "Mateo 2:1",
          "acceptedAnswers": [
            "BETHLEHEM"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CRISTO",
          "definition": "Título con el que Pedro identifica a Jesús antes de llamarlo Hijo del Dios viviente.",
          "reference": "Mateo 16:16"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DAVID",
          "definition": "Joven que se ofreció ante Saúl para enfrentarse al filisteo.",
          "reference": "1 Samuel 17:32"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EDÉN",
          "definition": "Lugar donde Dios plantó un huerto y puso al hombre.",
          "reference": "Génesis 2:8"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FE",
          "definition": "¿Qué tema presenta este versículo al hablar de lo que se espera y no se ve?",
          "reference": "Hebreos 11:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRACIA",
          "definition": "¿Por qué dice Pablo que somos salvos por medio de la fe?",
          "reference": "Efesios 2:8"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HIJO",
          "definition": "Relación familiar del joven cuyo regreso celebra el padre en la parábola.",
          "reference": "Lucas 15:24"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAAC",
          "definition": "Nombre que Abraham dio al hijo que le nació de Sara.",
          "reference": "Génesis 21:3"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JONÁS",
          "definition": "Profeta, hijo de Amitai, a quien Dios dirigió su palabra.",
          "reference": "Jonás 1:1"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LÁZARO",
          "definition": "Nombre del hombre a quien Jesús llamó a salir del sepulcro.",
          "reference": "Juan 11:43"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MOISÉS",
          "definition": "Hombre al que Dios llamó por su nombre desde la zarza.",
          "reference": "Éxodo 3:4"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NOÉ",
          "definition": "Hombre que caminaba con Dios y era padre de Sem, Cam y Jafet.",
          "reference": "Génesis 6:9-10"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ORACIÓN",
          "definition": "Práctica que Pablo menciona junto con el ruego y la acción de gracias al presentar peticiones a Dios.",
          "reference": "Filipenses 4:6"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PEDRO",
          "definition": "Nombre con el que Jesús se dirige a Simón en este versículo.",
          "reference": "Mateo 16:18"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RUT",
          "definition": "Mujer que expresó a Noemí su decisión de acompañarla y compartir su pueblo.",
          "reference": "Rut 1:16"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIERVO",
          "definition": "Condición del hombre al que su señor felicita por haber sido fiel en lo poco.",
          "reference": "Mateo 25:21"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIMOTEO",
          "definition": "Destinatario cuya fe Pablo relaciona con la de su abuela Loida y su madre Eunice.",
          "reference": "2 Timoteo 1:2-5"
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "CRUZ",
          "definition": "Objeto que Jesús llevaba al salir hacia el lugar llamado de la Calavera.",
          "reference": "Juan 19:17"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VERDAD",
          "definition": "¿Cómo se presenta Jesús entre las imágenes del camino y la vida?",
          "reference": "Juan 14:6"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZAQUEO",
          "definition": "Jefe de publicanos rico a quien Jesús encontró en Jericó.",
          "reference": "Lucas 19:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ARCA",
          "definition": "Embarcación que Dios mandó construir a Noé con madera de gofer.",
          "reference": "Génesis 6:14"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BERNABÉ",
          "definition": "Sobrenombre que los apóstoles dieron a José, un levita de Chipre.",
          "reference": "Hechos 4:36"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CANAÁN",
          "definition": "Tierra hacia la que Abram partió con Sarai y Lot.",
          "reference": "Génesis 12:5"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DOCE",
          "definition": "Cantidad de discípulos que Jesús escogió y llamó apóstoles.",
          "reference": "Lucas 6:13"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EGIPTO",
          "definition": "País del que Dios recuerda haber sacado a su pueblo.",
          "reference": "Éxodo 20:2"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FARAÓN",
          "definition": "Título del gobernante al que Moisés y Aarón pidieron que dejara salir al pueblo.",
          "reference": "Éxodo 5:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GOLIAT",
          "definition": "Nombre del paladín filisteo que salió de Gat.",
          "reference": "1 Samuel 17:4"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HERMANO",
          "definition": "Relación de Abel con Caín, mencionada en la pregunta que Dios le hace a Caín.",
          "reference": "Génesis 4:9"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "IGLESIA",
          "definition": "Comunidad que hacía oración a Dios por Pedro mientras estaba preso.",
          "reference": "Hechos 12:5"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JESÚS",
          "definition": "Nombre que debía recibir el hijo de María porque salvaría a su pueblo de sus pecados.",
          "reference": "Mateo 1:21"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LUCAS",
          "definition": "Nombre del médico amado que envía saludos junto con Demas.",
          "reference": "Colosenses 4:14"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARÍA",
          "definition": "Nombre de la joven de Nazaret desposada con José a quien fue enviado Gabriel.",
          "reference": "Lucas 1:26-27"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NÍNIVE",
          "definition": "Gran ciudad a la que Dios envió a Jonás a predicar.",
          "reference": "Jonás 1:2"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBEDIENCIA",
          "definition": "Actitud que Samuel presenta como preferible a los sacrificios, expresada como sustantivo.",
          "reference": "1 Samuel 15:22",
          "acceptedAnswers": [
            "OBEDECER"
          ]
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PABLO",
          "definition": "Nombre por el que también era conocido Saulo.",
          "reference": "Hechos 13:9"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RESURRECCIÓN",
          "definition": "Palabra con la que Jesús se presenta junto con la vida al hablar con Marta.",
          "reference": "Juan 11:25"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SANSÓN",
          "definition": "Nombre que la mujer de Manoa dio al hijo que le nació.",
          "reference": "Jueces 13:24",
          "acceptedAnswers": [
            "SAMSÓN"
          ]
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TEMPLO",
          "definition": "Lugar donde los padres de Jesús lo encontraron escuchando y preguntando a los maestros.",
          "reference": "Lucas 2:46"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "ÚNICO",
          "definition": "Adjetivo que Jesús usa al referirse al Padre como Dios verdadero.",
          "reference": "Juan 17:3",
          "acceptedAnswers": [
            "SOLO"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIDA",
          "definition": "¿Cómo se presenta Jesús después de las imágenes del camino y la verdad?",
          "reference": "Juan 14:6"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZACARÍAS",
          "definition": "Sacerdote al que el ángel anunció que Elisabet tendría un hijo llamado Juan.",
          "reference": "Lucas 1:13"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ÁNGEL",
          "definition": "¿Qué clase de mensajero era Gabriel, enviado a Nazaret?",
          "reference": "Lucas 1:26"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BAUTISMO",
          "definition": "¿Qué nombre recibe en este versículo la práctica de arrepentimiento anunciada por Juan?",
          "reference": "Hechos 19:4"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CORINTO",
          "definition": "Ciudad a la que Pablo llegó después de salir de Atenas.",
          "reference": "Hechos 18:1"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DANIEL",
          "definition": "Hombre que siguió orando tres veces al día al enterarse del decreto del rey.",
          "reference": "Daniel 6:10"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ELÍAS",
          "definition": "Profeta tisbita que anunció a Acab que no habría lluvia sino por su palabra.",
          "reference": "1 Reyes 17:1"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FARISEO",
          "definition": "Uno de los dos hombres que subieron al templo a orar; el otro era publicano.",
          "reference": "Lucas 18:10"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GEDEÓN",
          "definition": "Hombre que estaba sacudiendo trigo en el lagar cuando llegó el ángel de Jehová.",
          "reference": "Jueces 6:11"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HEBREOS",
          "definition": "Pueblo cuyo Dios debían mencionar Moisés y los ancianos al presentarse ante el rey de Egipto.",
          "reference": "Éxodo 3:18"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAÍAS",
          "definition": "Profeta cuyo libro leía el funcionario etíope en su carro.",
          "reference": "Hechos 8:28"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JERICÓ",
          "definition": "Ciudad que estaba cerrada a causa de los hijos de Israel antes de caer sus muros.",
          "reference": "Josué 6:1"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIDIA",
          "definition": "Vendedora de púrpura de Tiatira que escuchaba a Pablo junto al río.",
          "reference": "Hechos 16:14"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MESÍAS",
          "definition": "Título que Andrés dijo haber encontrado y que el evangelio explica como el Cristo.",
          "reference": "Juan 1:41"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NICODEMO",
          "definition": "Fariseo que visitó a Jesús de noche.",
          "reference": "Juan 3:1-2"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OFRENDA",
          "definition": "Lo que Abel llevó de los primogénitos de sus ovejas y de lo más gordo de ellas.",
          "reference": "Génesis 4:4"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PRÓJIMO",
          "definition": "Palabra que Jesús usa al preguntar cuál de los tres se acercó al hombre herido.",
          "reference": "Lucas 10:36"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REDENCIÓN",
          "definition": "Beneficio que Pablo relaciona con la sangre de Cristo y el perdón de pecados.",
          "reference": "Efesios 1:7"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SANTIDAD",
          "definition": "Lo que la carta pide seguir junto con la paz con todos.",
          "reference": "Hebreos 12:14"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TABERNÁCULO",
          "definition": "Santuario portátil para el que Dios ordenó hacer diez cortinas.",
          "reference": "Éxodo 26:1"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNCIÓN",
          "definition": "Lo que Juan dice que sus lectores tienen del Santo.",
          "reference": "1 Juan 2:20"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VICTORIA",
          "definition": "Lo que Pablo agradece a Dios por medio de Jesucristo al terminar su enseñanza sobre la resurrección.",
          "reference": "1 Corintios 15:57"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZOROBABEL",
          "definition": "Hijo de Salatiel que participó en la edificación del altar al regresar del exilio.",
          "reference": "Esdras 3:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ALTAR",
          "definition": "Lugar de ofrenda que Noé edificó al salir del arca.",
          "reference": "Génesis 8:20"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BÁLSAMO",
          "definition": "Sustancia medicinal de Galaad mencionada en la pregunta del profeta.",
          "reference": "Jeremías 8:22"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CREACIÓN",
          "definition": "¿Qué dice Pablo que gime y sufre dolores hasta el presente?",
          "reference": "Romanos 8:22",
          "acceptedAnswers": [
            "CRIATURAS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DILUVIO",
          "definition": "Acontecimiento cuyas aguas elevaron el arca durante cuarenta días.",
          "reference": "Génesis 7:17"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTER",
          "definition": "Mujer a la que el rey puso la corona real en lugar de Vasti.",
          "reference": "Ester 2:17",
          "acceptedAnswers": [
            "ESTHER"
          ]
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FORTALEZA",
          "definition": "Palabra que acompaña a amparo al describir a Dios como ayuda en las tribulaciones.",
          "reference": "Salmos 46:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GALILEA",
          "definition": "Región cuyo mar recorría Jesús cuando vio a Pedro y Andrés echando la red.",
          "reference": "Mateo 4:18"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HERENCIA",
          "definition": "Bien que Pedro describe como incorruptible, incontaminado y reservado en los cielos.",
          "reference": "1 Pedro 1:4"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISRAEL",
          "definition": "Nuevo nombre que recibió Jacob después de luchar durante la noche.",
          "reference": "Génesis 32:28"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOSÉ",
          "definition": "Hijo al que Israel hizo una túnica de diversos colores.",
          "reference": "Génesis 37:3"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LÁMPARA",
          "definition": "Objeto con el que el salmista compara la palabra de Dios para sus pies.",
          "reference": "Salmos 119:105"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MANÁ",
          "definition": "Nombre que Israel dio al alimento que recibía en el desierto.",
          "reference": "Éxodo 16:31"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAZARET",
          "definition": "Ciudad de Galilea a la que Dios envió al ángel Gabriel.",
          "reference": "Lucas 1:26"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OSEAS",
          "definition": "Profeta, hijo de Beeri, al que llegó la palabra de Dios durante varios reinados de Judá.",
          "reference": "Oseas 1:1"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PACTO",
          "definition": "Acuerdo entre Dios y la tierra del que el arco en las nubes sería señal.",
          "reference": "Génesis 9:13",
          "acceptedAnswers": [
            "CONVENIO",
            "ALIANZA"
          ]
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REINO",
          "definition": "¿Qué pide Jesús buscar primero junto con la justicia de Dios?",
          "reference": "Mateo 6:33"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SINAGOGA",
          "definition": "Lugar al que Jesús entró en Nazaret, conforme a su costumbre, para leer.",
          "reference": "Lucas 4:16"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TESTIGO",
          "definition": "Persona que da testimonio; en plural, la tarea que Jesús anuncia a sus discípulos hasta lo último de la tierra.",
          "reference": "Hechos 1:8",
          "acceptedAnswers": [
            "TESTIGOS"
          ]
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "COMUNIÓN",
          "definition": "Práctica de los primeros creyentes mencionada junto con la enseñanza, el partimiento del pan y las oraciones.",
          "reference": "Hechos 2:42"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIRGEN",
          "definition": "Palabra con la que Lucas describe a María antes de mencionar que estaba desposada con José.",
          "reference": "Lucas 1:27"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZEBEDEO",
          "definition": "Padre de Jacobo (también llamado Santiago) y Juan, que estaba con ellos remendando redes.",
          "reference": "Mateo 4:21"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AARÓN",
          "definition": "Hermano de Moisés que sabía hablar bien, según la respuesta de Dios.",
          "reference": "Éxodo 4:14"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BARCA",
          "definition": "¿En qué entró Jesús antes de que sus discípulos lo siguieran y se levantara una tempestad?",
          "reference": "Mateo 8:23-24",
          "acceptedAnswers": [
            "BARCO"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CAMINO",
          "definition": "Imagen con la que Jesús se presenta junto con la verdad y la vida.",
          "reference": "Juan 14:6"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DAMASCO",
          "definition": "Ciudad a la que Saulo se acercaba cuando lo rodeó una luz del cielo.",
          "reference": "Hechos 9:3"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ÉFESO",
          "definition": "Ciudad donde Pablo encontró a unos discípulos después de recorrer las regiones superiores.",
          "reference": "Hechos 19:1"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FELIPE",
          "definition": "Discípulo que preguntó al lector etíope si entendía lo que leía.",
          "reference": "Hechos 8:30-31"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GABRIEL",
          "definition": "Nombre del ángel que habló con Zacarías en el templo.",
          "reference": "Lucas 1:19"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HAMBRE",
          "definition": "Necesidad que sobrevino en la provincia después de que el hijo menor lo gastó todo.",
          "reference": "Lucas 15:14"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISMAEL",
          "definition": "Nombre del hijo que Agar dio a Abram.",
          "reference": "Génesis 16:15"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JACOB",
          "definition": "Nombre del hijo que nació asiendo el talón de Esaú.",
          "reference": "Génesis 25:26"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LECHE",
          "definition": "Alimento que Pedro usa como imagen de lo que deben desear los recién nacidos.",
          "reference": "1 Pedro 2:2"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARTA",
          "definition": "Mujer que recibió a Jesús en su casa y tenía una hermana llamada María.",
          "reference": "Lucas 10:38"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NATANAEL",
          "definition": "Hombre al que Felipe anunció que había encontrado a Jesús de Nazaret.",
          "reference": "Juan 1:45"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OLIVOS",
          "definition": "Árboles que dan nombre al monte al que Jesús acostumbraba ir.",
          "reference": "Lucas 22:39",
          "acceptedAnswers": [
            "OLIVAS"
          ]
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PAN",
          "definition": "Alimento que Jesús incluye en la petición cotidiana de la oración que enseñó.",
          "reference": "Mateo 6:11"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RAQUEL",
          "definition": "Hija de Labán que llegó con las ovejas de su padre cuando Jacob estaba junto al pozo.",
          "reference": "Génesis 29:10",
          "acceptedAnswers": [
            "RACHÊL"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SAMUEL",
          "definition": "Joven al que Dios llamó durante la noche y que respondió dispuesto a escuchar.",
          "reference": "1 Samuel 3:10"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TOMÁS",
          "definition": "Discípulo llamado Dídimo que no estaba cuando Jesús se presentó a los otros.",
          "reference": "Juan 20:24"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UR",
          "definition": "Ciudad de los caldeos de la que salió Taré con Abram, Sarai y Lot.",
          "reference": "Génesis 11:31"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VID",
          "definition": "Planta con la que Jesús se compara al llamar al Padre labrador.",
          "reference": "Juan 15:1"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CALZADO",
          "definition": "Lo que Dios mandó quitar a Moisés de sus pies porque estaba en tierra santa.",
          "reference": "Éxodo 3:5",
          "acceptedAnswers": [
            "ZAPATOS",
            "SANDALIAS"
          ]
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABEL",
          "definition": "Hermano de Caín que se dedicaba a cuidar ovejas.",
          "reference": "Génesis 4:2"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BARTIMEO",
          "definition": "Nombre del hombre ciego, hijo de Timeo, que estaba junto al camino de Jericó.",
          "reference": "Marcos 10:46"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CANÁ",
          "definition": "Localidad de Galilea donde se celebró una boda a la que fue invitado Jesús.",
          "reference": "Juan 2:1"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DÉBORA",
          "definition": "Profetisa, mujer de Lapidot, que juzgaba a Israel.",
          "reference": "Jueces 4:4"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ELISEO",
          "definition": "Profeta que tomó el manto de Elías y golpeó con él las aguas del Jordán.",
          "reference": "2 Reyes 2:14"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FILEMÓN",
          "definition": "Colaborador amado a quien Pablo dirige la carta junto con otros destinatarios.",
          "reference": "Filemón 1:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GETSEMANÍ",
          "definition": "Lugar al que Jesús fue con sus discípulos antes de apartarse a orar.",
          "reference": "Mateo 26:36",
          "acceptedAnswers": [
            "GETHSEMANÍ"
          ]
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HARINA",
          "definition": "Ingrediente que la viuda de Sarepta tenía en poca cantidad en una tinaja.",
          "reference": "1 Reyes 17:12"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAÍ",
          "definition": "Padre de Belén a cuya casa fue enviado Samuel para ungir a un rey.",
          "reference": "1 Samuel 16:1"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUDÁ",
          "definition": "Nombre que Lea dio al hijo al nacer el cual expresó su alabanza a Jehová.",
          "reference": "Génesis 29:35"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LEÓN",
          "definition": "Animal que David menciona junto al oso al contar cómo defendía el rebaño.",
          "reference": "1 Samuel 17:34-35"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MATEO",
          "definition": "Nombre del hombre que Jesús llamó cuando estaba sentado al banco de los tributos.",
          "reference": "Mateo 9:9"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NEHEMÍAS",
          "definition": "Hijo de Hacalías que recibió noticias de Jerusalén estando en Susa.",
          "reference": "Nehemías 1:1-3"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ORO",
          "definition": "Metal precioso que los visitantes de oriente ofrecieron a Jesús junto con incienso y mirra.",
          "reference": "Mateo 2:11"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PALOMA",
          "definition": "Ave que regresó a Noé con una hoja de olivo en el pico.",
          "reference": "Génesis 8:11"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REBECA",
          "definition": "Hija de Betuel que llegó al pozo con un cántaro sobre el hombro.",
          "reference": "Génesis 24:15"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SAL",
          "definition": "Sustancia con la que Jesús compara a sus discípulos respecto de la tierra.",
          "reference": "Mateo 5:13"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TABITA",
          "definition": "Nombre arameo de la discípula de Jope también llamada Dorcas.",
          "reference": "Hechos 9:36",
          "acceptedAnswers": [
            "TABITHA"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UZ",
          "definition": "Tierra en la que vivía Job al comenzar el libro.",
          "reference": "Job 1:1",
          "acceptedAnswers": [
            "HUS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIUDA",
          "definition": "Condición de la mujer pobre que echó dos pequeñas monedas en las ofrendas.",
          "reference": "Lucas 21:2"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZARZA",
          "definition": "Arbusto que ardía sin consumirse cuando Moisés vio al ángel de Jehová.",
          "reference": "Éxodo 3:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ADÁN",
          "definition": "Hombre al que Dios llevó los animales para que les pusiera nombre.",
          "reference": "Génesis 2:19",
          "acceptedAnswers": [
            "ADAM"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BETANIA",
          "definition": "Aldea de María y Marta donde vivía Lázaro.",
          "reference": "Juan 11:1",
          "acceptedAnswers": [
            "BETHANIA"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CENTURIÓN",
          "definition": "Cargo del hombre que pidió a Jesús ayuda para su criado enfermo en Capernaum.",
          "reference": "Mateo 8:5-6"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DESIERTO",
          "definition": "Lugar al que Jesús fue llevado por el Espíritu antes de ser tentado.",
          "reference": "Mateo 4:1"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EMAÚS",
          "definition": "Aldea hacia la que iban dos discípulos el día de la resurrección de Jesús.",
          "reference": "Lucas 24:13",
          "acceptedAnswers": [
            "EMMAÚS"
          ]
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FILIPOS",
          "definition": "Ciudad de Macedonia a la que Pablo y sus compañeros llegaron desde Neápolis.",
          "reference": "Hechos 16:12"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRANO",
          "definition": "Palabra con la que Jesús presenta la imagen del trigo que cae en la tierra y muere.",
          "reference": "Juan 12:24"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HIGOS",
          "definition": "Frutos que Jesús menciona al preguntar si se recogen de los abrojos.",
          "reference": "Mateo 7:16"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ICONIO",
          "definition": "Ciudad donde Pablo y Bernabé hablaron en la sinagoga y muchos creyeron.",
          "reference": "Hechos 14:1"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JERUSALÉN",
          "definition": "Ciudad a la que los padres de Jesús iban cada año para la fiesta de la pascua.",
          "reference": "Lucas 2:41",
          "acceptedAnswers": [
            "JERUSALEM"
          ]
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LEVADURA",
          "definition": "Ingrediente que una mujer mezcló con tres medidas de harina en una parábola de Jesús.",
          "reference": "Mateo 13:33"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARCOS",
          "definition": "Otro nombre de Juan, cuya madre María recibía a los creyentes en su casa.",
          "reference": "Hechos 12:12"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NECESIDAD",
          "definition": "Aquello que Pablo dice que Dios suplirá conforme a sus riquezas en gloria.",
          "reference": "Filipenses 4:19",
          "acceptedAnswers": [
            "LO QUE OS FALTA",
            "NECESIDADES"
          ]
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OVEJA",
          "definition": "Animal perdido que el pastor de la parábola sale a buscar, en singular.",
          "reference": "Lucas 15:4"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PASTOR",
          "definition": "Oficio con el que David compara el cuidado de Jehová.",
          "reference": "Salmos 23:1"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RED",
          "definition": "Instrumento que Simón y Andrés echaban en el mar al pasar Jesús.",
          "reference": "Mateo 4:18"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SARA",
          "definition": "Nombre que Dios indicó para la esposa de Abraham, antes llamada Sarai.",
          "reference": "Génesis 17:15"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TALENTOS",
          "definition": "Bienes que el señor de la parábola distribuyó en cantidades de cinco, dos y uno.",
          "reference": "Mateo 25:15"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "URÍAS",
          "definition": "Nombre del heteo que era esposo de Betsabé.",
          "reference": "2 Samuel 11:3",
          "acceptedAnswers": [
            "URÍA"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VECINAS",
          "definition": "Personas que dieron nombre a Obed y dijeron que había nacido un hijo a Noemí.",
          "reference": "Rut 4:17"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZAFIRO",
          "definition": "Piedra preciosa con la que se compara el pavimento bajo los pies del Dios de Israel.",
          "reference": "Éxodo 24:10"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AGUA",
          "definition": "¿Con qué mandó Jesús llenar las tinajas en Caná antes de convertir su contenido en vino?",
          "reference": "Juan 2:7-9"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BETEL",
          "definition": "Nombre que Jacob dio al lugar llamado antes Luz.",
          "reference": "Génesis 28:19",
          "acceptedAnswers": [
            "BETH-EL"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CIELO",
          "definition": "Nombre que Dios dio a la expansión en el relato de la creación.",
          "reference": "Génesis 1:8",
          "acceptedAnswers": [
            "CIELOS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIEZ",
          "definition": "Cantidad de hombres con lepra que salieron al encuentro de Jesús.",
          "reference": "Lucas 17:12"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESPERANZA",
          "definition": "¿De qué llama Pablo a Dios al pedir que los creyentes abunden en ella?",
          "reference": "Romanos 15:13"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FRUTO",
          "definition": "Palabra que encabeza la enumeración del amor, gozo, paz y otras cualidades del Espíritu.",
          "reference": "Gálatas 5:22"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GUSANO",
          "definition": "Animal que dañó la planta que daba sombra a Jonás.",
          "reference": "Jonás 4:7"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HISOPO",
          "definition": "Planta que David menciona al pedir ser purificado.",
          "reference": "Salmos 51:7"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISLA",
          "definition": "Tipo de tierra rodeada de agua en la que Pablo dijo que tendrían que dar.",
          "reference": "Hechos 27:26"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JORDÁN",
          "definition": "Río cuyo cauce cruzó Israel mientras los sacerdotes permanecían en seco con el arca.",
          "reference": "Josué 3:17"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIBRO",
          "definition": "Objeto que entregaron a Jesús para leer al profeta Isaías en la sinagoga.",
          "reference": "Lucas 4:17"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MANSEDUMBRE",
          "definition": "Actitud con la que Pablo pide restaurar a quien ha sido sorprendido en una falta.",
          "reference": "Gálatas 6:1"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NOCHE",
          "definition": "Nombre que Dios dio a las tinieblas al distinguirlas de la luz.",
          "reference": "Génesis 1:5"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OÍDOS",
          "definition": "Órganos que Jesús menciona al invitar a escuchar.",
          "reference": "Mateo 13:9"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PACIENCIA",
          "definition": "Cualidad que produce la prueba de la fe, según Santiago.",
          "reference": "Santiago 1:3"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROCA",
          "definition": "Base sobre la que edificó su casa el hombre prudente de la comparación de Jesús.",
          "reference": "Mateo 7:24",
          "acceptedAnswers": [
            "PEÑA"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIÓN",
          "definition": "Monte con el que se compara a quienes confían en Jehová y permanecen firmes.",
          "reference": "Salmos 125:1"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIERRA",
          "definition": "Nombre que Dios dio a la parte seca al reunir las aguas.",
          "reference": "Génesis 1:10"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UZÍAS",
          "definition": "Rey cuya muerte sitúa en el tiempo la visión del Señor que tuvo Isaías.",
          "reference": "Isaías 6:1",
          "acceptedAnswers": [
            "UZZÍAS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VESTIDO",
          "definition": "Necesidad humana sobre la que Jesús habla al invitar a mirar los lirios del campo.",
          "reference": "Mateo 6:28"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CIZAÑA",
          "definition": "Planta que un enemigo sembró entre el trigo mientras los hombres dormían.",
          "reference": "Mateo 13:25"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AMOR",
          "definition": "¿Cuál es la mayor de las tres virtudes mencionadas al final de este capítulo?",
          "reference": "1 Corintios 13:13",
          "acceptedAnswers": [
            "CARIDAD"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BOOZ",
          "definition": "Pariente de Elimelec en cuyo campo Rut fue a recoger espigas.",
          "reference": "Rut 2:1"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CINCO",
          "definition": "Cantidad de panes de cebada que tenía el muchacho mencionado por Andrés.",
          "reference": "Juan 6:9"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIOS",
          "definition": "¿Quién creó los cielos y la tierra según el comienzo de Génesis?",
          "reference": "Génesis 1:1"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTEBAN",
          "definition": "Hombre lleno de fe y del Espíritu Santo que encabeza la lista de los siete escogidos.",
          "reference": "Hechos 6:5"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FUEGO",
          "definition": "Elemento que ardía en la zarza sin consumirla cuando se apareció el ángel a Moisés.",
          "reference": "Éxodo 3:2"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GABAÓN",
          "definition": "Ciudad cuyos habitantes oyeron lo que Josué había hecho en Jericó y Hai.",
          "reference": "Josué 9:3"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUMILDAD",
          "definition": "Actitud que Pablo contrapone a la contienda y la vanagloria al considerar a los demás.",
          "reference": "Filipenses 2:3"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INCIENSO",
          "definition": "Sustancia que Zacarías debía ofrecer al entrar en el santuario.",
          "reference": "Lucas 1:9"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOSUÉ",
          "definition": "Hijo de Nun a quien Dios encargó cruzar el Jordán después de la muerte de Moisés.",
          "reference": "Josué 1:1-2"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LINO",
          "definition": "Tela fina que vestía el hombre rico, además de púrpura, en el relato de Jesús.",
          "reference": "Lucas 16:19"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MISERICORDIA",
          "definition": "Lo que el intérprete de la ley reconoce que hizo el prójimo del hombre herido.",
          "reference": "Lucas 10:37"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NUBE",
          "definition": "Forma de la columna que guiaba a Israel durante el día.",
          "reference": "Éxodo 13:21"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBRAS",
          "definition": "¿Qué dice Santiago que falta a una fe muerta, según este versículo?",
          "reference": "Santiago 2:17"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PESCADORES",
          "definition": "Oficio que Jesús usa para describir la nueva tarea de quienes lo siguen: serlo de personas.",
          "reference": "Mateo 4:19"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROMA",
          "definition": "Ciudad a la que llegó Pablo y donde se le permitió vivir aparte con un soldado.",
          "reference": "Hechos 28:16"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIETE",
          "definition": "Número de hombres que la comunidad debía escoger para atender una necesidad de servicio.",
          "reference": "Hechos 6:3"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TITO",
          "definition": "Destinatario a quien Pablo llama verdadero hijo en la fe común.",
          "reference": "Tito 1:4"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNIDAD",
          "definition": "Lo que Pablo exhorta a guardar en el Espíritu mediante el vínculo de la paz.",
          "reference": "Efesios 4:3"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIENTO",
          "definition": "Fuerza natural que Jesús reprendió antes de hablar al mar.",
          "reference": "Marcos 4:39"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "PAZ",
          "definition": "Don que Jesús deja a sus discípulos y que distingue de lo que da el mundo.",
          "reference": "Juan 14:27"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANDRÉS",
          "definition": "Hermano de Simón Pedro que lo llevó a Jesús.",
          "reference": "Juan 1:40-42"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BABILONIA",
          "definition": "Reino de Nabucodonosor, quien sitió Jerusalén en tiempos de Joacim.",
          "reference": "Daniel 1:1"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CIRINEO",
          "definition": "Gentilicio de Simón, el padre de Alejandro y Rufo, que llevó la cruz de Jesús.",
          "reference": "Marcos 15:21",
          "acceptedAnswers": [
            "CIRENEO",
            "DE CIRENE"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DORCAS",
          "definition": "Nombre griego de Tabita, una discípula de Jope conocida por sus buenas obras.",
          "reference": "Hechos 9:36"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTRELLA",
          "definition": "Señal que los visitantes de oriente dijeron haber visto antes de buscar al rey de los judíos.",
          "reference": "Mateo 2:2"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FUENTE",
          "definition": "Imagen que Jesús usa para el agua que dará y que brota para vida eterna.",
          "reference": "Juan 4:14"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRECIA",
          "definition": "Región a la que Pablo llegó después de exhortar a los discípulos de Macedonia.",
          "reference": "Hechos 20:2"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HOSPITALIDAD",
          "definition": "Práctica que la carta exhorta a no olvidar al recibir a otras personas.",
          "reference": "Hebreos 13:2"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INSTRUCCIÓN",
          "definition": "¿Qué debe escuchar el hijo de parte de su padre, según este proverbio?",
          "reference": "Proverbios 1:8",
          "acceptedAnswers": [
            "DOCTRINA"
          ]
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUAN",
          "definition": "Nombre que Zacarías escribió para su hijo en una tablilla.",
          "reference": "Lucas 1:63"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIRIOS",
          "definition": "Flores del campo que Jesús invita a observar al hablar del vestido.",
          "reference": "Mateo 6:28"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MOSTAZA",
          "definition": "Semilla que Jesús menciona en una parábola sobre el reino de los cielos.",
          "reference": "Mateo 13:31"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NARDO",
          "definition": "Planta aromática de la que procedía el perfume con que María ungió los pies de Jesús.",
          "reference": "Juan 12:3"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ONÉSIMO",
          "definition": "Nombre de la persona por quien Pablo ruega y a quien llama hijo engendrado en sus prisiones.",
          "reference": "Filemón 1:10"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PUERTA",
          "definition": "Imagen con la que Jesús se presenta al hablar de entrar y hallar pastos.",
          "reference": "Juan 10:9"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RODE",
          "definition": "Muchacha que salió a escuchar cuando Pedro llamó a la puerta.",
          "reference": "Hechos 12:13",
          "acceptedAnswers": [
            "RHODE"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SEMILLA",
          "definition": "Elemento de la parábola del sembrador que Jesús identifica con la palabra de Dios.",
          "reference": "Lucas 8:11",
          "acceptedAnswers": [
            "SIMIENTE"
          ]
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TÚNICA",
          "definition": "Prenda de diversos colores que Israel hizo para José.",
          "reference": "Génesis 37:3",
          "acceptedAnswers": [
            "ROPA",
            "MANTO"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNÁNIMES",
          "definition": "Adjetivo que describe cómo estaban reunidos los discípulos al llegar Pentecostés.",
          "reference": "Hechos 2:1",
          "acceptedAnswers": [
            "JUNTOS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VINAGRE",
          "definition": "Líquido del que llenaron una esponja y la acercaron a la boca de Jesús.",
          "reference": "Juan 19:29"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "GOZO",
          "definition": "Cualidad mencionada después del amor y antes de la paz en el fruto del Espíritu.",
          "reference": "Gálatas 5:22"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANA",
          "definition": "Madre que puso a su hijo el nombre de Samuel.",
          "reference": "1 Samuel 1:20",
          "acceptedAnswers": [
            "ANNA"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BENJAMÍN",
          "definition": "Nombre que Jacob dio al hijo al que Raquel había llamado Benoni.",
          "reference": "Génesis 35:18"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CORDEROS",
          "definition": "Animales que Jesús menciona al encargar a Pedro que los apaciente.",
          "reference": "Juan 21:15"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DRACMA",
          "definition": "Moneda que una mujer de la parábola busca después de encender una lámpara y barrer.",
          "reference": "Lucas 15:8"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESDRAS",
          "definition": "Escriba instruido en la ley de Moisés que subió de Babilonia.",
          "reference": "Esdras 7:6"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FIEL",
          "definition": "Adjetivo que describe cómo debe ser hallado quien administra lo que se le ha confiado.",
          "reference": "1 Corintios 4:2"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GALLINA",
          "definition": "Ave que Jesús menciona al comparar su deseo de reunir a Jerusalén con el cuidado de sus polluelos.",
          "reference": "Mateo 23:37"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUESOS",
          "definition": "Restos humanos que llenaban el valle mostrado a Ezequiel.",
          "reference": "Ezequiel 37:1"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INTEGRIDAD",
          "definition": "Cualidad que Job conservaba, según lo que Dios dijo de él.",
          "reference": "Job 2:3",
          "acceptedAnswers": [
            "PERFECCIÓN"
          ]
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUEZ",
          "definition": "Oficio del hombre que no temía a Dios ni respetaba a las personas, en la parábola de la viuda persistente.",
          "reference": "Lucas 18:2"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LOT",
          "definition": "Pariente de Abram que salió con él cuando partió de Harán.",
          "reference": "Génesis 12:4"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MONTE",
          "definition": "Lugar al que subió Jesús antes de sentarse y enseñar a sus discípulos.",
          "reference": "Mateo 5:1"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NABUCODONOSOR",
          "definition": "Nombre del rey de Babilonia que sitió Jerusalén.",
          "reference": "Daniel 1:1"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ONÉSIFORO",
          "definition": "Hombre cuya casa Pablo menciona con gratitud porque lo confortó y no se avergonzó de sus cadenas.",
          "reference": "2 Timoteo 1:16"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PRISCILA",
          "definition": "Esposa de Aquila a la que Pablo conoció en Corinto.",
          "reference": "Hechos 18:2",
          "acceptedAnswers": [
            "PRISCA"
          ]
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROSTRO",
          "definition": "Parte del cuerpo que Jesús indica lavar al hablar del ayuno.",
          "reference": "Mateo 6:17"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SILAS",
          "definition": "Compañero de Pablo que oraba y cantaba con él en la cárcel a medianoche.",
          "reference": "Hechos 16:25"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TRIGO",
          "definition": "Cultivo entre el que un enemigo sembró cizaña en la parábola.",
          "reference": "Mateo 13:25"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNGÜENTO",
          "definition": "Sustancia aromática de nardo que una mujer llevaba en un vaso de alabastro.",
          "reference": "Marcos 14:3",
          "acceptedAnswers": [
            "PERFUME"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VINO",
          "definition": "Bebida en la que fue convertida el agua en las bodas de Caná.",
          "reference": "Juan 2:9"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CORAZÓN",
          "definition": "Lo que el proverbio invita a guardar porque de ello mana la vida.",
          "reference": "Proverbios 4:23"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANANÍAS",
          "definition": "Discípulo de Damasco enviado a visitar a Saulo después de su encuentro con Jesús.",
          "reference": "Hechos 9:10-17"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BUENO",
          "definition": "Adjetivo que Jesús atribuye a Dios al responder al hombre que lo llamó Maestro.",
          "reference": "Lucas 18:19"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CUERVO",
          "definition": "Ave que Noé envió antes de enviar la paloma.",
          "reference": "Génesis 8:7"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DERECHA",
          "definition": "Mano que realiza la acción de dar en la comparación de Jesús sobre ayudar sin exhibirse.",
          "reference": "Mateo 6:3"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESPADA",
          "definition": "Pieza de la armadura que Pablo relaciona con la palabra de Dios.",
          "reference": "Efesios 6:17"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FIGURA",
          "definition": "Palabra que describe la relación entre el santuario hecho por manos y el verdadero.",
          "reference": "Hebreos 9:24"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GÓLGOTA",
          "definition": "Nombre hebreo del lugar de la Calavera al que salió Jesús llevando la cruz.",
          "reference": "Juan 19:17",
          "acceptedAnswers": [
            "GÓLGOTHA"
          ]
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HONRA",
          "definition": "Verbo con el que comienza el mandamiento acerca del padre y la madre.",
          "reference": "Éxodo 20:12"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INMUTABLES",
          "definition": "Adjetivo que describe las dos cosas en las que es imposible que Dios mienta.",
          "reference": "Hebreos 6:18"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JONATÁN",
          "definition": "Hijo de Saúl cuya alma quedó ligada a la de David.",
          "reference": "1 Samuel 18:1",
          "acceptedAnswers": [
            "JONATHÁN"
          ]
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LUZ",
          "definition": "Lo primero que Dios mandó que existiera en este versículo de la creación.",
          "reference": "Génesis 1:3"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MADERA",
          "definition": "Material de gofer con el que Dios mandó construir el arca.",
          "reference": "Génesis 6:14"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NATÁN",
          "definition": "Profeta enviado por Dios a David para contarle la historia de dos hombres y una oveja.",
          "reference": "2 Samuel 12:1-3",
          "acceptedAnswers": [
            "NATHÁN"
          ]
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OLOR",
          "definition": "Lo que llenó la casa cuando María ungió los pies de Jesús con perfume.",
          "reference": "Juan 12:3"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PUBLICANO",
          "definition": "Oficio de uno de los dos hombres que subieron al templo a orar; el otro era fariseo.",
          "reference": "Lucas 18:10"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REPOSO",
          "definition": "Lo que Dios prometió dar a Moisés al asegurarle que su presencia iría con él.",
          "reference": "Éxodo 33:14",
          "acceptedAnswers": [
            "DESCANSO",
            "DESCANSAR"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SALOMÓN",
          "definition": "Rey que pidió entendimiento para juzgar al pueblo y distinguir entre el bien y el mal.",
          "reference": "1 Reyes 3:9-10"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TESORO",
          "definition": "Aquello cuya ubicación Jesús relaciona con la del corazón.",
          "reference": "Mateo 6:21"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UTENSILIOS",
          "definition": "Objetos de uso doméstico, de distintos materiales, que Pablo menciona al comparar una casa grande.",
          "reference": "2 Timoteo 2:20",
          "acceptedAnswers": [
            "VASOS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VOZ",
          "definition": "Lo que las ovejas de Jesús oyen, según su comparación.",
          "reference": "Juan 10:27"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZURRÓN",
          "definition": "Bolsa de pastor donde David puso las piedras lisas que escogió del arroyo.",
          "reference": "1 Samuel 17:40"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABIGAIL",
          "definition": "¿Cómo se llamaba la mujer de Nabal, descrita como de buen entendimiento?",
          "reference": "1 Samuel 25:3",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BEREA",
          "definition": "¿A qué ciudad enviaron los hermanos a Pablo y Silas durante la noche?",
          "reference": "Hechos 17:10",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CESTAS",
          "definition": "¿Qué recipientes llenaron con los pedazos que sobraron después de alimentar a la multitud?",
          "reference": "Juan 6:13",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida.",
          "acceptedAnswers": [
            "CANASTAS",
            "CESTOS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DINA",
          "definition": "¿Qué nombre puso Lea a la hija que tuvo después de Zabulón?",
          "reference": "Génesis 30:20-21",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EUNICE",
          "definition": "¿Cómo se llamaba la madre de Timoteo, cuya fe recuerda Pablo?",
          "reference": "2 Timoteo 1:5",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FÉLIX",
          "definition": "¿Ante qué gobernador debían llevar a Pablo a salvo?",
          "reference": "Hechos 23:24",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GÁLATAS",
          "definition": "¿A qué destinatarios se dirige Pablo por su nombre al comenzar este capítulo?",
          "reference": "Gálatas 3:1",
          "contextNote": "Identificación de destinatarios; no trasladar la reprensión del pasaje al alumno."
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUR",
          "definition": "¿Quién sostuvo una de las manos de Moisés mientras Aarón sostenía la otra?",
          "reference": "Éxodo 17:12",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ITAMAR",
          "definition": "¿Qué hijo de Aarón y Elisabet aparece al final de la lista de cuatro hijos de este versículo?",
          "reference": "Éxodo 6:23",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JAEL",
          "definition": "¿Cómo se llamaba la mujer de Heber, a cuya tienda huyó Sísara?",
          "reference": "Jueces 4:17",
          "contextNote": "La pregunta identifica a una persona; el contexto posterior contiene violencia y necesita selección educativa consciente."
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LOIDA",
          "definition": "¿Cómo se llamaba la abuela de Timoteo cuya fe recuerda Pablo?",
          "reference": "2 Timoteo 1:5",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MELQUISEDEC",
          "definition": "¿Cómo se llamaba el rey de Salem que era sacerdote del Dios Altísimo?",
          "reference": "Génesis 14:18",
          "contextNote": "Solo los datos explícitos de Génesis 14:18; no resolver debates sobre su identidad."
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAAMÁN",
          "definition": "¿Cómo se llamaba el general del ejército del rey de Siria que tenía lepra?",
          "reference": "2 Reyes 5:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OTONIEL",
          "definition": "¿A qué hijo de Cenaz levantó Dios como libertador de Israel en este relato?",
          "reference": "Jueces 3:9",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PATMOS",
          "definition": "¿En qué isla se encontraba Juan por causa de la palabra de Dios y el testimonio de Jesús?",
          "reference": "Apocalipsis 1:9",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RAHAB",
          "definition": "¿Cómo se llamaba la mujer de Jericó en cuya casa entraron los dos hombres enviados por Josué?",
          "reference": "Josué 2:1",
          "contextNote": "Pregunta factual sobre su nombre; el contexto puede requerir acompañamiento. No inventar otra ocupación ni alterar el relato."
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIMEÓN",
          "definition": "¿Cómo se llamaba el hombre justo y piadoso que esperaba la consolación de Israel en Jerusalén?",
          "reference": "Lucas 2:25",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TARSO",
          "definition": "¿De qué ciudad era Saulo, según la indicación que recibió Ananías?",
          "reference": "Hechos 9:11",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "MURO",
          "definition": "¿qué construcción levantó el pueblo hasta la mitad de su altura en este relato?",
          "reference": "Nehemías 4:6",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VELLÓN",
          "definition": "¿Qué pieza de lana propuso Gedeón colocar en la era?",
          "reference": "Jueces 6:37",
          "contextNote": "Describe una petición de Gedeón; no prescribe un método de adivinación ni una regla para decidir hoy."
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZILA",
          "definition": "¿Cómo se llamaba la segunda mujer de Lamec, mencionada después de Ada?",
          "reference": "Génesis 4:19",
          "contextNote": "Dato de una genealogía. Describir la poligamia del relato no equivale a recomendarla."
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AQUILA",
          "definition": "¿Cómo se llamaba el esposo de Priscila que Pablo encontró en Corinto?",
          "reference": "Hechos 18:1-2",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BECERRO",
          "definition": "¿Qué animal engordado manda traer el padre en la parábola del hijo que regresa?",
          "reference": "Lucas 15:23",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CENIZA",
          "definition": "¿Sobre qué se sentó el rey de Nínive después de quitarse su vestido real?",
          "reference": "Jonás 3:6",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIONISIO",
          "definition": "¿Cómo se llamaba el areopagita que creyó después del discurso de Pablo?",
          "reference": "Hechos 17:34",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EZEQUÍAS",
          "definition": "¿Qué rey estaba enfermo cuando el profeta Isaías fue a visitarlo en este relato?",
          "reference": "2 Reyes 20:1",
          "contextNote": "Dato narrativo; no promesa general sobre la duración de la vida."
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FESTO",
          "definition": "¿Cuál era el nombre de Porcio, quien sucedió a Félix?",
          "reference": "Hechos 24:27",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GAYO",
          "definition": "¿A quién dirige el anciano la tercera carta de Juan?",
          "reference": "3 Juan 1:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HOREB",
          "definition": "¿A qué monte de Dios llegó Moisés mientras apacentaba el rebaño de su suegro?",
          "reference": "Éxodo 3:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISACAR",
          "definition": "¿Qué nombre dio Lea a su hijo después de decir que Dios le había dado su recompensa?",
          "reference": "Génesis 30:18",
          "contextNote": "La pista reproduce lo que Lea declara; no propone intercambio familiar ni fórmulas para obtener recompensas."
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOPE",
          "definition": "¿En qué ciudad vivía la discípula Tabita, también llamada Dorcas?",
          "reference": "Hechos 9:36",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LAMEC",
          "definition": "¿Qué padre puso a su hijo el nombre de Noé en esta genealogía?",
          "reference": "Génesis 5:28-29",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MICAL",
          "definition": "¿Qué hija de Saúl amaba a David, según este versículo?",
          "reference": "1 Samuel 18:20",
          "contextNote": "Se seleccionó 1 Samuel 18:20 para evitar que la pista dependa de los detalles violentos del v.27."
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAHUM",
          "definition": "¿Qué profeta es identificado como de Elcos al comenzar este libro?",
          "reference": "Nahum 1:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBED",
          "definition": "¿Qué nombre dieron las vecinas al hijo de Rut, que sería padre de Isaí?",
          "reference": "Rut 4:17",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PÉRGAMO",
          "definition": "¿A qué iglesia se dirige el mensaje que comienza en este versículo?",
          "reference": "Apocalipsis 2:12",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RÍO",
          "definition": "¿Qué corriente salía de Edén para regar el huerto y después se dividía en cuatro brazos?",
          "reference": "Génesis 2:10",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SINAÍ",
          "definition": "¿Sobre qué monte anunció Dios que descendería al tercer día ante el pueblo?",
          "reference": "Éxodo 19:11",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIBERIAS",
          "definition": "¿Qué otro nombre recibe el mar de Galilea en este versículo?",
          "reference": "Juan 6:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida.",
          "acceptedAnswers": [
            "TIBERÍADES"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UVAS",
          "definition": "¿Qué frutos menciona Jesús al preguntar si se recogen de los espinos?",
          "reference": "Mateo 7:16",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VARA",
          "definition": "¿Qué tenía Moisés en la mano cuando Dios se lo preguntó?",
          "reference": "Éxodo 4:2",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZIF",
          "definition": "¿En qué desierto permanecía David en los lugares fuertes de este versículo?",
          "reference": "1 Samuel 23:14",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        }
      ]
    ],
    "discipulo": [
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABRAHAM",
          "definition": "Nombre que Dios dio a Abram al establecer su pacto con él.",
          "reference": "Génesis 17:5"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BELÉN",
          "definition": "Ciudad de Judea donde nació Jesús, según Mateo.",
          "reference": "Mateo 2:1",
          "acceptedAnswers": [
            "BETHLEHEM"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CRISTO",
          "definition": "Título con el que Pedro identifica a Jesús antes de llamarlo Hijo del Dios viviente.",
          "reference": "Mateo 16:16"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DAVID",
          "definition": "Joven que se ofreció ante Saúl para enfrentarse al filisteo.",
          "reference": "1 Samuel 17:32"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EDÉN",
          "definition": "Lugar donde Dios plantó un huerto y puso al hombre.",
          "reference": "Génesis 2:8"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FE",
          "definition": "¿Qué tema presenta este versículo al hablar de lo que se espera y no se ve?",
          "reference": "Hebreos 11:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRACIA",
          "definition": "¿Por qué dice Pablo que somos salvos por medio de la fe?",
          "reference": "Efesios 2:8"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HIJO",
          "definition": "Relación familiar del joven cuyo regreso celebra el padre en la parábola.",
          "reference": "Lucas 15:24"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAAC",
          "definition": "Nombre que Abraham dio al hijo que le nació de Sara.",
          "reference": "Génesis 21:3"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JONÁS",
          "definition": "Profeta, hijo de Amitai, a quien Dios dirigió su palabra.",
          "reference": "Jonás 1:1"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LÁZARO",
          "definition": "Nombre del hombre a quien Jesús llamó a salir del sepulcro.",
          "reference": "Juan 11:43"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MOISÉS",
          "definition": "Hombre al que Dios llamó por su nombre desde la zarza.",
          "reference": "Éxodo 3:4"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NOÉ",
          "definition": "Hombre que caminaba con Dios y era padre de Sem, Cam y Jafet.",
          "reference": "Génesis 6:9-10"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ORACIÓN",
          "definition": "Práctica que Pablo menciona junto con el ruego y la acción de gracias al presentar peticiones a Dios.",
          "reference": "Filipenses 4:6"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PEDRO",
          "definition": "Nombre con el que Jesús se dirige a Simón en este versículo.",
          "reference": "Mateo 16:18"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RUT",
          "definition": "Mujer que expresó a Noemí su decisión de acompañarla y compartir su pueblo.",
          "reference": "Rut 1:16"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIERVO",
          "definition": "Condición del hombre al que su señor felicita por haber sido fiel en lo poco.",
          "reference": "Mateo 25:21"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIMOTEO",
          "definition": "Destinatario cuya fe Pablo relaciona con la de su abuela Loida y su madre Eunice.",
          "reference": "2 Timoteo 1:2-5"
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "CRUZ",
          "definition": "Objeto que Jesús llevaba al salir hacia el lugar llamado de la Calavera.",
          "reference": "Juan 19:17"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VERDAD",
          "definition": "¿Cómo se presenta Jesús entre las imágenes del camino y la vida?",
          "reference": "Juan 14:6"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZAQUEO",
          "definition": "Jefe de publicanos rico a quien Jesús encontró en Jericó.",
          "reference": "Lucas 19:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ARCA",
          "definition": "Embarcación que Dios mandó construir a Noé con madera de gofer.",
          "reference": "Génesis 6:14"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BERNABÉ",
          "definition": "Sobrenombre que los apóstoles dieron a José, un levita de Chipre.",
          "reference": "Hechos 4:36"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CANAÁN",
          "definition": "Tierra hacia la que Abram partió con Sarai y Lot.",
          "reference": "Génesis 12:5"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DOCE",
          "definition": "Cantidad de discípulos que Jesús escogió y llamó apóstoles.",
          "reference": "Lucas 6:13"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EGIPTO",
          "definition": "País del que Dios recuerda haber sacado a su pueblo.",
          "reference": "Éxodo 20:2"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FARAÓN",
          "definition": "Título del gobernante al que Moisés y Aarón pidieron que dejara salir al pueblo.",
          "reference": "Éxodo 5:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GOLIAT",
          "definition": "Nombre del paladín filisteo que salió de Gat.",
          "reference": "1 Samuel 17:4"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HERMANO",
          "definition": "Relación de Abel con Caín, mencionada en la pregunta que Dios le hace a Caín.",
          "reference": "Génesis 4:9"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "IGLESIA",
          "definition": "Comunidad que hacía oración a Dios por Pedro mientras estaba preso.",
          "reference": "Hechos 12:5"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JESÚS",
          "definition": "Nombre que debía recibir el hijo de María porque salvaría a su pueblo de sus pecados.",
          "reference": "Mateo 1:21"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LUCAS",
          "definition": "Nombre del médico amado que envía saludos junto con Demas.",
          "reference": "Colosenses 4:14"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARÍA",
          "definition": "Nombre de la joven de Nazaret desposada con José a quien fue enviado Gabriel.",
          "reference": "Lucas 1:26-27"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NÍNIVE",
          "definition": "Gran ciudad a la que Dios envió a Jonás a predicar.",
          "reference": "Jonás 1:2"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBEDIENCIA",
          "definition": "Actitud que Samuel presenta como preferible a los sacrificios, expresada como sustantivo.",
          "reference": "1 Samuel 15:22",
          "acceptedAnswers": [
            "OBEDECER"
          ]
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PABLO",
          "definition": "Nombre por el que también era conocido Saulo.",
          "reference": "Hechos 13:9"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RESURRECCIÓN",
          "definition": "Palabra con la que Jesús se presenta junto con la vida al hablar con Marta.",
          "reference": "Juan 11:25"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SANSÓN",
          "definition": "Nombre que la mujer de Manoa dio al hijo que le nació.",
          "reference": "Jueces 13:24",
          "acceptedAnswers": [
            "SAMSÓN"
          ]
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TEMPLO",
          "definition": "Lugar donde los padres de Jesús lo encontraron escuchando y preguntando a los maestros.",
          "reference": "Lucas 2:46"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "ÚNICO",
          "definition": "Adjetivo que Jesús usa al referirse al Padre como Dios verdadero.",
          "reference": "Juan 17:3",
          "acceptedAnswers": [
            "SOLO"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIDA",
          "definition": "¿Cómo se presenta Jesús después de las imágenes del camino y la verdad?",
          "reference": "Juan 14:6"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZACARÍAS",
          "definition": "Sacerdote al que el ángel anunció que Elisabet tendría un hijo llamado Juan.",
          "reference": "Lucas 1:13"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ÁNGEL",
          "definition": "¿Qué clase de mensajero era Gabriel, enviado a Nazaret?",
          "reference": "Lucas 1:26"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BAUTISMO",
          "definition": "¿Qué nombre recibe en este versículo la práctica de arrepentimiento anunciada por Juan?",
          "reference": "Hechos 19:4"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CORINTO",
          "definition": "Ciudad a la que Pablo llegó después de salir de Atenas.",
          "reference": "Hechos 18:1"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DANIEL",
          "definition": "Hombre que siguió orando tres veces al día al enterarse del decreto del rey.",
          "reference": "Daniel 6:10"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ELÍAS",
          "definition": "Profeta tisbita que anunció a Acab que no habría lluvia sino por su palabra.",
          "reference": "1 Reyes 17:1"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FARISEO",
          "definition": "Uno de los dos hombres que subieron al templo a orar; el otro era publicano.",
          "reference": "Lucas 18:10"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GEDEÓN",
          "definition": "Hombre que estaba sacudiendo trigo en el lagar cuando llegó el ángel de Jehová.",
          "reference": "Jueces 6:11"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HEBREOS",
          "definition": "Pueblo cuyo Dios debían mencionar Moisés y los ancianos al presentarse ante el rey de Egipto.",
          "reference": "Éxodo 3:18"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAÍAS",
          "definition": "Profeta cuyo libro leía el funcionario etíope en su carro.",
          "reference": "Hechos 8:28"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JERICÓ",
          "definition": "Ciudad que estaba cerrada a causa de los hijos de Israel antes de caer sus muros.",
          "reference": "Josué 6:1"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIDIA",
          "definition": "Vendedora de púrpura de Tiatira que escuchaba a Pablo junto al río.",
          "reference": "Hechos 16:14"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MESÍAS",
          "definition": "Título que Andrés dijo haber encontrado y que el evangelio explica como el Cristo.",
          "reference": "Juan 1:41"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NICODEMO",
          "definition": "Fariseo que visitó a Jesús de noche.",
          "reference": "Juan 3:1-2"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OFRENDA",
          "definition": "Lo que Abel llevó de los primogénitos de sus ovejas y de lo más gordo de ellas.",
          "reference": "Génesis 4:4"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PRÓJIMO",
          "definition": "Palabra que Jesús usa al preguntar cuál de los tres se acercó al hombre herido.",
          "reference": "Lucas 10:36"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REDENCIÓN",
          "definition": "Beneficio que Pablo relaciona con la sangre de Cristo y el perdón de pecados.",
          "reference": "Efesios 1:7"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SANTIDAD",
          "definition": "Lo que la carta pide seguir junto con la paz con todos.",
          "reference": "Hebreos 12:14"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TABERNÁCULO",
          "definition": "Santuario portátil para el que Dios ordenó hacer diez cortinas.",
          "reference": "Éxodo 26:1"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNCIÓN",
          "definition": "Lo que Juan dice que sus lectores tienen del Santo.",
          "reference": "1 Juan 2:20"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VICTORIA",
          "definition": "Lo que Pablo agradece a Dios por medio de Jesucristo al terminar su enseñanza sobre la resurrección.",
          "reference": "1 Corintios 15:57"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZOROBABEL",
          "definition": "Hijo de Salatiel que participó en la edificación del altar al regresar del exilio.",
          "reference": "Esdras 3:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ALTAR",
          "definition": "Lugar de ofrenda que Noé edificó al salir del arca.",
          "reference": "Génesis 8:20"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BÁLSAMO",
          "definition": "Sustancia medicinal de Galaad mencionada en la pregunta del profeta.",
          "reference": "Jeremías 8:22"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CREACIÓN",
          "definition": "¿Qué dice Pablo que gime y sufre dolores hasta el presente?",
          "reference": "Romanos 8:22",
          "acceptedAnswers": [
            "CRIATURAS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DILUVIO",
          "definition": "Acontecimiento cuyas aguas elevaron el arca durante cuarenta días.",
          "reference": "Génesis 7:17"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTER",
          "definition": "Mujer a la que el rey puso la corona real en lugar de Vasti.",
          "reference": "Ester 2:17",
          "acceptedAnswers": [
            "ESTHER"
          ]
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FORTALEZA",
          "definition": "Palabra que acompaña a amparo al describir a Dios como ayuda en las tribulaciones.",
          "reference": "Salmos 46:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GALILEA",
          "definition": "Región cuyo mar recorría Jesús cuando vio a Pedro y Andrés echando la red.",
          "reference": "Mateo 4:18"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HERENCIA",
          "definition": "Bien que Pedro describe como incorruptible, incontaminado y reservado en los cielos.",
          "reference": "1 Pedro 1:4"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISRAEL",
          "definition": "Nuevo nombre que recibió Jacob después de luchar durante la noche.",
          "reference": "Génesis 32:28"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOSÉ",
          "definition": "Hijo al que Israel hizo una túnica de diversos colores.",
          "reference": "Génesis 37:3"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LÁMPARA",
          "definition": "Objeto con el que el salmista compara la palabra de Dios para sus pies.",
          "reference": "Salmos 119:105"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MANÁ",
          "definition": "Nombre que Israel dio al alimento que recibía en el desierto.",
          "reference": "Éxodo 16:31"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAZARET",
          "definition": "Ciudad de Galilea a la que Dios envió al ángel Gabriel.",
          "reference": "Lucas 1:26"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OSEAS",
          "definition": "Profeta, hijo de Beeri, al que llegó la palabra de Dios durante varios reinados de Judá.",
          "reference": "Oseas 1:1"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PACTO",
          "definition": "Acuerdo entre Dios y la tierra del que el arco en las nubes sería señal.",
          "reference": "Génesis 9:13",
          "acceptedAnswers": [
            "CONVENIO",
            "ALIANZA"
          ]
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REINO",
          "definition": "¿Qué pide Jesús buscar primero junto con la justicia de Dios?",
          "reference": "Mateo 6:33"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SINAGOGA",
          "definition": "Lugar al que Jesús entró en Nazaret, conforme a su costumbre, para leer.",
          "reference": "Lucas 4:16"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TESTIGO",
          "definition": "Persona que da testimonio; en plural, la tarea que Jesús anuncia a sus discípulos hasta lo último de la tierra.",
          "reference": "Hechos 1:8",
          "acceptedAnswers": [
            "TESTIGOS"
          ]
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "COMUNIÓN",
          "definition": "Práctica de los primeros creyentes mencionada junto con la enseñanza, el partimiento del pan y las oraciones.",
          "reference": "Hechos 2:42"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIRGEN",
          "definition": "Palabra con la que Lucas describe a María antes de mencionar que estaba desposada con José.",
          "reference": "Lucas 1:27"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZEBEDEO",
          "definition": "Padre de Jacobo (también llamado Santiago) y Juan, que estaba con ellos remendando redes.",
          "reference": "Mateo 4:21"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AARÓN",
          "definition": "Hermano de Moisés que sabía hablar bien, según la respuesta de Dios.",
          "reference": "Éxodo 4:14"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BARCA",
          "definition": "¿En qué entró Jesús antes de que sus discípulos lo siguieran y se levantara una tempestad?",
          "reference": "Mateo 8:23-24",
          "acceptedAnswers": [
            "BARCO"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CAMINO",
          "definition": "Imagen con la que Jesús se presenta junto con la verdad y la vida.",
          "reference": "Juan 14:6"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DAMASCO",
          "definition": "Ciudad a la que Saulo se acercaba cuando lo rodeó una luz del cielo.",
          "reference": "Hechos 9:3"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ÉFESO",
          "definition": "Ciudad donde Pablo encontró a unos discípulos después de recorrer las regiones superiores.",
          "reference": "Hechos 19:1"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FELIPE",
          "definition": "Discípulo que preguntó al lector etíope si entendía lo que leía.",
          "reference": "Hechos 8:30-31"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GABRIEL",
          "definition": "Nombre del ángel que habló con Zacarías en el templo.",
          "reference": "Lucas 1:19"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HAMBRE",
          "definition": "Necesidad que sobrevino en la provincia después de que el hijo menor lo gastó todo.",
          "reference": "Lucas 15:14"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISMAEL",
          "definition": "Nombre del hijo que Agar dio a Abram.",
          "reference": "Génesis 16:15"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JACOB",
          "definition": "Nombre del hijo que nació asiendo el talón de Esaú.",
          "reference": "Génesis 25:26"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LECHE",
          "definition": "Alimento que Pedro usa como imagen de lo que deben desear los recién nacidos.",
          "reference": "1 Pedro 2:2"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARTA",
          "definition": "Mujer que recibió a Jesús en su casa y tenía una hermana llamada María.",
          "reference": "Lucas 10:38"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NATANAEL",
          "definition": "Hombre al que Felipe anunció que había encontrado a Jesús de Nazaret.",
          "reference": "Juan 1:45"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OLIVOS",
          "definition": "Árboles que dan nombre al monte al que Jesús acostumbraba ir.",
          "reference": "Lucas 22:39",
          "acceptedAnswers": [
            "OLIVAS"
          ]
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PAN",
          "definition": "Alimento que Jesús incluye en la petición cotidiana de la oración que enseñó.",
          "reference": "Mateo 6:11"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RAQUEL",
          "definition": "Hija de Labán que llegó con las ovejas de su padre cuando Jacob estaba junto al pozo.",
          "reference": "Génesis 29:10",
          "acceptedAnswers": [
            "RACHÊL"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SAMUEL",
          "definition": "Joven al que Dios llamó durante la noche y que respondió dispuesto a escuchar.",
          "reference": "1 Samuel 3:10"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TOMÁS",
          "definition": "Discípulo llamado Dídimo que no estaba cuando Jesús se presentó a los otros.",
          "reference": "Juan 20:24"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UR",
          "definition": "Ciudad de los caldeos de la que salió Taré con Abram, Sarai y Lot.",
          "reference": "Génesis 11:31"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VID",
          "definition": "Planta con la que Jesús se compara al llamar al Padre labrador.",
          "reference": "Juan 15:1"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CALZADO",
          "definition": "Lo que Dios mandó quitar a Moisés de sus pies porque estaba en tierra santa.",
          "reference": "Éxodo 3:5",
          "acceptedAnswers": [
            "ZAPATOS",
            "SANDALIAS"
          ]
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABEL",
          "definition": "Hermano de Caín que se dedicaba a cuidar ovejas.",
          "reference": "Génesis 4:2"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BARTIMEO",
          "definition": "Nombre del hombre ciego, hijo de Timeo, que estaba junto al camino de Jericó.",
          "reference": "Marcos 10:46"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CANÁ",
          "definition": "Localidad de Galilea donde se celebró una boda a la que fue invitado Jesús.",
          "reference": "Juan 2:1"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DÉBORA",
          "definition": "Profetisa, mujer de Lapidot, que juzgaba a Israel.",
          "reference": "Jueces 4:4"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ELISEO",
          "definition": "Profeta que tomó el manto de Elías y golpeó con él las aguas del Jordán.",
          "reference": "2 Reyes 2:14"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FILEMÓN",
          "definition": "Colaborador amado a quien Pablo dirige la carta junto con otros destinatarios.",
          "reference": "Filemón 1:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GETSEMANÍ",
          "definition": "Lugar al que Jesús fue con sus discípulos antes de apartarse a orar.",
          "reference": "Mateo 26:36",
          "acceptedAnswers": [
            "GETHSEMANÍ"
          ]
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HARINA",
          "definition": "Ingrediente que la viuda de Sarepta tenía en poca cantidad en una tinaja.",
          "reference": "1 Reyes 17:12"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAÍ",
          "definition": "Padre de Belén a cuya casa fue enviado Samuel para ungir a un rey.",
          "reference": "1 Samuel 16:1"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUDÁ",
          "definition": "Nombre que Lea dio al hijo al nacer el cual expresó su alabanza a Jehová.",
          "reference": "Génesis 29:35"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LEÓN",
          "definition": "Animal que David menciona junto al oso al contar cómo defendía el rebaño.",
          "reference": "1 Samuel 17:34-35"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MATEO",
          "definition": "Nombre del hombre que Jesús llamó cuando estaba sentado al banco de los tributos.",
          "reference": "Mateo 9:9"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NEHEMÍAS",
          "definition": "Hijo de Hacalías que recibió noticias de Jerusalén estando en Susa.",
          "reference": "Nehemías 1:1-3"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ORO",
          "definition": "Metal precioso que los visitantes de oriente ofrecieron a Jesús junto con incienso y mirra.",
          "reference": "Mateo 2:11"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PALOMA",
          "definition": "Ave que regresó a Noé con una hoja de olivo en el pico.",
          "reference": "Génesis 8:11"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REBECA",
          "definition": "Hija de Betuel que llegó al pozo con un cántaro sobre el hombro.",
          "reference": "Génesis 24:15"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SAL",
          "definition": "Sustancia con la que Jesús compara a sus discípulos respecto de la tierra.",
          "reference": "Mateo 5:13"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TABITA",
          "definition": "Nombre arameo de la discípula de Jope también llamada Dorcas.",
          "reference": "Hechos 9:36",
          "acceptedAnswers": [
            "TABITHA"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UZ",
          "definition": "Tierra en la que vivía Job al comenzar el libro.",
          "reference": "Job 1:1",
          "acceptedAnswers": [
            "HUS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIUDA",
          "definition": "Condición de la mujer pobre que echó dos pequeñas monedas en las ofrendas.",
          "reference": "Lucas 21:2"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZARZA",
          "definition": "Arbusto que ardía sin consumirse cuando Moisés vio al ángel de Jehová.",
          "reference": "Éxodo 3:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ADÁN",
          "definition": "Hombre al que Dios llevó los animales para que les pusiera nombre.",
          "reference": "Génesis 2:19",
          "acceptedAnswers": [
            "ADAM"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BETANIA",
          "definition": "Aldea de María y Marta donde vivía Lázaro.",
          "reference": "Juan 11:1",
          "acceptedAnswers": [
            "BETHANIA"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CENTURIÓN",
          "definition": "Cargo del hombre que pidió a Jesús ayuda para su criado enfermo en Capernaum.",
          "reference": "Mateo 8:5-6"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DESIERTO",
          "definition": "Lugar al que Jesús fue llevado por el Espíritu antes de ser tentado.",
          "reference": "Mateo 4:1"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EMAÚS",
          "definition": "Aldea hacia la que iban dos discípulos el día de la resurrección de Jesús.",
          "reference": "Lucas 24:13",
          "acceptedAnswers": [
            "EMMAÚS"
          ]
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FILIPOS",
          "definition": "Ciudad de Macedonia a la que Pablo y sus compañeros llegaron desde Neápolis.",
          "reference": "Hechos 16:12"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRANO",
          "definition": "Palabra con la que Jesús presenta la imagen del trigo que cae en la tierra y muere.",
          "reference": "Juan 12:24"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HIGOS",
          "definition": "Frutos que Jesús menciona al preguntar si se recogen de los abrojos.",
          "reference": "Mateo 7:16"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ICONIO",
          "definition": "Ciudad donde Pablo y Bernabé hablaron en la sinagoga y muchos creyeron.",
          "reference": "Hechos 14:1"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JERUSALÉN",
          "definition": "Ciudad a la que los padres de Jesús iban cada año para la fiesta de la pascua.",
          "reference": "Lucas 2:41",
          "acceptedAnswers": [
            "JERUSALEM"
          ]
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LEVADURA",
          "definition": "Ingrediente que una mujer mezcló con tres medidas de harina en una parábola de Jesús.",
          "reference": "Mateo 13:33"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARCOS",
          "definition": "Otro nombre de Juan, cuya madre María recibía a los creyentes en su casa.",
          "reference": "Hechos 12:12"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NECESIDAD",
          "definition": "Aquello que Pablo dice que Dios suplirá conforme a sus riquezas en gloria.",
          "reference": "Filipenses 4:19",
          "acceptedAnswers": [
            "LO QUE OS FALTA",
            "NECESIDADES"
          ]
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OVEJA",
          "definition": "Animal perdido que el pastor de la parábola sale a buscar, en singular.",
          "reference": "Lucas 15:4"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PASTOR",
          "definition": "Oficio con el que David compara el cuidado de Jehová.",
          "reference": "Salmos 23:1"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RED",
          "definition": "Instrumento que Simón y Andrés echaban en el mar al pasar Jesús.",
          "reference": "Mateo 4:18"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SARA",
          "definition": "Nombre que Dios indicó para la esposa de Abraham, antes llamada Sarai.",
          "reference": "Génesis 17:15"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TALENTOS",
          "definition": "Bienes que el señor de la parábola distribuyó en cantidades de cinco, dos y uno.",
          "reference": "Mateo 25:15"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "URÍAS",
          "definition": "Nombre del heteo que era esposo de Betsabé.",
          "reference": "2 Samuel 11:3",
          "acceptedAnswers": [
            "URÍA"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VECINAS",
          "definition": "Personas que dieron nombre a Obed y dijeron que había nacido un hijo a Noemí.",
          "reference": "Rut 4:17"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZAFIRO",
          "definition": "Piedra preciosa con la que se compara el pavimento bajo los pies del Dios de Israel.",
          "reference": "Éxodo 24:10"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AGUA",
          "definition": "¿Con qué mandó Jesús llenar las tinajas en Caná antes de convertir su contenido en vino?",
          "reference": "Juan 2:7-9"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BETEL",
          "definition": "Nombre que Jacob dio al lugar llamado antes Luz.",
          "reference": "Génesis 28:19",
          "acceptedAnswers": [
            "BETH-EL"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CIELO",
          "definition": "Nombre que Dios dio a la expansión en el relato de la creación.",
          "reference": "Génesis 1:8",
          "acceptedAnswers": [
            "CIELOS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIEZ",
          "definition": "Cantidad de hombres con lepra que salieron al encuentro de Jesús.",
          "reference": "Lucas 17:12"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESPERANZA",
          "definition": "¿De qué llama Pablo a Dios al pedir que los creyentes abunden en ella?",
          "reference": "Romanos 15:13"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FRUTO",
          "definition": "Palabra que encabeza la enumeración del amor, gozo, paz y otras cualidades del Espíritu.",
          "reference": "Gálatas 5:22"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GUSANO",
          "definition": "Animal que dañó la planta que daba sombra a Jonás.",
          "reference": "Jonás 4:7"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HISOPO",
          "definition": "Planta que David menciona al pedir ser purificado.",
          "reference": "Salmos 51:7"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISLA",
          "definition": "Tipo de tierra rodeada de agua en la que Pablo dijo que tendrían que dar.",
          "reference": "Hechos 27:26"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JORDÁN",
          "definition": "Río cuyo cauce cruzó Israel mientras los sacerdotes permanecían en seco con el arca.",
          "reference": "Josué 3:17"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIBRO",
          "definition": "Objeto que entregaron a Jesús para leer al profeta Isaías en la sinagoga.",
          "reference": "Lucas 4:17"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MANSEDUMBRE",
          "definition": "Actitud con la que Pablo pide restaurar a quien ha sido sorprendido en una falta.",
          "reference": "Gálatas 6:1"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NOCHE",
          "definition": "Nombre que Dios dio a las tinieblas al distinguirlas de la luz.",
          "reference": "Génesis 1:5"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OÍDOS",
          "definition": "Órganos que Jesús menciona al invitar a escuchar.",
          "reference": "Mateo 13:9"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PACIENCIA",
          "definition": "Cualidad que produce la prueba de la fe, según Santiago.",
          "reference": "Santiago 1:3"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROCA",
          "definition": "Base sobre la que edificó su casa el hombre prudente de la comparación de Jesús.",
          "reference": "Mateo 7:24",
          "acceptedAnswers": [
            "PEÑA"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIÓN",
          "definition": "Monte con el que se compara a quienes confían en Jehová y permanecen firmes.",
          "reference": "Salmos 125:1"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIERRA",
          "definition": "Nombre que Dios dio a la parte seca al reunir las aguas.",
          "reference": "Génesis 1:10"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UZÍAS",
          "definition": "Rey cuya muerte sitúa en el tiempo la visión del Señor que tuvo Isaías.",
          "reference": "Isaías 6:1",
          "acceptedAnswers": [
            "UZZÍAS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VESTIDO",
          "definition": "Necesidad humana sobre la que Jesús habla al invitar a mirar los lirios del campo.",
          "reference": "Mateo 6:28"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CIZAÑA",
          "definition": "Planta que un enemigo sembró entre el trigo mientras los hombres dormían.",
          "reference": "Mateo 13:25"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AMOR",
          "definition": "¿Cuál es la mayor de las tres virtudes mencionadas al final de este capítulo?",
          "reference": "1 Corintios 13:13",
          "acceptedAnswers": [
            "CARIDAD"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BOOZ",
          "definition": "Pariente de Elimelec en cuyo campo Rut fue a recoger espigas.",
          "reference": "Rut 2:1"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CINCO",
          "definition": "Cantidad de panes de cebada que tenía el muchacho mencionado por Andrés.",
          "reference": "Juan 6:9"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIOS",
          "definition": "¿Quién creó los cielos y la tierra según el comienzo de Génesis?",
          "reference": "Génesis 1:1"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTEBAN",
          "definition": "Hombre lleno de fe y del Espíritu Santo que encabeza la lista de los siete escogidos.",
          "reference": "Hechos 6:5"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FUEGO",
          "definition": "Elemento que ardía en la zarza sin consumirla cuando se apareció el ángel a Moisés.",
          "reference": "Éxodo 3:2"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GABAÓN",
          "definition": "Ciudad cuyos habitantes oyeron lo que Josué había hecho en Jericó y Hai.",
          "reference": "Josué 9:3"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUMILDAD",
          "definition": "Actitud que Pablo contrapone a la contienda y la vanagloria al considerar a los demás.",
          "reference": "Filipenses 2:3"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INCIENSO",
          "definition": "Sustancia que Zacarías debía ofrecer al entrar en el santuario.",
          "reference": "Lucas 1:9"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOSUÉ",
          "definition": "Hijo de Nun a quien Dios encargó cruzar el Jordán después de la muerte de Moisés.",
          "reference": "Josué 1:1-2"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LINO",
          "definition": "Tela fina que vestía el hombre rico, además de púrpura, en el relato de Jesús.",
          "reference": "Lucas 16:19"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MISERICORDIA",
          "definition": "Lo que el intérprete de la ley reconoce que hizo el prójimo del hombre herido.",
          "reference": "Lucas 10:37"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NUBE",
          "definition": "Forma de la columna que guiaba a Israel durante el día.",
          "reference": "Éxodo 13:21"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBRAS",
          "definition": "¿Qué dice Santiago que falta a una fe muerta, según este versículo?",
          "reference": "Santiago 2:17"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PESCADORES",
          "definition": "Oficio que Jesús usa para describir la nueva tarea de quienes lo siguen: serlo de personas.",
          "reference": "Mateo 4:19"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROMA",
          "definition": "Ciudad a la que llegó Pablo y donde se le permitió vivir aparte con un soldado.",
          "reference": "Hechos 28:16"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIETE",
          "definition": "Número de hombres que la comunidad debía escoger para atender una necesidad de servicio.",
          "reference": "Hechos 6:3"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TITO",
          "definition": "Destinatario a quien Pablo llama verdadero hijo en la fe común.",
          "reference": "Tito 1:4"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNIDAD",
          "definition": "Lo que Pablo exhorta a guardar en el Espíritu mediante el vínculo de la paz.",
          "reference": "Efesios 4:3"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIENTO",
          "definition": "Fuerza natural que Jesús reprendió antes de hablar al mar.",
          "reference": "Marcos 4:39"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "PAZ",
          "definition": "Don que Jesús deja a sus discípulos y que distingue de lo que da el mundo.",
          "reference": "Juan 14:27"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANDRÉS",
          "definition": "Hermano de Simón Pedro que lo llevó a Jesús.",
          "reference": "Juan 1:40-42"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BABILONIA",
          "definition": "Reino de Nabucodonosor, quien sitió Jerusalén en tiempos de Joacim.",
          "reference": "Daniel 1:1"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CIRINEO",
          "definition": "Gentilicio de Simón, el padre de Alejandro y Rufo, que llevó la cruz de Jesús.",
          "reference": "Marcos 15:21",
          "acceptedAnswers": [
            "CIRENEO",
            "DE CIRENE"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DORCAS",
          "definition": "Nombre griego de Tabita, una discípula de Jope conocida por sus buenas obras.",
          "reference": "Hechos 9:36"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTRELLA",
          "definition": "Señal que los visitantes de oriente dijeron haber visto antes de buscar al rey de los judíos.",
          "reference": "Mateo 2:2"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FUENTE",
          "definition": "Imagen que Jesús usa para el agua que dará y que brota para vida eterna.",
          "reference": "Juan 4:14"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRECIA",
          "definition": "Región a la que Pablo llegó después de exhortar a los discípulos de Macedonia.",
          "reference": "Hechos 20:2"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HOSPITALIDAD",
          "definition": "Práctica que la carta exhorta a no olvidar al recibir a otras personas.",
          "reference": "Hebreos 13:2"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INSTRUCCIÓN",
          "definition": "¿Qué debe escuchar el hijo de parte de su padre, según este proverbio?",
          "reference": "Proverbios 1:8",
          "acceptedAnswers": [
            "DOCTRINA"
          ]
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUAN",
          "definition": "Nombre que Zacarías escribió para su hijo en una tablilla.",
          "reference": "Lucas 1:63"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIRIOS",
          "definition": "Flores del campo que Jesús invita a observar al hablar del vestido.",
          "reference": "Mateo 6:28"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MOSTAZA",
          "definition": "Semilla que Jesús menciona en una parábola sobre el reino de los cielos.",
          "reference": "Mateo 13:31"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NARDO",
          "definition": "Planta aromática de la que procedía el perfume con que María ungió los pies de Jesús.",
          "reference": "Juan 12:3"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ONÉSIMO",
          "definition": "Nombre de la persona por quien Pablo ruega y a quien llama hijo engendrado en sus prisiones.",
          "reference": "Filemón 1:10"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PUERTA",
          "definition": "Imagen con la que Jesús se presenta al hablar de entrar y hallar pastos.",
          "reference": "Juan 10:9"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RODE",
          "definition": "Muchacha que salió a escuchar cuando Pedro llamó a la puerta.",
          "reference": "Hechos 12:13",
          "acceptedAnswers": [
            "RHODE"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SEMILLA",
          "definition": "Elemento de la parábola del sembrador que Jesús identifica con la palabra de Dios.",
          "reference": "Lucas 8:11",
          "acceptedAnswers": [
            "SIMIENTE"
          ]
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TÚNICA",
          "definition": "Prenda de diversos colores que Israel hizo para José.",
          "reference": "Génesis 37:3",
          "acceptedAnswers": [
            "ROPA",
            "MANTO"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNÁNIMES",
          "definition": "Adjetivo que describe cómo estaban reunidos los discípulos al llegar Pentecostés.",
          "reference": "Hechos 2:1",
          "acceptedAnswers": [
            "JUNTOS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VINAGRE",
          "definition": "Líquido del que llenaron una esponja y la acercaron a la boca de Jesús.",
          "reference": "Juan 19:29"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "GOZO",
          "definition": "Cualidad mencionada después del amor y antes de la paz en el fruto del Espíritu.",
          "reference": "Gálatas 5:22"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANA",
          "definition": "Madre que puso a su hijo el nombre de Samuel.",
          "reference": "1 Samuel 1:20",
          "acceptedAnswers": [
            "ANNA"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BENJAMÍN",
          "definition": "Nombre que Jacob dio al hijo al que Raquel había llamado Benoni.",
          "reference": "Génesis 35:18"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CORDEROS",
          "definition": "Animales que Jesús menciona al encargar a Pedro que los apaciente.",
          "reference": "Juan 21:15"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DRACMA",
          "definition": "Moneda que una mujer de la parábola busca después de encender una lámpara y barrer.",
          "reference": "Lucas 15:8"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESDRAS",
          "definition": "Escriba instruido en la ley de Moisés que subió de Babilonia.",
          "reference": "Esdras 7:6"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FIEL",
          "definition": "Adjetivo que describe cómo debe ser hallado quien administra lo que se le ha confiado.",
          "reference": "1 Corintios 4:2"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GALLINA",
          "definition": "Ave que Jesús menciona al comparar su deseo de reunir a Jerusalén con el cuidado de sus polluelos.",
          "reference": "Mateo 23:37"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUESOS",
          "definition": "Restos humanos que llenaban el valle mostrado a Ezequiel.",
          "reference": "Ezequiel 37:1"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INTEGRIDAD",
          "definition": "Cualidad que Job conservaba, según lo que Dios dijo de él.",
          "reference": "Job 2:3",
          "acceptedAnswers": [
            "PERFECCIÓN"
          ]
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUEZ",
          "definition": "Oficio del hombre que no temía a Dios ni respetaba a las personas, en la parábola de la viuda persistente.",
          "reference": "Lucas 18:2"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LOT",
          "definition": "Pariente de Abram que salió con él cuando partió de Harán.",
          "reference": "Génesis 12:4"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MONTE",
          "definition": "Lugar al que subió Jesús antes de sentarse y enseñar a sus discípulos.",
          "reference": "Mateo 5:1"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NABUCODONOSOR",
          "definition": "Nombre del rey de Babilonia que sitió Jerusalén.",
          "reference": "Daniel 1:1"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ONÉSIFORO",
          "definition": "Hombre cuya casa Pablo menciona con gratitud porque lo confortó y no se avergonzó de sus cadenas.",
          "reference": "2 Timoteo 1:16"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PRISCILA",
          "definition": "Esposa de Aquila a la que Pablo conoció en Corinto.",
          "reference": "Hechos 18:2",
          "acceptedAnswers": [
            "PRISCA"
          ]
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROSTRO",
          "definition": "Parte del cuerpo que Jesús indica lavar al hablar del ayuno.",
          "reference": "Mateo 6:17"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SILAS",
          "definition": "Compañero de Pablo que oraba y cantaba con él en la cárcel a medianoche.",
          "reference": "Hechos 16:25"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TRIGO",
          "definition": "Cultivo entre el que un enemigo sembró cizaña en la parábola.",
          "reference": "Mateo 13:25"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNGÜENTO",
          "definition": "Sustancia aromática de nardo que una mujer llevaba en un vaso de alabastro.",
          "reference": "Marcos 14:3",
          "acceptedAnswers": [
            "PERFUME"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VINO",
          "definition": "Bebida en la que fue convertida el agua en las bodas de Caná.",
          "reference": "Juan 2:9"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CORAZÓN",
          "definition": "Lo que el proverbio invita a guardar porque de ello mana la vida.",
          "reference": "Proverbios 4:23"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANANÍAS",
          "definition": "Discípulo de Damasco enviado a visitar a Saulo después de su encuentro con Jesús.",
          "reference": "Hechos 9:10-17"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BUENO",
          "definition": "Adjetivo que Jesús atribuye a Dios al responder al hombre que lo llamó Maestro.",
          "reference": "Lucas 18:19"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CUERVO",
          "definition": "Ave que Noé envió antes de enviar la paloma.",
          "reference": "Génesis 8:7"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DERECHA",
          "definition": "Mano que realiza la acción de dar en la comparación de Jesús sobre ayudar sin exhibirse.",
          "reference": "Mateo 6:3"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESPADA",
          "definition": "Pieza de la armadura que Pablo relaciona con la palabra de Dios.",
          "reference": "Efesios 6:17"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FIGURA",
          "definition": "Palabra que describe la relación entre el santuario hecho por manos y el verdadero.",
          "reference": "Hebreos 9:24"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GÓLGOTA",
          "definition": "Nombre hebreo del lugar de la Calavera al que salió Jesús llevando la cruz.",
          "reference": "Juan 19:17",
          "acceptedAnswers": [
            "GÓLGOTHA"
          ]
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HONRA",
          "definition": "Verbo con el que comienza el mandamiento acerca del padre y la madre.",
          "reference": "Éxodo 20:12"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INMUTABLES",
          "definition": "Adjetivo que describe las dos cosas en las que es imposible que Dios mienta.",
          "reference": "Hebreos 6:18"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JONATÁN",
          "definition": "Hijo de Saúl cuya alma quedó ligada a la de David.",
          "reference": "1 Samuel 18:1",
          "acceptedAnswers": [
            "JONATHÁN"
          ]
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LUZ",
          "definition": "Lo primero que Dios mandó que existiera en este versículo de la creación.",
          "reference": "Génesis 1:3"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MADERA",
          "definition": "Material de gofer con el que Dios mandó construir el arca.",
          "reference": "Génesis 6:14"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NATÁN",
          "definition": "Profeta enviado por Dios a David para contarle la historia de dos hombres y una oveja.",
          "reference": "2 Samuel 12:1-3",
          "acceptedAnswers": [
            "NATHÁN"
          ]
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OLOR",
          "definition": "Lo que llenó la casa cuando María ungió los pies de Jesús con perfume.",
          "reference": "Juan 12:3"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PUBLICANO",
          "definition": "Oficio de uno de los dos hombres que subieron al templo a orar; el otro era fariseo.",
          "reference": "Lucas 18:10"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REPOSO",
          "definition": "Lo que Dios prometió dar a Moisés al asegurarle que su presencia iría con él.",
          "reference": "Éxodo 33:14",
          "acceptedAnswers": [
            "DESCANSO",
            "DESCANSAR"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SALOMÓN",
          "definition": "Rey que pidió entendimiento para juzgar al pueblo y distinguir entre el bien y el mal.",
          "reference": "1 Reyes 3:9-10"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TESORO",
          "definition": "Aquello cuya ubicación Jesús relaciona con la del corazón.",
          "reference": "Mateo 6:21"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UTENSILIOS",
          "definition": "Objetos de uso doméstico, de distintos materiales, que Pablo menciona al comparar una casa grande.",
          "reference": "2 Timoteo 2:20",
          "acceptedAnswers": [
            "VASOS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VOZ",
          "definition": "Lo que las ovejas de Jesús oyen, según su comparación.",
          "reference": "Juan 10:27"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZURRÓN",
          "definition": "Bolsa de pastor donde David puso las piedras lisas que escogió del arroyo.",
          "reference": "1 Samuel 17:40"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABIGAIL",
          "definition": "¿Cómo se llamaba la mujer de Nabal, descrita como de buen entendimiento?",
          "reference": "1 Samuel 25:3",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BEREA",
          "definition": "¿A qué ciudad enviaron los hermanos a Pablo y Silas durante la noche?",
          "reference": "Hechos 17:10",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CESTAS",
          "definition": "¿Qué recipientes llenaron con los pedazos que sobraron después de alimentar a la multitud?",
          "reference": "Juan 6:13",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida.",
          "acceptedAnswers": [
            "CANASTAS",
            "CESTOS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DINA",
          "definition": "¿Qué nombre puso Lea a la hija que tuvo después de Zabulón?",
          "reference": "Génesis 30:20-21",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EUNICE",
          "definition": "¿Cómo se llamaba la madre de Timoteo, cuya fe recuerda Pablo?",
          "reference": "2 Timoteo 1:5",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FÉLIX",
          "definition": "¿Ante qué gobernador debían llevar a Pablo a salvo?",
          "reference": "Hechos 23:24",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GÁLATAS",
          "definition": "¿A qué destinatarios se dirige Pablo por su nombre al comenzar este capítulo?",
          "reference": "Gálatas 3:1",
          "contextNote": "Identificación de destinatarios; no trasladar la reprensión del pasaje al alumno."
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUR",
          "definition": "¿Quién sostuvo una de las manos de Moisés mientras Aarón sostenía la otra?",
          "reference": "Éxodo 17:12",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ITAMAR",
          "definition": "¿Qué hijo de Aarón y Elisabet aparece al final de la lista de cuatro hijos de este versículo?",
          "reference": "Éxodo 6:23",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JAEL",
          "definition": "¿Cómo se llamaba la mujer de Heber, a cuya tienda huyó Sísara?",
          "reference": "Jueces 4:17",
          "contextNote": "La pregunta identifica a una persona; el contexto posterior contiene violencia y necesita selección educativa consciente."
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LOIDA",
          "definition": "¿Cómo se llamaba la abuela de Timoteo cuya fe recuerda Pablo?",
          "reference": "2 Timoteo 1:5",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MELQUISEDEC",
          "definition": "¿Cómo se llamaba el rey de Salem que era sacerdote del Dios Altísimo?",
          "reference": "Génesis 14:18",
          "contextNote": "Solo los datos explícitos de Génesis 14:18; no resolver debates sobre su identidad."
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAAMÁN",
          "definition": "¿Cómo se llamaba el general del ejército del rey de Siria que tenía lepra?",
          "reference": "2 Reyes 5:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OTONIEL",
          "definition": "¿A qué hijo de Cenaz levantó Dios como libertador de Israel en este relato?",
          "reference": "Jueces 3:9",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PATMOS",
          "definition": "¿En qué isla se encontraba Juan por causa de la palabra de Dios y el testimonio de Jesús?",
          "reference": "Apocalipsis 1:9",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RAHAB",
          "definition": "¿Cómo se llamaba la mujer de Jericó en cuya casa entraron los dos hombres enviados por Josué?",
          "reference": "Josué 2:1",
          "contextNote": "Pregunta factual sobre su nombre; el contexto puede requerir acompañamiento. No inventar otra ocupación ni alterar el relato."
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIMEÓN",
          "definition": "¿Cómo se llamaba el hombre justo y piadoso que esperaba la consolación de Israel en Jerusalén?",
          "reference": "Lucas 2:25",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TARSO",
          "definition": "¿De qué ciudad era Saulo, según la indicación que recibió Ananías?",
          "reference": "Hechos 9:11",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "MURO",
          "definition": "¿qué construcción levantó el pueblo hasta la mitad de su altura en este relato?",
          "reference": "Nehemías 4:6",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VELLÓN",
          "definition": "¿Qué pieza de lana propuso Gedeón colocar en la era?",
          "reference": "Jueces 6:37",
          "contextNote": "Describe una petición de Gedeón; no prescribe un método de adivinación ni una regla para decidir hoy."
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZILA",
          "definition": "¿Cómo se llamaba la segunda mujer de Lamec, mencionada después de Ada?",
          "reference": "Génesis 4:19",
          "contextNote": "Dato de una genealogía. Describir la poligamia del relato no equivale a recomendarla."
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AQUILA",
          "definition": "¿Cómo se llamaba el esposo de Priscila que Pablo encontró en Corinto?",
          "reference": "Hechos 18:1-2",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BECERRO",
          "definition": "¿Qué animal engordado manda traer el padre en la parábola del hijo que regresa?",
          "reference": "Lucas 15:23",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CENIZA",
          "definition": "¿Sobre qué se sentó el rey de Nínive después de quitarse su vestido real?",
          "reference": "Jonás 3:6",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIONISIO",
          "definition": "¿Cómo se llamaba el areopagita que creyó después del discurso de Pablo?",
          "reference": "Hechos 17:34",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EZEQUÍAS",
          "definition": "¿Qué rey estaba enfermo cuando el profeta Isaías fue a visitarlo en este relato?",
          "reference": "2 Reyes 20:1",
          "contextNote": "Dato narrativo; no promesa general sobre la duración de la vida."
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FESTO",
          "definition": "¿Cuál era el nombre de Porcio, quien sucedió a Félix?",
          "reference": "Hechos 24:27",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GAYO",
          "definition": "¿A quién dirige el anciano la tercera carta de Juan?",
          "reference": "3 Juan 1:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HOREB",
          "definition": "¿A qué monte de Dios llegó Moisés mientras apacentaba el rebaño de su suegro?",
          "reference": "Éxodo 3:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISACAR",
          "definition": "¿Qué nombre dio Lea a su hijo después de decir que Dios le había dado su recompensa?",
          "reference": "Génesis 30:18",
          "contextNote": "La pista reproduce lo que Lea declara; no propone intercambio familiar ni fórmulas para obtener recompensas."
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOPE",
          "definition": "¿En qué ciudad vivía la discípula Tabita, también llamada Dorcas?",
          "reference": "Hechos 9:36",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LAMEC",
          "definition": "¿Qué padre puso a su hijo el nombre de Noé en esta genealogía?",
          "reference": "Génesis 5:28-29",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MICAL",
          "definition": "¿Qué hija de Saúl amaba a David, según este versículo?",
          "reference": "1 Samuel 18:20",
          "contextNote": "Se seleccionó 1 Samuel 18:20 para evitar que la pista dependa de los detalles violentos del v.27."
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAHUM",
          "definition": "¿Qué profeta es identificado como de Elcos al comenzar este libro?",
          "reference": "Nahum 1:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBED",
          "definition": "¿Qué nombre dieron las vecinas al hijo de Rut, que sería padre de Isaí?",
          "reference": "Rut 4:17",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PÉRGAMO",
          "definition": "¿A qué iglesia se dirige el mensaje que comienza en este versículo?",
          "reference": "Apocalipsis 2:12",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RÍO",
          "definition": "¿Qué corriente salía de Edén para regar el huerto y después se dividía en cuatro brazos?",
          "reference": "Génesis 2:10",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SINAÍ",
          "definition": "¿Sobre qué monte anunció Dios que descendería al tercer día ante el pueblo?",
          "reference": "Éxodo 19:11",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIBERIAS",
          "definition": "¿Qué otro nombre recibe el mar de Galilea en este versículo?",
          "reference": "Juan 6:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida.",
          "acceptedAnswers": [
            "TIBERÍADES"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UVAS",
          "definition": "¿Qué frutos menciona Jesús al preguntar si se recogen de los espinos?",
          "reference": "Mateo 7:16",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VARA",
          "definition": "¿Qué tenía Moisés en la mano cuando Dios se lo preguntó?",
          "reference": "Éxodo 4:2",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZIF",
          "definition": "¿En qué desierto permanecía David en los lugares fuertes de este versículo?",
          "reference": "1 Samuel 23:14",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        }
      ]
    ],
    "avanzado": [
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABRAHAM",
          "definition": "Nombre que Dios dio a Abram al establecer su pacto con él.",
          "reference": "Génesis 17:5"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BELÉN",
          "definition": "Ciudad de Judea donde nació Jesús, según Mateo.",
          "reference": "Mateo 2:1",
          "acceptedAnswers": [
            "BETHLEHEM"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CRISTO",
          "definition": "Título con el que Pedro identifica a Jesús antes de llamarlo Hijo del Dios viviente.",
          "reference": "Mateo 16:16"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DAVID",
          "definition": "Joven que se ofreció ante Saúl para enfrentarse al filisteo.",
          "reference": "1 Samuel 17:32"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EDÉN",
          "definition": "Lugar donde Dios plantó un huerto y puso al hombre.",
          "reference": "Génesis 2:8"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FE",
          "definition": "¿Qué tema presenta este versículo al hablar de lo que se espera y no se ve?",
          "reference": "Hebreos 11:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRACIA",
          "definition": "¿Por qué dice Pablo que somos salvos por medio de la fe?",
          "reference": "Efesios 2:8"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HIJO",
          "definition": "Relación familiar del joven cuyo regreso celebra el padre en la parábola.",
          "reference": "Lucas 15:24"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAAC",
          "definition": "Nombre que Abraham dio al hijo que le nació de Sara.",
          "reference": "Génesis 21:3"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JONÁS",
          "definition": "Profeta, hijo de Amitai, a quien Dios dirigió su palabra.",
          "reference": "Jonás 1:1"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LÁZARO",
          "definition": "Nombre del hombre a quien Jesús llamó a salir del sepulcro.",
          "reference": "Juan 11:43"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MOISÉS",
          "definition": "Hombre al que Dios llamó por su nombre desde la zarza.",
          "reference": "Éxodo 3:4"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NOÉ",
          "definition": "Hombre que caminaba con Dios y era padre de Sem, Cam y Jafet.",
          "reference": "Génesis 6:9-10"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ORACIÓN",
          "definition": "Práctica que Pablo menciona junto con el ruego y la acción de gracias al presentar peticiones a Dios.",
          "reference": "Filipenses 4:6"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PEDRO",
          "definition": "Nombre con el que Jesús se dirige a Simón en este versículo.",
          "reference": "Mateo 16:18"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RUT",
          "definition": "Mujer que expresó a Noemí su decisión de acompañarla y compartir su pueblo.",
          "reference": "Rut 1:16"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIERVO",
          "definition": "Condición del hombre al que su señor felicita por haber sido fiel en lo poco.",
          "reference": "Mateo 25:21"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIMOTEO",
          "definition": "Destinatario cuya fe Pablo relaciona con la de su abuela Loida y su madre Eunice.",
          "reference": "2 Timoteo 1:2-5"
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "CRUZ",
          "definition": "Objeto que Jesús llevaba al salir hacia el lugar llamado de la Calavera.",
          "reference": "Juan 19:17"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VERDAD",
          "definition": "¿Cómo se presenta Jesús entre las imágenes del camino y la vida?",
          "reference": "Juan 14:6"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZAQUEO",
          "definition": "Jefe de publicanos rico a quien Jesús encontró en Jericó.",
          "reference": "Lucas 19:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ARCA",
          "definition": "Embarcación que Dios mandó construir a Noé con madera de gofer.",
          "reference": "Génesis 6:14"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BERNABÉ",
          "definition": "Sobrenombre que los apóstoles dieron a José, un levita de Chipre.",
          "reference": "Hechos 4:36"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CANAÁN",
          "definition": "Tierra hacia la que Abram partió con Sarai y Lot.",
          "reference": "Génesis 12:5"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DOCE",
          "definition": "Cantidad de discípulos que Jesús escogió y llamó apóstoles.",
          "reference": "Lucas 6:13"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EGIPTO",
          "definition": "País del que Dios recuerda haber sacado a su pueblo.",
          "reference": "Éxodo 20:2"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FARAÓN",
          "definition": "Título del gobernante al que Moisés y Aarón pidieron que dejara salir al pueblo.",
          "reference": "Éxodo 5:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GOLIAT",
          "definition": "Nombre del paladín filisteo que salió de Gat.",
          "reference": "1 Samuel 17:4"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HERMANO",
          "definition": "Relación de Abel con Caín, mencionada en la pregunta que Dios le hace a Caín.",
          "reference": "Génesis 4:9"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "IGLESIA",
          "definition": "Comunidad que hacía oración a Dios por Pedro mientras estaba preso.",
          "reference": "Hechos 12:5"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JESÚS",
          "definition": "Nombre que debía recibir el hijo de María porque salvaría a su pueblo de sus pecados.",
          "reference": "Mateo 1:21"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LUCAS",
          "definition": "Nombre del médico amado que envía saludos junto con Demas.",
          "reference": "Colosenses 4:14"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARÍA",
          "definition": "Nombre de la joven de Nazaret desposada con José a quien fue enviado Gabriel.",
          "reference": "Lucas 1:26-27"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NÍNIVE",
          "definition": "Gran ciudad a la que Dios envió a Jonás a predicar.",
          "reference": "Jonás 1:2"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBEDIENCIA",
          "definition": "Actitud que Samuel presenta como preferible a los sacrificios, expresada como sustantivo.",
          "reference": "1 Samuel 15:22",
          "acceptedAnswers": [
            "OBEDECER"
          ]
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PABLO",
          "definition": "Nombre por el que también era conocido Saulo.",
          "reference": "Hechos 13:9"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RESURRECCIÓN",
          "definition": "Palabra con la que Jesús se presenta junto con la vida al hablar con Marta.",
          "reference": "Juan 11:25"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SANSÓN",
          "definition": "Nombre que la mujer de Manoa dio al hijo que le nació.",
          "reference": "Jueces 13:24",
          "acceptedAnswers": [
            "SAMSÓN"
          ]
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TEMPLO",
          "definition": "Lugar donde los padres de Jesús lo encontraron escuchando y preguntando a los maestros.",
          "reference": "Lucas 2:46"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "ÚNICO",
          "definition": "Adjetivo que Jesús usa al referirse al Padre como Dios verdadero.",
          "reference": "Juan 17:3",
          "acceptedAnswers": [
            "SOLO"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIDA",
          "definition": "¿Cómo se presenta Jesús después de las imágenes del camino y la verdad?",
          "reference": "Juan 14:6"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZACARÍAS",
          "definition": "Sacerdote al que el ángel anunció que Elisabet tendría un hijo llamado Juan.",
          "reference": "Lucas 1:13"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ÁNGEL",
          "definition": "¿Qué clase de mensajero era Gabriel, enviado a Nazaret?",
          "reference": "Lucas 1:26"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BAUTISMO",
          "definition": "¿Qué nombre recibe en este versículo la práctica de arrepentimiento anunciada por Juan?",
          "reference": "Hechos 19:4"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CORINTO",
          "definition": "Ciudad a la que Pablo llegó después de salir de Atenas.",
          "reference": "Hechos 18:1"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DANIEL",
          "definition": "Hombre que siguió orando tres veces al día al enterarse del decreto del rey.",
          "reference": "Daniel 6:10"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ELÍAS",
          "definition": "Profeta tisbita que anunció a Acab que no habría lluvia sino por su palabra.",
          "reference": "1 Reyes 17:1"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FARISEO",
          "definition": "Uno de los dos hombres que subieron al templo a orar; el otro era publicano.",
          "reference": "Lucas 18:10"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GEDEÓN",
          "definition": "Hombre que estaba sacudiendo trigo en el lagar cuando llegó el ángel de Jehová.",
          "reference": "Jueces 6:11"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HEBREOS",
          "definition": "Pueblo cuyo Dios debían mencionar Moisés y los ancianos al presentarse ante el rey de Egipto.",
          "reference": "Éxodo 3:18"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAÍAS",
          "definition": "Profeta cuyo libro leía el funcionario etíope en su carro.",
          "reference": "Hechos 8:28"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JERICÓ",
          "definition": "Ciudad que estaba cerrada a causa de los hijos de Israel antes de caer sus muros.",
          "reference": "Josué 6:1"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIDIA",
          "definition": "Vendedora de púrpura de Tiatira que escuchaba a Pablo junto al río.",
          "reference": "Hechos 16:14"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MESÍAS",
          "definition": "Título que Andrés dijo haber encontrado y que el evangelio explica como el Cristo.",
          "reference": "Juan 1:41"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NICODEMO",
          "definition": "Fariseo que visitó a Jesús de noche.",
          "reference": "Juan 3:1-2"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OFRENDA",
          "definition": "Lo que Abel llevó de los primogénitos de sus ovejas y de lo más gordo de ellas.",
          "reference": "Génesis 4:4"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PRÓJIMO",
          "definition": "Palabra que Jesús usa al preguntar cuál de los tres se acercó al hombre herido.",
          "reference": "Lucas 10:36"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REDENCIÓN",
          "definition": "Beneficio que Pablo relaciona con la sangre de Cristo y el perdón de pecados.",
          "reference": "Efesios 1:7"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SANTIDAD",
          "definition": "Lo que la carta pide seguir junto con la paz con todos.",
          "reference": "Hebreos 12:14"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TABERNÁCULO",
          "definition": "Santuario portátil para el que Dios ordenó hacer diez cortinas.",
          "reference": "Éxodo 26:1"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNCIÓN",
          "definition": "Lo que Juan dice que sus lectores tienen del Santo.",
          "reference": "1 Juan 2:20"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VICTORIA",
          "definition": "Lo que Pablo agradece a Dios por medio de Jesucristo al terminar su enseñanza sobre la resurrección.",
          "reference": "1 Corintios 15:57"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZOROBABEL",
          "definition": "Hijo de Salatiel que participó en la edificación del altar al regresar del exilio.",
          "reference": "Esdras 3:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ALTAR",
          "definition": "Lugar de ofrenda que Noé edificó al salir del arca.",
          "reference": "Génesis 8:20"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BÁLSAMO",
          "definition": "Sustancia medicinal de Galaad mencionada en la pregunta del profeta.",
          "reference": "Jeremías 8:22"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CREACIÓN",
          "definition": "¿Qué dice Pablo que gime y sufre dolores hasta el presente?",
          "reference": "Romanos 8:22",
          "acceptedAnswers": [
            "CRIATURAS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DILUVIO",
          "definition": "Acontecimiento cuyas aguas elevaron el arca durante cuarenta días.",
          "reference": "Génesis 7:17"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTER",
          "definition": "Mujer a la que el rey puso la corona real en lugar de Vasti.",
          "reference": "Ester 2:17",
          "acceptedAnswers": [
            "ESTHER"
          ]
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FORTALEZA",
          "definition": "Palabra que acompaña a amparo al describir a Dios como ayuda en las tribulaciones.",
          "reference": "Salmos 46:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GALILEA",
          "definition": "Región cuyo mar recorría Jesús cuando vio a Pedro y Andrés echando la red.",
          "reference": "Mateo 4:18"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HERENCIA",
          "definition": "Bien que Pedro describe como incorruptible, incontaminado y reservado en los cielos.",
          "reference": "1 Pedro 1:4"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISRAEL",
          "definition": "Nuevo nombre que recibió Jacob después de luchar durante la noche.",
          "reference": "Génesis 32:28"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOSÉ",
          "definition": "Hijo al que Israel hizo una túnica de diversos colores.",
          "reference": "Génesis 37:3"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LÁMPARA",
          "definition": "Objeto con el que el salmista compara la palabra de Dios para sus pies.",
          "reference": "Salmos 119:105"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MANÁ",
          "definition": "Nombre que Israel dio al alimento que recibía en el desierto.",
          "reference": "Éxodo 16:31"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAZARET",
          "definition": "Ciudad de Galilea a la que Dios envió al ángel Gabriel.",
          "reference": "Lucas 1:26"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OSEAS",
          "definition": "Profeta, hijo de Beeri, al que llegó la palabra de Dios durante varios reinados de Judá.",
          "reference": "Oseas 1:1"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PACTO",
          "definition": "Acuerdo entre Dios y la tierra del que el arco en las nubes sería señal.",
          "reference": "Génesis 9:13",
          "acceptedAnswers": [
            "CONVENIO",
            "ALIANZA"
          ]
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REINO",
          "definition": "¿Qué pide Jesús buscar primero junto con la justicia de Dios?",
          "reference": "Mateo 6:33"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SINAGOGA",
          "definition": "Lugar al que Jesús entró en Nazaret, conforme a su costumbre, para leer.",
          "reference": "Lucas 4:16"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TESTIGO",
          "definition": "Persona que da testimonio; en plural, la tarea que Jesús anuncia a sus discípulos hasta lo último de la tierra.",
          "reference": "Hechos 1:8",
          "acceptedAnswers": [
            "TESTIGOS"
          ]
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "COMUNIÓN",
          "definition": "Práctica de los primeros creyentes mencionada junto con la enseñanza, el partimiento del pan y las oraciones.",
          "reference": "Hechos 2:42"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIRGEN",
          "definition": "Palabra con la que Lucas describe a María antes de mencionar que estaba desposada con José.",
          "reference": "Lucas 1:27"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZEBEDEO",
          "definition": "Padre de Jacobo (también llamado Santiago) y Juan, que estaba con ellos remendando redes.",
          "reference": "Mateo 4:21"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AARÓN",
          "definition": "Hermano de Moisés que sabía hablar bien, según la respuesta de Dios.",
          "reference": "Éxodo 4:14"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BARCA",
          "definition": "¿En qué entró Jesús antes de que sus discípulos lo siguieran y se levantara una tempestad?",
          "reference": "Mateo 8:23-24",
          "acceptedAnswers": [
            "BARCO"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CAMINO",
          "definition": "Imagen con la que Jesús se presenta junto con la verdad y la vida.",
          "reference": "Juan 14:6"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DAMASCO",
          "definition": "Ciudad a la que Saulo se acercaba cuando lo rodeó una luz del cielo.",
          "reference": "Hechos 9:3"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ÉFESO",
          "definition": "Ciudad donde Pablo encontró a unos discípulos después de recorrer las regiones superiores.",
          "reference": "Hechos 19:1"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FELIPE",
          "definition": "Discípulo que preguntó al lector etíope si entendía lo que leía.",
          "reference": "Hechos 8:30-31"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GABRIEL",
          "definition": "Nombre del ángel que habló con Zacarías en el templo.",
          "reference": "Lucas 1:19"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HAMBRE",
          "definition": "Necesidad que sobrevino en la provincia después de que el hijo menor lo gastó todo.",
          "reference": "Lucas 15:14"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISMAEL",
          "definition": "Nombre del hijo que Agar dio a Abram.",
          "reference": "Génesis 16:15"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JACOB",
          "definition": "Nombre del hijo que nació asiendo el talón de Esaú.",
          "reference": "Génesis 25:26"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LECHE",
          "definition": "Alimento que Pedro usa como imagen de lo que deben desear los recién nacidos.",
          "reference": "1 Pedro 2:2"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARTA",
          "definition": "Mujer que recibió a Jesús en su casa y tenía una hermana llamada María.",
          "reference": "Lucas 10:38"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NATANAEL",
          "definition": "Hombre al que Felipe anunció que había encontrado a Jesús de Nazaret.",
          "reference": "Juan 1:45"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OLIVOS",
          "definition": "Árboles que dan nombre al monte al que Jesús acostumbraba ir.",
          "reference": "Lucas 22:39",
          "acceptedAnswers": [
            "OLIVAS"
          ]
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PAN",
          "definition": "Alimento que Jesús incluye en la petición cotidiana de la oración que enseñó.",
          "reference": "Mateo 6:11"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RAQUEL",
          "definition": "Hija de Labán que llegó con las ovejas de su padre cuando Jacob estaba junto al pozo.",
          "reference": "Génesis 29:10",
          "acceptedAnswers": [
            "RACHÊL"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SAMUEL",
          "definition": "Joven al que Dios llamó durante la noche y que respondió dispuesto a escuchar.",
          "reference": "1 Samuel 3:10"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TOMÁS",
          "definition": "Discípulo llamado Dídimo que no estaba cuando Jesús se presentó a los otros.",
          "reference": "Juan 20:24"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UR",
          "definition": "Ciudad de los caldeos de la que salió Taré con Abram, Sarai y Lot.",
          "reference": "Génesis 11:31"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VID",
          "definition": "Planta con la que Jesús se compara al llamar al Padre labrador.",
          "reference": "Juan 15:1"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CALZADO",
          "definition": "Lo que Dios mandó quitar a Moisés de sus pies porque estaba en tierra santa.",
          "reference": "Éxodo 3:5",
          "acceptedAnswers": [
            "ZAPATOS",
            "SANDALIAS"
          ]
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABEL",
          "definition": "Hermano de Caín que se dedicaba a cuidar ovejas.",
          "reference": "Génesis 4:2"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BARTIMEO",
          "definition": "Nombre del hombre ciego, hijo de Timeo, que estaba junto al camino de Jericó.",
          "reference": "Marcos 10:46"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CANÁ",
          "definition": "Localidad de Galilea donde se celebró una boda a la que fue invitado Jesús.",
          "reference": "Juan 2:1"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DÉBORA",
          "definition": "Profetisa, mujer de Lapidot, que juzgaba a Israel.",
          "reference": "Jueces 4:4"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ELISEO",
          "definition": "Profeta que tomó el manto de Elías y golpeó con él las aguas del Jordán.",
          "reference": "2 Reyes 2:14"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FILEMÓN",
          "definition": "Colaborador amado a quien Pablo dirige la carta junto con otros destinatarios.",
          "reference": "Filemón 1:1"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GETSEMANÍ",
          "definition": "Lugar al que Jesús fue con sus discípulos antes de apartarse a orar.",
          "reference": "Mateo 26:36",
          "acceptedAnswers": [
            "GETHSEMANÍ"
          ]
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HARINA",
          "definition": "Ingrediente que la viuda de Sarepta tenía en poca cantidad en una tinaja.",
          "reference": "1 Reyes 17:12"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISAÍ",
          "definition": "Padre de Belén a cuya casa fue enviado Samuel para ungir a un rey.",
          "reference": "1 Samuel 16:1"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUDÁ",
          "definition": "Nombre que Lea dio al hijo al nacer el cual expresó su alabanza a Jehová.",
          "reference": "Génesis 29:35"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LEÓN",
          "definition": "Animal que David menciona junto al oso al contar cómo defendía el rebaño.",
          "reference": "1 Samuel 17:34-35"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MATEO",
          "definition": "Nombre del hombre que Jesús llamó cuando estaba sentado al banco de los tributos.",
          "reference": "Mateo 9:9"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NEHEMÍAS",
          "definition": "Hijo de Hacalías que recibió noticias de Jerusalén estando en Susa.",
          "reference": "Nehemías 1:1-3"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ORO",
          "definition": "Metal precioso que los visitantes de oriente ofrecieron a Jesús junto con incienso y mirra.",
          "reference": "Mateo 2:11"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PALOMA",
          "definition": "Ave que regresó a Noé con una hoja de olivo en el pico.",
          "reference": "Génesis 8:11"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REBECA",
          "definition": "Hija de Betuel que llegó al pozo con un cántaro sobre el hombro.",
          "reference": "Génesis 24:15"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SAL",
          "definition": "Sustancia con la que Jesús compara a sus discípulos respecto de la tierra.",
          "reference": "Mateo 5:13"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TABITA",
          "definition": "Nombre arameo de la discípula de Jope también llamada Dorcas.",
          "reference": "Hechos 9:36",
          "acceptedAnswers": [
            "TABITHA"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UZ",
          "definition": "Tierra en la que vivía Job al comenzar el libro.",
          "reference": "Job 1:1",
          "acceptedAnswers": [
            "HUS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIUDA",
          "definition": "Condición de la mujer pobre que echó dos pequeñas monedas en las ofrendas.",
          "reference": "Lucas 21:2"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZARZA",
          "definition": "Arbusto que ardía sin consumirse cuando Moisés vio al ángel de Jehová.",
          "reference": "Éxodo 3:2"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ADÁN",
          "definition": "Hombre al que Dios llevó los animales para que les pusiera nombre.",
          "reference": "Génesis 2:19",
          "acceptedAnswers": [
            "ADAM"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BETANIA",
          "definition": "Aldea de María y Marta donde vivía Lázaro.",
          "reference": "Juan 11:1",
          "acceptedAnswers": [
            "BETHANIA"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CENTURIÓN",
          "definition": "Cargo del hombre que pidió a Jesús ayuda para su criado enfermo en Capernaum.",
          "reference": "Mateo 8:5-6"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DESIERTO",
          "definition": "Lugar al que Jesús fue llevado por el Espíritu antes de ser tentado.",
          "reference": "Mateo 4:1"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EMAÚS",
          "definition": "Aldea hacia la que iban dos discípulos el día de la resurrección de Jesús.",
          "reference": "Lucas 24:13",
          "acceptedAnswers": [
            "EMMAÚS"
          ]
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FILIPOS",
          "definition": "Ciudad de Macedonia a la que Pablo y sus compañeros llegaron desde Neápolis.",
          "reference": "Hechos 16:12"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRANO",
          "definition": "Palabra con la que Jesús presenta la imagen del trigo que cae en la tierra y muere.",
          "reference": "Juan 12:24"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HIGOS",
          "definition": "Frutos que Jesús menciona al preguntar si se recogen de los abrojos.",
          "reference": "Mateo 7:16"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ICONIO",
          "definition": "Ciudad donde Pablo y Bernabé hablaron en la sinagoga y muchos creyeron.",
          "reference": "Hechos 14:1"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JERUSALÉN",
          "definition": "Ciudad a la que los padres de Jesús iban cada año para la fiesta de la pascua.",
          "reference": "Lucas 2:41",
          "acceptedAnswers": [
            "JERUSALEM"
          ]
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LEVADURA",
          "definition": "Ingrediente que una mujer mezcló con tres medidas de harina en una parábola de Jesús.",
          "reference": "Mateo 13:33"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MARCOS",
          "definition": "Otro nombre de Juan, cuya madre María recibía a los creyentes en su casa.",
          "reference": "Hechos 12:12"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NECESIDAD",
          "definition": "Aquello que Pablo dice que Dios suplirá conforme a sus riquezas en gloria.",
          "reference": "Filipenses 4:19",
          "acceptedAnswers": [
            "LO QUE OS FALTA",
            "NECESIDADES"
          ]
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OVEJA",
          "definition": "Animal perdido que el pastor de la parábola sale a buscar, en singular.",
          "reference": "Lucas 15:4"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PASTOR",
          "definition": "Oficio con el que David compara el cuidado de Jehová.",
          "reference": "Salmos 23:1"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RED",
          "definition": "Instrumento que Simón y Andrés echaban en el mar al pasar Jesús.",
          "reference": "Mateo 4:18"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SARA",
          "definition": "Nombre que Dios indicó para la esposa de Abraham, antes llamada Sarai.",
          "reference": "Génesis 17:15"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TALENTOS",
          "definition": "Bienes que el señor de la parábola distribuyó en cantidades de cinco, dos y uno.",
          "reference": "Mateo 25:15"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "URÍAS",
          "definition": "Nombre del heteo que era esposo de Betsabé.",
          "reference": "2 Samuel 11:3",
          "acceptedAnswers": [
            "URÍA"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VECINAS",
          "definition": "Personas que dieron nombre a Obed y dijeron que había nacido un hijo a Noemí.",
          "reference": "Rut 4:17"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZAFIRO",
          "definition": "Piedra preciosa con la que se compara el pavimento bajo los pies del Dios de Israel.",
          "reference": "Éxodo 24:10"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AGUA",
          "definition": "¿Con qué mandó Jesús llenar las tinajas en Caná antes de convertir su contenido en vino?",
          "reference": "Juan 2:7-9"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BETEL",
          "definition": "Nombre que Jacob dio al lugar llamado antes Luz.",
          "reference": "Génesis 28:19",
          "acceptedAnswers": [
            "BETH-EL"
          ]
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CIELO",
          "definition": "Nombre que Dios dio a la expansión en el relato de la creación.",
          "reference": "Génesis 1:8",
          "acceptedAnswers": [
            "CIELOS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIEZ",
          "definition": "Cantidad de hombres con lepra que salieron al encuentro de Jesús.",
          "reference": "Lucas 17:12"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESPERANZA",
          "definition": "¿De qué llama Pablo a Dios al pedir que los creyentes abunden en ella?",
          "reference": "Romanos 15:13"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FRUTO",
          "definition": "Palabra que encabeza la enumeración del amor, gozo, paz y otras cualidades del Espíritu.",
          "reference": "Gálatas 5:22"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GUSANO",
          "definition": "Animal que dañó la planta que daba sombra a Jonás.",
          "reference": "Jonás 4:7"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HISOPO",
          "definition": "Planta que David menciona al pedir ser purificado.",
          "reference": "Salmos 51:7"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISLA",
          "definition": "Tipo de tierra rodeada de agua en la que Pablo dijo que tendrían que dar.",
          "reference": "Hechos 27:26"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JORDÁN",
          "definition": "Río cuyo cauce cruzó Israel mientras los sacerdotes permanecían en seco con el arca.",
          "reference": "Josué 3:17"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIBRO",
          "definition": "Objeto que entregaron a Jesús para leer al profeta Isaías en la sinagoga.",
          "reference": "Lucas 4:17"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MANSEDUMBRE",
          "definition": "Actitud con la que Pablo pide restaurar a quien ha sido sorprendido en una falta.",
          "reference": "Gálatas 6:1"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NOCHE",
          "definition": "Nombre que Dios dio a las tinieblas al distinguirlas de la luz.",
          "reference": "Génesis 1:5"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OÍDOS",
          "definition": "Órganos que Jesús menciona al invitar a escuchar.",
          "reference": "Mateo 13:9"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PACIENCIA",
          "definition": "Cualidad que produce la prueba de la fe, según Santiago.",
          "reference": "Santiago 1:3"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROCA",
          "definition": "Base sobre la que edificó su casa el hombre prudente de la comparación de Jesús.",
          "reference": "Mateo 7:24",
          "acceptedAnswers": [
            "PEÑA"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIÓN",
          "definition": "Monte con el que se compara a quienes confían en Jehová y permanecen firmes.",
          "reference": "Salmos 125:1"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIERRA",
          "definition": "Nombre que Dios dio a la parte seca al reunir las aguas.",
          "reference": "Génesis 1:10"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UZÍAS",
          "definition": "Rey cuya muerte sitúa en el tiempo la visión del Señor que tuvo Isaías.",
          "reference": "Isaías 6:1",
          "acceptedAnswers": [
            "UZZÍAS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VESTIDO",
          "definition": "Necesidad humana sobre la que Jesús habla al invitar a mirar los lirios del campo.",
          "reference": "Mateo 6:28"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CIZAÑA",
          "definition": "Planta que un enemigo sembró entre el trigo mientras los hombres dormían.",
          "reference": "Mateo 13:25"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AMOR",
          "definition": "¿Cuál es la mayor de las tres virtudes mencionadas al final de este capítulo?",
          "reference": "1 Corintios 13:13",
          "acceptedAnswers": [
            "CARIDAD"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BOOZ",
          "definition": "Pariente de Elimelec en cuyo campo Rut fue a recoger espigas.",
          "reference": "Rut 2:1"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CINCO",
          "definition": "Cantidad de panes de cebada que tenía el muchacho mencionado por Andrés.",
          "reference": "Juan 6:9"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIOS",
          "definition": "¿Quién creó los cielos y la tierra según el comienzo de Génesis?",
          "reference": "Génesis 1:1"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTEBAN",
          "definition": "Hombre lleno de fe y del Espíritu Santo que encabeza la lista de los siete escogidos.",
          "reference": "Hechos 6:5"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FUEGO",
          "definition": "Elemento que ardía en la zarza sin consumirla cuando se apareció el ángel a Moisés.",
          "reference": "Éxodo 3:2"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GABAÓN",
          "definition": "Ciudad cuyos habitantes oyeron lo que Josué había hecho en Jericó y Hai.",
          "reference": "Josué 9:3"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUMILDAD",
          "definition": "Actitud que Pablo contrapone a la contienda y la vanagloria al considerar a los demás.",
          "reference": "Filipenses 2:3"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INCIENSO",
          "definition": "Sustancia que Zacarías debía ofrecer al entrar en el santuario.",
          "reference": "Lucas 1:9"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOSUÉ",
          "definition": "Hijo de Nun a quien Dios encargó cruzar el Jordán después de la muerte de Moisés.",
          "reference": "Josué 1:1-2"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LINO",
          "definition": "Tela fina que vestía el hombre rico, además de púrpura, en el relato de Jesús.",
          "reference": "Lucas 16:19"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MISERICORDIA",
          "definition": "Lo que el intérprete de la ley reconoce que hizo el prójimo del hombre herido.",
          "reference": "Lucas 10:37"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NUBE",
          "definition": "Forma de la columna que guiaba a Israel durante el día.",
          "reference": "Éxodo 13:21"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBRAS",
          "definition": "¿Qué dice Santiago que falta a una fe muerta, según este versículo?",
          "reference": "Santiago 2:17"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PESCADORES",
          "definition": "Oficio que Jesús usa para describir la nueva tarea de quienes lo siguen: serlo de personas.",
          "reference": "Mateo 4:19"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROMA",
          "definition": "Ciudad a la que llegó Pablo y donde se le permitió vivir aparte con un soldado.",
          "reference": "Hechos 28:16"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIETE",
          "definition": "Número de hombres que la comunidad debía escoger para atender una necesidad de servicio.",
          "reference": "Hechos 6:3"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TITO",
          "definition": "Destinatario a quien Pablo llama verdadero hijo en la fe común.",
          "reference": "Tito 1:4"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNIDAD",
          "definition": "Lo que Pablo exhorta a guardar en el Espíritu mediante el vínculo de la paz.",
          "reference": "Efesios 4:3"
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VIENTO",
          "definition": "Fuerza natural que Jesús reprendió antes de hablar al mar.",
          "reference": "Marcos 4:39"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "PAZ",
          "definition": "Don que Jesús deja a sus discípulos y que distingue de lo que da el mundo.",
          "reference": "Juan 14:27"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANDRÉS",
          "definition": "Hermano de Simón Pedro que lo llevó a Jesús.",
          "reference": "Juan 1:40-42"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BABILONIA",
          "definition": "Reino de Nabucodonosor, quien sitió Jerusalén en tiempos de Joacim.",
          "reference": "Daniel 1:1"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CIRINEO",
          "definition": "Gentilicio de Simón, el padre de Alejandro y Rufo, que llevó la cruz de Jesús.",
          "reference": "Marcos 15:21",
          "acceptedAnswers": [
            "CIRENEO",
            "DE CIRENE"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DORCAS",
          "definition": "Nombre griego de Tabita, una discípula de Jope conocida por sus buenas obras.",
          "reference": "Hechos 9:36"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESTRELLA",
          "definition": "Señal que los visitantes de oriente dijeron haber visto antes de buscar al rey de los judíos.",
          "reference": "Mateo 2:2"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FUENTE",
          "definition": "Imagen que Jesús usa para el agua que dará y que brota para vida eterna.",
          "reference": "Juan 4:14"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GRECIA",
          "definition": "Región a la que Pablo llegó después de exhortar a los discípulos de Macedonia.",
          "reference": "Hechos 20:2"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HOSPITALIDAD",
          "definition": "Práctica que la carta exhorta a no olvidar al recibir a otras personas.",
          "reference": "Hebreos 13:2"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INSTRUCCIÓN",
          "definition": "¿Qué debe escuchar el hijo de parte de su padre, según este proverbio?",
          "reference": "Proverbios 1:8",
          "acceptedAnswers": [
            "DOCTRINA"
          ]
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUAN",
          "definition": "Nombre que Zacarías escribió para su hijo en una tablilla.",
          "reference": "Lucas 1:63"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LIRIOS",
          "definition": "Flores del campo que Jesús invita a observar al hablar del vestido.",
          "reference": "Mateo 6:28"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MOSTAZA",
          "definition": "Semilla que Jesús menciona en una parábola sobre el reino de los cielos.",
          "reference": "Mateo 13:31"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NARDO",
          "definition": "Planta aromática de la que procedía el perfume con que María ungió los pies de Jesús.",
          "reference": "Juan 12:3"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ONÉSIMO",
          "definition": "Nombre de la persona por quien Pablo ruega y a quien llama hijo engendrado en sus prisiones.",
          "reference": "Filemón 1:10"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PUERTA",
          "definition": "Imagen con la que Jesús se presenta al hablar de entrar y hallar pastos.",
          "reference": "Juan 10:9"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RODE",
          "definition": "Muchacha que salió a escuchar cuando Pedro llamó a la puerta.",
          "reference": "Hechos 12:13",
          "acceptedAnswers": [
            "RHODE"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SEMILLA",
          "definition": "Elemento de la parábola del sembrador que Jesús identifica con la palabra de Dios.",
          "reference": "Lucas 8:11",
          "acceptedAnswers": [
            "SIMIENTE"
          ]
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TÚNICA",
          "definition": "Prenda de diversos colores que Israel hizo para José.",
          "reference": "Génesis 37:3",
          "acceptedAnswers": [
            "ROPA",
            "MANTO"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNÁNIMES",
          "definition": "Adjetivo que describe cómo estaban reunidos los discípulos al llegar Pentecostés.",
          "reference": "Hechos 2:1",
          "acceptedAnswers": [
            "JUNTOS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VINAGRE",
          "definition": "Líquido del que llenaron una esponja y la acercaron a la boca de Jesús.",
          "reference": "Juan 19:29"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "GOZO",
          "definition": "Cualidad mencionada después del amor y antes de la paz en el fruto del Espíritu.",
          "reference": "Gálatas 5:22"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANA",
          "definition": "Madre que puso a su hijo el nombre de Samuel.",
          "reference": "1 Samuel 1:20",
          "acceptedAnswers": [
            "ANNA"
          ]
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BENJAMÍN",
          "definition": "Nombre que Jacob dio al hijo al que Raquel había llamado Benoni.",
          "reference": "Génesis 35:18"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CORDEROS",
          "definition": "Animales que Jesús menciona al encargar a Pedro que los apaciente.",
          "reference": "Juan 21:15"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DRACMA",
          "definition": "Moneda que una mujer de la parábola busca después de encender una lámpara y barrer.",
          "reference": "Lucas 15:8"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESDRAS",
          "definition": "Escriba instruido en la ley de Moisés que subió de Babilonia.",
          "reference": "Esdras 7:6"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FIEL",
          "definition": "Adjetivo que describe cómo debe ser hallado quien administra lo que se le ha confiado.",
          "reference": "1 Corintios 4:2"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GALLINA",
          "definition": "Ave que Jesús menciona al comparar su deseo de reunir a Jerusalén con el cuidado de sus polluelos.",
          "reference": "Mateo 23:37"
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUESOS",
          "definition": "Restos humanos que llenaban el valle mostrado a Ezequiel.",
          "reference": "Ezequiel 37:1"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INTEGRIDAD",
          "definition": "Cualidad que Job conservaba, según lo que Dios dijo de él.",
          "reference": "Job 2:3",
          "acceptedAnswers": [
            "PERFECCIÓN"
          ]
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JUEZ",
          "definition": "Oficio del hombre que no temía a Dios ni respetaba a las personas, en la parábola de la viuda persistente.",
          "reference": "Lucas 18:2"
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LOT",
          "definition": "Pariente de Abram que salió con él cuando partió de Harán.",
          "reference": "Génesis 12:4"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MONTE",
          "definition": "Lugar al que subió Jesús antes de sentarse y enseñar a sus discípulos.",
          "reference": "Mateo 5:1"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NABUCODONOSOR",
          "definition": "Nombre del rey de Babilonia que sitió Jerusalén.",
          "reference": "Daniel 1:1"
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "ONÉSIFORO",
          "definition": "Hombre cuya casa Pablo menciona con gratitud porque lo confortó y no se avergonzó de sus cadenas.",
          "reference": "2 Timoteo 1:16"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PRISCILA",
          "definition": "Esposa de Aquila a la que Pablo conoció en Corinto.",
          "reference": "Hechos 18:2",
          "acceptedAnswers": [
            "PRISCA"
          ]
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "ROSTRO",
          "definition": "Parte del cuerpo que Jesús indica lavar al hablar del ayuno.",
          "reference": "Mateo 6:17"
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SILAS",
          "definition": "Compañero de Pablo que oraba y cantaba con él en la cárcel a medianoche.",
          "reference": "Hechos 16:25"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TRIGO",
          "definition": "Cultivo entre el que un enemigo sembró cizaña en la parábola.",
          "reference": "Mateo 13:25"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UNGÜENTO",
          "definition": "Sustancia aromática de nardo que una mujer llevaba en un vaso de alabastro.",
          "reference": "Marcos 14:3",
          "acceptedAnswers": [
            "PERFUME"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VINO",
          "definition": "Bebida en la que fue convertida el agua en las bodas de Caná.",
          "reference": "Juan 2:9"
        },
        {
          "letter": "Z",
          "type": "contains",
          "word": "CORAZÓN",
          "definition": "Lo que el proverbio invita a guardar porque de ello mana la vida.",
          "reference": "Proverbios 4:23"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ANANÍAS",
          "definition": "Discípulo de Damasco enviado a visitar a Saulo después de su encuentro con Jesús.",
          "reference": "Hechos 9:10-17"
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BUENO",
          "definition": "Adjetivo que Jesús atribuye a Dios al responder al hombre que lo llamó Maestro.",
          "reference": "Lucas 18:19"
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CUERVO",
          "definition": "Ave que Noé envió antes de enviar la paloma.",
          "reference": "Génesis 8:7"
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DERECHA",
          "definition": "Mano que realiza la acción de dar en la comparación de Jesús sobre ayudar sin exhibirse.",
          "reference": "Mateo 6:3"
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "ESPADA",
          "definition": "Pieza de la armadura que Pablo relaciona con la palabra de Dios.",
          "reference": "Efesios 6:17"
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FIGURA",
          "definition": "Palabra que describe la relación entre el santuario hecho por manos y el verdadero.",
          "reference": "Hebreos 9:24"
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GÓLGOTA",
          "definition": "Nombre hebreo del lugar de la Calavera al que salió Jesús llevando la cruz.",
          "reference": "Juan 19:17",
          "acceptedAnswers": [
            "GÓLGOTHA"
          ]
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HONRA",
          "definition": "Verbo con el que comienza el mandamiento acerca del padre y la madre.",
          "reference": "Éxodo 20:12"
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "INMUTABLES",
          "definition": "Adjetivo que describe las dos cosas en las que es imposible que Dios mienta.",
          "reference": "Hebreos 6:18"
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JONATÁN",
          "definition": "Hijo de Saúl cuya alma quedó ligada a la de David.",
          "reference": "1 Samuel 18:1",
          "acceptedAnswers": [
            "JONATHÁN"
          ]
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LUZ",
          "definition": "Lo primero que Dios mandó que existiera en este versículo de la creación.",
          "reference": "Génesis 1:3"
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MADERA",
          "definition": "Material de gofer con el que Dios mandó construir el arca.",
          "reference": "Génesis 6:14"
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NATÁN",
          "definition": "Profeta enviado por Dios a David para contarle la historia de dos hombres y una oveja.",
          "reference": "2 Samuel 12:1-3",
          "acceptedAnswers": [
            "NATHÁN"
          ]
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OLOR",
          "definition": "Lo que llenó la casa cuando María ungió los pies de Jesús con perfume.",
          "reference": "Juan 12:3"
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PUBLICANO",
          "definition": "Oficio de uno de los dos hombres que subieron al templo a orar; el otro era fariseo.",
          "reference": "Lucas 18:10"
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "REPOSO",
          "definition": "Lo que Dios prometió dar a Moisés al asegurarle que su presencia iría con él.",
          "reference": "Éxodo 33:14",
          "acceptedAnswers": [
            "DESCANSO",
            "DESCANSAR"
          ]
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SALOMÓN",
          "definition": "Rey que pidió entendimiento para juzgar al pueblo y distinguir entre el bien y el mal.",
          "reference": "1 Reyes 3:9-10"
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TESORO",
          "definition": "Aquello cuya ubicación Jesús relaciona con la del corazón.",
          "reference": "Mateo 6:21"
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UTENSILIOS",
          "definition": "Objetos de uso doméstico, de distintos materiales, que Pablo menciona al comparar una casa grande.",
          "reference": "2 Timoteo 2:20",
          "acceptedAnswers": [
            "VASOS"
          ]
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VOZ",
          "definition": "Lo que las ovejas de Jesús oyen, según su comparación.",
          "reference": "Juan 10:27"
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZURRÓN",
          "definition": "Bolsa de pastor donde David puso las piedras lisas que escogió del arroyo.",
          "reference": "1 Samuel 17:40"
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "ABIGAIL",
          "definition": "¿Cómo se llamaba la mujer de Nabal, descrita como de buen entendimiento?",
          "reference": "1 Samuel 25:3",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BEREA",
          "definition": "¿A qué ciudad enviaron los hermanos a Pablo y Silas durante la noche?",
          "reference": "Hechos 17:10",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CESTAS",
          "definition": "¿Qué recipientes llenaron con los pedazos que sobraron después de alimentar a la multitud?",
          "reference": "Juan 6:13",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida.",
          "acceptedAnswers": [
            "CANASTAS",
            "CESTOS"
          ]
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DINA",
          "definition": "¿Qué nombre puso Lea a la hija que tuvo después de Zabulón?",
          "reference": "Génesis 30:20-21",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EUNICE",
          "definition": "¿Cómo se llamaba la madre de Timoteo, cuya fe recuerda Pablo?",
          "reference": "2 Timoteo 1:5",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FÉLIX",
          "definition": "¿Ante qué gobernador debían llevar a Pablo a salvo?",
          "reference": "Hechos 23:24",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GÁLATAS",
          "definition": "¿A qué destinatarios se dirige Pablo por su nombre al comenzar este capítulo?",
          "reference": "Gálatas 3:1",
          "contextNote": "Identificación de destinatarios; no trasladar la reprensión del pasaje al alumno."
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HUR",
          "definition": "¿Quién sostuvo una de las manos de Moisés mientras Aarón sostenía la otra?",
          "reference": "Éxodo 17:12",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ITAMAR",
          "definition": "¿Qué hijo de Aarón y Elisabet aparece al final de la lista de cuatro hijos de este versículo?",
          "reference": "Éxodo 6:23",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JAEL",
          "definition": "¿Cómo se llamaba la mujer de Heber, a cuya tienda huyó Sísara?",
          "reference": "Jueces 4:17",
          "contextNote": "La pregunta identifica a una persona; el contexto posterior contiene violencia y necesita selección educativa consciente."
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LOIDA",
          "definition": "¿Cómo se llamaba la abuela de Timoteo cuya fe recuerda Pablo?",
          "reference": "2 Timoteo 1:5",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MELQUISEDEC",
          "definition": "¿Cómo se llamaba el rey de Salem que era sacerdote del Dios Altísimo?",
          "reference": "Génesis 14:18",
          "contextNote": "Solo los datos explícitos de Génesis 14:18; no resolver debates sobre su identidad."
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAAMÁN",
          "definition": "¿Cómo se llamaba el general del ejército del rey de Siria que tenía lepra?",
          "reference": "2 Reyes 5:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OTONIEL",
          "definition": "¿A qué hijo de Cenaz levantó Dios como libertador de Israel en este relato?",
          "reference": "Jueces 3:9",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PATMOS",
          "definition": "¿En qué isla se encontraba Juan por causa de la palabra de Dios y el testimonio de Jesús?",
          "reference": "Apocalipsis 1:9",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RAHAB",
          "definition": "¿Cómo se llamaba la mujer de Jericó en cuya casa entraron los dos hombres enviados por Josué?",
          "reference": "Josué 2:1",
          "contextNote": "Pregunta factual sobre su nombre; el contexto puede requerir acompañamiento. No inventar otra ocupación ni alterar el relato."
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SIMEÓN",
          "definition": "¿Cómo se llamaba el hombre justo y piadoso que esperaba la consolación de Israel en Jerusalén?",
          "reference": "Lucas 2:25",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TARSO",
          "definition": "¿De qué ciudad era Saulo, según la indicación que recibió Ananías?",
          "reference": "Hechos 9:11",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "U",
          "type": "contains",
          "word": "MURO",
          "definition": "¿qué construcción levantó el pueblo hasta la mitad de su altura en este relato?",
          "reference": "Nehemías 4:6",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VELLÓN",
          "definition": "¿Qué pieza de lana propuso Gedeón colocar en la era?",
          "reference": "Jueces 6:37",
          "contextNote": "Describe una petición de Gedeón; no prescribe un método de adivinación ni una regla para decidir hoy."
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZILA",
          "definition": "¿Cómo se llamaba la segunda mujer de Lamec, mencionada después de Ada?",
          "reference": "Génesis 4:19",
          "contextNote": "Dato de una genealogía. Describir la poligamia del relato no equivale a recomendarla."
        }
      ],
      [
        {
          "letter": "A",
          "type": "starts",
          "word": "AQUILA",
          "definition": "¿Cómo se llamaba el esposo de Priscila que Pablo encontró en Corinto?",
          "reference": "Hechos 18:1-2",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "B",
          "type": "starts",
          "word": "BECERRO",
          "definition": "¿Qué animal engordado manda traer el padre en la parábola del hijo que regresa?",
          "reference": "Lucas 15:23",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "C",
          "type": "starts",
          "word": "CENIZA",
          "definition": "¿Sobre qué se sentó el rey de Nínive después de quitarse su vestido real?",
          "reference": "Jonás 3:6",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "D",
          "type": "starts",
          "word": "DIONISIO",
          "definition": "¿Cómo se llamaba el areopagita que creyó después del discurso de Pablo?",
          "reference": "Hechos 17:34",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "E",
          "type": "starts",
          "word": "EZEQUÍAS",
          "definition": "¿Qué rey estaba enfermo cuando el profeta Isaías fue a visitarlo en este relato?",
          "reference": "2 Reyes 20:1",
          "contextNote": "Dato narrativo; no promesa general sobre la duración de la vida."
        },
        {
          "letter": "F",
          "type": "starts",
          "word": "FESTO",
          "definition": "¿Cuál era el nombre de Porcio, quien sucedió a Félix?",
          "reference": "Hechos 24:27",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "G",
          "type": "starts",
          "word": "GAYO",
          "definition": "¿A quién dirige el anciano la tercera carta de Juan?",
          "reference": "3 Juan 1:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "H",
          "type": "starts",
          "word": "HOREB",
          "definition": "¿A qué monte de Dios llegó Moisés mientras apacentaba el rebaño de su suegro?",
          "reference": "Éxodo 3:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "I",
          "type": "starts",
          "word": "ISACAR",
          "definition": "¿Qué nombre dio Lea a su hijo después de decir que Dios le había dado su recompensa?",
          "reference": "Génesis 30:18",
          "contextNote": "La pista reproduce lo que Lea declara; no propone intercambio familiar ni fórmulas para obtener recompensas."
        },
        {
          "letter": "J",
          "type": "starts",
          "word": "JOPE",
          "definition": "¿En qué ciudad vivía la discípula Tabita, también llamada Dorcas?",
          "reference": "Hechos 9:36",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "L",
          "type": "starts",
          "word": "LAMEC",
          "definition": "¿Qué padre puso a su hijo el nombre de Noé en esta genealogía?",
          "reference": "Génesis 5:28-29",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "M",
          "type": "starts",
          "word": "MICAL",
          "definition": "¿Qué hija de Saúl amaba a David, según este versículo?",
          "reference": "1 Samuel 18:20",
          "contextNote": "Se seleccionó 1 Samuel 18:20 para evitar que la pista dependa de los detalles violentos del v.27."
        },
        {
          "letter": "N",
          "type": "starts",
          "word": "NAHUM",
          "definition": "¿Qué profeta es identificado como de Elcos al comenzar este libro?",
          "reference": "Nahum 1:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "O",
          "type": "starts",
          "word": "OBED",
          "definition": "¿Qué nombre dieron las vecinas al hijo de Rut, que sería padre de Isaí?",
          "reference": "Rut 4:17",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "P",
          "type": "starts",
          "word": "PÉRGAMO",
          "definition": "¿A qué iglesia se dirige el mensaje que comienza en este versículo?",
          "reference": "Apocalipsis 2:12",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "R",
          "type": "starts",
          "word": "RÍO",
          "definition": "¿Qué corriente salía de Edén para regar el huerto y después se dividía en cuatro brazos?",
          "reference": "Génesis 2:10",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "S",
          "type": "starts",
          "word": "SINAÍ",
          "definition": "¿Sobre qué monte anunció Dios que descendería al tercer día ante el pueblo?",
          "reference": "Éxodo 19:11",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "T",
          "type": "starts",
          "word": "TIBERIAS",
          "definition": "¿Qué otro nombre recibe el mar de Galilea en este versículo?",
          "reference": "Juan 6:1",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida.",
          "acceptedAnswers": [
            "TIBERÍADES"
          ]
        },
        {
          "letter": "U",
          "type": "starts",
          "word": "UVAS",
          "definition": "¿Qué frutos menciona Jesús al preguntar si se recogen de los espinos?",
          "reference": "Mateo 7:16",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "V",
          "type": "starts",
          "word": "VARA",
          "definition": "¿Qué tenía Moisés en la mano cuando Dios se lo preguntó?",
          "reference": "Éxodo 4:2",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        },
        {
          "letter": "Z",
          "type": "starts",
          "word": "ZIF",
          "definition": "¿En qué desierto permanecía David en los lugares fuertes de este versículo?",
          "reference": "1 Samuel 23:14",
          "contextNote": "Dato explícito del pasaje; sin conclusión denominacional añadida."
        }
      ]
    ]
  },
  "wordSearch": {
    "principiante": [
      {
        "id": "ws1",
        "theme": "Fruto del Espíritu",
        "words": [
          "AMOR",
          "GOZO",
          "PAZ",
          "BONDAD",
          "FE"
        ],
        "references": [
          "Gálatas 5:22-23"
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      },
      {
        "id": "ws2",
        "theme": "Evangelios",
        "words": [
          "MATEO",
          "MARCOS",
          "LUCAS",
          "JUAN"
        ],
        "references": [
          "Nuevo Testamento"
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      },
      {
        "id": "ws3",
        "theme": "Cómo se dirige el salmista a Dios",
        "words": [
          "JEHOVÁ",
          "SEÑOR",
          "DIOS"
        ],
        "references": [
          "Salmos 8:1",
          "Salmos 5:2"
        ],
        "hints": [
          "Nombre empleado en Salmos 8:1 (RVR1960).",
          "Tratamiento que acompaña al nombre en Salmos 8:1.",
          "El salmista dice: Dios mío, en Salmos 5:2."
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      },
      {
        "id": "ws_p4",
        "theme": "Reyes de Judá",
        "words": [
          "DAVID",
          "SALOMON",
          "ROBOAM",
          "ASA"
        ],
        "references": [
          "2 Samuel 2:4",
          "1 Reyes 1:39",
          "1 Reyes 14:21",
          "1 Reyes 15:9"
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      },
      {
        "id": "ws_p5",
        "theme": "Profetas del Antiguo",
        "words": [
          "AMOS",
          "MIQUEAS",
          "JOEL",
          "JONAS"
        ],
        "references": [
          "Amós 1:1",
          "Miqueas 1:1",
          "Joel 1:1",
          "Jonás 1:1"
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      }
    ],
    "discipulo": [
      {
        "id": "ws4",
        "theme": "La Armadura de Dios",
        "words": [
          "ESCUDO",
          "YELMO",
          "ESPADA",
          "FE",
          "VERDAD"
        ],
        "hints": [
          "Defensa contra los dardos.",
          "Protección asociada a la salvación.",
          "Se relaciona con la palabra de Dios.",
          "Se asocia al escudo.",
          "Se relaciona con el cinturón."
        ],
        "references": [
          "Efesios 6:13-17"
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      },
      {
        "id": "ws5",
        "theme": "El amor según 1 Corintios 13 (RVR1960)",
        "words": [
          "AMOR",
          "SUFRIDO",
          "BENIGNO",
          "VERDAD"
        ],
        "hints": [
          "Tema del pasaje.",
          "Palabra de 1 Corintios 13:4.",
          "Otra palabra de 1 Corintios 13:4.",
          "El amor se goza de ella, según 1 Corintios 13:6."
        ],
        "references": [
          "1 Corintios 13:4-6"
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      }
    ],
    "avanzado": [
      {
        "id": "ws6",
        "theme": "Profetas Menores",
        "words": [
          "OSEAS",
          "JOEL",
          "AMOS",
          "ABDIAS",
          "JONAS",
          "MIQUEAS"
        ],
        "references": [
          "Antiguo Testamento"
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      },
      {
        "id": "ws7",
        "theme": "Seis iglesias mencionadas en Apocalipsis",
        "words": [
          "EFESO",
          "ESMIRNA",
          "PERGAMO",
          "TIATIRA",
          "SARDIS",
          "FILADELFIA"
        ],
        "references": [
          "Apocalipsis 2-3"
        ],
        "contextNote": "Selección de términos o nombres, no una cita completa. El vocabulario textual de estos conjuntos se coteja con RVR1960."
      }
    ]
  },
  "classification": [
    {
      "id": "cl1",
      "theme": "Testamento de los Libros",
      "categories": [
        "Antiguo Testamento",
        "Nuevo Testamento"
      ],
      "items": [
        {
          "name": "Génesis",
          "category": "Antiguo Testamento",
          "hint": "El inicio de la creación y la promesa."
        },
        {
          "name": "Mateo",
          "category": "Nuevo Testamento",
          "hint": "El Evangelio del Rey y Salvador."
        },
        {
          "name": "Isaías",
          "category": "Antiguo Testamento",
          "hint": "Profecías del Mesías sufriente."
        },
        {
          "name": "Romanos",
          "category": "Nuevo Testamento",
          "hint": "La carta de Pablo sobre la doctrina de la gracia."
        },
        {
          "name": "Éxodo",
          "category": "Antiguo Testamento",
          "hint": "La salida de Egipto, el pacto y las instrucciones al pueblo."
        },
        {
          "name": "Apocalipsis",
          "category": "Nuevo Testamento",
          "hint": "Revelación de Jesucristo, con mensajes a las iglesias y visiones."
        }
      ]
    },
    {
      "id": "cl2",
      "theme": "Secciones Literarias",
      "categories": [
        "Poéticos / Sabiduría",
        "Epístolas / Cartas"
      ],
      "items": [
        {
          "name": "Salmos",
          "category": "Poéticos / Sabiduría",
          "hint": "Cantos de adoración e íntima comunión."
        },
        {
          "name": "Efesios",
          "category": "Epístolas / Cartas",
          "hint": "Carta sobre las bendiciones espirituales en Cristo."
        },
        {
          "name": "Proverbios",
          "category": "Poéticos / Sabiduría",
          "hint": "Sabiduría divina para el vivir diario."
        },
        {
          "name": "Gálatas",
          "category": "Epístolas / Cartas",
          "hint": "Carta sobre la fe en Cristo y la vida guiada por el Espíritu."
        },
        {
          "name": "Eclesiastés",
          "category": "Poéticos / Sabiduría",
          "hint": "Meditación sobre el propósito y la vanidad de la vida."
        },
        {
          "name": "Santiago",
          "category": "Epístolas / Cartas",
          "hint": "Carta práctica sobre la fe demostrada en obras."
        }
      ]
    }
  ],
  "counseling": [
    {
      "id": "biblia-reflexion-001",
      "theme": "Génesis",
      "title": "Noé escucha",
      "description": "Noé recibe instrucciones para preparar el arca.",
      "question": "¿Cómo responde?",
      "options": [
        "Hace lo que Dios le manda.",
        "Cambia el encargo para terminar antes.",
        "Espera la aprobación de sus vecinos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 6:13-22",
      "devotionalExcerpt": "El relato destaca su respuesta a instrucciones concretas, no un plan inventado por él.",
      "suggestedVerse": "Génesis 6:13-22. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-002",
      "theme": "Génesis",
      "title": "Abram comienza el camino",
      "description": "Dios llama a Abram a salir de su tierra.",
      "question": "¿Qué respuesta describe el relato?",
      "options": [
        "Abram parte conforme a la palabra recibida.",
        "Exige conocer primero cada detalle del viaje.",
        "Permanece en Harán sin responder."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 12:1-4",
      "devotionalExcerpt": "El pasaje relata la partida de Abram ante el llamado que recibió.",
      "suggestedVerse": "Génesis 12:1-4. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-003",
      "theme": "Génesis",
      "title": "Una disputa entre pastores",
      "description": "Los pastores de Abram y Lot tienen una contienda.",
      "question": "¿Qué propone Abram?",
      "options": [
        "Separarse y dejar que Lot escoja primero.",
        "Imponer su autoridad por la fuerza.",
        "Expulsar a Lot sin ofrecer alternativas."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 13:5-9",
      "devotionalExcerpt": "Abram propone una solución pacífica y recuerda su relación familiar con Lot.",
      "suggestedVerse": "Génesis 13:5-9. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-004",
      "theme": "Génesis",
      "title": "Recibir al visitante",
      "description": "Abraham recibe a tres visitantes junto a su tienda.",
      "question": "¿Cómo los atiende?",
      "options": [
        "Ofrece agua, descanso y alimento.",
        "Les exige un pago antes de atenderlos.",
        "Les pide buscar provisiones en otro lugar."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 18:1-8",
      "devotionalExcerpt": "La hospitalidad aparece en acciones concretas de atención a los visitantes.",
      "suggestedVerse": "Génesis 18:1-8. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-005",
      "theme": "Génesis",
      "title": "Rebeca junto al pozo",
      "description": "Rebeca da de beber al siervo de Abraham.",
      "question": "¿Qué ofrece hacer también?",
      "options": [
        "Sacar agua para sus camellos.",
        "Cobrarle antes de permitirle beber.",
        "Ocultarle el acceso al pozo."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 24:15-20",
      "devotionalExcerpt": "Su ayuda alcanza tanto al viajero como a sus animales.",
      "suggestedVerse": "Génesis 24:15-20. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-006",
      "theme": "Génesis",
      "title": "Isaac y los pozos",
      "description": "Los pastores disputan por los pozos de los siervos de Isaac.",
      "question": "¿Qué hace Isaac después?",
      "options": [
        "Se aparta y cava otro pozo.",
        "Destruye todos los pozos.",
        "Renuncia definitivamente a buscar agua."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 26:19-22",
      "devotionalExcerpt": "El relato describe la búsqueda de un lugar sin contienda.",
      "suggestedVerse": "Génesis 26:19-22. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-007",
      "theme": "Génesis",
      "title": "El encuentro de dos hermanos",
      "description": "Jacob se acerca a Esaú después de años de separación.",
      "question": "¿Cómo lo recibe Esaú?",
      "options": [
        "Corre a su encuentro y lo abraza.",
        "Le impide acercarse.",
        "Exige primero recibir a sus hijos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 33:1-4",
      "devotionalExcerpt": "La escena de acercamiento incluye abrazo y lágrimas.",
      "suggestedVerse": "Génesis 33:1-4. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-008",
      "theme": "Génesis",
      "title": "José mantiene su decisión",
      "description": "La esposa de su amo insiste en una relación con José.",
      "question": "¿Cómo responde José?",
      "options": [
        "Rechaza la propuesta y se aleja.",
        "Acepta porque nadie más está presente.",
        "Negocia una recompensa."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 39:7-12",
      "devotionalExcerpt": "José expresa su rechazo a hacer ese mal y finalmente huye de la situación.",
      "suggestedVerse": "Génesis 39:7-12. Lee el pasaje en su contexto en tu Biblia.",
      "guidance": "Este relato incluye coerción sexual. Conviene leerlo y conversar con una persona de confianza."
    },
    {
      "id": "biblia-reflexion-009",
      "theme": "Génesis",
      "title": "Notar la tristeza",
      "description": "José ve preocupados a dos compañeros de prisión.",
      "question": "¿Qué hace antes de escuchar sus sueños?",
      "options": [
        "Pregunta por qué están tristes.",
        "Los acusa sin escucharlos.",
        "Supone que sus preocupaciones no importan."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 40:6-8",
      "devotionalExcerpt": "José observa su tristeza y pregunta; el relato invita a prestar atención al otro.",
      "suggestedVerse": "Génesis 40:6-8. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-010",
      "theme": "Génesis",
      "title": "José revela su identidad",
      "description": "José se da a conocer a los hermanos que lo vendieron.",
      "question": "¿Cómo se dirige a ellos?",
      "options": [
        "Los invita a acercarse y habla de la preservación de la vida.",
        "Niega que lo hubieran vendido.",
        "Anuncia que solo quiere vengarse."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 45:4-8",
      "devotionalExcerpt": "José reconoce lo sucedido sin hacer de la venganza el centro de su respuesta.",
      "suggestedVerse": "Génesis 45:4-8. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-011",
      "theme": "Génesis",
      "title": "Cuidar después del temor",
      "description": "Los hermanos temen la venganza de José tras morir su padre.",
      "question": "¿Qué les responde?",
      "options": [
        "Los consuela y promete sustentarlos.",
        "Les niega todo alimento.",
        "Les exige ocultar para siempre lo ocurrido."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 50:15-21",
      "devotionalExcerpt": "José los tranquiliza y expresa su cuidado también mediante el sustento.",
      "suggestedVerse": "Génesis 50:15-21. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-012",
      "theme": "Éxodo",
      "title": "Las parteras protegen la vida",
      "description": "Las parteras reciben una orden del rey contra los niños hebreos.",
      "question": "¿Qué conducta destaca el relato?",
      "options": [
        "Temen a Dios y preservan la vida de los niños.",
        "Cumplen la orden del rey sin objeción.",
        "Impiden que las madres busquen ayuda."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 1:15-21",
      "devotionalExcerpt": "El texto contrasta la orden del rey con la decisión de las parteras.",
      "suggestedVerse": "Éxodo 1:15-21. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-013",
      "theme": "Éxodo",
      "title": "Moisés presta atención",
      "description": "Moisés ve una zarza que arde sin consumirse.",
      "question": "¿Cómo responde al llamado?",
      "options": [
        "Escucha y recibe la indicación de quitarse el calzado.",
        "Ignora el llamado.",
        "Se burla de lo que ve."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 3:1-6",
      "devotionalExcerpt": "La escena presenta atención y reverencia ante el llamado de Dios.",
      "suggestedVerse": "Éxodo 3:1-6. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-014",
      "theme": "Éxodo",
      "title": "Ayuda para una tarea",
      "description": "Moisés expresa su dificultad para hablar.",
      "question": "¿Qué ayuda concreta se menciona?",
      "options": [
        "Aarón hablará junto con Moisés.",
        "Moisés deberá hacerlo todo sin ayuda.",
        "La tarea dependerá de su fama."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 4:10-16",
      "devotionalExcerpt": "El encargo incluye responsabilidad para Moisés y colaboración de Aarón.",
      "suggestedVerse": "Éxodo 4:10-16. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-015",
      "theme": "Éxodo",
      "title": "Recoger lo necesario",
      "description": "Israel recibe instrucciones para recoger alimento en el desierto.",
      "question": "¿Qué criterio se establece?",
      "options": [
        "Recoger según las necesidades de cada persona.",
        "Acumular para superar a los demás.",
        "Recoger solo para los más fuertes."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 16:16-21",
      "devotionalExcerpt": "La cantidad se relaciona con las personas y sus necesidades en esa situación.",
      "suggestedVerse": "Éxodo 16:16-21. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-016",
      "theme": "Éxodo",
      "title": "Sostener a quien se cansa",
      "description": "Moisés se cansa de mantener las manos levantadas.",
      "question": "¿Cómo ayudan Aarón y Hur?",
      "options": [
        "Le procuran asiento y sostienen sus manos.",
        "Lo dejan solo por estar cansado.",
        "Lo acusan de no querer colaborar."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 17:8-13",
      "devotionalExcerpt": "El relato presenta ayuda concreta frente al cansancio.",
      "suggestedVerse": "Éxodo 17:8-13. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-017",
      "theme": "Éxodo",
      "title": "Compartir responsabilidades",
      "description": "Jetro observa que Moisés atiende solo al pueblo.",
      "question": "¿Qué le aconseja?",
      "options": [
        "Distribuir responsabilidades entre personas capaces.",
        "Trabajar más horas sin cambiar nada.",
        "Dejar al pueblo sin atención."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 18:17-23",
      "devotionalExcerpt": "Jetro advierte del desgaste y propone una organización compartida, sujeta a lo que Dios mande.",
      "suggestedVerse": "Éxodo 18:17-23. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-018",
      "theme": "Éxodo",
      "title": "Honrar a los padres",
      "description": "Un mandamiento menciona al padre y a la madre.",
      "question": "¿Qué pide expresamente?",
      "options": [
        "Honrarlos.",
        "Despreciarlos cuando envejecen.",
        "Medir su valor por sus bienes."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 20:12",
      "devotionalExcerpt": "La pregunta recoge el mandato sin añadir condiciones o promesas diferentes.",
      "suggestedVerse": "Éxodo 20:12. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-019",
      "theme": "Éxodo",
      "title": "Ayudar aun en desacuerdo",
      "description": "La ley menciona un animal perdido o caído de alguien con quien hay enemistad.",
      "question": "¿Qué conducta pide?",
      "options": [
        "Devolverlo o ayudarlo, según la situación.",
        "Aprovechar para perjudicar al dueño.",
        "Ignorarlo por no existir amistad."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 23:4-5",
      "devotionalExcerpt": "La ayuda descrita no depende de la amistad con el dueño.",
      "suggestedVerse": "Éxodo 23:4-5. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-020",
      "theme": "Rut",
      "title": "Rut acompaña a Noemí",
      "description": "Noemí conversa con sus nueras sobre el regreso.",
      "question": "¿Qué decisión expresa Rut?",
      "options": [
        "Permanecer con Noemí y acompañarla.",
        "Acompañarla solo por una recompensa.",
        "Desentenderse de ella."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Rut 1:16-18",
      "devotionalExcerpt": "Rut expresa un compromiso de acompañamiento en esta historia concreta.",
      "suggestedVerse": "Rut 1:16-18. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-021",
      "theme": "Rut",
      "title": "Acogida en el campo",
      "description": "Booz habla con Rut mientras ella recoge espigas.",
      "question": "¿Qué cuidado ofrece?",
      "options": [
        "Le permite permanecer con sus criadas y beber agua.",
        "Le prohíbe recoger toda espiga.",
        "La expulsa antes de que pueda beber."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Rut 2:8-12",
      "devotionalExcerpt": "Booz dispone acogida y protección mientras Rut trabaja.",
      "suggestedVerse": "Rut 2:8-12. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-022",
      "theme": "1 Samuel",
      "title": "Ana expresa su aflicción",
      "description": "Elí interpreta inicialmente mal la conducta de Ana al orar.",
      "question": "¿Cómo responde Ana?",
      "options": [
        "Explica con respeto su aflicción ante Dios.",
        "Admite que fingía orar.",
        "Afirma que no puede expresar sus preocupaciones a Dios."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Samuel 1:9-18",
      "devotionalExcerpt": "Ana aclara lo que vive y describe la sinceridad de su oración.",
      "suggestedVerse": "1 Samuel 1:9-18. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-023",
      "theme": "1 Samuel",
      "title": "Aprender a escuchar",
      "description": "Elí orienta a Samuel sobre cómo responder al llamado.",
      "question": "¿Qué disposición expresa Samuel?",
      "options": [
        "Disponibilidad para escuchar.",
        "Exigencia de una recompensa.",
        "Negativa a prestar atención."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Samuel 3:8-10",
      "devotionalExcerpt": "La respuesta de Samuel expresa escucha; no promete el mismo tipo de llamado a cada persona.",
      "suggestedVerse": "1 Samuel 3:8-10. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-024",
      "theme": "1 Samuel",
      "title": "Más allá de la apariencia",
      "description": "Samuel observa a Eliab al buscar al futuro rey.",
      "question": "¿Qué criterio corrige Dios?",
      "options": [
        "Juzgar solo por apariencia o estatura.",
        "Considerar que las apariencias nunca existen.",
        "Escuchar antes de tomar una decisión."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Samuel 16:6-7",
      "devotionalExcerpt": "Dios contrasta la mirada sobre lo exterior con su conocimiento del corazón.",
      "suggestedVerse": "1 Samuel 16:6-7. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-025",
      "theme": "1 Samuel",
      "title": "David se prepara",
      "description": "David no está acostumbrado a la armadura de Saúl.",
      "question": "¿Qué decide?",
      "options": [
        "Quitársela y tomar sus instrumentos de pastor.",
        "Fingir que domina ese equipo.",
        "Abandonar toda preparación."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Samuel 17:38-40",
      "devotionalExcerpt": "David reconoce lo que no ha probado y se prepara con lo que conoce.",
      "suggestedVerse": "1 Samuel 17:38-40. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-026",
      "theme": "1 Samuel",
      "title": "La despedida de dos amigos",
      "description": "Jonatán y David se despiden ante el peligro que enfrenta David.",
      "question": "¿Qué aparece en la escena?",
      "options": [
        "Afecto, lágrimas y recuerdo de su compromiso.",
        "Burla del temor de David.",
        "Una competencia por reconocimiento."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Samuel 20:35-42",
      "devotionalExcerpt": "El relato presenta amistad y compromiso en una despedida dolorosa.",
      "suggestedVerse": "1 Samuel 20:35-42. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-027",
      "theme": "1 Samuel",
      "title": "David rechaza la venganza",
      "description": "Los hombres de David ven una oportunidad de atacar a Saúl.",
      "question": "¿Qué hace David?",
      "options": [
        "Impide que se levanten contra Saúl.",
        "Les ordena atacarlo de inmediato.",
        "Aprueba cualquier acción que parezca ventajosa."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Samuel 24:1-7",
      "devotionalExcerpt": "David no permite el ataque; la oportunidad no se convierte en justificación para todo acto.",
      "suggestedVerse": "1 Samuel 24:1-7. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-028",
      "theme": "1 Reyes",
      "title": "Salomón pide discernimiento",
      "description": "Salomón reconoce su responsabilidad de gobernar.",
      "question": "¿Qué pide a Dios?",
      "options": [
        "Entendimiento para juzgar y distinguir el bien del mal.",
        "Riquezas como único objetivo.",
        "Quedar libre de toda responsabilidad."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Reyes 3:5-12",
      "devotionalExcerpt": "Su petición se orienta al discernimiento y al servicio del pueblo.",
      "suggestedVerse": "1 Reyes 3:5-12. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-029",
      "theme": "1 Reyes",
      "title": "La viuda de Sarepta",
      "description": "La viuda dispone de poca harina y aceite cuando llega Elías.",
      "question": "¿Qué relata el pasaje?",
      "options": [
        "La harina y el aceite no se agotan durante el tiempo anunciado.",
        "La viuda recibe una fortuna para vender.",
        "Toda provisión desaparece al compartir."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Reyes 17:8-16",
      "devotionalExcerpt": "Se narra una provisión concreta, no una fórmula de enriquecimiento mediante ofrendas.",
      "suggestedVerse": "1 Reyes 17:8-16. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-030",
      "theme": "1 Reyes",
      "title": "Alimento y descanso para Elías",
      "description": "Elías está agotado en el desierto.",
      "question": "¿Qué atención recibe antes de continuar?",
      "options": [
        "Descanso, agua y alimento.",
        "Una orden de seguir sin comer.",
        "Un premio por ocultar el cansancio."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Reyes 19:4-8",
      "devotionalExcerpt": "El relato incluye atención a necesidades físicas; no se utiliza como diagnóstico ni reemplazo de ayuda profesional.",
      "suggestedVerse": "1 Reyes 19:4-8. Lee el pasaje en su contexto en tu Biblia.",
      "guidance": "El pasaje incluye desesperanza y deseo de morir. Conviene leerlo acompañados; esta actividad no sustituye ayuda profesional."
    },
    {
      "id": "biblia-reflexion-031",
      "theme": "2 Reyes",
      "title": "Ayuda ante una deuda",
      "description": "Una viuda pide ayuda a Eliseo ante una deuda.",
      "question": "¿Para qué debía usar el dinero del aceite?",
      "options": [
        "Para pagar la deuda y sostener a su familia.",
        "Para presumir ante sus vecinos.",
        "Para abandonar a sus hijos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "2 Reyes 4:1-7",
      "devotionalExcerpt": "La ayuda atiende una necesidad concreta de la familia.",
      "suggestedVerse": "2 Reyes 4:1-7. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-032",
      "theme": "2 Reyes",
      "title": "Escuchar un consejo",
      "description": "Naamán se enoja ante las instrucciones recibidas.",
      "question": "¿Quiénes lo animan a reconsiderar?",
      "options": [
        "Sus criados.",
        "Los comerciantes de Jerusalén.",
        "Los soldados de David."
      ],
      "correctIndex": 0,
      "biblicalSupport": "2 Reyes 5:9-14",
      "devotionalExcerpt": "Escuchar a sus criados lo ayuda a reconsiderar su primera reacción.",
      "suggestedVerse": "2 Reyes 5:9-14. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-033",
      "theme": "2 Reyes",
      "title": "Alimentar al enemigo",
      "description": "El rey pregunta si debe herir a los hombres llevados a Samaria.",
      "question": "¿Qué indica Eliseo?",
      "options": [
        "Darles comida y bebida y dejarlos volver.",
        "Dejarlos sin alimento.",
        "Exhibirlos para humillarlos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "2 Reyes 6:20-23",
      "devotionalExcerpt": "El relato muestra una respuesta de hospitalidad hacia enemigos capturados.",
      "suggestedVerse": "2 Reyes 6:20-23. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-034",
      "theme": "Nehemías",
      "title": "Preocupación y oración",
      "description": "Nehemías recibe noticias dolorosas sobre Jerusalén.",
      "question": "¿Qué hace ante esas noticias?",
      "options": [
        "Llora, ayuna y ora.",
        "Se burla de quienes sufren.",
        "Declara que nada le importa."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Nehemías 1:3-11",
      "devotionalExcerpt": "Nehemías presenta su preocupación a Dios.",
      "suggestedVerse": "Nehemías 1:3-11. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-035",
      "theme": "Nehemías",
      "title": "Conocer antes de organizar",
      "description": "Nehemías llega a Jerusalén y examina los muros.",
      "question": "¿Qué hace antes de proponer la reconstrucción?",
      "options": [
        "Observa personalmente su estado.",
        "Promete que no habrá trabajo.",
        "Decide sin mirar la ciudad."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Nehemías 2:11-18",
      "devotionalExcerpt": "Conocer la situación precede a su invitación a trabajar.",
      "suggestedVerse": "Nehemías 2:11-18. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-036",
      "theme": "Nehemías",
      "title": "Orar y cuidar",
      "description": "La reconstrucción enfrenta amenazas.",
      "question": "¿Qué respuesta relata el pasaje?",
      "options": [
        "Oran y ponen guardia.",
        "Abandonan toda vigilancia.",
        "Se dedican a discutir entre ellos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Nehemías 4:6-9",
      "devotionalExcerpt": "La comunidad combina la oración con el cuidado concreto.",
      "suggestedVerse": "Nehemías 4:6-9. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-037",
      "theme": "Nehemías",
      "title": "Comprender la lectura",
      "description": "El pueblo escucha la lectura de la ley.",
      "question": "¿Qué ayuda recibe para comprender?",
      "options": [
        "Se explica el sentido de lo leído.",
        "Se oculta el texto al pueblo.",
        "Se reemplaza la lectura con rumores."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Nehemías 8:1-8",
      "devotionalExcerpt": "El pasaje destaca la lectura y su comprensión.",
      "suggestedVerse": "Nehemías 8:1-8. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-038",
      "theme": "Ester",
      "title": "Prepararse juntos",
      "description": "Ester debe presentarse ante el rey en una situación difícil.",
      "question": "¿Qué pide a su comunidad?",
      "options": [
        "Que ayune por ella.",
        "Que celebre antes de conocer el resultado.",
        "Que divulgue acusaciones falsas."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Ester 4:13-16",
      "devotionalExcerpt": "Ester pide acompañamiento mediante el ayuno antes de actuar.",
      "suggestedVerse": "Ester 4:13-16. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-039",
      "theme": "Daniel",
      "title": "Una petición respetuosa",
      "description": "Daniel plantea una dificultad respecto de la comida.",
      "question": "¿Qué propone al encargado?",
      "options": [
        "Una prueba de diez días.",
        "Una pelea con los demás jóvenes.",
        "Una acusación pública sin escucharlo."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Daniel 1:8-16",
      "devotionalExcerpt": "Daniel presenta una propuesta concreta al encargado.",
      "suggestedVerse": "Daniel 1:8-16. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-040",
      "theme": "Daniel",
      "title": "Fidelidad sin condiciones",
      "description": "Tres hombres responden ante la exigencia de adorar una imagen.",
      "question": "¿De qué depende su decisión de no adorarla?",
      "options": [
        "No la condicionan a ser librados del horno.",
        "De recibir una recompensa del rey.",
        "De que todos estén de acuerdo."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Daniel 3:16-18",
      "devotionalExcerpt": "Su respuesta mantiene la fidelidad incluso sin exigir un resultado favorable.",
      "suggestedVerse": "Daniel 3:16-18. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-041",
      "theme": "Daniel",
      "title": "Constancia en la oración",
      "description": "Daniel conoce la prohibición establecida.",
      "question": "¿Qué práctica mantiene?",
      "options": [
        "Orar y dar gracias a Dios.",
        "Buscar reconocimiento del rey.",
        "Culpar a sus compañeros."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Daniel 6:10",
      "devotionalExcerpt": "El relato señala la continuidad de su oración.",
      "suggestedVerse": "Daniel 6:10. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-042",
      "theme": "Jonás",
      "title": "Responder nuevamente",
      "description": "Jonás recibe por segunda vez el encargo de ir a Nínive.",
      "question": "¿Qué hace esta vez?",
      "options": [
        "Va a Nínive.",
        "Se embarca otra vez hacia Tarsis.",
        "Envía a otra persona sin ir."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Jonás 3:1-3",
      "devotionalExcerpt": "El pasaje describe su respuesta al nuevo llamado.",
      "suggestedVerse": "Jonás 3:1-3. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-043",
      "theme": "Jonás",
      "title": "Mirar a las personas",
      "description": "Jonás lamenta la pérdida de una planta.",
      "question": "¿Sobre quiénes dirige Dios su atención?",
      "options": [
        "Los habitantes de Nínive.",
        "Los constructores del templo de Salomón.",
        "Los soldados de Gedeón."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Jonás 4:9-11",
      "devotionalExcerpt": "La pregunta final del relato dirige la mirada hacia la ciudad y sus habitantes.",
      "suggestedVerse": "Jonás 4:9-11. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-044",
      "theme": "Mateo",
      "title": "Buscar reconciliación",
      "description": "Jesús habla de quien recuerda un conflicto al presentar su ofrenda.",
      "question": "¿Qué indica hacer primero?",
      "options": [
        "Buscar la reconciliación con su hermano.",
        "Aumentar la ofrenda para ignorar el conflicto.",
        "Contar el problema a todos menos al hermano."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 5:23-24",
      "devotionalExcerpt": "La enseñanza da importancia a atender la relación dañada.",
      "suggestedVerse": "Mateo 5:23-24. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-045",
      "theme": "Mateo",
      "title": "Orar por otros",
      "description": "Jesús enseña acerca del trato a los enemigos.",
      "question": "¿Qué actitud pide hacia quienes persiguen?",
      "options": [
        "Orar por ellos.",
        "Desearles daño.",
        "Amar solamente a quienes corresponden."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 5:43-48",
      "devotionalExcerpt": "El llamado a amar no exige aprobar el daño ni impedir medidas de protección.",
      "suggestedVerse": "Mateo 5:43-48. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-046",
      "theme": "Mateo",
      "title": "Ayudar sin exhibirse",
      "description": "Jesús enseña sobre la ayuda a los necesitados.",
      "question": "¿Qué intención cuestiona?",
      "options": [
        "Dar para recibir reconocimiento público.",
        "Atender una necesidad real.",
        "Ayudar con discreción."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 6:1-4",
      "devotionalExcerpt": "La enseñanza invita a revisar la intención con la que se ayuda.",
      "suggestedVerse": "Mateo 6:1-4. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-047",
      "theme": "Mateo",
      "title": "Oración sincera",
      "description": "Jesús contrasta distintas actitudes al orar.",
      "question": "¿Qué actitud cuestiona?",
      "options": [
        "Orar para ser visto por los demás.",
        "Acercarse sinceramente a Dios.",
        "Presentar una necesidad."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 6:5-8",
      "devotionalExcerpt": "El pasaje centra la atención en la sinceridad ante el Padre.",
      "suggestedVerse": "Mateo 6:5-8. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-048",
      "theme": "Mateo",
      "title": "Preocupaciones cotidianas",
      "description": "Jesús habla de alimento, vestido y preocupación.",
      "question": "¿Qué invita a buscar primero?",
      "options": [
        "El reino de Dios y su justicia.",
        "La admiración de todos.",
        "Acumular bienes como única seguridad."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 6:25-34",
      "devotionalExcerpt": "La enseñanza orienta las prioridades; no promete riqueza personal.",
      "suggestedVerse": "Mateo 6:25-34. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-049",
      "theme": "Mateo",
      "title": "Examinarse primero",
      "description": "Jesús usa la comparación de la viga y la paja.",
      "question": "¿Qué invita a reconocer primero?",
      "options": [
        "La propia falta.",
        "Los rumores sobre el vecino.",
        "Los errores de personas ausentes."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 7:1-5",
      "devotionalExcerpt": "La comparación llama a examinarse antes de corregir a otro.",
      "suggestedVerse": "Mateo 7:1-5. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-050",
      "theme": "Mateo",
      "title": "Escuchar y practicar",
      "description": "Jesús compara dos maneras de construir una casa.",
      "question": "¿A quién compara con quien construye sobre roca?",
      "options": [
        "A quien oye sus palabras y las hace.",
        "A quien solo repite palabras sin practicarlas.",
        "A quien busca una casa más vistosa."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 7:24-27",
      "devotionalExcerpt": "La diferencia de la comparación está en poner en práctica lo escuchado.",
      "suggestedVerse": "Mateo 7:24-27. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-051",
      "theme": "Mateo",
      "title": "Atender a quien falta",
      "description": "Jesús presenta la comparación de una oveja extraviada.",
      "question": "¿Qué hace el pastor de la comparación?",
      "options": [
        "Sale a buscarla.",
        "La considera sin valor.",
        "Olvida que falta una."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 18:12-14",
      "devotionalExcerpt": "La comparación destaca el cuidado por quien se ha extraviado.",
      "suggestedVerse": "Mateo 18:12-14. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-052",
      "theme": "Mateo",
      "title": "Perdonar",
      "description": "Pedro pregunta cuántas veces debe perdonar.",
      "question": "¿Qué orientación recibe?",
      "options": [
        "No reducir el perdón a un límite pequeño.",
        "Guardar una lista para vengarse.",
        "Perdonar solo ante un beneficio."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 18:21-22",
      "devotionalExcerpt": "La enseñanza amplía la disposición a perdonar; no exige ocultar abusos.",
      "suggestedVerse": "Mateo 18:21-22. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-053",
      "theme": "Mateo",
      "title": "Grandeza y servicio",
      "description": "Jesús contrasta el dominio con la vida entre sus discípulos.",
      "question": "¿Qué camino señala para quien quiere ser grande?",
      "options": [
        "Servir a los demás.",
        "Imponer su voluntad.",
        "Buscar un título superior."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 20:25-28",
      "devotionalExcerpt": "Jesús presenta el servicio como orientación para sus discípulos.",
      "suggestedVerse": "Mateo 20:25-28. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-054",
      "theme": "Mateo",
      "title": "Cuidar lo confiado",
      "description": "En una parábola, unos siervos reciben bienes de su señor.",
      "question": "¿Qué elogia el señor en los primeros dos?",
      "options": [
        "Su fidelidad con lo recibido.",
        "Su deseo de competir entre ellos.",
        "Que escondan todos los bienes."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Mateo 25:14-23",
      "devotionalExcerpt": "Es una parábola sobre fidelidad, no una garantía de rendimiento económico.",
      "suggestedVerse": "Mateo 25:14-23. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-055",
      "theme": "Marcos",
      "title": "Amigos que ayudan",
      "description": "Unos hombres llevan a un paralítico hasta Jesús.",
      "question": "¿Qué hacen al encontrar impedida la entrada?",
      "options": [
        "Abren el techo para acercarlo.",
        "Lo dejan solo y se marchan.",
        "Le exigen que llegue caminando."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Marcos 2:1-12",
      "devotionalExcerpt": "El relato muestra su esfuerzo por acercar a su compañero a Jesús.",
      "suggestedVerse": "Marcos 2:1-12. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-056",
      "theme": "Marcos",
      "title": "Pedir ayuda en la tormenta",
      "description": "Los discípulos tienen miedo durante una tormenta.",
      "question": "¿A quién despiertan?",
      "options": [
        "A Jesús.",
        "A Moisés.",
        "A Elías."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Marcos 4:35-41",
      "devotionalExcerpt": "En medio de su temor, se dirigen a Jesús.",
      "suggestedVerse": "Marcos 4:35-41. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-057",
      "theme": "Marcos",
      "title": "Un tiempo de descanso",
      "description": "Los apóstoles cuentan a Jesús lo que han hecho y enseñado.",
      "question": "¿A qué los invita?",
      "options": [
        "A apartarse y descansar un poco.",
        "A competir para ver quién hizo más.",
        "A dejar de comer para seguir trabajando."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Marcos 6:30-32",
      "devotionalExcerpt": "Jesús reconoce la necesidad de descanso en medio de la actividad.",
      "suggestedVerse": "Marcos 6:30-32. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-058",
      "theme": "Marcos",
      "title": "Recibir a los niños",
      "description": "Los discípulos reprenden a quienes llevan niños a Jesús.",
      "question": "¿Cómo responde Jesús?",
      "options": [
        "Pide que los dejen acercarse.",
        "Confirma que deben alejarlos.",
        "Los recibe solo si pueden pagar."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Marcos 10:13-16",
      "devotionalExcerpt": "El relato destaca la acogida de los niños.",
      "suggestedVerse": "Marcos 10:13-16. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-059",
      "theme": "Marcos",
      "title": "Mirar más que la cantidad",
      "description": "Jesús observa las ofrendas y menciona a una viuda.",
      "question": "¿Qué señala sobre lo que dio?",
      "options": [
        "Dio de su pobreza todo su sustento.",
        "Dio lo que le sobraba de una fortuna.",
        "Buscó superar la cantidad de los ricos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Marcos 12:41-44",
      "devotionalExcerpt": "Jesús distingue la situación de la viuda; el relato no autoriza presionar a personas necesitadas.",
      "suggestedVerse": "Marcos 12:41-44. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-060",
      "theme": "Lucas",
      "title": "Escuchar después del cansancio",
      "description": "Simón explica que han trabajado toda la noche sin pescar.",
      "question": "¿Qué decide ante la indicación de Jesús?",
      "options": [
        "Echar las redes.",
        "Vender las redes de inmediato.",
        "Negarse a escuchar."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Lucas 5:4-11",
      "devotionalExcerpt": "Simón responde a la indicación concreta que recibe de Jesús.",
      "suggestedVerse": "Lucas 5:4-11. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-061",
      "theme": "Lucas",
      "title": "Acercarse a quien sufre",
      "description": "En una parábola, un samaritano encuentra a un hombre herido.",
      "question": "¿Cómo actúa?",
      "options": [
        "Lo atiende y procura su cuidado.",
        "Pasa de largo sin acercarse.",
        "Le exige que explique primero su origen."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Lucas 10:25-37",
      "devotionalExcerpt": "La parábola relaciona la misericordia con acciones concretas de cuidado.",
      "suggestedVerse": "Lucas 10:25-37. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-062",
      "theme": "Lucas",
      "title": "Escuchar con atención",
      "description": "Marta recibe a Jesús y María escucha sus palabras.",
      "question": "¿Qué hace María en la escena?",
      "options": [
        "Se sienta a escuchar a Jesús.",
        "Sale a buscar una discusión.",
        "Interrumpe para presumir sus tareas."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Lucas 10:38-42",
      "devotionalExcerpt": "El relato invita a valorar la atención a las palabras de Jesús.",
      "suggestedVerse": "Lucas 10:38-42. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-063",
      "theme": "Lucas",
      "title": "Recibir al que vuelve",
      "description": "En una parábola, un hijo regresa a su padre.",
      "question": "¿Cómo lo recibe el padre?",
      "options": [
        "Corre hacia él y lo abraza.",
        "Le impide acercarse.",
        "Lo obliga a regresar al lugar del que vino."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Lucas 15:11-24",
      "devotionalExcerpt": "La escena presenta la acogida del padre al hijo que vuelve.",
      "suggestedVerse": "Lucas 15:11-24. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-064",
      "theme": "Lucas",
      "title": "Volver para agradecer",
      "description": "Diez hombres reciben sanidad durante su camino.",
      "question": "¿Qué hace uno de ellos al verse sano?",
      "options": [
        "Regresa para dar gracias.",
        "Busca que los demás lo admiren.",
        "Oculta lo sucedido a Jesús."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Lucas 17:11-19",
      "devotionalExcerpt": "El relato destaca la gratitud de quien regresa.",
      "suggestedVerse": "Lucas 17:11-19. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-065",
      "theme": "Lucas",
      "title": "Reparar el daño",
      "description": "Zaqueo anuncia decisiones después de recibir a Jesús.",
      "question": "¿Qué propone respecto de lo defraudado?",
      "options": [
        "Restituirlo multiplicado por cuatro.",
        "Negarlo para proteger su imagen.",
        "Culpar a sus vecinos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Lucas 19:1-10",
      "devotionalExcerpt": "La restitución expresa una respuesta al encuentro; no se presenta como compra de la salvación.",
      "suggestedVerse": "Lucas 19:1-10. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-066",
      "theme": "Juan",
      "title": "Una conversación junto al pozo",
      "description": "Jesús habla con una mujer samaritana.",
      "question": "¿Cómo inicia la conversación?",
      "options": [
        "Le pide agua para beber.",
        "Le pide dinero para entrar en la ciudad.",
        "Se niega a hablar con ella."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Juan 4:7-15",
      "devotionalExcerpt": "El relato muestra a Jesús iniciando una conversación junto al pozo.",
      "suggestedVerse": "Juan 4:7-15. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-067",
      "theme": "Juan",
      "title": "Cuidar lo que queda",
      "description": "Después de alimentar a la multitud, Jesús da una indicación.",
      "question": "¿Qué pide recoger?",
      "options": [
        "Los pedazos que sobraron.",
        "Las monedas de los presentes.",
        "Las sandalias de los discípulos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Juan 6:8-13",
      "devotionalExcerpt": "El relato incluye el cuidado de los alimentos que quedaron.",
      "suggestedVerse": "Juan 6:8-13. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-068",
      "theme": "Juan",
      "title": "Un ejemplo de servicio",
      "description": "Jesús lava los pies a sus discípulos.",
      "question": "¿Qué sentido da a su acción?",
      "options": [
        "Un ejemplo para que se sirvan unos a otros.",
        "Una forma de competir por el primer puesto.",
        "Un motivo para despreciar a otros."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Juan 13:3-15",
      "devotionalExcerpt": "El pasaje presenta un ejemplo de servicio sin que esta actividad defina una práctica denominacional.",
      "suggestedVerse": "Juan 13:3-15. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-069",
      "theme": "Juan",
      "title": "La inquietud de Tomás",
      "description": "Tomás no estuvo presente en una aparición anterior.",
      "question": "¿Qué hace Jesús cuando vuelve a encontrarse con él?",
      "options": [
        "Lo invita a comprobar sus heridas.",
        "Ordena a los demás que lo insulten.",
        "Se niega a dirigirse a él."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Juan 20:24-29",
      "devotionalExcerpt": "El encuentro relata la respuesta de Jesús a la inquietud expresada por Tomás.",
      "suggestedVerse": "Juan 20:24-29. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-070",
      "theme": "Juan",
      "title": "Cuidar a otros",
      "description": "Jesús conversa con Pedro acerca de su amor por él.",
      "question": "¿Qué encargo acompaña sus preguntas?",
      "options": [
        "Cuidar sus ovejas.",
        "Acumular riquezas.",
        "Buscar reconocimiento político."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Juan 21:15-17",
      "devotionalExcerpt": "La conversación vincula el amor expresado con una responsabilidad de cuidado.",
      "suggestedVerse": "Juan 21:15-17. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-071",
      "theme": "Hechos",
      "title": "Aprender en comunidad",
      "description": "El pasaje describe prácticas de los primeros creyentes.",
      "question": "¿Qué actividad aparece entre ellas?",
      "options": [
        "Perseverar en la enseñanza de los apóstoles.",
        "Rechazar toda reunión.",
        "Competir por quién tenía más bienes."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 2:42-47",
      "devotionalExcerpt": "El relato incluye enseñanza, comunión, oración y atención a necesidades.",
      "suggestedVerse": "Hechos 2:42-47. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-072",
      "theme": "Hechos",
      "title": "Compartir según la necesidad",
      "description": "La comunidad reúne recursos para atender a sus miembros.",
      "question": "¿Cómo se distribuye la ayuda?",
      "options": [
        "Según la necesidad de cada uno.",
        "Según la popularidad de cada uno.",
        "Solo entre quienes poseen más."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 4:32-35",
      "devotionalExcerpt": "El relato destaca la atención a las necesidades dentro de la comunidad.",
      "suggestedVerse": "Hechos 4:32-35. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-073",
      "theme": "Hechos",
      "title": "Escuchar una necesidad desatendida",
      "description": "Surge una queja por viudas descuidadas en la distribución diaria.",
      "question": "¿Cómo se atiende el problema?",
      "options": [
        "Se organiza una responsabilidad específica para ese servicio.",
        "Se prohíbe expresar la necesidad.",
        "Se declara que esas viudas no importan."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 6:1-7",
      "devotionalExcerpt": "La comunidad escucha el problema y organiza su atención.",
      "suggestedVerse": "Hechos 6:1-7. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-074",
      "theme": "Hechos",
      "title": "Ayudar a comprender",
      "description": "Felipe encuentra a un hombre que lee al profeta Isaías.",
      "question": "¿Qué le pregunta?",
      "options": [
        "Si entiende lo que lee.",
        "Cuánto pagó por su carro.",
        "Por qué no memoriza todo primero."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 8:26-35",
      "devotionalExcerpt": "Felipe parte de la lectura y de la necesidad de comprensión del viajero.",
      "suggestedVerse": "Hechos 8:26-35. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-075",
      "theme": "Hechos",
      "title": "Acercarse con un encargo",
      "description": "Ananías recibe la indicación de visitar a Saulo.",
      "question": "¿Qué hace después de expresar su inquietud?",
      "options": [
        "Va a verlo.",
        "Organiza una campaña de rumores.",
        "Abandona la ciudad sin responder."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 9:10-19",
      "devotionalExcerpt": "El relato muestra su visita después de recibir la indicación del Señor.",
      "suggestedVerse": "Hechos 9:10-19. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-076",
      "theme": "Hechos",
      "title": "Una ayuda recordada",
      "description": "Las viudas muestran prendas realizadas por Dorcas.",
      "question": "¿Qué recuerdan esas prendas?",
      "options": [
        "Su labor de ayuda a otras personas.",
        "Su interés por ser gobernadora.",
        "Su trabajo como constructora de barcos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 9:36-39",
      "devotionalExcerpt": "El relato recuerda sus buenas obras mediante objetos concretos.",
      "suggestedVerse": "Hechos 9:36-39. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-077",
      "theme": "Hechos",
      "title": "Ayudar con lo disponible",
      "description": "Se anuncia una gran hambre y los discípulos preparan ayuda.",
      "question": "¿Con qué criterio decide contribuir cada uno?",
      "options": [
        "Conforme a sus posibilidades.",
        "Todos con una suma idéntica sin considerar sus medios.",
        "Solo si reciben un premio público."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 11:27-30",
      "devotionalExcerpt": "La ayuda se organiza teniendo en cuenta los medios de cada persona.",
      "suggestedVerse": "Hechos 11:27-30. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-078",
      "theme": "Hechos",
      "title": "Acompañar en oración",
      "description": "Pedro está en la cárcel.",
      "question": "¿Qué hace la iglesia por él?",
      "options": [
        "Ora a Dios de manera constante.",
        "Lo olvida por completo.",
        "Celebra su encarcelamiento."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 12:5-12",
      "devotionalExcerpt": "El relato presenta a la comunidad reunida en oración.",
      "suggestedVerse": "Hechos 12:5-12. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-079",
      "theme": "Hechos",
      "title": "Cuidar una vida",
      "description": "Después de un terremoto, el carcelero teme que los presos hayan escapado.",
      "question": "¿Qué le comunica Pablo?",
      "options": [
        "Que no se haga daño, pues todos están allí.",
        "Que debe huir sin mirar.",
        "Que nadie puede escucharlo."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 16:25-34",
      "devotionalExcerpt": "Pablo interviene para evitar que el carcelero se haga daño.",
      "suggestedVerse": "Hechos 16:25-34. Lee el pasaje en su contexto en tu Biblia.",
      "guidance": "El contexto incluye una persona en riesgo de hacerse daño. Conviene leerlo acompañados; esta actividad no sustituye ayuda profesional."
    },
    {
      "id": "biblia-reflexion-080",
      "theme": "Hechos",
      "title": "Examinar lo escuchado",
      "description": "Los habitantes de Berea reciben la enseñanza de Pablo.",
      "question": "¿Qué hacen para examinarla?",
      "options": [
        "Consultan las Escrituras cada día.",
        "Aceptan cualquier rumor sin revisar.",
        "Evitan toda lectura."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 17:10-12",
      "devotionalExcerpt": "El relato destaca su disposición a escuchar y comprobar en las Escrituras.",
      "suggestedVerse": "Hechos 17:10-12. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-081",
      "theme": "Hechos",
      "title": "Ayudar a aprender",
      "description": "Priscila y Aquila escuchan a Apolos.",
      "question": "¿Cómo lo ayudan?",
      "options": [
        "Le explican con mayor precisión el camino de Dios.",
        "Lo ridiculizan ante todos.",
        "Le prohíben aprender más."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 18:24-28",
      "devotionalExcerpt": "El pasaje describe una ayuda orientada a mejorar su comprensión.",
      "suggestedVerse": "Hechos 18:24-28. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-082",
      "theme": "Hechos",
      "title": "Trabajar para ayudar",
      "description": "Pablo recuerda su trabajo al despedirse de los ancianos.",
      "question": "¿Qué necesidad destaca?",
      "options": [
        "Ayudar a los débiles.",
        "Acumular prestigio personal.",
        "Evitar toda responsabilidad."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 20:32-35",
      "devotionalExcerpt": "Su despedida relaciona el esfuerzo con la ayuda a otros.",
      "suggestedVerse": "Hechos 20:32-35. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-083",
      "theme": "Hechos",
      "title": "Atender el alimento",
      "description": "Tras muchos días difíciles en el barco, Pablo habla a sus compañeros.",
      "question": "¿A qué los anima?",
      "options": [
        "A comer para recuperar fuerzas.",
        "A competir por el mando.",
        "A tirar todos los alimentos antes de comer."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 27:33-38",
      "devotionalExcerpt": "El relato muestra atención a una necesidad básica en medio del peligro.",
      "suggestedVerse": "Hechos 27:33-38. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-084",
      "theme": "Romanos",
      "title": "Una convivencia cuidadosa",
      "description": "Pablo ofrece orientaciones sobre las relaciones con otros.",
      "question": "¿Qué invita a practicar?",
      "options": [
        "La hospitalidad y la paz en cuanto dependa de cada uno.",
        "La venganza personal.",
        "El desprecio a quienes necesitan ayuda."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Romanos 12:9-18",
      "devotionalExcerpt": "El pasaje reúne acciones concretas de amor y convivencia.",
      "suggestedVerse": "Romanos 12:9-18. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-085",
      "theme": "Efesios",
      "title": "Palabras que ayudan",
      "description": "Pablo enseña acerca de la conducta y las palabras.",
      "question": "¿Qué uso de la palabra propone?",
      "options": [
        "Hablar de manera que ayude a quienes escuchan.",
        "Difundir falsedades útiles.",
        "Humillar a quien se equivoca."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Efesios 4:25-32",
      "devotionalExcerpt": "La enseñanza conecta la verdad, la bondad y el cuidado al hablar.",
      "suggestedVerse": "Efesios 4:25-32. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-086",
      "theme": "Filipenses",
      "title": "Considerar a los demás",
      "description": "Pablo invita a una actitud de humildad.",
      "question": "¿Qué atención pide ampliar?",
      "options": [
        "Mirar también por los intereses de los demás.",
        "Pensar únicamente en la propia ventaja.",
        "Buscar discusiones por prestigio."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Filipenses 2:1-4",
      "devotionalExcerpt": "La exhortación llama a considerar a otros junto con las propias necesidades.",
      "suggestedVerse": "Filipenses 2:1-4. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-087",
      "theme": "Santiago",
      "title": "Escuchar y actuar",
      "description": "Santiago enseña acerca de escuchar, hablar y enojarse.",
      "question": "¿Qué disposición recomienda?",
      "options": [
        "Escuchar con prontitud y ser lento para hablar y enojarse.",
        "Responder sin escuchar.",
        "Buscar siempre la última palabra."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Santiago 1:19-22",
      "devotionalExcerpt": "El pasaje une una escucha cuidadosa con la práctica de la palabra.",
      "suggestedVerse": "Santiago 1:19-22. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-088",
      "theme": "Santiago",
      "title": "Recibir sin favoritismos",
      "description": "Santiago describe un trato desigual a visitantes según su ropa.",
      "question": "¿Qué conducta cuestiona?",
      "options": [
        "Favorecer al rico y despreciar al pobre.",
        "Recibir a las personas con respeto.",
        "Atender a quien necesita ayuda."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Santiago 2:1-9",
      "devotionalExcerpt": "La enseñanza rechaza la discriminación basada en la condición económica.",
      "suggestedVerse": "Santiago 2:1-9. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-089",
      "theme": "Colosenses",
      "title": "Paciencia y perdón",
      "description": "Pablo enumera actitudes para la vida compartida.",
      "question": "¿Cuál aparece entre ellas?",
      "options": [
        "Soportarse y perdonarse unos a otros.",
        "Mantener el resentimiento como norma.",
        "Buscar motivos para humillar."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Colosenses 3:12-15",
      "devotionalExcerpt": "El pasaje relaciona misericordia, humildad, paciencia, perdón y amor.",
      "suggestedVerse": "Colosenses 3:12-15. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "biblia-reflexion-090",
      "theme": "1 Tesalonicenses",
      "title": "Animarse mutuamente",
      "description": "Pablo dirige una exhortación a la comunidad.",
      "question": "¿Qué los invita a hacer entre ellos?",
      "options": [
        "Animarse y edificarse mutuamente.",
        "Desalentarse ante cada error.",
        "Competir por el reconocimiento."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Tesalonicenses 5:11",
      "devotionalExcerpt": "La exhortación promueve el apoyo mutuo dentro de la comunidad.",
      "suggestedVerse": "1 Tesalonicenses 5:11. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-001",
      "title": "Cuidar lo recibido",
      "theme": "Génesis",
      "description": "Dios coloca al hombre en el huerto.",
      "question": "¿Qué tarea le encomienda?",
      "options": [
        "Cultivarlo y cuidarlo.",
        "Destruirlo sin motivo.",
        "Abandonarlo sin atención."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 2:15",
      "devotionalExcerpt": "La responsabilidad se refiere al huerto del relato; no se promete una recompensa económica.",
      "suggestedVerse": "Génesis 2:15. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-002",
      "title": "Agradecer la ayuda",
      "theme": "Génesis",
      "description": "El siervo de Abraham responde después de conocer a la familia de Rebeca.",
      "question": "¿Qué hace?",
      "options": [
        "Se inclina y adora a Dios.",
        "Se atribuye todo el mérito.",
        "Desprecia a quienes lo reciben."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Génesis 24:26-27",
      "devotionalExcerpt": "La escena muestra gratitud por la dirección recibida, sin convertirla en una fórmula para adivinar decisiones.",
      "suggestedVerse": "Génesis 24:26-27. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-003",
      "title": "Dar voluntariamente",
      "theme": "Éxodo",
      "description": "El pueblo reúne materiales para el tabernáculo.",
      "question": "¿Qué disposición destaca el pasaje?",
      "options": [
        "La voluntad del corazón de quienes llevan las ofrendas.",
        "La competencia por ser admirado.",
        "La imposición de una suma idéntica para todos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 35:21-29",
      "devotionalExcerpt": "Describe una contribución para un propósito concreto; no autoriza presionar a las personas.",
      "suggestedVerse": "Éxodo 35:21-29. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-004",
      "title": "Reconocer que es suficiente",
      "theme": "Éxodo",
      "description": "Los artesanos comunican a Moisés cuánto material han recibido.",
      "question": "¿Qué orden se da después?",
      "options": [
        "Que dejen de traer más, porque alcanza para la obra.",
        "Que sigan acumulando sin límite.",
        "Que escondan la cantidad recibida."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Éxodo 36:4-7",
      "devotionalExcerpt": "Se atiende a lo necesario para la obra, sin estimular una recaudación ilimitada.",
      "suggestedVerse": "Éxodo 36:4-7. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-005",
      "title": "Conversar sobre lo aprendido",
      "theme": "Deuteronomio",
      "description": "Moisés habla de recordar las palabras recibidas.",
      "question": "¿En qué situaciones propone hablar de ellas?",
      "options": [
        "En casa y durante el camino, al acostarse y al levantarse.",
        "Solo para impresionar a otros.",
        "Únicamente cuando haya una recompensa."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Deuteronomio 6:6-9",
      "devotionalExcerpt": "El pasaje incluye la enseñanza en la vida cotidiana; no propone una competencia de memorización.",
      "suggestedVerse": "Deuteronomio 6:6-9. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-006",
      "title": "Recordar y explicar",
      "theme": "Josué",
      "description": "Las piedras del Jordán darían ocasión a preguntas de los hijos.",
      "question": "¿Qué debían explicarles?",
      "options": [
        "Lo ocurrido cuando las aguas del Jordán se detuvieron ante el arca.",
        "Que las piedras tenían poder por sí mismas.",
        "Que no debían preguntar."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Josué 4:6-7",
      "devotionalExcerpt": "Se recuerda un acontecimiento del relato; no se atribuye poder mágico a un objeto.",
      "suggestedVerse": "Josué 4:6-7. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-007",
      "title": "Orar y enseñar",
      "theme": "1",
      "description": "Samuel habla al pueblo sobre su responsabilidad.",
      "question": "¿Qué expresa que seguirá haciendo?",
      "options": [
        "Orar por ellos y enseñarles el camino bueno.",
        "Dejar de escucharlos para siempre.",
        "Buscar un premio personal."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Samuel 12:23",
      "devotionalExcerpt": "El versículo une la oración por otros con la enseñanza.",
      "suggestedVerse": "1 Samuel 12:23. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-008",
      "title": "Reconocer de dónde viene lo recibido",
      "theme": "1",
      "description": "David ora después de reunir ofrendas.",
      "question": "¿Qué reconoce acerca de lo que ofrecen?",
      "options": [
        "Que procede de lo que Dios les ha dado.",
        "Que vuelve a Dios deudor de una recompensa.",
        "Que permite despreciar a quienes dieron menos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Crónicas 29:14",
      "devotionalExcerpt": "La gratitud no convierte la ofrenda en una compra de bendiciones.",
      "suggestedVerse": "1 Crónicas 29:14. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-009",
      "title": "Aprender, practicar y enseñar",
      "theme": "Esdras",
      "description": "El relato describe la disposición de Esdras.",
      "question": "¿Qué tres acciones relaciona?",
      "options": [
        "Estudiar la ley, cumplirla y enseñarla.",
        "Competir, presumir y exigir aplausos.",
        "Enseñar sin estudiar ni practicar."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Esdras 7:10",
      "devotionalExcerpt": "La enseñanza aparece acompañada por estudio y práctica.",
      "suggestedVerse": "Esdras 7:10. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-010",
      "title": "Cuidar el camino",
      "theme": "Salmos",
      "description": "El salmista pregunta cómo mantener limpio el camino.",
      "question": "¿Con qué relaciona la respuesta?",
      "options": [
        "Con guardar la palabra de Dios.",
        "Con aparentar ante los demás.",
        "Con evitar toda reflexión sobre la conducta."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Salmos 119:9",
      "devotionalExcerpt": "La pregunta se refiere a la conducta; no evalúa el valor personal del alumno.",
      "suggestedVerse": "Salmos 119:9. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-011",
      "title": "Escuchar antes de responder",
      "theme": "Proverbios",
      "description": "Un proverbio advierte sobre responder sin oír.",
      "question": "¿Qué conducta invita a evitar?",
      "options": [
        "Responder antes de escuchar.",
        "Escuchar para comprender.",
        "Reconocer que falta información."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Proverbios 18:13",
      "devotionalExcerpt": "La enseñanza se aplica al cuidado de la respuesta, sin usarla para avergonzar al que aprende.",
      "suggestedVerse": "Proverbios 18:13. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-012",
      "title": "Ayudarse al caer",
      "theme": "Eclesiastés",
      "description": "El pasaje compara trabajar acompañado y estar solo.",
      "question": "¿Qué ventaja menciona cuando uno cae?",
      "options": [
        "Que su compañero puede levantarlo.",
        "Que debe ocultar toda dificultad.",
        "Que el otro debe burlarse."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Eclesiastés 4:9-10",
      "devotionalExcerpt": "La comparación destaca la ayuda mutua; no desvaloriza a quien vive solo.",
      "suggestedVerse": "Eclesiastés 4:9-10. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-013",
      "title": "Atender la injusticia",
      "theme": "Isaías",
      "description": "El profeta llama al pueblo a aprender a hacer el bien.",
      "question": "¿Qué atención menciona expresamente?",
      "options": [
        "La justicia y la defensa del huérfano y la viuda.",
        "El beneficio de quien tiene más poder.",
        "La indiferencia ante el abuso."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Isaías 1:17",
      "devotionalExcerpt": "Se conserva el llamado ético del pasaje sin convertirlo en propaganda partidaria.",
      "suggestedVerse": "Isaías 1:17. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-014",
      "title": "Humildad y misericordia",
      "theme": "Miqueas",
      "description": "El profeta resume una conducta que Dios pide.",
      "question": "¿Qué tres actitudes menciona?",
      "options": [
        "Hacer justicia, amar misericordia y caminar humildemente con Dios.",
        "Buscar fama, imponer poder y presumir.",
        "Evitar toda responsabilidad hacia otros."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Miqueas 6:8",
      "devotionalExcerpt": "Se describe la respuesta ética del pueblo; no una manera de comprar la salvación.",
      "suggestedVerse": "Miqueas 6:8. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-015",
      "title": "Tratar justamente",
      "theme": "Zacarías",
      "description": "El profeta recuerda indicaciones sobre el trato entre personas.",
      "question": "¿Qué conducta pide?",
      "options": [
        "Justicia, misericordia y no oprimir a quienes son vulnerables.",
        "Aprovecharse de quien no puede defenderse.",
        "Planear daño contra el hermano."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Zacarías 7:9-10",
      "devotionalExcerpt": "El llamado se refiere a acciones concretas de justicia y cuidado.",
      "suggestedVerse": "Zacarías 7:9-10. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-016",
      "title": "No buscar el primer lugar",
      "theme": "Lucas",
      "description": "Jesús observa cómo los invitados escogen los primeros asientos.",
      "question": "¿Qué recomienda al invitado?",
      "options": [
        "No adelantarse a ocupar el lugar de mayor honor.",
        "Exigir que todos lo admiren.",
        "Humillar al que llega después."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Lucas 14:7-11",
      "devotionalExcerpt": "La enseñanza invita a la humildad; no a simular modestia para manipular a otros.",
      "suggestedVerse": "Lucas 14:7-11. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-017",
      "title": "No hacer diferencias de valor",
      "theme": "Hechos",
      "description": "Pedro comienza a hablar en casa de Cornelio.",
      "question": "¿Qué reconoce acerca de Dios?",
      "options": [
        "Que no hace acepción de personas.",
        "Que prefiere a quienes pueden pagar.",
        "Que solo escucha a los famosos."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Hechos 10:34",
      "devotionalExcerpt": "La afirmación no se usa para borrar el mensaje posterior de Pedro acerca de Jesucristo.",
      "suggestedVerse": "Hechos 10:34. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-018",
      "title": "Ayudar al otro a crecer",
      "theme": "Romanos",
      "description": "Pablo habla de quienes se consideran fuertes.",
      "question": "¿Hacia qué orienta su responsabilidad?",
      "options": [
        "Apoyar a los débiles y buscar el bien del prójimo para edificarlo.",
        "Usar la fuerza para ridiculizar.",
        "Buscar únicamente su propia comodidad."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Romanos 15:1-2",
      "devotionalExcerpt": "El contexto llama a edificar, no a encubrir daño ni a imponer dependencia.",
      "suggestedVerse": "Romanos 15:1-2. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-019",
      "title": "Necesitarnos mutuamente",
      "theme": "1",
      "description": "Pablo compara la comunidad con un cuerpo.",
      "question": "¿Qué actitud cuestiona entre sus miembros?",
      "options": [
        "Decir al otro que no lo necesita.",
        "Reconocer el cuidado mutuo.",
        "Compartir la alegría y el sufrimiento."
      ],
      "correctIndex": 0,
      "biblicalSupport": "1 Corintios 12:21-26",
      "devotionalExcerpt": "La comparación enseña cuidado y pertenencia sin imponer una postura sobre la continuidad de dones particulares.",
      "suggestedVerse": "1 Corintios 12:21-26. Lee el pasaje en su contexto en tu Biblia."
    },
    {
      "id": "propuesta-reflexion-020",
      "title": "Trabajar para compartir",
      "theme": "Efesios",
      "description": "Pablo habla a quien antes hurtaba.",
      "question": "¿Qué propósito añade al trabajo honrado?",
      "options": [
        "Tener qué compartir con quien necesita.",
        "Ocultar nuevas formas de engaño.",
        "Despreciar a quien pide ayuda."
      ],
      "correctIndex": 0,
      "biblicalSupport": "Efesios 4:28",
      "devotionalExcerpt": "La exhortación une honestidad y generosidad, sin culpar por su situación a quien no encuentra trabajo.",
      "suggestedVerse": "Efesios 4:28. Lee el pasaje en su contexto en tu Biblia."
    }
  ]
};

export const getNewChallenges = (_language: string = "es"): NewChallengesCatalog => newChallengesEs;
