import useAuth from '../../hooks/auth/useAuth';
import useForm from '../../hooks/useForm';
import { Form, Input, SubmitButton } from '../../styles/user/UserFormStyles';

const initialValues = {
  email: '',
  password: '',
  passwordCheck: '',
  userName: '',
};

const UserForm = () => {
  const { values, handleInputChange } = useForm(initialValues);
  const { signUpMutation } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUpMutation.mutate(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="이메일"
        name="email"
        value={values['email']}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        placeholder="닉네임"
        name="userName"
        value={values['userName']}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        name="password"
        value={values['password']}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        placeholder="비밀번호 확인"
        name="passwordCheck"
        value={values['passwordCheck']}
        onChange={handleInputChange}
      />
      <SubmitButton type="submit">가입하기</SubmitButton>
    </Form>
  );
};

export default UserForm;
