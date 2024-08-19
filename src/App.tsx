import { Route, Routes } from 'react-router-dom';
import NotFoundBlock from './components/NotFoundBlock';
import './scss/app.scss';
import Cart from './pages/Cart';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import FullPizza from './pages/FullPizza';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
};

export default App;
