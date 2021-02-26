import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: IChallenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  challengeCompleted: () => void;
  closeLevelUpModal: () => void;
}

interface IChallengesProviderProps {
  children: ReactNode;
  shakeshakeshake_level: number;
  shakeshakeshake_currentExperience: number;
  shakeshakeshake_challengesCompleted: number;
}

export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({ children, ...rest }: IChallengesProviderProps) {
  const [level, setLevel] = useState(rest.shakeshakeshake_level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.shakeshakeshake_currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.shakeshakeshake_challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState<IChallenge>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('shakeshakeshake_level', String(level));
    Cookies.set('shakeshakeshake_currentExperience', String(currentExperience));
    Cookies.set('shakeshakeshake_challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengeCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge as IChallenge);

    new Audio('/notification.mp3').play();

    Notification.requestPermission().then(function (permission) {
      console.log('permission:', permission)
    });

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎁', {
        icon: 'https://i.imgur.com/Q97YCwd.png',
        body: `Ganhe ${challenge.amount} xp!`,
        requireInteraction: true,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function challengeCompleted() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        challengeCompleted,
        closeLevelUpModal,
      }}>
      { children}


      {isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  )
}