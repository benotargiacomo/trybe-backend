const fs = require('fs');

module.exports = async (req, res) => {
  const { id } = req.params;
  const fileName = './talker.json';
  const talker404 = { message: 'Pessoa palestrante não encontrada' };

  try {
    const readTalker = await fs.promises.readFile(fileName, 'utf-8');
    const talkerJSON = JSON.parse(readTalker);

    const talker = talkerJSON.find((e) => e.id === 1 * id);

    if (talker) return res.status(200).json(talker);

    res.status(404).json(talker404);
  } catch (err) {
    console.log(err);
  }
};
