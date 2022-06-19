import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { getVendors } from '../utils/VendorApi';
import { getProducts } from '../utils/ProductApi';
import { getLikes } from '../utils/LikeApi';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {

  const {user} = useContext(Context);
  const {product} = useContext(Context);

  useEffect(() => {
    Promise.all([getVendors(), getProducts()])
    .then(([ vendors, products ]) => {
      product.setVendors(vendors);
      product.setProducts(products);
      product.setFiltredProducts(products);
      console.log(products)
    })
  }, [])

  useEffect(() => {
    if (!user.isAuth) return;
    getLikes()
    .then(likes => user.setLikes(likes))
    .catch(err => console.log(err))
  }, [user.isAuth])

  return (
    <Routes>
      {user.isAuth && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
      <Route to={SHOP_ROUTE} />
    </Routes>
  );
});

export default AppRouter;