import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import { lazy, Suspense } from 'react';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'),
);
const NotFoundBlock = lazy(
  () =>
    import(
      /* webpackChunkName: "NotFoundBlock" */ './components/NotFoundBlock/index'
    ),
);

const App = () => {
  return (
    <Routes>
      <Route path="/pizza-shop/" element={<MainLayout />}>
        <Route path="/pizza-shop/" element={<Home />} />

        <Route
          path="/pizza-shop/cart"
          element={
            <Suspense fallback={<div>Loading cart page...</div>}>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="/pizza-shop/pizza/:id"
          element={
            <Suspense fallback={<div>Loading pizza page...</div>}>
              <FullPizza />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFoundBlock />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
