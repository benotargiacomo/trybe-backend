module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', 
  {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(7,2),
    url_image: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'products'
  });

  return Product;
};
