// @flow
import React from "react";
import { Board } from "./Board";
import { Life } from "../simulation/Life";
import { initialData } from "../simulation/initialData";
import { CellContextProvider } from "./CellContext";
import classes from "./App.module.css";

function App() {
  const [life, setLife] = React.useState(() => new Life(initialData));
  const [lifeState, setState] = React.useState(life.state);

  const tick = () => {
    const next = life.tick();
    setState(next);
  };

  return (
    <div className={classes.app}>
      <CellContextProvider life={life} setLife={setLife}>
        <h2>Conway's Game of Life</h2>
        <button type="button" onClick={tick}>
          Tick
        </button>
        <Board state={lifeState} />
      </CellContextProvider>
    </div>
  );
}

export default App;
