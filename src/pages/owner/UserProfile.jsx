import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
    ArrowLeft, User, Mail, Building, Phone, Calendar, Ban, CheckCircle,
    FileText, DollarSign, TrendingUp, Loader2
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/Table";
import api from '../../services/backendApi';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, [id]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await api.getUserProfile(id);
            setProfile(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching user profile:', err);
            setError(err.response?.data?.message || t('admin.userProfile.loadError'));
        } finally {
            setLoading(false);
        }
    };

    const handleSuspend = async () => {
        if (!confirm(t('admin.userProfile.confirmSuspend'))) return;
        try {
            setActionLoading(true);
            await api.suspendUser(id);
            await fetchProfile();
            alert(t('admin.userProfile.suspendSuccess'));
        } catch (err) {
            alert(err.response?.data?.message || t('admin.userProfile.suspendError'));
        } finally {
            setActionLoading(false);
        }
    };

    const handleActivate = async () => {
        try {
            setActionLoading(true);
            await api.activateUser(id);
            await fetchProfile();
            alert(t('admin.userProfile.activateSuccess'));
        } catch (err) {
            alert(err.response?.data?.message || t('admin.userProfile.activateError'));
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-600 bg-red-50 rounded-lg">
                <p>Error: {error}</p>
                <Button variant="outline" onClick={() => navigate('/owner/users')} className="mt-4">
                    {t('admin.userProfile.back')}
                </Button>
            </div>
        );
    }

    const { user, stats, recent_activity, transactions } = profile;
    const isSuspended = user.status === 'suspended';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/owner/users')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('admin.userProfile.title')}</h2>
                        <p className="text-gray-500">{t('admin.userProfile.subtitle')}</p>
                    </div>
                </div>
                {isSuspended ? (
                    <Button onClick={handleActivate} disabled={actionLoading} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {t('admin.userProfile.activate')}
                    </Button>
                ) : (
                    <Button onClick={handleSuspend} disabled={actionLoading} variant="destructive">
                        <Ban className="h-4 w-4 mr-2" />
                        {t('admin.userProfile.suspend')}
                    </Button>
                )}
            </div>

            {/* User Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.userProfile.userInfo')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">{t('admin.userProfile.name')}</p>
                                <p className="font-medium">{user.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">{t('admin.userProfile.email')}</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>
                        {user.company_name && (
                            <div className="flex items-center gap-3">
                                <Building className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">{t('admin.userProfile.company')}</p>
                                    <p className="font-medium">{user.company_name}</p>
                                </div>
                            </div>
                        )}
                        {user.phone && (
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">{t('admin.userProfile.phone')}</p>
                                    <p className="font-medium">{user.phone}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">{t('admin.userProfile.memberSince')}</p>
                                <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-5 w-5" />
                            <div>
                                <p className="text-sm text-gray-500">{t('admin.userProfile.status')}</p>
                                <Badge variant={isSuspended ? 'destructive' : 'success'}>
                                    {isSuspended ? t('admin.userProfile.suspended') : t('admin.userProfile.active')}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {user.role === 'admin' ? (
                    <>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{t('admin.userProfile.stats.totalTenders')}</CardTitle>
                                <FileText className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_tenders || 0}</div>
                                <p className="text-xs text-gray-500">{stats.active_tenders || 0} {t('admin.userProfile.stats.activeSuffix')}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{t('admin.userProfile.stats.awardedTenders')}</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.awarded_tenders || 0}</div>
                            </CardContent>
                        </Card>
                    </>
                ) : user.role === 'contractor' ? (
                    <>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{t('admin.userProfile.stats.totalBids')}</CardTitle>
                                <FileText className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_bids || 0}</div>
                                <p className="text-xs text-gray-500">{stats.pending_bids || 0} {t('admin.userProfile.stats.pendingSuffix')}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{t('admin.userProfile.stats.wonBids')}</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.won_bids || 0}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{t('admin.userProfile.stats.credits')}</CardTitle>
                                <DollarSign className="h-4 w-4 text-purple-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.credits_balance || 0}</div>
                            </CardContent>
                        </Card>
                    </>
                ) : null}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{t('admin.userProfile.stats.totalSpent')}</CardTitle>
                        <DollarSign className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€{parseFloat(stats.total_spent || 0).toFixed(2)}</div>
                        <p className="text-xs text-gray-500">{stats.total_transactions || 0} {t('admin.userProfile.stats.txnSuffix')}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            {recent_activity && recent_activity.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.userProfile.recentActivity')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('admin.userProfile.table.title')}</TableHead>
                                    <TableHead>{t('admin.userProfile.table.type')}</TableHead>
                                    <TableHead>{t('admin.userProfile.table.status')}</TableHead>
                                    {user.role === 'contractor' && <TableHead>{t('admin.userProfile.table.amount')}</TableHead>}
                                    <TableHead>{t('admin.userProfile.table.date')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recent_activity.map((activity) => (
                                    <TableRow key={`${activity.type}-${activity.id}`}>
                                        <TableCell className="font-medium">{activity.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{activity.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge>{activity.status}</Badge>
                                        </TableCell>
                                        {user.role === 'contractor' && (
                                            <TableCell>€{parseFloat(activity.amount || 0).toFixed(2)}</TableCell>
                                        )}
                                        <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Transaction History */}
            {transactions && transactions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.userProfile.txnHistory')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('admin.userProfile.table.id')}</TableHead>
                                    <TableHead>{t('admin.userProfile.table.type')}</TableHead>
                                    <TableHead>{t('admin.userProfile.table.description')}</TableHead>
                                    <TableHead>{t('admin.userProfile.table.amount')}</TableHead>
                                    <TableHead>{t('admin.userProfile.table.status')}</TableHead>
                                    <TableHead>{t('admin.userProfile.table.date')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((txn) => (
                                    <TableRow key={txn.id}>
                                        <TableCell className="font-mono text-xs">#{txn.id}</TableCell>
                                        <TableCell>{txn.type}</TableCell>
                                        <TableCell className="max-w-xs truncate">{txn.description}</TableCell>
                                        <TableCell className="font-medium">€{parseFloat(txn.cash_amount || 0).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant={txn.status === 'Completed' ? 'success' : 'warning'}>
                                                {txn.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default UserProfile;
