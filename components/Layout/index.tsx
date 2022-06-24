import React from 'react';

import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Header />
      <div className="h-fill bg-base-100">{children}</div>
    </div>
  );
};

export default Layout;
