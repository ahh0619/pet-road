import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from '../src/styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './shared/Router';
import { supabase } from './api/supabase/supabase';
import { useEffect } from 'react';
import useAuthUserStore from './stores/useAuthUserStore';

const queryClient = new QueryClient();

const App = () => {
  const { clearAuthUser } = useAuthUserStore((state) => state);
  // refresh token이 만료된 경우 전역 상태를 초기화합니다.
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        clearAuthUser();
      }
    };
    checkSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        draggable
        theme="light"
      />
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
