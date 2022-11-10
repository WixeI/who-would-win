/* eslint-disable @next/next/no-img-element */
import { inferProcedureOutput } from '@trpc/server';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppRouter } from '../server/routers/_app';
import { trpc } from '../utils/trpc';
import { motion } from 'framer-motion';
import headerTexture from '../assets/header.png';
import cardTexture from '../assets/card.png';
// import stoneTexture from '../assets/stone.jpg';

const Home: NextPage = () => {
  const ctx = trpc.useContext();
  const { data, refetch } = trpc.getCharacters.useQuery();
  const castVoteMutation = trpc.castVote.useMutation();
  const [results, setResults] = useState<inferProcedureOutput<AppRouter['getResults']> | null>(
    null
  );
  const [canVote, setCanVote] = useState(true);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  async function castVote(selected: 'first' | 'second') {
    if (!data || !data.char1 || !data.char2) return { success: false };

    if (selected === 'first')
      castVoteMutation.mutate(
        { victoriousId: data.char1.id, loserId: data.char2.id },
        {
          onSuccess: async () => {
            if (!data || !data.char1 || !data.char2) return;
            const results = await ctx.getResults.fetch({
              char1Id: data.char1.id,
              char2Id: data.char2.id
            });
            setResults(results);
            setCanVote(false);
          }
        }
      );
    else if (selected === 'second') {
      castVoteMutation.mutate(
        { victoriousId: data.char2.id, loserId: data.char1.id },
        {
          onSuccess: async () => {
            if (!data || !data.char1 || !data.char2) return;
            const results = await ctx.getResults.fetch({
              char1Id: data.char1.id,
              char2Id: data.char2.id
            });
            setResults(results);
            setCanVote(false);
          }
        }
      );
    }
  }

  function handleSkipFight() {
    setResults(null);
    setCanVote(true);
    refetch();
  }
  console.log('Image', headerTexture);

  return (
    <motion.div
      animate={{
        x: ['3px', '-2px', '1px', '0px'],
        y: ['2px', '-3px', '2px', '0px']
      }}
      transition={{ duration: 0.3, stiffness: 500, delay: 0.52 }}
      className="-z-50 flex h-full w-full flex-col">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1525711857929-4272fb4a040f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="bg"
        className="absolute left-0 top-0 -z-10 h-full w-full opacity-50 blur-lg"
      />
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[url('../assets/stone.jpg')] opacity-10 mix-blend-color-dodge" />
      <Head>
        <title>Who Would Win</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="relative flex p-2">
        <span>Logo</span>
        <img
          src={headerTexture.src}
          alt="header"
          className="absolute top-0 left-0 -z-10 h-[8rem] w-full [user-select:none;]"
        />
      </header>
      <div></div>

      <main className="flex h-full flex-col gap-6 p-6 md:gap-10">
        <motion.h1
          initial={{ scale: 3 }}
          animate={{ scale: 1, rotate: -1.2 }}
          transition={{ bounceStiffness: 200, ease: 'backIn', duration: 0.5 }}
          className=" bg-slate-50 bg-clip-text text-center font-blackOpsOne text-4xl text-transparent bg-blend-darken  [background-image:url(../assets/stone.jpg)] sm:text-5xl md:text-6xl">
          Who Would Win in a Fight?
        </motion.h1>
        {/* Contestants Section */}
        <section className="flex items-stretch justify-center gap-2 sm:gap-8">
          {/* Option 1 */}
          <div className="flex  flex-col items-center">
            <button
              onClick={() => canVote && castVote('first')}
              disabled={!canVote}
              className="relative flex aspect-square h-full w-full max-w-[300px] flex-col items-center justify-center gap-4 rounded-md  p-4 transition-transform hover:scale-105 sm:gap-4 md:aspect-square">
              <img
                src={data.char1?.imageSource}
                alt="option-1"
                className="h-[60%] w-[60%] rounded border-4 border-solid border-neutral-400 border-opacity-25"
              />
              <h2 className="md:text-xl">{data.char1?.name}</h2>
              <img
                src={cardTexture.src}
                alt="card"
                className="absolute left-0 top-0 -z-10  w-full"
              />
            </button>
            {/* Percentage */}
            {results && <p>{results.percentages.char1.toFixed(1)}%</p>}
          </div>

          <span className="self-center">vs</span>

          {/* Option 2 */}
          <div className="flex  flex-col items-center">
            <button
              onClick={() => canVote && castVote('second')}
              disabled={!canVote}
              className="relative flex aspect-square h-full w-full max-w-[300px] flex-col items-center justify-center gap-4 rounded-md  p-4 transition-transform hover:scale-105 sm:gap-4 md:aspect-square">
              <img
                src={data.char2?.imageSource}
                alt="option-2"
                className="h-[60%] w-[60%] rounded border-4 border-solid border-neutral-400 border-opacity-25"
              />
              <h2 className="md:text-xl">{data.char2?.name}</h2>
              <img
                src={cardTexture.src}
                alt="card"
                className="absolute left-0 top-0 -z-10 w-full -scale-x-100"
              />
            </button>
            {/* Percentage */}
            {results && <p>{results.percentages.char2.toFixed(1)}%</p>}
          </div>
        </section>

        <section className="flex flex-col items-center gap-4">
          {/* Next Button */}
          <button onClick={handleSkipFight}>Next Fight</button>
          {/* Change Page */}
          <Link href="/Ranking">Ranking</Link>
          <Link href="/Add">Add New Fighter</Link>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-2 px-4 py-8">
        {/* Textos */}
        <p>
          Created by <a href="https://github.com/WixeI">Paulo Portela Martins</a>
        </p>
      </footer>
    </motion.div>
  );
};

export default Home;

{
  /*         <form onSubmit={onSubmitCreateCharacter}>
          <input name="text" type="text" className="text-black" />
          <button type="submit" className="rounded-md bg-emerald-400 p-2">
            Adicionar
          </button>
        </form> */
}
