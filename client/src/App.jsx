import "./App.css";
import { DataGrid } from "@mui/x-data-grid";
import productService from "./services/product.service";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

function App() {
  const [rows, setRows] = useState(null);
  const [open, setOpen] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      editable: true,
      valueGetter: (_, row) => {
        return row?.category?.name;
      },
    },
  ];

  const fetchData = async () => {
    try {
      const resopnse = await productService.getAll();
      setRows(resopnse.data?.data);
    } catch (err) {
      console.log("..err=>>>>>>>>", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("rows?.count", rows?.count);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
          />
          <Select
            fullWidth
            placeholder="Select Category"
            // value={age}
            label="Category"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <TextField
            autoFocus
            required
            margin="dense"
            id="date"
            name="expiry_date"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
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
          rows={rows?.rows}
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
