const fs = require('fs');

module.exports = async (req, res) => {
  const { id } = req.params;
  const fileName = './talker.json';

  const readTalker = await fs.promises.readFile(fileName, 'utf-8');
  const talkerJSON = JSON.parse(readTalker);

  const talkerIndex = talkerJSON.findIndex((e) => e.id === 1 * id);

  talkerJSON.splice(talkerIndex, 1);

  fs.promises.writeFile(fileName, JSON.stringify(talkerJSON));

  res.status(204).end();
};