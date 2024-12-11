import React from 'react';
/* import Header from './Header'; */
import Footer from './Footer';
import FloatingNavigation from '../navigation/FloatingNavigation';
import ScrollToTop from '../navigation/ScrollToTop';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-montserrat">
     {/*  <Header /> */}
      <FloatingNavigation />
      <main className="flex-grow">
        {children}
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Layout;
