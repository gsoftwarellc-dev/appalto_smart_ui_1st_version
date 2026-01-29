import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CreditCard, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Billing = () => {
    // Mock Data
    const [balance] = useState(150); // Current credits
    const [cards] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/28', default: true },
        { id: 2, type: 'Mastercard', last4: '8899', expiry: '05/27', default: false },
    ]);

    const transactions = [
        { id: 'TRX-9988', date: '2026-01-28', description: 'Credit Pack (Pro)', amount: '€120.00', type: 'Purchase', status: 'Completed' },
        { id: 'TRX-9989', date: '2026-01-15', description: 'Success Fee - Plaza Hotel', amount: '€450.00', type: 'Fee', status: 'Completed' },
        { id: 'TRX-9990', date: '2026-01-10', description: 'Credit Pack (Basic)', amount: '€50.00', type: 'Purchase', status: 'Completed' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Billing & Payments</h2>
                <p className="text-gray-500">Manage your payment methods, view transaction history, and purchase credits.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Balance Card */}
                <Card className="bg-blue-50 border-blue-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-800">Available Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-blue-900">{balance} Credits</div>
                        <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">Buy More Credits</Button>
                    </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Manage your saved cards.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Card
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {cards.map((card) => (
                            <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-14 bg-gray-100 rounded flex items-center justify-center">
                                        <CreditCard className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{card.type} ending in {card.last4}</p>
                                        <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                                    </div>
                                </div>
                                {card.default && <Badge variant="secondary">Default</Badge>}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Transaction History */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {transactions.map((trx) => (
                            <div key={trx.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${trx.type === 'Purchase' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                        }`}>
                                        {trx.type === 'Purchase' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{trx.description}</p>
                                        <p className="text-xs text-gray-500">{trx.date} • {trx.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">-{trx.amount}</p>
                                    <Badge variant="outline" className="text-xs">{trx.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Billing;
