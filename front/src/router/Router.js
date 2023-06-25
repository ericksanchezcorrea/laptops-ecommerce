import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import Principal from "../componets/pages/Principal";
import Layout from "../componets/layout/Layout";
import NotFound from "../componets/pages/NoFound";
import Laptop from "../componets/pages/Laptop";
import ScrollToTop from "../componets/ScrollToTop/ScrollToTop";
import Checkout from "../componets/pages/Checkout";
import Myorders from "../componets/pages/Myorders";
import Dashboard from '../componets/pages/Dashboard';
import Spinner from "../componets/spinner/Spinner";
import ProtectedRouter from "./ProtectedRouter";
import  saveUserInDb  from '../componets/common/saveUser/saveUser.js'
import { saveUser, setIsLoading } from '../features/taskSlices';
import { REACT_APP_BASE_URL } from '../config';


const Router = () =>{

const isLoading = useSelector(state => state.cartStore.isLoading)
const user = useSelector(state => state.cartStore.user)

const dispatch = useDispatch()

useEffect(() => {
  
  (async function(){
    onAuthStateChanged(auth, (usuario)=>{

        if(!usuario){
            dispatch(setIsLoading(false))
            dispatch(saveUser(null))            
        }else{
            (async function (){
                let rol = 'user'
                const role = await db(usuario.uid)
                if(role === 'admin') rol = 'admin'

                dispatch(saveUser({
                    email: usuario.email,
                    name: usuario.displayName,
                    image:usuario.photoURL,
                    uid:usuario.uid,
                    rol:rol
                }))
                dispatch(setIsLoading(false))
                saveUserInDb(`${REACT_APP_BASE_URL}/api/user/create`,{
                    email: usuario.email,
                    name: usuario.displayName,
                    image:usuario.photoURL,
                    uid:usuario.uid,
                    rol:rol
                })
            })()         
        }
    })
  })()
}, [dispatch])

if (isLoading) return <Spinner />
    
return(
    <BrowserRouter>
        <ScrollToTop />
        <Routes>     
            <Route path="/" element={<Layout />} >
                <Route index element={<Principal />} />              
                <Route path="laptop/:id" element={<Laptop />} />

                <Route element={<ProtectedRouter isAllowed={ !!user } /> } > 
                    <Route path="/checkout" element={<Checkout /> } />
                    <Route path="/myOrders" element={<Myorders /> } />
                </Route>

                <Route element={<ProtectedRouter isAllowed={ !!user && user.rol === 'admin' } /> } > 
                    <Route path="/dashboard" element={<Dashboard /> } />
                </Route> 

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
}
export default Router