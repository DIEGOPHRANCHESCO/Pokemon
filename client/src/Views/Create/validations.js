






// const pokemons = useSelector((state) =>
//     state.allPoke.map((poke) => poke.name)


export const validations = (form, pokemons) => {
  let reg = /^[a-zA-Z\s]*$/;
  const error = {};

  if (!form.name) {
    error.name = "Name for your new Pokemon is required";
  }

  if (pokemons.indexOf(form.name) !== -1) {
    error.name = "A pokemon with that name is already existing";
  }

  if (!reg.test(form.name)) {
    error.name = "Numbers or special characters are not allowed";
  }

  if (form.name.length > 18) {
    error.name = `The name can't be longer than 18 characters`;
  }

  if (!form.image) {
    error.image = "A image for Pokemon is required";
  }

  if (!form.moves) {
    error.moves = "what moves your Pokemon ?";

  }
  if (!reg.test(form.moves)) {
    error.moves = "Numbers or special characters are not allowed";
  }

  if (!form.life) {
    error.life = " Life for Pokemon";
  }
  if (form.life < 1 || form.life > 200) {
    if (form.life < 1) {
      error.life = "The life of the Pokemon must be higher than 1";
    }
    if (form.life > 200) {
      error.life = "The life of the Pokemon must be less than 200";
    }
  }

  if (!form.attack) {
    error.attack = "Attack for Pokemon";
  }
  if (form.attack < 1 || form.attack > 200) {
    if (form.attack < 1) {
      error.attack = "The attack of the Pokemon must be higher than 1";
    }
    if (form.attack > 200) {
      error.attack = "The attack of the Pokemon must be less than 200";
    }
  }

  if (!form.defense) {
    error.defense = "Defense for Pokemon";
  }
  if (form.defense < 1 || form.defense > 200) {
    if (form.defense < 1) {
      error.defense = "The defense of the Pokemon must be higher than 1";
    }
    if (form.defense > 200) {
      error.defense = "The defense of the Pokemon must be less than 200";
    }
  }

  if (!form.speed) {
    error.speed = "Speed for Pokemon";
  }
  if (form.speed < 1 || form.speed > 200) {
    if (form.speed < 1) {
      error.speed = "The speed of the Pokemon must be higher than 1";
    }
    if (form.speed > 200) {
      error.speed = "The speed of the Pokemon must be less than 200";
    }
  }

  if (!form.weight) {
    error.weight = " Weight for Pokemon";
  }
  if (form.weight < 1 || form.weight > 200) {
    if (form.weight < 1) {
      error.weight = "The weight of the Pokemon must be higher than 1";
    }
    if (form.weight > 2000) {
      error.weight = "The weight of the Pokemon must be less than 2000";
    }
  }

  if (!form.height) {
    error.height = "Height for Pokemon";
  }
  if (form.height < 1 || form.height > 80) {
    if (form.height < 1) {
      error.height = "The height of the Pokemon must be higher than 1 dam";
    }
    if (form.height > 80) {
      error.height = "The height of the Pokemon must be less than 80 dam";
    }
  }

  if (!form.types.length) {
    error.types = "Deves seleccionar los tipos para el pokemon";
  }
  if (form.types.length > 3) {
    error.types = `You can't choose more than 3 types per Pokemon`;
  }

  return error;
};
