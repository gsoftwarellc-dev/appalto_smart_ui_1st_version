import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { PlusCircle, FileText, Users, Clock, FileCheck, Bell, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Dashboard = () => {
    const { t } = useTranslation();

    // Enhanced Mock Data
    const stats = [
        { title: "Total Tenders", value: "12", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Active Tenders", value: "5", icon: Clock, color: "text-green-600", bg: "bg-green-50" },
        { title: "Total Bids", value: "28", icon: FileCheck, color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Contractors", value: "24", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const recentTenders = [
        { id: 1, title: "Roof Renovation - Via Roma 5", status: "Open", bids: 3, deadline: "2026-02-15" },
        { id: 2, title: "Elevator Maintenance - Via Milano 12", status: "Review", bids: 5, deadline: "2026-01-30" },
        { id: 3, title: "Garden Cleaning - Piazza Verdi", status: "Awarded", bids: 2, deadline: "2026-01-10" },
    ];

    const recentActivity = [
        { id: 1, type: "bid", message: "New bid received from Giovanni Rossi for Roof Renovation", time: "2 hours ago", color: "text-blue-600" },
        { id: 2, type: "tender", message: "Facade Painting tender published successfully", time: "5 hours ago", color: "text-green-600" },
        { id: 3, type: "message", message: "New message from Maria Bianchi", time: "1 day ago", color: "text-purple-600" },
        { id: 4, type: "award", message: "Garden Maintenance awarded to Luca Verdi", time: "2 days ago", color: "text-orange-600" },
    ];

    // Pie Chart Data - Tender Status Distribution
    const pieChartData = [
        { name: 'Open', value: 5, color: '#10b981' },
        { name: 'Under Review', value: 4, color: '#f59e0b' },
        { name: 'Awarded', value: 2, color: '#3b82f6' },
        { name: 'Closed', value: 1, color: '#6b7280' },
    ];

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Open': return 'success';
            case 'Review': return 'warning';
            case 'Awarded': return 'default';
            default: return 'secondary';
        }
    };

    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('common.dashboard')}</h2>
                    <p className="text-gray-500">Overview of the entire tender management system</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Date Range Filter */}
                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <Input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                            className="border-0 w-32 text-sm p-0 focus:ring-0"
                            placeholder="From"
                        />
                        <span className="text-gray-400">-</span>
                        <Input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                            className="border-0 w-32 text-sm p-0 focus:ring-0"
                            placeholder="To"
                        />
                    </div>
                    <Link to="/admin/create-tender">
                        <Button className="flex items-center gap-2">
                            <PlusCircle className="h-4 w-4" />
                            {t('admin.createTender')}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">
                                        {stat.title}
                                    </p>
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                </div>
                                <div className={`h-12 w-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Tenders */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Tenders</CardTitle>
                        <Link to="/admin/tenders">
                            <Button variant="ghost" size="sm">View All</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Bids</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTenders.map((tender) => (
                                    <TableRow key={tender.id}>
                                        <TableCell className="font-medium">{tender.title}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(tender.status)}>
                                                {tender.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold">{tender.bids}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Tender Status Distribution Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tender Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Activity</CardTitle>
                    <Bell className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Link to="/admin/bids">
                            <Button variant="outline" className="w-full justify-start">
                                <FileCheck className="h-4 w-4 mr-2" /> Manage Bids
                            </Button>
                        </Link>
                        <Link to="/admin/contractors">
                            <Button variant="outline" className="w-full justify-start">
                                <Users className="h-4 w-4 mr-2" /> View Contractors
                            </Button>
                        </Link>
                        <Link to="/admin/messages">
                            <Button variant="outline" className="w-full justify-start">
                                <Bell className="h-4 w-4 mr-2" /> Check Messages
                            </Button>
                        </Link>
                        <Link to="/admin/documents">
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" /> View Documents
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
