export default function MainMenu({ onNavigate, settings }) {
    return (
      <div className="menu-screen">
        <div className="menu-hero">
          <h1 className="menu-title">
            Face<span>Smash</span>
          </h1>
          <p className="menu-subtitle">5 pics. Head-to-head. One winner.</p>
        </div>
  
        <div className="menu-buttons">
          <button
            className="menu-btn primary"
            onClick={() => onNavigate('play')}
            type="button"
          >
            <span className="menu-btn-label">Start</span>
            <span className="menu-btn-sub">
              {settings.rounds} rounds · random matchups
            </span>
          </button>
  
          <button
            className="menu-btn"
            onClick={() => onNavigate('howto')}
            type="button"
          >
            <span className="menu-btn-label">How to Play</span>
            <span className="menu-btn-sub">Rules in 30 seconds</span>
          </button>
  
          <button
            className="menu-btn"
            onClick={() => onNavigate('options')}
            type="button"
          >
            <span className="menu-btn-label">Options</span>
            <span className="menu-btn-sub">Rounds, haptics, display</span>
          </button>
  
          <button
            className="menu-btn"
            onClick={() => onNavigate('credits')}
            type="button"
          >
            <span className="menu-btn-label">Credits</span>
            <span className="menu-btn-sub">Who built this</span>
          </button>
        </div>
  
        <p className="menu-footer">v0.1 · frontend only</p>
      </div>
    );
  }