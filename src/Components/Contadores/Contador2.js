import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/myContext";
import collect from "collect.js";


const Contador2 = () => {
    const {usuarios} = useContext(MyContext);
    const [contador, setContador] = useState(0);
    const {dataInicial, dataFinal} = useContext(MyContext);
    const {filtrados, setFiltrados} = useContext(MyContext);
    
    useEffect(() => {
        const filteredUsers = usuarios.filter(user => {
            const userDate = new Date(user.dateCreated);  
            const dataInicialDate = new Date(dataInicial);
            const dataFinalDate = new Date(dataFinal);          
            return userDate >= dataInicialDate && userDate <= dataFinalDate;           
        });
    
        setContador(collect(filteredUsers).sum('value'));
        setFiltrados(filteredUsers);
    
        console.log("Filtro: ", filteredUsers);

    
    }, [usuarios, dataInicial, dataFinal])
    

    // Converter contador para moeda
    const contador_ptBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(contador);
    const countFormatted = contador_ptBR;

    return (
        <div>
            <h1>Valor total: {countFormatted}</h1>
        </div>
    );
    }

export default Contador2;
