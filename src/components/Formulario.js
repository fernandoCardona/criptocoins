//5.0-importamos useEffect para hacer la llamada a la API cuando el documento este listo
import React, { useState ,useEffect } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
//8.0.1-importamos axios parala consulta a la API
import axios from 'axios';

const Boton = styled.input`
    width: 100%;
    margin-top: 20px;
    font-weight: bold;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    border-radius: 10px;
    color: #FFF;
    font-size: 20px;
    margin-bottom: 10px;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
    //5.0-useState para el state para el listado de criptomonedas 
    const[listacripto, guardarCriptomonedas] = useState([]);
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
    const [moneda, SelectMonedas ] = useMoneda('Elija la moneda', '', MONEDAS);
   
    //4.1-Utilizamos el hook useCriptomoneda en el componente formulario importando los valores y las funciones
     const [criptomoneda, SelectCripto] = useCriptomoneda('Elije tu CriptoMoneda', '', listacripto);
    //5.2-Ejecutamos la llamada a la API con useEffectacion
    useEffect(() => {
        const consultarAPI = async () => {
            //5.2-Aqui llamamos a la API
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            //5.3-Realizamos la peticion a la API
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
            //5.4-Transformamos la respuesta en JSON
            //const res = await resultado.json();
            //5.5-Extraemos el valor de la moneda y la criptomoneda
            //5.6-Convertimos el resultado en un string para que sea legible
            //5.7-Lo convertimos a float para que sea legible
            //5.8-Lo pasamos a una constante para que no cambie
            //5.9-Extraemos el valor de la criptomoneda
            //5.10-Extraemos el valor de la moneda
            //const resultadoFinal = res.DISPLAY[criptomoneda][moneda];
            //5.11-Mostramos el resultado en la consola
            //console.log(resultadoFinal);
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
//const [moneda, guardarMoneda] = useState();