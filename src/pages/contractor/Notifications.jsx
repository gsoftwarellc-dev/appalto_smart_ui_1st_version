import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Bell, Clock, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const Notifications = () => {
    // Mock Notifications
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New tender uploaded: 'Facade Renovation - Milan'.", time: "2 hours ago", type: "info", read: false },
        { id: 2, message: "Your bid for 'Roof Renovation' is now under review.", time: "1 day ago", type: "warning", read: false },
        { id: 3, message: "Tender 'Garden Maintenance' was awarded to another contractor.", time: "2 days ago", type: "alert", read: true },
        { id: 4, message: "System maintenance scheduled for Sunday at 02:00 AM.", time: "3 days ago", type: "info", read: true },
    ]);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                    <p className="text-gray-500">Manage your alerts and messages.</p>
                </div>
                <Button variant="outline" size="sm" onClick={markAllRead} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Mark all as read
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-gray-500" /> Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                        {notifications.map((notif) => (
                            <div key={notif.id} className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                                <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 
                                    ${notif.type === 'info' ? 'bg-blue-100 text-blue-600' :
                                        notif.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-red-100 text-red-600'}`}>
                                    {notif.type === 'info' ? <Info className="h-4 w-4" /> :
                                        notif.type === 'warning' ? <AlertCircle className="h-4 w-4" /> :
                                            <AlertCircle className="h-4 w-4" />}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className={`text-sm text-gray-900 ${!notif.read ? 'font-semibold' : ''}`}>
                                        {notif.message}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <Clock className="h-3 w-3" />
                                        <span>{notif.time}</span>
                                        {!notif.read && (
                                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                                New
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Notifications;
