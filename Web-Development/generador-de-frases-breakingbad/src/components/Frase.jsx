import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContenedorFrase = styled.div`
    padding: 3rem;
    border-radius: .5rem;
    background-color: #fff;
    max-width: 800px;

    @media (min-width: 992px){
        margin-top: 10rem;
    }

    h1{
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        position: relative;
        padding-left: 4rem;
        
        &::before{
            content: open-quote;
            font-size: 10rem;
            color: black;
            position: absolute;
            left: -1rem;
            top: -2rem;
        }
    }

    p{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 1.6rem;
        text-align: right;
        color: #666;
        margin-top: 2rem;
    }
`;

const Frase = ({frase}) => {

    const {author, quote} = frase;
    
    return (
        <ContenedorFrase>
            <h1>{author}</h1>
            <p>{quote}</p>
        </ContenedorFrase> 
    );
}
 
Frase.propTypes = {
    frase: PropTypes.object.isRequired
}

export default Frase;