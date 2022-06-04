import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import { getToken } from './utils/ApiAuth';
import Spinner from './components/Spinner/Spinner';
import Main from './components/Main';


const App = observer(() => {

  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getToken(jwt)
      .then((res) => {
        user.setUser(res);
        user.setEmail(res.email);
        user.setRole(res.role);
        user.setIsAuth(true);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
    } else setLoading(false);
  }, []);

  return (
    <BrowserRouter>
      { loading ? <Spinner /> : <Main /> }
    </BrowserRouter>
  );

});

export default App;
