const axios = require("axios");
const { Type } = require("../db.js");

const typePoke = async () => {
  const url = "https://pokeapi.co/api/v2/type";
  const typeApi = await axios.get(url);
  const type = typeApi.data.results;

  type.forEach((element) => {
    Type.findOrCreate({
      where: {
        name: element.name,
      },
    });
  });

  const allTypes = await Type.findAll();

  allTypes.filter((element) => element.name);

  return allTypes; 
};

const updateType = async (id, name) => {
  const typePut = await Type.findByPk(id);
  if (!typePut) throw Error(`The id: ${id} does not exist`);
  if (!name) throw Error(`Missing Data not ${name}`);
  await Type.update(
    { name },
    {
      where: { id },
    }
  );

  return `${name} has been updated`;
};

module.exports = {
  typePoke,
};
