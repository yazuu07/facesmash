export function expectedScore(a, b) {
    return 1 / (1 + Math.pow(10, (b - a) / 400));
  }
  
  export function computeEloDelta(winnerElo, loserElo, k = 32) {
    const expW = expectedScore(winnerElo, loserElo);
    const expL = expectedScore(loserElo, winnerElo);
    return {
      deltaW: Math.round(k * (1 - expW)),
      deltaL: Math.round(k * (0 - expL)),
    };
  }