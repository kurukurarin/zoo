import { Outlet } from 'react-router-dom';
import React from 'react';
import Nav from '../widgets/Nav/Nav';

export default function Layout() {
    return (
            <>
            <Nav />
                <main>
                    <Outlet />
                </main>
            </>
            );
}


