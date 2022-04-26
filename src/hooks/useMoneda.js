import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled'; 


const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;
const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, opciones) => {
    //1.2- Creamos el state de nuestro custom hook useMoneda  
    const [state, actualizarState] = useState(stateInicial);;
    //2.1-label es igual a valor inicial que le pasamos a useMoneda en Formulario = 'Elige tu moneda'
    //2.2-stateInicial es igual al string vacio que le pasamos a useMoneda en el formulario 
    //2.3-opciones es igual al valor MONEDAS que le pasamos a useMoneda en el formulario opciones = MONDEAS
    const Seleccionar = () =>(
         
        <Fragment> 
            <Label>{label}</Label>
            <Select onChange={e=>actualizarState(e.target.value)} value={state}>
                <option value="">-- Seleccione --</option>
                
                {
                    //3.1-Hacemos un map de opciones para capturar los datos de la seleccion en componente Formulario
                }
                {
                    opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                    ))
                }
                
            </Select> 
        </Fragment>
    );

    //1.3- Retornamos el state y la funcion que actualiza el state
    return [state, Seleccionar, actualizarState];
}
 
export default useMoneda;

