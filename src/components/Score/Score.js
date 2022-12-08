import React from "react";
import styles from "./Score.module.css";

const Score = ({ score, scoreFromRedux }) => {
  return (
    <div>
      {" "}
      <h1 className={styles.title}>My Score</h1>
      <div className={styles.container}>
        <p className={styles.scoreText}>
          Score: <span className={styles.score}>{score}</span>
        </p>
        <p className={styles.scoreText}>
          High Score:{" "}
          <span className={styles.score}>
            {" "}
            {`${
              score > Math.max(...scoreFromRedux)
                ? score
                : Math.max(...scoreFromRedux)
            }`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Score;
