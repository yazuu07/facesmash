import { useState } from 'react';

export default function Toolbar({ onReset, onShowLeaderboard, onAddItem }) {
  const [adding, setAdding] = useState(false);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!url.trim()) return;
    onAddItem(name.trim() || 'New Item', url.trim());
    setUrl('');
    setName('');
    setAdding(false);
  }

  return (
    <div className="toolbar">
      <button onClick={onReset}>🔄 Reset Ratings</button>
      <button onClick={onShowLeaderboard}>🏆 Leaderboard</button>
      <button onClick={() => setAdding((v) => !v)}>➕ Add Image</button>

      {adding && (
        <form className="add-form" onSubmit={submit}>
          <input
            type="url"
            placeholder="Image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}