import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Toolbar, IconButton, Container, Typography, Menu, MenuItem, Button, Tooltip, Avatar, Badge, Icon, styled, alpha } from "@mui/material";
// import { CartItem, useCart } from "../helpers/cartStore";
import { CartItem, useCart } from "../context/cartContext";
import { Add, VerticalAlignBottom } from "@mui/icons-material";
import { clear } from "@testing-library/user-event/dist/clear";
import InputBase from '@mui/material/InputBase';
import { useProduct } from "../context/productContext";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Navbar() {

const pages = [['/', 'Home'], ['/products', 'Products']];

const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(null);
  
  const { cartItems, addToCart, removeFromCart, clearCart}  = useCart();
  //const cartItems = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalSumPrice = cartItems.reduce((acc, item)=> acc + item.price * item.quantity, 0);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  const [searchItem, setSearchItem] = useState('');
  const [filteredCartItems, setFilteredCartItems] = useState('');
  
  const onChangeText = (event: any) => {
    const searchTerm = event.target.value;
    setSearchItem(searchTerm);

    filterProducts(searchTerm);
  }
  const {fetchedProducts, filterProducts} = useProduct();
  const products = fetchedProducts;

  pages.map(page => console.log(page))

  const anyItems = totalItems > 0 ? true : false;

  if (anyItems)
    var hr = <span><hr></hr></span>;
  else
    var hr = <span></span>;

return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar> 
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyShop
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
                 <MenuIcon />  
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}><Link to={page[0]}>{page[1]}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyShop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component = {Link} to={page[0]}
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[1]}
              </Button>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChangeText}
            />
          </Search>
          
          {/* shopping cart menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenCartMenu}
            >
              <Badge badgeContent={totalItems} color="error"> {/* replace with cart nr of items */}
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorElCart}
              open={Boolean(anchorElCart)}
              onClose={handleCloseCartMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {cartItems.map((cartItem: CartItem) => (
                <MenuItem /*onClick={handleCloseCartMenu}*/>
                <Typography>{cartItem.name} x {cartItem.quantity}</Typography>
                <AddIcon onClick={() => addToCart(cartItem)}></AddIcon>
                <RemoveIcon onClick={() => removeFromCart(cartItem)} ></RemoveIcon>
              </MenuItem>
              ))}
              {hr}
              <MenuItem>
                <Typography
                  style={{
                  verticalAlign: 'middle' 
                  }}
                >Total: {totalSumPrice.toFixed(2)}$
                </Typography>
              </MenuItem>      
              <MenuItem onClick={handleCloseCartMenu}>
                <Typography><Link to='/cart' style={{ textDecoration: 'none', color: 'webkit-link' }}>View Cart</Link></Typography>
              </MenuItem>
              <MenuItem onClick={() => clearCart()}>
									<Typography>Clear Cart</Typography>
              </MenuItem>
            </Menu>
          </Box>

      </Toolbar>
    </AppBar>
  </Box>
);
};

export default Navbar;
