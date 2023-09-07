const { Pokemon, Type } = require("../db.js");

const updatePokemon = async (
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
) => {
  const putPoke = await Pokemon.findByPk(id);

  if (!putPoke) throw Error(`el id:${id}no existe`);

  if (
    !name ||
    !image ||
    !life ||
    !attack ||
    !defense ||
    !speed ||
    !weight ||
    !height ||
    !Type
  ) {
    throw Error("Fallo la mision");
  }

  await putPoke.setTypes(type);

  await Pokemon.update(
    { name, image, life, attack, defense, speed, weight, height, type },
    {
      where: {
        id,
      },
    }
  );
  return ` ${name} Ha sido actualizado`;
};

module.exports = {
  updatePokemon,
};
