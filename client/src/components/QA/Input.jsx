import React from 'react';
import {
  InputContainer,
  LabelStyled,
  InputStyled,
  QuestionInput,
  UsernameInput,
  EmailInput
} from '../styles/QA/Input.styled';

const GenericInput = props => {
  return (
    <InputContainer>
      <LabelStyled htmlFor={props.htmlFor}>{props.label}</LabelStyled>
      {props.children}
      <InputStyled
        required={props.required}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        value={props.inputValue}
      />
    </InputContainer>
  );
};

export default GenericInput;
