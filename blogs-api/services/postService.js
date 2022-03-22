const { User, BlogPost, Category } = require('../models');
const auth = require('../auth/token');
const validation = require('../middlewares/validations');

const createPost = async (postBody, authorization) => {
  const { title, categoryIds, content } = postBody;

  const validateToken = validation.authToken(authorization);
  if (validateToken.message) return validateToken;

  const validatePostBody = await validation.createPost(postBody);
  if (validatePostBody.message) return validatePostBody;

  try {
    const decoded = auth.verify(authorization);

    const user = await User.findOne({ where: { email: decoded.email } });
    if (user === null) return validation.errors.userNotFound;

    const createdPost = await BlogPost.create({
      userId: user.id, title, content, categoryIds,
    });

    return { code: 201, message: createdPost };
  } catch (err) {
    console.log(err.message);
  }
};

const getAll = async (authorization) => {
  const validateToken = validation.authToken(authorization);
  if (validateToken.message) return validateToken;

  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return { code: 200, message: posts };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPost,
  getAll,
};