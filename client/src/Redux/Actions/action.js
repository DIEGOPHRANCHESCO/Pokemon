import axios from "axios";

export const GET_POKES = "GET_POKES";
export const GET_POKE = "GET_POKE";
export const ID_POKE = "ID_POKE";
export const CLAEN_ID = "CLAEN_ID";
export const TYPES = "TYPES";
export const POST_POKEMON = "POST_POKEMON";
export const DELETE_POKE = "DELETE_POKE";
export const FILTER_CREATE = "FILTER_CREATE";
export const RELOAD_POKE = "RELOAD_POKE";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const ORDER_BY_NAME_OR_STRENGH = "ORDER_BY_NAME_OR_STRENGH";

export const getPokes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/pokemons");
      const pokes = response.data;
      return dispatch({ type: GET_POKES, payload: pokes });
    } catch (error) {
      alert(error);
    }
  };
};

export const getByPoke = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/pokemons/?name=${name}`
      );
      const poke = response.data;

      return dispatch({
        type: GET_POKE,
        payload: poke,
      });
    } catch (error) {}
  };
};

export const IdPoke = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemon/${id}`);
      const pokeId = response.data;
      dispatch({ type: ID_POKE, payload: pokeId });
    } catch (error) {
      alert(error);
    }
  };
};


 export const  cleanId = () => {
    return  ({type: CLAEN_ID })
 }

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/types`);
      const types = response.data;
      dispatch({ type: TYPES, payload: types });
    } catch (error) {
      alert(" Error of Type");
    }
  };
};

export const postPokemon = (payload) => {
  return async function (dispatch) {
    try {
      await axios.post("/pokemon", payload);
      return {
        type: POST_POKEMON,
        payload,
      };
    } catch (error) {
      alert("Error Post");
    }
  };
};

export const deletePoke = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/pokemon/${id}`);
      return dispatch({
        type: DELETE_POKE,
      });
    } catch (error) {
      alert("The pokemon could not be deleted");
    }
  };
};

export const reloadPoke = () => {
  return {
    type: RELOAD_POKE,
  };
};

export const filterCreate = (payload) => {
  return {
    type: FILTER_CREATE,
    payload,
  };
};

export const filterPokeByType = (payload) => {
  return {
    type: FILTER_BY_TYPES,
    payload,
  };
};

export const orderBynameOrStrengh = (payload) => {
  return {
    type: ORDER_BY_NAME_OR_STRENGH,
    payload,
  };
};
