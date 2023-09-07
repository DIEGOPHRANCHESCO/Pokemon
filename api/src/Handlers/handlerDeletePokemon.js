const { deletePoke } = require("../Controllers/controllerDeletePokemon");

const deletePokemonHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const elimiPoke = await deletePoke(id);

    res.status(200).json(elimiPoke);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  deletePokemonHandler,
};
