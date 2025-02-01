
import { useSelector } from 'react-redux';
import {Outlet } from 'react-router-dom'
import Denied from '../pages/Denied';

function RequireAuth (){

    const {isLoggedIn} = useSelector((state)=>state.auth);

    return isLoggedIn ? <Outlet/> : <Denied/>
}

export default RequireAuth;