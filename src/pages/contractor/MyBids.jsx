import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { FileText, Loader2, Calendar, FileEdit, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import BackendApiService from '../../services/backendApi';

const MyBids = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('All');
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const data = await BackendApiService.getMyBids();
                setBids(data);
            } catch (err) {
                console.error("Failed to fetch my bids", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBids();
    }, []);

    const filteredBids = activeTab === 'All' ? bids.filter(bid => bid.status !== 'draft') : bids.filter(bid => {
        if (activeTab === 'Drafts') return bid.status === 'draft';
        if (activeTab === 'Pending') return ['submitted'].includes(bid.status);
        if (activeTab === 'History') return ['accepted', 'rejected', 'awarded', 'lost'].includes(bid.status);
        return true;
    });

    const tabs = ['All', 'Pending', 'History'];

    const getTabLabel = (tab) => {
        switch (tab) {
            case 'All': return t('contractor.bids.tabs.all');
            case 'Drafts': return t('contractor.bids.tabs.drafts');
            case 'Pending': return t('contractor.bids.tabs.pending');
            case 'History': return t('contractor.bids.tabs.history');
            default: return tab;
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'accepted':
            case 'awarded': return 'success';
            case 'rejected':
            case 'lost': return 'destructive';
            case 'submitted': return 'warning'; // Pending
            case 'draft': return 'secondary';
            default: return 'outline';
        }
    };

    const getStatusDisplay = (status) => {
        switch (status) {
            case 'accepted':
            case 'awarded': return t('contractor.dashboard.won');
            case 'rejected':
            case 'lost': return t('contractor.dashboard.notSelected');
            case 'submitted': return t('contractor.bids.tabs.pending');
            case 'draft': return t('contractor.bids.status.draft');
            default: return status;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted':
            case 'awarded': return <CheckCircle className="h-4 w-4" />;
            case 'rejected':
            case 'lost': return <XCircle className="h-4 w-4" />;
            case 'submitted': return <Clock className="h-4 w-4" />;
            case 'draft': return <FileEdit className="h-4 w-4" />;
            default: return <AlertCircle className="h-4 w-4" />;
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-500 font-medium">Loading your bids...</p>
        </div>
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t('contractor.myBids')}</h2>
                    <p className="text-gray-500 mt-1">{t('contractor.dashboard.manageBids')}</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="outline" className="gap-2 hidden md:flex">
                        <Link to="/contractor/tenders">
                            {t('contractor.dashboard.browseTenders')}
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                            `}
                        >
                            {getTabLabel(tab)}
                            <Badge className={`ml-2 text-xs py-0.5 px-2 rounded-full ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                {tab === 'All' ? bids.length : bids.filter(b => {
                                    if (tab === 'Drafts') return b.status === 'draft';
                                    if (tab === 'Pending') return ['submitted'].includes(b.status);
                                    if (tab === 'History') return ['accepted', 'rejected', 'awarded', 'lost'].includes(b.status);
                                    return false;
                                }).length}
                            </Badge>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content Grid */}
            {filteredBids.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBids.map((bid) => (
                        <div
                            key={bid.id}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative overflow-hidden"
                        >
                            {/* Status Badge floating */}
                            <div className="absolute top-4 right-4 z-10">
                                <Badge variant={getStatusVariant(bid.status)} className="flex items-center gap-1 px-2.5 py-0.5 shadow-sm backdrop-blur-sm">
                                    {getStatusIcon(bid.status)}
                                    {getStatusDisplay(bid.status)}
                                </Badge>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-6 pr-20">
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2 h-[3.5rem]" title={bid.tender?.title}>
                                        {bid.tender?.title || t('contractor.dashboard.unknownTender')}
                                    </h3>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                                        <div className="text-sm text-gray-500 flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span>{t('contractor.dashboard.deadline')}</span>
                                        </div>
                                        <span className="font-medium text-gray-900">
                                            {bid.tender?.deadline ? new Date(bid.tender?.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                                        <div className="text-sm text-gray-500 flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span>{t('contractor.dashboard.submitted')}</span>
                                        </div>
                                        <span className="font-medium text-gray-900">
                                            {bid.submitted_at ? new Date(bid.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : <span className="text-gray-300 italic">--</span>}
                                        </span>
                                    </div>

                                    <div className="pt-1">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{t('contractor.dashboard.bidAmount')}</p>
                                        <p className="text-2xl font-bold text-gray-900 tracking-tight">
                                            {bid.total_amount > 0
                                                ? `€ ${parseFloat(bid.total_amount).toLocaleString('it-IT', { minimumFractionDigits: 2 })}`
                                                : <span className="text-gray-300 text-lg font-normal">{t('contractor.dashboard.notSet')}</span>
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="mt-auto">
                                    <Button
                                        className={`w-full h-10 font-medium shadow-sm transition-all ${bid.status === 'draft'
                                            ? "bg-amber-500 hover:bg-amber-600 text-white border-none"
                                            : "bg-[#0f172a] hover:bg-[#1e293b] text-white border-none"
                                            }`}
                                        asChild
                                    >
                                        <Link to={`/contractor/tenders/${bid.tender_id}`}>
                                            {bid.status === 'draft' ? (
                                                <>
                                                    <FileEdit className="h-4 w-4 mr-2" /> {t('contractor.dashboard.continueEditing')}
                                                </>
                                            ) : (
                                                <>
                                                    {t('contractor.dashboard.viewDetails')}
                                                </>
                                            )}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm mb-4">
                        <TrendingUp className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{t('contractor.dashboard.noProposals')}</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2 mb-6">
                        {activeTab === 'All'
                            ? t('contractor.dashboard.noBidsMessage')
                            : t('contractor.dashboard.noBidsCategory', { category: activeTab })}
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                        <Link to="/contractor/tenders">{t('contractor.dashboard.explore')}</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MyBids;

