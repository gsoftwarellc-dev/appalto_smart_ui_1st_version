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
        title: '',
        description: '',
        deadline: getDefaultDeadline(),
        budget: '',
        location: '',
        urgent: false,
        status: 'Open',
        jobType: '',
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
                    <CardTitle>Tender Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Title
                                </label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Roof Renovation"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Location
                                </label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    required
                                >
                                    <option value="">Select location</option>
                                    <option value="Rome">Rome</option>
                                    <option value="Milan">Milan</option>
                                    <option value="Florence">Florence</option>
                                    <option value="Naples">Naples</option>
                                    <option value="Turin">Turin</option>
                                    <option value="Venice">Venice</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Job Type
                                </label>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    required
                                >
                                    <option value="">Select job type</option>
                                    <option value="Construction & Renovation">Construction & Renovation</option>
                                    <option value="Electrical Works">Electrical Works</option>
                                    <option value="Plumbing & HVAC">Plumbing & HVAC</option>
                                    <option value="Painting & Decoration">Painting & Decoration</option>
                                    <option value="Landscaping">Landscaping</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="Open">Open</option>
                                    <option value="Review">Under Review</option>
                                    <option value="Awarded">Awarded</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Detailed description of works..."
                                required
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Deadline
                                </label>
                                <Input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    disabled
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                                <p className="text-xs text-blue-600 mt-1">Fixed duration: 15 days from today</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Budget (Optional)
                                </label>
                                <select
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="">Select range</option>
                                    <option value="€0 – €50,000">€0 – €50,000</option>
                                    <option value="€50,000 – €100,000">€50,000 – €100,000</option>
                                    <option value="€100,000 – €250,000">€100,000 – €250,000</option>
                                    <option value="Top than €250,000">Top than €250,000</option>
                                </select>
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
                                Mark as Urgent
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Bill of Quantities (Computo Metrico)
                            </label>

                            {/* BoQ Input Mode Toggle */}
                            <div className="flex bg-gray-100 p-1 rounded-md w-fit mb-4">
                                <button
                                    type="button"
                                    onClick={() => setBoqMode('file')}
                                    className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${boqMode === 'file' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Upload PDF (AI Extract)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setBoqMode('manual')}
                                    className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${boqMode === 'manual' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Manual Entry
                                </button>
                            </div>

                            {boqMode === 'file' ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-500">Click to upload PDF</span>
                                    <input type="file" className="hidden" accept=".pdf" />
                                </div>
                            ) : (
                                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 uppercase">
                                        <div className="col-span-6">Description</div>
                                        <div className="col-span-2">Unit</div>
                                        <div className="col-span-3">Quantity</div>
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
                                        + Add Item
                                    </Button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Manually enter the items that contractors will bid on.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/admin')}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Tender'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTender;
