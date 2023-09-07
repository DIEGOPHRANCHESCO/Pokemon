const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const pokemons = require("./routerPokemons");
const pokemon = require("./routerPokemon");
const types = require("./routerTypes");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemons);
router.use("/pokemon", pokemon);
router.use("/types", types);

module.exports = router;
