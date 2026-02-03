import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import {
    CheckCircle, Briefcase, Users, LayoutDashboard, FileText,
    ArrowRight, Star, Menu, X, Building, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import ImpactSection from '../components/landing/ImpactSection';
import ItalyMapSection from '../components/landing/ItalyMapSection';


// Mock Data for Chart
const chartData = [
    { month: 'Jan', tenders: 45, successRate: 65 },
    { month: 'Feb', tenders: 52, successRate: 68 },
    { month: 'Mar', tenders: 48, successRate: 72 },
    { month: 'Apr', tenders: 61, successRate: 75 },
    { month: 'May', tenders: 55, successRate: 78 },
    { month: 'Jun', tenders: 67, successRate: 82 },
    { month: 'Jul', tenders: 72, successRate: 85 },
];

const SpotlightCard = ({ children, className = "" }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 bg-[#111827] shadow-lg overflow-hidden rounded-2xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(59, 130, 246, 0.1),
                          transparent 80%
                        )
                    `,
                }}
            />
            {/* Border Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                    radial-gradient(
                      600px circle at ${mouseX}px ${mouseY}px,
                      rgba(59, 130, 246, 0.4),
                      transparent 40%
                    )
                  `,
                    zIndex: 0
                }}
            />
            <div className="relative h-full bg-[#111827] rounded-2xl z-10">
                {children}
            </div>
        </div>
    );
};


