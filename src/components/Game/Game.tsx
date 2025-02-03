import { useState } from "react";
import "../../index.css";
import Rock from "../../assets/rock.png";
import Paper from "../../assets/paper.png";
import Scissors from "../../assets/scissors.png";

type Choice = "rock" | "paper" | "scissors";

// Создаем объект для хранения связей между выбором и его изображением
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

  const handleChoice = (choice: Choice): void => {
    setUserChoice(choice);
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(compChoice);
    const winner = determineWinner(choice, compChoice);
    setResult(winner);
  };

  const resetGame = (): void => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  return (
    <div className="game-container">
      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className={`choice ${choice}`}
          >
            {/* Используем импортированные изображения */}
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
          <h2>{result}</h2>
          <button onClick={resetGame} className="reset-button">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
