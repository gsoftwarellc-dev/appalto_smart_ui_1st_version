import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Loader2, User, Mail, Phone, MapPin, Building, Save } from 'lucide-react';
import BackendApiService from '../../services/backendApi';

const AdminProfile = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        company_name: ''
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await BackendApiService.getProfile();
            setProfileData({
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                city: data.city || '',
                company_name: data.company_name || ''
            });
            setError(null);
        } catch (error) {
            console.error("Failed to load profile", error);
            setError(t('admin.profile.loadError'));
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            await BackendApiService.updateProfile(profileData);
            setSuccess(t('admin.profile.updateSuccess'));

            setTimeout(() => setSuccess(null), 3000);
        } catch (error) {
            console.error("Failed to update profile", error);
            setError(t('admin.profile.updateError'));
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    if (loading) return <div className="p-8 text-center flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('admin.profile.title')}</h2>
                <p className="text-gray-500">{t('admin.profile.subtitle')}</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.profile.personalInfo')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User className="h-4 w-4 inline mr-1" />
                                {t('admin.profile.name')}
                            </label>
                            <Input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder={t('admin.profile.placeholders.name')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Mail className="h-4 w-4 inline mr-1" />
                                {t('admin.profile.email')}
                            </label>
                            <Input
                                type="email"
                                value={profileData.email}
                                disabled
                                className="bg-gray-50 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">{t('admin.profile.emailNote')}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Phone className="h-4 w-4 inline mr-1" />
                                {t('admin.profile.phone')}
                            </label>
                            <Input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder={t('admin.profile.placeholders.phone')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="h-4 w-4 inline mr-1" />
                                {t('admin.profile.city')}
                            </label>
                            <Input
                                type="text"
                                value={profileData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder={t('admin.profile.placeholders.city')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Building className="h-4 w-4 inline mr-1" />
                                {t('admin.profile.company')}
                            </label>
                            <Input
                                type="text"
                                value={profileData.company_name}
                                onChange={(e) => handleInputChange('company_name', e.target.value)}
                                placeholder={t('admin.profile.placeholders.company')}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={saving} className="flex items-center gap-2">
                                {saving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {t('admin.profile.saving')}
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        {t('admin.profile.saveChanges')}
                                    </>
                                )}
                            </Button>
                            <Button type="button" variant="outline" onClick={loadProfile}>
                                {t('admin.profile.cancel')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminProfile;
