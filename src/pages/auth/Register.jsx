import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Check } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState('contractor');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        // Mock registration currently just redirects to login
        setTimeout(() => {
            setLoading(false);
            navigate('/login');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-blue-600">Appalto Smart</CardTitle>
                    <p className="text-center text-sm text-gray-500">{t('auth.register')}</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className={`cursor-pointer border rounded-lg p-4 text-center transition-all ${role === 'admin' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-1' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setRole('admin')}
                            >
                                <div className="font-semibold">{t('auth.admin')}</div>
                                {role === 'admin' && <Check className="mx-auto h-4 w-4 text-blue-600 mt-1" />}
                            </div>
                            <div
                                className={`cursor-pointer border rounded-lg p-4 text-center transition-all ${role === 'contractor' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-1' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setRole('contractor')}
                            >
                                <div className="font-semibold">{t('auth.contractor')}</div>
                                {role === 'contractor' && <Check className="mx-auto h-4 w-4 text-blue-600 mt-1" />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">{t('auth.email')}</label>
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">{t('auth.password')}</label>
                            <Input type="password" placeholder="••••••••" required />
                        </div>

                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? 'Creating Account...' : t('auth.register')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-500">
                    <div>
                        {t('auth.haveAccount')} <Link to="/login" className="text-blue-600 hover:underline">{t('auth.login')}</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
