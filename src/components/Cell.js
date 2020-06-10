// @flow
import React from "react";
import classNames from "clsx";
import { Life } from "../simulation/Life";
import type { CellState } from "../simulation/Life";
import classes from "./Cell.module.css";
import { useToggleCell } from "./CellContext";

export const Cell = ({
  value,
  rowIndex,
  columnIndex,
}: {
  value: CellState,
  rowIndex: number,
  columnIndex: number,
}) => {
  const toggle = useToggleCell();
  const handleClick = () => toggle({ rowIndex, columnIndex });
  const isAlive = Life.isAlive(value);
  return (
    <button
      type="button"
      data-cell-alive={String(isAlive)}
      onClick={handleClick}
      className={classNames(classes.cell, {
        [classes.cellAlive]: isAlive,
      })}
    />
  );
};
