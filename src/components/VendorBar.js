import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { getVendors } from '../utils/VendorApi';
import './VendorBar.css';
import VendorBarItem from './VendorBarItem';
import SearchForm from './SearchForm/SearchForm';
import { SHOP_ROUTE } from '../utils/consts';
import { useLocation } from 'react-router-dom';

const VendorBar = observer(() => {
  
  const { product } = useContext(Context);
  const location = useLocation()
  const isShop = location.pathname === SHOP_ROUTE

  useEffect(() => {
    getVendors()
    .then(data => product.setVendors(data))
    .catch(err => console.log(err))
  })

  const selectVendorBar = (id, name) => {
    product.setSelectedVendor({id: id, name: name});
  }

  return (
    <>
      <div className='vendor-bar' >
        <div className={`vendor-bar__item ${product.selectedVendor.id ? '' : 'vendor-bar__selected'}`} onClick={() => product.setSelectedVendor({id: '', name: ''})}>
          Все продавцы
        </div>
        {Object.keys(product.vendors).map(vendor => 
          <VendorBarItem
            onClick={() => selectVendorBar(vendor, product.vendors[vendor])
            }
            id={vendor}
            key={vendor}
            name={product.vendors[vendor]}
            selectVendorBar={selectVendorBar}
          />
        )}
      </div>
      {
        isShop ? <SearchForm /> : ''
      }
    </>
    
  );

});

export default VendorBar;