// import Lan from '../../Components/image'
import React from 'react';
import { Link } from 'react-router-dom'
import style from './landing.module.css'


const Landing = () => {
  return (
   
      <div className={style.con} >
      <h1>PROYECTO INDIVIDUAL </h1>
      {/* <img  src={Lan.png} /> */}
      <Link to='/Home'>
        <button className={style.btn}>POKEMON</button>
      </Link>
    </div>
    
    
  )
}


export default Landing;