const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { authorization } = req.headers;
  
  try {
    const result = await postService.createPost(req.body, authorization);

    return res.status(result.code).json(result.message);
  } catch (err) {
      return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getAll = async (req, res) => {
  const { authorization } = req.headers;

  try {
    const result = await postService.getAll(authorization);

    return res.status(result.code).json(result.message);
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = {
  createPost,
  getAll,
};