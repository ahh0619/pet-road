import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/auth/useAuth';
import { useRef } from 'react';
import InputWithErrorMessage from './InputWithErrorMessage';
import { SignButton } from '../../styles/PubLoginStyle';
import { Form } from '../../styles/user/UserFormStyles';

const SignUpForm = () => {
  const { signUpMutation } = useAuth();
  const password = useRef();
  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  });

  const onSubmit = (newAuthUser) => {
    signUpMutation.mutate({ newAuthUser, setError });
  };

  password.current = watch('password');

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        clearErrors();
        handleSubmit(onSubmit)(e);
      }}
    >
      <InputWithErrorMessage
        inputData={{ type: 'email', placeholder: '이메일' }}
        register={register('email', {
          required: '필수 입력 값입니다.',
          validate: (value) =>
            /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
            '이메일 형식으로 입력해주세요.',
        })}
        error={errors.email}
      />
      <InputWithErrorMessage
        inputData={{ type: 'text', placeholder: '닉네임' }}
        register={register('userName', {
          required: '필수 입력 값입니다.',
        })}
        error={errors.userName}
      />
      <InputWithErrorMessage
        inputData={{ type: 'password', placeholder: '비밀번호' }}
        register={register('password', {
          required: '필수 입력 값입니다.',
          minLength: {
            value: 6,
            message: '비밀번호는 최소 6글자여야 합니다.',
          },
        })}
        error={errors.password}
      />
      <InputWithErrorMessage
        inputData={{ type: 'password', placeholder: '비밀번호 확인' }}
        register={register('passwordCheck', {
          required: '필수 입력 값입니다.',
          validate: (value) =>
            value === password.current || '비밀번호가 일치하지 않습니다.',
        })}
        error={errors.passwordCheck}
      />
      <SignButton>가입</SignButton>
    </Form>
  );
};

export default SignUpForm;
