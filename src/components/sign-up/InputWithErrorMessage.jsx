import styled from 'styled-components';
import { Input } from '../../styles/user/UserFormStyles';

const InputWithErrorMessage = ({ inputData, register, error }) => {
  const { type, placeholder } = inputData;

  return (
    <Wrap>
      <Input type={type} placeholder={placeholder} {...register} />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.p`
  font-size: 0.6rem;
  color: tomato;
  margin-top: 5px;
  padding-left: 5px;
  height: 0.6rem;
`;

export default InputWithErrorMessage;
