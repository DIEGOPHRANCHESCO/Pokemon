import React from "react";
import style from "./page.module.css"

const Paginado= ({ pokePage, all, paginado, page }) => {
  const numPag = [];

  for (let i = 0; i < Math.ceil(all/pokePage); i++) {
    numPag.push(i + 1);
  } 
 

  return (
    <nav>
      <ul className={style.pagination}>
        {
          numPag?.map(number => (
            <li key={number} style={{listStyle: "none"}}>
            
              <button className={style.buttons} style={ page === number ? {color:"white"  }: {}} onClick={()=>paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paginado;
