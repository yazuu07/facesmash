import { useMemo, useState } from 'react';
import { ITEMS, START_ELO } from '../data/items.js';
import { computeEloDelta } from '../lib/elo.js';
import { pickRandomPair } from '../lib/pairs.js';
import { analyzeGame } from '../lib/analysis.js';
import VotingScreen from './VotingScreen.jsx';
import Analysis from './Analysis.jsx';
import Leaderboard from './Leaderboard.jsx';
import Flash from './Flash.jsx';

const PHASES = { VOTING: 'voting', ANALYSIS: 'analysis', LEADERBOARD: 'leaderboard' };

function freshItems() {
  return ITEMS.map((it) => ({ ...it, elo: START_ELO }));
}

export default function StartScreen({ settings, onExit }) {
  const [phase, setPhase] = useState(PHASES.VOTING);
  const [items, setItems] = useState(freshItems);
  const [pair, setPair] = useState(() => pickRandomPair(freshItems()));
  const [round, setRound] = useState(0);
  const [history, setHistory] = useState([]);
  const [flash, setFlash] = useState(null);
  const [locked, setLocked] = useState(false);

  const analysis = useMemo(
    () =>
      phase === PHASES.ANALYSIS || phase === PHASES.LEADERBOARD
        ? analyzeGame({ items, history })
        : null,
    [phase, items, history]
  );

  function vote(winnerId) {
    if (locked || !pair) return;
    const [a, b] = pair;
    const winner = winnerId === a.id ? a : b;
    const loser = winnerId === a.id ? b : a;

    setLocked(true);

    const { deltaW, deltaL } = computeEloDelta(winner.elo, loser.elo);

    const entry = {
      winnerId: winner.id,
      loserId: loser.id,
      deltaW,
      deltaL,
      winnerEloBefore: winner.elo,
      loserEloBefore: loser.elo,
    };

    const updated = items.map((it) => {
      if (it.id === winner.id) return { ...it, elo: it.elo + deltaW };
      if (it.id === loser.id) return { ...it, elo: it.elo + deltaL };
      return it;
    });

    setFlash({ text: `+${deltaW}`, color: '#4ade80', id: Date.now() });

    const nextRound = round + 1;

    setTimeout(() => {
      setItems(updated);
      setHistory((h) => [...h, entry]);
      setFlash(null);

      if (nextRound >= settings.rounds) {
        setPhase(PHASES.ANALYSIS);
      } else {
        setPair(pickRandomPair(updated, pair));
        setRound(nextRound);
      }
      setLocked(false);
    }, 350);
  }

  function playAgain() {
    const fresh = freshItems();
    setItems(fresh);
    setPair(pickRandomPair(fresh));
    setRound(0);
    setHistory([]);
    setPhase(PHASES.VOTING);
    setFlash(null);
    setLocked(false);
  }

  const headerRight =
    phase === PHASES.VOTING
      ? `Round ${Math.min(round + 1, settings.rounds)} / ${settings.rounds}`
      : 'Results';

  return (
    <div className="start-screen">
      <div className="round-header">
        <button className="exit-btn" onClick={onExit} type="button">
          ← Menu
        </button>
        <div className="stats">{headerRight}</div>
      </div>

      {phase === PHASES.VOTING && pair && (
        <VotingScreen
          pair={pair}
          locked={locked}
          round={round}
          totalRounds={settings.rounds}
          onVote={vote}
          hapticsEnabled={settings.hapticsEnabled}
          showElo={settings.showEloOnCard}
        />
      )}

      {phase === PHASES.ANALYSIS && (
        <Analysis
          analysis={analysis}
          onLeaderboard={() => setPhase(PHASES.LEADERBOARD)}
          onPlayAgain={playAgain}
          onExit={onExit}
        />
      )}

      {phase === PHASES.LEADERBOARD && (
        <Leaderboard
          analysis={analysis}
          onBack={() => setPhase(PHASES.ANALYSIS)}
          onPlayAgain={playAgain}
          onExit={onExit}
        />
      )}

      {flash && <Flash key={flash.id} text={flash.text} color={flash.color} />}
    </div>
  );
}