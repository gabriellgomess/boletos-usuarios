import React, { useContext, useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import MyContext from "../../context/myContext";

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const GraficoBarras1 = () => {
    const {usuarios} = useContext(MyContext);
    const [data, setData] = useState({
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });

    useEffect(() => {
        setData({
            labels,
            datasets: [
              {
                label: 'Dataset 1',
                data: usuarios.map(usuario => usuario.dado1),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Dataset 2',
                data: usuarios.map(usuario => usuario.dado2),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          });
    }, [usuarios])
    return (
        <div>
            <Bar options={options} data={data} />;
        </div>
    );
}

export default GraficoBarras1;
