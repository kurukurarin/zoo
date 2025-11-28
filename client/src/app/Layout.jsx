import { Outlet } from 'react-router-dom';
import React from 'react';
import Nav from '../widgets/Nav/Nav';
import ChatBot from '../widgets/ChatBot/ChatBot';  //ChatBot

export default function Layout() {
    return (
            <>
            <Nav />
                <main>
                    <Outlet />
                </main>
            <ChatBot />  {/* ChatBot */}
            </>
            );
}