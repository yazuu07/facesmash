export default function Card({ item, onPick, disabled, side, showElo = true }) {
    return (
      <button
        className="card"
        onClick={onPick}
        disabled={disabled}
        type="button"
        data-side={side}
      >
        {showElo && <span className="elo">{item.elo}</span>}
        <img src={item.imageUrl} alt={item.name} draggable={false} />
        <span className="label">{item.name}</span>
      </button>
    );
  }