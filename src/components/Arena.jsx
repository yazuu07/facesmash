import Card from './Card.jsx';

export default function Arena({ pair, locked, onVote }) {
  if (!pair) {
    return <div className="empty">Add at least 2 images to play.</div>;
  }

  const [a, b] = pair;

  return (
    <div className={`arena ${locked ? 'locked' : ''}`}>
      <Card item={a} onPick={() => onVote(a.id)} />
      <Card item={b} onPick={() => onVote(b.id)} />
      <div className="vs">VS</div>
    </div>
  );
}