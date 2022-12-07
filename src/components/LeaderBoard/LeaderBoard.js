import React from "react";
import styles from "./LeaderBoard.module.css";

const LeaderBoard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leader Board</h1>
      <div className={styles.textContainer}>
        <p className={styles.nameText}>Ajhjsdhajsh: &nbsp;&nbsp;</p>
        <p className={styles.scoreText}>0</p>
      </div>
    </div>
  );
};

export default LeaderBoard;
