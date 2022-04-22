import React from 'react';
import styled from '@emotion/styled'; 

const MensajeError = styled.p`
    background-color: #b7322c;
    color: white;
    padding: 1rem;
    font-family: 'Bebas Neue', cursive;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 30px;
    text-align: center;
`;


const Error = ({mensaje}) => {
    return ( 
        <MensajeError>
            {mensaje}
        </MensajeError>
     );
}
 
export default Error;