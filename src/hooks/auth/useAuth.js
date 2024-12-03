import { supabase } from '../../api/supabase/supabase';
import { fetchUserInfoById, requestLogin } from '../../api/user/auth';
import { useNavigate } from 'react-router-dom';
import useSignUp from './useSignUp';
import useAuthUserStore from '../../stores/useAuthUserStore';

const useAuth = () => {
  const { setAuthUser, clearAuthUser } = useAuthUserStore((state) => state);
  const navigate = useNavigate();

  const login = async (credentials) => {
    const { id, email } = await requestLogin(credentials);
    const { user_name: userName, profile_image: profileImage } =
      await fetchUserInfoById(id);
    setAuthUser({ id, email, userName, profileImage });
    navigate('/');
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    clearAuthUser();
    navigate('/');
  };

  const signUpMutation = useSignUp();

  return { login, logout, signUpMutation };
};

export default useAuth;
