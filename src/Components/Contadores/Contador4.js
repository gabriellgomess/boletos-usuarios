import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/myContext";
import { DataGrid } from '@mui/x-data-grid';

function ParentComponent() {
const { usuarios } = useContext(MyContext);
const [processedData, setProcessedData] = useState(null);

useEffect(() => {
    let processedData = usuarios.reduce((acc, curr) => {
        const exist = acc.find(d => d.username === curr.username);
        if (exist) {
            exist.totalValue += parseInt(curr.value);
            if (curr.status === "Emitido o boleto") {
                exist.totalEmitted++;
            } else if (curr.status === "Boleto Recebido") {
                exist.totalReceived++;
            } else if (curr.status === "Boleto vencido") {
                exist.totalLate++;
            }
        } else {
            if(curr.username){                
               acc.push({
                id: Date.now(),
                username: curr.username,
                totalValue: parseInt(curr.value),
                totalEmitted: curr.status === "Emitido o boleto" ? 1 : 0,
                totalReceived: curr.status === "Boleto Recebido" ? 1 : 0,
                totalLate: curr.status === "Boleto vencido" ? 1 : 0,
            }); 
            }
            
        }
        return acc;
    }, []);

    processedData = processedData.map((data, index) => {
        return { ...data, id: index }
    });
    setProcessedData(processedData);
}, [usuarios])



return (
    <div>
        {processedData ? <DataTable data={processedData} /> : "Carregando..."}
    </div>
);

}

const DataTable = ({ data }) => {
const columns = [
{ field: 'username', headerName: 'Username', width: 150 },
{ field: 'totalValue', headerName: 'Valor Total', width: 150, type: 'number', valueFormatter: (params) => params.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
{ field: 'totalEmitted', headerName: 'Boletos Emitidos', width: 150 },
{ field: 'totalReceived', headerName: 'Boletos Recebidos', width: 150 },
{ field: 'totalLate', headerName: 'Boletos Atrasados', width: 150 },
];

return (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.id}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
    </div>
);

}

export default ParentComponent;
