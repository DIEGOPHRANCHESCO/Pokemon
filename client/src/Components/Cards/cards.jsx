import Card from "../Card/card";
import style from "./cards.module.css";

function Cards({pokeCurrent}) {
  const pokeList = pokeCurrent;
 

  
  return (
    <div className={style.container}>
    
      {
      pokeList?.map(poke => (
        <Card
          key={poke.id}
          id={poke.id}
          name={poke.name}
          image={poke.image}
          type={poke.type}
          life={poke.life}
          attack={poke.attack}
          defense={poke.defense}
          speed={poke.speed}
          weight={poke.weight}
          height={poke.height}
        />
      ))}
    </div>
  );
}

export default Cards;
