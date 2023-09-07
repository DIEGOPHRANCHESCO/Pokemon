const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const url = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=60";
const getAllPokemonApi = async () => {
  const urlApiPoke = await axios.get(url);
  const urlApi = urlApiPoke.data.results;
  const infoPokemon = [];

  for (let i = 0; i < urlApi.length; i++) {
    const pokes = await axios.get(urlApi[i].url);
    const infPok = pokes.data;
    const t = infPok.types.map((tps) => tps.type.name);
    infoPokemon.push({
      id: infPok.id,
      name: infPok.name,
      image: infPok.sprites.other["home"].front_default,
      type: t.join("  "), 
      life: infPok.stats[0].base_stat,
      attack: infPok.stats[1].base_stat,
      defense: infPok.stats[2].base_stat,
      speed: infPok.stats[5].base_stat,
      weight: infPok.weight, 
      height: infPok.height,
      creado:false
    });
  }

  return infoPokemon;
};

const getDataBInfo = async () => {
  const data = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const pokemon = data.map((poke) => {
    const ty =  poke["Types"].map((t) => t.name)
    return {
      id: poke.id, 
      name: poke.name,
      image: poke.image,
      life: poke.life,
      attack: poke.attack,
      defense: poke.defense,
      speed: poke.speed,
      weight: poke.weight, 
      height: poke.height,
      type: ty.join(',  '),
      CREADO: true
    };
  });
 
  return pokemon;
};

const getAllPokemon = async () => {
  const apinfo = await getAllPokemonApi();
  const dataBInfo = await getDataBInfo();
  const totalPokemon = [...apinfo, ...dataBInfo];

  return totalPokemon;
};

// -------------------------

const getNamePokemon = async (name) => {
  const apiUrlPoke = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  const results = apiUrlPoke.data;
  const typ = results.types.map((typeP) => typeP.type.name)
  const infPokemon = {
    id: results.id,
    name: results.name,
    type: typ.join('  '),
    image: results.sprites.other["home"].front_default,
    life: results.stats[0].base_stat,
    attack: results.stats[1].base_stat,
    defense: results.stats[2].base_stat,
    speed: results.stats[5].base_stat,
    weight: results.weight,
    height: results.height,
  };

  const dataBase = await getDataBInfo()

  const poke =[infPokemon, ...dataBase ];
  const pokem = poke.filter(poke => poke.name  === name)
  return pokem
};

// --------------------------

// const poke = async (name) => {
//   if (name) {
//     const pokemonName = await getNamePokemon(name.toLowerCase());

//     if (pokemonName) {
//       return [pokemonName];
//     } else {
//       const pokemonDB = await getDataBInfo();
//       const pokemonN = pokemonDB.filter((elemnent) =>
//         elemnent.name.toLowerCase().include(name.toLowerCase())
//       );

//       return pokemonN.length ? pokemonN : "pokemon not found";
//     }
//   } else {
//     const totalpokemon = await getAllPokemon();

//     return totalpokemon;
//   }
// };

module.exports = {
  getAllPokemon,
  getNamePokemon,
};
