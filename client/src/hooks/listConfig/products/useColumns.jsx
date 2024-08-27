export const useColumns = () => {
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
  return columns;
};
