import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Context } from '../../index';
import './SearchForm.css';



const SearchForm = observer(() => {

  const {product} = useContext(Context);

  const [productSearch, setProductSearch] = useState('');

  const submitSearch = (e) => {
    e.preventDefault();
    product.filterProducts(productSearch);
  }

  const cancelSearch = () => {
    setProductSearch('');
    product.filterProducts('');
  }

  return (
    <form onSubmit={e => submitSearch(e)} className='search-form'>
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
      />
      <button
        className='search-form__button'
        type='submit'
      >
      </button>
    </form>
  );
});

export default SearchForm;