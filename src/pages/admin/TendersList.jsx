import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { PlusCircle, Search, Calendar } from 'lucide-react';

const TendersList = () => {
    const { t } = useTranslation();

    // Mock Data (will be replaced by API call)
    const tenders = [
        { id: 1, title: "Roof Renovation - Via Roma 5", status: "Open", bids: 3, deadline: "2026-02-15" },
        { id: 2, title: "Elevator Maintenance - Via Milano 12", status: "Review", bids: 5, deadline: "2026-01-30" },
        { id: 3, title: "Garden Cleaning - Piazza Verdi", status: "Awarded", bids: 2, deadline: "2026-01-10" },
        { id: 4, title: "Electrical Upgrade - Via Napoli 8", status: "Open", bids: 0, deadline: "2026-03-01" },
    ];

    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold tracking-tight">{t('admin.tendersList')}</h2>
                <Link to="/admin/create-tender">
                    <Button className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        {t('admin.createTender')}
                    </Button>
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search tenders..." className="w-full pl-9" />
                </div>

                {/* Date Range Filter */}
                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        className="border-0 w-32 text-sm p-0 focus:ring-0"
                        placeholder="From"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        className="border-0 w-32 text-sm p-0 focus:ring-0"
                        placeholder="To"
                    />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Bids</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tenders.map((tender) => (
                                <TableRow key={tender.id}>
                                    <TableCell className="font-medium">{tender.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={tender.status === 'Open' ? 'success' : 'secondary'}>
                                            {tender.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{tender.bids}</TableCell>
                                    <TableCell>{tender.deadline}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link to={`/admin/tenders/${tender.id}`}>View</Link>
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

export default TendersList;
