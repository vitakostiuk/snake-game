import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import styles from "./LeaderBoard.module.css";

const LeaderBoard = () => {
  const [allUsersScores, setAllUsersScores] = useState([]);
  useEffect(() => {
    const getAllUsersScores = async () => {
      const { data } = await axios.get(
        "https://snake-game-backend.onrender.com/api/scores/all"
      );
      setAllUsersScores(
        data
          .map(({ name, score }) => ({ name, score }))
          .sort(
            (firstGamer, SecondGamer) => SecondGamer.score - firstGamer.score
          )
      );
      console.log("data", data);
    };
    getAllUsersScores();
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leader Board</h1>
      <div className={styles.textContainer}>
        <p className={styles.titleText}>Name</p>
        <p className={styles.titleText}>Score</p>
      </div>
      <ul className={styles.list}>
        {allUsersScores &&
          allUsersScores.map(({ name, score }) => (
            <li key={nanoid()} className={styles.textContainer}>
              <p className={styles.itemName}>{name}:</p>
              <p className={styles.itemScore}>{score}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
