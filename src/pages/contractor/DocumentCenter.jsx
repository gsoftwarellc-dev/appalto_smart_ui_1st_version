import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FileText, Download, Calendar, Loader2, Search, Filter, X } from 'lucide-react';
import BackendApiService from '../../services/backendApi';

const DocumentCenter = () => {
    const { t } = useTranslation();
    const [documents, setDocuments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterType, setFilterType] = React.useState('all');
    const [downloadingId, setDownloadingId] = React.useState(null);

    React.useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const data = await BackendApiService.getDocumentHistory();
                setDocuments(data);
            } catch (err) {
                console.error("Failed to fetch document history", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const getDocTypeColor = (type) => {
        if (type === 'boq_pdf') return 'bg-blue-50 text-blue-700';
        if (type === 'offer_pdf') return 'bg-green-50 text-green-700';
        return 'bg-gray-50 text-gray-700';
    };

    const getDocLabel = (type) => {
        if (type === 'boq_pdf') return t('contractor.documentCenter.types.boq');
        if (type === 'offer_pdf') return t('contractor.documentCenter.types.offer');
        return type;
    };

    const handleDownload = async (doc) => {
        try {
            setDownloadingId(doc.id);
            await BackendApiService.downloadDocument(doc.id, doc.original_filename || doc.filename);
        } catch (err) {
            console.error("Download failed", err);
            alert("Failed to download document.");
        } finally {
            setDownloadingId(null);
        }
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = (doc.original_filename || doc.filename).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' ||
            (filterType === 'boq' && doc.document_type === 'boq_pdf') ||
            (filterType === 'offer' && doc.document_type === 'offer_pdf');
        return matchesSearch && matchesType;
    });

    const clearFilters = () => {
        setSearchTerm('');
        setFilterType('all');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{t('contractor.documentCenter.title')}</h2>
            <p className="text-gray-500">{t('contractor.documentCenter.subtitle')}</p>

            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder={t('contractor.documentCenter.searchPlaceholder')}
                        className="pl-9 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex bg-white rounded-md border border-gray-200 p-1">
                    {['all', 'boq', 'offer'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${filterType === type
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {type === 'all' ? t('contractor.documentCenter.filters.all') : type === 'boq' ? t('contractor.documentCenter.filters.boq') : t('contractor.documentCenter.filters.offer')}
                        </button>
                    ))}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" /> {t('contractor.documentCenter.listTitle')}
                        {(searchTerm || filterType !== 'all') && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto text-red-600 hover:text-red-700 text-xs font-normal">
                                <X className="h-3 w-3 mr-1" /> {t('contractor.documentCenter.clearFilters')}
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('contractor.documentCenter.table.name')}</TableHead>
                                <TableHead>{t('contractor.documentCenter.table.type')}</TableHead>
                                <TableHead>{t('contractor.documentCenter.table.date')}</TableHead>
                                <TableHead>{t('contractor.documentCenter.table.size')}</TableHead>
                                <TableHead className="text-right">{t('contractor.documentCenter.table.action')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-blue-600" /></div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredDocuments.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        {doc.original_filename || doc.filename}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDocTypeColor(doc.document_type)}`}>
                                            {getDocLabel(doc.document_type)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> {doc.created_at?.split('T')[0]}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500 font-mono text-xs">{doc.formatted_size}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => handleDownload(doc)}
                                            disabled={downloadingId === doc.id}
                                        >
                                            {downloadingId === doc.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                            ) : (
                                                <Download className="h-4 w-4 mr-1" />
                                            )}
                                            {t('contractor.documentCenter.download')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!loading && filteredDocuments.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-gray-500 italic">
                                        {searchTerm || filterType !== 'all' ? t('contractor.documentCenter.noMatch') : t('contractor.documentCenter.empty')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default DocumentCenter;
