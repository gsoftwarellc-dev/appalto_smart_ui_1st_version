import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Search, FileText, Download, Loader2 } from 'lucide-react';
import BackendApiService from '../../services/backendApi';

const DocumentManagement = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            setLoading(true);
            // Fetch documents from backend
            const docs = await BackendApiService.getDocuments();
            setDocuments(docs || []);
            setError(null);
        } catch (error) {
            console.error("Failed to load documents", error);
            setError("Failed to load documents.");
            // Use fallback empty array
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (docId, fileName) => {
        try {
            const blob = await BackendApiService.downloadDocument(docId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download document", error);
            alert("Failed to download document.");
        }
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.tender_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.contractor_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || doc.type === typeFilter;
        return matchesSearch && matchesType;
    });

    if (loading) return (
        <div className="p-8 text-center flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('admin.documentManagement.title')}</h2>
                <p className="text-gray-500">{t('admin.documentManagement.subtitle')}</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

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
                    {['All', 'BOQ', 'Bid', 'Contract', 'Other'].map((type) => (
                        <Button
                            key={type}
                            variant={typeFilter === type ? 'default' : 'outline'}
                            onClick={() => setTypeFilter(type)}
                            className="w-24"
                        >
                            {type === 'All' ? t('admin.documentManagement.types.all') :
                                type === 'BOQ' ? t('admin.documentManagement.types.boq') :
                                    type}
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
                    {filteredDocuments.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            {searchTerm || typeFilter !== 'All'
                                ? 'No documents match your filters.'
                                : 'No documents uploaded yet.'}
                        </div>
                    ) : (
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
                                            {doc.name || 'Unnamed Document'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={doc.type === 'BOQ' ? 'secondary' : 'outline'}>
                                                {doc.type || 'Other'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">{doc.tender_title || '-'}</TableCell>
                                        <TableCell>{doc.contractor_name || '-'}</TableCell>
                                        <TableCell>{doc.created_at ? new Date(doc.created_at).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell>{doc.size || '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => handleDownload(doc.id, doc.name)}
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default DocumentManagement;
