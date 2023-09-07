import { CLAEN_ID, DELETE_POKE } from "../Actions/action";
import {
  ID_POKE,
  GET_POKE,
  GET_POKES,
  TYPES,
  RELOAD_POKE,
  FILTER_CREATE, 
  FILTER_BY_TYPES,
  ORDER_BY_NAME_OR_STRENGH,
  POST_POKEMON,
} from "../Actions/action";

let initialState = {
  allPoke: [],
  pokes: [],
  detail: {},
  types: [],
};
console.log(initialState)


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKES:
      return {
        ...state,
        allPoke: action.payload,
        pokes: action.payload,
      };
    case GET_POKE:
      console.log(action.payload)
      return {
        ...state,
        pokes: action.payload,
        
      };
    case ID_POKE:
      return {
        ...state,
        detail: action.payload,
      };   
      case CLAEN_ID:
        return {
          ...state,
          detail:{}
        }
    case TYPES:
      return {
        ...state,
        types: action.payload,
      };
      case POST_POKEMON:
        return{
          ...state
        }
        case DELETE_POKE:
          return{
            ...state
          }

    case RELOAD_POKE:
      const sortApiPokes = state.allPoke
        .filter(element => !element.CREADO)
        .sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }

          if (b.id > a.id) {
            return -1;
          }

          return 0;
        });

      const sortBdpokes = state.allPoke
        .filter((element) => element.CREADO)
        .sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }

          if (b.id > a.id) {
            return -1;
          }
          return 0;
        });

      let sortPokes = [...sortApiPokes, ...sortBdpokes];

      return {
        ...state,
        pokes: sortPokes,
      };

    case FILTER_CREATE:
      const pokeOne = state.allPoke;
      const statusFilteredOne =
        action.payload === "creado"
          ? pokeOne.filter((element) => element.CREADO)
          : pokeOne.filter((element) => !element.CREADO);
      return {
        ...state,
        pokes:
          action.payload === "All"
            ? pokeOne
            : statusFilteredOne.length
            ? statusFilteredOne
            : ["Pokemon creado"],
      };

    case FILTER_BY_TYPES:
      const pokeT = state.allPoke;
      const statusfiltTypes =
        action.payload === "All"
          ? pokeT
          : pokeT.filter((element) => element.type.includes(action.payload));

      return {
        ...state,
        pokes: statusfiltTypes.length
          ? statusfiltTypes
          : [`${action.payload} Pokemons`],
      };

    case ORDER_BY_NAME_OR_STRENGH:
      let sortedArr;
      if (action.payload === "asc") {
        sortedArr = state.pokes.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      }

      if (action.payload === "desc") {
        sortedArr = state.pokes.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "High Attack") {
        sortedArr = state.pokes.sort((a, b) => {
          if (a.attack > b.attack) {
            return -1;
          }
          if (b.attack > a.attack) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "Low Attack") {
        sortedArr = state.pokes.sort((a, b) => {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        });
      }

      if (action.payload === "normal") {
        const apiPokes = state.pokes
          .filter((element) => !element.CREADO)
          .sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (b.id > a.id) {
              return -1;
            }
            return 0;
          });
        const dbPokes = state.pokes
          .filter((elemt) => elemt.CREADO)
          .sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (b.id > a.id) {
              return -1;
            }
            return 0;
          });
        sortedArr = [...apiPokes, ...dbPokes];
      }
      return {
        ...state,
        pokes: sortedArr,
      };

    default:
      return state;
  }
}

export default rootReducer;
