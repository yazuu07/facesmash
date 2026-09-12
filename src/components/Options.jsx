export default function Options({ settings, onChange, onReset, onBack }) {
    function set(key, value) {
      onChange({ ...settings, [key]: value });
    }
  
    return (
      <div className="page">
        <div className="page-header">
          <button className="exit-btn" onClick={onBack} type="button">
            ← Menu
          </button>
          <h2>Options</h2>
        </div>
  
        <div className="option-group">
          <label className="option">
            <span className="option-label">Rounds per game</span>
            <span className="option-desc">
              How many matchups before the analysis screen.
            </span>
            <div className="option-control">
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={settings.rounds}
                onChange={(e) => set('rounds', Number(e.target.value))}
              />
              <span className="option-value">{settings.rounds}</span>
            </div>
          </label>
  
          <label className="option">
          <span className="option-label">Background music</span>
  <span className="option-desc">Loop the soundtrack while you play.</span>
  <div className="option-control">
    <input
      type="checkbox"
      checked={settings.musicEnabled}
      onChange={(e) => set('musicEnabled', e.target.checked)}
    />
  </div>
</label>

<label className="option">
  <span className="option-label">Music volume</span>
  <span className="option-desc">
    How loud the soundtrack plays.
  </span>
  <div className="option-control">
    <input
      type="range"
      min="0"
      max="1"
      step="0.05"
      value={settings.musicVolume}
      onChange={(e) => set('musicVolume', Number(e.target.value))}
      disabled={!settings.musicEnabled}
    />
    <span className="option-value">
      {Math.round(settings.musicVolume * 100)}%
    </span>
  </div>
            <span className="option-label">Haptic feedback</span>
            <span className="option-desc">
              Short vibration on supported devices when you vote.
            </span>
            <div className="option-control">
              <input
                type="checkbox"
                checked={settings.hapticsEnabled}
                onChange={(e) => set('hapticsEnabled', e.target.checked)}
              />
            </div>
          </label>
  
          <label className="option">
            <span className="option-label">Show Elo on cards</span>
            <span className="option-desc">
              Display the running rating badge on each pic.
            </span>
            <div className="option-control">
              <input
                type="checkbox"
                checked={settings.showEloOnCard}
                onChange={(e) => set('showEloOnCard', e.target.checked)}
              />
            </div>

          </label>
        </div>
  
        <div className="actions">
          <button onClick={onReset}>Reset to Defaults</button>
        </div>
      </div>
    );
  }