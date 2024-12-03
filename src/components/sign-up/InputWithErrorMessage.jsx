import { Input } from '../../styles/user/UserFormStyles';
import { ErrorMessage, Wrap } from '../../styles/user/InputWithErrorMessageStyles';

const InputWithErrorMessage = ({ inputData, register, error }) => {
  const { type, placeholder } = inputData;

  return (
    <Wrap>
      <Input type={type} placeholder={placeholder} {...register} />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </Wrap>
  );
};

export default InputWithErrorMessage;
