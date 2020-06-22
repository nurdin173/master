import React from 'react';
import Header from '../partials/Header/Header';
import Sidebar from '../partials/Sidebar/Sidebar';

const layout = ( { children } ) => (
    <div id="wrapper" className="forced">
        <Header />
        <Sidebar />
        {children}
    </div>
);

export default layout;

