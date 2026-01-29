import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Search, MapPin, Calendar, Clock, Filter, X, Lock } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import CountdownTimer from '../../components/ui/CountdownTimer';

const ActiveTenders = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    // Mock Data
    const allTenders = [
        { id: 1, title: "Roof Renovation - Via Roma 5", description: "Complete roof replacement for 5-story building.", location: "Rome", category: "Construction", budget: 20000, deadline: "2026-02-15", status: "Open", isUnlocked: true },
        { id: 4, title: "Electrical Upgrade (Partial Info)", description: "Electrical upgrade work in Naples area. Purchase credits to view full details.", location: "Naples", category: "Electrical", budget: 5000, deadline: "2026-03-01", status: "Open", isUnlocked: false },
        { id: 6, title: "Plumbing Fix (Partial Info)", description: "Urgent plumbing repair needed. Purchase credits to participate.", location: "Turin", category: "Plumbing", budget: 3000, deadline: "2026-01-30", status: "Urgent", isUnlocked: false },
        { id: 7, title: "Facade Painting - Florence", description: "Painting of historical building facade.", location: "Florence", category: "Painting", budget: 12000, deadline: "2026-02-20", status: "Open", isUnlocked: true },
        { id: 8, title: "HVAC Maintenance (Partial Info)", description: "Scheduled maintenance for commercial property.", location: "Rome", category: "HVAC", budget: 8000, deadline: "2026-02-10", status: "Urgent", isUnlocked: false },
    ];

    // Get unique locations for filter
    const locations = ['All', ...new Set(allTenders.map(t => t.location))];
    const statuses = ['All', 'Open', 'Urgent'];

    const filteredTenders = allTenders.filter(tender => {
        const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tender.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = locationFilter === 'All' || tender.location === locationFilter;
        const matchesStatus = statusFilter === 'All' || tender.status === statusFilter;

        return matchesSearch && matchesLocation && matchesStatus;
    });

    const clearFilters = () => {
        setSearchTerm('');
        setLocationFilter('All');
        setStatusFilter('All');
    };

    const hasActiveFilters = searchTerm !== '' || locationFilter !== 'All' || statusFilter !== 'All';

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Available Tenders</h2>
                    <p className="text-gray-500">Browse and filter tenders assigned to you.</p>
                </div>

                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <X className="h-4 w-4 mr-1" /> Clear Filters
                    </Button>
                )}
            </div>

            {/* Filter Bar */}
            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by title..."
                                className="pl-9 bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Location Filter */}
                        <div className="w-full md:w-48">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <select
                                    className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                >
                                    {locations.map(loc => (
                                        <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Status Filter Buttons */}
                        <div className="flex bg-white rounded-md border border-gray-300 p-1">
                            {statuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`flex-1 px-4 py-1.5 text-sm font-medium rounded transition-colors ${statusFilter === status
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4">
                {filteredTenders.map((tender) => (
                    <Card key={tender.id} className="hover:shadow-md transition-shadow group">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tender.title}</h3>
                                        {!tender.isUnlocked && <Badge variant="outline" className="text-gray-500 border-gray-300"><Lock className="w-3 h-3 mr-1" /> Locked</Badge>}
                                        {tender.status === 'Urgent' && <Badge variant="destructive" className="animate-pulse">Urgent</Badge>}
                                        {tender.status === 'Open' && <Badge variant="secondary">Open</Badge>}
                                    </div>
                                    <p className={`text-gray-600 line-clamp-2 max-w-2xl ${!tender.isUnlocked ? 'italic text-gray-500' : ''}`}>
                                        {tender.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-3">
                                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${!tender.isUnlocked ? 'bg-gray-100 blur-sm select-none' : 'bg-gray-100'}`}>
                                            <MapPin className="h-3.5 w-3.5" />
                                            {tender.isUnlocked ? tender.location : 'Hidden Location'}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full">
                                            <Calendar className="h-3.5 w-3.5" />
                                            Deadline: {tender.deadline}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full">
                                            <span className="font-semibold">Budget:</span> €{tender.budget}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center min-w-[140px]">
                                    <Button asChild={tender.isUnlocked} size="lg" className={`w-full ${!tender.isUnlocked ? 'bg-amber-600 hover:bg-amber-700' : ''}`}>
                                        <Link to={`/contractor/tenders/${tender.id}`}>
                                            {tender.isUnlocked ? 'View Details' : 'Unlock Details'}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredTenders.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <Filter className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No tenders found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
                        <Button variant="link" onClick={clearFilters} className="mt-2 text-blue-600">
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveTenders;
