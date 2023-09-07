import { useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokes, getTypes, postPokemon } from "../../Redux/Actions/action";
import style from "./create.module.css";
// import imgType from "../../image/imgType"

// const ty = require.context('../../image/imgType',true)

const formI = {
  name: "",
  image: "",
  moves: "",
  life: "",
  attack: "",
  defense: "",
  speed: "",
  weight: "",
  height: "",
  types: [],
};

function Create() {
  const types = useSelector((state) => state.types);

  const pokemons = useSelector((state) =>
    state.allPoke.map((poke) => poke.name)
  );

  const history = useHistory();

  const dispatch = useDispatch();

  const [section, setSection] = useState(1);

  const [form, setForm] = useState(formI);

  const [error, setError] = useState(formI);

  const typesColors = {
    fire: "#F57D31",
    normal: "#AAA67F",
    fighting: "#D3425F",
    flying: "#A891EC",
    ground: "#DEC16B",
    poison: "#A43E9E",
    rock: "#B69E31",
    bug: "#A7B723",
    ghost: "#70559B",
    steel: "#5695A3",
    water: "#6493EB",
    grass: "#74CB48",
    electric: "#F9CF30",
    psychic: "#FB5584",
    ice: "#9AD6DF",
    dragon: "#7037FF",
    dark: "#75574C",
    fairy: "#E69EAC",
    unknown: "#BF5481",
    shadow: "#36045E",
  };

  const validations = (form) => {
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
      error.types = "It is necessary to select the types for the pokemon";
    }
    if (form.types.length > 3) {
      error.types = `You can't choose more than 3 types per Pokemon`;
    }

    return error;
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleSection = (event) => {
    event.preventDefault();
    Object.keys(error).length === 1 && error.types.length
      ? setSection(section === 1 ? 2 : 1)
      : alert("incomplete form", "", "error");
  };

  const handlerChecked = (event) => {
    if (event.target.checked) {
      setForm({
        ...form,
        types: [...form.types, event.target.value],
      });

      setError(
        validations(
          {
            ...form,
            types: [...form.types, event.target.value],
          },
          pokemons
        )
      );
    } else if (!event.target.checked) {
      setForm({
        ...form,
        types: form.types.filter((type) => event.target.value !== type),
      });

      setError(
        validations(
          {
            ...form,
            types: form.types.filter((type) => event.target.value !== type),
          },
          pokemons
        )
      );
    }
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
    setError(validations({ ...form, [property]: value }), pokemons);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(error).length === 0 && form.name.length) {
      dispatch(postPokemon(form));
      dispatch(getPokes());
      alert("Good Job!");
      setForm(formI);
      history.push("/Home");
    } else {
      alert("You must choose 1 to 3 types!", "", "error");
    }
  };

  useEffect(() => {
    setError(validations(form));
  }, [form]);

  return (
    <div className={style.con}>
      <div className={style.container}>
        <div className={style.pagina}></div>
        <form id="fm" onSubmit={handlerSubmit}>
          <div className={style.form_container}>
            <Link
              to="/home"
              className={style.back}
              style={{ textDecoration: "none" }}
            >
              <button>Return home</button>
            </Link>
            <section className={section === 1 ? style.show : style.hide}>
              <div className={style.container}>
                <div className={style.header}>
                  <h1 className={style.form_name}> Cretate</h1>
                </div>
                <div className={style.formdiv}>
                  <label htmlFor="name">Name: </label>

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => changeHandler(e)}
                    style={
                      form.name.length
                        ? error.name
                          ? { borderColor: "#e74c3c" }
                          : { borderColor: "#2ecc71" }
                        : []
                    }
                    autocomplete="off"
                    placeholder="NAME"
                    required
                  />
                  {error.name ? (
                    <div>
                      <i
                        className="fas fa-exclamacion-circle"
                        style={{ color: "#e74c3c" }}
                      ></i>
                      <p>{error.name}</p>
                    </div>
                  ) : form.name.length ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#2ecc71" }}
                    ></i>
                  ) : (
                    <i></i>
                  )}
                </div>

                <div className={style.formdiv}>
                  <label htmlFor="">Image: </label>
                  <input
                    name="image"
                    type="text"
                    value={form.image}
                    onChange={changeHandler}
                    placeholder="IMAGE"
                    autocomplete="off"
                    required
                  />
                  {error.image && <p>{error.image}</p>}
                </div>

                <div className={style.formdiv}>
                  <label htmlFor="">Moves: </label>
                  <input
                    name="moves"
                    type="text"
                    value={form.moves}
                    onChange={changeHandler}
                    placeholder="MOVES"
                    autocomplete="off"
                    required
                  />
                  {error.moves && <p>{error.moves}</p>}
                </div>

                <div className={style.formdiv}>
                  <label htmlFor="">Life: </label>

                  <input
                    name="life"
                    type="number"
                    value={form.life}
                    onChange={(e) => changeHandler(e)}
                    step="0"
                    min="1"
                    max="100"
                    placeholder="LIFE"
                    style={
                      form.life.length
                        ? error.life
                          ? { borderColor: "#e74c3c" }
                          : { borderColor: "#2ecc71" }
                        : []
                    }
                    autocomplete="off"
                    required
                  />
                  {error.life ? (
                    <div>
                      <i
                        className="fas fa-exclamation-circle"
                        style={{ color: "#e74c3c" }}
                      ></i>
                      <p>{error.life}</p>
                    </div>
                  ) : form.life.length ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#2ecc71" }}
                    ></i>
                  ) : (
                    <i></i>
                  )}
                </div>

                <div className={style.formdiv}>
                  <label htmlFor="">Attack: </label>
                  <input
                    name="attack"
                    type="number"
                    value={form.attack}
                    onChange={(e) => changeHandler(e)}
                    step="0"
                    min="1"
                    max="10000"
                    placeholder="ATTACK"
                    style={
                      form.attack.length
                        ? error.attack
                          ? { borderColor: "#e74c3c" }
                          : { borderColor: "#2ecc71" }
                        : []
                    }
                    autocomplete="off"
                    required
                  />
                  {error.attack ? (
                    <div className={style.formdiv}>
                      <i
                        className="fas fa-exclamation"
                        style={{ color: "#e74c3c" }}
                      ></i>
                      <p>{error.attack}</p>
                    </div>
                  ) : form.attack.length ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#2ecc71" }}
                    ></i>
                  ) : (
                    <i></i>
                  )}
                </div>

                <div className={style.formdiv}>
                  <label htmlFor="defense">DEFENSE:</label>

                  <input
                    name="defense"
                    type="number"
                    value={form.defense}
                    onChange={(e) => changeHandler(e)}
                    step="0"
                    min="1"
                    max="10000"
                    placeholder="DEFENSE"
                    style={
                      form.defense.length
                        ? error.defense
                          ? { borderColor: "#e74c3c" }
                          : { borderColor: "#2ecc71" }
                        : []
                    }
                    autocomplete="off"
                    required
                  />
                  {error.defense ? (
                    <div>
                      <i
                        className="fas fa-exclamaton-circle"
                        style={{ color: "#e74c3c" }}
                      ></i>

                      <p>{error.defense}</p>
                    </div>
                  ) : form.defense.length ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#2ecc71" }}
                    ></i>
                  ) : (
                    []
                  )}
                </div>

                <div className={style.formdiv}>
                  <label htmlFor="speed">Speed: </label>

                  <input
                    name="speed"
                    type="number"
                    value={form.speed}
                    onChange={(e) => changeHandler(e)}
                    step="0"
                    min="1"
                    max="100"
                    placeholder="SPEED"
                    style={
                      form.speed.length
                        ? error.speed
                          ? { borderColor: "#e74c3c" }
                          : { borderColor: "#2ecc71" }
                        : []
                    }
                    autocomplete="off"
                    required
                  />
                  {error.speed ? (
                    <div className={style.formdiv}>
                      <i
                        className="fas fa-exclamation-circle"
                        style={{ color: "#e74c3c" }}
                      ></i>
                      <p>{error.speed}</p>
                    </div>
                  ) : error.speed ? (
                    <i
                      className="fas fa-exclamation-circle"
                      style={{ color: "#2ecc71" }}
                    ></i>
                  ) : (
                    <i></i>
                  )}
                </div>

                <div className={style.formdiv}>
                  <label htmlFor="weight">Weight: </label>

                  <input
                    name="weight"
                    type="number"
                    value={form.weight}
                    onChange={(e) => changeHandler(e)}
                    step="0"
                    min="1"
                    max="10000"
                    placeholder="WEIGHT"
                    style={
                      form.weight.length
                        ? error.weight
                          ? { borderColor: "#e74c3c" }
                          : { borderColor: "#2ecc71" }
                        : []
                    }
                    required
                    autocomplete="off"
                  />
                  {error.weight ? (
                    <div>
                      <i
                        className="fas fa-exclamation-circle"
                        style={{ color: "#e74c3c" }}
                      ></i>
                      <p>{error.weight}</p>
                    </div>
                  ) : form.weight.length ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#2ecc71" }}
                    ></i>
                  ) : (
                    <i></i>
                  )}
                </div>

                <div className={style.formdiv}>
                  <label htmlFor="height">Height: </label>

                  <input
                    name="height"
                    type="number"
                    value={form.height}
                    onChange={(e) => changeHandler(e)}
                    step="0"
                    min="1"
                    max="100"
                    placeholder="HEIGHT"
                    style={
                      form.height.length
                        ? error.height
                          ? { borderColor: "#e74c3c" }
                          : { borderColor: "#2ecc71" }
                        : []
                    }
                    required
                    autocomplete="off"
                  />
                  {error.height ? (
                    <div>
                      <i
                        className="fas fa-exclamation-circle"
                        style={{ color: "#e74c3c" }}
                      ></i>

                      <p>{error.height}</p>
                    </div>
                  ) : form.height.length ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#2ecc71" }}
                    ></i>
                  ) : (
                    <i></i>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  handleSection(e);
                }}
              >
                Next
              </button>
            </section>
            <section className={section === 2 ? style.show : style.hide}>
              {error.types && <p>{error.types}</p>}
              <span
                className={style.choosetypes}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontFamily: "Open Sans",
                }}
              >
                Choose up to 3 Pokemon types
              </span>

              <div style={{ position: "relative" }}>
                <div className={style.containertypes}>
                  {types.length > 0 &&
                    types.map((type) => (
                      <label htmlFor={type.name}>
                        <div className={style.bytype}>
                          <input
                            key={type.id}
                            id={type.name}
                            type="checkbox"
                            value={type.id}
                            onChange={(e) => handlerChecked(e)}
                            name={type.name}
                          />
                          <div
                            className={style.circle}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: typesColors[type.name],
                            }}
                          >
                            <div
                              className={style.circle}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: typesColors[type.name],
                              }}
                            >
                              <img
                                src={`image/ty/${type.name}.svg`}
                                alt={`${type.name}`}
                                height="106px"
                              />
                            </div>
                          </div>
                          <div style={{ width: "10px" }}></div>
                          {type.name}
                        </div>
                      </label>
                    ))}
                </div>
                {error.types ? (
                  <div className={style.typeserror}>
                    <i
                      className="fas fa-exclamation-circle"
                      style={{ color: "#e74c3c" }}
                    ></i>
                    <span>{error.types}</span>
                  </div>
                ) : (
                  <i></i>
                )}
              </div>
              <div style={{ display: "flex", flexFlow: "row nowrap" }}>
                <div className={style.form_buttons}></div>
              </div>
              <div style={{ display: "flex", flexFlow: "row nowrap" }}>
                <button
                  className={style.previous}
                  onClick={(e) => {
                    handleSection(e);
                  }}
                >
                  Previous
                </button>
                <button className={style.create} type="submit">
                  Create
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
