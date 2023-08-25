import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="App">
            <Header title="React JS Blog" />
            <Nav />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
