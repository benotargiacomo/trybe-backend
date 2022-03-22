const fs = require('fs');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const fileName = './talker.json';
  const newInfo = { id: 1 * id, name, age, talk: { watchedAt, rate } };

  try {
    const readTalker = await fs.promises.readFile(fileName, 'utf-8');
    const talkerJSON = JSON.parse(readTalker);
    const talkerIndex = talkerJSON.findIndex((e) => e.id === 1 * id);

    talkerJSON[talkerIndex] = newInfo;

    fs.promises.writeFile(fileName, JSON.stringify(talkerJSON));
    
    res.status(200).json(newInfo);
  } catch (err) {
    console.log(err);
  }
};