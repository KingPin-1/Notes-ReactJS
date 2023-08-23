import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

const Layout = () => {
    return (
        <div className="App">
            <Header title="React JS Blog" />
            <DataProvider>
                <Nav />
                <Outlet />
            </DataProvider>
            <Footer />
        </div>
    );
};

export default Layout;
