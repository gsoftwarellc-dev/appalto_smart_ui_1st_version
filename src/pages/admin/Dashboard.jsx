import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { PlusCircle, FileText, Users, Clock, FileCheck, Bell, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import BackendApiService from '../../services/backendApi';

const Dashboard = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        stats: { total_tenders: 0, active_tenders: 0, total_bids: 0, total_contractors: 0 },
        recent_tenders: [],
        pie_chart_data: []
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const dashboardData = await BackendApiService.getAdminDashboardStats();
            setData({
                stats: dashboardData?.stats || { total_tenders: 0, active_tenders: 0, total_bids: 0, total_contractors: 0 },
                recent_tenders: Array.isArray(dashboardData?.recent_tenders) ? dashboardData.recent_tenders : [],
                pie_chart_data: Array.isArray(dashboardData?.pie_chart_data) ? dashboardData.pie_chart_data : []
            });
            setError(null);
        } catch (error) {
            console.error("Failed to load admin dashboard data", error);
            setError(t('admin.dashboard.errorLoad'));
        } finally {
            setLoading(false);
        }
    };

    const statsCards = [
        { title: t('admin.dashboard.totalTenders'), value: data.stats?.total_tenders || 0, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
        { title: t('admin.dashboard.activeTenders'), value: data.stats?.active_tenders || 0, icon: Clock, color: "text-green-600", bg: "bg-green-50" },
        { title: t('admin.dashboard.totalBids'), value: data.stats?.total_bids || 0, icon: FileCheck, color: "text-purple-600", bg: "bg-purple-50" },
        { title: t('admin.dashboard.contractors'), value: data.stats?.total_contractors || 0, icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const getStatusVariant = (status) => {
        switch (status) {
            case 'published': return 'success';
            case 'draft': return 'warning';
            case 'closed': return 'secondary';
            default: return 'default';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'published': return t('admin.dashboard.status.open');
            case 'draft': return t('admin.dashboard.status.draft');
            case 'closed': return t('admin.dashboard.status.closed');
            default: return status;
        }
    };

    if (loading) return <div className="p-8 text-center flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;

    if (error) return (
        <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-red-600">{t('admin.dashboard.errorTitle')}</h3>
            <p className="text-gray-500">{error}</p>
            <Button variant="outline" className="mt-4" onClick={loadDashboardData}>{t('admin.dashboard.retry')}</Button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('admin.dashboard.title')}</h2>
                    <p className="text-gray-500">{t('admin.dashboard.subtitle')}</p>
                </div>
                <div className="flex items-center gap-3">
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
                {statsCards.map((stat, index) => (
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
                        <CardTitle>{t('admin.dashboard.recentTenders')}</CardTitle>
                        <Link to="/admin/tenders">
                            <Button variant="ghost" size="sm">{t('admin.dashboard.viewAll')}</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {data.recent_tenders.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('admin.list.title')}</TableHead>
                                        <TableHead>{t('admin.list.status')}</TableHead>
                                        <TableHead>{t('admin.list.bids')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.recent_tenders.map((tender) => (
                                        <TableRow key={tender.id}>
                                            <TableCell className="font-medium">{tender.title}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(tender.status)}>
                                                    {getStatusLabel(tender.status)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-semibold">{tender.bids}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <p>{t('admin.dashboard.noTenders')}</p>
                                <Link to="/admin/create-tender">
                                    <Button variant="link" className="mt-2">{t('admin.dashboard.createFirst')}</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Tender Status Distribution Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.dashboard.tenderStatusDist')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.pie_chart_data.filter(d => d.value > 0).length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={data.pie_chart_data.filter(d => d.value > 0)}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.pie_chart_data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[250px] flex flex-col items-center justify-center text-gray-400">
                                <FileText className="h-12 w-12 mb-2 opacity-20" />
                                <p>{t('admin.dashboard.noData')}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>


        </div>
    );
};

export default Dashboard;
