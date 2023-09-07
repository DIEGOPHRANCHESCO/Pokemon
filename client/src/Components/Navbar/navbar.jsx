import { Link } from "react-router-dom/cjs/react-router-dom";
import style from "./navbar.module.css";
import Search from "../SearchBar/searchBar";








function Navbar({ handleChange, handleSubmit }) {
  return (
    <div className={style.nav}>
      <Search />

      <nav>
        <ul className={style.list}>
          <li className={style.list_item}>
            <Link to="/Home">POKÉMON</Link>
            <Link to="/Create">CREATE POKÉMON</Link>
          </li>
        </ul>
      </nav>
      {/*        
      <form onChange={handleChange} >
      <input placeholder="Busqueda" type="search" />
      <button type='submit' onClick={handleSubmit}> Buscar </button>
     </form>  
        */}
    </div>
  );
}

export default Navbar;
