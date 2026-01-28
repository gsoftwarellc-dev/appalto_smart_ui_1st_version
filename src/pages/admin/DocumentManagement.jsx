import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Search, Download, FileText, Calendar, User } from 'lucide-react';

const DocumentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    // Mock Documents Data
    const allDocuments = [
        { id: 1, name: "BOQ - Roof Renovation.pdf", type: "BOQ", tender: "Roof Renovation - Via Roma 5", contractor: "N/A", date: "2026-01-15", size: "2.5MB" },
        { id: 2, name: "Bid Offer - Giovanni Rossi.pdf", type: "Bid", tender: "Roof Renovation - Via Roma 5", contractor: "Giovanni Rossi", date: "2026-01-20", size: "1.2MB" },
        { id: 3, name: "BOQ - Garden Maintenance.pdf", type: "BOQ", tender: "Garden Cleaning - Piazza Verdi", contractor: "N/A", date: "2026-01-10", size: "1.8MB" },
        { id: 4, name: "Bid Offer - Maria Bianchi.pdf", type: "Bid", tender: "Roof Renovation - Via Roma 5", contractor: "Maria Bianchi", date: "2026-01-21", size: "0.9MB" },
        { id: 5, name: "BOQ - Electrical Upgrade.pdf", type: "BOQ", tender: "Electrical Upgrade - Via Napoli", contractor: "N/A", date: "2026-01-12", size: "3.1MB" },
        { id: 6, name: "Bid Offer - Luca Verdi.pdf", type: "Bid", tender: "Electrical Upgrade - Via Napoli", contractor: "Luca Verdi", date: "2026-01-28", size: "1.5MB" },
    ];

    const types = ['All', 'BOQ', 'Bid'];

    const filteredDocuments = allDocuments.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.tender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.contractor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || doc.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Document Management</h2>
                <p className="text-gray-500">Access and manage all BOQs and contractor bid documents.</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">Total Documents</div>
                        <div className="text-3xl font-bold text-blue-600">{allDocuments.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">BOQ Files</div>
                        <div className="text-3xl font-bold text-purple-600">
                            {allDocuments.filter(d => d.type === 'BOQ').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">Bid Documents</div>
                        <div className="text-3xl font-bold text-green-600">
                            {allDocuments.filter(d => d.type === 'Bid').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="bg-gray-50">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by document, tender, or contractor..."
                                className="pl-9 bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex bg-white rounded-md border border-gray-300 p-1">
                            {types.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setTypeFilter(type)}
                                    className={`flex-1 px-6 py-1.5 text-sm font-medium rounded transition-colors ${typeFilter === type
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Documents Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Documents ({filteredDocuments.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Document Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Tender</TableHead>
                                <TableHead>Contractor</TableHead>
                                <TableHead>Upload Date</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead className="text-right">Action</TableHead>
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
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${doc.type === 'BOQ' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                                            }`}>
                                            {doc.type}
                                        </span>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{doc.tender}</TableCell>
                                    <TableCell>
                                        {doc.contractor !== 'N/A' && (
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <User className="h-3 w-3" />
                                                {doc.contractor}
                                            </div>
                                        )}
                                        {doc.contractor === 'N/A' && <span className="text-gray-400">—</span>}
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> {doc.date}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500 font-mono text-xs">{doc.size}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                            <Download className="h-4 w-4 mr-1" /> Download
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
