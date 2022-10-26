import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { trpc } from '../utils/trpc';

enum Tabs {
  top20 = 0,
  bottom20 = 1
}

const Ranking: NextPage = () => {
  //Ranking Management
  const top20 = trpc.getTop20.useQuery();
  const bottom20 = trpc.getBottom20.useQuery();

  //Tab Management
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.top20);
  const Tab = [
    <div key="top20">
      {top20.data?.map((item) => (
        <div
          key={item.id}
          className="flex w-full justify-between rounded-sm border border-solid border-neutral-100 p-2">
          <span>{item.name}</span>
          <span>X Victories</span>
        </div>
      ))}
    </div>,
    <div key="bottom20">
      {bottom20.data?.map((item) => (
        <div
          key={item.id}
          className="flex w-full justify-between rounded-sm border border-solid border-neutral-100 p-2">
          <span>{item.name}</span>
          <span>X Losses</span>
        </div>
      ))}
    </div>
  ];

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-between gap-12 overflow-x-hidden p-6">
        <h1 className="text-center font-blackOpsOne text-4xl sm:text-5xl md:text-6xl">Ranking</h1>

        <main className="flex h-full w-full flex-col items-center gap-6">
          {/* Tab Bar */}
          <div className="flex w-full justify-center rounded-sm border border-solid border-neutral-100 md:w-[60%] xl:w-[40%] ">
            {/* Option 1 */}
            <button
              onClick={() => setActiveTab(Tabs.top20)}
              className={`w-full px-4 py-2 text-center ${
                activeTab === Tabs.top20 && 'bg-neutral-100 text-neutral-900'
              }`}>
              Top 20
            </button>
            {/* Option 2 */}
            <button
              onClick={() => setActiveTab(Tabs.bottom20)}
              className={`w-full px-4 py-2 text-center ${
                activeTab === Tabs.bottom20 && 'bg-neutral-100 text-neutral-900'
              }`}>
              Bottom 20
            </button>
          </div>
          {/* Tabs */}
          {Tab[activeTab]}
        </main>

        <footer>
          <Link href="/">Home</Link>
        </footer>
      </div>
    </>
  );
};

export default Ranking;
