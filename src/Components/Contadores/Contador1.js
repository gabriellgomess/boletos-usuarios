import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/myContext";

const Contador1 = () => {
    const {usuarios} = useContext(MyContext);
    const {dataInicial, dataFinal} = useContext(MyContext);
    const [contador, setContador] = useState(0);
    useEffect(() => {
    const filteredUsers = usuarios.filter(user => {
        const userDate = new Date(user.dateCreated);  
        const dataInicialDate = new Date(dataInicial);
        const dataFinalDate = new Date(dataFinal);          
        return userDate >= dataInicialDate && userDate <= dataFinalDate;           
    });
    setContador(filteredUsers.length);
    console.log("Filtro: ", filteredUsers);
}, [usuarios, dataInicial, dataFinal])
    return (
        <div>
            <h1>Total de Registros: {contador}</h1>
        </div>
    );
    }

export default Contador1;
