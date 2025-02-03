import { useState } from "react";
import Confetti from "react-confetti";
import "../../index.css";
import Rock from "../../assets/rock.png";
import Paper from "../../assets/paper.png";
import Scissors from "../../assets/scissors.png";

type Choice = "rock" | "paper" | "scissors";

const choiceImages: Record<Choice, string> = {
  rock: Rock,
  paper: Paper,
  scissors: Scissors,
};

const choices: Choice[] = ["rock", "paper", "scissors"];

function determineWinner(userChoice: Choice, computerChoice: Choice): string {
  if (userChoice === computerChoice) {
    return "Draw!";
  }
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    return "You won!";
  }
  return "You lost!";
}

function Game(): JSX.Element {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const handleChoice = (choice: Choice): void => {
    setUserChoice(choice);
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(compChoice);
    const winner = determineWinner(choice, compChoice);

    if (winner === "You won!") {
      setShowConfetti(true);
    }

    setResult(winner);
  };

  const resetGame = (): void => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setShowConfetti(false); // Скрываем конфетти при сбросе игры
  };

  return (
    <div className="game-container">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {!result && <h2>Your choice!</h2>}
      <h2>{result}</h2>
      {result && (
        <button onClick={resetGame} className="reset-button">
          Play again
        </button>
      )}
      <div className="choices">
        {!result &&
          choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              className={`choice ${choice}`}
            >
              <img src={choiceImages[choice]} alt={choice} />
            </button>
          ))}
      </div>
      {userChoice && computerChoice && (
        <div className="results">
          <div className="player-choice">
            <h3>You:</h3>
            <img
              src={choiceImages[userChoice]}
              alt={userChoice}
              className={result.includes("won") ? "victory" : "defeat"}
            />
          </div>
          <div className="computer-choice">
            <h3>Computer:</h3>
            <img
              src={choiceImages[computerChoice]}
              alt={computerChoice}
              className={result.includes("lost") ? "victory" : "defeat"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
