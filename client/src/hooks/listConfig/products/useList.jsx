import { useQuery } from "@tanstack/react-query";
import productService from "../../../services/product.service";

export const useList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await productService.getAll();
    },
  });
};
