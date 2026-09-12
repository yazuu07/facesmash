import Card from './Card.jsx';

export default function VotingScreen({
  pair,
  locked,
  round,
  totalRounds,
  onVote,
  hapticsEnabled = true,
  showElo = true,
}) {
  if (!pair) return null;
  const [a, b] = pair;
  const progress = (round / totalRounds) * 100;

  function haptic(ms = 15) {
    if (hapticsEnabled && navigator.vibrate) navigator.vibrate(ms);
  }

  function pick(item) {
    if (locked) return;
    haptic(15);
    onVote(item.id);
  }

  return (
    <div className="voting">
      <div className="progress">
        <div className="bar" style={{ width: `${progress}%` }} />
      </div>

      <div className={`arena ${locked ? 'locked' : ''}`}>
        <div className="card-slot card-slot-top">
          <Card
            item={a}
            onPick={() => pick(a)}
            disabled={locked}
            side="a"
            showElo={showElo}
          />
        </div>

        <div className="card-slot card-slot-bottom">
          <Card
            item={b}
            onPick={() => pick(b)}
            disabled={locked}
            side="b"
            showElo={showElo}
          />
        </div>

        <div className="vs">VS</div>
      </div>

      <p className="hint">
        Tap a pic to pick it
        <br />
        <span className="muted">
          Round {Math.min(round + 1, totalRounds)} of {totalRounds}
        </span>
      </p>
    </div>
  );
}