import React from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const PlayerShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentEpisode,
    isPlaying,
    progress,
    duration,
    togglePlay,
    stopEpisode,
  } = useAudioPlayer();

  return (
    <>
      {children}
      {currentEpisode && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            background: "#242323",
            padding: "10px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>
            {currentEpisode.title}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span>{formatTime(progress)}</span>
            <div
              style={{
                flex: 1,
                height: "5px",
                background: "#555",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: duration ? `${(progress / duration) * 100}%` : "0%",
                  height: "100%",
                  background: "#4caf50",
                }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
            <button onClick={togglePlay} style={{ fontSize: "20px" }}>
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button onClick={stopEpisode} style={{ fontSize: "20px" }}>
              ⏹️
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerShell;
