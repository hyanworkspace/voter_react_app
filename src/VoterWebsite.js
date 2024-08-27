import React, { useState, useEffect } from "react";
import { Play, SkipForward, Eye, RefreshCw } from "lucide-react";

const VoterWebsite = () => {
  const [buttonStats, setButtonStats] = useState({
    likeMusic: { clicks: 0, lastClickTime: null, holdDuration: 0 },
    nextSong: { clicks: 0, lastClickTime: null, holdDuration: 0 },
    amazingVisual: { clicks: 0, lastClickTime: null, holdDuration: 0 },
    switchVisual: { clicks: 0, lastClickTime: null, holdDuration: 0 },
  });

  const handleButtonPress = (button) => {
    const pressTime = new Date().getTime();
    setButtonStats((prev) => ({
      ...prev,
      [button]: { ...prev[button], lastClickTime: pressTime },
    }));
  };

  const handleButtonRelease = (button) => {
    const releaseTime = new Date().getTime();
    setButtonStats((prev) => {
      const pressTime = prev[button].lastClickTime;
      const holdDuration = pressTime ? releaseTime - pressTime : 0;
      const newStats = {
        ...prev,
        [button]: {
          clicks: prev[button].clicks + 1,
          lastClickTime: null,
          holdDuration: prev[button].holdDuration + holdDuration,
        },
      };
      sendButtonStatsToBackend(newStats);
      return newStats;
    });
  };
  const sendButtonStatsToBackend = (stats) => {
    fetch("http://localhost:5000/api/buttonStats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stats),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    console.log("Button Stats:", buttonStats);
  }, [buttonStats]);

  return (
    <div className="min-h-screen bg-[#F0EAE2] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-[#9C8E7E]">Voter</h1>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="bg-[#D0C4B5] text-[#6D5E4E] px-6 py-3 rounded-lg flex items-center justify-center transition-colors hover:bg-[#C0B4A5]"
          onMouseDown={() => handleButtonPress("likeMusic")}
          onMouseUp={() => handleButtonRelease("likeMusic")}
          onTouchStart={() => handleButtonPress("likeMusic")}
          onTouchEnd={() => handleButtonRelease("likeMusic")}
        >
          <Play className="mr-2" size={20} />
          Like Music
        </button>
        <button
          className="bg-[#E0D4C5] text-[#6D5E4E] px-6 py-3 rounded-lg flex items-center justify-center transition-colors hover:bg-[#D0C4B5]"
          onMouseDown={() => handleButtonPress("nextSong")}
          onMouseUp={() => handleButtonRelease("nextSong")}
          onTouchStart={() => handleButtonPress("nextSong")}
          onTouchEnd={() => handleButtonRelease("nextSong")}
        >
          <SkipForward className="mr-2" size={20} />
          Next Song
        </button>
        <button
          className="bg-[#C0B4A5] text-[#6D5E4E] px-6 py-3 rounded-lg flex items-center justify-center transition-colors hover:bg-[#B0A495]"
          onMouseDown={() => handleButtonPress("amazingVisual")}
          onMouseUp={() => handleButtonRelease("amazingVisual")}
          onTouchStart={() => handleButtonPress("amazingVisual")}
          onTouchEnd={() => handleButtonRelease("amazingVisual")}
        >
          <Eye className="mr-2" size={20} />
          Amazing Visual
        </button>
        <button
          className="bg-[#B0A495] text-[#6D5E4E] px-6 py-3 rounded-lg flex items-center justify-center transition-colors hover:bg-[#A09485]"
          onMouseDown={() => handleButtonPress("switchVisual")}
          onMouseUp={() => handleButtonRelease("switchVisual")}
          onTouchStart={() => handleButtonPress("switchVisual")}
          onTouchEnd={() => handleButtonRelease("switchVisual")}
        >
          <RefreshCw className="mr-2" size={20} />
          Switch Visual
        </button>
      </div>
    </div>
  );
};

export default VoterWebsite;
