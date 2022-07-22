const removeKey = (obj, keyWord) => 
  Object.entries(obj)
    .filter(([key, _value]) => key !== keyWord)
    .reduce((acc, [key, value]) => { 
      acc[key] = value;
      return acc;
    }, {});

module.exports = removeKey;