// @flow
import * as React from "react";
import { Life } from "../simulation/Life";
import { useLatestValue } from "../utils/useLatestValue";
import { useContext } from "react";

export const CellContext = React.createContext<{
  toggleCell: ({ rowIndex: number, columnIndex: number }) => void,
} | null>(null);

if (process.env.NODE_ENV === "test") {
  // TODO: replace with rewiring. couldn't make flow happy with $FlowFixMe here, so eval
  eval("module.exports.CellContext = CellContext");
}

export const CellContextProvider = ({
  life,
  setLife,
  children,
}: {
  life: Life,
  setLife: (l: Life) => void,
  children: React.Node,
}) => {
  const lifeRef = useLatestValue(life);
  const setLifeRef = useLatestValue(setLife);
  const providerValue = React.useMemo(() => {
    return {
      toggleCell: ({ rowIndex, columnIndex }) => {
        const currentState = lifeRef.current.state;
        const cellValue = currentState[rowIndex][columnIndex];
        currentState[rowIndex][columnIndex] = cellValue === 0 ? 1 : 0;
        setLifeRef.current(new Life(currentState));
      },
    };
  }, []);
  return (
    <CellContext.Provider value={providerValue}>
      {children}
    </CellContext.Provider>
  );
};

export const useToggleCell = () => {
  const context = useContext(CellContext);
  if (!context) {
    throw new Error("CellContext is empty");
  }
  return context.toggleCell;
};
