import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';

import { Challengebox } from "../components/Challengebox";
import { CompletedChalenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface IHomeProps {
  shakeshakeshake_level: number;
  shakeshakeshake_currentExperience: number;
  shakeshakeshake_challengesCompleted: number;
}

export default function Home(props: IHomeProps) {
  return (
    <ChallengesProvider
      shakeshakeshake_level={props.shakeshakeshake_level}
      shakeshakeshake_currentExperience={props.shakeshakeshake_currentExperience}
      shakeshakeshake_challengesCompleted={props.shakeshakeshake_challengesCompleted}
    >
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
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    shakeshakeshake_level,
    shakeshakeshake_currentExperience,
    shakeshakeshake_challengesCompleted,
  } = ctx.req.cookies;

  return {
    props: {
      shakeshakeshake_level: Number(shakeshakeshake_level),
      shakeshakeshake_currentExperience: Number(shakeshakeshake_currentExperience),
      shakeshakeshake_challengesCompleted: Number(shakeshakeshake_challengesCompleted),
    }
  }
}