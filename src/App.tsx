import Game from "./components/Game/Game";
import "./index.css";

function App(): JSX.Element {
  return (
    <div className="app">
      <h1>Rock, Paper, Scissors</h1>
      <Game />
    </div>
  );
}

export default App;
