import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
  const currentPosition = `${Math.round(currentExperience / experienceToNextLevel * 100)}%`;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: currentPosition }} />

        <span className={styles.currentExperience} style={{ left: currentPosition }}>
          {currentExperience} xp
          </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}