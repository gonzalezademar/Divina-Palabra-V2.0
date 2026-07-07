export interface DoctrinalMetadata {
  doctrinalProfile?: string[];
  bloomLevel?: string;
  topic?: string;
  biblicalBook?: string;
  testament?: 'AT' | 'NT';
  difficultyWeight?: number;
  educationalObjectives?: string[];
  competencies?: string[];
}

export function filterByDoctrinalProfile<T extends Record<string, any>>(
  items: T[],
  profile?: string,
  minRequired: number = 0
): T[] {
  if (!items || items.length === 0) return items;

  // Filter items matching the profile or universal (no specific profile or 'universal' in array)
  const filtered = items.filter(item => {
    if (!item.metadata || !item.metadata.doctrinalProfile || item.metadata.doctrinalProfile.length === 0) {
      return true; // UNIVERSAL
    }
    if (!profile) return true; // If no profile selected, everything universal or explicit? Wait, if no profile, maybe everything is allowed. Let's just allow universal if no profile.
    
    return item.metadata.doctrinalProfile.includes(profile) || item.metadata.doctrinalProfile.includes('universal');
  });

  // If we don't have enough items after filtering, fill with universal items
  if (filtered.length < minRequired) {
    const universalItems = items.filter(item => 
      !item.metadata || !item.metadata.doctrinalProfile || item.metadata.doctrinalProfile.length === 0 || item.metadata.doctrinalProfile.includes('universal')
    );
    
    const needed = minRequired - filtered.length;
    const additional = universalItems.filter(u => !filtered.includes(u)).slice(0, needed);
    return [...filtered, ...additional];
  }

  return filtered;
}
