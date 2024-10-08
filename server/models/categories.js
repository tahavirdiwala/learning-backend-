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
      },
      image: {
        type: type.STRING(800),
      },
    },
    {
      tableName: "categories",
    }
  );

  return Categories;
};
