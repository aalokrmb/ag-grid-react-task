import React, { useCallback, useRef, useState, useMemo }  from "react";
import { AgGridReact } from "ag-grid-react";
import Actions from "./Actions";

const statuses = ["New", "Ready", "Open", "In Progress", "Done", "Re-Opened", "Testing"];

const DataGrid = () => {

  const gridRef = useRef();

  const randomString = () =>  Math.random().toString(36).slice(2, 7);

  const randomStatus = () => statuses[Math.floor(Math.random()*statuses.length)];

  const defaultItem =  { id: 1, name: randomString(), lastName: randomString(), status: randomStatus() };

  const [columnDefs] = useState([
    { field: 'id', checkboxSelection: true, headerCheckboxSelection: true },
    { field: 'name' },
    { field: 'lastName' },
    { field: 'status' },
    { field: 'actions', cellRenderer: () => <Actions actions={actions} />}
  ])

  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);

  const addItem = useCallback(() => {
    const lastRowIdx = gridRef.current.api.getLastDisplayedRow();
    const lastRow = lastRowIdx > -1 ? gridRef.current.api.getDisplayedRowAtIndex(lastRowIdx) : { id: 0 };
    const newRowData = { id: parseInt(lastRow.id) + 1, name: randomString(), lastName: randomString(), status: randomStatus() };
    gridRef.current.api.applyTransaction({
      add: [newRowData]
    });
  }, []);

  const duplicateItem = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    let newItem = {...selectedData[0]};
    const lastRow = gridRef.current.api.getDisplayedRowAtIndex(gridRef.current.api.getLastDisplayedRow());
    newItem.id = parseInt(lastRow.id) + 1;
    console.log(newItem);
    gridRef.current.api.applyTransaction({
      add: [newItem]
    });
  }, [])

  const removeSelectedItems = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selectedData });
  }, []);

  const actions = [
    {
      title: "Duplicate",
      icon: "fa fa-clone",
      onClick: duplicateItem
    },
    {
      title: "Delete",
      icon: "fa fa-trash",
      onClick: removeSelectedItems
    }
  ]

  return (
    <div  className="main">
    <div className="btn-parent">
      <button onClick={addItem}>Add Item</button>
      <button onClick={removeSelectedItems}>Remove Selected Items</button>
    </div>
    <div>
      <div className="ag-theme-alpine grid-parent">
        <AgGridReact
          ref={gridRef}
          rowData={[defaultItem]}
          rowSelection={'multiple'}
          getRowId={getRowId}
          columnDefs={columnDefs}
          animateRows={true}
        />
      </div>
    </div>
    </div>
  )
}

export default DataGrid;