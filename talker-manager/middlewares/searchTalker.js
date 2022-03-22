const fs = require('fs');

module.exports = async (req, res) => {
  const { q: query } = req.query;
  const fileName = './talker.json';

  const readTalker = await fs.promises.readFile(fileName, 'utf-8');
  const talkerJSON = JSON.parse(readTalker);

  const filteredTalkers = talkerJSON.filter((e) => e.name.includes(query));

  if (!query || query === '') return res.status(200).json(talkerJSON);
  if (!filteredTalkers) return res.status(200).json([]);

  res.status(200).json(filteredTalkers);
};