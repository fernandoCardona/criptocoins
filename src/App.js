import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
//8.3-Importamos axios en appj.js para la consulta a la API
import axios from 'axios';
//1.1-Creamos nuestro propio hook en la carpeta Hooks Para el formulario
import useMoneda from './hooks/useMoneda';
import Spinner from './components/Spinner';
 
 
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {
  //7.0- Creaamos el State para los calores de cotizaciones
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  //8.6-Creamos un state con el resultado dinamico de la consulta de la cotizacion 
  const [resultado, guardarResultado] = useState({});
  //8.7-Creamos un state con el error dinamico de la consulta de la cotizacion
  const [error, guardarError] = useState(false);
  //8.8-Creamos un state con el cargando dinamico de la consulta de la cotizacion
  const [cargando, guardarCargando] = useState(false);


//8.0-Creamos el useEffect 
useEffect(() => {
  //evitamos la ejecucion la primera vez al cargar

    //8.4-consultamos la API para obtener la cotizacion 
  const cotizarCriptomoneda = async () => {
    if(moneda === '')return;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const resultado = await axios.get(url);
    // mostrar el spinner
    guardarCargando(true);

    // ocultar el spinner y mostrar el resultado
    setTimeout(() => {

      // cambiar el estado de cargando
      guardarCargando(false);

      // guardar cotizacion
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda] );
    }, 3000);

  }
  cotizarCriptomoneda();
}, [moneda, criptomoneda]);  

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> :  <Cotizacion  resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen criptomonedas" />
      </div>
      <div> 
        <Heading>Cotiza CriptoCoins al instante</Heading>
        <Formulario guardarMoneda={guardarMoneda} guardarCriptomoneda={guardarCriptomoneda}/>
         {componente}
      </div>
    </Contenedor>
  );
}

export default App;
