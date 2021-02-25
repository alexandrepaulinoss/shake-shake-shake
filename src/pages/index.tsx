import Head from 'next/head';
import React from 'react';

import { Challengebox } from "../components/Challengebox";
import { CompletedChalenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | shake-shake-shake</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChalenges />
            <Countdown />
          </div>
          <div>
            <Challengebox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
