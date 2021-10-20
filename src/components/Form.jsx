import React, {useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {obtainYearDifference, calculateBrand, calculateInsuranceType} from '../helper'

const Field = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const FormButton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Form = ({setResume, setLoading}) => {

    const [data, setData] = useState({
        brand: '',
        year: '',
        plan: ''
    });

    const [error, setError] = useState(false);

    //Extract state values
    const {brand, year, plan} = data;

    //Read data from form and place them in state
    const obtainInfo = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    //When the user press submit
    const handleSubmit = e => {
        e.preventDefault();

        if(brand.trim() === '' || year.trim() === '' || plan.trim() === ''){
            setError(true);
            return;
        }

        setError(false);

        //2000 base
        let result = 2000;
        //Obtain difference
        const difference = obtainYearDifference(year);
        //For each year subtract 3%
        result -= ((difference * 3) * result) / 100;

        //European 30%
        //American 15%
        //Asian 5%
        result = calculateBrand(brand) * result;
        //Vanilla 20%
        //Prime 50%
        const risePlan = calculateInsuranceType(plan);
        result = parseFloat(risePlan * result).toFixed(2);
        //Total
        setLoading(true);
        setTimeout(() => {
            //Erase spinner
            setLoading(false);

            //To main component
            setResume({
                quote: Number(result),
                data
            });
        }, 3000);
    }

    return (  
        <form
        onSubmit={handleSubmit}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}

            <Field>
                <Label>Marca</Label>
                <Select
                name="brand"
                value={brand}
                onChange={obtainInfo}
                >
                    <option value="">--SELECCIONE--</option>
                    <option value="americano">Americano</option>
                    <option value="asiático">Asiático</option>
                    <option value="europeo">Europeo</option>
                </Select>
            </Field>

            <Field>
                <Label>Modelo (Año)</Label>
                <Select
                name="year"
                value={year}
                onChange={obtainInfo}
                >
                    <option value="">--SELECCIONE--</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>

            <Field>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio" 
                    name="plan"
                    value="vanilla"
                    checked={plan === "vanilla"} 
                    onChange={obtainInfo}   
                /> Básico

                <InputRadio 
                    type="radio" 
                    name="plan"
                    value="prime"
                    checked={plan === "prime"}  
                    onChange={obtainInfo}      
                /> Prime
            </Field>

            <FormButton type="submit">Cotizar</FormButton>
        </form>
    );
}

Form.propTypes = {
    setResume: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired
}
 
export default Form;