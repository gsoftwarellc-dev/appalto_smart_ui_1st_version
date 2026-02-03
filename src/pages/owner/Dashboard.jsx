import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { DollarSign, Shield, Users, AlertTriangle } from 'lucide-react';
import RevenueDashboard from './RevenueDashboard';

const Dashboard = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('owner.dashboard.title')}</h2>
                    <p className="text-gray-500">{t('owner.dashboard.subtitle')}</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('owner.dashboard.totalRevenue')}</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€45,231.00</div>
                        <p className="text-xs text-muted-foreground">+20.1% {t('owner.dashboard.lastMonth')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('owner.dashboard.verifiedUsers')}</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,350</div>
                        <p className="text-xs text-muted-foreground">+180 {t('owner.dashboard.newThisWeek')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('owner.dashboard.activeTenders')}</CardTitle>
                        <Shield className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">122</div>
                        <p className="text-xs text-muted-foreground">14 {t('owner.dashboard.waitingApproval')}</p>
                    </CardContent>
                </Card>
                {/* Risk Alerts Card removed as per request */}
            </div>

            <div className="pt-6 border-t border-gray-200">
                <RevenueDashboard embedded={true} />
            </div>
        </div>
    );
};

export default Dashboard;
