import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`;

export const Title = styled.h1`
  font-weight: bold;
  padding-left: 20px;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

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
  gap: 12px;
  padding: 20px;
  border-radius: 8px;
`;
