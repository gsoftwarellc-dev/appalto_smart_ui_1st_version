import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Download, Upload, ArrowLeft, CheckCircle, Clock, Lock, Info, FileText } from 'lucide-react';
import Timeline from '../components/ui/Timeline';
import CountdownTimer from '../components/ui/CountdownTimer';

const TenderDetails = () => {
    const { id } = useParams();
    const { user, updateUser } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isUnlocked, setIsUnlocked] = useState(true);

    const getCreditCost = (budget) => {
        if (!budget) return 4; // Default lowest
        if (budget.includes('50,000') && budget.includes('0')) return 4;
        if (budget.includes('50,000') && budget.includes('100,000')) return 10;
        if (budget.includes('100,000') && budget.includes('250,000')) return 20;
        if (budget.includes('250,000')) return 30;

        // Fallback for simple numbers in mock strings (like "€20,000")
        const num = parseInt(budget.replace(/[^0-9]/g, ''));
        if (num <= 50000) return 4;
        if (num <= 100000) return 10;
        if (num <= 250000) return 20;
        return 30;
    };

    // Effect to start as locked for demonstration if ID matches specific mock IDs
    React.useEffect(() => {
        if (id === '4' || id === '6' || id === '8') {
            setIsUnlocked(false);
        }
    }, [id]);

    const handleUnlock = () => {
        const cost = getCreditCost(tender.budget);
        const currentCredits = user?.credits || 0;

        if (currentCredits < cost) {
            alert(t('tender.details.insufficientCredits', { cost, credits: currentCredits }));
            return;
        }

        const confirm = window.confirm(t('tender.details.unlockConfirm', { cost, credits: currentCredits }));
        if (confirm) {
            const updatedUser = { ...user, credits: currentCredits - cost };
            updateUser(updatedUser);
            setIsUnlocked(true);
        }
    };

    // Mock Tender Data
    const tender = {
        id: id,
        title: "Roof Renovation", // Generic title
        category: "Construction & Renovation",
        address: "Via Roma 5", // Specific address
        description: "Complete replacement of the roof tiles and insulation layer. Area: 500mq.",
        location: "Rome",
        deadline: "2026-02-15",
        status: "Open", // Published, Open, Review, Awarded
        priority: "Standard",
        budget: "€20,000",
        timelineStep: "Open",
        isUnlocked: false, // Default to locked for demonstration logic if id matches locked ones from list
        boqItems: [
            { id: 1, description: "Demolition of existing roof tiles", unit: "mq", quantity: 500 },
            { id: 2, description: "Disposal of debris", unit: "kg", quantity: 2000 },
            { id: 3, description: "Installation of new insulation layer (10cm)", unit: "mq", quantity: 500 },
            { id: 4, description: "Supply and installation of new terracotta tiles", unit: "mq", quantity: 500 },
            { id: 5, description: "Gutter replacement", unit: "m", quantity: 120 }
        ]
    };

    // Mock Bids (for Admin)
    const bids = [
        { id: 1, contractor: "BuildIt Srl", amount: "€18,500", date: "2026-01-20" },
        { id: 2, contractor: "Mario Repairs", amount: "€19,000", date: "2026-01-22" },
    ];

    const [boqPrices, setBoqPrices] = useState({});
    const [totalBidAmount, setTotalBidAmount] = useState(0);
    const [bidFile, setBidFile] = useState(null);

    const [editableItems, setEditableItems] = useState([]);

    // Initialize editable items from tender data
    React.useEffect(() => {
        if (tender.boqItems) {
            // Map items to include their price state if existing, or 0
            setEditableItems(tender.boqItems.map(item => ({
                ...item,
                price: boqPrices[item.id] || 0
            })));
        }
    }, [tender, boqPrices]); // Re-sync if tender/prices change strictly - in real app handle carefully

    const [discountType, setDiscountType] = useState('percent'); // 'percent' or 'fixed'
    const [discountValue, setDiscountValue] = useState('');

    // Calculate totals based on EDITABLE items
    React.useEffect(() => {
        let subtotal = 0;
        editableItems.forEach(item => {
            const price = parseFloat(item.price) || 0;
            const qty = parseFloat(item.quantity) || 0;
            subtotal += price * qty;
        });

        let discountAmount = 0;
        if (discountValue) {
            const val = parseFloat(discountValue) || 0;
            if (discountType === 'percent') {
                discountAmount = subtotal * (val / 100);
            } else {
                discountAmount = val;
            }
        }

        setTotalBidAmount(subtotal - discountAmount);
    }, [editableItems, discountType, discountValue]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...editableItems];
        newItems[index][field] = value;
        setEditableItems(newItems);
        // Also update standard price tracking map if needed for compatibility
        if (field === 'price') {
            setBoqPrices(prev => ({ ...prev, [newItems[index].id]: value }));
        }
    };

    const [boqMode, setBoqMode] = useState('manual'); // 'manual' or 'file' (AI)

    const addItem = () => {
        const newId = Math.max(...editableItems.map(i => i.id), 0) + 1;
        setEditableItems([...editableItems, { id: newId, description: '', unit: '', quantity: 0, price: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = editableItems.filter((_, i) => i !== index);
        setEditableItems(newItems);
    };

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleBidSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setProgress(0);

        // Simulating upload progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setSubmitting(false);
                    setSubmitted(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const [downloaded, setDownloaded] = useState(false);

    // Awarding State
    const [awardingBid, setAwardingBid] = useState(null); // The bid being awarded
    const [clientRole, setClientRole] = useState('admin'); // 'admin' (Condominium) or 'technician'
    const [awardFile, setAwardFile] = useState(null);
    const [isAwarded, setIsAwarded] = useState(false);

    // Payment / Regularization State
    const [isRegularized, setIsRegularized] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);

    const handleAwardClick = (bid) => {
        setAwardingBid(bid);
    };

    const confirmAward = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setIsAwarded(true);
            setAwardingBid(null);
            // In a real app, this would trigger a notification to the contractor
            alert(`Tender officially awarded to ${awardingBid.contractor}!`);
        }, 1500);
    };

    const handlePayment = () => {
        setProcessingPayment(true);
        // Simulate payment processing
        setTimeout(() => {
            setProcessingPayment(false);
            setIsRegularized(true);
            alert("Payment successful! The tender is now regularized.");
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2 pl-0 hover:bg-transparent hover:text-blue-600">
                <ArrowLeft className="h-4 w-4" />
                {t('tender.details.back')}
            </Button>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Tender Information (Left Column) */}
                <div className="flex-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-2xl">{tender.title}</CardTitle>
                                        <Badge variant={tender.priority === 'Urgent' ? 'destructive' : 'outline'}>{tender.priority}</Badge>
                                    </div>
                                    <div className="flex gap-2 text-sm text-gray-500 flex-wrap">
                                        <Badge variant="secondary" className="font-normal">{tender.category}</Badge>
                                        <span className="flex items-center">
                                            {tender.location}
                                            {isUnlocked && <span className="ml-1 text-gray-700 font-medium">({tender.address})</span>}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            {t('tender.details.deadline')}: {tender.deadline}
                                            (<span className="text-red-600"><CountdownTimer deadline={tender.deadline} /></span>)
                                        </span>
                                    </div>
                                </div>
                                <Badge variant="secondary">{tender.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            {/* Timeline - Only if unlocked */}
                            {isUnlocked && <Timeline currentStep={tender.timelineStep} />}

                            <div>
                                <h4 className="font-semibold mb-2">{t('tender.details.description')}</h4>
                                <p className={`text-gray-600 ${!isUnlocked ? 'italic text-gray-500 blur-[2px] select-none' : ''}`}>
                                    {isUnlocked ? tender.description : "This tender description includes full project scope, specific requirements, and site conditions. Unlock to view full details."}
                                </p>
                            </div>

                            {tender.budget && (
                                <div>
                                    <h4 className="font-semibold mb-2">{t('tender.details.budget')}</h4>
                                    <p className="text-gray-600 font-mono">{tender.budget}</p>
                                </div>
                            )}

                            {/* Documents Management or Locked State */}
                            {isUnlocked ? (
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Download className="h-4 w-4 text-blue-600" /> {t('tender.details.documents')}
                                    </h4>
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-700">{t('tender.details.boq')}</p>
                                            <p className="text-xs text-gray-500">PDF, 2.5MB</p>
                                        </div>
                                        <Button
                                            variant={downloaded ? "outline" : "default"}
                                            size="sm"
                                            onClick={() => setDownloaded(true)}
                                        >
                                            {downloaded ? t('tender.details.downloaded') : t('tender.details.download')}
                                        </Button>
                                    </div>
                                    {downloaded && (
                                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                            <CheckCircle className="h-3 w-3" /> {t('tender.details.downloaded')} on {new Date().toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center space-y-4">
                                    <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Lock className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t('tender.details.locked')}</h4>
                                        <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1">
                                            {t('tender.details.lockedDesc', { cost: getCreditCost(tender.budget) })}
                                        </p>
                                        <p className="text-xs text-blue-600 mt-2">
                                            {t('tender.details.balance', { credits: user?.credits || 0 })}
                                        </p>
                                    </div>
                                    <Button onClick={handleUnlock} className="bg-amber-600 hover:bg-amber-700 text-white shadow-md">
                                        {t('tender.details.unlock', { cost: getCreditCost(tender.budget) })}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Admin View: Bids List */}
                    {/* Admin View: Sealed Bids & Evaluation */}
                    {user?.role === 'admin' && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{t('admin.bidManagement.totalBids')} ({bids.length})</CardTitle>
                                {new Date(tender.deadline) < new Date() && (
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Download className="h-4 w-4" /> Export Comparison (CSV)
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                {new Date(tender.deadline) > new Date() ? (
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
                                        <Lock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                                        <h3 className="font-semibold text-amber-800">{t('admin.bidManagement.bidsSealed')}</h3>
                                        <p className="text-amber-700 text-sm mt-1">
                                            {t('admin.bidManagement.bidsSealedDesc', { deadline: tender.deadline })}
                                        </p>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>{t('admin.bidManagement.table.contractor')}</TableHead>
                                                <TableHead>{t('admin.bidManagement.table.amount')}</TableHead>
                                                <TableHead className="w-24">{t('admin.bidManagement.table.techScore')}</TableHead>
                                                <TableHead className="w-24">{t('admin.bidManagement.table.finScore')}</TableHead>
                                                <TableHead className="text-right">{t('admin.bidManagement.table.actions')}</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {bids.map((bid) => (
                                                <TableRow key={bid.id}>
                                                    <TableCell className="font-medium">{bid.contractor}</TableCell>
                                                    <TableCell>{bid.amount}</TableCell>
                                                    <TableCell>
                                                        <Input type="number" className="h-8 w-16" placeholder="0-10" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input type="number" className="h-8 w-16" placeholder="0-10" />
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button size="sm" onClick={() => handleAwardClick(bid)} disabled={isAwarded}>
                                                            {isAwarded ? t('admin.bidManagement.table.awarded') : t('admin.bidManagement.table.award')}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column: Key Actions */}
                <div className="w-full lg:w-[400px] space-y-6">
                    {/* Contractor View: Submit Bid */}
                    {user?.role === 'contractor' && !submitted && isUnlocked && (
                        <Card className="border-blue-100 shadow-md sticky top-6">
                            <CardHeader className="bg-blue-50/50">
                                <CardTitle className="text-lg text-blue-700">Invia offerta (Computo Metrico)</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={handleBidSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-sm">{t('tender.boq.boqTitle')}</h4>

                                        {/* BOQ Mode Toggle */}
                                        <div className="flex bg-gray-100 p-1 rounded-md w-fit mb-2">
                                            <button
                                                type="button"
                                                onClick={() => setBoqMode('manual')}
                                                className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${boqMode === 'manual' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                                            >
                                                {t('tender.boq.manual')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setBoqMode('file')}
                                                className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${boqMode === 'file' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                                            >
                                                {t('tender.boq.ai')}
                                            </button>
                                        </div>

                                        {boqMode === 'file' && (
                                            <div className="border border-dashed border-blue-300 bg-blue-50/30 rounded p-6 text-center text-sm text-gray-500 hover:bg-blue-50 cursor-pointer transition-colors relative mb-4">
                                                <Upload className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                                                <p className="font-medium text-blue-700">Carica Computo Metrico (PDF/Excel)</p>
                                                <p className="text-xs text-gray-400 mt-1">{t('tender.boq.uploadDesc')}</p>
                                                <input
                                                    type="file"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    accept=".pdf,.xlsx,.xls"
                                                    onChange={(e) => {
                                                        // Mock AI Extraction: Just keep the current items for now but pretend it worked
                                                        alert("AI Extraction simulated: Table updated from file.");
                                                        setBoqMode('manual'); // Switch back to manual so they can review
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="bg-white rounded-md border border-gray-200 overflow-x-auto text-xs">
                                            <table className="w-full">
                                                <thead className="bg-gray-50 text-left">
                                                    <tr>
                                                        <th className="p-2 font-medium text-gray-500">{t('tender.boq.item')}</th>
                                                        <th className="p-2 font-medium text-gray-500 w-14">{t('tender.boq.unit')}</th>
                                                        <th className="p-2 font-medium text-gray-500 w-16">{t('tender.boq.qty')}</th>
                                                        <th className="p-2 font-medium text-gray-500 w-20">{t('tender.boq.price')}</th>
                                                        <th className="p-2 font-medium text-gray-500 w-24 text-right">{t('tender.boq.total')}</th>
                                                        <th className="p-2 w-8"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {editableItems.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full bg-transparent border-b border-transparent focus:border-blue-300 outline-none text-sm"
                                                                    value={item.description}
                                                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="p-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full bg-transparent border-b border-transparent focus:border-blue-300 outline-none text-gray-500 text-sm"
                                                                    value={item.unit}
                                                                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="p-2">
                                                                <input
                                                                    type="number"
                                                                    className="w-full bg-transparent border-b border-transparent focus:border-blue-300 outline-none font-medium text-sm"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="p-2">
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    step="0.01"
                                                                    className="w-full text-right border rounded px-1 py-0.5 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                                                                    placeholder="0,00"
                                                                    value={item.price || ''}
                                                                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                                                    required
                                                                />
                                                            </td>
                                                            <td className="p-2 text-right text-sm text-gray-700">
                                                                €{((parseFloat(item.price) || 0) * (parseFloat(item.quantity) || 0)).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </td>
                                                            <td className="p-2 text-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeItem(index)}
                                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                                    title="Rimuovi voce"
                                                                >
                                                                    &times;
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td colSpan="6" className="p-2">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={addItem}
                                                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 h-8 px-2"
                                                            >
                                                                {t('tender.boq.addItem')}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot className="bg-gray-50 font-bold border-t border-gray-200">
                                                    <tr>
                                                        <td colSpan="3" className="p-2 text-right pt-4">{t('tender.boq.discount')}</td>
                                                        <td colSpan="2" className="p-2 text-right pt-4">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <input
                                                                    type="number"
                                                                    className="w-20 text-right border rounded px-1 py-0.5 text-sm font-normal"
                                                                    placeholder={discountType === 'percent' ? "0%" : "€0"}
                                                                    value={discountValue}
                                                                    onChange={(e) => setDiscountValue(e.target.value)}
                                                                />
                                                                <div className="flex rounded border bg-white overflow-hidden h-7">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setDiscountType('percent')}
                                                                        className={`px-2 text-xs ${discountType === 'percent' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                                                                    >
                                                                        %
                                                                    </button>
                                                                    <div className="w-px bg-gray-200"></div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setDiscountType('fixed')}
                                                                        className={`px-2 text-xs ${discountType === 'fixed' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                                                                    >
                                                                        €
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3" className="p-2 text-right text-lg">{t('tender.boq.projectTotal')}</td>
                                                        <td colSpan="2" className="p-2 text-right text-blue-700 text-lg">€{totalBidAmount.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('tender.boq.uploadPreventivo')}</label>
                                        <div className="border border-dashed border-gray-300 rounded p-4 text-center text-sm text-gray-500 hover:bg-gray-50 cursor-pointer relative">
                                            <Upload className="h-5 w-5 mx-auto mb-1" />
                                            <span>{bidFile ? bidFile.name : "Seleziona PDF firmato"}</span>
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept=".pdf"
                                                onChange={(e) => setBidFile(e.target.files[0])}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {submitting && (
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    )}

                                    <div className="flex items-start space-x-2 border p-3 rounded-md bg-blue-50 border-blue-100 mb-4">
                                        <input type="checkbox" id="fee-agree" className="mt-1" required />
                                        <label htmlFor="fee-agree" className="text-sm text-blue-800">
                                            {t('tender.boq.feeAgreement', { fee: (totalBidAmount * 0.03).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) })}
                                        </label>
                                    </div>

                                    <Button className="w-full" type="submit" disabled={submitting || totalBidAmount === 0 || !bidFile}>
                                        {submitting ? t('tender.boq.submitting') : t('tender.boq.submit', { amount: totalBidAmount.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) })}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {user?.role === 'contractor' && submitted && !isAwarded && (
                        <Card className="bg-green-50 border-green-200 sticky top-6">
                            <CardContent className="pt-6 text-center space-y-2">
                                <CheckCircle className="h-10 w-10 text-green-600 mx-auto" />
                                <h3 className="font-bold text-green-800">{t('tender.boq.submitted')}</h3>
                                <p className="text-sm text-green-600">{t('tender.boq.submittedDesc')}</p>
                                <p className="text-xs text-green-500 pt-2">{new Date().toLocaleString()}</p>
                                <Button variant="outline" size="sm" className="mt-2 bg-white hover:bg-green-50" onClick={() => navigate('/contractor/bids')}>
                                    {t('tender.boq.viewBids')}
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Contractor View: Payment Request (Success Fee) */}
                    {user?.role === 'contractor' && isAwarded && (
                        <Card className="bg-blue-50 border-blue-200 sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-blue-800 flex items-center gap-2">
                                    <Info className="h-5 w-5" /> {t('tender.award.successFeeTitle')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-blue-700">
                                    {t('tender.award.successFeeDesc')}
                                </p>

                                <div className="bg-white p-4 rounded border border-blue-100">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">{t('tender.award.contractValue')}</span>
                                        <span className="font-medium">€{totalBidAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">{t('tender.award.successFee')}</span>
                                        <span className="font-bold text-blue-600">
                                            {(totalBidAmount * 0.03).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                                        </span>
                                    </div>
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    {t('tender.award.payButton')}
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Admin View: Status Message */}
                    {user?.role === 'admin' && isAwarded && (
                        <Card className="bg-amber-50 border-amber-200 border-l-4 border-l-amber-500">
                            <CardContent className="p-4 flex items-start gap-3">
                                <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-amber-800">{t('tender.award.pendingRegularization')}</h4>
                                    <p className="text-sm text-amber-700">
                                        {t('tender.award.pendingDesc')}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Award Confirmation Modal */}
            {awardingBid && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <CardHeader>
                            <CardTitle>{t('tender.award.modalTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={confirmAward} className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    {t('tender.award.modalDesc', { contractor: awardingBid.contractor, amount: awardingBid.amount })}
                                </p>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{t('tender.award.roleLabel')}</label>
                                    <select
                                        className="w-full border rounded p-2 text-sm bg-white"
                                        value={clientRole}
                                        onChange={(e) => setClientRole(e.target.value)}
                                    >
                                        <option value="admin">{t('tender.award.adminRole')}</option>
                                        <option value="technician">{t('tender.award.techRole')}</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {t('tender.award.uploadLabel')} <br />
                                        <span className="text-blue-600 font-normal">
                                            {clientRole === 'admin' ? t('tender.award.assemblyMinutes') : t('tender.award.signedQuote')}
                                        </span>
                                    </label>
                                    <div className="border border-dashed border-gray-300 rounded p-4 text-center text-sm text-gray-500 hover:bg-gray-50 cursor-pointer relative">
                                        <Upload className="h-5 w-5 mx-auto mb-1" />
                                        <span>{awardFile ? awardFile.name : "Select File (PDF)"}</span>
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept=".pdf"
                                            onChange={(e) => setAwardFile(e.target.files[0])}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {clientRole === 'admin'
                                            ? t('tender.award.uploadHintAdmin')
                                            : t('tender.award.uploadHintTech')}
                                    </p>
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button variant="ghost" type="button" onClick={() => setAwardingBid(null)}>{t('tender.award.cancel')}</Button>
                                    <Button type="submit" disabled={submitting || !awardFile}>
                                        {submitting ? t('tender.award.processing') : t('tender.award.confirm')}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default TenderDetails;
