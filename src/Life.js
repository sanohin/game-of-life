// @flow

export type CellState = 0 | 1;

export type Row = Array<CellState>;

export type LifeState = Array<Row>;

export class Life {
  state: LifeState;

  constructor(initialState: LifeState) {
    this.state = initialState;
  }

  tick() {
    return this.state;
  }
}
