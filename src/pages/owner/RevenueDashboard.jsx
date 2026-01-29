import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DollarSign, TrendingUp, CreditCard, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const RevenueDashboard = ({ embedded = false }) => {
    // Mock Data
    const revenueData = [
        { month: 'Jan', credits: 4000, fees: 2400 },
        { month: 'Feb', credits: 3000, fees: 1398 },
        { month: 'Mar', credits: 2000, fees: 9800 },
        { month: 'Apr', credits: 2780, fees: 3908 },
        { month: 'May', credits: 1890, fees: 4800 },
        { month: 'Jun', credits: 2390, fees: 3800 },
        { month: 'Jul', credits: 3490, fees: 4300 },
    ];

    const transactionHistory = [
        { id: 'TXN-1234', user: 'Rossi Costruzioni', type: 'Credit Purchase', amount: '€500.00', status: 'Completed', date: 'Today, 10:23 AM' },
        { id: 'TXN-1235', user: 'Impianti Verdi', type: 'Success Fee', amount: '€1,250.00', status: 'Completed', date: 'Yesterday, 4:15 PM' },
        { id: 'TXN-1236', user: 'Mario Rossi Ditta', type: 'Credit Purchase', amount: '€50.00', status: 'Pending', date: 'Yesterday, 9:00 AM' },
        { id: 'TXN-1237', user: 'Studio Tecnico Bianchi', type: 'Subscription', amount: '€0.00', status: 'Completed', date: 'Jan 28, 2026' },
    ];

    return (
        <div className="space-y-6">
            {!embedded && (
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Revenue Dashboard</h2>
                    <p className="text-gray-500">Track financial performance, credit sales, and success fee collections.</p>
                </div>
            )}

            {/* KPI Cards */}
            <div className={`grid gap-4 ${embedded ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
                {!embedded && ((
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue (YTD)</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">€45,231.00</div>
                            <div className="flex items-center text-xs text-green-600 mt-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last year
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Credit Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€12,450.00</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +4.5% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Success Fees</CardTitle>
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€32,781.00</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +12.3% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Pending Payments</CardTitle>
                        <Activity className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€3,450.00</div>
                        <div className="flex items-center text-xs text-red-600 mt-1">
                            <ArrowDownRight className="h-3 w-3 mr-1" /> 7 overdue invoices
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="credits" name="Credit Sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="fees" name="Success Fees" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Growth Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="fees" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Transactions</CardTitle>
                        <Button variant="outline" size="sm">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {transactionHistory.map((txn) => (
                            <div key={txn.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${txn.type === 'Credit Purchase' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                        }`}>
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{txn.user}</p>
                                        <p className="text-xs text-gray-500">{txn.type} • {txn.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">{txn.amount}</p>
                                    <p className={`text-xs ${txn.status === 'Completed' ? 'text-green-600' : 'text-amber-600'
                                        }`}>{txn.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RevenueDashboard;
