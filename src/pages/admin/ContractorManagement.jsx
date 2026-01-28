import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Search, User, MapPin, Briefcase, Mail, Phone, MessageSquare } from 'lucide-react';

const ContractorManagement = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');

    // Mock Contractors Data
    const contractors = [
        {
            id: 1,
            name: "Giovanni Rossi",
            email: "giovanni@example.com",
            phone: "+39 123 456 7890",
            location: "Rome",
            expertise: "Construction & Renovation",
            totalBids: 5,
            wonBids: 2,
            avatar: "GR"
        },
        {
            id: 2,
            name: "Maria Bianchi",
            email: "maria@example.com",
            phone: "+39 234 567 8901",
            location: "Milan",
            expertise: "Electrical Works",
            totalBids: 3,
            wonBids: 1,
            avatar: "MB"
        },
        {
            id: 3,
            name: "Luca Verdi",
            email: "luca@example.com",
            phone: "+39 345 678 9012",
            location: "Florence",
            expertise: "Plumbing & HVAC",
            totalBids: 4,
            wonBids: 1,
            avatar: "LV"
        },
        {
            id: 4,
            name: "Sofia Romano",
            email: "sofia@example.com",
            phone: "+39 456 789 0123",
            location: "Naples",
            expertise: "Painting & Decoration",
            totalBids: 2,
            wonBids: 0,
            avatar: "SR"
        },
    ];

    // Get unique locations for filter
    const locations = ['All', ...new Set(contractors.map(c => c.location))];

    const filteredContractors = contractors.filter(contractor => {
        const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contractor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contractor.expertise.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = locationFilter === 'All' || contractor.location === locationFilter;
        return matchesSearch && matchesLocation;
    });

    const handleMessageContractor = (contractor) => {
        // Navigate to messages page - in a real app, this would pre-select the contractor's thread
        navigate('/admin/messages', { state: { contractorId: contractor.id, contractorName: contractor.name } });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Contractor Management</h2>
                <p className="text-gray-500">View and manage all registered contractors.</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by name, location, or expertise..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-48">
                    <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        {locations.map(location => (
                            <option key={location} value={location}>
                                {location === 'All' ? 'All Locations' : location}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">Total Contractors</div>
                        <div className="text-3xl font-bold text-blue-600">{contractors.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">Total Bids</div>
                        <div className="text-3xl font-bold text-purple-600">
                            {contractors.reduce((sum, c) => sum + c.totalBids, 0)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">Award Rate</div>
                        <div className="text-3xl font-bold text-green-600">
                            {Math.round((contractors.reduce((sum, c) => sum + c.wonBids, 0) / contractors.reduce((sum, c) => sum + c.totalBids, 0)) * 100)}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Contractors Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContractors.map((contractor) => (
                    <Card key={contractor.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                    {contractor.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{contractor.name}</h3>
                                    <div className="space-y-1.5 text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span className="truncate">{contractor.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Briefcase className="h-3.5 w-3.5" />
                                            <span className="truncate">{contractor.expertise}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Mail className="h-3.5 w-3.5" />
                                            <span className="truncate">{contractor.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Phone className="h-3.5 w-3.5" />
                                            <span>{contractor.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">{contractor.totalBids}</div>
                                    <div className="text-xs text-gray-500">Total Bids</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-green-600">{contractor.wonBids}</div>
                                    <div className="text-xs text-gray-500">Won</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-red-600">{contractor.totalBids - contractor.wonBids}</div>
                                    <div className="text-xs text-gray-500">Lost</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <Button variant="outline" size="sm">
                                    <User className="h-3 w-3 mr-1" /> View Profile
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                    onClick={() => handleMessageContractor(contractor)}
                                >
                                    <MessageSquare className="h-3 w-3 mr-1" /> Message
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredContractors.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <h3 className="text-lg font-medium text-gray-900">No contractors found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or location filter.</p>
                </div>
            )}
        </div>
    );
};

export default ContractorManagement;
