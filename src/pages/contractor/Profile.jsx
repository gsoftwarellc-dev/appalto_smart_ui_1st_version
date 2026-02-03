import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { User, MapPin, Briefcase, Mail, Eye, X, CheckCircle, Star } from 'lucide-react';

const Profile = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // Mock Profile Data
    const [profile, setProfile] = useState({
        name: "Giovanni Rossi", // Legale Rappresentante
        companyName: "Costruzioni Generali Rossi S.r.l.", // Denominazione
        vatNumber: "12345678901",
        fiscalCode: "RSSGNN80A01H501U",
        address: "Via Roma 10",
        city: "Roma",
        province: "RM",
        phone: "+39 333 1234567",
        email: "contractor@example.com",
        location: "Roma, Italy", // Computed or separate? Keeping for compatibility
        expertise: "General Construction, Renovation",
        description: "Experienced contractor with over 15 years in residential renovations.",
        avatar: null,
        visuraFile: null,
        presentationFile: null
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setProfile(prev => ({ ...prev, [field]: file }));
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Saving profile:", profile);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">{t('contractor.profile.title')}</h2>
                <Button variant="outline" onClick={() => setShowPreview(true)}>
                    <Eye className="h-4 w-4 mr-2" /> {t('contractor.profile.viewPublic')}
                </Button>
            </div>

            {/* Public Profile Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>

                        {/* Mock Public Profile Layout */}
                        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                        <div className="px-8 pb-8">
                            <div className="relative -mt-16 mb-6 flex justify-between items-end">
                                <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-full w-full p-6 text-gray-400" />
                                    )}
                                </div>
                                <div className="mb-2">
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                                        <CheckCircle className="h-3 w-3 mr-1" /> {t('contractor.profile.verified')}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        {profile.companyName || profile.name}
                                        <div className="flex text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                        </div>
                                    </h2>
                                    <p className="text-gray-500 flex items-center gap-2 mt-1">
                                        <MapPin className="h-4 w-4" /> {profile.city}, {profile.province}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500">{t('contractor.profile.expertise')}</p>
                                        <p className="font-medium">{profile.expertise}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{t('contractor.profile.memberSince')}</p>
                                        <p className="font-medium">Gen 2024</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">{t('contractor.profile.about')}</h3>
                                    <p className="text-gray-600 leading-relaxed">{profile.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="md:col-span-1">
                    <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                                {profile.avatar ? (
                                    <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-full w-full p-6 text-gray-400" />
                                )}
                            </div>
                            {isEditing && (
                                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                    <span className="text-xs">{t('contractor.profile.edit')}</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </label>
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{profile.name}</h3>
                            <p className="text-sm text-gray-500">{profile.companyName}</p>
                            <p className="text-xs text-gray-400 pt-1">{profile.expertise}</p>
                        </div>

                        <div className="w-full pt-4 space-y-2 text-sm text-left">
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4" /> {profile.city}, {profile.province}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="h-4 w-4" /> {profile.email}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Form */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{t('contractor.profile.details')}</CardTitle>
                        <Button
                            variant={isEditing ? "default" : "outline"}
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                            {isEditing ? t('contractor.profile.save') : t('contractor.profile.edit')}
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <h3 className="font-bold text-lg">{t('contractor.profile.mandatory')}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">{t('contractor.profile.companyName')}</label>
                                <Input
                                    disabled={!isEditing}
                                    value={profile.companyName}
                                    onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">{t('contractor.profile.vat')}</label>
                                <Input
                                    disabled={!isEditing}
                                    value={profile.vatNumber}
                                    placeholder={t('contractor.profile.vat_ph')}
                                    onChange={(e) => setProfile({ ...profile, vatNumber: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold">{t('contractor.profile.headquarters')}</label>
                            <Input
                                disabled={!isEditing}
                                value={profile.address}
                                placeholder={t('contractor.profile.address_ph')}
                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">{t('contractor.profile.city')}</label>
                                <Input
                                    disabled={!isEditing}
                                    value={profile.city}
                                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">{t('contractor.profile.province')}</label>
                                <Input
                                    disabled={!isEditing}
                                    value={profile.province}
                                    onChange={(e) => setProfile({ ...profile, province: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">{t('contractor.profile.email')}</label>
                                <Input
                                    disabled={!isEditing}
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">{t('contractor.profile.phone')}</label>
                                <Input
                                    disabled={!isEditing}
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">{t('contractor.profile.legalRep')}</label>
                                <Input
                                    disabled={!isEditing}
                                    value={profile.name}
                                    placeholder={t('contractor.profile.legalRep_ph')}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">{t('contractor.profile.fiscalCode')}</label>
                                <Input
                                    disabled={!isEditing}
                                    value={profile.fiscalCode}
                                    placeholder={t('contractor.profile.fiscalCode_ph')}
                                    onChange={(e) => setProfile({ ...profile, fiscalCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-gray-100">
                            <label className="text-sm font-bold block">{t('contractor.profile.uploadVisura')}</label>
                            {isEditing ? (
                                <input type="file" accept=".pdf" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={(e) => handleFileChange(e, 'visuraFile')} />
                            ) : (
                                <div className="text-sm text-gray-600 flex items-center gap-2 p-2 bg-gray-50 rounded">
                                    <CheckCircle className="h-4 w-4 text-green-500" /> {profile.visuraFile ? profile.visuraFile.name : "Visura_Camerale_Rossi_SRL.pdf"}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold block">{t('contractor.profile.uploadPresentation')}</label>
                            {isEditing ? (
                                <input type="file" accept=".pdf" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={(e) => handleFileChange(e, 'presentationFile')} />
                            ) : (
                                <p className="text-sm text-gray-400 italic">{t('contractor.profile.noFile')}</p>
                            )}
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
