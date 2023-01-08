import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: ICellRendererParams, resetRow: any) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const buttonClicked = () => {
    resetRow(props.data.id)
  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      <button onClick={() => buttonClicked()}>Clear</button>
    </span>
  );
};