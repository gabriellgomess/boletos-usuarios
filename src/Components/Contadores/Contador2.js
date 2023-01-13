import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/myContext";
import collect from "collect.js";
import numeral from 'numeral';

const Contador2 = () => {
    const {usuarios} = useContext(MyContext);
    const [contador, setContador] = useState(0);
    
    useEffect(() => {
        
        setContador(collect(usuarios).sum('value'));
        console.log(contador);
    }, [usuarios])
    // Converter contador para moeda
    const contador_ptBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(contador);
    const countFormatted = "R$ "+numeral(contador_ptBR).format('0.0')+"K";

    return (
        <div>
            <h1>Valor total: {countFormatted}</h1>
        </div>
    );
    }

export default Contador2;
