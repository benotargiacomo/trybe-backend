const fs = require('fs');

module.exports = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const fileName = './talker.json';
  
  try {
    const readTalker = await fs.promises.readFile(fileName, 'utf-8');
    const talkerJSON = JSON.parse(readTalker);
    const id = talkerJSON.length + 1;
    const newTalker = { id, name, age, talk: { watchedAt, rate } };

    talkerJSON.push(newTalker);

    fs.promises.writeFile(fileName, JSON.stringify(talkerJSON));

    res.status(201).json(newTalker);
  } catch (err) {
    console.log(err);
  }
};
