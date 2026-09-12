export function analyzeGame({ items, history }) {
    const byId = Object.fromEntries(items.map((i) => [i.id, i]));
    const ranking = [...items].sort((a, b) => b.elo - a.elo);
  
    const statsMap = Object.fromEntries(
      items.map((it) => [it.id, { wins: 0, losses: 0 }])
    );
    for (const h of history) {
      statsMap[h.winnerId].wins += 1;
      statsMap[h.loserId].losses += 1;
    }
  
    const stats = items.map((it) => {
      const { wins, losses } = statsMap[it.id];
      const total = wins + losses;
      return {
        ...it,
        wins,
        losses,
        netChange: it.elo,              // ← was it.elo - 1200
        winRate: total > 0 ? wins / total : 0,
      };
    });
  
    const byWinRate = [...stats].sort(
      (a, b) => b.winRate - a.winRate || b.netChange - a.netChange
    );
  
    let biggestUpset = null;
    for (const h of history) {
      const gap = h.loserEloBefore - h.winnerEloBefore;
      if (!biggestUpset || gap > biggestUpset.gap) {
        biggestUpset = {
          gap,
          winner: byId[h.winnerId],
          loser: byId[h.loserId],
          winnerEloBefore: h.winnerEloBefore,
          loserEloBefore: h.loserEloBefore,
          deltaW: h.deltaW,
        };
      }
    }
  
    return {
      winner: ranking[0],
      lastPlace: ranking[ranking.length - 1],
      ranking,
      stats,
      byWinRate,
      biggestUpset,
      totalVotes: history.length,
    };
  }