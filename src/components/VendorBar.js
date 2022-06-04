import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ListGroup } from 'react-bootstrap';
import { Context } from '../index';
import { getVendors } from '../utils/VendorApi';
import './VendorBar.css';

const VendorBar = observer(() => {
  
  const { product } = useContext(Context);

  useEffect(() => {
    getVendors()
    .then(data => product.setVendors(data))
    .catch(err => console.log(err))
  })

  return (
    <ListGroup className='vendor-bar' >
      <ListGroup.Item action variant="light" className='vendor-bar__item' style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => product.setSelectedVendor({id: '', name: ''})}>
        Все продавцы
      </ListGroup.Item>
      {Object.keys(product.vendors).map(vendor => 
        <ListGroup.Item 
          action 
          variant="light"
          className='vendor-bar__item'
          active={vendor === product.selectedVendor.id}
          onClick={() => product.setSelectedVendor({id: vendor, name:product.vendors[vendor]})}
          key={vendor}>
          {product.vendors[vendor]}
        </ListGroup.Item>
        )}
    </ListGroup>
  );

});

export default VendorBar;