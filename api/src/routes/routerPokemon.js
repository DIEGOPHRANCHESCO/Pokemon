const { getPokemonId, creatPokemon } = require("../Handlers/handlerPokemon");
const { Router } = require("express");
const { putPokemonHandler } = require("../Handlers/handlerPutPokemon");
const { deletePokemonHandler } = require("../Handlers/handlerDeletePokemon");

const pokemon = Router();

pokemon.get("/:id", getPokemonId);

pokemon.post("/", creatPokemon);

pokemon.put("/:id", putPokemonHandler);

pokemon.delete("/:id", deletePokemonHandler);

module.exports = pokemon;
