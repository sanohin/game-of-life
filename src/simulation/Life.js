// @flow

export type CellState = 0 | 1;

export type Row = Array<CellState>;

export type LifeState = Array<Row>;

export class Life {
  state: LifeState;

  constructor(initialState: LifeState) {
    this.state = initialState;
  }

  static isAlive = (cell: CellState): boolean => {
    return cell === 1;
  };

  tick = () => {
    return this.state;
  };
}
