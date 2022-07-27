import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import './SearchForm.css';

const SearchForm = observer(() => {

  const {product} = useContext(Context);

  const [productSearch, setProductSearch] = useState('');
  const [focusInput, setFocusInput] = useState(false);

  useEffect(() => {
    product.setFiltredProducts(product.products);
  }, [product.products])

  const submitSearch = (e) => {
    e.preventDefault();
    product.filterProducts(productSearch);
  }

  const cancelSearch = () => {
    setProductSearch('');
    product.filterProducts('');
  }

  return (
    <form onSubmit={e => submitSearch(e)} className={focusInput ? 'search-form search-form_focus' : 'search-form'}>
      <button
        className='search-form__cancel'
        type='button'
        onClick={cancelSearch}
      >x
      </button>
      <input 
        className="search-form__input" 
        type="text" 
        placeholder="Поиск ..."
        value={productSearch}
        onChange={e=>setProductSearch(e.target.value)}
        onFocus={e=>setFocusInput(true)}
        onBlur={e=>setFocusInput(false)}
      />
      <input
        className='search-form__button'
        type='submit'
        value=''
      >
      </input>
    </form>
  );
});

export default SearchForm;