import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Search, FileText, Download, Filter } from 'lucide-react';

const DocumentManagement = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    // Mock Documents Data
    const documents = [
        { id: 1, name: "BOQ_Roof_ViaRoma.pdf", type: "BOQ", tender: "Roof Renovation - Via Roma 5", contractor: "-", date: "2025-12-15", size: "2.4 MB" },
        { id: 2, name: "Bid_Roof_ViaRoma_Rossi.pdf", type: "Bid", tender: "Roof Renovation - Via Roma 5", contractor: "Giovanni Rossi", date: "2026-01-20", size: "1.8 MB" },
        { id: 3, name: "Bid_Roof_ViaRoma_Bianchi.pdf", type: "Bid", tender: "Roof Renovation - Via Roma 5", contractor: "Maria Bianchi", date: "2026-01-21", size: "1.9 MB" },
        { id: 4, name: "BOQ_Elevator_Milano.pdf", type: "BOQ", tender: "Elevator Maintenance - Via Milano 12", contractor: "-", date: "2026-01-05", size: "3.1 MB" },
        { id: 5, name: "Bid_Elevator_Rossi.pdf", type: "Bid", tender: "Elevator Maintenance - Via Milano 12", contractor: "Giovanni Rossi", date: "2026-01-22", size: "1.5 MB" },
    ];

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.tender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.contractor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || doc.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('admin.documentManagement.title')}</h2>
                <p className="text-gray-500">{t('admin.documentManagement.subtitle')}</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder={t('admin.documentManagement.searchPlaceholder')}
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'BOQ', 'Bid'].map((type) => (
                        <Button
                            key={type}
                            variant={typeFilter === type ? 'default' : 'outline'}
                            onClick={() => setTypeFilter(type)}
                            className="w-24"
                        >
                            {type === 'All' ? t('admin.documentManagement.types.all') :
                                type === 'BOQ' ? t('admin.documentManagement.types.boq') :
                                    t('admin.documentManagement.types.bid')}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">{t('admin.documentManagement.stats.total')}</div>
                            <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">{t('admin.documentManagement.stats.boqFiles')}</div>
                            <div className="text-2xl font-bold text-gray-900">{documents.filter(d => d.type === 'BOQ').length}</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">{t('admin.documentManagement.stats.bidDocs')}</div>
                            <div className="text-2xl font-bold text-gray-900">{documents.filter(d => d.type === 'Bid').length}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Documents Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('admin.documentManagement.table.name')}</TableHead>
                                <TableHead>{t('admin.documentManagement.table.type')}</TableHead>
                                <TableHead>{t('admin.documentManagement.table.tender')}</TableHead>
                                <TableHead>{t('admin.documentManagement.table.contractor')}</TableHead>
                                <TableHead>{t('admin.documentManagement.table.date')}</TableHead>
                                <TableHead>{t('admin.documentManagement.table.size')}</TableHead>
                                <TableHead className="text-right">{t('admin.documentManagement.table.action')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDocuments.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        {doc.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={doc.type === 'BOQ' ? 'secondary' : 'outline'}>
                                            {doc.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{doc.tender}</TableCell>
                                    <TableCell>{doc.contractor}</TableCell>
                                    <TableCell>{doc.date}</TableCell>
                                    <TableCell>{doc.size}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Download className="h-4 w-4" />
                                        </Button>
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

export default DocumentManagement;
