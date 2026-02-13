import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/backendApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Save, RefreshCw, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import { Switch } from '../../components/ui/Switch';

const Configuration = () => {
    const { t } = useTranslation();

    // Default Configuration State
    const [config, setConfig] = useState({
        creditPriceBasic: 50,
        creditPricePro: 120,
        creditPriceEnterprise: 300,
        successFeePercent: 3.0,
        tenderDurationDays: 15,
        autoApproveClients: false,
    });

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const data = await api.getSystemConfig();
                if (data && Object.keys(data).length > 0) {
                    // Normalize boolean/number strings from DB
                    const formatted = { ...data };
                    if (formatted.autoApproveClients) formatted.autoApproveClients = formatted.autoApproveClients === '1' || formatted.autoApproveClients === 'true';
                    setConfig(prev => ({ ...prev, ...formatted }));
                }
            } catch (error) {
                console.error('Failed to fetch system config:', error);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await api.updateSystemConfig(config);
            alert(t('owner.configuration.saveSuccess') || 'System configuration updated successfully.');
        } catch (error) {
            console.error('Failed to update config:', error);
            alert(t('owner.configuration.saveError') || 'Failed to update configuration.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('owner.configuration.title')}</h2>
                <p className="text-gray-500">{t('owner.configuration.subtitle')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Financial Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-blue-600" /> {t('owner.configuration.financial')}
                        </CardTitle>
                        <CardDescription>{t('owner.configuration.financialDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="credit-basic">{t('owner.configuration.basicCredit')}</Label>
                                <Input
                                    id="credit-basic"
                                    type="number"
                                    value={config.creditPriceBasic}
                                    onChange={(e) => handleChange('creditPriceBasic', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="credit-pro">{t('owner.configuration.proCredit')}</Label>
                                <Input
                                    id="credit-pro"
                                    type="number"
                                    value={config.creditPricePro}
                                    onChange={(e) => handleChange('creditPricePro', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="success-fee">{t('owner.configuration.successFee')}</Label>
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
                            <p className="text-xs text-gray-500">{t('owner.configuration.successFeeDesc')}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Operational Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-green-600" /> {t('owner.configuration.operational')}
                        </CardTitle>
                        <CardDescription>{t('owner.configuration.operationalDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="tender-duration">{t('owner.configuration.tenderDuration')}</Label>
                            <Input
                                id="tender-duration"
                                type="number"
                                value={config.tenderDurationDays}
                                onChange={(e) => handleChange('tenderDurationDays', e.target.value)}
                            />
                        </div>

                        <div className="pt-4 pb-2">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('owner.configuration.aiModules')}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 border rounded bg-white">
                                    <Label className="text-sm cursor-pointer" htmlFor="ai-boq">{t('owner.configuration.autoBoq')}</Label>
                                    <Switch
                                        id="ai-boq"
                                        checked={true}
                                        onCheckedChange={() => { }}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-2 border rounded bg-white">
                                    <Label className="text-sm cursor-pointer" htmlFor="ai-match">{t('owner.configuration.smartMatching')}</Label>
                                    <Switch
                                        id="ai-match"
                                        checked={true}
                                        onCheckedChange={() => { }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                            <div className="space-y-0.5">
                                <Label className="text-base">{t('owner.configuration.autoApprove')}</Label>
                                <p className="text-xs text-gray-500">{t('owner.configuration.autoApproveDesc')}</p>
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
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> {t('owner.configuration.saving')}
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" /> {t('owner.configuration.save')}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Configuration;
