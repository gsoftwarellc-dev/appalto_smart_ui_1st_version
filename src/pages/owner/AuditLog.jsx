import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/backendApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Shield } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/Table";

const AuditLog = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const data = await api.getAuditLogs({ search: searchTerm });
            setLogs(data.data || []);
        } catch (error) {
            console.error('Failed to fetch audit logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchLogs();
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('owner.audit.title')}</h2>
                <p className="text-gray-500">{t('owner.audit.subtitle')}</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Shield className="h-5 w-5 text-gray-500" />
                            <CardTitle>{t('owner.audit.systemActivity')}</CardTitle>
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder={t('owner.audit.searchPlaceholder')}
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('owner.audit.timestamp')}</TableHead>
                                <TableHead>{t('owner.audit.action')}</TableHead>
                                <TableHead>{t('owner.audit.user')}</TableHead>
                                <TableHead>{t('owner.audit.details')}</TableHead>
                                <TableHead>{t('owner.audit.ip')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-xs text-gray-500">{new Date(log.created_at).toLocaleString()}</TableCell>
                                    <TableCell className="font-medium">{log.action}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-gray-50">{log.user?.name || 'System'}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-md truncate" title={log.details}>
                                        {log.details}
                                    </TableCell>
                                    <TableCell className="text-xs text-gray-500">{log.ip_address}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuditLog;
