import './App.css';
import { Footer, Header, MainLayout } from '@layout';
import { ToastProvider } from './context/toast/ToastProvider';
import ToastContainer from './components/ui/toast/ToastContainer';

function App() {
  return (
    <ToastProvider>
      <Header />
      <MainLayout />
      <Footer />
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
