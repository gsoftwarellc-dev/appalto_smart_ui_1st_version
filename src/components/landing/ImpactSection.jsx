import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, Area, AreaChart
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { TrendingUp, PieChart as PieChartIcon, Zap, ShieldCheck } from 'lucide-react';

const ImpactSection = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    // Data for Line Chart (Efficiency)
    const lineData = [
        { month: 'M1', traditional: 20, platform: 25 },
        { month: 'M2', traditional: 22, platform: 35 },
        { month: 'M3', traditional: 25, platform: 50 },
        { month: 'M4', traditional: 26, platform: 70 },
        { month: 'M5', traditional: 28, platform: 85 },
        { month: 'M6', traditional: 30, platform: 95 },
    ];

    // Data for Pie Chart (Resource Allocation)
    // Comparing "Traditional" (High Admin) vs "Platform" (High Value)
    // We'll show the "Platform" view primarily, or a comparison toggle?
    // Let's create two datasets to switch between or show side-by-side. 
    // For a single "Benefit" chart, let's show Where Money Goes in Appalto Smart vs Traditional.
    const pieDataTraditional = [
        { name: 'admin_cost', value: 40, color: '#94a3b8' }, // Gray
        { name: 'wasted_time', value: 25, color: '#ef4444' }, // Red
        { name: 'project_value', value: 35, color: '#3b82f6' }, // Blue
    ];

    const pieDataPlatform = [
        { name: 'admin_cost', value: 10, color: '#94a3b8' },
        { name: 'wasted_time', value: 5, color: '#22c55e' }, // Green (minimized)
        { name: 'project_value', value: 85, color: '#3b82f6' },
    ];

    const [pieMode, setPieMode] = useState('platform'); // 'traditional' | 'platform'

    return (
        <section className="py-24 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl translate-x-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
                    >
                        <Zap className="h-4 w-4" />
                        {t('charts.impact_title')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6"
                    >
                        {t('charts.impact_subtitle')}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* CHART 1: Efficiency Line Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="h-full shadow-2xl border border-white/10 bg-[#111827] overflow-hidden relative group backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 opacity-50"></div>
                            <div className="p-8 relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <TrendingUp className="h-6 w-6 text-blue-400" />
                                            {t('charts.efficiency_title')}
                                        </h3>
                                        <p className="text-gray-400 mt-2">{t('charts.efficiency_desc')}</p>
                                    </div>
                                    <div className="flex gap-4 text-sm font-medium">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <span className="w-3 h-3 rounded-full bg-gray-600"></span>
                                            {t('charts.traditional')}
                                        </div>
                                        <div className="flex items-center gap-2 text-blue-400">
                                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                            {t('charts.platform')}
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[350px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorPlatform" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorTraditional" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#475569" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#475569" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '12px', border: '1px solid #374151', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', backgroundColor: '#1f2937', color: '#fff' }}
                                                itemStyle={{ color: '#e5e7eb' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="traditional"
                                                stroke="#64748b"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorTraditional)"
                                                animationDuration={2000}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="platform"
                                                stroke="#3b82f6"
                                                strokeWidth={4}
                                                fillOpacity={1}
                                                fill="url(#colorPlatform)"
                                                animationDuration={2000}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* CHART 2: Resource Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="h-full shadow-2xl border border-white/10 bg-[#111827] overflow-hidden relative backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 via-transparent to-indigo-500/5 opacity-50"></div>
                            <div className="p-8 relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <PieChartIcon className="h-6 w-6 text-indigo-400" />
                                            {t('charts.resource_title')}
                                        </h3>
                                        <div className="flex bg-[#1f2937] p-1 rounded-lg border border-white/5">
                                            <button
                                                onClick={() => setPieMode('traditional')}
                                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${pieMode === 'traditional' ? 'bg-[#374151] shadow-sm text-white' : 'text-gray-400 hover:text-gray-300'}`}
                                            >
                                                {t('charts.traditional')}
                                            </button>
                                            <button
                                                onClick={() => setPieMode('platform')}
                                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${pieMode === 'platform' ? 'bg-indigo-600 shadow-sm text-white' : 'text-gray-400 hover:text-gray-300'}`}
                                            >
                                                {t('charts.platform')}
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 mt-2">{t('charts.resource_desc')}</p>
                                </div>

                                <div className="flex-grow flex items-center justify-center relative">
                                    <div className="h-[350px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieMode === 'traditional' ? pieDataTraditional : pieDataPlatform}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={80}
                                                    outerRadius={120}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {(pieMode === 'traditional' ? pieDataTraditional : pieDataPlatform).map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value) => `${value}%`}
                                                    contentStyle={{
                                                        borderRadius: '12px',
                                                        border: '1px solid #374151',
                                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                                                        backgroundColor: '#1f2937'
                                                    }}
                                                    itemStyle={{ color: '#e5e7eb' }}
                                                />
                                                <Legend
                                                    layout="vertical"
                                                    verticalAlign="middle"
                                                    align="right"
                                                    formatter={(value) => <span className="text-gray-300 font-medium ml-2">{t(`charts.${value}`)}</span>}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>

                                        {/* Center Text Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pr-[100px]"> {/* rough adjustment for legend */}
                                            <div className="text-center">
                                                <div className={`text-4xl font-bold ${pieMode === 'platform' ? 'text-blue-400' : 'text-gray-500'}`}>
                                                    {pieMode === 'platform' ? '85%' : '35%'}
                                                </div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">
                                                    {t('charts.project_value')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
