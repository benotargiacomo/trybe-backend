const auth = require('../auth/token');
const { Category } = require('../models');
// const success = {
//   created: {
//     code: 201,
//     // message:
//   },
// };

const errors = {
  nameLength: {
    code: 400,
    message: {
      message: '"displayName" length must be at least 8 characters long',
    },
  },
  pwdLength: {
    code: 400,
    message: {
      message: '"password" length must be 6 characters long',
    },
  },
  blankPassword: {
    code: 400,
    message: {
      message: '"password" is required',
    },
  },
  emptyPassword: {
    code: 400,
    message: {
      message: '"password" is not allowed to be empty',
    },
  },
  blankEmail: {
    code: 400,
    message: {
      message: '"email" is required',
    },
  },
  emptyEmail: {
    code: 400,
    message: {
      message: '"email" is not allowed to be empty',
    },
  },
  emailFormat: {
    code: 400,
    message: {
      message: '"email" must be a valid email',
    },
  },
  blankToken: {
    code: 401,
    message: {
      message: 'Token not found',
    },
  },
  invalidToken: {
    code: 401,
    message: {
      message: 'Expired or invalid token',
    },
  },
  blankCategory: {
    code: 400,
    message: {
      message: '"name" is required',
    },
  },
  userRegistered: {
    code: 409,
    message: {
      message: 'User already registered',
    },
  },
  invalidUser: {
    code: 400,
    message: {
      message: 'Invalid fields',
    },
  },
  blankTitle: {
    code: 400,
    message: {
      message: '"title" is required',
    },
  },
  blankContent: {
    code: 400,
    message: {
      message: '"content" is required',
    },
  },
  blankCategoryId: {
    code: 400,
    message: {
      message: '"categoryIds" is required',
    },
  },
  categoryNotFound: {
    code: 400,
    message: {
      message: '"categoryIds" not found',
    },
  },
  userNotFound: {
    code: 404,
    message: {
      message: 'User does not exist',
    },
  },
};

const validateCategory = (name) => {
  if (!name) return errors.blankCategory;
  
  return true;
};

const validateName = (name) => {
  if (name.length < 8) return errors.nameLength;
  
  return true;
};

const validatePwd = (pwd) => {
  if (pwd === '') return errors.emptyPassword;
  if (!pwd) return errors.blankPassword;
  if (pwd.length !== 6) return errors.pwdLength;

  return true;
};

const validateEmail = (email) => {
  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);

  if (email === '') return errors.emptyEmail;
  if (!email) return errors.blankEmail;
  if (!isValid) return errors.emailFormat;

  return true;
};

const categoryIds = async (ids) => {
  const categories = await Promise.all(
    ids.map(async (id) => {
      const category = await Category.findByPk(id);
        
      return category;
    }),
  ); 
  
  const isValid = categories.every((id) => id);
  
  return isValid;
};

const createUser = (body) => {
  const { displayName, email, password } = body;
  
  const validName = validateName(displayName);
  if (validName.message) return validName;

  const validPwd = validatePwd(password);
  if (validPwd.message) return validPwd;

  const validEmail = validateEmail(email);
  if (validEmail.message) return validEmail;

  return true;
};

const createPost = async (body) => {
  const { title, content, categoryIds: ids } = body;
  
  if (!title) return errors.blankTitle;
  if (!content) return errors.blankContent;
  if (!ids) return errors.blankCategoryId;

  const isValid = await categoryIds(ids);
  
  if (!isValid) return errors.categoryNotFound;

  return true;
};

const authLogin = (body) => {
  const { email, password } = body;
  
  const validPwd = validatePwd(password);
  if (validPwd.message) return validPwd;

  const validEmail = validateEmail(email);
  if (validEmail.message) return validEmail;

  return true;
};

const authToken = (authorization) => {
  if (!authorization) return errors.blankToken;
  
  const token = auth.verify(authorization);
  if (!token) return errors.invalidToken;
  
  return true;
};

module.exports = {
  errors,
  createUser,
  createPost,
  authLogin,
  authToken,
  validateCategory,
  categoryIds,
};