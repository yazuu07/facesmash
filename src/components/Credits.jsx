export default function Credits({ onBack }) {
    return (
      <div className="page">
        <div className="page-header">
          <button className="exit-btn" onClick={onBack} type="button">
            ← Menu
          </button>
          <h2>Credits</h2>
        </div>
  
        <div className="credit-block">
          <h3>Built with</h3>
          <ul>
            <li>React 18</li>
            <li>Vite</li>
            <li>Pure CSS — no UI library</li>
          </ul>
        </div>
  
        <div className="credit-block">
          <h3>Concept</h3>
          <p>
            Inspired by the original FaceSmash (2003), A game, Mark Zuckerburg and Eduardo Saverin invented while he (Mark Zuckerburg) was drunk in the movie (Social Network).  Rebuilt as a friendly,
            frontend-only rating game. All images stay local — nothing leaves
            your browser.
          </p>
        </div>
  
        <div className="credit-block">
          <h3>Rating system</h3>
          <p>Elo — K-factor 32, starting rating 0.</p>
        </div>
  
        <div className="credit-block">
          <h3>Made by</h3>
          <p>0xYazu.</p>
        </div>
      </div>
    );
  }