import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { Car } from "./Car";

export function useCustomState(
  initialData: Car[],
  gridRowData: Car[],
  setRowData: React.Dispatch<React.SetStateAction<Car[]>>
) {
  const [hasAnyChange, setHasAnyChange] = useState<boolean>(false);

  useEffect(() => {
    if (gridRowData!.length > 0) {
      setHasAnyChange(isEqual(initialData, gridRowData));
    }
  }, [gridRowData, initialData]);

  function setInitialData(initData: Car[]) {
    setRowData(initData);
  }

  function updateRow(car: Car) {
    setRowData((gridData) =>
      gridData!.map((r) => {
        if (r.id === car.id) {
          return car;
        } else {
          return r;
        }
      })
    );
  }

  function resetRowData(id: string) {
    console.log(id);
    debugger;
    setRowData((gridData) =>
      gridData!.map((r) => {
        if (r.id === id) {
          return initialData!.find((t) => t.id === id)!;
        } else {
          return r;
        }
      })
    );
  }

  function resetData() {
    setRowData(initialData)
  }

  return {
    setInitialData,
    hasAnyChange,
    updateRow,
    resetData,
    resetRowData,
  };
}
