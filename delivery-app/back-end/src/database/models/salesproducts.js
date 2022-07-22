const associate = (model) => {
  model.SalesProducts.belongsTo(model.Product, { foreignKey: 'product_id', as: 'product' });
  model.SalesProducts.belongsTo(model.Sales, { foreignKey: 'sale_id', as: 'sale' });
}

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', 
  {
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'sales_products'
  });

  SalesProducts.associate = associate;

  return SalesProducts;
};
