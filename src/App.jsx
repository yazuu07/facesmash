import { useState } from 'react';
import MainMenu from './components/MainMenu.jsx';
import StartScreen from './components/StartScreen.jsx';
import HowToPlay from './components/HowToPlay.jsx';
import Options from './components/Options.jsx';
import Credits from './components/Credits.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import { DEFAULT_SETTINGS } from './data/settings.js';

export default function App() {
  const [active, setActive] = useState('menu');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  return (
    <div className="app">
      <MusicPlayer
        enabled={settings.musicEnabled}
        volume={settings.musicVolume}
      />

      <main className="screen">
        {active === 'menu' && (
          <MainMenu onNavigate={setActive} settings={settings} />
        )}

        {active === 'play' && (
          <StartScreen settings={settings} onExit={() => setActive('menu')} />
        )}

        {active === 'howto' && <HowToPlay onBack={() => setActive('menu')} />}

        {active === 'options' && (
          <Options
            settings={settings}
            onChange={setSettings}
            onReset={() => setSettings(DEFAULT_SETTINGS)}
            onBack={() => setActive('menu')}
          />
        )}

        {active === 'credits' && <Credits onBack={() => setActive('menu')} />}
      </main>
    </div>
  );
}