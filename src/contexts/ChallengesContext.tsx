import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

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
}

interface IChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({ children }: IChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<IChallenge>(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp() {
    setLevel(level + 1);
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
      }}>
      { children}
    </ChallengesContext.Provider>
  )
}