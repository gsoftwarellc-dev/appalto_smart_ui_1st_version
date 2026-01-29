import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Activity, Users } from 'lucide-react';

const cities = [
    { name: "Milano", top: "15%", left: "30%", tenders: 142, region: "region_north" },
    { name: "Torino", top: "18%", left: "18%", tenders: 89, region: "region_north" },
    { name: "Venezia", top: "16%", left: "45%", tenders: 65, region: "region_north" },
    { name: "Bologna", top: "28%", left: "42%", tenders: 78, region: "region_center" },
    { name: "Firenze", top: "35%", left: "40%", tenders: 92, region: "region_center" },
    { name: "Roma", top: "52%", left: "55%", tenders: 205, region: "region_center" },
    { name: "Napoli", top: "65%", left: "65%", tenders: 115, region: "region_south" },
    { name: "Bari", top: "60%", left: "80%", tenders: 54, region: "region_south" },
    { name: "Palermo", top: "85%", left: "60%", tenders: 62, region: "region_south" },
];

const ItalyMapSection = () => {
    const { t } = useTranslation();
    const [activeCity, setActiveCity] = useState(null);

    // Simulated "Live" ticker updates
    const [liveStats, setLiveStats] = useState({
        activeTenders: 1245,
        contractorsOnline: 342
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveStats(prev => ({
                activeTenders: prev.activeTenders + (Math.random() > 0.7 ? 1 : 0),
                contractorsOnline: Math.max(300, prev.contractorsOnline + Math.floor(Math.random() * 5) - 2)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-[#0B1120] relative overflow-hidden text-white min-h-[800px] flex flex-col justify-center">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[100px] rounded-full"></div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">

                {/* Text Content */}
                <div className="md:w-1/3 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-sm mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            LIVE NETWORK
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {t('map.title')}
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            {t('map.subtitle')}
                        </p>
                    </motion.div>

                    {/* Live Stats Cards */}
                    <div className="grid grid-cols-1 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors"
                        >
                            <div>
                                <div className="text-gray-400 text-sm mb-1">{t('map.active_tenders_live')}</div>
                                <div className="text-3xl font-mono font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                                    {liveStats.activeTenders.toLocaleString()}
                                </div>
                            </div>
                            <Activity className="h-10 w-10 text-blue-500/50 group-hover:text-blue-400 transition-colors" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors"
                        >
                            <div>
                                <div className="text-gray-400 text-sm mb-1">{t('map.contractors_online')}</div>
                                <div className="text-3xl font-mono font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                    {liveStats.contractorsOnline.toLocaleString()}
                                </div>
                            </div>
                            <Users className="h-10 w-10 text-indigo-500/50 group-hover:text-indigo-400 transition-colors" />
                        </motion.div>
                    </div>
                </div>

                {/* Map Visualization */}
                <div className="md:w-2/3 relative h-[600px] w-full flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                        whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative w-full h-full max-w-[500px]"
                    >
                        {/* Stylized Italy Map SVG Placeholder */}
                        {/* Using a rough SVG path for Italy's shape manually approximated for the visual effect */}
                        <svg viewBox="0 0 600 800" className="w-full h-full drop-shadow-[0_0_50px_rgba(37,99,235,0.3)]">
                            <defs>
                                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#172554" stopOpacity="0.9" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Simplified Italy Boot Shape */}
                            <path
                                d="M180,50 L350,50 L420,80 L380,150 L400,200 L350,250 L380,300 L450,400 L550,450 L580,550 L500,600 L450,550 L400,600 L350,650 L250,700 L200,650 L250,600 L300,550 L280,500 L250,450 L200,350 L150,300 L100,250 L120,200 L180,150 Z"
                                fill="url(#mapGradient)"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                className="opacity-80"
                                filter="url(#glow)"
                            />
                            {/* Sicily */}
                            <path d="M350,680 L450,680 L480,750 L400,780 L350,750 Z" fill="url(#mapGradient)" stroke="#3b82f6" strokeWidth="2" className="opacity-80" />
                            {/* Sardinia */}
                            <path d="M80,450 L150,450 L150,580 L80,580 Z" fill="url(#mapGradient)" stroke="#3b82f6" strokeWidth="2" className="opacity-80" />

                            {/* Connecting Lines Animation */}
                            <motion.path
                                d="M280,200 L450,500"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="1"
                                strokeDasharray="5 5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.path
                                d="M450,500 L380,700"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="1"
                                strokeDasharray="5 5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                            />
                        </svg>

                        {/* City Hotspots */}
                        {cities.map((city, index) => (
                            <div
                                key={index}
                                className="absolute cursor-pointer group"
                                style={{ top: city.top, left: city.left }}
                                onMouseEnter={() => setActiveCity(city)}
                                onMouseLeave={() => setActiveCity(null)}
                            >
                                <span className="relative flex h-6 w-6 items-center justify-center">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400 group-hover:bg-white transition-colors shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
                                </span>

                                {/* Tooltip */}
                                {activeCity?.name === city.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900/90 backdrop-blur-md border border-blue-500/30 text-white p-3 rounded-xl shadow-2xl min-w-[140px] z-50 pointer-events-none"
                                    >
                                        <div className="text-sm font-bold border-b border-gray-700 pb-1 mb-1">{city.name}</div>
                                        <div className="text-xs text-gray-400">{t(`map.${city.region}`)}</div>
                                        <div className="flex items-center gap-1 mt-1 text-blue-400 font-mono text-xs">
                                            <Activity className="h-3 w-3" />
                                            {city.tenders} Active
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ItalyMapSection;
