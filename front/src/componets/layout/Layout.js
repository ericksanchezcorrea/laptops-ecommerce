import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ResponsiveAppBar from './Appbar'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { ClearCart } from '../../features/taskSlices'

const Layout = () => {

const dispatch = useDispatch()

const location = useLocation()
const queryParams = new URLSearchParams(location.search);

const status = queryParams.get('status')

useEffect(() => {
    if(status === "approved") dispatch(ClearCart())
}, [status])


return(
    <>
        <ResponsiveAppBar/>
            <Outlet/>
        <Footer/>
    </>
)
}

export default Layout