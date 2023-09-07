const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const random = (arrlength) => {
  let number = Math.floor(Math.random() * arrlength);
  return number;
};

const arreglo = (arr) => {
  let results = [];

  if (arr[0] && arr[0].hasOwnProperty("move")) {
    const one = arr[random(arr.length)];
    const two = arr[random(arr.length)];
    const three = arr[random(arr.length)];

    results.push(one.move.name, two.move.name, three.move.name);
  } else {
    if (arr.lengtth > 1) {
      const one = arr[random(arr.length)]["location_area"].name;
      const two = arr[random(arr.length)]["location_area"].name;

      one !== two ? results.push(one, two) : results.push(one);
    } else {
      arr[0] ? results.push(arr[0]["location_area"].name) : results;
    }
  }
  return results;
};

const evolution = async (evo) => {
  try {
    let evoChain = [];
    let ev = evo.chain["species"].name;
    let evoData = evo.chain.evolves_to;
    let evoName = evoData[0]["species"].name;
    // let evoDetails = evoData[0].evolves_to[0];
    // let detailEvo = evoDetails["species"].name;
    let url = `https://pokeapi.co/api/v2/pokemon/${evoName}`;
    // let urlTwo = `https://pokeapi.co/api/v2/pokemon/${detailEvo}`;
    // let urlThree = `https://pokeapi.co/api/v2/pokemon/${ev}`;

    const apiPokeUrl = await axios.get(url);
    // const apiPokeUrlTwo = await axios.get(urlTwo);
    // const apiPokeUrlThree = await axios.get(urlThree);

    const poke = apiPokeUrl.data;
    const m = poke.moves;

    // const pokeTwo = apiPokeUrlTwo.data;
    // const mo = pokeTwo.moves;

    // const pokeThree = apiPokeUrlThree.data;
    // const mov = pokeThree.moves;

    let result = {
      name: evoName,
      image: apiPokeUrl.data.sprites.other["home"].front_default,
      life: poke.stats[0].base_stat,
      attack: poke.stats[1].base_stat,
      defense: poke.stats[2].base_stat,
      speed: poke.stats[5].base_stat,
      weight: poke.weight,
      height: poke.height,
      moves: arreglo(m),
    };

    // let resultTwo = {
    //   name: detailEvo,
    //   image: apiPokeUrlTwo.data.sprites.other["home"].front_default,
    //   life: pokeTwo.stats[0].base_stat,
    //   attack: pokeTwo.stats[1].base_stat,
    //   defense: pokeTwo.stats[2].base_stat,
    //   speed: pokeTwo.stats[5].base_stat,
    //   weight: pokeTwo.weight,
    //   height: pokeTwo.height,
    //   moves: arreglo(mo),
    // };
    evoChain.push(result);
    // console.log(evoChain)
    // evoChain.push(resultTwo);
    return evoChain;
    // evoChain.push(resultThree);
    // let resultThree = {
    //   name: ev,
    //   image: apiPokeUrlThree.data.sprites.other["home"].front_default,
    //   life: pokeThree.stats[0].base_stat,
    //   attack: pokeThree.stats[1].base_stat,
    //   defense: pokeThree.stats[2].base_stat,
    //   speed: pokeThree.stats[5].base_stat,
    //   weight: pokeThree.weight,
    //   height: pokeThree.height,
    //   moves: arreglo(mov),
    // };

    //  = e.filter((element) => element.name !== ev.name)
  } catch (error) {
    console.log(error);
  }
};

const pokeId = async (id) => {
  const urlId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const idpoke = urlId.data;
  const specieApi = await axios.get(idpoke.species.url);
  const pokeSpecies = specieApi.data;
  const evolutionPoke = await axios.get(pokeSpecies["evolution_chain"].url);
  const evol = evolutionPoke.data;

  const allDescription = pokeSpecies["flavor_text_entries"].filter(
    (element) => element.language.name === "en"
  );

  const speciesP = pokeSpecies.genera.filter(
    (elemnent) => elemnent.language.name === "en"
  );
  const specie = speciesP[0]["genus"];

  const location = await axios.get(idpoke["location_area_encounters"]);
  const moves = idpoke.moves;
  const type = idpoke.types.map((typePoke) => typePoke.type.name);
  const move = arreglo(moves);
  const e = await evolution(evol);
  const evolu = e.filter((element) => element.name !== idpoke.name);

  const pokemonInf = {
    id: idpoke.id,
    name: idpoke.name,
    image: idpoke.sprites.other["home"].front_default,
    life: idpoke.stats[0].base_stat,
    attack: idpoke.stats[1].base_stat,
    defense: idpoke.stats[2].base_stat,
    speed: idpoke.stats[5].base_stat,
    weight: idpoke.weight,
    height: idpoke.height,
    happiness: pokeSpecies["base_happiness"],
    capture: pokeSpecies["capture_rate"],
    types: type.join(",  "),

    evolution: evolu,

    abilities: idpoke.abilities
      ? idpoke.abilities.map((elemnent) => elemnent.ability.name)
      : null,

    growth: pokeSpecies["growth_rate"] ? pokeSpecies["growth_rate"].name : null,
    habitat: pokeSpecies.habitat ? pokeSpecies.habitat.name : null,
    description: allDescription[random(allDescription.length)][
      "flavor_text" 
    ].replace("POKéMON", "pokémon"),

    species: specie ? specie : pokeSpecies.genera[7].genus,
    locations: arreglo(location.data),
    moves: move.join(", "),
    creado: false,
  };

  return pokemonInf;
};

const pokeData = async (id) => {
  let dat = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const arr = [];

  const p = Object.entries(dat);
  const o = Object.fromEntries(p);
  const k = o.dataValues;
  const e = Object.entries(k).forEach((par) => {
    const clave = par[0];
    const valor = par[1];
    if (clave === "Types") {
      k.types = k["Types"].map((t) => t.name).join(",   ");
    }
  });

  return k;
};

const getPokeId = async (id, source) => {
  const idPoke = source === "api" ? await pokeId(id) : await pokeData(id);
  return idPoke;

  //  await Pokemon.findByPk(id, {
  //   include: {
  //     model: Type,
  //     attributes: ["name"],
  //     through: {
  //       attributes: [],
  //     },
  //   },
  // })

  // console.log(idPoke )
};

module.exports = {
  getPokeId,
};
