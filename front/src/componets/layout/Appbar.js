import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DrawerCart from '../drawerCart/DrawerCart';
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../features/taskSlices'
import { loginWithGoogle, logOut } from '../../firebase/firebase';


const ResponsiveAppBar = () => {
  
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.cartStore.user)

  const login = async () => {
    await loginWithGoogle()
  };

  const clearUser = async () =>{
    await logOut()
    dispatch(deleteUser())
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

            {/* Despliega "el Bichito" desde medium  */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            {/* Despliega "Logo" desde medium  */}

            
              <Typography
              variant="h6"
              noWrap
              sx={{
                flexGrow:1,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
              
              
              >
              <NavLink to='/' style={{textDecoration: 'none', color:'white'}}>
                LOGO
              </NavLink>
          
              </Typography>
            {/* Relativo al botón hamburguesa */}
            
             
            
            {/* Despliega "el Bichito" en pantalla xs hasta medium  */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            
            {/* Despliega "Logo" en pantalla xs hasta medium  */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: {xs:'-1', sm:'.3rem'},
              color: 'inherit',
              textDecoration: 'none',
              fontSize:20,
            }}
          >
            <NavLink to='/' style={{textDecoration: 'none', color:'white'}}>
            LOGO
            </NavLink>
          </Typography>

      
            <>
              < DrawerCart />

              {/* ícono de usuario */}
              <Box sx={{ flexGrow: 0 }}>

                {/* Llama al ínoco de usuario  */}
              
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar 
                    alt= "I" 
                    src= { user? user.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }  />
                  </IconButton>
                </Tooltip>
                        
                {/* Las opciones dentro del ícono de usuario */}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  
                  {
                    user ?
                    <Box>

                      <NavLink to="/myOrders" style={{textDecoration:'none', color:'rgba(0, 0, 0, 0.87)'}}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">My Orders</Typography>
                        </MenuItem>
                      </NavLink>

                      {user.rol == 'admin'  &&
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" onClick={()=>{ navigate('/dashboard') }}>Dashboard</Typography>
                        </MenuItem>
                      }

                      <MenuItem onClick={()=>{clearUser();handleCloseUserMenu()}}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>

                    </Box>
                    :
                    <Box>
                      <MenuItem onClick={()=>{login(); handleCloseUserMenu()}}>
                        <Typography textAlign="center">
                          Login with Google
                        </Typography>
                      </MenuItem>
                    </Box>
                  }
            
                </Menu>
              </Box>
            </>
     

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
