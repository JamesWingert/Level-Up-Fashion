import React from 'react';

import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header /> <div className="container mx-auto bg-base-100">{children}</div>
    </div>
  );
};

export default Layout;
