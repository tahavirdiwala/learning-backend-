/* eslint-disable react/prop-types */
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextField } from "../common/textInput";
import { SelectBox } from "../common/selectBox";
import { Button } from "../common/button";
import { useList } from "../hooks/listConfig/categories/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productService from "../services/product.service";

export const AddProduct = (props) => {
  const queryClient = useQueryClient();
  const { data } = useList({ enabled: props.open });

  const getProduct = useQuery({
    queryKey: ["getProduct", props.id],
    queryFn: async () => {
      return await productService.get(props.id);
    },
    enabled: Boolean(props.id),
  });

  const productMutation = useMutation({
    mutationFn: async (data) => {
      if (props.id) {
        const payload = {
          id: props?.id,
          ...data,
        };
        return await productService.edit(payload);
      } else {
        return await productService.add(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      props.handleClose();
    },
  });

  const defaultFormData = getProduct?.data?.data?.data;

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        component: "form",
        onSubmit: async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          productMutation.mutate(formJson);
        },
      }}
    >
      <DialogContent>
        {getProduct.isLoading
          ? "...loading"
          : Object.entries({
              name: { label: "Name", type: "text" },
              price: { label: "Price", type: "number" },
              categoryId: {
                label: "Categories",
                component: SelectBox,
                menuItems: data?.data?.data?.rows,
              },
              expiry_date: { type: "date" },
              description: { label: "Description", type: "text" },
            }).map(
              ([
                key,
                { label, type, component: Component = TextField, ...rest },
              ]) => (
                <Component
                  key={key}
                  id={key}
                  name={key}
                  label={label}
                  type={type}
                  fullWidth
                  margin="dense"
                  variant="standard"
                  defaultValue={defaultFormData?.[key] || ""}
                  {...rest}
                />
              )
            )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
