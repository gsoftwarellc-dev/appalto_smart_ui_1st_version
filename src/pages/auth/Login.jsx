import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { ChevronDown, Check, Globe } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('contractor');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'it' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Mock login based on selection
        const email = role === 'admin' ? 'admin@example.com' : role === 'owner' ? 'owner@example.com' : 'contractor@example.com';
        const password = 'password';

        try {
            const result = await login(email, password);
            if (result.success) {
                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'owner') {
                    navigate('/owner');
                } else {
                    navigate('/contractor');
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
            <div className="absolute top-4 right-4">
                <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2 bg-white/50 hover:bg-white shadow-sm">
                    <Globe className="h-4 w-4" />
                    <span className="uppercase font-medium">{i18n.language === 'en' ? 'English' : 'Italiano'}</span>
                </Button>
            </div>

            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-4 flex flex-col items-center">
                    <img src="/logo.jpg" alt="Appalto Smart Logo" className="h-16 w-auto rounded-md shadow-sm" />
                    <div className="text-center space-y-1">
                        <CardTitle className="text-2xl font-bold text-blue-600">Appalto Smart</CardTitle>
                        <p className="text-sm text-gray-500">{t('auth.login')}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Role Selection Dropdown Replacement */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">{t('auth.select_dashboard')}</label>
                            <div className="relative">
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="flex h-12 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                >
                                    <option value="contractor">{t('auth.contractor')}</option>
                                    <option value="admin">{t('auth.client')}</option>
                                    <option value="owner">{t('auth.owner')}</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
                            </div>
                        </div>

                        {/* Disabled Inputs */}
                        <div className="space-y-4 pt-2 border-t border-gray-100">
                            <div className="space-y-2 opacity-60">
                                <label className="text-sm font-medium leading-none">{t('auth.email')}</label>
                                <Input
                                    type="email"
                                    value={role === 'admin' ? 'admin@appalto.smart' : role === 'owner' ? 'owner@appalto.smart' : 'contractor@appalto.smart'}
                                    disabled
                                    className="bg-gray-50 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2 opacity-60">
                                <label className="text-sm font-medium leading-none">{t('auth.password')}</label>
                                <Input
                                    type="password"
                                    value="••••••••••••"
                                    disabled
                                    className="bg-gray-50 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? t('auth.entering') : t('auth.enter_dashboard')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center border-t pt-4">
                    {/* Registration disabled for MVP */}
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
