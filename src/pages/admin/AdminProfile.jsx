import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Mail, Lock, Upload, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminProfile = () => {
    const { t } = useTranslation();
    const [profileData, setProfileData] = useState({
        name: 'Admin User',
        email: 'admin@appalto.com',
        phone: '+39 123 456 7890',
        role: 'Amm.re Condominio',
        piva: '',
        studioAddress: '',
        studioCity: '',
        studioProvince: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Mock update - would call API in real app
        alert(t('admin.profile.save') + ' success!');
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert(t('admin.profile.passwordMismatch') || 'Passwords do not match!');
            return;
        }
        // Mock update - would call API in real app
        alert(t('admin.profile.updatePassword') + ' success!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('admin.profile.title')}</h2>
                <p className="text-gray-500">{t('admin.profile.subtitle')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Picture Card */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="relative">
                                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-4xl">
                                    AU
                                </div>
                                <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                                    <Camera className="h-5 w-5" />
                                </button>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{profileData.name}</h3>
                                <p className="text-sm text-gray-500">{profileData.role}</p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                                <Upload className="h-4 w-4 mr-2" /> {t('admin.profile.uploadPhoto')}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Information */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{t('admin.profile.infoTitle')}</CardTitle>
                        {!isEditing && (
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                {t('admin.profile.edit')}
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('admin.profile.fullName')}
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="text"
                                            className="pl-10"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('admin.profile.email')}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="email"
                                            className="pl-10"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('admin.profile.phone')}
                                    </label>
                                    <Input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        {t('admin.profile.role')}
                                    </label>
                                    <select
                                        value={profileData.role === 'System Administrator' ? 'Amm.re Condominio' : profileData.role}
                                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                                        disabled={!isEditing}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="Amm.re Condominio">Amm.re Condominio</option>
                                        <option value="Tecnico Delegato">Tecnico Delegato</option>
                                    </select>
                                </div>

                                {/* New Fields */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        {t('admin.profile.vat')}
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder={t('admin.profile.vat_placeholder')}
                                        value={profileData.piva || ''}
                                        onChange={(e) => setProfileData({ ...profileData, piva: e.target.value })}
                                        className={(!profileData.piva || profileData.piva.length !== 11) && isEditing ? "border-red-300 ring-red-200" : ""}
                                        disabled={!isEditing}
                                        maxLength={11}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{t('admin.profile.vat_placeholder')}</p>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        {t('admin.profile.studio')}
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        <Input
                                            type="text"
                                            placeholder={t('admin.profile.address_ph')}
                                            value={profileData.studioAddress || ''}
                                            onChange={(e) => setProfileData({ ...profileData, studioAddress: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            type="text"
                                            placeholder={t('admin.profile.city_ph')}
                                            value={profileData.studioCity || ''}
                                            onChange={(e) => setProfileData({ ...profileData, studioCity: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            type="text"
                                            placeholder={t('admin.profile.province_ph')}
                                            value={profileData.studioProvince || ''}
                                            onChange={(e) => setProfileData({ ...profileData, studioProvince: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {t('admin.profile.mandatory_note')}
                                    </p>
                                </div>
                            </div>
                            {isEditing && (
                                <div className="flex gap-2 justify-end mt-4">
                                    <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                                        {t('admin.profile.cancel')}
                                    </Button>
                                    <Button type="submit">
                                        {t('admin.profile.save')}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Change Password Card */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.profile.changePassword')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('admin.profile.currentPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    type="password"
                                    className="pl-10"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    placeholder={t('admin.profile.currentPassword')}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('admin.profile.newPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    type="password"
                                    className="pl-10"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    placeholder={t('admin.profile.newPassword')}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('admin.profile.confirmPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    type="password"
                                    className="pl-10"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    placeholder={t('admin.profile.confirmPassword')}
                                />
                            </div>
                        </div>
                        <Button type="submit">
                            {t('admin.profile.updatePassword')}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Account Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.profile.accountActivity')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm text-gray-600">{t('admin.profile.lastLogin')}</span>
                            <span className="text-sm font-medium">Today at 10:30 AM</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm text-gray-600">{t('admin.profile.accountCreated')}</span>
                            <span className="text-sm font-medium">January 15, 2026</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm text-gray-600">{t('admin.profile.totalTenders')}</span>
                            <span className="text-sm font-medium">12</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600">{t('admin.profile.totalBids')}</span>
                            <span className="text-sm font-medium">28</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminProfile;
