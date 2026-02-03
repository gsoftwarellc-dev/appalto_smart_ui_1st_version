import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Upload } from 'lucide-react';

const CreateTender = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // Calculate default deadline: 15 days from today
    const getDefaultDeadline = () => {
        const date = new Date();
        date.setDate(date.getDate() + 15);
        return date.toISOString().split('T')[0];
    };

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        clientName: '',
        object: '',
        deadline: getDefaultDeadline(),
        estimatedAmount: '',
        address: '',
        urgent: false,
        status: 'Open', // Default, hidden
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // BoQ Manual Entry Logic
    const [boqMode, setBoqMode] = useState('file'); // 'file' or 'manual'
    const [boqItems, setBoqItems] = useState([
        { description: '', unit: '', quantity: '' }
    ]);

    const addBoqItem = () => {
        setBoqItems([...boqItems, { description: '', unit: '', quantity: '' }]);
    };

    const removeBoqItem = (index) => {
        const newItems = boqItems.filter((_, i) => i !== index);
        setBoqItems(newItems);
    };

    const handleBoqChange = (index, field, value) => {
        const newItems = [...boqItems];
        newItems[index][field] = value;
        setBoqItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Tender Data:', formData);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            navigate('/admin/tenders');
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{t('admin.createTender')}</h2>

            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.create.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Row 1: Denominazione/nome and Indirizzo */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    {t('admin.create.clientName')}
                                </label>
                                <Input
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    placeholder={t('admin.create.clientNamePlaceholder')}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    {t('admin.create.address')}
                                </label>
                                <Input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder={t('admin.create.addressPlaceholder')}
                                    required
                                />
                            </div>
                        </div>

                        {/* Oggetto */}
                        <div>
                            <label className="block text-sm font-bold mb-2">
                                {t('admin.create.object')}
                            </label>
                            <textarea
                                name="object"
                                value={formData.object}
                                onChange={handleChange}
                                className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder={t('admin.create.objectPlaceholder')}
                                required
                            />
                        </div>

                        {/* Row 3: Scadenza and Importo stimato */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {t('admin.create.deadline')}
                                </label>
                                <Input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    disabled
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                                <p className="text-xs text-blue-600 mt-1">{t('admin.create.fixedDuration')}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    {t('admin.create.estimatedAmount')}
                                </label>
                                <select
                                    name="estimatedAmount"
                                    value={formData.estimatedAmount}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    required
                                >
                                    <option value="">{t('admin.create.selectRange')}</option>
                                    <option value="€0 – €50,000">€0 – €50,000</option>
                                    <option value="€50,000 – €100,000">€50,000 – €100,000</option>
                                    <option value="€100,000 – €250,000">€100,000 – €250,000</option>
                                    <option value="Top than €250,000">Top than €250,000</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    {t('admin.create.mandatoryNote')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="urgent"
                                name="urgent"
                                checked={formData.urgent}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="urgent" className="text-sm font-medium">
                                {t('admin.create.urgent')}
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {t('admin.create.boq')}
                            </label>

                            {/* BoQ Input Mode Toggle */}
                            <div className="flex bg-gray-100 p-1 rounded-md w-fit mb-4">
                                <button
                                    type="button"
                                    onClick={() => setBoqMode('file')}
                                    className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${boqMode === 'file' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    {t('admin.create.uploadPdf')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setBoqMode('manual')}
                                    className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${boqMode === 'manual' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    {t('admin.create.manualEntry')}
                                </button>
                            </div>

                            {boqMode === 'file' ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">{t('admin.create.clickUpload')}</span>
                                    <input type="file" className="hidden" accept=".pdf" />
                                </div>
                            ) : (
                                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 uppercase">
                                        <div className="col-span-6">{t('admin.create.description')}</div>
                                        <div className="col-span-2">{t('admin.create.unit')}</div>
                                        <div className="col-span-3">{t('admin.create.quantity')}</div>
                                        <div className="col-span-1"></div>
                                    </div>

                                    {boqItems.map((item, index) => (
                                        <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                            <div className="col-span-6">
                                                <Input
                                                    placeholder="Item description"
                                                    value={item.description}
                                                    onChange={(e) => handleBoqChange(index, 'description', e.target.value)}
                                                    className="h-9"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <Input
                                                    placeholder="mq, kg..."
                                                    value={item.unit}
                                                    onChange={(e) => handleBoqChange(index, 'unit', e.target.value)}
                                                    className="h-9"
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    value={item.quantity}
                                                    onChange={(e) => handleBoqChange(index, 'quantity', e.target.value)}
                                                    className="h-9"
                                                />
                                            </div>
                                            <div className="col-span-1 text-center">
                                                {boqItems.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeBoqItem(index)}
                                                        className="text-red-500 hover:text-red-700 font-bold text-xl"
                                                        title="Remove"
                                                    >
                                                        &times;
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addBoqItem}
                                        className="w-full border-dashed"
                                    >
                                        + {t('admin.create.addItem')}
                                    </Button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {t('admin.create.manualNote')}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/admin')}>
                                {t('admin.create.cancel')}
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? t('admin.create.creating') : t('admin.create.submit')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTender;
