import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Mail, Bell, Edit, Send } from 'lucide-react';
import { Separator } from '../../components/ui/Separator';

const NotificationControl = () => {
    const { t } = useTranslation();

    const templates = [
        { id: 1, name: 'Welcome Email (Contractor)', subject: 'Welcome to Appalto Smart!', status: 'Active', updated: 'Jan 10, 2026' },
        { id: 2, name: 'Tender Invitation', subject: 'New Tender Opportunity in [Area]', status: 'Active', updated: 'Jan 12, 2026' },
        { id: 3, name: 'Payment Reminder', subject: 'Action Required: Pending Success Fee', status: 'Active', updated: 'Jan 05, 2026' },
        { id: 4, name: 'Award Notification', subject: 'Congratulations! You have been awarded [Project]', status: 'Active', updated: 'Jan 15, 2026' },
        { id: 5, name: 'Account Suspension', subject: 'Important Notice Regarding Your Account', status: 'Inactive', updated: 'Dec 20, 2025' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('owner.notifications.title')}</h2>
                <p className="text-gray-500">{t('owner.notifications.subtitle')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-blue-600" /> {t('owner.notifications.emailTemplates')}
                        </CardTitle>
                        <CardDescription>{t('owner.notifications.emailTemplatesDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {templates.map((template) => (
                                <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-gray-900">{template.name}</h4>
                                            <Badge variant={template.status === 'Active' ? 'success' : 'secondary'}>{template.status}</Badge>
                                        </div>
                                        <p className="text-sm text-gray-500">{t('owner.notifications.subject')}: {template.subject}</p>
                                        <p className="text-xs text-gray-400">{t('owner.notifications.lastUpdated')}: {template.updated}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">
                                            <Edit className="h-4 w-4 mr-2" /> {t('owner.notifications.edit')}
                                        </Button>
                                        <Button size="sm" variant="ghost" title="Send Test">
                                            <Send className="h-4 w-4 text-gray-400" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-amber-600" /> {t('owner.notifications.systemAlerts')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{t('owner.notifications.maintenanceMode')}</span>
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200">Inactive</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{t('owner.notifications.newUserAlerts')}</span>
                                <Button size="sm" variant="outline" className="text-green-600 border-green-200">Active</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{t('owner.notifications.riskAlerts')}</span>
                                <Button size="sm" variant="outline" className="text-green-600 border-green-200">Active</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-blue-900">{t('owner.notifications.emailStatus')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="font-bold text-blue-800">{t('owner.notifications.operational')}</span>
                            </div>
                            <p className="text-xs text-blue-700">99.9% delivery rate in last 24h.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NotificationControl;
