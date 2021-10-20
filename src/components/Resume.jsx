import React from 'react';
import PropTypes from 'prop-types';
import {firstCapitalize} from '../helper'
import styled from '@emotion/styled';

const ContainerResume = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Resume = ({data}) => {
    const {brand, year, plan} = data;

    if(brand === '' || year === '' || plan === '') return null;

    return ( 
        <ContainerResume>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {firstCapitalize(brand)} </li>
                <li>Modelo: {year} </li>
                <li>Plan: {firstCapitalize(plan)} </li>
            </ul>
        </ContainerResume> 
    );
}

Resume.propTypes = {
    data: PropTypes.object.isRequired
}
 
export default Resume;