import React, { useState, useEffect } from 'react';
import Modal from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Label } from '../../../components/ui/Label';
import { Switch } from '../../../components/ui/Switch';
import { Loader2, Save } from 'lucide-react';
import api from '../../../services/backendApi';

const StripeConfigModal = ({ isOpen, onClose }) => {
    const [config, setConfig] = useState({
        stripe_publishable_key: '',
        stripe_secret_key: '',
        stripe_enabled: false,
        stripe_test_mode: true,
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchConfig();
        }
    }, [isOpen]);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const data = await api.getSystemConfig();
            if (data) {
                setConfig(prev => ({
                    ...prev,
                    stripe_publishable_key: data.stripe_publishable_key || '',
                    stripe_secret_key: data.stripe_secret_key || '',
                    stripe_enabled: data.stripe_enabled === 'true' || data.stripe_enabled === true,
                    stripe_test_mode: data.stripe_test_mode === 'true' || data.stripe_test_mode === true,
                }));
            }
        } catch (error) {
            console.error('Failed to fetch config:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await api.updateSystemConfig(config);
            onClose();
            // Optionally trigger a refresh or toast here
            alert('Stripe configuration saved successfully.');
        } catch (error) {
            console.error('Failed to save config:', error);
            alert('Failed to save Stripe configuration.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Stripe Payment Configuration"
            footer={
                <div className="flex justify-end gap-3 w-full">
                    <Button variant="outline" onClick={onClose} disabled={saving}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving || loading}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Configuration
                    </Button>
                </div>
            }
        >
            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="space-y-0.5">
                            <Label className="text-base font-medium">Enable Stripe Payments</Label>
                            <p className="text-xs text-gray-500">Allow users to pay via Stripe</p>
                        </div>
                        <Switch
                            checked={config.stripe_enabled}
                            onCheckedChange={(checked) => handleChange('stripe_enabled', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="space-y-0.5">
                            <Label className="text-base font-medium">Test Mode (Sandbox)</Label>
                            <p className="text-xs text-gray-500">Use test credentials for development</p>
                        </div>
                        <Switch
                            checked={config.stripe_test_mode}
                            onCheckedChange={(checked) => handleChange('stripe_test_mode', checked)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stripe-key">Publishable Key</Label>
                        <Input
                            id="stripe-key"
                            type="text"
                            placeholder="pk_test_..."
                            value={config.stripe_publishable_key}
                            onChange={(e) => handleChange('stripe_publishable_key', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stripe-secret">Secret Key</Label>
                        <Input
                            id="stripe-secret"
                            type="password"
                            placeholder="sk_test_..."
                            value={config.stripe_secret_key}
                            onChange={(e) => handleChange('stripe_secret_key', e.target.value)}
                        />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default StripeConfigModal;
