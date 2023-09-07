import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { IdPoke, cleanId, deletePoke } from "../../Redux/Actions/action";
import style from "./detail.module.css"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const poke = useSelector((state) => state.detail);

 
  const handlerDelete = () => {
    if(window.confirm("Are your sure?") === true) {
      dispatch(deletePoke(id) )
      alert("The pokemon has been eliminated")
     window.location.href="/Home"

    }
  }

   

  useEffect(() => {
    dispatch(IdPoke(id));  
    
    return () => {
     dispatch( cleanId())
    }
  }, [id]);

  return (
    <div className={style.contenedor}> 

      {poke.evolution === poke.evolution && poke.CREADO ? (
        <div>
          <img src={poke.image} alt="img" />
          <h1>{poke.name}</h1>
          <p>LIFE: {poke.life}</p>
          <p>ATTACK: {poke.attack}</p>
          <p>DEFENSE: {poke.defense}</p>
          <p>SPEED: {poke.speed}</p>
          <p>WEIGHT: {poke.weight}</p>
          <p>HEIGHT: {poke.height}</p>
          <p>TYPE: {poke.types }</p>
          {/* <p>SPECIE: {poke.specie}</p>
          <p>MOVES: {poke.moves}</p>
          <p>HAPPINESS: {poke.happiness}</p>
          <p>CATURE: {poke.capture}</p>
          <p>ABILITIES: {poke.abilities}</p>
          <p>HABITAT: {poke.habitat}</p>
          <p>GROWTH: {poke.growth}</p>
          <p>LOCATION:{poke.locations}</p>
          <p>DESCRIPTION: {poke.description}</p> */}
          <button id='btnDelete' className='btns' onClick={ handlerDelete } > Delete </button>
        </div>
      ) : (
        <>
          <div>
          <button id='btnDelete' className='btns' onClick={ handlerDelete } > Delete </button>
            <img src={poke.image} alt="img" />
            <h1>{poke.name}</h1>
            <p>SPECIE: {poke.species}</p>
            <p>TYPE: {poke.types}</p>
            <p>MOVES: {poke.moves}</p>
            <p>LIFE: {poke.life}</p>
            <p>ATTACK: {poke.attack}</p>
            <p>DEFENSE: {poke.defense}</p>
            <p>SPEED: {poke.speed}</p>
            <p>WEIGHT: {poke.weight}</p>
            <p>HEIGHT: {poke.height}</p>
            <p>HAPPINESS: {poke.happiness}</p>
            <p>CATURE: {poke.capture}</p>
            <p>ABILITIES: {poke.abilities}</p>
            <p>HABITAT: {poke.habitat}</p>
            <p>GROWTH: {poke.growth}</p>
            <p>LOCATION:{poke.locations}</p>
            <p>DESCRIPTION: {poke.description}</p>

            <div>
              {poke["evolutio"] === poke.name
                ? null
                : poke.evolution.map(
                    ({
                      name,
                      image,
                      life,
                      attack,
                      defense,
                      speed,
                      weight,
                      height,
                    }) => {
                      return (
                        <div key={id} > 
                          
                          <img src={image} alt="Detail Pokemon" />
                          <h1>{name}</h1>
                          <p>LIFE:{life}</p>
                          <p>ATTACK: {attack}</p>
                          <p> DEFENSE:{defense}</p>
                          <p>SPEED:{speed}</p>
                          <p>WEIGHT:{weight}</p>
                          <p>HEIGHT:{height}</p>
                        </div>
                      );
                    }
                  )}
            </div>
          </div> 

        </>
      )  
      // <h1>Loading...</h1>
      }

      <Link to="/home">
        <input type="button" value="Home" />
      </Link>
    </div>
  );
};

export default Detail;
