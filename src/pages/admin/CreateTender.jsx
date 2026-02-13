import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Upload, Loader2, Plus, Trash, Info } from 'lucide-react';
import BackendApiService from '../../services/backendApi';

const CreateTender = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams(); // For edit mode
    const isEditMode = !!id;

    const getDefaultDeadline = () => {
        const date = new Date();
        date.setDate(date.getDate() + 15);
        return date.toISOString().split('T')[0];
    };

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: getDefaultDeadline(),
        budget: '',
        location: '',
        status: 'published'
    });

    // AI Extraction State
    const [activeTab, setActiveTab] = useState('manual');
    const [isUrgent, setIsUrgent] = useState(false);
    const [extractionStatus, setExtractionStatus] = useState(null); // 'uploading', 'processing', 'completed', 'error'
    const [uploadProgress, setUploadProgress] = useState(0);

    // Load tender data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            loadTenderData();
        }
    }, [id]);

    const loadTenderData = async () => {
        try {
            setLoading(true);
            const tender = await BackendApiService.getTenderById(id);
            setFormData({
                title: tender.title || '',
                description: tender.description || '',
                deadline: tender.deadline ? tender.deadline.split('T')[0] : getDefaultDeadline(),
                budget: tender.budget || '',
                location: tender.location || '',
                status: tender.status || 'draft'
            });

            // Load BOQ items if they exist
            if (tender.boqItems && Array.isArray(tender.boqItems)) {
                setBoqItems(tender.boqItems.map(item => ({
                    description: item.description,
                    unit: item.unit,
                    quantity: item.quantity,
                    item_type: item.item_type || 'unit_priced'
                })));
            } else {
                setBoqItems([]);
            }
            setError(null);
        } catch (error) {
            console.error("Failed to load tender", error);
            setError("Failed to load tender data.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // BOQ Management
    const [boqItems, setBoqItems] = useState([]);

    const addBoqItem = () => {
        setBoqItems([
            ...boqItems,
            { description: '', unit: '', quantity: '', item_type: 'unit_priced' }
        ]);
    };

    const removeBoqItem = (index) => {
        const newItems = [...boqItems];
        newItems.splice(index, 1);
        setBoqItems(newItems);
    };

    const handleBoqChange = (index, field, value) => {
        const newItems = [...boqItems];
        newItems[index][field] = value;
        setBoqItems(newItems);
    };

    // AI Extraction Logic
    const pollExtractionStatus = async (extractionId) => {
        const pollInterval = setInterval(async () => {
            try {
                const statusData = await BackendApiService.getExtractionStatus(extractionId);
                console.log("Polling extraction:", statusData.status);

                if (statusData.status === 'completed') {
                    clearInterval(pollInterval);
                    setExtractionStatus('completed');

                    if (statusData.data && statusData.data.boq_items) {
                        const newItems = statusData.data.boq_items.map(item => ({
                            description: item.description,
                            unit: item.unit,
                            quantity: item.quantity,
                            item_type: item.item_type || 'unit_priced'
                        }));
                        setBoqItems(prev => [...prev, ...newItems]);
                        setSuccess("BOQ items extracted successfully!");
                    }
                } else if (statusData.status === 'failed') {
                    clearInterval(pollInterval);
                    setExtractionStatus('error');
                    setError(`${t('admin.create.boq.extraction.error')}: ` + (statusData.error || 'Unknown error'));
                }
            } catch (err) {
                console.error("Polling error", err);
                clearInterval(pollInterval);
                setExtractionStatus('error');
            }
        }, 2000);
    };

    const handleFileUpload = async (files) => {
        const file = files[0];
        if (!file) return;

        try {
            setExtractionStatus('uploading');
            setUploadProgress(10);
            setError(null);

            const response = await BackendApiService.extractPdf(id, file);
            setUploadProgress(50);

            if (response.extraction_id) {
                setExtractionStatus('processing');
                pollExtractionStatus(response.extraction_id);
            } else if (response.data && response.data.boq_items) {
                // If it was synchronous and already completed
                setExtractionStatus('completed');
                setUploadProgress(100);
                const newItems = response.data.boq_items.map(item => ({
                    description: item.description,
                    unit: item.unit,
                    quantity: item.quantity,
                    item_type: item.item_type || 'unit_priced'
                }));
                setBoqItems(prev => [...prev, ...newItems]);
                setSuccess(t('admin.create.boq.extraction.success'));

                // Auto-switch to Manual Entry tab to show extracted items
            }
        } catch (err) {
            console.error('Extraction upload error:', err);
            setExtractionStatus('error');
            const backendError = err.response?.data?.error || err.response?.data?.message || err.message;
            setError(`AI Upload failed: ${backendError}. Check your internet and try again.`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            const tenderData = {
                ...formData,
                budget: formData.budget,
                boq_items: boqItems.map((item, index) => ({
                    ...item,
                    display_order: index + 1,
                    quantity: parseFloat(item.quantity) || 1
                }))
            };

            if (isEditMode) {
                await BackendApiService.updateTender(id, tenderData);
                setSuccess(t('admin.create.messages.successUpdate'));
            } else {
                await BackendApiService.createTender(tenderData);
                setSuccess(t('admin.create.messages.successCreate'));
            }

            // Redirect after short delay
            setTimeout(() => {
                navigate('/admin/tenders');
            }, 1500);
        } catch (error) {
            console.error("Failed to save tender", error);
            setError(error.response?.data?.message || t('admin.create.messages.errorSave'));
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!isEditMode) {
            setError(t('admin.create.messages.publishFirst'));
            return;
        }

        try {
            setSaving(true);
            setError(null);
            await BackendApiService.publishTender(id);
            setSuccess(t('admin.create.messages.successPublish'));
            setTimeout(() => {
                navigate('/admin/tenders');
            }, 1500);
        } catch (error) {
            console.error("Failed to publish tender", error);
            setError(t('admin.create.messages.errorPublish'));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="p-8 text-center flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
                {isEditMode ? t('admin.create.editTitle') : t('admin.createTender')}
            </h2>

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
                    <CardTitle>{isEditMode ? t('admin.create.editDetails') : t('admin.create.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold mb-2">
                                {t('admin.create.clientName')} / {t('admin.list.title')} <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter tender title"
                                required
                            />
                        </div>

                        {/* Location/Address */}
                        <div>
                            <label className="block text-sm font-bold mb-2">
                                {t('admin.create.address')} <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location/address"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold mb-2">
                                {t('admin.create.object')} <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="flex min-h-[200px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                                placeholder={t('admin.create.object')}
                                required
                            />
                        </div>

                        {/* Deadline and Budget */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {t('admin.create.deadline')} <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    {t('admin.create.estimatedAmount')} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="" disabled>{t('admin.create.estimatedAmount')}</option>
                                    <option value="0-50000">€0 – €50,000</option>
                                    <option value="50000-100000">€50,000 – €100,000</option>
                                    <option value="100000-250000">€100,000 – €250,000</option>
                                    <option value="250000+">More than €250,000</option>
                                </select>
                            </div>
                        </div>

                        {/* Urgent Checkbox */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="urgent"
                                checked={isUrgent}
                                onChange={(e) => setIsUrgent(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="urgent" className="text-sm font-medium text-gray-700">{t('contractor.tenders.urgent')}</label>
                        </div>

                        {/* Guidelines */}
                        <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-blue-800 text-sm">
                            <Info className="h-5 w-5 shrink-0" />
                            <div>
                                <p className="font-bold">{t('admin.create.boq.title')}</p>
                                <p>{t('admin.create.boq.description')}</p>
                            </div>
                        </div>

                        {/* BOQ Items Section */}
                        <div className="space-y-4">
                            {/* Tabs */}
                            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('ai')}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'ai'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {t('admin.create.boq.tabs.ai')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('manual')}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'manual'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {t('admin.create.boq.tabs.manual')}
                                </button>
                            </div>

                            {activeTab === 'ai' ? (
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative bg-white">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => handleFileUpload(e.target.files)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            disabled={extractionStatus === 'uploading' || extractionStatus === 'processing'}
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            {extractionStatus === 'uploading' || extractionStatus === 'processing' ? (
                                                <>
                                                    <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                                                    <p className="text-sm text-gray-600 font-medium">{t('admin.create.boq.upload.processing')} {uploadProgress}%</p>
                                                </>
                                            ) : extractionStatus === 'completed' ? (
                                                <>
                                                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Upload className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">{t('admin.create.boq.extraction.complete')}</p>
                                                    <p className="text-xs text-gray-500">{t('admin.create.boq.extraction.review')}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-10 w-10 text-gray-400" />
                                                    <p className="text-sm text-gray-600 font-medium">{t('admin.create.boq.upload.click')}</p>
                                                    <p className="text-xs text-gray-400">{t('admin.create.boq.upload.format')}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Show extracted BOQ items inline */}
                                    {boqItems.length > 0 && (
                                        <div className="space-y-4 pt-4 border-t">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-bold text-gray-900">{t('admin.create.boq.title')}</h3>
                                                <Button type="button" onClick={addBoqItem} variant="outline" size="sm" className="gap-2">
                                                    <Plus className="h-4 w-4" /> {t('admin.create.boq.addItem')}
                                                </Button>
                                            </div>
                                            <div className="space-y-3">
                                                {boqItems.map((item, index) => (
                                                    <div key={index} className="grid grid-cols-12 gap-2 items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                        <div className="col-span-12 md:col-span-5">
                                                            <label className="text-xs font-medium text-gray-500 mb-1 block">{t('admin.create.boq.table.description')} <span className="text-red-500">*</span></label>
                                                            <Input value={item.description} onChange={(e) => handleBoqChange(index, 'description', e.target.value)} placeholder={t('admin.create.boq.table.description')} className="bg-white" required />
                                                        </div>
                                                        <div className="col-span-4 md:col-span-2">
                                                            <label className="text-xs font-medium text-gray-500 mb-1 block">{t('admin.create.boq.table.type')}</label>
                                                            <select value={item.item_type} onChange={(e) => handleBoqChange(index, 'item_type', e.target.value)} className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                                                                <option value="unit_priced">{t('admin.create.boq.table.unitPrice')}</option>
                                                                <option value="lump_sum">{t('admin.create.boq.table.lumpSum')}</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-span-4 md:col-span-2">
                                                            <label className="text-xs font-medium text-gray-500 mb-1 block">{t('admin.create.boq.table.unit')} <span className="text-red-500">*</span></label>
                                                            <Input value={item.unit} onChange={(e) => handleBoqChange(index, 'unit', e.target.value)} placeholder="mq, kg..." className="bg-white" />
                                                        </div>
                                                        <div className="col-span-3 md:col-span-2">
                                                            <label className="text-xs font-medium text-gray-500 mb-1 block">{t('admin.create.boq.table.qty')} <span className="text-red-500">*</span></label>
                                                            <Input type="number" value={item.quantity} onChange={(e) => handleBoqChange(index, 'quantity', e.target.value)} placeholder="0" className="bg-white" />
                                                        </div>
                                                        <div className="col-span-1 flex justify-end pt-6">
                                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeBoqItem(index)} className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0">
                                                                <Trash className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900">{t('admin.create.boq.title')}</h3>
                                        <Button
                                            type="button"
                                            onClick={addBoqItem}
                                            variant="outline"
                                            size="sm"
                                            className="gap-2"
                                        >
                                            <Plus className="h-4 w-4" /> {t('admin.create.boq.addItem')}
                                        </Button>
                                    </div>

                                    {boqItems.length === 0 ? (
                                        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
                                            {t('admin.create.boq.noItems')}
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {boqItems.map((item, index) => (
                                                <div key={index} className="grid grid-cols-12 gap-2 items-start bg-gray-50 p-3 rounded-lg border border-gray-100 relative group">
                                                    <div className="col-span-12 md:col-span-5">
                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">{t('admin.create.boq.table.description')} <span className="text-red-500">*</span></label>
                                                        <Input
                                                            value={item.description}
                                                            onChange={(e) => handleBoqChange(index, 'description', e.target.value)}
                                                            placeholder={t('admin.create.boq.table.description')}
                                                            className="bg-white"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-span-4 md:col-span-2">
                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">{t('admin.create.boq.table.type')}</label>
                                                        <select
                                                            value={item.item_type}
                                                            onChange={(e) => handleBoqChange(index, 'item_type', e.target.value)}
                                                            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        >
                                                            <option value="unit_priced">{t('admin.create.boq.table.unitPrice')}</option>
                                                            <option value="lump_sum">{t('admin.create.boq.table.lumpSum')}</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-span-4 md:col-span-2">
                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">{t('admin.create.boq.table.unit')} <span className="text-red-500">*</span></label>
                                                        <Input
                                                            value={item.unit}
                                                            onChange={(e) => handleBoqChange(index, 'unit', e.target.value)}
                                                            placeholder="mq, kg..."
                                                            className="bg-white"
                                                        // disabled={item.item_type === 'lump_sum'} // Enabled by user request
                                                        />
                                                    </div>
                                                    <div className="col-span-3 md:col-span-2">
                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">{t('admin.create.boq.table.qty')} <span className="text-red-500">*</span></label>
                                                        <Input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleBoqChange(index, 'quantity', e.target.value)}
                                                            placeholder="0"
                                                            className="bg-white"
                                                        // disabled={item.item_type === 'lump_sum'} // Enabled by user request
                                                        />
                                                    </div>
                                                    <div className="col-span-1 flex justify-end pt-6">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeBoqItem(index)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/tenders')}
                                disabled={saving}
                            >
                                {t('admin.create.cancel')}
                            </Button>

                            {isEditMode && formData.status === 'draft' && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePublish}
                                    disabled={saving}
                                    className="border-green-500 text-green-600 hover:bg-green-50"
                                >
                                    {saving ? t('admin.create.publishing') : t('admin.create.publish')}
                                </Button>
                            )}

                            <Button type="submit" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        {isEditMode ? t('admin.create.updating') : t('admin.create.creating')}
                                    </>
                                ) : (
                                    isEditMode ? t('admin.create.update') : t('admin.create.submit')
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTender;
