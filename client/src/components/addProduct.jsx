import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextField } from "../common/textInput";
import { SelectBox } from "../common/selectBox";
import { Button } from "../common/button";
import { useList } from "../hooks/listConfig/categories/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "../services/product.service";

export const AddProduct = (props) => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line react/prop-types
  const { data } = useList({ enabled: props.open });

  const addProductMutation = useMutation({
    mutationFn: async (data) => {
      return await productService.add(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      // eslint-disable-next-line react/prop-types
      props.handleClose();
    },
  });

  return (
    <Dialog
      // eslint-disable-next-line react/prop-types
      open={props.open}
      // eslint-disable-next-line react/prop-types
      onClose={props.handleClose}
      PaperProps={{
        component: "form",
        onSubmit: async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          addProductMutation.mutate(formJson);
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
        <SelectBox
          id="categoryId"
          name="categoryId"
          style={{ height: "50px" }}
          fullWidth
          label="Categories"
          menuItems={data?.data?.data?.rows}
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
        {/* eslint-disable-next-line react/prop-types */}
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
