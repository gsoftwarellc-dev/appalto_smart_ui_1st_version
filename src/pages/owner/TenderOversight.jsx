import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
    Search,
    Filter,
    AlertTriangle,
    Eye,
    Trash2,
    Lock,
    Unlock,
    MoreHorizontal
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/Table";

const TenderOversight = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Enhanced Mock Data with Risk Flags
    const [tenders, setTenders] = useState([
        { id: 101, title: "Roof Renovation - Via Roma 5", client: "Condominio Roma 1", status: "Open", bids: 3, risk: "Low", created: "2026-01-15", deadline: "2026-01-30" },
        { id: 102, title: "Elevator Maintenance - Via Milano 12", client: "Studio Tecnico Bianchi", status: "Review", bids: 5, risk: "Medium", created: "2026-01-10", deadline: "2026-01-25" },
        { id: 103, title: "Garden Cleaning - Piazza Verdi", client: "Condominio Roma 1", status: "Awarded", bids: 2, risk: "Low", created: "2025-12-20", deadline: "2026-01-05" },
        { id: 104, title: "Facade Painting - Abandoned Project", client: "Condominio Napoli", status: "Stalled", bids: 0, risk: "High", created: "2025-11-01", deadline: "2025-11-16" },
        { id: 105, title: "Urgent Plumbing Repairs", client: "Mario Admin", status: "Open", bids: 12, risk: "Medium", created: "2026-01-28", deadline: "2026-02-12" }, // High bid count in short time
    ]);

    const handleAction = (id, action) => {
        if (action === 'delete') {
            if (window.confirm('Are you sure you want to force delete this tender? This action is logged.')) {
                setTenders(prev => prev.filter(t => t.id !== id));
            }
        } else if (action === 'close') {
            setTenders(prev => prev.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
        } else {
            alert(`Performing ${action} on tender #${id}`);
        }
    };

    const getRiskBadge = (risk) => {
        switch (risk) {
            case 'High': return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High Risk</Badge>;
            case 'Medium': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge>;
            default: return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Low</Badge>;
        }
    };

    const filteredTenders = tenders.filter(tender => {
        const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tender.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || tender.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tender Oversight</h2>
                <p className="text-gray-500">Monitor all platform tenders, detect risks, and intervene manually if required.</p>
            </div>

            {/* Risk Summary */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="bg-red-50 border-red-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-800">High Risk Tenders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-900">{tenders.filter(t => t.risk === 'High').length}</div>
                        <p className="text-xs text-red-700">Immediate attention needed</p>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-yellow-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-800">Stalled Tenders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-900">{tenders.filter(t => t.status === 'Stalled').length}</div>
                        <p className="text-xs text-yellow-700">Overdue > 30 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Active</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tenders.filter(t => ['Open', 'Review', 'Awarded'].includes(t.status)).length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Avg Bids/Tender</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(tenders.reduce((acc, t) => acc + t.bids, 0) / tenders.length).toFixed(1)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between item-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search title, client..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="w-40">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Open">Open</option>
                                    <option value="Review">Review</option>
                                    <option value="Awarded">Awarded</option>
                                    <option value="Stalled">Stalled</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Risk Level</TableHead>
                                <TableHead>Bids</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="text-right">Intervention</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTenders.map((tender) => (
                                <TableRow key={tender.id}>
                                    <TableCell className="font-mono text-xs">{tender.id}</TableCell>
                                    <TableCell className="font-medium">{tender.title}</TableCell>
                                    <TableCell>{tender.client}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{tender.status}</Badge>
                                    </TableCell>
                                    <TableCell>{getRiskBadge(tender.risk)}</TableCell>
                                    <TableCell>{tender.bids}</TableCell>
                                    <TableCell>{tender.deadline}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="ghost" title="View Details" onClick={() => handleAction(tender.id, 'view')}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" title="Force Close" onClick={() => handleAction(tender.id, 'close')}>
                                                <Lock className="h-4 w-4 text-amber-600" />
                                            </Button>
                                            <Button size="icon" variant="ghost" title="Delete" onClick={() => handleAction(tender.id, 'delete')}>
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
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

export default TenderOversight;
