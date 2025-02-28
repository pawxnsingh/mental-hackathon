import type { NextPage } from 'next';
import Head from 'next/head';
import {EnhancedLandingPage} from '@/components/LandingPage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ReplyGuy - Streamline your customer communications</title>
        <meta name="description" content="Streamline your customer communications with our intuitive platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <EnhancedLandingPage />
    </>
  );
};

export default Home;