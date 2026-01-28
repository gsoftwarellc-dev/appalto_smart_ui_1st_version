import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Mail, Lock, Upload, Camera } from 'lucide-react';

const AdminProfile = () => {
    const [profileData, setProfileData] = useState({
        name: 'Admin User',
        email: 'admin@appalto.com',
        phone: '+39 123 456 7890',
        role: 'System Administrator',
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
        alert('Profile updated successfully!');
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Mock update - would call API in real app
        alert('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
                <p className="text-gray-500">Manage your account settings and preferences</p>
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
                                <Upload className="h-4 w-4 mr-2" /> Upload Photo
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Information */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Profile Information</CardTitle>
                        {!isEditing && (
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
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
                                        Email
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
                                        Phone
                                    </label>
                                    <Input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <Input
                                        type="text"
                                        value={profileData.role}
                                        disabled
                                    />
                                </div>
                            </div>
                            {isEditing && (
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        Save Changes
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
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    type="password"
                                    className="pl-10"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    placeholder="Enter current password"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    type="password"
                                    className="pl-10"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    placeholder="Enter new password"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    type="password"
                                    className="pl-10"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>
                        <Button type="submit">
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Account Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Account Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm text-gray-600">Last Login</span>
                            <span className="text-sm font-medium">Today at 10:30 AM</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm text-gray-600">Account Created</span>
                            <span className="text-sm font-medium">January 15, 2026</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span className="text-sm text-gray-600">Total Tenders Created</span>
                            <span className="text-sm font-medium">12</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600">Total Bids Managed</span>
                            <span className="text-sm font-medium">28</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminProfile;
