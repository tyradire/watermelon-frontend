import { ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PRODUCT_ROUTE, FAVOURITES_ROUTE } from './utils/consts';
import Admin from './pages/Admin';
import Basket from './pages/Basket/Basket';
import Shop from './pages/Shop';
import Auth from './pages/Auth/Auth';
import ProductPage from './pages/ProductPage';
import Favourites from './pages/Favourites';
import NotFound from './pages/NotFound';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  },
  {
    path: FAVOURITES_ROUTE,
    Component: Favourites
  },
]

export const publicRoutes = [
  {
      path: SHOP_ROUTE,
      Component: Shop
  },
  {
      path: LOGIN_ROUTE,
      Component: Auth
  },
  {
      path: REGISTRATION_ROUTE,
      Component: Auth
  },
  {
      path: PRODUCT_ROUTE + '/:id',
      Component: ProductPage
  },
  {
      path: '*',
      Component: NotFound
  }
]