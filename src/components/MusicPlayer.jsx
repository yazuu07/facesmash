import { useEffect, useRef, useState } from 'react';

const MUSIC_SRC = '/audio/bgm.mp3'; // ← match your filename

export default function MusicPlayer({ enabled = true, volume = 0.4 }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const userInteracted = useRef(false);

  // Apply volume whenever it changes
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Handle enable/disable
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!enabled) {
      audio.pause();
      setPlaying(false);
      return;
    }

    // If user already interacted, try to play
    if (userInteracted.current) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [enabled]);

  // One-time listener: fire play on the very first user gesture
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function start() {
      userInteracted.current = true;
      audio.volume = volume;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }

    // Every possible gesture that counts as user interaction
    const events = ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'click'];
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
    };
  }, []); // run once on mount

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" playsInline />

      <button
        type="button"
        className="music-toggle"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? '🔊' : '🔇'}
      </button>
    </>
  );
}