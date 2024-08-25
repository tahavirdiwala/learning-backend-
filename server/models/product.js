module.exports = (sequelize, type) => {
  const Products = sequelize.define(
    "Products",
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
      description: {
        type: type.STRING(50),
      },
      price: {
        type: type.BIGINT(50),
      },
      expiry_date: {
        type: type.STRING(50),
      },
      categoryId: {
        type: type.BIGINT(20),
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "products",
    }
  );

  return Products;
};
