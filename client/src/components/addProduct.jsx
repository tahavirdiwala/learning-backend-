/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "../services/product.service";
import { Modal } from "./modal";

export const AddProduct = (props) => {
  const queryClient = useQueryClient();

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

  return (
    <Modal
      id={props.id}
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
    />
  );
};
