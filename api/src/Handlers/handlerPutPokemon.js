const { updatePokemon } = require("../Controllers/controllerPutPokemon");

const putPokemonHandler = async (req, res) => {
  const { id } = req.params;
  let { name, image, type, life, attack, defense, speed, weight, height } =
    req.body;
  try {
    const pokePut = await updatePokemon(
      id,
      name,
      image,
      type,
      life,
      attack,
      defense,
      speed,
      weight,
      height
    );

    res.status(200).json(pokePut);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  putPokemonHandler,
};
