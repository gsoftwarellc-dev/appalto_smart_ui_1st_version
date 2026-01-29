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
        name: "Giovanni Rossi",
        email: "contractor@example.com",
        location: "Roma, Italy",
        expertise: "General Construction, Renovation",
        description: "Experienced contractor with over 15 years in residential renovations. Specialized in historical building restoration and energy efficiency upgrades.",
        avatar: null
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

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically make an API call to save the data
        console.log("Saving profile:", profile);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
                <Button variant="outline" onClick={() => setShowPreview(true)}>
                    <Eye className="h-4 w-4 mr-2" /> View Public Profile
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
                                        <CheckCircle className="h-3 w-3 mr-1" /> Verified Contractor
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        {profile.name}
                                        <div className="flex text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                        </div>
                                    </h2>
                                    <p className="text-gray-500 flex items-center gap-2 mt-1">
                                        <MapPin className="h-4 w-4" /> {profile.location}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500">Expertise</p>
                                        <p className="font-medium">{profile.expertise}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="font-medium">Jan 2024</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">About</h3>
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
                                    <span className="text-xs">Change</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </label>
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{profile.name}</h3>
                            <p className="text-sm text-gray-500">{profile.expertise}</p>
                        </div>

                        <div className="w-full pt-4 space-y-2 text-sm text-left">
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4" /> {profile.location}
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
                        <CardTitle>Details</CardTitle>
                        <Button
                            variant={isEditing ? "default" : "outline"}
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input
                                disabled={!isEditing}
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Expertise Areas</label>
                            <Input
                                disabled={!isEditing}
                                value={profile.expertise}
                                onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                disabled={!isEditing}
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">About Me</label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={!isEditing}
                                value={profile.description}
                                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
