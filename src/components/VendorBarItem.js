import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import React, { useContext, useState } from 'react';

const VendorBarItem = observer(({ id, name, selectVendorBar }) => {

  const { product } = useContext(Context);
  const [itemActive, setItemActive] = useState(false);

  const selectVendorBarItem = (id, name) => {
    selectVendorBar(id, name)
    setItemActive(!itemActive)
  }

  return (
    <div
      className={`vendor-bar__item ${product.selectedVendor.id === id ? 'vendor-bar__selected' : ''}`}
      onClick={() => selectVendorBarItem(id, name)
      }>
    {name}
    </div>
  );
});

export default VendorBarItem;