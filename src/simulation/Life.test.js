// @flow
import { Life } from "./Life";
import type { LifeState } from "./Life";

const getAliveCellsCount = (state: LifeState) => {
  return state.flat().filter(Life.isAlive).length;
};

it("getAliveCellsCount returns correct result", () => {
  const { state } = new Life([[0, 1, 1, 1]]);
  expect(getAliveCellsCount(state)).toBe(3);
});

describe("Any live cell with fewer than two live neighbours dies (underpopulation).", () => {
  it("no neighbors", () => {
    let life = new Life([[0, 1, 0]]);
    life.tick();
    expect(getAliveCellsCount(life.state)).toBe(0);
    life = new Life([[1, 0, 1, 0]]);
    life.tick();
    expect(getAliveCellsCount(life.state)).toBe(0);
  });

  it("1 neighbor", () => {
    let life = new Life([[1, 1, 0]]);
    life.tick();
    expect(getAliveCellsCount(life.state)).toBe(0);
    life = new Life([[0, 0, 1, 1]]);
    life.tick();
    expect(getAliveCellsCount(life.state)).toBe(0);
  });
});

describe("Any live cell with two or three live neighbours lives on to the next generation", () => {
  it("2 neighbors", () => {
    let life = new Life([[1, 1, 0], [1]]);
    life.tick();
    expect(getAliveCellsCount(life.state)).toBe(3);
  });
  it("3 neighbors", () => {
    let life = new Life([
      [1, 1, 0],
      [1, 1, 0],
    ]);
    life.tick();
    expect(getAliveCellsCount(life.state)).toBe(4);
  });
});

describe("Any live cell with more than three live neighbours dies (overcrowding).", () => {
  it("4 neighbors", () => {
    let life = new Life([
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ]);
    life.tick();
    // center element should be dead
    expect(life.state[1][1]).toBe(0);
  });
});

describe("Any dead cell with exactly three live neighbours becomes a live cell (reproduction).", () => {
  it("3 neighbors", () => {
    let life = new Life([
      [1, 1],
      [0, 1],
    ]);
    life.tick();
    expect(getAliveCellsCount(life.state)).toBe(4);
  });
});
