// @flow
import React from "react";
import type { Row as RowType } from "../simulation/Life";
import { Cell } from "./Cell";
import classes from "./Row.module.css";

export const Row = ({ row, rowIndex }: { row: RowType, rowIndex: number }) => {
  return (
    <div className={classes.row}>
      {row.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          rowIndex={rowIndex}
          columnIndex={index}
        />
      ))}
    </div>
  );
};
