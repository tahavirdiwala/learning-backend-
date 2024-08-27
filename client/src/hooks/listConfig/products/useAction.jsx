import { Button } from "../../../common/button";
/* eslint-disable react/prop-types */

export const ActionRow = (props) => {
  const handleEdit = () => {
    props.setId(props?.row?.id);
    props.handleOpen();
  };

  return (
    <>
      <Button onClick={handleEdit}>Edit</Button>
      <Button color="error">Delete</Button>
    </>
  );
};
