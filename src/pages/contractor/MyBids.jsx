import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { FileText, Eye } from 'lucide-react';

const MyBids = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('All');

    // Mock Bids Data
    const bids = [
        { id: 1, tender: "Roof Renovation - Via Roma 5", amount: 15000, submitted: "2026-01-20", status: "Under Review" },
        { id: 2, tender: "Garden Cleaning - Piazza Verdi", amount: 2500, submitted: "2026-01-05", status: "Awarded" },
        { id: 3, tender: "Electrical Upgrade - Via Napoli", amount: 4800, submitted: "2026-01-28", status: "Not Selected" },
        { id: 4, tender: "Plumbing Fix - Torino", amount: 3200, submitted: "2026-01-29", status: "Submitted" },
    ];

    const filteredBids = activeTab === 'All' ? bids : bids.filter(bid => {
        if (activeTab === 'Pending') return ['Submitted', 'Under Review'].includes(bid.status);
        if (activeTab === 'Won') return bid.status === 'Awarded';
        if (activeTab === 'Lost') return bid.status === 'Not Selected';
        return true;
    });

    const tabs = ['All', 'Pending', 'Won', 'Lost'];

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Awarded': return 'success';
            case 'Not Selected': return 'destructive';
            case 'Under Review': return 'warning';
            default: return 'secondary'; // Submitted
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{t('contractor.myBids')}</h2>

            {/* Tabs */}
            <div className="flex space-x-2 border-b border-gray-200 pb-1">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab
                                ? 'bg-white border text-blue-600 border-b-white -mb-px relative z-10'
                                : 'text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100'
                            }`}
                        style={{ borderBottomColor: activeTab === tab ? 'white' : undefined }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <Card className="border-t-0 rounded-tl-none">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tender</TableHead>
                                <TableHead>Submission Date</TableHead>
                                <TableHead>Bid Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBids.map((bid) => (
                                <TableRow key={bid.id}>
                                    <TableCell className="font-medium">{bid.tender}</TableCell>
                                    <TableCell>{bid.submitted}</TableCell>
                                    <TableCell>€{bid.amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(bid.status)}>
                                            {bid.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right flex justify-end gap-2">
                                        <Button variant="ghost" size="sm" asChild title="View Details">
                                            <Link to={`/contractor/tenders/${bid.id}`}>Details</Link>
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-1 h-8">
                                            <FileText className="h-3 w-3" /> PDF
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredBids.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-gray-400">
                                        No bids in this category.
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

export default MyBids;
