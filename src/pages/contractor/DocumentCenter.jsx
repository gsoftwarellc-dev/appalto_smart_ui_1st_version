import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { FileText, Download, Calendar } from 'lucide-react';

const DocumentCenter = () => {
    // Mock Documents Data
    const documents = [
        { id: 1, name: "BOQ - Roof Renovation.pdf", type: "BOQ", date: "2026-01-20", size: "2.5MB" },
        { id: 2, name: "Bid Offer - Roof Renovation.pdf", type: "Bid", date: "2026-01-25", size: "1.2MB" },
        { id: 3, name: "BOQ - Garden Maintenance.pdf", type: "BOQ", date: "2026-01-15", size: "1.8MB" },
        { id: 4, name: "Bid Offer - Garden Maintenance.pdf", type: "Bid", date: "2026-01-18", size: "0.9MB" },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Document Center</h2>
            <p className="text-gray-500">Access all your downloaded BOQs and submitted bid documents.</p>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" /> All Documents
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Document Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => (
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

export default DocumentCenter;
