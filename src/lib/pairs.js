// Pick two distinct random items.
// Optionally avoid a pair we just showed so the user doesn't see the same matchup twice in a row.
export function pickRandomPair(items, lastPair = null) {
    if (items.length < 2) return null;
  
    // Try a few times to avoid repeating the exact same pair back-to-back
    for (let attempt = 0; attempt < 8; attempt++) {
      const i = Math.floor(Math.random() * items.length);
      let j = Math.floor(Math.random() * items.length);
      while (j === i) j = Math.floor(Math.random() * items.length);
  
      const a = items[i];
      const b = items[j];
  
      if (
        lastPair &&
        ((lastPair[0].id === a.id && lastPair[1].id === b.id) ||
          (lastPair[0].id === b.id && lastPair[1].id === a.id))
      ) {
        continue; // retry
      }
      return [a, b];
    }
  
    // Fallback: return any two distinct
    const a = items[0];
    const b = items[1];
    return [a, b];
  }
  
  export const TOTAL_ROUNDS = 10;