import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Cell } from "./Cell";
import { CellContextProvider } from "./CellContext";
import { noop } from "../utils/noop";
const { CellContext } = require("./CellContext");

describe("<Cell />", () => {
  it("should render active cell button", () => {
    const { container, debug } = render(
      <CellContextProvider value={{ toggleCell: jest.fn }}>
        <Cell value={1} rowIndex={1} columnIndex={1} />
      </CellContextProvider>
    );
    expect(container.querySelector('[data-cell-alive="true"]')).toBeTruthy();
  });
  it("should render dead cell button", () => {
    const { container } = render(
      <CellContextProvider value={{ toggleCell: noop }}>
        <Cell value={0} rowIndex={1} columnIndex={1} />
      </CellContextProvider>
    );
    expect(container.querySelector('[data-cell-alive="false"]')).toBeTruthy();
  });
  it("should call toggleCell on click", () => {
    const toggleCell = jest.fn();
    const { container } = render(
      <CellContext.Provider value={{ toggleCell }}>
        <Cell value={0} rowIndex={0} columnIndex={0} />
      </CellContext.Provider>
    );
    const button = container.querySelector('[data-cell-alive="false"]');
    fireEvent.click(button);
    expect(toggleCell).toBeCalledTimes(1);
    expect(toggleCell).toBeCalledWith(
      expect.objectContaining({ columnIndex: 0, rowIndex: 0 })
    );
  });
});
