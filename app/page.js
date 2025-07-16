"use client";

import Head from "next/head";
import React, { useState } from "react";
import Calculator from "./components/Calculator";
import History from "./components/History";
import Showcase from "./components/Showcase";

export default function Home() {
  const [history, setHistory] = useState([]);

  const [showCalculator, setShowCalculator] = useState(false);

  const handleAddToHistory = (calculation) => {
    setHistory((prevHistory) => [calculation, ...prevHistory]);
  };

  const handleDeleteItem = (indexToDelete) => {
    setHistory((prevHistory) =>
      prevHistory.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleLaunchCalculator = () => {
    setShowCalculator(true);
  };

  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] bg-gradient-to-br from-gray-100 to-gray-200 font-inter">
      <Head>
        <title>Smart Mini Calculator</title>
        <meta
          name="description"
          content="A simple calculator built with Next.js and Tailwind CSS with history and showcase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <aside
        className="
        bg-[#ed486e] text-white p-6 flex flex-col
        shadow-lg md:shadow-2xl
        h-full
        overflow-y-auto custom-scrollbar
      "
      >
        <History
          history={history}
          onClearHistory={handleClearHistory}
          onDeleteItem={handleDeleteItem}
          showCalculator={showCalculator}
        />
      </aside>

      <main className="flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {showCalculator ? (
          <Calculator onAddToHistory={handleAddToHistory} />
        ) : (
          <Showcase
            presenterName="Vineeth Emmanuel Pilli"
            projectTitle="Smart Mini Calculator"
            onLaunchCalculator={handleLaunchCalculator}
          />
        )}
      </main>
    </div>
  );
}
