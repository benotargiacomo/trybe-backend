const fs = require('fs');

module.exports = async (_req, res) => {
  const fileName = './talker.json';

  try {
    const readTalker = await fs.promises.readFile(fileName, 'utf-8');
    const talkerJSON = JSON.parse(readTalker);

    if (talkerJSON) return res.status(200).json(talkerJSON);

    res.send(200).json([]);
  } catch (err) {
    console.log(`Não foi possível ler o arquivo: ${fileName}\n${err}`);
  }
};
