const associate = (model) => {
  model.Sales.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
  model.Sales.belongsTo(model.User, { foreignKey: 'seller_id', as: 'seller' });
  model.Sales.hasMany(model.SalesProducts, { as: 'products' });
}

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', 
  {
    total_price: DataTypes.DECIMAL(9, 2),
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
    status: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'sales'
  });

  Sales.associate = associate;

  return Sales;
};
