//5.0-importamos useEffect para hacer la llamada a la API cuando el documento este listo
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
//8.0.1-importamos axios parala consulta a la API
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({guardarMoneda,  guardarCriptomoneda }) => {
    //5.0-useState para el state para el listado de criptomonedas 
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    //5.0.1-validacion state para el listado de criptomonedas
    const[error, guardarError] = useState(false);

    //1.4-Utilizamos el hook useMoneda en el componente formulario importando los valores y las funciones 
    //2.1- le pasamos a State useMoneda un valor inicial 'Elige tu moneda' = label
    //2.2- le pasaamos el segundo valor que es un string vacio = stateInicial
    //2.3-Creamos un arreglo de monedas y se lo pasamos al stete useMoneda MONEDAS = opciones
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        
    ]
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);
   
    //4.1-Utilizamos el hook useCriptomoneda en el componente formulario importando los valores y las funciones
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);
    //5.2-Ejecutamos la llamada a la API con useEffectacion
    useEffect(() => {
        const consultarAPI = async () => {
            //5.2-Aqui llamamos a la API
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            //5.3-Realizamos la peticion a la API
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
             
        }
        consultarAPI();
    }, [criptomoneda, moneda]);
     

    //6.0-Cuando el usuario hace Submit en el formulario
    const cotizarMoneda = e => {
        e.preventDefault();
        //6.1-Validamos que ambos campos tengan un valor
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        //6.2-Si ambos campos tienen un valor limpiamos el error
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;
 