import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/cards";
import {
  filterCreate,
  filterPokeByType,
 
  getPokes,
  getTypes,
  orderBynameOrStrengh,
  reloadPoke,
} from "../../Redux/Actions/action";
import Paginado from "../../Components/Page/page";
import pokeB from "../../image/pokeB.png";
import style from "./home.module.css";


function Home() {
  const dispatch = useDispatch();

  const allPokemon = useSelector((state) => state.allPoke);
  const all = useSelector((state) => state.pokes);
  const types = useSelector((state) => state.types);





  const [pokeload, setPokeload] = useState(allPokemon.length ? true : false);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokePage, setPokepage] = useState(12);
  const inOfLastPoke = currentPage * pokePage.toString();
  const inOfFirstPoke = inOfLastPoke - pokePage.toString();
  const pokeCurrent = all.slice(inOfFirstPoke, inOfLastPoke) 
    // all !== "object" ? all.slice(inOfFirstPoke, inOfLastPoke) : all;

  console.log(all.slice(inOfLastPoke, inOfFirstPoke));
  const paginado = (numPag) => {
    setCurrentPage(numPag);
  };

  useEffect(() => {
    dispatch(getTypes());
    if (!pokeload) {
      dispatch(getPokes());
    }
  }, [pokeload, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [all.length, setCurrentPage]);

  const handlerClick = () => {
    dispatch(reloadPoke());
  };

  const handlerFilterCreate = (event) => {
    dispatch(filterCreate(event.target.value));
  };

  const handlerFilterByType = (event) => {
    dispatch(filterPokeByType(event.target.value));
  };

  const handlerSort = (event) => {
    dispatch(orderBynameOrStrengh(event.target.value));
    setCurrentPage(1);
    setOrder(`Orednado ${event.target.value}`);
  };

  // function handleChange(event) {
  //   setSearch(event.target.value.toLowerCase());
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   dispatch(getByPoke(search));
  // }

  return (
    <>
     
      <div className={style.home}>
        <div className={style.cards}>
          <div className={style.or}>
            <button
              onClick={(event) => {
                handlerClick(event);
              }}
            >
              <img src={pokeB} alt="pokebola" className={style.pokeB} />
            </button>
              <Paginado
                pokePage={pokePage}
                all={all.length}
                paginado={paginado}
                page={currentPage}
              />
            <div className={style.filter_sort}>
              <select onChange={(event) => handlerSort(event)}>
                <option value="normal">Normal </option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="High Attack">High Attack</option>
                <option value="Low Attack">Low Attack</option>
              </select>

              <select onChange={(event) => handlerFilterCreate(event)}>
                <option value="All"> All</option>
                <option value="Api"> Api</option>
                <option value="creado">Created</option>
              </select>

              <select
                className={style.filter_select}
                onChange={(event) => handlerFilterByType(event)}
              >
                <option value="All">All Types</option>
                {types.map((type) => (
                  <option value={type.name} key={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {pokeCurrent.length ? (
            <div>

              <Cards pokeCurrent={pokeCurrent} />

              <Paginado
                pokePage={pokePage}
                all={all.length}
                paginado={paginado}
                page={currentPage}
              />
            </div>
          ) : (
            <div className={style.loading}>
              <h1>loading...</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
