module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
    tableName: 'BlogPosts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsToMany(models.Category, {
      through: models.PostCategory, foreignKey: 'postId', as: 'categories' });
  
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPost;
};