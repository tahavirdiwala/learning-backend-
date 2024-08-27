import { useQuery } from "@tanstack/react-query";
import categoryService from "../../../services/category.service";

export const useList = (props) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await categoryService.getAll();
    },
    enabled: Boolean(props.enabled),
  });
};
