import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Save, RefreshCw, Settings, ToggleLeft, ToggleRight, Info } from 'lucide-react';
import { Switch } from '../../components/ui/Switch'; // Assuming a switch component or using button toggle

const Configuration = () => {
    // Mock Configuration State
    const [config, setConfig] = useState({
        creditPriceBasic: 50,
        creditPricePro: 120,
        creditPriceEnterprise: 300,
        successFeePercent: 3.0,
        tenderDurationDays: 15,
        minBudgetValues: [0, 50000, 100000, 250000],

        autoApproveClients: false,
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('System configuration updated successfully.');
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Platform Configuration</h2>
                <p className="text-gray-500">Manage global system settings, pricing, and operational parameters.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Financial Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-blue-600" /> Financial Parameters
                        </CardTitle>
                        <CardDescription>Set pricing for credits and fees.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="credit-basic">Basic Credit Pack (€)</Label>
                                <Input
                                    id="credit-basic"
                                    type="number"
                                    value={config.creditPriceBasic}
                                    onChange={(e) => handleChange('creditPriceBasic', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="credit-pro">Pro Credit Pack (€)</Label>
                                <Input
                                    id="credit-pro"
                                    type="number"
                                    value={config.creditPricePro}
                                    onChange={(e) => handleChange('creditPricePro', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="success-fee">Success Fee Percentage (%)</Label>
                            <div className="relative">
                                <Input
                                    id="success-fee"
                                    type="number"
                                    step="0.1"
                                    value={config.successFeePercent}
                                    onChange={(e) => handleChange('successFeePercent', e.target.value)}
                                    className="pr-8"
                                />
                                <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                            </div>
                            <p className="text-xs text-gray-500">Applies to awarded contract value.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Operational Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-green-600" /> Operational Defaults
                        </CardTitle>
                        <CardDescription>Set default behaviors for tenders and users.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="tender-duration">Default Tender Duration (Days)</Label>
                            <Input
                                id="tender-duration"
                                type="number"
                                value={config.tenderDurationDays}
                                onChange={(e) => handleChange('tenderDurationDays', e.target.value)}
                            />
                        </div>



                        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                            <div className="space-y-0.5">
                                <Label className="text-base">Auto-Approve Clients</Label>
                                <p className="text-xs text-gray-500">Skip manual verification for new clients</p>
                            </div>
                            <button onClick={() => handleChange('autoApproveClients', !config.autoApproveClients)}>
                                {config.autoApproveClients ? (
                                    <ToggleRight className="h-8 w-8 text-green-600" />
                                ) : (
                                    <ToggleLeft className="h-8 w-8 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button size="lg" onClick={handleSave} disabled={isSaving} className="min-w-[150px]">
                    {isSaving ? (
                        <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" /> Save Configuration
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Configuration;
