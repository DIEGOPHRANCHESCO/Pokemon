const { getAllPokemonHandler } = require("../Handlers/handlerPokemons");
const { Router } = require("express");

const pokemons = Router();

pokemons.get("/", getAllPokemonHandler);

module.exports = pokemons;
