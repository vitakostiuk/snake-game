import React, { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Citrus from "./images/citrus_icon.png";
import Pineapple from "./images/pineapple_icon.png";
import Watermelon from "./images/watermelon_icon.png";
import GameField from "./images/field.png";
import useInterval from "./helpers/useInterval";

const canvasX = 800;
const canvasY = 800;
const initialSnake = [
  [4, 10],
  [4, 10],
];
const initialFood = [14, 10];
const scale = 32;
const timeDelay = 100;

function App() {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [foodId, setFoodId] = useState("watermelon");
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useInterval(() => runGame(), delay);

  useEffect(() => {
    let fruit = document.getElementById(foodId);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#a3d001";
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, food[0], food[1], 1, 1);
      }
    }
  }, [snake, food, gameOver, foodId]);

  function handleSetScore() {
    if (score > Number(localStorage.getItem("snakeScore"))) {
      localStorage.setItem("snakeScore", JSON.stringify(score));
    }
  }

  function play() {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head) {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    }
    for (const s of snake) {
      // console.log("head", head);
      // console.log("s", s);
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function appleAte(newSnake) {
    const coord = food.map(() => Math.floor((Math.random() * canvasX) / scale));
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newApple = coord;

      switch (foodId) {
        case "citrus":
          setScore(score + 1);
          break;

        case "pineapple":
          setScore(score + 5);
          break;

        case "watermelon":
          setScore(score + 10);
          break;

        default:
          break;
      }
      setFood(newApple);
      return true;
    }
    return false;
  }

  function runGame() {
    const newSnake = [...snake];
    // console.log("newSnake", newSnake);

    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    // console.log("newSnakeHead", newSnakeHead);

    newSnake.unshift(newSnakeHead);

    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      handleSetScore();
    }
    if (!appleAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  function changeDirection(e) {
    // eslint-disable-next-line default-case
    switch (e.key) {
      case "ArrowLeft":
        setDirection([-1, 0]);
        break;
      case "ArrowUp":
        setDirection([0, -1]);
        break;
      case "ArrowRight":
        setDirection([1, 0]);
        break;
      case "ArrowDown":
        setDirection([0, 1]);
        break;
    }
  }

  return (
    <div onKeyDown={changeDirection}>
      <img
        id="citrus"
        src={Citrus}
        alt="citrus"
        width="32"
        onClick={() => setFoodId("citrus")}
      />
      <img
        id="pineapple"
        src={Pineapple}
        alt="pineapple"
        width="32"
        onClick={() => setFoodId("pineapple")}
      />
      <img
        id="watermelon"
        src={Watermelon}
        alt="watermelon"
        width="32"
        onClick={() => setFoodId("watermelon")}
      />

      <img
        src={GameField}
        alt="Game Field"
        className={styles.field}
        width="800"
        height="800"
      />
      <canvas
        className={styles.playArea}
        ref={canvasRef}
        width={`${canvasX}px`}
        height={`${canvasY}px`}
      />
      {gameOver && <div className={styles.gameOver}>Game Over</div>}
      <button onClick={play} className={styles.playButton}>
        Play
      </button>
      <div className={styles.scoreBox}>
        <h2>Score: {score}</h2>
        <h2>High Score: {localStorage.getItem("snakeScore")}</h2>
      </div>
    </div>
  );
}

export default App;
