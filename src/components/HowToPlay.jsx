export default function HowToPlay({ onBack }) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="exit-btn" onClick={onBack} type="button">
            ← Menu
          </button>
          <h2>How to Play</h2>
        </div>
  
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-body">
              <h3>Two pics appear</h3>
              <p>Each round shows two random pictures from the pool of five.</p>
            </div>
          </div>
  
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-body">
              <h3>Tap the one you prefer</h3>
              <p>
                Click or tap the pic you like more. Your pick wins the matchup,
                the other loses.
              </p>
            </div>
          </div>
  
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-body">
              <h3>Elo updates instantly</h3>
              <p>
                Every pic starts at 0 Elo. Winning raises its rating, losing
                lowers it. Upsets swing the rating harder.
              </p>
            </div>
          </div>
  
          <div className="step">
            <div className="step-num">4</div>
            <div className="step-body">
              <h3>See the analysis</h3>
              <p>
                After the final round, you get winner, last place, biggest upset,
                and Elo change per pic.
              </p>
            </div>
          </div>
  
          <div className="step">
            <div className="step-num">5</div>
            <div className="step-body">
              <h3>Check the leaderboard</h3>
              <p>The final ranking, from highest Elo to lowest.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }