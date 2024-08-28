import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { Button } from "../common/button";
import { SelectBox } from "../common/selectBox";
import { useList } from "../hooks/listConfig/categories/index";
import { TextField } from "../common/textInput";
import { useQuery } from "@tanstack/react-query";
import productService from "../services/product.service";

export const Modal = (props) => {
  const { data: categories } = useList({ enabled: props.open });

  const getProduct = useQuery({
    queryKey: ["getProduct", props.id],
    queryFn: async () => {
      return await productService.get(props.id);
    },
    enabled: Boolean(props.id),
  });

  const defaultFormData = getProduct?.data?.data?.data;

  return (
    <Dialog {...props}>
      <DialogContent>
        {getProduct.isLoading
          ? "...loading"
          : Object.entries({
              name: { label: "Name", type: "text" },
              price: { label: "Price", type: "number" },
              categoryId: {
                label: "Categories",
                component: SelectBox,
                menuItems: categories?.data?.data?.rows,
                required: true,
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
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
