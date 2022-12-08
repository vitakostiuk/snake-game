import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllScores, addScore } from "../../redux/score/scoreOperations";
import { scoreSelectors } from "../../redux/score";
import Citrus from "../../images/citrus_icon.png";
import Pineapple from "../../images/pineapple_icon.png";
import Watermelon from "../../images/watermelon_icon.png";
import GameField from "../../images/field.png";
import useInterval from "../../helpers/useInterval";
import Score from "../Score";
import styles from "./SnakeGame.module.css";
import LeaderBoard from "../LeaderBoard";

const canvasX = 600;
const canvasY = 600;
const initialSnake = [
  [4, 10],
  [4, 10],
];
const initialFood = [14, 10];
const scale = 24;
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

  const dispatch = useDispatch();

  useInterval(() => runGame(), delay);

  // GET USER SCORES
  useEffect(() => {
    dispatch(getAllScores());
  }, [dispatch]);

  const scoreFromRedux = useSelector(scoreSelectors.getScore).map(
    (item) => item.score
  );

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

  // GAME OWER CONFIRM (after click OK)
  function gameOwerConfirm() {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection([1, 0]);
    setScore(0);
    setGameOver(false);
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

    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];

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

      default:
        break;
    }
  }

  return (
    <div onKeyDown={changeDirection}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img
            id="citrus"
            src={Citrus}
            alt="citrus"
            className={styles.food}
            onClick={() => setFoodId("citrus")}
          />
          <img
            id="pineapple"
            src={Pineapple}
            alt="pineapple"
            className={styles.food}
            onClick={() => setFoodId("pineapple")}
          />
          <img
            id="watermelon"
            src={Watermelon}
            alt="watermelon"
            className={styles.food}
            onClick={() => setFoodId("watermelon")}
          />
        </div>

        <div className={styles.btnContainer}>
          <button onClick={play} className={styles.playButton}>
            Play
          </button>
          <button onClick={pause} className={styles.pauseButton}>
            Pause
          </button>
        </div>
      </div>

      <img
        src={GameField}
        alt="Game Field"
        className={styles.field}
        width="600"
        height="600"
      />
      <canvas
        className={styles.playArea}
        ref={canvasRef}
        width={`${canvasX}px`}
        height={`${canvasY}px`}
      />
      {gameOver && (
        <div className={styles.gameOver}>
          Game Over
          <button
            type="button"
            className={styles.gameOverButton}
            onClick={gameOwerConfirm}
          >
            OK
          </button>
        </div>
      )}

      <div className={styles.scoreContainer}>
        <Score score={score} scoreFromRedux={scoreFromRedux} />
        <LeaderBoard />
      </div>
    </div>
  );
};

export default SnakeGame;
