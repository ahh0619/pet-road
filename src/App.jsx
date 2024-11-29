import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from '../src/styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './shared/Router';

const queryClient = new QueryClient();

const App = () => (
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

export default App;
