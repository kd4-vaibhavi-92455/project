import React from 'react'
import {Route, BrowserRouter as Router, Routes, useLocation} from "react-router-dom"
import AdminLogin from './components/administrator/login/AdminLogin';
import Dashboard from './components/administrator/layout/Dashboard';
import './App.css'
import CategoryProductPage from './userinterface/screens/CategoryProductLayout/CategoryProductPage';
import CartPage from './userinterface/screens/CartLayout/CartPage';
import AccountPage from './userinterface/screens/CustomerAccount/AccountPage';
import SingleItemPage from './userinterface/screens/SingleItemLayout/SingleItemPage';
import { Home } from './userinterface/screens/HomePage/Home';
import NotFoundPage from './userinterface/screens/NotFoundPage';
import TopBar from './userinterface/usercomponents/header/TopBar';
import SubHeader from './userinterface/usercomponents/header/SubHeader';
import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Wishlist from './userinterface/screens/Wishlist/Wishlist';
import MyCode from './MyCode';
const App = () => {

  const Layout = ({ children }) => {
    const location = useLocation();
    // all props of location... important
    const isHomePage = location.pathname === "/";
  
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
      <div>
        {/* Always visible */}
        <TopBar/>
        {/* Visible only on Home Page */}
        <Box  sx={{ marginTop: "66px" }}>
        {isHomePage && !isMobile && <SubHeader />}
        </Box>
  
        {/* Main Content */}
        <div>{children}</div>
      </div>
    );
  };

  return (
    <Router>
     <Layout>
     <Routes>
        {/* login */}
        <Route element={<AdminLogin/>} path="/login" />
        <Route element={<Dashboard/>} path="/dashboard/*"/>
         {/*  other main routes  */}
        {/* <Route path="/" element={<div>Welcome to the App</div>} /> */}
        <Route path="*" element={<NotFoundPage/>} />
         {/*home  */}
        <Route path="/" element={<Home/>} />
        {/* <Route path="/categories/sub-categories" element={<CategoryProductPage/>} /> */}
        <Route path="/categories/sub-categories/:title?" element={<CategoryProductPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/account" element={<AccountPage/>} />
        <Route path="/item" element={<SingleItemPage/>} />
        <Route path="/code" element={<MyCode/>} />
      </Routes>
     </Layout>
    </Router>
  )
}

export default App;