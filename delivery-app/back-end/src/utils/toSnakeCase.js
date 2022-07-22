const snake = (string) => {
  const upperCases = string.match(/[A-Z]/gm);
  const splitted = string.split(/[A-Z]/gm);

  const result = splitted.map((word, index) => {
    if (index === 0) return word;

    const hold = upperCases ? upperCases[index - 1].toLowerCase() : '';

    return `_${hold}${word}`;
  }).join('');

  return result;
};

const toSnakeCase = (obj) => {
  const entries = Object.entries(obj);

  const result = entries.reduce((acc, [key, value]) => {
    const header = snake(key);

    return { ...acc, [header]: value };
  }, {});

  return result;
};

module.exports = toSnakeCase;