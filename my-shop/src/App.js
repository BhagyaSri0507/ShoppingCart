import './App.css';
import './styles/styles.css';
import HomePage from './Components/HomePage';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import ProductsListingPage from './Components/ProductListingPage';
import Login from './Components/Login';
import Register from './Components/Register';
import NotFoundPage from './Components/NotFoundPage';
import Header from './Components/Header';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  return (
    <div className="App">
       <Provider store={store}>
      <BrowserRouter>
      <Header></Header>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/products"  element={<ProductsListingPage/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/register"  element={<Register/>}/>
      <Route
      path="*"
      element={
        <NotFoundPage/>
      }
    />

      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
