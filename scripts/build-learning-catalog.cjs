const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const box = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, 'src/data/newChallengesData.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, box);
const newer = box.exports.newChallengesEs;
const practice = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, 'src/lib/practice.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, practice);
const records = [];
const catalogPath = path.join(root, 'server/catalog.json');
const archivePath = path.join(root, 'server/catalog-archive.json');
const previous = fs.existsSync(catalogPath) ? JSON.parse(fs.readFileSync(catalogPath,'utf8')) : [];
const archived = fs.existsSync(archivePath) ? JSON.parse(fs.readFileSync(archivePath,'utf8')) : [];
const add = item => {
  const { levels, contextNote, guidance, ...core } = item;
  item.id = crypto.createHash('sha256').update(JSON.stringify(core)).digest('hex').slice(0, 24);
  item.contentKeys = practice.exports.exposureKeys(item);
  const existing=records.find(x => x.id === item.id);
  if (!existing) records.push(item);
  else if(item.levels) existing.levels=[...new Set([...(existing.levels||[]),...item.levels])];
};
for (const version of ['rvr1960', 'nvi', 'ntv']) {
  const data = JSON.parse(fs.readFileSync(path.join(root, `src/data/bible/es_${version}.json`), 'utf8'));
  for (const [index, bank] of [data.findWordLevel1, data.findWordLevel2].entries()) for (const c of bank) add({ mode: 'find-word', version, type: 'comprobable', prompt: c.hint, answer: c.answer, reference: c.reference, syllables: c.syllables || [], contextNote:c.contextNote, levels:index===0?(c.syllables?.length>1?['principiante','intermedio']:['intermedio']):['intermedio','avanzado'] });
  for (const c of data.completePhraseChallenges) add({ mode: 'complete-phrase', version, type: 'textual', prompt: 'Completa el fragmento con las palabras de la versión indicada.', answer: c.fullPhrase, passage: c.fullPhrase, reference: c.reference, contextNote:c.contextNote });
  for (const c of data.guessPhraseChallenges) add({ mode: 'guess-the-phrase', version, type: 'textual', prompt: 'Descubre el fragmento y escribe la frase completa.', answer: c.phrase, passage: c.phrase, reference: c.reference, contextNote:c.contextNote });
  // Reutilizar palabras y referencias comprobables del catálogo, sin escribir citas nuevas.
  for (const [level,size] of [['principiante',4],['intermedio',5],['avanzado',6]]) for (const c of practice.exports.buildSearchSets([...data.findWordLevel1, ...data.findWordLevel2], size)) add({ mode: 'word-search', version, type: 'comprobable', prompt: c.theme, words: c.words, answer: c.words.join('|'), reference: c.references.join('; '), levels:[level] });
}
for (const c of newer.rosco.principiante.flat()) add({ mode: 'bible-rosco', version: 'referencias', type: 'comprobable', prompt: c.definition, answer: c.word, accepted: c.acceptedAnswers || [], reference: c.reference, letter: c.letter, letterRule: c.type, contextNote:c.contextNote });
for (const c of newer.counseling) add({ mode: 'counseling-practical', version: 'referencias', type: 'reflexion', title: c.title, prompt: c.description + '\n' + c.question, options: c.options, answer: String(c.correctIndex), reference: c.biblicalSupport, explanation: c.devotionalExcerpt, guidance:c.guidance });
// Conservar los conjuntos originales, sin crear citas nuevas.
for (const [level,sets] of Object.entries(newer.wordSearch)) for (const c of sets) add({ mode: 'word-search', version: 'referencias', type: 'comprobable', prompt: c.theme, words: c.words, answer: c.words.join('|'), reference: c.references.join('; '), contextNote:c.contextNote, levels:[level==='discipulo'?'intermedio':level] });
fs.mkdirSync(path.join(root, 'server'), { recursive: true });
fs.writeFileSync(path.join(root, 'server/catalog.json'), JSON.stringify(records));
const active = new Set(records.map(q=>q.id));
const history = [...new Map([...archived,...previous].filter(q=>!active.has(q.id)).map(q=>[q.id,{...q,retired:true}])).values()];
fs.writeFileSync(archivePath,JSON.stringify(history));
// El servicio y el cliente usan la misma selección, sin depender de TypeScript en ejecución.
fs.writeFileSync(path.join(root,'server/practice.cjs'),ts.transpileModule(fs.readFileSync(path.join(root,'src/lib/practice.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText);
console.log(`Catálogo de servicio: ${records.length} fichas, derivadas de los archivos existentes.`);
