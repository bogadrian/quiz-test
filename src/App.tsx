import './App.scss';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './redux/store';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { ContainerMain } from './components/main/ContainerMain';
import { ErrorBoundary } from './components/Error/Error';

function App() {
  return (
    <div className="App" data-testid="app">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontSize: '3rem' }}
      />
      <Provider store={store}>
        <ErrorBoundary>
          <Header />
          <ContainerMain />
          <Footer />
        </ErrorBoundary>
      </Provider>
    </div>
  );
}

export default App;
