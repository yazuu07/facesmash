export default function Leaderboard({ analysis, onBack, onPlayAgain, onExit }) {
    if (!analysis) return null;
    const { ranking } = analysis;
  
    return (
      <div className="leaderboard">
        <h2>🏆 Leaderboard</h2>
  
        <div className="lb-list">
          {ranking.map((item, idx) => (
            <div className={`lb-row rank-${idx + 1}`} key={item.id}>
              <span className="lb-rank">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
              </span>
              <img src={item.imageUrl} alt="" />
              <div className="lb-info">
                <span className="lb-name">{item.name}</span>
              </div>
              <span className="lb-elo">{item.elo}</span>
            </div>
          ))}
        </div>
  
        <div className="actions">
          <button onClick={onBack}>← Back to Analysis</button>
          <button className="primary" onClick={onPlayAgain}>
            Play Again
          </button>
          <button onClick={onExit}>Exit to Menu</button>
        </div>
      </div>
    );
  }