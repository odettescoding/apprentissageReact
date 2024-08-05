import React from 'react'
import { useState } from 'react';
import "./main.css"
const Compteur = () => {
    const [compteur,setCompteur] = useState(5)
        const incrementer =  () =>{
            setCompteur(compteur + 1);
        };
        const decrementer = () =>{
            setCompteur(compteur - 1);
        };
    
  return (
    
    <div className='compteur'>
        
        <button className='btn btn-success' onClick={incrementer}>+</button>
        <p className={compteur<0 && "erreur"}>{compteur}</p>
        <button className='btn btn-danger' onClick={decrementer}>-</button>
    </div>
  )
}

export default Compteur