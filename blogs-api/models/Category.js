module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.BlogPost, {
      through: models.PostCategory,
      foreignKey: 'categoryId',
      as: 'blogPosts' });
  };

  return Category;
};