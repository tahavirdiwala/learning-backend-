module.exports = (sequelize, type) => {
  const Categories = sequelize.define(
    "Categories",
    {
      id: {
        type: type.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: type.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [3, 150],
            msg: "Name length should be between 3 and 150 characters",
          },
        },
      },
      image: {
        type: type.STRING(500),
      },
    },
    {
      tableName: "categories",
    }
  );

  return Categories;
};
