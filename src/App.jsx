import { useState } from 'react';
import ProfileSelection from './components/ProfileSelection';
import ChallengeScreen from './components/ChallengeScreen';
import { CoinProvider } from './context/CoinContext';
import { SoundProvider } from './context/SoundContext';

import BackgroundSlideshow from './components/BackgroundSlideshow';

function App() {
  const [ageGroup, setAgeGroup] = useState(null);

  return (
    <CoinProvider>
      <SoundProvider>
        <div className="min-h-screen font-sans overflow-hidden relative">
          <BackgroundSlideshow />
          <div className="relative z-10 min-h-screen">
            {!ageGroup ? (
              <ProfileSelection onSelectProfile={setAgeGroup} />
            ) : (
              <ChallengeScreen
                ageGroup={ageGroup}
                onBack={() => setAgeGroup(null)}
              />
            )}
          </div>
        </div>
      </SoundProvider>
    </CoinProvider>
  );
}

export default App;
