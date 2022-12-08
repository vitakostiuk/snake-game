import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { filterArray } from "../../helpers/filterArray";
import styles from "./LeaderBoard.module.css";

const LeaderBoard = () => {
  const [allUsersScores, setAllUsersScores] = useState([]);

  useEffect(() => {
    const getAllUsersScores = async () => {
      const { data } = await axios.get(
        "https://snake-game-backend.onrender.com/api/scores/all"
      );

      const scoreArray = data.map(({ name, score }) => ({ name, score }));
      setAllUsersScores(filterArray(scoreArray));
    };
    getAllUsersScores();
  }, []);

  return (
    <div>
      {" "}
      <h1 className={styles.title}>Leader Board</h1>
      <div className={styles.container}>
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
    </div>
  );
};

export default LeaderBoard;
