import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Upload, FileText, Check, AlertCircle, Loader2, Zap, ArrowRight, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import api from '../../services/backendApi';

const AiScan = ({ tenderId, onDataExtracted }) => {
    const { t } = useTranslation();
    const [file, setFile] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleScan = async () => {
        if (!file) return;

        setIsScanning(true);
        setError(null);
        setUploadProgress(20);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('tender_id', tenderId);

        try {
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => (prev < 90 ? prev + 3 : prev));
            }, 600);

            const response = await api.scanBidDocument(formData);

            clearInterval(progressInterval);
            setUploadProgress(100);

            setTimeout(() => {
                setScanResult(response.data);
            }, 500);
        } catch (err) {
            console.error('Scan failed:', err);
            const backendError = err.response?.data?.message || err.response?.data?.error || err.message;
            setError(`AI engine error: ${backendError}. Please ensure your file is valid and readable.`);
        } finally {
            setIsScanning(false);
        }
    };

    const handleUseData = () => {
        if (scanResult && scanResult.boq_items) {
            onDataExtracted(scanResult.boq_items);
        }
    };

    return (
        <div className="w-full h-full bg-white animate-in fade-in duration-500">
            {!scanResult ? (
                <div className="p-6 space-y-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-blue-100 mb-2">
                        <div className="flex gap-3">
                            <div className="bg-blue-600 p-2 rounded-lg shrink-0 h-fit shadow-md shadow-blue-100">
                                <Zap className="h-5 w-5 text-white fill-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 leading-tight">Smart AI Data Extraction</h4>
                                <p className="text-xs text-gray-600 mt-1">
                                    Upload your BOQ or estimate to automatically map line items to this bid.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`relative group border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${file ? 'border-green-400 bg-green-50/20' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/10'
                        }`}>
                        <input
                            type="file"
                            id="file-upload"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf,.xls,.xlsx"
                            onChange={handleFileChange}
                            disabled={isScanning}
                        />

                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-3 rounded-full transition-all duration-300 ${file ? 'bg-green-100' : 'bg-gray-100'
                                }`}>
                                {file ? (
                                    <FileText className="h-8 w-8 text-green-600" />
                                ) : (
                                    <Upload className={`h-8 w-8 ${file ? 'text-green-600' : 'text-gray-400'}`} />
                                )}
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-gray-900 px-2 overflow-wrap-anywhere">
                                    {file ? file.name : 'Select or drop your PDF here'}
                                </h4>
                                <p className="text-[10px] text-gray-500 font-medium">
                                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Max size: 10MB'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {isScanning && (
                        <div className="space-y-3 px-1 animate-in slide-in-from-bottom-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-blue-700 flex items-center gap-2">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    {uploadProgress < 50 ? 'Reading document content now' : 'Mapping AI items to manual form fields'}
                                </span>
                                <span className="text-gray-500">{uploadProgress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-lg p-3">
                            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                            <AlertDescription className="text-xs font-medium leading-relaxed">{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="pt-2">
                        <Button
                            onClick={handleScan}
                            disabled={!file || isScanning}
                            className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold transition-all active:scale-[0.98]"
                        >
                            {isScanning ? 'Processing Document' : 'Process with Smart AI'}
                            {!isScanning && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="p-4 space-y-4 animate-in zoom-in-95 duration-300">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                        <div className="bg-green-600 p-1.5 rounded-full shrink-0">
                            <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-green-900">Scan successful!</h4>
                            <p className="text-[11px] text-green-700 font-medium leading-tight text-balance">
                                Found {scanResult.boq_items?.length || 0} items matching this tender requirements.
                            </p>
                        </div>
                    </div>

                    <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <div className="max-h-[300px] overflow-y-auto w-full custom-scrollbar">
                            <table className="w-full text-xs">
                                <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-100">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-bold text-gray-500 uppercase tracking-wider">Item Description</th>
                                        <th className="px-3 py-2 text-right font-bold text-gray-500 uppercase tracking-wider w-16">Qty</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {scanResult.boq_items?.map((item, index) => (
                                        <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-3 py-2.5 text-gray-700 font-medium leading-normal break-words">
                                                {item.description}
                                            </td>
                                            <td className="px-3 py-2.5 text-right text-gray-900 font-bold tabular-nums">
                                                {item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        <Button
                            onClick={handleUseData}
                            className="w-full h-11 rounded-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100 font-bold transition-all active:scale-[0.98]"
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Import to Your Bid Form
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setScanResult(null);
                                setFile(null);
                            }}
                            className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 text-xs font-bold"
                        >
                            <RefreshCw className="mr-2 h-3 w-3" />
                            Select Different File
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiScan;
