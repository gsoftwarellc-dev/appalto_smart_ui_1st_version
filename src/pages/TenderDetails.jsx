import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Download, Upload, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import Timeline from '../components/ui/Timeline';
import CountdownTimer from '../components/ui/CountdownTimer';

const TenderDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Mock Tender Data
    const tender = {
        id: id,
        title: "Roof Renovation - Via Roma 5",
        description: "Complete replacement of the roof tiles and insulation layer. Area: 500mq.",
        location: "Rome",
        deadline: "2026-02-15",
        status: "Open", // Published, Open, Review, Awarded
        priority: "Standard",
        budget: "€20,000",
        timelineStep: "Open"
    };

    // Mock Bids (for Admin)
    const bids = [
        { id: 1, contractor: "BuildIt Srl", amount: "€18,500", date: "2026-01-20" },
        { id: 2, contractor: "Mario Repairs", amount: "€19,000", date: "2026-01-22" },
    ];

    const [bidAmount, setBidAmount] = useState('');
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

    const handleAward = (bidId) => {
        alert(`Awarded to bid ${bidId}`); // Mock action
    };

    const [downloaded, setDownloaded] = useState(false);

    return (
        <div className="space-y-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2 pl-0 hover:bg-transparent hover:text-blue-600">
                <ArrowLeft className="h-4 w-4" />
                Back
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
                                    <div className="flex gap-2 text-sm text-gray-500">
                                        <span>{tender.location}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            Deadline: {tender.deadline}
                                            (<span className="text-red-600"><CountdownTimer deadline={tender.deadline} /></span>)
                                        </span>
                                    </div>
                                </div>
                                <Badge variant="secondary">{tender.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            {/* Timeline */}
                            <Timeline currentStep={tender.timelineStep} />

                            <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p className="text-gray-600">{tender.description}</p>
                            </div>

                            {tender.budget && (
                                <div>
                                    <h4 className="font-semibold mb-2">Estimated Budget</h4>
                                    <p className="text-gray-600 font-mono">{tender.budget}</p>
                                </div>
                            )}

                            {/* Documents Management */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <Download className="h-4 w-4 text-blue-600" /> Documents
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-700">Bill of Quantities (BOQ)</p>
                                        <p className="text-xs text-gray-500">PDF, 2.5MB</p>
                                    </div>
                                    <Button
                                        variant={downloaded ? "outline" : "default"}
                                        size="sm"
                                        onClick={() => setDownloaded(true)}
                                    >
                                        {downloaded ? 'Downloaded' : 'Download'}
                                    </Button>
                                </div>
                                {downloaded && (
                                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" /> Downloaded on {new Date().toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Admin View: Bids List */}
                    {user?.role === 'admin' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Received Bids ({bids.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Contractor</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bids.map((bid) => (
                                            <TableRow key={bid.id}>
                                                <TableCell className="font-medium">{bid.contractor}</TableCell>
                                                <TableCell>{bid.amount}</TableCell>
                                                <TableCell>{bid.date}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button size="sm" onClick={() => handleAward(bid.id)}>Award</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column: Key Actions */}
                <div className="w-full md:w-80 space-y-6">
                    {/* Contractor View: Submit Bid */}
                    {user?.role === 'contractor' && !submitted && (
                        <Card className="border-blue-100 shadow-md sticky top-6">
                            <CardHeader className="bg-blue-50/50">
                                <CardTitle className="text-lg text-blue-700">Submit Your Bid</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={handleBidSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Bid Amount (€)</label>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Upload Offer (PDF)</label>
                                        <div className="border border-dashed border-gray-300 rounded p-4 text-center text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
                                            <Upload className="h-5 w-5 mx-auto mb-1" />
                                            <span>Select PDF (Max 5MB)</span>
                                            <input type="file" className="hidden" accept=".pdf" required />
                                        </div>
                                    </div>

                                    {submitting && (
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    )}

                                    <Button className="w-full" type="submit" disabled={submitting}>
                                        {submitting ? 'Uploading...' : 'Submit Bid'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {user?.role === 'contractor' && submitted && (
                        <Card className="bg-green-50 border-green-200 sticky top-6">
                            <CardContent className="pt-6 text-center space-y-2">
                                <CheckCircle className="h-10 w-10 text-green-600 mx-auto" />
                                <h3 className="font-bold text-green-800">Bid Submitted!</h3>
                                <p className="text-sm text-green-600">Your offer has been sent successfully.</p>
                                <p className="text-xs text-green-500 pt-2">{new Date().toLocaleString()}</p>
                                <Button variant="outline" size="sm" className="mt-2 bg-white hover:bg-green-50" onClick={() => navigate('/contractor/bids')}>
                                    View My Bids
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TenderDetails;