const LandingPage = () => {
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);

    const testimonials = [
        {
            id: 1,
            text: t('landing.testimonials.t1'),
            author: "Marco Rossi",
            role: "Property Developer",
            company: "Rossi Estates"
        },
        {
            id: 2,
            text: t('landing.testimonials.t2'),
            author: "Giuseppe Verdi",
            role: "General Contractor",
            company: "Verdi Costruzioni"
        },
        {
            id: 3,
            text: t('landing.testimonials.t3'),
            author: "Elena Bianchi",
            role: "Project Manager",
            company: "Milano Towers"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0B1120] font-sans text-white overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-100">
            {/* Navigation */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 w-full bg-[#0B1120]/80 backdrop-blur-xl z-50 border-b border-white/10 shadow-lg supports-[backdrop-filter]:bg-[#0B1120]/60"
            >
                <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/images/landing/logo.png" alt="Appalto Smart" className="h-10 w-auto" />
                        <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">Appalto Smart</span>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">
                            {t('landing.nav.signIn')}
                        </Link>
                        <Link to="/login">
                            <Button className="relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all group">
                                <span className="relative z-10">{t('landing.nav.getStarted')}</span>
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-500"></div>
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <LanguageSwitcher />
                        <button className="p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[#0B1120] border-t border-white/10 p-4 absolute w-full shadow-2xl overflow-hidden"
                        >
                            <div className="flex flex-col gap-4">
                                <Link to="/login" className="w-full">
                                    <Button variant="outline" className="w-full justify-center border-white/20 text-white hover:bg-white/10">{t('landing.nav.signIn')}</Button>
                                </Link>
                                <Link to="/register" className="w-full">
                                    <Button className="w-full justify-center bg-blue-600 hover:bg-blue-500 text-white shadow-lg">{t('landing.nav.getStarted')}</Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-[95vh] flex items-center">
                {/* ... (background effects remain) ... */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 45, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            x: [0, 50, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/20 to-blue-500/20 rounded-full blur-3xl"
                    />
                </div>

                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/images/landing/smart-construction-hero.png"
                        alt="Smart Construction Management"
                        className="w-full h-full object-cover scale-105 opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/90 to-[#0B1120]/40"></div>
                </motion.div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-4xl space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 text-blue-300 font-medium shadow-lg hover:shadow-blue-900/20 transition-shadow cursor-default"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            {t('landing.hero.slogan')}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.1]"
                        >
                            {t('landing.hero.title1')}<br />
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 bg-300% animate-gradient"
                            >
                                {t('landing.hero.title2')}
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed"
                        >
                            {t('landing.hero.desc')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Link to="/login">
                                <Button size="lg" className="group relative h-16 px-10 text-xl overflow-hidden bg-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    <span className="relative flex items-center gap-2">
                                        {t('landing.hero.startProject')} <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" size="lg" className="h-16 px-10 text-xl rounded-full border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all">
                                    {t('landing.hero.joinContractor')}
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* Stats Band */}
            <section className="bg-[#0f172a] border-y border-white/5 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                {/* Glowing accents */}
                <div className="absolute top-0 left-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 blur-sm"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        {[
                            { value: "€50M+", label: t('landing.stats.projectValue') },
                            { value: "1.2k+", label: t('landing.stats.activeContracts') },
                            { value: "98%", label: t('landing.stats.clientSatisfaction') },
                            { value: "24h", label: t('landing.stats.response') }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 hover:bg-white/5 rounded-xl transition-colors cursor-default"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-200 mb-2">{stat.value}</div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Analysis Charts */}
            {/* Impact Analysis Charts */}
            <ImpactSection />

            {/* Live Italy Map */}
            <ItalyMapSection />

            <section className="py-24 bg-[#0B1120] overflow-hidden relative border-t border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 md:px-8 relative">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-flex items-center gap-2 text-teal-400 font-semibold tracking-wide uppercase text-sm mb-4">
                                    <TrendingUp className="h-4 w-4" /> {t('landing.market.insights')}
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    {t('landing.market.title')}
                                </h2>
                                <p className="text-lg text-gray-400 leading-relaxed mb-6">
                                    {t('landing.market.desc')}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <SpotlightCard>
                                        <div className="p-6">
                                            <div className="text-3xl font-bold text-white">+24%</div>
                                            <div className="text-sm text-gray-400">{t('landing.market.volume')}</div>
                                        </div>
                                    </SpotlightCard>
                                    <SpotlightCard>
                                        <div className="p-6">
                                            <div className="text-3xl font-bold text-white">-15%</div>
                                            <div className="text-sm text-gray-400">{t('landing.market.cost')}</div>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </motion.div>
                        </div>

                        <div className="md:w-1/2 w-full h-[400px] bg-[#111827] p-6 rounded-2xl shadow-xl border border-white/10 ring-1 ring-white/5">
                            <h3 className="font-semibold text-white mb-6">{t('landing.market.chartTitle')}</h3>
                            <ResponsiveContainer width="100%" height="85%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorTenders" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151', color: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="tenders"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorTenders)"
                                        name="Active Tenders"
                                        animationDuration={2000}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="successRate"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorSuccess)"
                                        name="Success Rate %"
                                        animationDuration={2500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Split Section */}
            <section className="py-24 bg-[#0B1120] overflow-hidden">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="md:w-1/2 space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 text-blue-400 font-semibold tracking-wide uppercase text-sm">
                                <Briefcase className="h-4 w-4" /> {t('landing.features.forContractors')}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                {t('landing.features.title')}
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                {t('landing.features.desc')}
                            </p>

                            <ul className="space-y-4">
                                {[
                                    t('landing.features.list.access'),
                                    t('landing.features.list.compliance'),
                                    t('landing.features.list.payments'),
                                    t('landing.features.list.dashboard')
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="h-6 w-6 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                        </div>
                                        <span className="text-gray-300 font-medium">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <Link to="/register">
                                <Button variant="outline" className="mt-4 hover:scale-105 transition-transform border-blue-400/30 text-blue-400 hover:bg-blue-400/10">{t('landing.features.cta')}</Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                            <img
                                src="/images/landing/contractor-feature.png"
                                alt="Contractor using Appalto Smart"
                                className="relative rounded-2xl shadow-2xl w-full object-cover transform transition-transform duration-500 hover:scale-[1.02] ring-1 ring-white/10"
                            />
                            {/* Floating Card Animation */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 bg-[#1f2937] p-4 rounded-xl shadow-xl border border-white/10 max-w-xs hidden md:block"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-10 w-10 bg-green-900/30 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Status Update</p>
                                        <p className="font-bold text-white">Bid Accepted!</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300">Your proposal for "Milan Villa Renovation" was approved.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works (Spotlight Cards) */}
            <section className="py-24 bg-[#0f172a] relative border-t border-white/5">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('landing.how.title')}</h2>
                        <p className="text-lg text-gray-400">{t('landing.how.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                        {[
                            { icon: FileText, title: t('landing.how.step1.title'), desc: t('landing.how.step1.desc'), color: "text-blue-400", bg: "bg-blue-900/20" },
                            { icon: Users, title: t('landing.how.step2.title'), desc: t('landing.how.step2.desc'), color: "text-indigo-400", bg: "bg-indigo-900/20" },
                            { icon: LayoutDashboard, title: t('landing.how.step3.title'), desc: t('landing.how.step3.desc'), color: "text-teal-400", bg: "bg-teal-900/20" }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <SpotlightCard className="h-full">
                                    <div className="p-8 h-full flex flex-col items-center">
                                        <div className={`h-16 w-16 ${step.bg} rounded-2xl flex items-center justify-center mb-6 transform rotate-3 shadow-md border border-white/5`}>
                                            <step.icon className={`h-8 w-8 ${step.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-[#0B1120] border-t border-white/5">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-16">{t('landing.testimonials.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <SpotlightCard className="h-full">
                                    <div className="p-8 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex gap-1 text-yellow-400 mb-4">
                                                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-4 w-4 fill-current" />)}
                                            </div>
                                            <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">"{t.text}"</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-4 border-t border-white/10 pt-4">
                                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                                {t.author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-sm">{t.author}</p>
                                                <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden bg-blue-600">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"
                ></motion.div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

                <div className="container mx-auto px-4 text-center relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">{t('landing.cta.title')}</h2>
                        <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">{t('landing.cta.subtitle')}</p>
                        <Link to="/register">
                            <Button size="lg" className="group relative bg-white text-blue-600 hover:bg-gray-50 h-16 px-12 text-xl rounded-full font-bold shadow-2xl hover:scale-105 transition-all overflow-hidden">
                                <span className="relative z-10">{t('landing.cta.button')}</span>
                                <div className="absolute inset-0 w-full h-full bg-blue-50/50 scale-0 rounded-full transition-transform duration-300 group-hover:scale-150 origin-center"></div>
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#020617] text-gray-400 py-12 border-t border-white/10">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-white">
                                <img src="/images/landing/logo.png" alt="Appalto Smart" className="h-8 w-auto" />
                                <span className="font-bold text-xl">Appalto Smart</span>
                            </div>
                            <p className="text-sm leading-relaxed">{t('landing.footer.desc')}</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">{t('landing.footer.platform')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="#" className="hover:text-blue-400 transition-colors">{t('landing.footer.owners')}</Link></li>
                                <li><Link to="#" className="hover:text-blue-400 transition-colors">{t('landing.footer.contractors')}</Link></li>
                                <li><Link to="#" className="hover:text-blue-400 transition-colors">{t('landing.footer.pricing')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">{t('landing.footer.company')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="#" className="hover:text-blue-400 transition-colors">{t('landing.footer.about')}</Link></li>
                                <li><Link to="#" className="hover:text-blue-400 transition-colors">{t('landing.footer.careers')}</Link></li>
                                <li><Link to="#" className="hover:text-blue-400 transition-colors">{t('landing.footer.contact')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">{t('landing.footer.legal')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="#" className="hover:text-blue-400 transition-colors">{t('landing.footer.privacy')}</Link></li>
                                <li><Link to="#" className="hover:text-blue-400 transition-colors">{t('landing.footer.terms')}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default LandingPage;
