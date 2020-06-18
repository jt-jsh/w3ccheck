import React, { useContext } from 'react';
import { W3C_Context } from '../contexts/W3C_Context';
import styled from 'styled-components';

const Form = ({w3cCheck}) => {
    
    const { checking } = useContext(W3C_Context);

    return (
        <React.Fragment>
            <TextArea id="w3c_area" placeholder="URL" readOnly={checking}/>
            <Button checking={checking} onClick={checking ? null : w3cCheck}>{checking ? 'CHECKING...' : 'START'}</Button>
        </React.Fragment>
    )
}

const TextArea = styled.textarea`
    width:100%;
    height:400px;
    resize: none;
    font-size:1em;
    font-family:"NanumSquare";
    border-radius: 5px;
    padding:15px;
    border-color: #ccc;
    vertical-align: top;
    font-family: initial;
    ${props => props.readOnly ? 'background: #fbfbfb' : null}
`;

const Button = styled.button`
    width:100%;
    line-height: 1;
    background: ${props => props.checking ? '#fbfbfb' : '#f33'};
    color: ${props => props.checking ? '#333' : '#fff'};
    font-size: 1em;
    font-weight:bold;
    padding: 20px;
    border-radius: 5px;
    margin-top:10px;
    vertical-align: top;
    overflow:hidden;
`;

export default Form;