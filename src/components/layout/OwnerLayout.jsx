import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import OwnerSidebar from './OwnerSidebar';

const OwnerLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <OwnerSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="flex-1 flex flex-col min-w-0">
                <Header onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6" onClick={closeSidebar}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default OwnerLayout;
