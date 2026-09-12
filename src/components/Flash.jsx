import { useEffect, useState } from 'react';

export default function Flash({ text, color }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="flash" style={{ color }}>
      {text}
    </div>
  );
}