import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Globe, AlertCircle, ChevronDown } from 'lucide-react';
import BackendApiService from '../../services/backendApi';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'contractor',
        // Contractor-specific fields
        company_name: '',
        vat_number: '',
        fiscal_code: '',
        address: '',
        city: '',
        province: '',
        phone: '',
        legal_representative: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'it' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (formData.password !== formData.password_confirmation) {
            setError(t('auth.errors.passwordMatch'));
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError(t('auth.errors.passwordLength'));
            setLoading(false);
            return;
        }

        // Contractor validation
        if (formData.role === 'contractor') {
            if (!formData.company_name || !formData.vat_number) {
                setError(t('auth.errors.requiredFields'));
                setLoading(false);
                return;
            }
        }

        try {
            await BackendApiService.register(formData);
            alert(t('auth.errors.registrationSuccess') || 'Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.response?.data?.errors
                ? Object.values(err.response.data.errors).flat().join(', ')
                : t('auth.errors.registrationFailed');
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const isContractor = formData.role === 'contractor';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 relative">
            <div className="absolute top-4 right-4">
                <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2 bg-white/50 hover:bg-white shadow-sm">
                    <Globe className="h-4 w-4" />
                    <span className="uppercase font-medium">{i18n.language === 'en' ? 'English' : 'Italiano'}</span>
                </Button>
            </div>

            <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-blue-600 my-8">
                <CardHeader className="space-y-4 flex flex-col items-center pb-2">
                    <img src="/logo.jpg" alt="Appalto Smart Logo" className="h-16 w-auto rounded-md shadow-sm" />
                    <div className="text-center space-y-1">
                        <CardTitle className="text-2xl font-bold text-blue-600">{t('auth.createAccount')}</CardTitle>
                        <p className="text-sm text-gray-500">{t('auth.registerSubtitle')}</p>
                    </div>
                </CardHeader>

                <CardContent className="max-h-[calc(100vh-300px)] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Role Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                {t('auth.accountType')} *
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="flex h-11 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                >
                                    <option value="contractor">{t('auth.contractor')}</option>
                                    <option value="admin">{t('auth.admin')}</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">{t('auth.fullName')} *</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">{t('auth.email')} *</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">{t('auth.password')} *</label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">{t('auth.confirmPassword')} *</label>
                                <Input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contractor-specific fields */}
                        {isContractor && (
                            <>
                                <div className="pt-4 border-t">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('auth.companyInfo')}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">{t('auth.companyName')} *</label>
                                            <Input
                                                type="text"
                                                name="company_name"
                                                value={formData.company_name}
                                                onChange={handleChange}
                                                placeholder="ABC Construction SRL"
                                                required={isContractor}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">{t('auth.vatNumber')} *</label>
                                            <Input
                                                type="text"
                                                name="vat_number"
                                                value={formData.vat_number}
                                                onChange={handleChange}
                                                placeholder="IT12345678901"
                                                required={isContractor}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">{t('auth.fiscalCode')}</label>
                                            <Input
                                                type="text"
                                                name="fiscal_code"
                                                value={formData.fiscal_code}
                                                onChange={handleChange}
                                                placeholder="RSSMRA80A01H501U"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">{t('auth.phone')}</label>
                                            <Input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+39 123 456 7890"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-gray-700">{t('auth.address')}</label>
                                            <Input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Via Roma, 123"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">{t('auth.city')}</label>
                                            <Input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="Milano"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">{t('auth.province')}</label>
                                            <Input
                                                type="text"
                                                name="province"
                                                value={formData.province}
                                                onChange={handleChange}
                                                placeholder="MI"
                                                maxLength={2}
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-gray-700">{t('auth.legalRepresentative')}</label>
                                            <Input
                                                type="text"
                                                name="legal_representative"
                                                value={formData.legal_representative}
                                                onChange={handleChange}
                                                placeholder="Mario Rossi"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button className="w-full h-11 text-base font-medium" type="submit" disabled={loading}>
                            {loading ? t('auth.registering') : t('auth.registerButton')}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="justify-center border-t pt-4">
                    <p className="text-sm text-gray-600">
                        {t('auth.haveAccount')}{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                            {t('auth.loginHere')}
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;

