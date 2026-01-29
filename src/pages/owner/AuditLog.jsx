import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Shield, Filter, Download, List } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/Table";

const AuditLog = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Audit Logs
    const logs = [
        { id: 'LOG-001', action: 'System Config Update', user: 'Platform Owner', details: 'Changed Success Fee from 2.5% to 3.0%', ip: '192.168.1.1', timestamp: '2026-01-30 10:45:00' },
        { id: 'LOG-002', action: 'User Suspension', user: 'Platform Owner', details: 'Suspended user: Condominio Milano (ID: 3)', ip: '192.168.1.1', timestamp: '2026-01-29 16:30:22' },
        { id: 'LOG-003', action: 'Tender Force Close', user: 'Platform Owner', details: 'Closed tender #104 due to policy violation', ip: '192.168.1.1', timestamp: '2026-01-29 09:15:10' },
        { id: 'LOG-004', action: 'Login Success', user: 'Admin User', details: 'Successful login', ip: '203.0.113.45', timestamp: '2026-01-29 08:00:05' },
        { id: 'LOG-005', action: 'Contractor Verification', user: 'Platform Owner', details: 'Verified company: Rossi Costruzioni', ip: '192.168.1.1', timestamp: '2026-01-28 14:20:00' },
    ];

    const filteredLogs = logs.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Audit & Compliance Log</h2>
                <p className="text-gray-500">Immutable record of all critical system actions for legal and security traceability.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Shield className="h-5 w-5 text-gray-500" />
                            <CardTitle>System Activity</CardTitle>
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by action, user, or details..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>IP Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-xs text-gray-500">{log.timestamp}</TableCell>
                                    <TableCell className="font-medium">{log.action}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-gray-50">{log.user}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-md truncate" title={log.details}>
                                        {log.details}
                                    </TableCell>
                                    <TableCell className="text-xs text-gray-500">{log.ip}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuditLog;
