import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/myContext";

const Contador1 = () => {
    const {usuarios} = useContext(MyContext);
    const [contador, setContador] = useState(0);
    useEffect(() => {
        setContador(usuarios.length);
    }, [usuarios])
    return (
        <div>
            <h1>Total de Registros: {contador}</h1>
        </div>
    );
    }

export default Contador1;
