import { Link } from "react-router-dom";
import style from "./card.module.css";


const Card = ({
  id,
  name,
  image,
  type,
  life,
  attack,
  defense,
  speed,
  weight,
  height,
}) => {


  const typesColors = {
    fire: style.fire,
    normal: style.normal,
    fighting: style.fighting,
    flying: style.flying,
    ground: style.ground,
    poison: style.poison,
    rock: style.rock,
    bug: style.bug,
    ghost: style.ghost,
    steel: style.steel,
    water: style.water,
    grass: style.grass,
    electric: style.electric,
    psychic: style.psychic,
    ice: style.ice,
    dragon: style.dragon,
    dark: style.dark,
    fairy: style.fairy,
    unknown: style.unknown,
    shadow: style.shadow,
  };

  return (
    <div className={style.container}>
      <span className={style.name}>{name}</span>
      <Link to={`/detail/${id}` }>
        <img src={image} alt="" className={style.img} />
      <div className={style.card_info}>
        {/* <span className={`${style.typetitle} ${typesColors[type[0]]}`}>
        </span> */}
          {type}
      </div>
      {/* <p>LIFE: {life}</p>
      <p>ATTACK: {attack}</p>
      <p>DEFENSE: {defense}</p>
      <p>SPEED: {speed}</p>
      <p>WEIGHT: {weight}</p>
    <p>HEIGHT: {height}</p> */}
    </Link>
    </div>
  );
};

export default Card;
