import { MenuItem, Select } from "@mui/material";

/**
 * @param {import("@mui/material").SelectProps & {menuItems: Array<{id:number, value: string}>}} props
 */
export const SelectBox = (props) => {
  return (
    <Select {...props}>
      {/* eslint-disable-next-line react/prop-types */}
      {props?.menuItems?.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};
