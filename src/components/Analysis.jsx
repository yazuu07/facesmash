export default function Analysis({ analysis, onLeaderboard, onPlayAgain, onExit }) {
    if (!analysis) return null;
    const { winner, lastPlace, stats, biggestUpset, totalVotes } = analysis;
  
    return (
      <div className="analysis">
        <h2>📊 Analysis</h2>
        <p className="hint">
          {totalVotes} matchups complete. Here's what the votes revealed.
        </p>
  
        <div className="cards">
          <div className="stat-card gold">
            <span className="stat-label">🥇 Winner</span>
            <img src={winner.imageUrl} alt="" />
            <span className="stat-name">{winner.name}</span>
            <span className="stat-value">{winner.elo} Elo</span>
          </div>
  
          <div className="stat-card">
            <span className="stat-label">🐢 Last Place</span>
            <img src={lastPlace.imageUrl} alt="" />
            <span className="stat-name">{lastPlace.name}</span>
            <span className="stat-value">{lastPlace.elo} Elo</span>
          </div>
  
          {biggestUpset && (
            <div className="stat-card">
              <span className="stat-label">⚡ Biggest Upset</span>
              <img src={biggestUpset.winner.imageUrl} alt="" />
              <span className="stat-name">
                {biggestUpset.winner.name} beat {biggestUpset.loser.name}
              </span>
              <span className="stat-value">
                {biggestUpset.winnerEloBefore} vs {biggestUpset.loserEloBefore} (+
                {biggestUpset.deltaW})
              </span>
            </div>
          )}
        </div>
  
        <h3>Elo Change</h3>
        <div className="bars">
          {stats.map((it) => {
            const pct = Math.min(100, (Math.abs(it.netChange) / 100) * 100);
            return (
              <div className="bar-row" key={it.id}>
                <img src={it.imageUrl} alt="" />
                <span className="bar-name">{it.name}</span>
                <div className="bar-track">
                  <div
                    className={`bar-fill ${it.netChange >= 0 ? 'up' : 'down'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`bar-delta ${it.netChange >= 0 ? 'up' : 'down'}`}>
                  {it.netChange >= 0 ? '+' : ''}
                  {it.netChange}
                </span>
              </div>
            );
          })}
        </div>
  
        <div className="actions">
  <button className="primary" onClick={onLeaderboard}>
    View Leaderboard →
  </button>
  <button onClick={onPlayAgain}>Play Again</button>
  <button onClick={onExit}>Exit to Menu</button>
</div>
      </div>
    );
  }