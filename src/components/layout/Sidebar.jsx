import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    PlusCircle,
    List,
    FileText,
    CheckSquare,
    Briefcase,
    UserCircle,
    LogOut,
    Bell,
    FolderOpen,
    MessageSquare,
    Users,
    FileCheck
} from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const { t } = useTranslation();

    const adminLinks = [
        { to: '/admin', icon: LayoutDashboard, label: t('common.dashboard'), end: true },
        { to: '/admin/create-tender', icon: PlusCircle, label: t('admin.createTender') },
        { to: '/admin/tenders', icon: List, label: t('admin.tendersList') },
        { to: '/admin/bids', icon: FileCheck, label: 'Bid Management' },
        { to: '/admin/contractors', icon: Users, label: 'Contractors' },
        { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
        { to: '/admin/documents', icon: FolderOpen, label: 'Documents' },
        { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
        { to: '/admin/profile', icon: UserCircle, label: 'My Profile' },
    ];

    const contractorLinks = [
        { to: '/contractor', icon: LayoutDashboard, label: t('common.dashboard'), end: true },
        { to: '/contractor/tenders', icon: Briefcase, label: t('contractor.activeTenders') },
        { to: '/contractor/bids', icon: FileText, label: t('contractor.myBids') },
        { to: '/contractor/documents', icon: FolderOpen, label: 'Document Center' },
        { to: '/contractor/messages', icon: MessageSquare, label: 'Messages' },
        { to: '/contractor/notifications', icon: Bell, label: 'Notifications' },
        { to: '/contractor/profile', icon: UserCircle, label: 'My Profile' },
    ];

    const links = user?.role === 'admin' ? adminLinks : contractorLinks;

    return (
        <aside className="w-64 bg-white shadow-xl flex flex-col z-10 transition-all duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                <img src="/logo.jpg" alt="Appalto Smart" className="w-full h-auto rounded object-contain max-h-16" />
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )
                        }
                    >
                        <link.icon className="mr-3 h-5 w-5" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    {t('common.logout')}
                </button>
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 text-center">
                        &copy; 2026 Appalto Smart
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
