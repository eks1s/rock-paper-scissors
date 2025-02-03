import Game from "./components/Game/Game";
import "./index.css";

import Icon from "./assets/icon.png";

function App(): JSX.Element {
  return (
    <div className="app">
      <img className="icon" src={Icon} alt="icon" />
      <h1>Rock, Paper, Scissors</h1>
      <Game />
    </div>
  );
}

export default App;
