import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { getByPoke } from "../../Redux/Actions/action";
import style from "./searchBar.module.css"
import { Link } from "react-router-dom/cjs/react-router-dom";
const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handlerChangeInput = (event) => {
    event.preventDefault();
    setName(event.target.value.toLowerCase().replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "));
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (name !== "") {
      dispatch(getByPoke(name))
      setName("");
    }
  };

  return (
    <div>
      <form  onSubmit={(event) => handlerSubmit(event)}>
        <Link to="/Home">
        <input
         className={style.input_search }
          type="text"
          placeholder="Search Pokemon..."
          value={name}
          onChange={(event) => handlerChangeInput(event)}
        />
        </Link>

        <button  className={style.btn} type="submit">
          <i className="fas fa-search">Buscar</i>
        </button>
      </form>
    </div>
  );
};


export default Search