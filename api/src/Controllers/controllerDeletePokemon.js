const { Pokemon } = require("../db.js");

const deletePoke = async (id) => {
  const idPoke = await Pokemon.findByPk(id);

  if (!idPoke) throw Error("No se pudo encontrar el Pokemon");     
  await idPoke.destroy(); 

  return ` El Pokemon: ${idPoke.name}  se elimino con exito`; 
};

module.exports = {
  deletePoke,
};
