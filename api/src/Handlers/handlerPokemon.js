
const { getPokeId } = require("../Controllers/controllerPokemon");
const { createPoke } = require("../Controllers/controllerPostPokemon");

const getPokemonId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const source = isNaN(id) ? "db" : "api";
    const getPoke = await getPokeId(id, source);

    res.status(200).json(getPoke);
  } catch (error) {
 
    res.status(400).json({ error: error.message });
  }
};

const creatPokemon = async (req, res) => {
  try {
    const {
      name,
      image,
      moves,
      types,
      life,
      attack,
      defense,
      speed,
      weight,
      height,
    } = req.body;
    
    let newPokemon = await createPoke(
      name,
      image,
      moves,
      types,
      life,
      attack,
      defense,
      speed,
      weight,
      height
    );
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonId,
  creatPokemon,
};
