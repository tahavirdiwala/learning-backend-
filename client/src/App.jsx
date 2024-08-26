import "./App.css";
import { DataGrid } from "@mui/x-data-grid";
import productService from "./services/product.service";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import categoryService from "./services/category.service";

function App() {
  const [rows, setRows] = useState(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(null);

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 90,
      renderCell: ({ row: { category } }) => {
        return (
          <img
            width={"50"}
            height={"50"}
            style={{ borderRadius: "50%" }}
            src={`http://localhost:8000/assets/${category?.image}`}
          />
        );
      },
    },
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

  const fetchCategories = async () => {
    try {
      const resopnse = await categoryService.getAll();
      setCategories(resopnse.data?.data);
    } catch (err) {
      console.log("..err=>>>>>>>>", err);
    }
  };

  const addProduct = async (data) => {
    await productService.add(data);
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

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
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            await addProduct(formJson);
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
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>

          <Select
            id="categoryId"
            name="categoryId"
            style={{ height: "50px" }}
            fullWidth
            label="Category"
          >
            {categories?.rows?.map((item) => {
              return (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name}
                </MenuItem>
              );
            })}
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
