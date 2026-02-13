import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { ArrowLeft, Save, Upload, AlertTriangle, FileText, Plus, Trash2, Split, Link as LinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MockApiService from '../../services/mockApi';
import BackendApiService from '../../services/backendApi';
import { extractItemsFromPDF } from '../../utils/boqExtraction';

const ReviewBoq = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [originalPdf, setOriginalPdf] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tender, setTender] = useState(null);
    const [processing, setProcessing] = useState(false);

    // Load initial data via Service
    useEffect(() => {
        const loadData = async () => {
            try {
                const tenderData = await BackendApiService.getTenderById(id);
                setTender(tenderData);
                if (tenderData.boqItems && tenderData.boqItems.length > 0) {
                    setItems(tenderData.boqItems);
                }
            } catch (err) {
                console.error("Failed to load tender", err);
                // navigate('/admin/tenders'); // access denied or not found
            }
        };
        loadData();
    }, [id, navigate]);


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setOriginalPdf(file);
    };

    const runExtraction = async (type) => {
        if (!originalPdf) return;
        setProcessing(true);
        try {
            // Use Service to Simulate Upload & Extract
            const extractedItems = await extractItemsFromPDF(originalPdf, type);
            setItems(extractedItems);

            // Auto-save to drafting state
            await BackendApiService.updateTenderBoqItems(id, extractedItems);
        } catch (error) {
            console.error("Extraction failed", error);
            alert(t('admin.reviewBoq.failExtraction'));
        } finally {
            setProcessing(false);
        }
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleDeleteItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleAddItem = () => {
        const newItem = {
            id: Date.now(),
            source_item_no: "",
            description: "New Item",
            unit: "",
            quantity: 0,
            item_type: 'unit_priced',
            confidence: 1.0,
            warnings: [],
            is_optional: false
        };
        setItems([...items, newItem]);
    };

    const handlePublish = async () => {
        setLoading(true);
        try {
            // 1. Save Items
            await BackendApiService.updateTenderBoqItems(id, items);
            // 2. Publish Tender
            await BackendApiService.publishTender(id);

            navigate('/admin/tenders');
            alert(t('admin.reviewBoq.successPublish'));
        } catch (error) {
            console.error("Publish failed", error);
            alert(t('admin.reviewBoq.failPublish') + ": " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    // UI Helper for confidence color
    const getConfidenceColor = (score) => {
        if (score >= 0.9) return 'bg-white';
        if (score >= 0.7) return 'bg-amber-50';
        return 'bg-red-50';
    };

    return (
        <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/admin/tenders')}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> {t('admin.reviewBoq.back')}
                    </Button>
                    <h1 className="text-2xl font-bold">{t('admin.reviewBoq.title')}: {tender?.title}</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => BackendApiService.updateTenderBoqItems(id, items)}>
                        <Save className="h-4 w-4 mr-2" /> {t('admin.reviewBoq.saveDraft')}
                    </Button>
                    <Button onClick={handlePublish} disabled={loading || items.length === 0}>
                        {loading ? t('admin.reviewBoq.publishing') : t('admin.reviewBoq.publish')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* Left Panel: PDF Viewer / Upload */}
                <Card className="flex flex-col h-full">
                    <CardHeader className="shrink-0">
                        <CardTitle>{t('admin.reviewBoq.originalDoc')}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 bg-gray-100 flex items-center justify-center p-0 relative overflow-hidden">
                        {originalPdf ? (
                            <div className="w-full h-full flex flex-col">
                                <div className="bg-white border-b p-2 flex justify-between items-center text-sm px-4">
                                    <span className="font-medium truncate">{originalPdf.name}</span>
                                    <Button variant="ghost" size="sm" onClick={() => setOriginalPdf(null)} className="text-red-500 h-8">Remove</Button>
                                </div>
                                <div className="flex-1 flex items-center justify-center bg-gray-500/10">
                                    <div className="text-center space-y-4">
                                        <FileText className="h-16 w-16 mx-auto text-gray-400" />
                                        <p className="text-gray-500">{t('admin.reviewBoq.previewPlaceholder')}</p>
                                        <p className="text-xs text-gray-400 max-w-md mx-auto">
                                            {t('admin.reviewBoq.previewNote')}
                                        </p>
                                    </div>
                                </div>
                                {/* Extraction Controls Overlay or Bottom Bar */}
                                <div className="bg-white p-4 border-t space-y-3 shrink-0">
                                    <h4 className="font-semibold text-sm">{t('admin.reviewBoq.runExtraction')}</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" onClick={() => runExtraction('type_a')} disabled={processing} className="h-20 flex flex-col gap-2">
                                            <FileText className="h-5 w-5" />
                                            <span>{t('admin.reviewBoq.styleA')}</span>
                                            <span className="text-[10px] text-gray-500 font-normal">{t('admin.reviewBoq.styleADesc')}</span>
                                        </Button>
                                        <Button variant="outline" onClick={() => runExtraction('type_b')} disabled={processing} className="h-20 flex flex-col gap-2">
                                            <Split className="h-5 w-5" />
                                            <span>{t('admin.reviewBoq.styleB')}</span>
                                            <span className="text-[10px] text-gray-500 font-normal">{t('admin.reviewBoq.styleBDesc')}</span>
                                        </Button>
                                    </div>
                                    {processing && <p className="text-xs text-blue-600 animate-pulse text-center">{t('admin.reviewBoq.processing')}</p>}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg m-8 bg-white/50 w-full max-w-md">
                                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                                <h3 className="font-semibold text-lg mb-2">{t('admin.reviewBoq.uploadTitle')}</h3>
                                <p className="text-sm text-gray-500 mb-6">{t('admin.reviewBoq.uploadDesc')}</p>
                                <input
                                    type="file"
                                    id="pdf-upload"
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                />
                                <Button onClick={() => document.getElementById('pdf-upload').click()}>
                                    {t('admin.reviewBoq.selectFile')}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Right Panel: Digitized Items */}
                <Card className="flex flex-col h-full">
                    <CardHeader className="shrink-0 flex flex-row items-center justify-between">
                        <CardTitle>{t('admin.reviewBoq.digitizedItems')} ({items.length})</CardTitle>
                        <Button size="sm" variant="outline" onClick={handleAddItem}>
                            <Plus className="h-4 w-4 mr-2" /> {t('admin.reviewBoq.addItem')}
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-auto">
                        <div className="min-w-[500px]">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-left sticky top-0 z-10 shadow-sm">
                                    <tr>
                                        <th className="p-3 font-medium text-gray-500 w-16">{t('admin.reviewBoq.table.no')}</th>
                                        <th className="p-3 font-medium text-gray-500">{t('admin.reviewBoq.table.description')}</th>
                                        <th className="p-3 font-medium text-gray-500 w-20">{t('admin.reviewBoq.table.unit')}</th>
                                        <th className="p-3 font-medium text-gray-500 w-24">{t('admin.reviewBoq.table.qty')}</th>
                                        <th className="p-3 font-medium text-gray-500 w-16">{t('admin.reviewBoq.table.opts')}</th>
                                        <th className="p-3 font-medium text-gray-500 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {items.map((item, index) => (
                                        <tr key={index} className={`group ${getConfidenceColor(item.confidence || 1)} hover:bg-gray-50`}>
                                            <td className="p-3 align-top">
                                                <input
                                                    className="w-full bg-transparent border-none p-0 text-xs font-mono focus:ring-0"
                                                    value={item.source_item_no || ''}
                                                    onChange={(e) => handleItemChange(index, 'source_item_no', e.target.value)}
                                                    placeholder="#"
                                                />
                                                {item.confidence < 0.8 && (
                                                    <div className="mt-1">
                                                        <AlertTriangle className="h-3 w-3 text-amber-500" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-3 align-top">
                                                <textarea
                                                    className="w-full bg-transparent border-transparent focus:border-blue-300 border-b outline-none text-sm resize-none"
                                                    rows={item.description.length > 50 ? 3 : 2}
                                                    value={item.description}
                                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                />
                                                {/* Warnings */}
                                                {item.warnings && item.warnings.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {item.warnings.map((w, i) => (
                                                            <span key={i} className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded flex items-center">
                                                                <AlertTriangle className="h-2 w-2 mr-1" /> {w}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-3 align-top">
                                                <input
                                                    className="w-full bg-transparent border-b border-transparent focus:border-blue-300 text-center"
                                                    value={item.unit}
                                                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                                                />
                                                {item.item_type === 'lump_sum' && (
                                                    <span className="block text-[9px] text-gray-400 text-center mt-0.5">{t('admin.reviewBoq.lumpSum')}</span>
                                                )}
                                            </td>
                                            <td className="p-3 align-top">
                                                <input
                                                    type="number"
                                                    className={`w-full bg-transparent border-b border-transparent focus:border-blue-300 text-right ${item.item_type === 'lump_sum' ? 'opacity-50' : ''}`}
                                                    value={item.quantity}
                                                    readOnly={item.item_type === 'lump_sum'}
                                                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                                                />
                                            </td>
                                            <td className="p-3 align-top">
                                                {/* Option Toggle */}
                                                <div className="flex flex-col items-center gap-1">
                                                    <button
                                                        className={`p-1 rounded ${item.is_optional ? 'bg-blue-100 text-blue-600' : 'text-gray-300 hover:text-gray-500'}`}
                                                        onClick={() => handleItemChange(index, 'is_optional', !item.is_optional)}
                                                        title="Toggle Optional/Alternative"
                                                    >
                                                        <Split className="h-3 w-3" />
                                                    </button>
                                                    {item.is_optional && (
                                                        <div title="Group ID">
                                                            <LinkIcon className="h-3 w-3 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-3 align-top text-right">
                                                <button
                                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleDeleteItem(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {items.length === 0 && (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    {t('admin.reviewBoq.noItems')}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ReviewBoq;
