// @flow

export type CellState = 0 | 1;

export type Row = Array<CellState>;

export type LifeState = Array<Row>;

type Position = {
  row: number,
  column: number,
};

export class Life {
  state: LifeState;

  constructor(initialState: LifeState) {
    this.state = initialState;
  }

  static isAlive = (cell: CellState): boolean => {
    return cell === 1;
  };

  tick = () => {
    const nextState: LifeState = this.state.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        const alive = Life.isAlive(cell);
        const aliveNeighbors = this._getAliveNeighborsCount({
          column: columnIndex,
          row: rowIndex,
        });
        return this._getNextCellState(alive, aliveNeighbors);
      });
    });
    this.state = nextState;
    return this.state;
  };

  _isPositionValid = (position: Position) => {
    const { column, row } = position;
    return (
      Array.isArray(this.state[row]) &&
      typeof this.state[row][column] === "number"
    );
  };

  _getAliveNeighborsCount = (position: Position) => {
    const { column, row } = position;
    const positionsToCheck = [
      // top
      { column: column - 1, row: row },
      // top right
      { column: column - 1, row: row + 1 },
      // right
      { column: column, row: row + 1 },
      // bottom right
      { column: column + 1, row: row + 1 },
      // bottom
      { column: column + 1, row: row },
      // bottom left
      { column: column + 1, row: row - 1 },
      // left
      { column: column, row: row - 1 },
      // top left
      { column: column - 1, row: row - 1 },
    ];
    return positionsToCheck
      .filter(this._isPositionValid)
      .map(({ column, row }) => {
        return this.state[row][column];
      })
      .filter(Life.isAlive).length;
  };

  _getNextCellState = (isAlive: boolean, aliveNeighbors: number): CellState => {
    if (isAlive && [2, 3].includes(aliveNeighbors)) {
      return 1;
    } else if (!isAlive && aliveNeighbors === 3) {
      return 1;
    }
    return 0;
  };
}
