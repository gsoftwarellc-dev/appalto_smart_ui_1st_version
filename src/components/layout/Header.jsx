import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Globe, LogOut, User, Bell, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const { t, i18n } = useTranslation();
    const [notifications] = useState(3); // Mock notification count

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'it' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center z-20 relative">
            <div className="flex items-center">
                <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
                    <Menu className="h-6 w-6" />
                </Button>
                {/* Title removed as per user request */}
            </div>

            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                        <Bell className="h-5 w-5" />
                        {notifications > 0 && (
                            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white animate-pulse"></span>
                        )}
                    </Button>
                </div>

                {/* Language Switcher */}
                <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="uppercase">{i18n.language}</span>
                </Button>

                {/* User Profile */}
                <div className="flex items-center space-x-2 border-l pl-4 border-gray-200">
                    <div className="flex flex-col text-right hidden sm:block">
                        <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                        <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                        <User className="h-5 w-5" />
                    </div>
                </div>

                {/* Logout */}
                <Button variant="ghost" size="sm" onClick={logout} title={t('common.logout')}>
                    <LogOut className="h-5 w-5 text-gray-500 hover:text-red-500" />
                </Button>
            </div>
        </header>
    );
};

export default Header;
