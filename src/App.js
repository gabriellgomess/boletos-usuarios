import React, { useState, useEffect } from 'react';
import MyContext from './context/myContext';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ListaUsuarios from './Pages/ListaUsuarios/ListaUsuarios';
import Home from './Pages/Home/Home';
import axios from 'axios';
import Header from './Components/Header/Header';

// Crie seu próprio tema:
const theme = createTheme({
  palette: {
    primary: {
      main: '#d27221',
    },
    secondary: {
      main: '#03a9f4',
    },
    error: {
      main: '#f44336',
    },
  },
  // typography: {
  //   fontFamily: [
  //     'Montserrat',
  //     'sans-serif',
  //   ].join(','),
  //   fontSize: 14,
  // },
});


const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [dataInicial, setDataInicial] = useState();
  const [dataFinal, setDataFinal] = useState();
  const [filtrados, setFiltrados] = useState([]);
  useEffect(() => {
    axios.get('https://www.grupofortune.com.br/integracao/softwareexpress/atualizacao/lista_boletos_user.php')
      .then(res => {
        setUsuarios(res.data);
      })
    const dataAtual = new Date();
    const dataAtualFormatada = dataAtual.toISOString().split('T')[0];
    setDataInicial(dataAtualFormatada);
    setDataFinal(dataAtualFormatada);
  }, []);


  return (
    <MyContext.Provider value={{usuarios, setUsuarios, dataInicial, setDataInicial, dataFinal, setDataFinal, filtrados, setFiltrados}}>
      <ThemeProvider theme={theme}>    
        {/* <CssBaseline /> */}
        <Header />
        <Container fixed>        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<ListaUsuarios />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </MyContext.Provider>

  )
}

export default App;
