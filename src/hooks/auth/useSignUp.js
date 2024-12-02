import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../api/user/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('회원가입에 성공했습니다.');
      navigate('/login');
    },
    onError: (error) => {
      console.log('🚀 ~ useSignUp ~ error:', error);
      if (error.code === 'user_already_exists') {
        toast.error('이미 가입된 이메일입니다.');
      } else if (error.code === 'nickname_already_exists') {
        toast.error('이미 존재하는 닉네임입니다.');
      } else {
        toast.error(error.message);
      }
    },
  });

  return signUpMutation;
};

export default useSignUp;
