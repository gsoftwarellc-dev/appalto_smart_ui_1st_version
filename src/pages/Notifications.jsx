import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Bell, FileCheck, MessageSquare, Award, FileText, AlertCircle } from 'lucide-react';

const Notifications = () => {
    const [notifications] = useState([
        {
            id: 1,
            type: 'bid',
            icon: FileCheck,
            title: 'New Bid Received',
            message: 'Giovanni Rossi submitted a bid for Roof Renovation - Via Roma 5',
            time: '2 hours ago',
            read: false,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            id: 2,
            type: 'tender',
            icon: FileText,
            title: 'Tender Published',
            message: 'Your tender "Facade Painting" has been published successfully',
            time: '5 hours ago',
            read: false,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
        {
            id: 3,
            type: 'message',
            icon: MessageSquare,
            title: 'New Message',
            message: 'Maria Bianchi sent you a message regarding Elevator Maintenance',
            time: '1 day ago',
            read: true,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
        {
            id: 4,
            type: 'award',
            icon: Award,
            title: 'Tender Awarded',
            message: 'Garden Maintenance has been awarded to Luca Verdi',
            time: '2 days ago',
            read: true,
            color: 'text-orange-600',
            bg: 'bg-orange-50'
        },
        {
            id: 5,
            type: 'urgent',
            icon: AlertCircle,
            title: 'Deadline Approaching',
            message: 'Tender "Elevator Maintenance - Via Milano 12" deadline is in 2 days',
            time: '3 days ago',
            read: true,
            color: 'text-red-600',
            bg: 'bg-red-50'
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                    <p className="text-gray-500">
                        {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-blue-600">
                        <Bell className="h-3 w-3 mr-1" /> {unreadCount} New
                    </Badge>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {notifications.map((notification) => (
                    <Card
                        key={notification.id}
                        className={`hover:shadow-md transition-all cursor-pointer ${!notification.read ? 'border-l-4 border-l-blue-600' : ''}`}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                <div className={`h-12 w-12 ${notification.bg} rounded-lg flex items-center justify-center shrink-0`}>
                                    <notification.icon className={`h-6 w-6 ${notification.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className={`font-semibold text-gray-900 ${!notification.read ? 'font-bold' : ''}`}>
                                            {notification.title}
                                        </h3>
                                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                            {notification.time}
                                        </span>
                                    </div>
                                    <p className={`text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {notification.message}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-2"></div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {notifications.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                    <p className="text-gray-500">You're all caught up! Check back later.</p>
                </div>
            )}
        </div>
    );
};

export default Notifications;
