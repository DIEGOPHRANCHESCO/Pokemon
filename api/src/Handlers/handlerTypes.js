const { typePoke } = require("../Controllers/controllerTypes");

const getTypesHandler = async (req, res) => {
  try {
    const typePok = await typePoke();
    res.status(200).json(typePok);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTypesHandler,
};
