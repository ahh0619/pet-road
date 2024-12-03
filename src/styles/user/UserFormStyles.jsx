import styled from 'styled-components';

export const SubmitButton = styled.button`
  color: white;
  background-color: #ffad32;
  border: none;
  height: 30px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

export const Input = styled.input`
  border: 1px solid lightgray;
  border-radius: 8px;
  height: 30px;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
