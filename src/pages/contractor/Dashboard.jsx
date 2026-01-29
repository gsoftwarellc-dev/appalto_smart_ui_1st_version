import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { FileText, Award, Clock, Bell, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Dashboard = () => {
    const { t } = useTranslation();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const stats = [
        { title: "Total Tenders", value: "12", icon: FileText, color: "text-blue-600" },
        { title: "Active Tenders", value: "3", icon: Clock, color: "text-blue-600" },
        { title: "Bids Submitted", value: "5", icon: CheckCircle, color: "text-green-600" },
        { title: "Awarded / Lost", value: "2 / 2", icon: Award, color: "text-gray-600" },
    ];

    const pieData = [
        { name: 'Won', value: 2, color: '#16a34a' },
        { name: 'Pending', value: 1, color: '#eab308' }, // Improved yellow
        { name: 'Not Selected', value: 2, color: '#ef4444' }, // Improved red
    ];

    const notifications = [
        { id: 1, message: "New tender uploaded: 'Facade Renovation - Milan'.", time: "2 hours ago", type: "info" },
        { id: 2, message: "Your bid for 'Roof Renovation' is now under review.", time: "1 day ago", type: "warning" },
        { id: 3, message: "Tender 'Garden Maintenance' was awarded to another contractor.", time: "2 days ago", type: "alert" },
    ];

    // Custom Label for Pie Chart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name }) => {
        const RADIAN = Math.PI / 180;
        // Position the label slightly outside the pie
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5 + 25;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">
                {`${name}: ${value}`}
            </text>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold tracking-tight">{greeting}, Contractor!</h2>
                <p className="text-gray-500">Welcome to your dashboard.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="md:col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Deadline Calendar & Bids Analysis Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Deadline Calendar */}
                <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Deadline Calendar</CardTitle>
                        <Calendar className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                <h3 className="font-semibold text-gray-900">February 2026</h3>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
                                <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {/* Padding for Feb 2026 starting on Sun (approx) - adjusting for demo visual */}
                                <div className="p-2"></div><div className="p-2"></div><div className="p-2"></div><div className="p-2"></div><div className="p-2"></div><div className="p-2"></div>
                                <div className="p-2">1</div>
                                {[...Array(28)].map((_, i) => {
                                    const day = i + 2;
                                    const isDeadline = [15, 20].includes(day);
                                    const isToday = day === 5;
                                    return (
                                        <div key={day} className={`p-2 rounded-full relative ${isToday ? 'bg-blue-100 font-bold text-blue-600' : ''} ${isDeadline ? 'cursor-pointer hover:bg-red-50' : ''}`}>
                                            {day}
                                            {isDeadline && <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></span>}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="pt-4 space-y-2">
                                <h4 className="text-sm font-medium text-gray-700">Upcoming Deadlines</h4>
                                <div className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                                        <span className="text-xs font-bold block">FEB</span>
                                        <span className="text-lg font-bold block leading-none">15</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Roof Renovation</p>
                                        <p className="text-xs text-gray-500">Via Roma 5</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                                        <span className="text-xs font-bold block">FEB</span>
                                        <span className="text-lg font-bold block leading-none">20</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Facade Painting</p>
                                        <p className="text-xs text-gray-500">Florence</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Bids Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80} // Thinner donut
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                    cornerRadius={8} // Modern rounded corners
                                    label={renderCustomizedLabel} // Custom label with Name: Value
                                    labelLine={true} // Show connector lines
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '14px', fontWeight: '500' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-gray-500" />
                        <CardTitle>Recent Activity</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="flex gap-3 items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className={`h-2 w-2 mt-2 rounded-full ${notif.type === 'info' ? 'bg-blue-400' : notif.type === 'warning' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                                <div>
                                    <p className="text-sm text-gray-800">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
