import "./App.css";
import { useState } from "react";
import { Button } from "./common/button";
import { DataGrid } from "./common/dataGrid";
import { useColumns, useList } from "./hooks/listConfig/products";
import { AddProduct } from "./components/addProduct";

function App() {
  const [open, setOpen] = useState(false);
  const columns = useColumns();
  const { data } = useList();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddProduct open={open} handleClose={handleClose} />
      <div
        style={{
          border: "1px solid black",
          width: "900px",
          padding: "8px",
        }}
      >
        <Button
          style={{ display: "flex" }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          add product
        </Button>

        <DataGrid
          style={{ marginTop: "8px" }}
          rows={data?.data?.data?.rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </div>
    </>
  );
}

export default App;
