import "./App.css";
import productService from "./services/product.service";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
} from "@mui/material";
import categoryService from "./services/category.service";
import { Button } from "./common/button";
import { TextField } from "./common/textInput";
import { DataGrid } from "./common/dataGrid";
import { SelectBox } from "./common/selectBox";
import { useColumns } from "./hooks/listConfig/products";

function App() {
  const [rows, setRows] = useState(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(null);

  const columns = useColumns();

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
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    fetchCategories();
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
          <SelectBox
            id="categoryId"
            name="categoryId"
            style={{ height: "50px" }}
            fullWidth
            label="Category"
            menuItems={categories?.rows}
          />
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
