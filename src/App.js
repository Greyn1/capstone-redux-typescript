import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Routes/Navigation';
import Home from './Routes/Home';
import Shop from './Routes/Shop';
import Authentication from './Routes/Authentication';
import Checkout from './Routes/Checkout';
import { setCurUser } from './Store/user/user.action';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './Utils/Firebase';

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListener((user)=>{
        //console.log(user);
        if(user){
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurUser(user));
    });

    return unsubscribe;
},[])

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index={true} element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
