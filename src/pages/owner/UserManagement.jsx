import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/Table";

const UserManagement = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('clients'); // 'clients' or 'contractors'
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data - Clients
    const [clients, setClients] = useState([
        { id: 1, name: "Condominio Roma 1", type: "Condominium Admin", email: "admin@roma1.com", status: "Active", tenders: 3 },
        { id: 2, name: "Studio Tecnico Bianchi", type: "Delegated Technician", email: "tech@bianchi.it", status: "Active", tenders: 5 },
        { id: 3, name: "Condominio Milano Central", type: "Condominium Admin", email: "admin@milano.it", status: "Suspended", tenders: 1 },
    ]);

    // Mock Data - Contractors
    const [contractors, setContractors] = useState([
        { id: 101, name: "Rossi Costruzioni SRL", category: "General Construction", email: "info@rossi.it", verified: true, status: "Active", credits: 150 },
        { id: 102, name: "Impianti Verdi SPA", category: "Electrical", email: "contact@verdi.it", verified: true, status: "Active", credits: 40 },
        { id: 103, name: "Mario Rossi Ditta", category: "Plumbing", email: "mario@rossi.it", verified: false, status: "Pending", credits: 0 },
    ]);

    const handleAction = (id, listType, action) => {
        const updater = listType === 'clients' ? setClients : setContractors;
        updater(prev => prev.map(item => {
            if (item.id === id) {
                if (action === 'block') return { ...item, status: 'Suspended' };
                if (action === 'activate') return { ...item, status: 'Active' };
                if (action === 'verify') return { ...item, verified: true, status: 'Active' };
            }
            return item;
        }));
        alert(`User ${action}ed successfully`);
    };

    const filteredList = (activeTab === 'clients' ? clients : contractors).filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('owner.users.title')}</h2>
                <p className="text-gray-500">{t('owner.users.subtitle')}</p>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{t('owner.users.totalUsers')}</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{clients.length + contractors.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{t('owner.users.pendingVerifications')}</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{contractors.filter(c => !c.verified).length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{t('owner.users.suspendedUsers')}</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {clients.filter(c => c.status === 'Suspended').length + contractors.filter(c => c.status === 'Suspended').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('clients')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'clients' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {t('owner.users.clients')}
                            </button>
                            <button
                                onClick={() => setActiveTab('contractors')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'contractors' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {t('owner.users.contractors')}
                            </button>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder={t('owner.users.searchPlaceholder')}
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
                                <TableHead>{t('owner.users.name')}</TableHead>
                                <TableHead>{activeTab === 'clients' ? t('owner.users.type') : t('owner.users.category')}</TableHead>
                                <TableHead>{t('owner.users.email')}</TableHead>
                                <TableHead>{t('owner.users.status')}</TableHead>
                                <TableHead>{activeTab === 'clients' ? t('owner.users.activeTenders') : t('owner.users.credits')}</TableHead>
                                <TableHead className="text-right">{t('owner.users.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredList.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {activeTab === 'contractors' && !user.verified && (
                                                <AlertTriangle className="h-4 w-4 text-amber-500" title="Pending Verification" />
                                            )}
                                            {user.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{activeTab === 'clients' ? user.type : user.category}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'destructive'}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{activeTab === 'clients' ? user.tenders : user.credits}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {activeTab === 'contractors' && !user.verified && (
                                            <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-50" onClick={() => handleAction(user.id, 'contractors', 'verify')}>
                                                <CheckCircle className="h-4 w-4 mr-1" /> {t('owner.users.verify')}
                                            </Button>
                                        )}
                                        {user.status !== 'Suspended' ? (
                                            <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => handleAction(user.id, activeTab, 'block')}>
                                                {t('owner.users.block')}
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50" onClick={() => handleAction(user.id, activeTab, 'activate')}>
                                                {t('owner.users.activate')}
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserManagement;
