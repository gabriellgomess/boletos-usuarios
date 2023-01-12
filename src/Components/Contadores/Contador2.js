import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/myContext";
import collect from "collect.js";

const Contador2 = () => {
    const {usuarios} = useContext(MyContext);
    const [contador, setContador] = useState(0);
    useEffect(() => {
        setContador(collect(usuarios).sum('value'));
    }, [usuarios])
    // Converter contador para moeda
    const contador_ptBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(contador);

    return (
        <div>
            <h1>Valor total: {contador_ptBR}</h1>
        </div>
    );
    }

export default Contador2;
