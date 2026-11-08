/** Display normalization preserves Ñ; accents are removed only for this word activity. */
export function normalizeGridWord(word: string): string {
  return word.toUpperCase().replace(/Ñ/g, '\uE000').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\uE000/g, 'Ñ').replace(/[^A-ZÑ]/g, '');
}

export function generateWordSearchGrid(words: string[], requestedSize = 10, seed?: string): string[][] {
  let state=2166136261; for(const ch of seed||'')state=Math.imul(state^ch.charCodeAt(0),16777619);
  const random=seed?()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;}:Math.random;
  const clean = words.map(normalizeGridWord).filter(Boolean);
  const size = Math.max(requestedSize, clean.length, ...clean.map(word => word.length));
  const directions = [[0, 1], [1, 0], [1, 1]];
  let grid: string[][] = [];
  for (let trial = 0; trial < 30; trial++) {
    grid = Array.from({ length: size }, () => Array<string>(size).fill(''));
    let complete = true;
    for (const word of [...clean].sort((a,b) => b.length - a.length)) {
      const candidates: number[][] = [];
      for (const [dr, dc] of directions) for (let r = 0; r + dr * (word.length - 1) < size; r++) for (let c = 0; c + dc * (word.length - 1) < size; c++) {
        if ([...word].every((ch,i) => !grid[r+dr*i][c+dc*i] || grid[r+dr*i][c+dc*i] === ch)) candidates.push([r,c,dr,dc]);
      }
      if (!candidates.length) { complete = false; break; }
      const [r,c,dr,dc] = candidates[Math.floor(random() * candidates.length)];
      [...word].forEach((ch,i) => { grid[r+dr*i][c+dc*i] = ch; });
    }
    if (complete) break;
    if (trial === 29) {
      grid = Array.from({ length: size }, () => Array<string>(size).fill(''));
      clean.forEach((word,r) => [...word].forEach((ch,c) => { grid[r][c] = ch; }));
    }
  }
  const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  return grid.map(row => row.map(ch => ch || letters[Math.floor(random() * letters.length)]));
}
