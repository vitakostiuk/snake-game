import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllScores, addScore } from "../../redux/score/scoreOperations";
import { scoreSelectors } from "../../redux/score";
import Citrus from "../../images/citrus_icon.png";
import Pineapple from "../../images/pineapple_icon.png";
import Watermelon from "../../images/watermelon_icon.png";
import GameField from "../../images/field.png";
import useInterval from "../../helpers/useInterval";
import styles from "./SnakeGame.module.css";

const canvasX = 800;
const canvasY = 800;
const initialSnake = [
  [4, 10],
  [4, 10],
];
const initialFood = [14, 10];
const scale = 32;
const timeDelay = 300;

const SnakeGame = () => {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [foodId, setFoodId] = useState("watermelon");
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState(null);
  const [savedDelay, setSavedDelay] = useState(timeDelay);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const dispatch = useDispatch();

  useInterval(() => runGame(), delay);

  useEffect(() => {
    dispatch(getAllScores());
  }, [dispatch]);

  const scoreFromRedux = useSelector(scoreSelectors.getScore).map(
    (item) => item.score
  );

  useEffect(() => {
    for (let i = 0; i < scoreFromRedux.length; i++) {
      let max = scoreFromRedux[i];
      if (scoreFromRedux.length === 1) {
        setHighScore(max);
      }
      if (max < scoreFromRedux[i + 1]) {
        max = scoreFromRedux[i + 1];
        setHighScore(max);
      }
    }
  }, [scoreFromRedux]);

  useEffect(() => {
    let fruit = document.getElementById(foodId);

    if (canvasRef.current) {
      const canvas = canvasRef.current; // {current: canvas.App_playArea__UkgHU}
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0); // CanvasRenderingContext2D.setTransform()
        // This lets you scale, rotate, translate (move), and skew the context.
        // setTransform(a, b, c, d, e, f)
        // a (m11) !!! - Horizontal scaling. A value of 1 results in no scaling.
        // b (m12) - Vertical skewing.
        // c (m21) - Horizontal skewing.
        // d (m22) !!! - Vertical scaling. A value of 1 results in no scaling.
        // e (dx) - Horizontal translation (moving).
        // f (dy) - Vertical translation (moving).

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // CanvasRenderingContext2D.clearRect()
        // Видаляємо попередню ячєйку, стираємо пікселі, встановлюючи для нихпрозорий колір

        ctx.fillStyle = "#a3d001"; // задаємо колір

        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1)); // CanvasRenderingContext2D.fillRect()
        // Рисует прямоугольник, который заполняется в соответствии с текущим стилем fillStyle.
        // 1, 1 - це масштаб

        // малюємо їжу
        ctx.drawImage(fruit, food[0], food[1], 1, 1); // 1, 1 - це масштаб
      }
    }
  }, [snake, food, gameOver, foodId]);

  // HANDLE DELAY
  function handleSetDelay() {
    if (score % 50 === 0) {
      setDelay((prevDelay) => prevDelay - 50);
      setSavedDelay(delay);
      console.log("delay", delay);
      console.log("savedDelay", savedDelay);
    }
  }

  // HANDLE SCORE
  function handleSetScore() {
    dispatch(addScore({ score: Number(score) }));
  }

  // PLAY GAME (after click button)
  function play() {
    // setDelay(timeDelay);
    setDelay(savedDelay);
    console.log("savedDelay", savedDelay);

    setGameOver(false);

    switch (localStorage.getItem("direction")) {
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
      default:
        break;
    }
  }

  // PAUSE GAME (after click button)
  function pause() {
    setDelay(null);
  }

  // HANDLE COLLISION or when SNAKE ATE HERSELF
  function checkCollision(head) {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  // HANDLE of EATING FOOD
  function foodAte(newSnake) {
    const coord = food.map(() => Math.floor((Math.random() * canvasX) / scale));
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newApple = coord;

      switch (foodId) {
        case "citrus":
          setScore(score + 1);
          if (score % 50 === 0) {
            handleSetDelay();
          }
          break;

        case "pineapple":
          setScore(score + 5);
          handleSetDelay();
          break;

        case "watermelon":
          setScore(score + 10);
          handleSetDelay();
          break;

        default:
          break;
      }
      setFood(newApple);
      return true;
    }
    return false;
  }

  // RUN GAME
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
    if (!foodAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  // HANDLE CHANGE DIRECTION
  function changeDirection(e) {
    // eslint-disable-next-line default-case
    switch (e.key) {
      case "ArrowLeft":
        setDirection([-1, 0]);
        localStorage.setItem("direction", "ArrowLeft");
        break;
      case "ArrowUp":
        setDirection([0, -1]);
        localStorage.setItem("direction", "ArrowUp");
        break;
      case "ArrowRight":
        setDirection([1, 0]);
        localStorage.setItem("direction", "ArrowRight");
        break;
      case "ArrowDown":
        setDirection([0, 1]);
        localStorage.setItem("direction", "ArrowDown");
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
      <button onClick={pause} className={styles.pauseButton}>
        Pause
      </button>
      <div className={styles.scoreBox}>
        <h2>Score: {score}</h2>
        <h2>High Score: {`${score > highScore ? score : highScore}`}</h2>
      </div>
    </div>
  );
};

export default SnakeGame;
