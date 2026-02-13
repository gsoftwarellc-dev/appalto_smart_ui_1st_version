import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Search, Send, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminMessages = () => {
    const { t } = useTranslation();
    // Mock Contractor Threads
    const [threads, setThreads] = useState([
        { id: 1, contractor: "Giovanni Rossi", lastMessage: "Thank you for the update", time: "10:30 AM", unread: 2, avatar: "GR" },
        { id: 2, contractor: "Maria Bianchi", lastMessage: "When will the results be announced?", time: "Yesterday", unread: 0, avatar: "MB" },
        { id: 3, contractor: "Luca Verdi", lastMessage: "I have submitted the documents", time: "2 days ago", unread: 1, avatar: "LV" },
        { id: 4, contractor: "Sofia Romano", lastMessage: "Could you clarify the requirements?", time: "Jan 25", unread: 0, avatar: "SR" },
    ]);
    const [activeThreadId, setActiveThreadId] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    // Mock Messages for the active thread
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello, I have submitted the required documents for the Rome tender.", sender: "other", time: "10:00 AM" },
        { id: 2, text: "Thank you for submitting. We are reviewing them now.", sender: "me", time: "10:15 AM" },
        { id: 3, text: "Your documents have been verified. You will hear back within 48 hours.", sender: "me", time: "10:20 AM" },
        { id: 4, text: "Thank you for the update", sender: "other", time: "10:30 AM" },
    ]);

    const activeThread = threads.find(t => t.id === activeThreadId);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: messages.length + 1,
            text: newMessage,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, msg]);
        setNewMessage('');

        // Update last message in thread list
        setThreads(threads.map(t =>
            t.id === activeThreadId ? { ...t, lastMessage: newMessage, time: "Now", unread: 0 } : t
        ));
    };

    const totalUnread = threads.reduce((sum, t) => sum + t.unread, 0);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
            {/* Sidebar / Thread List */}
            <div className="w-full md:w-80 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{t('admin.adminMessages.title')}</h2>
                        {totalUnread > 0 && (
                            <span className="text-sm text-gray-500">{totalUnread} {t('admin.adminMessages.unread')}</span>
                        )}
                    </div>
                    <Button size="icon" variant="ghost">
                        <MessageSquare className="h-5 w-5" />
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder={t('admin.adminMessages.searchPlaceholder')} className="pl-9 bg-white" />
                </div>

                <Card className="flex-1 overflow-hidden">
                    <CardContent className="p-0 h-full overflow-y-auto">
                        <div className="divide-y divide-gray-100">
                            {threads.map((thread) => (
                                <div
                                    key={thread.id}
                                    onClick={() => setActiveThreadId(thread.id)}
                                    className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${activeThreadId === thread.id ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0 text-sm">
                                        {thread.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className={`text-sm font-medium text-gray-900 ${thread.unread ? 'font-bold' : ''}`}>
                                                {thread.contractor}
                                            </h3>
                                            <span className="text-xs text-gray-400">{thread.time}</span>
                                        </div>
                                        <p className={`text-xs truncate ${thread.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                            {thread.lastMessage}
                                        </p>
                                    </div>
                                    {thread.unread > 0 && (
                                        <div className="flex items-center">
                                            <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                                                {thread.unread}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col h-full">
                <Card className="flex-1 flex flex-col overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                            {activeThread?.avatar}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{activeThread?.contractor}</h3>
                            <span className="text-xs text-gray-400">{t('admin.adminMessages.contractorLabel')}</span>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.sender === 'me'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                                    }`}>
                                    <p className="text-sm">{msg.text}</p>
                                    <span className={`text-[10px] block mt-1 text-right ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <Input
                                placeholder={t('admin.adminMessages.typeMessage')}
                                className="flex-1"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminMessages;
