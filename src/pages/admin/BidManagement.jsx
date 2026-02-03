import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Search, FileCheck, ChevronRight, ArrowLeft, Download, Eye } from 'lucide-react';

const BidManagement = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    // Mock Projects/Tenders Data with bid counts
    const projects = [
        { id: 1, name: "Roof Renovation - Via Roma 5", location: "Rome", bidCount: 3, deadline: "2026-02-15", status: "Open" },
        { id: 2, name: "Elevator Maintenance - Via Milano 12", location: "Milan", bidCount: 2, deadline: "2026-01-30", status: "Review" },
        { id: 3, name: "Garden Cleaning - Piazza Verdi", location: "Florence", bidCount: 1, deadline: "2026-01-10", status: "Awarded" },
        { id: 4, name: "Facade Painting - Via Napoli 8", location: "Naples", bidCount: 0, deadline: "2026-02-20", status: "Open" },
    ];

    // Mock Bids Data grouped by project
    const allBids = {
        1: [
            { id: 1, contractor: "Giovanni Rossi", tender: "Roof Renovation - Via Roma 5", amount: "€15,000", date: "2026-01-20", status: "Under Review" },
            { id: 2, contractor: "Maria Bianchi", tender: "Roof Renovation - Via Roma 5", amount: "€14,500", date: "2026-01-21", status: "Under Review" },
            { id: 3, contractor: "Luca Verdi", tender: "Roof Renovation - Via Roma 5", amount: "€16,000", date: "2026-01-19", status: "Submitted" },
        ],
        2: [
            { id: 4, contractor: "Giovanni Rossi", tender: "Elevator Maintenance - Via Milano 12", amount: "€8,000", date: "2026-01-22", status: "Under Review" },
            { id: 5, contractor: "Sofia Romano", tender: "Elevator Maintenance - Via Milano 12", amount: "€7,500", date: "2026-01-23", status: "Under Review" },
        ],
        3: [
            { id: 6, contractor: "Luca Verdi", tender: "Garden Cleaning - Piazza Verdi", amount: "€3,000", date: "2026-01-05", status: "Awarded" },
        ],
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Submitted': return 'bg-blue-50 text-blue-700';
            case 'Under Review': return 'bg-yellow-50 text-yellow-700';
            case 'Awarded': return 'bg-green-50 text-green-700';
            case 'Rejected': return 'bg-red-50 text-red-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const getTenderStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-green-50 text-green-700';
            case 'Review': return 'bg-yellow-50 text-yellow-700';
            case 'Awarded': return 'bg-blue-50 text-blue-700';
            case 'Closed': return 'bg-gray-50 text-gray-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    // If no project is selected, show project list
    if (!selectedProject) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t('admin.bidManagement.title')}</h2>
                    <p className="text-gray-500">{t('admin.bidManagement.subtitle')}</p>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder={t('admin.bidManagement.searchPlaceholder')}
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Projects Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">{project.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">📍 {project.location}</p>
                                        <Badge className={getTenderStatusColor(project.status)}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FileCheck className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm font-medium text-gray-600">{t('admin.bidManagement.totalBids')}:</span>
                                        </div>
                                        <span className="text-2xl font-bold text-blue-600">{project.bidCount}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">{t('tender.details.deadline')}: {project.deadline}</p>
                                </div>

                                <Button variant="outline" className="w-full mt-4" size="sm">
                                    {t('tender.boq.viewBids')}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <h3 className="text-lg font-medium text-gray-900">{t('admin.bidManagement.noProjects')}</h3>
                        <p className="text-gray-500">{t('admin.bidManagement.noProjectsDesc')}</p>
                    </div>
                )}
            </div>
        );
    }

    // If project is selected, show bids for that project
    const projectBids = allBids[selectedProject.id] || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                >
                    <ArrowLeft className="h-4 w-4 mr-1" /> {t('admin.bidManagement.backToProjects')}
                </Button>
            </div>

            <div>
                <h2 className="text-3xl font-bold tracking-tight">{selectedProject.name}</h2>
                <p className="text-gray-500">{t('admin.bidManagement.allBids')} ({projectBids.length})</p>
            </div>

            {/* Bids Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('admin.bidManagement.table.contractor')}</TableHead>
                                <TableHead>{t('admin.bidManagement.table.tender')}</TableHead>
                                <TableHead>{t('admin.bidManagement.table.amount')}</TableHead>
                                <TableHead>{t('admin.bidManagement.table.date')}</TableHead>
                                <TableHead>{t('admin.bidManagement.table.status')}</TableHead>
                                <TableHead className="text-right">{t('admin.bidManagement.table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projectBids.map((bid) => (
                                <TableRow key={bid.id}>
                                    <TableCell className="font-medium">{bid.contractor}</TableCell>
                                    <TableCell className="max-w-xs truncate">{bid.tender}</TableCell>
                                    <TableCell className="font-semibold text-gray-900">{bid.amount}</TableCell>
                                    <TableCell>{bid.date}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(bid.status)}>
                                            {bid.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                                                ✓ {t('admin.bidManagement.table.approve')}
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                                ✕ {t('admin.bidManagement.table.reject')}
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-3 w-3 mr-1" /> {t('admin.bidManagement.table.view')}
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {projectBids.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900">{t('admin.bidManagement.noBids')}</h3>
                            <p className="text-gray-500">{t('admin.bidManagement.noBidsDesc')}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default BidManagement;
