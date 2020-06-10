// @flow
import React from "react";
import type { LifeState } from "../simulation/Life";
import { Row } from "./Row";

export const Board = ({ state }: { state: LifeState }) => {
  return (
    <div>
      {state.map((row, index) => {
        return <Row key={index} row={row} rowIndex={index} />;
      })}
    </div>
  );
};
