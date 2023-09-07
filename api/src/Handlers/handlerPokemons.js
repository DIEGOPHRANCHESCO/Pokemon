const {
  getAllPokemon,
  poke,
  getNamePokemon,
} = require("../Controllers/controllerPokemons");

const getAllPokemonHandler = async (req, res) => {
  const { name } = req.query;
 

  try {
    let pokemon = !name ? await getAllPokemon(): await getNamePokemon(name) ;
     console.log(pokemon)
    res.status(200).json(pokemon);
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllPokemonHandler,
};
