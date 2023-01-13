import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/myContext";
import { FormLabel, TextField, Card } from "@mui/material";


const DateFilter = () => {
    const { dataInicial, setDataInicial, dataFinal, setDataFinal } = useContext(MyContext);
    

    const handleDataInicialChange = (event) => {
        setDataInicial(event.target.value);
    };

    const handleDataFinalChange = (event) => {
        setDataFinal(event.target.value);
    };
   
    return (
        <Card sx={{padding: 3, marginTop: 3}}>
            <div className='container--nasc'>
                <FormLabel id="data-inicial"></FormLabel>
                <TextField name='data-inicial' type="date" variant="standard" onChange={(e)=>handleDataInicialChange(e)} />
            </div>
            <div className='container--nasc'>
                <FormLabel id="data-final"></FormLabel>
                <TextField name='data-final' type="date" variant="standard" onChange={(e)=> handleDataFinalChange(e)} />
            </div>
        </Card>
    )
}

export default DateFilter;