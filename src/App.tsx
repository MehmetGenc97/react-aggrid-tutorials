import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useCustomState } from "./useCustomState";
import { Car } from "./Car";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import CarValueRenderer from "./CarValueRenderer";

const cars: Car[] = [
  { id: "bb", make: "Ford", model: "Mondeo", price: 32000 },
  { id: "cc", make: "Porsche", model: "Boxster", price: 72000 },
  { id: "dd", make: "BMW", model: "5 Series", price: 59000 },
  { id: "ee", make: "Dodge", model: "Challanger", price: 35000 },
  { id: "ff", make: "Mazda", model: "MX5", price: 28000 },
  { id: "gg", make: "Horse", model: "Outside", price: 99000 },
  { id: "aa", make: "Toyota", model: "Celica", price: 35000 },
];

const App = () => {
  const gridRef = useRef<any>();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [columnDefs, ] = useState<ColDef[]>([
    { field: "make" },
    { field: "model" },
    { field: "price", filter: "agNumberColumnFilter",  cellRenderer: (props: ICellRendererParams) =>CarValueRenderer(props, resetRowData)},
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  const [initData, setInitData] = useState<Car[]>(cars);
  const [rowData, setRowData] = useState<Car[]>([]);
  const {setInitialData, hasAnyChange, updateRow, resetData, resetRowData} = useCustomState(initData, rowData, setRowData);

  const getRowId = useMemo(() => {
    return (params: any) => {
      return params.data.id;
    };
  }, []);

  const loadData = useCallback(() => {
    setInitialData(initData);
  }, []);

  const resetGrid = useCallback(() => {
    resetData()
  }, []);

  const setPriceOnToyota = useCallback(() => {
    var rowNode = gridRef.current.api.getRowNode("aa");
    var toyota: Car = rowNode.data as Car;
    var ford: Car = {
      id: toyota.id,
      make: toyota.make,
      model: toyota.model,
      price: toyota.price + parseInt("100"),
    };
    updateRow(ford);
  }, []);

  const setDataOnFord = useCallback(() => {
    var ford: Car = {
      id: "bb",
      make: "Ford",
      model: "T-" + Math.floor(Math.random() * 1000),
      price: Math.floor(Math.random() * 100000),
    };
    updateCar(ford);
  }, []);

  function updateCar(car: Car) {
    var newData: Car = {
      id: car.id,
      make: car.make,
      model: car.model,
      price: car.price,
    };
    updateRow(newData)
  }

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={setPriceOnToyota}>Set Price on Toyota</button>
          <button onClick={setDataOnFord}>Set Data on Ford</button>
          <button onClick={loadData} style={{ marginLeft: "15px" }}>
            Load Data
          </button>
          <button onClick={resetGrid} disabled={hasAnyChange}>Reset</button>
        </div>

        <div style={{ height: 400, width: 600 }} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            getRowId={getRowId}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default App;
