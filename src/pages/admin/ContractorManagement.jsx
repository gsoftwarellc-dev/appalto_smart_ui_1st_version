import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Search, User, MapPin, Briefcase, Mail, Phone, Loader2 } from 'lucide-react';
import BackendApiService from '../../services/backendApi';

const ContractorManagement = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contractors, setContractors] = useState([]);

    useEffect(() => {
        loadContractors();
    }, []);

    const loadContractors = async () => {
        try {
            setLoading(true);
            const data = await BackendApiService.getContractors({});
            setContractors(data || []);
            setError(null);
        } catch (error) {
            console.error("Failed to load contractors", error);
            setError("Failed to load contractors. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Get unique locations for filter
    const locations = ['All', ...new Set(contractors.map(c => c.city).filter(Boolean))];

    const filteredContractors = contractors.filter(contractor => {
        const matchesSearch =
            contractor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contractor.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contractor.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = locationFilter === 'All' || contractor.city === locationFilter;
        return matchesSearch && matchesLocation;
    });

    // Calculate stats from real data
    const totalBids = contractors.reduce((sum, c) => sum + (c.total_bids || 0), 0);
    const totalWon = contractors.reduce((sum, c) => sum + (c.won_bids || 0), 0);
    const awardRate = totalBids > 0 ? Math.round((totalWon / totalBids) * 100) : 0;

    if (loading) return <div className="p-8 text-center flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;

    if (error) return (
        <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-red-600">Error</h3>
            <p className="text-gray-500">{error}</p>
            <Button variant="outline" className="mt-4" onClick={loadContractors}>Retry</Button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('admin.contractorManagement.title')}</h2>
                <p className="text-gray-500">{t('admin.contractorManagement.subtitle')}</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder={t('admin.contractorManagement.searchPlaceholder')}
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
                                <option key={location} value={location}>
                                    {location === 'All' ? t('admin.contractorManagement.locationFilter.all') : location}
                                </option>
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">{t('admin.contractorManagement.stats.total')}</div>
                        <div className="text-3xl font-bold text-blue-600">{contractors.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">{t('admin.contractorManagement.stats.bids')}</div>
                        <div className="text-3xl font-bold text-purple-600">{totalBids}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">{t('admin.contractorManagement.stats.awardRate')}</div>
                        <div className="text-3xl font-bold text-green-600">{awardRate}%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-gray-500 mb-1">{t('admin.contractorManagement.stats.active')}</div>
                        <div className="text-3xl font-bold text-orange-600">{contractors.filter(c => c.total_bids > 0).length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Contractors Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredContractors.map((contractor) => {
                    const initials = contractor.name ? contractor.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'C';
                    const wonBids = contractor.won_bids || 0;
                    const totalBids = contractor.total_bids || 0;
                    const lostBids = totalBids - wonBids;

                    return (
                        <Card key={contractor.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                        {initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">{contractor.name || 'Unnamed'}</h3>
                                        <div className="space-y-1.5 text-sm text-gray-600">
                                            {contractor.city && (
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    <span className="truncate">{contractor.city}</span>
                                                </div>
                                            )}
                                            {contractor.company_name && (
                                                <div className="flex items-center gap-1.5">
                                                    <Briefcase className="h-3.5 w-3.5" />
                                                    <span className="truncate">{contractor.company_name}</span>
                                                </div>
                                            )}
                                            {contractor.email && (
                                                <div className="flex items-center gap-1.5">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    <span className="truncate">{contractor.email}</span>
                                                </div>
                                            )}
                                            {contractor.phone && (
                                                <div className="flex items-center gap-1.5">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    <span>{contractor.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">{totalBids}</div>
                                        <div className="text-xs text-gray-500">{t('admin.contractorManagement.card.totalBids')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-green-600">{wonBids}</div>
                                        <div className="text-xs text-gray-500">{t('admin.contractorManagement.card.won')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-red-600">{lostBids}</div>
                                        <div className="text-xs text-gray-500">{t('admin.contractorManagement.card.lost')}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <Button variant="outline" size="sm">
                                        <User className="h-3 w-3 mr-1" /> {t('admin.contractorManagement.card.viewProfile')}
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        {t('admin.bidManagement.viewBids')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredContractors.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <h3 className="text-lg font-medium text-gray-900">{t('admin.contractorManagement.noResults')}</h3>
                    <p className="text-gray-500">{t('admin.contractorManagement.noResultsDesc')}</p>
                </div>
            )}
        </div>
    );
};

export default ContractorManagement;
