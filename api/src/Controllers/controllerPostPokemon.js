const { Pokemon, Type } = require("../db.js");

const createPoke = async (
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
) => {
  const newPoke = await Pokemon.create({
    name,
    image,
    moves,
    life,
    attack,
    defense,
    speed,
    weight,
    height,
  });
  newPoke.addTypes(types);

  const typePoke = await Type.findAll({
    where: {
      name,
    },
  });

  return newPoke;
};

module.exports = {
  createPoke,
};
