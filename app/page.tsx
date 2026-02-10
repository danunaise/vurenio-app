'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import {
    Home, Calendar, Plus, Bell, User, Mic, ChevronRight, MapPin,
    Clock, MoreHorizontal, CheckCircle, X, Sparkles, Lock, Mail,
    Smartphone, Check, Zap, Crown, LogOut, Settings, CreditCard,
    ChevronLeft, Moon, Globe, Shield, HelpCircle, Volume2, BellRing,
    RefreshCw, Trash2, ArrowUp, Send, Users, ShoppingBag, ListTodo,
    Activity, Repeat, Coins, Plane, CheckSquare, Edit2, Share2,
    MessageCircle, FileText, AlertTriangle, Sun, Lightbulb, Car,
    CloudSun, ClipboardList, Wind, Droplets, Camera, PieChart, ChevronUp,
    BarChart3, Hourglass, Filter, Info, Timer, Play, Pause, SquareChevronUp,
    RotateCcw, Sprout, SlidersHorizontal, Palette, Bot, Star, Flame,
    Coffee, Receipt, BookOpen, Monitor, Layers, StickyNote, HelpCircle as QuestionIcon,
    Rocket, Brain, LayoutGrid
} from 'lucide-react';

// --- Theme Context ---
type ColorTheme = 'sky' | 'mint' | 'peach' | 'lavender';

type ThemeContextValue = {
    isDarkMode: boolean;
    toggleTheme: () => void;
    colorTheme: ColorTheme;
    setColorTheme: (theme: ColorTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
    isDarkMode: false,
    toggleTheme: () => { },
    colorTheme: 'sky',
    setColorTheme: (_theme: ColorTheme) => { }
});

// --- Timeline Data Source ---
const timelineData = [
    {
        id: '1', type: 'event', title: "ประชุม Design System", time: "10:00", location: "Zoom Meeting", participants: ['A', 'B', 'K'], tag: "งาน", tagColor: "#79D4FF",
        tips: "เตรียมสรุปประเด็นสำคัญจากการประชุมครั้งก่อนไว้ด้วยนะ จะได้คุยต่อได้ลื่นไหล"
    },
    {
        id: '2', type: 'todo', title: "ตอบอีเมลลูกค้า K.Som", time: "11:30", tag: "งาน", tagColor: "#F472B6", completed: false
    },
    {
        id: '3', type: 'expense', title: "ค่าอาหารกลางวัน", time: "12:30", amount: "150", tag: "อาหาร", tagColor: "#EF4444"
    },
    {
        id: '4', type: 'note', title: "ไอเดียโปรเจกต์ใหม่", time: "13:45", note: "ธีมสีควรใช้พาสเทล ตัดกับสีเข้ม", tag: "ไอเดีย", tagColor: "#FBBF24"
    },
    {
        id: '5', type: 'shopping', title: "ซื้อของเข้าบ้าน", time: "17:00", items: ['นมสด', 'ไข่ไก่', 'ขนมปัง', 'ผักสลัด'], tag: "ช้อปปิ้ง", tagColor: "#F97316", location: "Big C"
    },
    {
        id: '6', type: 'unknown', title: "นัดหมอฟัน?", time: "18:00", tag: "รอระบุ", tagColor: "#94A3B8"
    },
    {
        id: '7', type: 'event', title: "ทริปหัวหิน (จองโรงแรม)", time: "14:00", location: "The Standard Hua Hin", tag: "เที่ยว", tagColor: "#8B5CF6", date: "25 ธ.ค.",
        travelTime: "ควรออกจากบ้านเวลา 10:00 น.",
        weather: "แดดจ้า 32°C",
        prepList: ["ชุดว่ายน้ำ", "แว่นกันแดด", "ครีมกันแดด"],
        tips: "ช่วงเทศกาลรถอาจจะติด แนะนำให้เผื่อเวลาเดินทางอีก 30 นาทีครับ"
    }
];

// --- Mock Data for Next Event Card Dev Tool ---
const mockNextEvents = {
    all: {
        type: 'event',
        title: "Overview Mode",
        subtitle: "Showing all events",
        time: "Today",
        location: "All Locations",
        tag: "Mixed",
        icon: Layers,
        color: "from-slate-700 to-slate-900",
        shadow: "shadow-slate-200",
        badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
        action1: "View Calendar",
        action2: "Add New"
    },
    event: {
        type: 'event',
        title: "ประชุม Design System",
        subtitle: "Zoom Meeting",
        time: "10:00 - 11:00",
        location: "Online",
        tag: "Meeting",
        icon: Clock,
        color: "from-indigo-500 to-blue-600",
        shadow: "shadow-indigo-200",
        badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
        action1: "Join Now",
        action2: "Later"
    },
    todo: {
        type: 'todo',
        title: "ส่ง Final Draft",
        subtitle: "Deadline: วันนี้",
        time: "ภายใน 16:00",
        location: "Work",
        tag: "Task",
        icon: CheckSquare,
        color: "from-pink-500 to-rose-500",
        shadow: "shadow-pink-200",
        badgeColor: "bg-pink-50 text-pink-600 border-pink-100",
        action1: "Mark Done",
        action2: "Snooze"
    },
    shopping: {
        type: 'shopping',
        title: "ซื้อของเข้าบ้าน",
        subtitle: "Big C Extra • 12 รายการ",
        time: "หลังเลิกงาน",
        location: "2.5 km away",
        tag: "Shopping",
        icon: ShoppingBag,
        color: "from-orange-400 to-red-500",
        shadow: "shadow-orange-200",
        badgeColor: "bg-orange-50 text-orange-600 border-orange-100",
        action1: "View List",
        action2: "Mark Done"
    },
    habit: {
        type: 'habit',
        title: "อ่านหนังสือพัฒนาตนเอง",
        subtitle: "Atomic Habits • บทที่ 4",
        time: "เป้าหมาย: 30 นาที",
        location: "ห้องนั่งเล่น",
        tag: "Habit",
        icon: Activity,
        color: "from-emerald-400 to-teal-600",
        shadow: "shadow-emerald-200",
        badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
        action1: "Start Timer",
        action2: "Skip"
    },
    expense: {
        type: 'expense',
        title: "ชำระค่าอินเทอร์เน็ต",
        subtitle: "True Online",
        time: "ครบกำหนดวันนี้",
        location: "749.00 ฿",
        tag: "Bill",
        icon: Receipt,
        color: "from-rose-500 to-pink-600",
        shadow: "shadow-rose-200",
        badgeColor: "bg-rose-50 text-rose-600 border-rose-100",
        action1: "Pay Now",
        action2: "Remind"
    },
    note: {
        type: 'note',
        title: "รหัสเข้าตึกใหม่",
        subtitle: "Pinned Note",
        time: "บันทึกเมื่อเช้า",
        location: "Note",
        tag: "Memo",
        icon: StickyNote,
        color: "from-yellow-400 to-amber-500",
        shadow: "shadow-yellow-200",
        badgeColor: "bg-yellow-50 text-yellow-600 border-yellow-100",
        action1: "Edit",
        action2: "Unpin"
    },
    unknown: {
        type: 'unknown',
        title: "รายการที่ระบุไม่ได้",
        subtitle: "ต้องการข้อมูลเพิ่มเติม",
        time: "???",
        location: "Unknown",
        tag: "Unsorted",
        icon: QuestionIcon,
        color: "from-gray-500 to-slate-600",
        shadow: "shadow-gray-200",
        badgeColor: "bg-gray-50 text-gray-600 border-gray-100",
        action1: "Categorize",
        action2: "Delete"
    }
} as const;

// ==========================================
// 1. SHARED COMPONENTS (PRIMITIVES)
// ==========================================

const GlassCard = ({ children, className = '', onClick, style, variant = 'glass' }: any) => (
    <div
        onClick={onClick}
        className={`transition-all duration-300 ${className} ${variant === 'glass' ? 'backdrop-blur-xl' : 'bg-white'}`}
        style={{
            backgroundColor: variant === 'glass' ? 'var(--card-bg)' : 'var(--card-bg)',
            borderColor: variant === 'solid' ? '#E2E8F0' : 'var(--card-border)',
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: variant === 'solid' ? '0 8px 30px -6px rgba(0,0,0,0.08)' : 'var(--card-shadow)', // Increased shadow for solid cards
            borderRadius: '24px',
            ...style
        }}
    >
        {children}
    </div>
);

const PrimaryButton = ({ children, onClick, className = '' }: any) => (
    <button
        onClick={onClick}
        className={`w-full py-4 rounded-[20px] text-white font-bold text-lg shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ${className}`}
        style={{
            background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
            boxShadow: '0 8px 20px -6px var(--primary)'
        }}
    >
        {children}
    </button>
);

const GlowInput = ({ icon: Icon, placeholder, type = "text", defaultValue, onChange, value }: any) => (
    <div className="relative group mb-5">
        {Icon && (
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors duration-300">
                <Icon size={22} />
            </div>
        )}
        <input
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            className={`w-full border-2 rounded-[20px] py-4 pr-6 focus:outline-none transition-all duration-300 placeholder-gray-400 text-base shadow-sm ${Icon ? 'pl-14' : 'pl-6'}`}
            style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--glass-border)',
                color: 'var(--text-primary)',
            }}
            onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 4px var(--primary-dim)';
                e.target.style.backgroundColor = 'var(--card-bg)';
            }}
            onBlur={(e) => {
                e.target.style.borderColor = 'var(--glass-border)';
                e.target.style.boxShadow = 'none';
                e.target.style.backgroundColor = 'var(--input-bg)';
            }}
        />
    </div>
);

const Toggle = ({ checked, onChange }: any) => (
    <div
        onClick={onChange}
        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out`}
        style={{ backgroundColor: checked ? 'var(--primary)' : 'var(--toggle-bg)' }}
    >
        <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
);

// ==========================================
// 2. FEATURE COMPONENTS
// ==========================================

const BottomNav = ({ activeTab, onNavigate, onAdd }: any) => {
    const items = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'calendar-week', icon: Calendar, label: 'Calendar' },
        { id: 'add', icon: Plus, label: 'Add', isFab: true },
        { id: 'notifications', icon: Bell, label: 'Alerts' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div
            className="absolute bottom-0 left-0 w-full h-[90px] backdrop-blur-3xl border-t flex items-center justify-around px-2 z-[50] rounded-t-[35px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-colors duration-300"
            style={{
                backgroundColor: 'var(--nav-bg)',
                borderColor: 'var(--glass-border)'
            }}
        >
            {items.map((item) => {
                const isActive = activeTab === item.id || (activeTab === 'calendar-month' && item.id === 'calendar-week') || (activeTab === 'pomodoro' && item.id === 'home');

                if (item.isFab) {
                    return (
                        <button
                            key={item.id}
                            onClick={onAdd}
                            className="relative -top-8 p-4 rounded-full border-4 border-[var(--bg-primary)] transform transition-all hover:scale-110 active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
                                boxShadow: '0 10px 25px -5px var(--primary-dim)'
                            }}
                        >
                            <Sparkles className="text-white w-7 h-7" />
                        </button>
                    );
                }

                return (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex flex-col items-center justify-center p-2 transition-all duration-300 ${isActive ? '-translate-y-1' : 'text-gray-400 hover:text-gray-500'}`}
                        style={{ color: isActive ? 'var(--primary)' : undefined }}
                    >
                        <div className={`p-2 rounded-2xl transition-all`} style={{ backgroundColor: isActive ? 'var(--primary-dim)' : 'transparent' }}>
                            <item.icon size={26} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full mt-1" style={{ backgroundColor: 'var(--primary)' }}></div>}
                    </button>
                );
            })}
        </div>
    );
};

const Mascot = () => {
    const [showTip, setShowTip] = useState(false);
    const [tipIndex, setTipIndex] = useState(0);
    const tips = [
        "อย่าลืมดื่มน้ำวันละ 8 แก้วนะครับ! 💧",
        "พักสายตาทุก 20 นาทีช่วยลดความล้าได้นะ 👀",
        "วันนี้อากาศดี เหมาะแก่การเดินเล่นสุดๆ ☀️",
        "งานเสร็จแล้วอย่าลืมติ๊กถูกด้วยนะ ✅",
        "สู้ๆ นะครับ คุณทำได้แน่นอน! ✌️"
    ];

    useEffect(() => {
        const timer = setTimeout(() => setShowTip(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const toggleTip = () => {
        if (!showTip) {
            setTipIndex((prev) => (prev + 1) % tips.length);
        }
        setShowTip(!showTip);
    };

    return (
        <div className="absolute bottom-[100px] right-4 z-[60] flex flex-col items-end pointer-events-auto">
            {/* Speech Bubble */}
            <div
                className={`mb-3 mr-2 max-w-[200px] p-3 rounded-2xl rounded-tr-sm bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl transform transition-all duration-300 origin-bottom-right ${showTip ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4 pointer-events-none'}`}
            >
                <p className="text-xs text-slate-800 font-bold leading-relaxed">
                    {tips[tipIndex]}
                </p>
            </div>

            {/* Character */}
            <button
                onClick={toggleTip}
                className="relative w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] transform transition-transform hover:scale-110 active:scale-95 animate-bounce-slow"
                style={{
                    background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
                    animationDuration: '3s'
                }}
            >
                {/* Status Dot */}
                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full z-20"></div>
                {/* Simple Face using Icons/Divs */}
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <Bot size={28} />
                </div>
            </button>
        </div>
    );
};

const EventCard = ({ type = 'event', time, title, location, tag, tagColor, participants = [], items = [], amount, recurrence, tips, note, completed, onClick, showTime = true, variant = 'glass', className = '' }: any) => (
    <GlassCard
        onClick={onClick}
        variant={variant}
        className={`p-4 relative group transition-all active:scale-[0.98] cursor-pointer ${variant === 'solid' ? 'hover:shadow-md' : 'border-gray-100 hover:border-[var(--primary)] hover:shadow-lg'} ${className}`}
        style={variant === 'solid' ? {
            background: `linear-gradient(105deg, ${tagColor}10 0%, #FFFFFF 50%)`,
            borderLeft: `4px solid ${tagColor}`,
            borderTop: '1px solid #F1F5F9',
            borderRight: '1px solid #F1F5F9',
            borderBottom: '1px solid #F1F5F9'
        } : {}}
    >
        <div className="flex justify-between items-start">
            <div className="pr-2 flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-lg leading-snug ${completed ? 'line-through opacity-40' : ''}`} style={{ color: 'var(--text-primary)' }}>{title}</h3>
                    {/* Time badge inside card - Only if showTime is true */}
                    {showTime && (
                        <div className="shrink-0 ml-2 px-2 py-1 rounded-md bg-slate-100 text-xs font-bold text-slate-600 flex items-center gap-1">
                            <Clock size={12} /> {time.split(' ')[0]}
                        </div>
                    )}
                </div>

                {type === 'event' && (
                    <>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-2 text-gray-500 group-hover:text-gray-600 transition-colors mb-3">
                            {recurrence && (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-gray-50">
                                    <Repeat size={12} className="text-emerald-500" />
                                    <span className="text-xs font-medium">{recurrence}</span>
                                </div>
                            )}
                            {location && (
                                <div className="flex items-center gap-1.5 px-0 py-1 rounded-lg">
                                    <MapPin size={14} className="text-gray-400" />
                                    <span className="text-xs font-medium text-gray-500">{location}</span>
                                </div>
                            )}
                        </div>
                        {participants && participants.length > 0 && (
                            <div className="flex items-center">
                                <div className="flex -space-x-2 mr-2">
                                    {participants.map((initial: string, i: number) => (
                                        <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 uppercase shadow-sm">
                                            {initial}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {type === 'shopping' && items && (
                    <div className="mt-2 space-y-2">
                        {items.slice(0, 3).map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2.5 text-gray-500">
                                <div className="w-5 h-5 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-colors hover:border-[var(--primary)]"></div>
                                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                )}

                {type === 'expense' && (
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-3xl font-extrabold text-rose-500 tracking-tight">-{amount}</span>
                    </div>
                )}

                {type === 'habit' && (
                    <div className="mt-2 flex items-center gap-4 text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <Repeat size={14} className="text-emerald-500" />
                            <span className="text-xs font-medium">{recurrence}</span>
                        </div>
                        {showTime && (
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} style={{ color: 'var(--primary)' }} />
                                <span className="text-xs font-medium">{time}</span>
                            </div>
                        )}
                    </div>
                )}

                {type === 'todo' && (
                    <div className="mt-2 flex items-center gap-2 text-gray-500">
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${completed ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-gray-300'}`}>
                            {completed && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-xs font-medium">ทำเครื่องหมายว่าเสร็จ</span>
                    </div>
                )}

                {type === 'note' && (
                    <div className="mt-2 p-3 bg-yellow-50 rounded-xl border border-yellow-100/50">
                        <p className="text-xs text-yellow-800 italic flex gap-2">
                            <StickyNote size={14} className="shrink-0 mt-0.5" />
                            "{note || 'No content'}"
                        </p>
                    </div>
                )}

                {type === 'unknown' && (
                    <div className="mt-2 flex items-center gap-2 text-gray-400 bg-gray-50 p-2 rounded-lg">
                        <QuestionIcon size={14} />
                        <span className="text-xs">Uncategorized Event</span>
                    </div>
                )}

                {tips && (
                    <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex items-center gap-2 opacity-90">
                        <div className="p-1 rounded-full text-[var(--primary)]" style={{ backgroundColor: 'var(--primary-dim)' }}>
                            <Lightbulb size={12} />
                        </div>
                        <span className="text-[10px] font-semibold tracking-wide" style={{ color: 'var(--text-secondary)' }}>AI TIP AVAILABLE</span>
                    </div>
                )}
            </div>

            {type === 'expense' ? (
                <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-500"><Coins size={20} /></div>
            ) : type === 'habit' ? (
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-500"><Activity size={20} /></div>
            ) : type === 'todo' ? (
                <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-500"><CheckSquare size={20} /></div>
            ) : type === 'note' ? (
                <div className="p-2.5 rounded-2xl bg-yellow-50 text-yellow-500"><StickyNote size={20} /></div>
            ) : type === 'unknown' ? (
                <div className="p-2.5 rounded-2xl bg-gray-100 text-gray-400"><QuestionIcon size={20} /></div>
            ) : (
                <span className="shrink-0 text-[10px] px-3 py-1.5 rounded-full font-bold border tracking-wide uppercase shadow-sm" style={{ backgroundColor: `${tagColor}15`, color: tagColor, borderColor: `${tagColor}30`, boxShadow: `0 2px 5px ${tagColor}10` }}>{tag}</span>
            )}
        </div>
    </GlassCard>
);

const AICommandBar = ({ onClick }: any) => (
    <GlassCard onClick={onClick} className="flex items-center p-1.5 pl-5 pr-2 mb-8 shadow-sm cursor-pointer hover:bg-white transition-colors bg-white/80" style={{ borderColor: 'var(--primary-dim)' }}>
        <Sparkles className="w-5 h-5 mr-3 animate-pulse" style={{ color: 'var(--primary)' }} />
        <span className="flex-1 text-sm font-medium py-3" style={{ color: 'var(--text-secondary)' }}>บอก VURENIO ให้...</span>
        <button className="p-2.5 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)' }}>
            <Mic size={20} />
        </button>
    </GlassCard>
);

// --- FilterChips: Scrollable Categories ---
const FilterChips = ({ selected, onSelect }: any) => (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1 w-full min-w-0 shrink-0">
        {(Object.keys(mockNextEvents) as Array<keyof typeof mockNextEvents>).map((key) => {
            const data = mockNextEvents[key];
            const Icon = data.icon;
            const label = String(key).charAt(0).toUpperCase() + String(key).slice(1);
            const isActive = selected === key;

            return (
                <button
                    key={key}
                    onClick={() => onSelect(key)}
                    className={`flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold border transition-all duration-300 ${isActive
                        ? 'bg-slate-800 text-white shadow-lg shadow-slate-200 scale-105 border-transparent'
                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                >
                    {Icon && <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />}
                    {label}
                </button>
            );
        })}
    </div>
);

// ==========================================
// 3. OVERLAYS & MODALS
// ==========================================

const AIInputOverlay = ({ onClose }: any) => {
    const [text, setText] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [result, setResult] = useState<any>(null);

    const analyzeInput = (input: string) => {
        const lowerInput = input.toLowerCase();

        // 1. Travel/Event
        if (lowerInput.includes("จอง") || lowerInput.includes("เที่ยว") || lowerInput.includes("โรงแรม") || lowerInput.includes("ประชุม")) {
            return {
                type: 'event',
                title: "ทริปหัวหิน",
                location: "The Standard Hua Hin",
                time: "Check-in 14:00",
                date: "25-27 ธ.ค.",
                tag: "ท่องเที่ยว",
                tagColor: "#8B5CF6",
                participants: ['A', 'F'],
                travelTime: "ควรออกจากบ้านเวลา 10:00 น. เพื่อเลี่ยงรถติดพระราม 2 (ใช้เวลาเดินทาง 3 ชม.)",
                weather: "แดดจ้า 32°C เหมาะกับการเล่นน้ำทะเล พกครีมกันแดดไปด้วยนะ",
                prepList: ["ชุดว่ายน้ำ", "ครีมกันแดด", "แว่นกันแดด", "Power Bank"],
                tips: "โรงแรมนี้มี Beach Club สวยมาก อย่าลืมเตรียมชุดสวยๆ ไปถ่ายรูปช่วง Sunset นะครับ"
            };
        }

        // 2. Shopping
        if (lowerInput.includes("ซื้อ") || lowerInput.includes("list") || lowerInput.includes("รายการ")) {
            return {
                type: 'shopping',
                title: "ซื้อของเข้าบ้าน",
                items: ['นมสด', 'ไข่ไก่', 'ขนมปังโฮลวีต', 'ผักสลัด', 'น้ำสลัดงาญี่ปุ่น'],
                location: "Big C Extra",
                time: "หลังเลิกงาน",
                tag: "ช้อปปิ้ง",
                tagColor: "#F97316",
                totalItems: 5,
                tips: "วันนี้ Big C มีโปรโมชั่นไข่ไก่ลดราคา อย่าลืมเช็คที่จุดบริการลูกค้า"
            };
        }

        // 3. Expense
        if (lowerInput.includes("จ่าย") || lowerInput.includes("ค่า") || lowerInput.includes("โอน")) {
            return {
                type: 'expense',
                title: "ชำระค่าบัตรเครดิต",
                amount: "12,500",
                time: "ภายในวันนี้",
                tag: "บิล",
                tagColor: "#EF4444",
                account: "K-Bank x1234",
                tips: "ยอดนี้รวมค่าผ่อน iPhone เดือนที่ 3 แล้วครับ"
            };
        }

        // 4. Habit / Routine
        if (lowerInput.includes("อ่าน") || lowerInput.includes("ออกกำลัง") || lowerInput.includes("ฝึก") || lowerInput.includes("habit")) {
            return {
                type: 'habit',
                title: "อ่านหนังสือพัฒนาตนเอง",
                subtitle: "Atomic Habits",
                time: "30 นาที",
                tag: "กิจวัตร",
                tagColor: "#10B981", // Emerald
                recurrence: "ทุกวัน",
                tips: "การสร้างนิสัยใหม่ควรเริ่มจากเล็กๆ ลองเริ่มแค่ 5 นาทีก่อนไหมครับ?"
            };
        }

        // 5. Note / Idea
        if (lowerInput.includes("บันทึก") || lowerInput.includes("จด") || lowerInput.includes("ไอเดีย") || lowerInput.includes("note")) {
            return {
                type: 'note',
                title: "ไอเดียโปรเจกต์ใหม่",
                note: input.length > 10 ? input : "ตัวอย่างไอเดีย: ทำแอปฯ จัดการเวลาที่ใช้ AI ช่วยวิเคราะห์...",
                time: "บันทึกเมื่อสักครู่",
                tag: "โน้ต",
                tagColor: "#F59E0B", // Amber
                tips: "ลองเพิ่มรูปภาพหรือลิงก์อ้างอิงจะช่วยให้เห็นภาพชัดเจนขึ้นนะ"
            };
        }

        // 6. Todo / Reminder
        if (lowerInput.includes("เตือน") || lowerInput.includes("ส่ง") || lowerInput.includes("ทำ")) {
            return {
                type: 'todo',
                title: "ส่ง Final Draft ให้ลูกค้า",
                time: "ก่อน 18:00",
                tag: "งาน",
                tagColor: "#F472B6",
                priority: "High",
                tips: "อย่าลืมแนบไฟล์ Reference ที่คุยกันไว้เมื่อวานไปด้วยนะ"
            };
        }

        // 7. Unknown / Fallback
        if (lowerInput.includes("???") || lowerInput.includes("ไม่แน่ใจ")) {
            return {
                type: 'unknown',
                title: "รายการที่ระบุไม่ได้",
                subtitle: "ต้องการข้อมูลเพิ่มเติม",
                time: "???",
                tag: "รอระบุ",
                tagColor: "#64748B", // Slate
                tips: "Vureno ต้องการข้อมูลเพิ่มเติม เช่น 'เวลา' หรือ 'สถานที่' เพื่อจัดหมวดหมู่ให้แม่นยำขึ้นครับ"
            };
        }

        // Default Event (If nothing matches but has text)
        return {
            type: 'event',
            title: "กิจกรรมทั่วไป",
            time: "10:00",
            location: "ระบุสถานที่",
            tag: "ทั่วไป",
            tagColor: "#79D4FF",
            tips: "คุณสามารถระบุรายละเอียดเพิ่มเติมได้ เช่น 'พรุ่งนี้ 10 โมง'"
        };
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (text.length > 3) {
                setIsThinking(true);
                setResult(null);
                setTimeout(() => {
                    const analysis = analyzeInput(text);
                    setIsThinking(false);
                    setResult(analysis);
                }, 800);
            } else {
                setResult(null);
                setIsThinking(false);
            }
        }, 800);
        return () => clearTimeout(delayDebounceFn);
    }, [text]);

    const setDemoText = (demo: string) => setText(demo);

    // --- Render Helper for Result Card Content ---
    const renderResultContent = () => {
        if (!result) return null;

        return (
            <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: result.tagColor, boxShadow: `0 0 10px ${result.tagColor}` }}></div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: result.tagColor }}>{result.tag}</p>
                    {result.type === 'shopping' && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-bold">{result.totalItems} รายการ</span>}
                </div>

                <p className="text-2xl font-bold text-slate-800 leading-tight">{result.title}</p>
                <div className="h-[1px] w-full bg-slate-100 my-4"></div>

                {/* Specific Layouts based on Type */}
                {result.type === 'shopping' ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-600 mb-2">
                            <MapPin size={18} />
                            <span className="text-sm truncate">{result.location}</span>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                            {result.items.map((item: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 py-1">
                                    <div className="w-4 h-4 rounded border-2 border-orange-300"></div>
                                    <span className="text-sm text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : result.type === 'expense' ? (
                    <div className="flex flex-col items-center py-2">
                        <span className="text-sm text-slate-500 font-medium mb-1">ยอดชำระ</span>
                        <span className="text-4xl font-black text-rose-500 tracking-tight flex items-baseline gap-1">
                            <span className="text-2xl">-</span>{result.amount}<span className="text-lg text-rose-400">฿</span>
                        </span>
                        <div className="flex items-center gap-2 mt-3 text-xs bg-slate-100 px-3 py-1.5 rounded-lg text-slate-500">
                            <CreditCard size={12} /> {result.account}
                        </div>
                    </div>
                ) : result.type === 'todo' ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-600 mb-2">
                            <Clock size={18} className="text-pink-500" />
                            <span className="text-sm font-bold text-pink-500">{result.time}</span>
                        </div>
                        {result.priority && (
                            <div className="flex items-center gap-2 bg-red-50 text-red-600 p-2 rounded-lg text-xs font-bold w-fit">
                                <AlertTriangle size={14} /> {result.priority} Priority
                            </div>
                        )}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
                            <span className="text-sm text-gray-600">Remind me</span>
                        </div>
                    </div>
                ) : result.type === 'habit' ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-600 mb-2">
                            <Activity size={18} className="text-emerald-500" />
                            <span className="text-sm font-bold text-emerald-600">เป้าหมาย: {result.time}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 p-2 rounded-lg text-xs font-bold w-fit">
                            <Repeat size={14} /> {result.recurrence}
                        </div>
                    </div>
                ) : result.type === 'note' ? (
                    <div className="space-y-3">
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-yellow-800 italic relative">
                            <StickyNote size={20} className="absolute top-4 right-4 text-yellow-200" />
                            "{result.note}"
                        </div>
                        <div className="flex items-center gap-3 text-slate-400 text-xs">
                            <Clock size={12} /> {result.time}
                        </div>
                    </div>
                ) : result.type === 'unknown' ? (
                    <div className="space-y-3 text-center py-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-2">
                            <QuestionIcon size={32} />
                        </div>
                        <p className="text-sm text-slate-500">{result.subtitle}</p>
                    </div>
                ) : (
                    // Default / Event (Enhanced)
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-slate-600"><Clock size={18} /><span className="text-sm">{result.time}</span></div>
                            {result.location && (<div className="flex items-center gap-3 text-slate-600"><MapPin size={18} /><span className="text-sm truncate">{result.location}</span></div>)}
                        </div>
                        {/* Show Prep List if available (e.g. Travel) */}
                        {result.prepList && (
                            <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
                                <p className="text-[10px] font-bold text-purple-500 uppercase mb-2">Don't Forget</p>
                                <div className="flex flex-wrap gap-2">
                                    {result.prepList.slice(0, 3).map((item: string, i: number) => (
                                        <span key={i} className="text-xs bg-white px-2 py-1 rounded text-purple-700 shadow-sm">{item}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        );
    };

    return (
        <div className="absolute inset-0 z-[100] backdrop-blur-3xl flex flex-col p-6 animate-in fade-in duration-300 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <div className="max-w-2xl mx-auto w-full">
                <div className="flex justify-between items-center mb-8">
                    <button onClick={onClose} className="p-3 rounded-full hover:bg-black/5 transition-colors" style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)' }}><X size={24} /></button>
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm" style={{ backgroundColor: 'var(--primary-dim)', borderColor: 'var(--glass-border)' }}><Sparkles size={16} style={{ color: 'var(--primary)' }} /><span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--primary)' }}>VURENIO AI</span></div>
                    <div className="w-12"></div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-8 text-center animate-in fade-in slide-in-from-bottom-4" style={{ color: '#1E293B' }}>ให้ช่วยอะไรดีครับ?</h2>
                    <div className="relative mb-10 group">
                        <div className="absolute inset-0 rounded-3xl blur-xl opacity-10 group-focus-within:opacity-20 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))' }}></div>
                        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='เช่น "จองโรงแรมที่หัวหิน...", "อ่านหนังสือ...", "จดไอเดีย..."' className="relative z-10 w-full h-40 bg-transparent text-2xl font-medium placeholder-gray-400 focus:outline-none resize-none text-center p-4" style={{ color: 'var(--text-primary)' }} autoFocus />
                    </div>
                    {!text && (
                        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-in fade-in delay-200">
                            {["จองโรงแรมที่หัวหิน 25-27 นี้", "อ่านหนังสือ 30 นาที", "จดไอเดีย: ทำแอป AI", "ซื้อ ไข่ นม ขนมปัง"].map((demo: string, i: number) => (
                                <button key={i} onClick={() => setDemoText(demo)} className="px-5 py-2.5 rounded-full border text-sm hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-sm" style={{ backgroundColor: 'white', borderColor: '#E2E8F0', color: '#64748B' }}>
                                    {i === 0 ? "🏖️ เที่ยว" : i === 1 ? "📖 นิสัย" : i === 2 ? "💡 โน้ต" : "🛒 ซื้อของ"}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                        {isThinking && (
                            <div className="flex flex-col items-center justify-center gap-4 animate-pulse" style={{ color: 'var(--primary)' }}><div className="p-4 rounded-full" style={{ backgroundColor: 'var(--primary-dim)' }}><Sparkles size={40} /></div><span className="text-sm font-bold uppercase tracking-widest">Processing...</span></div>
                        )}
                        {result && !isThinking && (
                            <div className="animate-in slide-in-from-bottom-8 duration-500 fade-in zoom-in-95">
                                <div className="bg-white border rounded-3xl p-6 relative overflow-hidden shadow-2xl" style={{ borderColor: 'var(--primary-dim)' }}>
                                    {renderResultContent()}
                                </div>
                                <div className="flex gap-4 mt-8">
                                    <button onClick={onClose} className="flex-1 py-4 rounded-2xl text-white text-lg font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))' }}><CheckCircle size={24} />บันทึก</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Mic Button at bottom for Voice Mode */}
                {!text && !result && !isThinking && (
                    <div className="flex justify-center pb-10 mt-auto animate-in fade-in duration-500 absolute bottom-0 left-0 right-0">
                        <button onClick={() => setDemoText("พรุ่งนี้มีประชุม 10 โมงที่ตึก G-tower")} className="relative group p-6 rounded-full border transition-all active:scale-95" style={{ backgroundColor: 'var(--primary-dim)', borderColor: 'var(--primary)' }}><div className="absolute inset-0 rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: 'var(--primary)' }}></div><Mic size={32} style={{ color: 'var(--primary)' }} className="transition-colors relative z-10" /></button>
                    </div>
                )}
            </div>
        </div>
    );
};

const EventDetailOverlay = ({ event, onClose }: any) => {
    return (
        <div className="absolute inset-0 z-[70] backdrop-blur-3xl flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-300" style={{ backgroundColor: 'var(--bg-overlay)' }}>
            <div className="flex justify-between items-center p-8 pb-4">
                <button onClick={onClose} className="p-3 rounded-full hover:bg-black/5 border transition-all shadow-sm" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><ChevronLeft size={24} /></button>
                <div className="flex gap-3">
                    <button className="p-3 rounded-full hover:bg-black/5 border transition-all shadow-sm" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><Share2 size={20} /></button>
                    <button className="p-3 rounded-full hover:bg-black/5 border transition-all shadow-sm" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><Edit2 size={20} /></button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 pt-2 no-scrollbar">
                <div className="flex justify-start mb-6"><span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{ backgroundColor: `${event.tagColor}20`, color: event.tagColor, borderColor: `${event.tagColor}40` }}>{event.tag}</span></div>
                <h1 className="text-4xl font-extrabold mb-8 leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>{event.title}</h1>
                <div className="grid gap-4 mb-10">
                    <GlassCard className="p-5 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-dim)', color: 'var(--primary)' }}><Clock size={24} /></div>
                        <div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Time</p><p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{event.time} {event.recurrence && `(${event.recurrence})`}</p></div>
                    </GlassCard>
                    {event.location && (<GlassCard className="p-5 flex items-center gap-5"><div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600"><MapPin size={24} /></div><div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Location</p><p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{event.location}</p></div></GlassCard>)}
                    {event.type === 'expense' && event.amount && (<GlassCard className="p-5 flex items-center gap-5"><div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600"><Coins size={24} /></div><div><p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Amount</p><p className="text-3xl font-bold text-red-500">-{event.amount}</p></div></GlassCard>)}
                </div>
                {/* AI Modules */}
                <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2"><Sparkles size={14} style={{ color: 'var(--primary)' }} /> AI Insights</h3>
                <div className="grid gap-4 mb-10">
                    {event.travelTime && (<div className="p-5 rounded-3xl border flex gap-4 animate-in slide-in-from-bottom-2 shadow-sm bg-white" style={{ borderColor: 'var(--glass-border)' }}><div className="p-3 rounded-full h-fit bg-blue-100 text-blue-600"><Car size={20} /></div><div><h4 className="text-sm font-bold mb-1 text-blue-600">แนะนำเวลาเดินทาง</h4><p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--text-secondary)' }}>{event.travelTime}</p></div></div>)}
                    {event.weather && (<div className="p-5 rounded-3xl border flex gap-4 animate-in slide-in-from-bottom-3 shadow-sm bg-white" style={{ borderColor: 'var(--glass-border)' }}><div className="p-3 rounded-full h-fit bg-yellow-100 text-yellow-600"><CloudSun size={20} /></div><div><h4 className="text-sm font-bold mb-1 text-yellow-600">สภาพอากาศ</h4><p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--text-secondary)' }}>{event.weather}</p></div></div>)}
                    {event.prepList && event.prepList.length > 0 && (<div className="p-5 rounded-3xl border flex flex-col gap-3 animate-in slide-in-from-bottom-4 shadow-sm bg-white" style={{ borderColor: 'var(--glass-border)' }}><div className="flex gap-3 items-center"><div className="p-3 rounded-full h-fit bg-purple-100 text-purple-600"><ClipboardList size={20} /></div><h4 className="text-sm font-bold text-purple-600">สิ่งที่ต้องเตรียม</h4></div><div className="pl-14 space-y-2">{event.prepList.map((item: string, i: number) => (<div key={i} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400"></div><span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item}</span></div>))}</div></div>)}
                </div>
                {/* Shopping & Tips */}
                {event.type === 'shopping' && event.items && (<div className="mb-10"><h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2"><ListTodo size={16} /> Shopping List ({event.items.length})</h3><div className="space-y-3">{event.items.map((item: string, i: number) => (<GlassCard key={i} className="p-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer"><div className="w-6 h-6 rounded-lg border-2 border-gray-300 flex items-center justify-center"></div><span className="text-lg" style={{ color: 'var(--text-primary)' }}>{item}</span></GlassCard>))}</div></div>)}
                {event.tips && (<div className="mb-10 p-6 rounded-3xl border flex gap-4 relative overflow-hidden shadow-sm bg-white" style={{ borderColor: 'var(--glass-border)' }}><div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10 pointer-events-none" style={{ backgroundColor: 'var(--primary)' }}></div><div className="p-3 rounded-full h-fit" style={{ backgroundColor: 'var(--primary-dim)', color: 'var(--primary)' }}><Lightbulb size={24} /></div><div><h4 className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--primary)' }}>AI Suggestion</h4><p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>{event.tips}</p></div></div>)}
                {event.note && (<div className="mb-10"><h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">Note</h3><p className="text-base leading-relaxed opacity-80" style={{ color: 'var(--text-secondary)' }}>{event.note}</p></div>)}
            </div>
            <div className="p-8 border-t backdrop-blur-xl" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--nav-bg)' }}><button className="w-full py-4 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))', boxShadow: '0 10px 25px -5px var(--primary-dim)' }}><CheckCircle size={22} />ทำเครื่องหมายว่าเสร็จ</button><button className="w-full mt-4 py-3 text-red-400 font-medium text-sm hover:bg-red-50/50 rounded-xl transition-colors flex items-center justify-center gap-2"><Trash2 size={18} />ลบกิจกรรม</button></div>
        </div>
    );
};

// ==========================================
// 4. SCREENS (Declared before Main App)
// ==========================================

// --- NEW ONBOARDING SCREEN ---
const OnboardingScreen = ({ onLogin, onSignup }: any) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "จัดระเบียบชีวิตด้วย AI",
            desc: "ให้ VURENIO เป็นเลขาอัจฉริยะช่วยวางแผนตารางงาน การเดินทาง และการเงินของคุณให้เป็นเรื่องง่าย",
            image: null, // ใส่ URL รูปที่ 1 ตรงนี้ (ธีมสีฟ้า/Brain)
            illustration: (
                <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
                    {/* Glow Effect Behind */}
                    <div className="absolute inset-0 bg-blue-400/20 blur-[80px] rounded-full"></div>

                    {/* Main White Card Container */}
                    <div className="relative z-10 w-64 h-56 bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)] flex flex-col items-center justify-center animate-in zoom-in duration-700">
                        {/* Central Blue Icon */}
                        <div className="w-24 h-24 bg-gradient-to-b from-[#3B82F6] to-[#2563EB] rounded-[28px] flex items-center justify-center shadow-xl shadow-blue-500/30 mb-5 transform hover:scale-105 transition-transform duration-300">
                            <Brain size={48} className="text-white" strokeWidth={1.5} />
                        </div>

                        {/* Small Icons Row */}
                        <div className="flex items-center gap-5">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                <Calendar size={18} />
                            </div>
                            <div className="w-14 h-14 -mt-2 rounded-full bg-white shadow-[0_8px_20px_-5px_rgba(0,0,0,0.1)] border border-slate-50 flex items-center justify-center text-amber-400">
                                <Sparkles size={24} fill="currentColor" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                <Coins size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "สั่งงานด้วยเสียง & ข้อความ",
            desc: "แค่พิมพ์หรือพูดว่า 'จองโรงแรมหัวหิน' AI จะจัดการรายละเอียด เวลา และสิ่งที่ต้องเตรียมให้ทันที",
            image: null, // ใส่ URL รูปที่ 2 ตรงนี้ (ธีมสีม่วง/Chat)
            illustration: (
                <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-indigo-400/20 blur-[80px] rounded-full"></div>

                    <div className="relative z-10 w-full px-4">
                        {/* Chat Bubbles Container */}
                        <div className="bg-white/60 backdrop-blur-xl rounded-[32px] p-6 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15)] border border-white/50 space-y-4">
                            {/* User Message */}
                            <div className="flex justify-end">
                                <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm shadow-lg flex items-center gap-2 animate-in slide-in-from-right duration-500">
                                    <span>พรุ่งนี้เตือนประชุม 10 โมงนะ</span>
                                    <Mic size={14} className="opacity-80 animate-pulse" />
                                </div>
                            </div>

                            {/* Bot Response */}
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-100 text-slate-600 px-5 py-3 rounded-2xl rounded-tl-sm text-sm shadow-md flex items-center gap-3 animate-in slide-in-from-left duration-700 delay-200">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                                        <Bot size={14} className="text-indigo-600" />
                                    </div>
                                    <span>รับทราบครับ! ลงตารางให้แล้ว 🗓️</span>
                                </div>
                            </div>

                            {/* Calendar Card Insert */}
                            <div className="mt-2 p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 animate-in fade-in duration-700 delay-500">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                    <Calendar size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="h-2 w-20 bg-slate-200 rounded-full mb-1.5"></div>
                                    <div className="h-1.5 w-12 bg-slate-100 rounded-full"></div>
                                </div>
                                <CheckCircle size={18} className="text-emerald-500" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "เริ่มจัดการชีวิตของคุณ",
            desc: "พร้อมที่จะเปลี่ยนความวุ่นวายให้เป็นระเบียบหรือยัง? สร้างบัญชีฟรีและเริ่มต้นใช้งานได้เลย",
            image: null, // ใส่ URL รูปที่ 3 ตรงนี้ (ธีมสีส้ม/Rocket)
            illustration: (
                <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-orange-400/20 blur-[80px] rounded-full"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-20 animate-ping"></div>
                            <div className="w-32 h-32 bg-white rounded-[32px] shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-500">
                                <Rocket size={64} className="text-orange-500 drop-shadow-lg" />
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-slate-50 flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
                                <Zap size={16} className="text-amber-500 fill-amber-500" />
                                <span className="text-xs font-bold text-slate-600">Productivity</span>
                            </div>
                            <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-slate-50 flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                                <Activity size={16} className="text-emerald-500" />
                                <span className="text-xs font-bold text-slate-600">Growth</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            // If it's the last step, we can default to login or handle finish
            onLogin();
        }
    };

    return (
        <div className="h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
            {/* Background Light Glows */}
            <div className={`absolute top-[-20%] left-[-20%] w-[80%] h-[60%] rounded-full blur-[120px] opacity-40 transition-colors duration-1000 ${step === 0 ? 'bg-blue-300' : step === 1 ? 'bg-indigo-300' : 'bg-orange-300'
                }`}></div>
            <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[100px] opacity-40 transition-colors duration-1000 ${step === 0 ? 'bg-cyan-200' : step === 1 ? 'bg-purple-200' : 'bg-yellow-200'
                }`}></div>

            {/* Skip Button */}
            <div className="absolute top-8 right-8 z-20">
                <button
                    onClick={onLogin}
                    className="px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/50 text-xs font-bold text-slate-500 hover:bg-white hover:text-slate-800 transition-all shadow-sm"
                >
                    ข้าม
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 z-10 pt-20">
                <div className="mb-10 w-full flex items-center justify-center">
                    {steps[step].illustration}
                </div>

                <div className="text-center space-y-4 max-w-xs animate-in slide-in-from-bottom-8 duration-700 fade-in key={step}">
                    <h2 className="text-[28px] font-black text-slate-800 leading-tight tracking-tight">
                        {steps[step].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed px-2">
                        {steps[step].desc}
                    </p>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-8 pb-12 z-10">
                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mb-8">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i === step
                                ? 'w-8 bg-slate-800'
                                : 'w-2 bg-slate-300'
                                }`}
                        ></div>
                    ))}
                </div>

                {/* Main Action Button */}
                {step === steps.length - 1 ? (
                    <div className="space-y-3 animate-in slide-in-from-bottom-4 fade-in duration-500">
                        <button
                            onClick={onSignup}
                            className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all bg-gradient-to-r from-[#38BDF8] to-[#2563EB]"
                        >
                            สร้างบัญชีใหม่
                        </button>
                        <button
                            onClick={onLogin}
                            className="w-full py-4 rounded-2xl font-bold text-lg text-slate-600 bg-white border border-slate-100 hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={nextStep}
                        className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all bg-gradient-to-r from-[#38BDF8] to-[#2563EB] flex items-center justify-center gap-2"
                    >
                        ถัดไป <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                )}
            </div>
        </div>
    );
};

const LoginScreen = ({ onLogin, onSwitch }: any) => (
    <div className="h-full flex flex-col justify-center relative overflow-hidden p-6">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ backgroundColor: 'var(--gradient-from)' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full blur-[100px] opacity-20 animate-pulse" style={{ backgroundColor: 'var(--gradient-to)', animationDelay: '2s' }}></div>
        <div className="z-10 w-full max-w-sm mx-auto">
            <div className="text-center mb-10"><div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] mb-6 shadow-[0_20px_40px_rgba(56,189,248,0.25)] animate-in zoom-in duration-500" style={{ background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))' }}><Sparkles size={40} className="text-white" /></div><h1 className="text-5xl font-bold mb-3 tracking-tighter" style={{ color: 'var(--text-primary)' }}>VURENIO</h1><p className="text-sm font-medium tracking-wide uppercase opacity-60" style={{ color: 'var(--text-secondary)' }}>AI Life Organizer</p></div>
            <GlassCard className="p-8 border-white/80 shadow-xl bg-white/70">
                <div className="mb-6"><h2 className="text-xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>Welcome Back</h2><GlowInput icon={Mail} placeholder="อีเมล" type="email" /><div className="h-2"></div><GlowInput icon={Lock} placeholder="รหัสผ่าน" type="password" /><div className="flex justify-end mt-3"><button className="text-xs font-bold hover:underline" style={{ color: 'var(--primary)' }}>ลืมรหัสผ่าน?</button></div></div>
                <PrimaryButton onClick={onLogin} className="mb-8">เข้าสู่ระบบ</PrimaryButton>
                <div className="relative flex py-2 items-center mb-6"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink-0 mx-4 text-[10px] uppercase font-bold text-gray-400 tracking-wider">หรือ</span><div className="flex-grow border-t border-gray-300"></div></div>
                <div className="grid grid-cols-2 gap-4"><button className="flex items-center justify-center py-3.5 rounded-2xl border hover:bg-gray-50 transition-all duration-200 group active:scale-95" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)', backgroundColor: 'white' }}><span className="font-bold text-sm text-gray-600">Google</span></button><button className="flex items-center justify-center py-3.5 rounded-2xl border hover:bg-gray-50 transition-all duration-200 group active:scale-95" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)', backgroundColor: 'white' }}><span className="font-bold text-sm text-gray-600">Apple</span></button></div>
            </GlassCard>
            <div className="text-center mt-10"><p className="text-sm text-gray-500">ยังไม่มีบัญชี?{' '}<button onClick={onSwitch} className="font-bold hover:underline ml-1" style={{ color: 'var(--primary)' }}>ลงทะเบียนฟรี</button></p></div>
        </div>
    </div>
);

const SignupScreen = ({ onSignup, onSwitch }: any) => {
    const [step, setStep] = useState(1);
    const [gender, setGender] = useState('');
    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    return (
        <div className="h-full flex flex-col p-8 justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"><div className="absolute top-[10%] right-[10%] w-[50%] h-[40%] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ backgroundColor: 'var(--gradient-from)' }}></div></div>
            <div className="z-10 w-full max-w-sm mx-auto flex-1 flex flex-col justify-center">
                <div className="mb-10 text-center"><h1 className="text-3xl font-bold mb-3 transition-all" style={{ color: 'var(--text-primary)' }}>{step === 1 ? 'สร้างบัญชีใหม่' : step === 2 ? 'ข้อมูลส่วนตัว' : 'ตั้งรหัสผ่าน'}</h1><p className="text-sm opacity-60" style={{ color: 'var(--text-secondary)' }}>{step === 1 ? 'เริ่มจัดระเบียบชีวิตของคุณตั้งแต่วันนี้' : step === 2 ? 'เพื่อให้เรารู้จักคุณมากขึ้น' : 'ขั้นตอนสุดท้ายแล้ว!'}</p></div>
                <div className="flex justify-center gap-3 mb-10">{[1, 2, 3].map(i => (<div key={i} className={`h-2 rounded-full transition-all duration-500 ${step >= i ? 'w-10' : 'w-2 bg-gray-200'}`} style={{ backgroundColor: step >= i ? 'var(--primary)' : undefined, boxShadow: step >= i ? '0 0 10px var(--primary-dim)' : 'none' }}></div>))}</div>
                <div className="min-h-[350px]">
                    {step === 1 && (<div className="animate-in fade-in slide-in-from-right-8 duration-300"><GlowInput icon={User} placeholder="ชื่อ-นามสกุล" /><GlowInput icon={Mail} placeholder="อีเมล" type="email" /><PrimaryButton onClick={nextStep} className="mt-6">ถัดไป</PrimaryButton></div>)}
                    {step === 2 && (<div className="animate-in fade-in slide-in-from-right-8 duration-300"><GlowInput icon={Smartphone} placeholder="เบอร์โทรศัพท์" type="tel" /><div className="relative group mb-5"><div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"><Calendar size={22} /></div><input type="date" className="w-full border-2 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-4 transition-all placeholder-gray-400 text-slate-600" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }} /></div><div className="mb-8"><label className="text-xs font-bold uppercase tracking-wider ml-1 mb-3 block opacity-60" style={{ color: 'var(--text-secondary)' }}>เพศ</label><div className="grid grid-cols-3 gap-3">{['ชาย', 'หญิง', 'อื่นๆ'].map((g) => (<button key={g} onClick={() => setGender(g)} className={`py-3.5 rounded-2xl border text-sm font-bold transition-all duration-200 active:scale-95 ${gender === g ? 'text-white shadow-lg' : 'hover:bg-gray-50 bg-white border-gray-200 text-gray-500'}`} style={{ borderColor: gender === g ? 'var(--primary)' : 'var(--glass-border)', backgroundColor: gender === g ? 'var(--primary)' : 'var(--glass-bg)', boxShadow: gender === g ? '0 5px 15px -3px var(--primary-dim)' : 'none' }}>{g}</button>))}</div></div><div className="flex gap-4"><button onClick={prevStep} className="px-6 py-4 rounded-2xl border font-bold hover:bg-gray-50 transition-colors bg-white text-gray-600" style={{ borderColor: 'var(--glass-border)' }}><ChevronLeft size={24} /></button><PrimaryButton onClick={nextStep} className="flex-1">ถัดไป</PrimaryButton></div></div>)}
                    {step === 3 && (<div className="animate-in fade-in slide-in-from-right-8 duration-300"><GlowInput icon={Lock} placeholder="รหัสผ่าน" type="password" /><GlowInput icon={Lock} placeholder="ยืนยันรหัสผ่าน" type="password" /><div className="flex gap-4 mt-8"><button onClick={prevStep} className="px-6 py-4 rounded-2xl border font-bold hover:bg-gray-50 transition-colors bg-white text-gray-600" style={{ borderColor: 'var(--glass-border)' }}><ChevronLeft size={24} /></button><PrimaryButton onClick={onSignup} className="flex-1">ลงทะเบียน</PrimaryButton></div></div>)}
                </div>
                <div className="text-center mt-6"><span className="text-sm opacity-60" style={{ color: 'var(--text-secondary)' }}>มีบัญชีอยู่แล้ว? </span><button onClick={onSwitch} className="font-bold text-sm hover:underline ml-1" style={{ color: 'var(--primary)' }}>เข้าสู่ระบบ</button></div>
            </div>
        </div>
    );
}

// ... (Other Screens: CalendarWeekScreen, CalendarMonthScreen, NotificationsScreen, ProfileScreen, etc. remain the same)

const CalendarWeekScreen = ({ onSwitchMode, onSelectEvent }: any) => {
    const [selectedDate, setSelectedDate] = useState(13);
    const [activeFilter, setActiveFilter] = useState('ทั้งหมด');
    const days = [
        { d: 'อา', n: 7 }, { d: 'จ', n: 8 }, { d: 'อ', n: 9 }, { d: 'พ', n: 10 },
        { d: 'พฤ', n: 11 }, { d: 'ศ', n: 12 }, { d: 'ส', n: 13 }
    ];
    const getEventsForDate = (date: number) => {
        if (date === 13) return [
            { id: 'w1', type: 'event', title: "ประชุมทีม Design", time: "09:00", location: "Zoom", participants: ['M', 'J'], tag: "งาน", tagColor: "#79D4FF", tips: "เตรียมไฟล์สรุป Sprint ที่แล้วไว้ด้วยนะ" },
            { id: 'w2', type: 'event', title: "ทานข้าวกับลูกค้า", time: "12:00", location: "Siam Paragon", tag: "ส่วนตัว", tagColor: "#F97316" },
            { id: 'w3', type: 'event', title: "ส่งรายงานสรุป", time: "15:30", tag: "งาน", tagColor: "#A48FFC" },
            { id: 't1', type: 'todo', title: "ตอบอีเมลลูกค้า K.Som", time: "ภายในวัน", tag: "งาน", tagColor: "#79D4FF" }
        ];
        return [];
    };
    const currentEvents = getEventsForDate(selectedDate);
    const filteredEvents = currentEvents.filter(e => activeFilter === 'ทั้งหมด' || e.tag === activeFilter);
    const busyLevel = filteredEvents.length > 3 ? 'high' : filteredEvents.length > 1 ? 'medium' : 'low';

    return (
        <div className="pb-32 px-4 sm:px-6 pt-16 h-full flex flex-col overflow-x-hidden">
            <div className="flex justify-between items-center mb-8 shrink-0">
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>ธันวาคม 2025</h1>
                <div className="flex gap-3">
                    <button onClick={onSwitchMode} className="p-3 rounded-2xl border hover:bg-white/50 transition-colors" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><Calendar size={22} /></button>
                    {/* <button className="p-3 rounded-2xl text-white shadow-lg hover:scale-105 transition-transform active:scale-95" style={{ background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))', boxShadow: '0 5px 15px -3px var(--primary-dim)' }}><Plus size={22} /></button>*/}
                </div>
            </div>
            <div className="flex justify-between mb-2 shrink-0 pb-2 border-b border-gray-200">
                {days.map((day, i) => {
                    const isActive = day.n === selectedDate;
                    return (
                        <div key={i} onClick={() => setSelectedDate(day.n)} className={`flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 group ${isActive ? '' : 'opacity-50 hover:opacity-100'}`}>
                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: isActive ? 'var(--primary)' : 'var(--text-secondary)' }}>{day.d}</span>
                            <div className={`w-9 h-9 sm:w-12 sm:h-12 flex flex-col items-center justify-center rounded-2xl transition-all shadow-sm ${isActive ? 'text-white shadow-lg' : 'border border-gray-200 bg-white'}`} style={{ backgroundColor: isActive ? 'var(--primary)' : 'white', color: isActive ? 'white' : 'var(--text-primary)', boxShadow: isActive ? '0 5px 15px -3px var(--primary-dim)' : 'none' }}>
                                <span className="text-sm sm:text-base font-bold">{day.n}</span>
                            </div>
                            {(day.n === 13 || day.n === 7 || day.n === 14) && (<div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : ''}`} style={{ backgroundColor: isActive ? 'var(--primary)' : 'red' }}></div>)}
                        </div>
                    );
                })}
            </div>
            {/* <DayPlanningWidget count={filteredEvents.length} busyLevel={busyLevel} /> */}

            <div className="min-w-0">
                <FilterChips selected={activeFilter} onSelect={setActiveFilter} />
            </div>
            <div className="shrink-0 flex justify-between items-end">
                <p className="text-sm font-medium opacity-60" style={{ color: 'var(--text-secondary)' }}>{selectedDate} ธันวาคม • {selectedDate === 13 ? 'วันเสาร์' : 'วันทั่วไป'}</p>
            </div>
            <div className="space-y-4 overflow-y-auto pb-32 no-scrollbar grow pt-2">
                {filteredEvents.map((event) => (<EventCard key={event.id} {...event} onClick={() => onSelectEvent(event)} className="mb-4" />))}
            </div>
        </div>
    );
};

const CalendarMonthScreen = ({ onSwitchMode, onSelectEvent }: any) => {
    const [selectedDate, setSelectedDate] = useState(13);
    const [activeFilter, setActiveFilter] = useState('ทั้งหมด');
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentEvents = [{ id: 'm1', type: 'event', title: "ประชุมทีม Design", time: "09:00", location: "Zoom", tag: "งาน", tagColor: "#79D4FF" }];
    const filteredEvents = currentEvents.filter(e => activeFilter === 'ทั้งหมด' || e.tag === activeFilter);
    return (
        <div className="pb-32 px-4 sm:px-6 pt-16 h-full flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar">
            <div className="flex justify-between items-center mb-8 shrink-0">
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>ธันวาคม 2025</h1>
                <div className="flex gap-3">
                    <button onClick={onSwitchMode} className="p-3 rounded-2xl border hover:bg-white/50 transition-colors" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><ChevronUp size={22} /></button>
                    {/* <button className="p-3 rounded-2xl text-white shadow-lg hover:scale-105 transition-transform active:scale-95" style={{ background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))', boxShadow: '0 5px 15px -3px var(--primary-dim)' }}><Plus size={22} /></button>*/}
                </div>
            </div>
            {/* <FilterChips selected={activeFilter} onSelect={setActiveFilter} /> */}
            <div className="grid grid-cols-7 gap-2 text-center mb-4 shrink-0">{['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(d => (<span key={d} className="text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>{d}</span>))}</div>
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 sm:gap-y-4 sm:gap-x-2 text-center mb-8 shrink-0">
                <div></div>
                {days.map(d => {
                    const isSelected = d === selectedDate;
                    const hasDot = [7, 13, 25].includes(d);
                    return (<div key={d} onClick={() => setSelectedDate(d)} className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 group ${isSelected ? 'scale-110' : 'hover:scale-105'}`}><div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm font-medium transition-all ${isSelected ? 'text-white shadow-lg' : 'text-gray-400 group-hover:bg-white/50 group-hover:text-slate-800'}`} style={{ backgroundColor: isSelected ? 'var(--primary)' : 'transparent', boxShadow: isSelected ? '0 5px 15px -3px var(--primary-dim)' : 'none' }}>{d}</div>{hasDot && (<div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : ''}`} style={{ backgroundColor: isSelected ? 'white' : 'var(--primary)' }}></div>)}</div>)
                })}
            </div>

            <div className="mb-3 border-t border-gray-200 pt-4" style={{ borderColor: 'var(--glass-border)' }}>
                <div className="min-w-0">
                    <FilterChips selected={activeFilter} onSelect={setActiveFilter} />
                </div>
                <div className="flex justify-between items-end mb-4">
                    <p className="text-sm font-medium opacity-60" style={{ color: 'var(--text-secondary)' }}>{selectedDate} ธันวาคม • {selectedDate === 25 ? 'วันคริสต์มาส' : 'วันทั่วไป'}</p>
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--primary-dim)', color: 'var(--primary)' }}>{filteredEvents.length} กิจกรรม</span>
                </div>
                <div className="space-y-4">{filteredEvents.map((event) => (<EventCard key={event.id} {...event} onClick={() => onSelectEvent(event)} className="mb-4" />))}</div>
            </div>
        </div>
    );
}

const NotificationsScreen = ({ onSelectEvent }: any) => {
    // Mock Data for notifications
    const newNotifications = [
        { id: 1, type: 'ai', title: 'ข้อเสนอแนะจาก AI', message: 'ดูเหมือนคุณจะมีเวลาว่างช่วงบ่าย 2 สนใจเพิ่ม "อ่านหนังสือ" เข้าไปไหม?', time: '2 นาทีที่แล้ว', action: true },
        { id: 2, type: 'alert', title: 'ใกล้ถึงเวลานัดหมาย', message: 'ประชุม Design System ในอีก 15 นาที', time: '15 นาทีที่แล้ว' },
    ];

    const oldNotifications = [
        { id: 3, type: 'success', title: 'เป้าหมายสำเร็จ!', message: 'คุณดื่มน้ำครบ 8 แก้วแล้วในวันนี้ สุดยอดไปเลย! 💧', time: '1 ชั่วโมงที่แล้ว' },
        { id: 4, type: 'money', title: 'แจ้งเตือนค่าใช้จ่าย', message: 'เมื่อวานคุณใช้จ่ายเกินงบไป 200 บาท ลองตรวจสอบดูนะ', time: 'เมื่อวาน' },
        { id: 5, type: 'system', title: 'VURENIO Update', message: 'เราได้เพิ่มฟีเจอร์ Dark Mode ใหม่ เข้าไปลองใช้ได้ที่หน้าตั้งค่า', time: '2 วันที่แล้ว' },
    ];

    const renderItem = (item: any, isNew: boolean) => (
        <div key={item.id} className={`p-4 rounded-2xl mb-3 border transition-all relative overflow-hidden group ${isNew ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-50 border-transparent opacity-70 hover:opacity-100'}`}>
            {isNew && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-rose-500"></div>}
            <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.type === 'ai' ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white' :
                    item.type === 'alert' ? 'bg-amber-100 text-amber-500' :
                        item.type === 'success' ? 'bg-emerald-100 text-emerald-500' :
                            item.type === 'money' ? 'bg-rose-100 text-rose-500' :
                                'bg-slate-200 text-slate-500'
                    }`}>
                    {item.type === 'ai' && <Sparkles size={18} />}
                    {item.type === 'alert' && <Clock size={18} />}
                    {item.type === 'success' && <CheckCircle size={18} />}
                    {item.type === 'money' && <Coins size={18} />}
                    {item.type === 'system' && <Settings size={18} />}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-bold ${isNew ? 'text-slate-800' : 'text-slate-600'}`}>{item.title}</h4>
                        <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-2">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">{item.message}</p>
                    {item.action && (
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-bold hover:bg-indigo-100">เพิ่มเลย</button>
                            <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-[10px] font-bold hover:bg-slate-50">ไว้ก่อน</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="pb-32 px-6 pt-16 h-full overflow-y-auto no-scrollbar bg-[#F1F5F9]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black tracking-tight text-slate-800">การแจ้งเตือน</h1>
                <button className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">ล้างทั้งหมด</button>
            </div>

            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">ใหม่ล่าสุด</h2>
            <div className="mb-6">
                {newNotifications.map(item => renderItem(item, true))}
            </div>

            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">ก่อนหน้า</h2>
            <div className="mb-6">
                {oldNotifications.map(item => renderItem(item, false))}
            </div>
        </div>
    );
};

const ProfileScreen = ({ onToSub, onNavigate }: any) => (
    <div className="pb-32 px-6 pt-16 h-full overflow-y-auto no-scrollbar">
        <div className="flex flex-col items-center mb-10">
            <div className="relative w-28 h-28 mb-5">
                <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ background: 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))' }}></div>
                <div className="relative w-full h-full rounded-full p-[3px]" style={{ background: 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))' }}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center"><User size={48} className="text-gray-400" /></div>
                </div>
                <button className="absolute bottom-0 right-0 p-2.5 rounded-full text-white shadow-lg border-2 border-white" style={{ backgroundColor: 'var(--primary)' }}>
                    <Camera size={14} />
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Alex Doe</h1>
            <p className="text-sm font-medium opacity-60" style={{ color: 'var(--text-secondary)' }}>alex.doe@example.com</p>
            <div className="flex gap-10 mt-8"><div className="text-center"><span className="block text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>12</span><span className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--text-secondary)' }}>Tasks Done</span></div><div className="w-[1px] h-10 bg-gray-200"></div><div className="text-center"><span className="block text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>85%</span><span className="text-[10px] font-bold uppercase tracking-wider opacity-60" style={{ color: 'var(--text-secondary)' }}>Productivity</span></div></div>
        </div>
        <div onClick={onToSub} className="cursor-pointer mb-10 relative group transform transition-all duration-300 hover:scale-[1.02]"><div className="absolute inset-0 rounded-3xl blur opacity-40 group-hover:opacity-60 transition-opacity" style={{ background: 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))' }}></div><GlassCard className="relative p-0 overflow-hidden border-none"><div className="absolute inset-0 opacity-90" style={{ background: 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))' }}></div><div className="p-5 flex justify-between items-center relative z-10"><div className="flex items-center gap-4"><div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner"><Crown className="text-white" size={24} /></div><div className="text-left"><p className="text-white font-bold text-lg">อัปเกรดเป็น Pro</p><p className="text-white/80 text-xs font-medium">ปลดล็อกฟีเจอร์ AI ทั้งหมด</p></div></div><div className="p-2 bg-white/10 rounded-full"><ChevronRight className="text-white" size={20} /></div></div></GlassCard></div>
        <div className="space-y-8">
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 ml-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>บัญชี</h3>
                <div className="space-y-4">
                    <GlassCard onClick={() => onNavigate('edit-profile')} className="p-5 flex items-center justify-between hover:bg-white/40 cursor-pointer group"><div className="flex items-center gap-4"><div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400"><User size={20} /></div><span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>แก้ไขข้อมูลส่วนตัว</span></div><ChevronRight size={18} className="text-gray-400 group-hover:text-[#38BDF8] transition-colors" /></GlassCard>
                    <GlassCard className="p-5 flex items-center justify-between hover:bg-white/40 cursor-pointer group"><div className="flex items-center gap-4"><div className="p-2.5 rounded-xl bg-green-500/10 text-green-400"><CreditCard size={20} /></div><span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>การชำระเงิน</span></div><ChevronRight size={18} className="text-gray-400 group-hover:text-[#38BDF8] transition-colors" /></GlassCard>
                </div>
            </div>
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 ml-1 opacity-60" style={{ color: 'var(--text-secondary)' }}>การตั้งค่า</h3>
                <div className="space-y-4">
                    <GlassCard onClick={() => onNavigate('settings-notifications')} className="p-5 flex items-center justify-between hover:bg-white/40 cursor-pointer group"><div className="flex items-center gap-4"><div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400"><Bell size={20} /></div><span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>การแจ้งเตือน</span></div><ChevronRight size={18} className="text-gray-400 group-hover:text-[#38BDF8] transition-colors" /></GlassCard>
                    <GlassCard onClick={() => onNavigate('settings-general')} className="p-5 flex items-center justify-between hover:bg-white/40 cursor-pointer group"><div className="flex items-center gap-4"><div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400"><Settings size={20} /></div><span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>ตั้งค่าทั่วไป</span></div><ChevronRight size={18} className="text-gray-400 group-hover:text-[#38BDF8] transition-colors" /></GlassCard>
                </div>
            </div>
            <div className="pt-4 pb-8"><button className="w-full py-4 text-red-400/80 hover:text-red-400 font-bold text-sm hover:bg-red-500/5 rounded-2xl transition-all flex items-center justify-center gap-2"><LogOut size={18} />ออกจากระบบ</button></div>
        </div>
    </div>
);

const EditProfileScreen = ({ onBack }: any) => (
    <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
        <div className="flex items-center mb-8 shrink-0"><button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 mr-4 border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><ChevronLeft size={24} /></button><h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>แก้ไขข้อมูลส่วนตัว</h1></div>
        <div className="space-y-6"><div><label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-secondary)' }}>ชื่อ - นามสกุล</label><GlowInput icon={User} placeholder="Alex Doe" defaultValue="Alex Doe" /></div><div><label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-secondary)' }}>อีเมล</label><GlowInput icon={Mail} placeholder="alex.doe@example.com" type="email" defaultValue="alex.doe@example.com" /></div><div><label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-secondary)' }}>เบอร์โทรศัพท์</label><GlowInput icon={Smartphone} placeholder="+66 81 234 5678" type="tel" defaultValue="+66 81 234 5678" /></div></div>
        <div className="mt-auto pt-8"><PrimaryButton onClick={onBack}>บันทึกการเปลี่ยนแปลง</PrimaryButton></div>
    </div>
);

// const SubscriptionScreen = ({onBack}) => (
//     <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar relative z-10 bg-[#F1F5F9]">
//         <div className="flex items-center mb-8 shrink-0 relative z-20">
//             <button onClick={onBack} className="p-3 rounded-full hover:bg-slate-200 mr-4 bg-white shadow-sm border border-slate-100 text-slate-700 transition-colors">
//                 <ChevronLeft size={24} />
//             </button>
//             <h1 className="text-2xl font-black text-slate-800">VURENIO Pro</h1>
//         </div>

//         <div className="space-y-6 relative z-20 pb-20">
//             {/* Free Plan */}
//             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
//                 <div className="flex justify-between items-start mb-4">
//                     <div>
//                         <h2 className="text-xl font-bold text-slate-800">Free</h2>
//                         <p className="text-xs text-slate-500 mt-1">สำหรับการใช้งานพื้นฐาน</p>
//                     </div>
//                     <span className="text-2xl font-black text-slate-800">฿0</span>
//                 </div>
//                 <ul className="space-y-3 mb-6">
//                     <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-slate-400" /> บันทึกงานไม่จำกัด</li>
//                     <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-slate-400" /> ปฏิทินพื้นฐาน</li>
//                     <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-slate-400" /> แจ้งเตือนธรรมดา</li>
//                 </ul>
//                 <button className="w-full py-3.5 rounded-xl border-2 border-slate-200 font-bold text-sm text-slate-400 bg-slate-50 cursor-default">ใช้งานปัจจุบัน</button>
//             </div>

//             {/* Pro Plan (Recommended) */}
//             <div className="relative group transform hover:scale-[1.02] transition-transform duration-300">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-[26px] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
//                 <div className="relative bg-white p-6 rounded-3xl border border-transparent shadow-xl">
//                     <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">Recommended</div>
//                     <div className="flex justify-between items-start mb-4">
//                         <div>
//                             <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">Pro</h2>
//                             <p className="text-xs text-slate-500 mt-1">ปลดล็อกพลัง AI เต็มรูปแบบ</p>
//                         </div>
//                         <div className="text-right">
//                             <span className="text-2xl font-black text-slate-800">฿59</span>
//                             <span className="text-xs text-slate-400 font-medium block">/ เดือน</span>
//                         </div>
//                     </div>
//                     <ul className="space-y-3 mb-6">
//                         <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><div className="p-1 rounded-full bg-pink-100 text-pink-500"><Sparkles size={12} /></div> AI ช่วยวางแผนงาน</li>
//                         <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><div className="p-1 rounded-full bg-violet-100 text-violet-500"><Palette size={12} /></div> ปรับแต่ง Theme สี</li>
//                         <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><div className="p-1 rounded-full bg-blue-100 text-blue-500"><BarChart3 size={12} /></div> วิเคราะห์ Productivity</li>
//                     </ul>
//                     <button className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg bg-gradient-to-r from-pink-500 to-violet-600 hover:shadow-pink-500/30 transition-all active:scale-95">สมัครเลย</button>
//                 </div>
//             </div>

//             {/* Lifetime Plan */}
//             <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
//                 <div className="flex justify-between items-start mb-4 relative z-10">
//                     <div>
//                         <h2 className="text-xl font-bold text-white">Lifetime</h2>
//                         <p className="text-xs text-slate-400 mt-1">จ่ายครั้งเดียว จบครบทุกอย่าง</p>
//                     </div>
//                     <span className="text-2xl font-black text-amber-400">฿999</span>
//                 </div>
//                 <ul className="space-y-3 mb-6 relative z-10">
//                     <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle size={16} className="text-amber-400" /> ทุกฟีเจอร์ของ Pro</li>
//                     <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle size={16} className="text-amber-400" /> อัปเดตฟรีตลอดชีพ</li>
//                     <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle size={16} className="text-amber-400" /> ซัพพอร์ตระดับ VIP</li>
//                 </ul>
//                 <button className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 active:scale-95 relative z-10">ซื้อขาด</button>
//             </div>
//         </div>
//     </div>
// );

const SubscriptionScreen = ({ onBack }: any) => {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

    return (
        <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar relative z-10 bg-[#F1F5F9]">
            <div className="flex items-center mb-6 shrink-0 relative z-20">
                <button onClick={onBack} className="p-3 rounded-full hover:bg-slate-200 mr-4 bg-white shadow-sm border border-slate-100 text-slate-700 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-2xl font-black text-slate-800">VURENIO Pro</h1>
            </div>

            {/* Toggle Monthly/Yearly */}
            <div className="flex justify-center mb-8 relative z-20">
                <div className="bg-white p-1 rounded-2xl border border-slate-200 flex shadow-sm">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        รายเดือน
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        รายปี
                        <span className="text-[9px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-md uppercase tracking-wide border border-green-200">Save 20%</span>
                    </button>
                </div>
            </div>

            <div className="space-y-6 relative z-20 pb-20">
                {/* Free Plan */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Free</h2>
                            <p className="text-xs text-slate-500 mt-1">สำหรับการใช้งานพื้นฐาน</p>
                        </div>
                        <span className="text-2xl font-black text-slate-800">฿0</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-slate-400" /> บันทึกงานไม่จำกัด</li>
                        <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-slate-400" /> ปฏิทินพื้นฐาน</li>
                        <li className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle size={16} className="text-slate-400" /> แจ้งเตือนธรรมดา</li>
                    </ul>
                    <button className="w-full py-3.5 rounded-xl border-2 border-slate-200 font-bold text-sm text-slate-400 bg-slate-50 cursor-default">ใช้งานปัจจุบัน</button>
                </div>

                {/* Pro Plan (Recommended) */}
                <div className="relative group transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-[26px] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <div className="relative bg-white p-6 rounded-3xl border border-transparent shadow-xl">
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">Recommended</div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">Pro</h2>
                                <p className="text-xs text-slate-500 mt-1">ปลดล็อกพลัง AI เต็มรูปแบบ</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-slate-800">
                                    {billingCycle === 'monthly' ? '฿59' : '฿590'}
                                </span>
                                <span className="text-xs text-slate-400 font-medium block">
                                    {billingCycle === 'monthly' ? '/ เดือน' : '/ ปี'}
                                </span>
                            </div>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><div className="p-1 rounded-full bg-pink-100 text-pink-500"><Sparkles size={12} /></div> AI ช่วยวางแผนงาน</li>
                            <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><div className="p-1 rounded-full bg-violet-100 text-violet-500"><Palette size={12} /></div> ปรับแต่ง Theme สี</li>
                            <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><div className="p-1 rounded-full bg-blue-100 text-blue-500"><BarChart3 size={12} /></div> วิเคราะห์ Productivity</li>
                        </ul>
                        <button className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg bg-gradient-to-r from-pink-500 to-violet-600 hover:shadow-pink-500/30 transition-all active:scale-95">
                            {billingCycle === 'monthly' ? 'สมัครรายเดือน' : 'สมัครรายปี (ประหยัด ฿118)'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NotificationSettingsScreen = ({ onBack }: any) => {
    const [toggles, setToggles] = useState({ push: true, email: false, sound: true, vibrate: true });
    const handleToggle = (key: keyof typeof toggles) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    return (
        <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
            <div className="flex items-center mb-6 shrink-0"><button onClick={onBack} className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 mr-4 border border-white/5"><ChevronLeft size={24} /></button><h1 className="text-2xl font-bold text-white">ตั้งค่าการแจ้งเตือน</h1></div>
            <div className="space-y-8"><div><h3 className="text-[#A48FFC] text-xs font-bold uppercase tracking-wider mb-4">ทั่วไป</h3><GlassCard className="divide-y divide-white/10"><div className="p-4 flex items-center justify-between"><div className="flex items-center gap-3"><BellRing size={20} className="text-gray-400" /><span className="text-white text-sm font-medium">การแจ้งเตือนแบบ Push</span></div><Toggle checked={toggles.push} onChange={() => handleToggle('push')} /></div></GlassCard></div></div>
        </div>
    );
};

const GeneralSettingsScreen = ({ onBack, onNavigate }: any) => {
    const { isDarkMode, toggleTheme, colorTheme, setColorTheme } = useContext(ThemeContext);
    const themes: Array<{ id: ColorTheme; color: string }> = [{ id: 'sky', color: '#38BDF8' }, { id: 'mint', color: '#2DD4BF' }, { id: 'peach', color: '#FB923C' }, { id: 'lavender', color: '#A78BFA' }];
    return (
        <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
            <div className="flex items-center mb-6 shrink-0"><button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 mr-4 border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><ChevronLeft size={24} /></button><h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>ตั้งค่าทั่วไป</h1></div>
            <div className="space-y-6"><GlassCard className="p-5"><h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Palette size={18} /> Theme Color</h3><div className="flex gap-4">{themes.map(t => (<button key={t.id} onClick={() => setColorTheme(t.id)} className={`w-12 h-12 rounded-full border-4 transition-all ${colorTheme === t.id ? 'scale-110 shadow-lg' : 'opacity-70 hover:opacity-100'}`} style={{ backgroundColor: t.color, borderColor: colorTheme === t.id ? 'white' : 'transparent' }} />))}</div></GlassCard><GlassCard className="divide-y" style={{ borderColor: 'var(--glass-border)' }}><div className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer"><div className="flex items-center gap-4"><div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>{isDarkMode ? <Moon size={18} /> : <Sun size={18} />}</div><span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>โหมดมืด (Dark Mode)</span></div><Toggle checked={isDarkMode} onChange={toggleTheme} /></div></GlassCard></div>
        </div>
    );
};

const SupportScreen = ({ onBack }: any) => (
    <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
        <div className="flex items-center mb-6 shrink-0"><button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 mr-4 border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><ChevronLeft size={24} /></button><h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>ช่วยเหลือและสนับสนุน</h1></div>
        <div className="space-y-6"><div><h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A48FFC' }}>ติดต่อเรา</h3><div className="grid grid-cols-2 gap-4"><GlassCard className="p-4 flex flex-col items-center justify-center gap-3 hover:bg-black/5 cursor-pointer text-center"><div className="p-3 rounded-full bg-blue-500/10 text-blue-500"><MessageCircle size={24} /></div><p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Live Chat</p></GlassCard><GlassCard className="p-4 flex flex-col items-center justify-center gap-3 hover:bg-black/5 cursor-pointer text-center"><div className="p-3 rounded-full bg-green-500/10 text-green-500"><Mail size={24} /></div><p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Email</p></GlassCard></div></div></div>
    </div>
);

const PomodoroScreen = ({ onBack }: any) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); const [isActive, setIsActive] = useState(false); const [mode, setMode] = useState('focus'); const [tomatoes, setTomatoes] = useState(0); const [todoList, setTodoList] = useState<string[]>([]); const [newTodo, setNewTodo] = useState(''); const [focusDuration, setFocusDuration] = useState(25); const [breakDuration, setBreakDuration] = useState(5); const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    useEffect(() => { let interval: ReturnType<typeof setInterval> | undefined; if (isActive && timeLeft > 0) { interval = setInterval(() => { setTimeLeft((prev) => prev - 1); }, 1000); } else if (timeLeft === 0) { setIsActive(false); if (mode === 'focus') { setTomatoes(prev => prev + 1); setMode('break'); setTimeLeft(breakDuration * 60); } else { setMode('focus'); setTimeLeft(focusDuration * 60); } } return () => { if (interval) clearInterval(interval); }; }, [isActive, timeLeft, mode, focusDuration, breakDuration]);
    const toggleTimer = () => setIsActive(!isActive); const resetTimer = () => { setIsActive(false); setMode('focus'); setTimeLeft(focusDuration * 60); }; const saveSettings = () => { setIsSettingsOpen(false); resetTimer(); }; const formatTime = (seconds: number) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; }; const addTodo = () => { if (newTodo.trim()) { setTodoList([...todoList, newTodo]); setNewTodo(''); } };
    return (
        <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-8 shrink-0"><div className="flex items-center gap-4"><button onClick={onBack} className="p-3 rounded-full hover:bg-black/5 mr-2 border transition-all" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}><ChevronLeft size={24} /></button><h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Focus Garden 🍅</h1></div><button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`p-3 rounded-2xl transition-all border ${isSettingsOpen ? 'bg-[#38BDF8] text-white border-[#38BDF8]' : 'bg-transparent border-gray-200 hover:bg-white/50 text-gray-400'}`}><SlidersHorizontal size={22} /></button></div>
            {isSettingsOpen && (<div className="mb-8 animate-in slide-in-from-top-4 fade-in"><GlassCard className="p-6 border-[#38BDF8]/30 shadow-lg shadow-purple-500/10"><h3 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Settings size={18} /> Timer Settings</h3><div className="flex gap-6"><div className="flex-1"><label className="text-xs font-bold uppercase tracking-wider mb-2 block opacity-60" style={{ color: 'var(--text-secondary)' }}>Focus (min)</label><input type="number" value={focusDuration} onChange={(e) => setFocusDuration(Number(e.target.value))} className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-center font-bold text-xl focus:border-[#38BDF8] outline-none transition-colors" style={{ color: 'var(--text-primary)' }} /></div><div className="flex-1"><label className="text-xs font-bold uppercase tracking-wider mb-2 block opacity-60" style={{ color: 'var(--text-secondary)' }}>Break (min)</label><input type="number" value={breakDuration} onChange={(e) => setBreakDuration(Number(e.target.value))} className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-center font-bold text-xl focus:border-[#38BDF8] outline-none transition-colors" style={{ color: 'var(--text-primary)' }} /></div></div><button onClick={saveSettings} className="w-full mt-6 py-3 bg-[#38BDF8] text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-blue-400/30 transition-all">บันทึกการตั้งค่า</button></GlassCard></div>)}
            <GlassCard className="p-10 mb-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"><div className={`absolute inset-0 bg-gradient-to-br ${mode === 'focus' ? 'from-red-500/10 to-orange-500/10' : 'from-green-500/10 to-teal-500/10'} pointer-events-none transition-colors duration-1000`}></div><div className="relative w-72 h-72 flex items-center justify-center mb-8"><div className="absolute inset-0 rounded-full border-[12px] border-gray-100"></div>{isActive && (<div className={`absolute inset-0 rounded-full border-[12px] border-t-transparent animate-spin-slow ${mode === 'focus' ? 'border-[#EF4444]' : 'border-[#4ADE80]'}`} style={{ animationDuration: '10s' }}></div>)}<div className="text-center z-10"><p className="text-7xl font-bold font-mono tracking-wider drop-shadow-lg" style={{ color: 'var(--text-primary)' }}>{formatTime(timeLeft)}</p><div className={`mt-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-block ${mode === 'focus' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>{mode === 'focus' ? 'Focus Mode' : 'Break Time'}</div></div></div><div className="flex gap-8 items-center"><button onClick={toggleTimer} className="w-20 h-20 rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:scale-110 transition-transform active:scale-95 flex items-center justify-center border border-gray-100">{isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}</button><button onClick={resetTimer} className="p-5 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600"><RotateCcw size={28} /></button></div></GlassCard>
            <div className="flex-1 pb-10"><h3 className="text-base font-bold mb-4 flex items-center gap-2.5" style={{ color: 'var(--text-primary)' }}><div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary-dim)', color: 'var(--primary)' }}><ListTodo size={20} /></div>Tasks for this session</h3><div className="flex gap-3 mb-6"><div className="flex-1"><GlowInput placeholder="เพิ่มงานที่จะทำ..." value={newTodo} onChange={(e: any) => setNewTodo(e.target.value)} /></div><button onClick={addTodo} className="h-[58px] w-[58px] rounded-2xl text-white shadow-lg active:scale-95 transition-all flex items-center justify-center -mt-0.5" style={{ background: 'var(--primary)' }}><Plus size={28} /></button></div><div className="space-y-3">{todoList.map((todo, i) => (<div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white/40"><span className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{todo}</span></div>))}</div></div>
        </div>
    );
};

// --- Dev Tools Component ---
const DevTools = ({ activeMock, setActiveMock }: any) => {
    return (
        <div className="hidden lg:flex flex-col gap-4 p-6 w-80 h-full overflow-y-auto border-r border-gray-200 bg-white shadow-sm z-50">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Monitor size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Dev Tools</h2>
                    <p className="text-xs text-slate-500 font-medium">Card Simulator</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Next Event Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Added 'all' button manually first */}
                        <button
                            onClick={() => setActiveMock('all')}
                            className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 group ${activeMock === 'all' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                        >
                            {activeMock === 'all' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-colors ${activeMock === 'all' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'}`}>
                                <Layers size={16} />
                            </div>
                            <span className={`text-xs font-bold block capitalize ${activeMock === 'all' ? 'text-indigo-700' : 'text-slate-600'}`}>All</span>
                        </button>

                        {/* Other types */}
                        {(Object.keys(mockNextEvents) as Array<keyof typeof mockNextEvents>)
                            .filter((k): k is Exclude<keyof typeof mockNextEvents, 'all'> => k !== 'all')
                            .map((key) => {
                            const data = mockNextEvents[key];
                            const isActive = activeMock === key;
                            const Icon = data.icon;

                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveMock(key)}
                                    className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 group ${isActive ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                                >
                                    {isActive && (
                                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                                    )}
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-colors ${isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'}`}>
                                        <Icon size={16} />
                                    </div>
                                    <span className={`text-xs font-bold block capitalize ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>
                                        {key}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-start gap-3">
                        <Info size={16} className="text-slate-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Use this panel to simulate different "Next Event" states. The card in the app will update instantly. <br /><br />
                            <strong>Sync Timeline:</strong> Selecting a type will also filter the list below to show only items of that category.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- HOME SCREEN ---
const HomeScreen = ({ onOpenAI, onSelectEvent, onNavigate, nextEvent, filterType, setFilterType }: any) => {
    // Filter events based on DevTools selection
    const filteredEvents = filterType === 'all'
        ? timelineData
        : timelineData.filter(e => e.type === filterType);

    const Icon = nextEvent.icon;

    return (
        <div className="pb-32 h-full overflow-y-auto overflow-x-hidden no-scrollbar relative bg-[#F1F5F9]">
            {/* VIBRANT BLUE HEADER */}
            <div className="rounded-b-[40px] px-6 pt-12 pb-16 shadow-xl shadow-blue-500/20 relative overflow-hidden mb-6 group">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8] via-[#3B82F6] to-[#2563EB] animate-gradient-xy"></div>

                {/* Pattern Overlay - Geometric Shapes */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>

                {/* Floating Orbs with distinct animations */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute top-20 -left-20 w-48 h-48 bg-cyan-300/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '10s' }}></div>
                <div className="absolute bottom-0 right-10 w-32 h-32 bg-blue-400/30 rounded-full blur-xl mix-blend-overlay"></div>

                <div className="relative z-10">
                    {/* Top Row: Avatar & Streak Fire */}
                    <div className="flex justify-between items-center mb-6">
                        {/* Avatar with Rotating Ring */}
                        <div className="relative group/avatar cursor-pointer">
                            <div className="absolute -inset-1 rounded-full border-2 border-dashed border-white/40 animate-spin-slow" style={{ animationDuration: '10s' }}></div>
                            <div className="relative w-14 h-14 rounded-full border-2 border-white p-0.5 bg-white/20 backdrop-blur-md shadow-lg transition-transform group-hover/avatar:scale-105">
                                <div className="w-full h-full rounded-full overflow-hidden bg-white/90 flex items-center justify-center">
                                    <User size={24} className="text-[#2563EB]" />
                                </div>
                            </div>
                        </div>

                        {/* TikTok-style Streak Fire Badge */}
                        <div className="group relative cursor-pointer transform transition-transform active:scale-95">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-orange-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>

                            <div className="relative bg-black/40 backdrop-blur-md pl-1.5 pr-4 py-1.5 rounded-full flex items-center gap-2.5 border border-white/20 hover:bg-black/50 transition-colors shadow-lg">
                                {/* Fire Icon Circle */}
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center shadow-inner border border-white/10">
                                    <Flame size={18} className="text-white fill-white animate-bounce-slow" />
                                </div>

                                {/* Text Stack */}
                                <div className="flex flex-col items-start justify-center">
                                    <span className="text-white font-black text-base leading-none drop-shadow-sm flex items-center gap-1">
                                        12 <span className="text-[10px] opacity-80 font-normal">🔥</span>
                                    </span>
                                    <span className="text-[9px] text-orange-200 font-bold uppercase tracking-wider leading-none mt-0.5">Day Streak</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Greeting */}
                    <div className="mb-2">
                        <p className="text-white/90 text-sm font-semibold mb-1 tracking-wide drop-shadow-md animate-in slide-in-from-left-2 duration-500">สวัสดีตอนเช้า 👋</p>
                        <h1 className="text-4xl font-black text-white tracking-tight mb-2 drop-shadow-lg animate-in slide-in-from-left-4 duration-700">คุณ Alex</h1>

                        {/* Location & Weather Row */}
                        <div className="flex flex-wrap gap-3 mt-4">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-sm">
                                <MapPin size={14} className="text-white" />
                                <span className="text-xs font-bold text-white">สาทร, กรุงเทพฯ</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-sm">
                                <CloudSun size={14} className="text-white" />
                                <span className="text-xs font-bold text-white">28°C แดดจัด</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DYNAMIC NEXT EVENT CARD (Overlapping Style) */}
            <div className="-mt-20 relative z-20 mb-6 px-6 ">
                <GlassCard className="p-0 bg-white shadow-xl shadow-slate-200/50 border border-white/40 relative overflow-hidden group/card hover:scale-[1.01] transition-transform duration-300" style={{ borderRadius: '28px' }}>
                    <div className="p-5 flex gap-4 items-center relative z-10">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${nextEvent.color} text-white flex flex-col items-center justify-center shadow-lg ${nextEvent.shadow}`}>
                            <span className="text-[9px] font-bold uppercase opacity-80 mb-0.5">NOW</span>
                            <Icon size={20} className="animate-pulse" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${nextEvent.badgeColor}`}>
                                    {nextEvent.tag}
                                </span>
                                <span className="text-xs font-bold text-slate-400">{nextEvent.time}</span>
                            </div>
                            <h4 className="text-lg font-black text-slate-800 leading-tight mb-1 line-clamp-1">{nextEvent.title}</h4>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 line-clamp-1">
                                {nextEvent.type === 'event' ? <MapPin size={12} /> : nextEvent.type === 'shopping' ? <ShoppingBag size={12} /> : nextEvent.type === 'expense' ? <Coins size={12} /> : <Activity size={12} />}
                                {nextEvent.subtitle || nextEvent.location}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="bg-slate-50 p-3 flex gap-3 border-t border-slate-100">
                        <button className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-md">
                            {nextEvent.action1}
                        </button>
                        <button className="px-4 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
                            {nextEvent.action2}
                        </button>
                    </div>
                </GlassCard>
            </div>

            {/* FILTER CHIPS - ADDED HERE */}
            <div className="min-w-0 px-6 ">
                <FilterChips selected={filterType} onSelect={setFilterType} />
            </div>

            <div className="relative overflow-x-hidden px-6 ">
                {/* Background Pattern for Timeline - Subtle Glow Added */}
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    marginLeft: '24px' // Offset to not overlap with line
                }}></div>
                <div className="absolute top-0 left-10 w-full h-full bg-blue-50/30 blur-3xl -z-10 pointer-events-none"></div>

                <div className="flex justify-between items-end mb-6 px-1 relative z-10">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Today's Timeline
                        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">{filteredEvents.length}</span>
                    </h3>
                    <button className="text-slate-500 text-sm font-bold hover:text-slate-900 transition-colors bg-white/50 px-3 py-1 rounded-lg backdrop-blur-sm">View Calendar</button>
                </div>

                {/* TIMELINE: Compact Column with Time on Line */}
                <div className="space-y-0 z-10 relative">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <div key={event.id} className="flex gap-2 relative">
                                {/* 1. Timeline Line Column (Compact Width ~12 = 48px) */}
                                <div className="relative flex flex-col items-center w-12 shrink-0">
                                    {/* Continuous Line */}
                                    {index !== filteredEvents.length - 1 && (
                                        <div className="absolute top-8 bottom-[-16px] w-[2px] border-l-2 border-dashed border-slate-300 left-1/2 -translate-x-1/2"></div>
                                    )}

                                    {/* Time Text (Compact on top) */}
                                    <span className="text-[10px] font-bold text-slate-500 bg-[#F1F5F9] px-1 z-10 mt-4 mb-1 tracking-tighter">
                                        {event.time.split(' ')[0]}
                                    </span>

                                    {/* The Dot */}
                                    <div
                                        className="w-3 h-3 rounded-full bg-white border-[3px] shadow-sm z-10 transition-transform hover:scale-125"
                                        style={{ borderColor: event.tagColor }}
                                    ></div>
                                </div>

                                {/* 2. Card Column (Expands to fill remaining space) */}
                                <div className="flex-1 pb-4">
                                    <EventCard
                                        {...event}
                                        variant="solid"
                                        showTime={false} // Hide time inside card
                                        onClick={() => onSelectEvent(event)}
                                        className="mb-0 shadow-sm"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center opacity-50">
                            <p className="text-sm font-medium">No events for this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

function App() {
    // CHANGE: Set initial screen to 'onboarding'
    const [screen, setScreen] = useState('onboarding');
    const [showAI, setShowAI] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [colorTheme, setColorTheme] = useState<ColorTheme>('sky');

    // State for Dev Tools - Default to 'event' but added 'all' logic
    const [activeMock, setActiveMock] = useState<keyof typeof mockNextEvents>('all');
    const currentNextEvent = mockNextEvents[activeMock];

    // Register Service Worker for PWA offline support
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((error) => {
                        console.log('SW registration failed: ', error);
                    });
            });
        }
    }, []);

    // Dynamic CSS Variables based on Theme Selection
    const getThemeColors = () => {
        switch (colorTheme) {
            case 'mint': return `
            --primary: #2DD4BF;
            --primary-dim: rgba(45, 212, 191, 0.15);
            --gradient-from: #5EEAD4;
            --gradient-to: #14B8A6;
            --toggle-bg: #CCFBF1;
            `;
            case 'peach': return `
            --primary: #FB923C;
            --primary-dim: rgba(251, 146, 60, 0.15);
            --gradient-from: #FDBA74;
            --gradient-to: #EA580C;
            --toggle-bg: #FFEDD5;
            `;
            case 'lavender': return `
            --primary: #A78BFA;
            --primary-dim: rgba(167, 139, 250, 0.15);
            --gradient-from: #C4B5FD;
            --gradient-to: #7C3AED;
            --toggle-bg: #EDE9FE;
            `;
            default: return `
            --primary: #38BDF8;
            --primary-dim: rgba(56, 189, 248, 0.15);
            --gradient-from: #7DD3FC;
            --gradient-to: #0EA5E9;
            --toggle-bg: #E0F2FE;
            `; // Sky
        }
    };

    const themeStyles = `
            ${getThemeColors()}
            ${isDarkMode ? `
        --bg-primary: #0F172A;
        --bg-overlay: rgba(15, 23, 42, 0.95);
        --text-primary: #F1F5F9;
        --text-secondary: #94A3B8;
        --glass-bg: rgba(30, 41, 59, 0.6);
        --glass-border: rgba(255, 255, 255, 0.1);
        --input-bg: rgba(15, 23, 42, 0.6);
        --nav-bg: rgba(15, 23, 42, 0.85);
        --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        --card-bg: rgba(30, 41, 59, 0.8);
        --card-border: rgba(255, 255, 255, 0.1);
        --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    ` : `
        --bg-primary: #F1F5F9; /* Cool Gray background for better contrast */
        --bg-overlay: rgba(255, 255, 255, 0.98);
        --text-primary: #0F172A;
        --text-secondary: #64748B;
        --glass-bg: rgba(255, 255, 255, 0.9);
        --glass-border: #E2E8F0;
        --input-bg: #F8FAFC;
        --nav-bg: rgba(255, 255, 255, 0.9);
        --glass-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        --card-bg: #FFFFFF;
        --card-border: #F1F5F9;
        --card-shadow: 0 8px 30px -6px rgba(0, 0, 0, 0.08); /* Boosted shadow */
    `}
            `;

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // Simple Router
    const renderScreen = () => {
        switch (screen) {
            case 'onboarding': return <OnboardingScreen onLogin={() => setScreen('login')} onSignup={() => setScreen('signup')} />;
            case 'login': return <LoginScreen onLogin={() => setScreen('home')} onSwitch={() => setScreen('signup')} />;
            case 'signup': return <SignupScreen onSignup={() => setScreen('home')} onSwitch={() => setScreen('login')} />;
            // Pass dynamic nextEvent AND filterType props to HomeScreen
            case 'home': return <HomeScreen onOpenAI={() => setShowAI(true)} onSelectEvent={setSelectedEvent} onNavigate={setScreen} nextEvent={currentNextEvent} filterType={activeMock} setFilterType={setActiveMock} />;
            case 'calendar-week': return <CalendarWeekScreen onSwitchMode={() => setScreen('calendar-month')} onSelectEvent={setSelectedEvent} />;
            case 'calendar-month': return <CalendarMonthScreen onSwitchMode={() => setScreen('calendar-week')} onSelectEvent={setSelectedEvent} />;
            case 'notifications': return <NotificationsScreen onSelectEvent={setSelectedEvent} />;
            case 'profile': return <ProfileScreen onToSub={() => setScreen('subscription')} onNavigate={setScreen} />;
            case 'edit-profile': return <EditProfileScreen onBack={() => setScreen('profile')} />;
            case 'subscription': return <SubscriptionScreen onBack={() => setScreen('profile')} />;
            case 'settings-notifications': return <NotificationSettingsScreen onBack={() => setScreen('profile')} />;
            case 'settings-general': return <GeneralSettingsScreen onBack={() => setScreen('profile')} onNavigate={setScreen} />;
            case 'support': return <SupportScreen onBack={() => setScreen('settings-general')} />;
            case 'pomodoro': return <PomodoroScreen onBack={() => setScreen('home')} />;
            default: return <HomeScreen onOpenAI={() => setShowAI(true)} onSelectEvent={setSelectedEvent} onNavigate={setScreen} nextEvent={currentNextEvent} filterType={activeMock} setFilterType={setActiveMock} />;
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colorTheme, setColorTheme }}>
            <div
                className="w-full h-screen flex items-center justify-center font-sans overflow-hidden transition-colors duration-500 bg-gray-100"
            >
                <style>{`:root { ${themeStyles} } 
                .no-scrollbar::-webkit-scrollbar { display: none; }
                @supports (padding: max(0px)) {
                    body { 
                        padding-left: env(safe-area-inset-left);
                        padding-right: env(safe-area-inset-right);
                    }
                }
                `}</style>

                <div className="flex w-full h-full justify-center">
                    {/* Dev Tools Panel - Hidden for mobile testing */}
                    {/* <DevTools activeMock={activeMock} setActiveMock={setActiveMock} /> */}

                    {/* Mobile Container Frame - Full screen on mobile, mockup on desktop */}
                    <div className="flex-1 min-w-0 w-full flex items-stretch justify-stretch md:items-center md:justify-center h-full relative md:p-6 overflow-hidden">
                        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.05] pointer-events-none animate-pulse" style={{ backgroundColor: 'var(--primary)', animationDuration: '8s' }}></div>
                        <div className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.05] pointer-events-none animate-pulse" style={{ backgroundColor: 'var(--gradient-to)', animationDelay: '4s', animationDuration: '10s' }}></div>

                        <div
                            className="relative z-10 w-full min-w-0 max-w-[100vw] md:max-w-[430px] h-full md:h-[932px] md:rounded-[45px] md:shadow-2xl overflow-hidden transition-colors duration-300"
                            style={{ backgroundColor: 'var(--bg-primary)' }}
                        >
                            <div className="h-full w-full min-w-0 overflow-hidden relative">
                                {renderScreen()}

                                {/* Overlays */}
                                {showAI && <AIInputOverlay onClose={() => setShowAI(false)} />}
                                {selectedEvent && <EventDetailOverlay event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
                            </div>

                            {/* Mascot in the main app frame (Single Instance) */}
                            {!['login', 'signup', 'onboarding'].includes(screen) && <Mascot />}

                            {/* Show Bottom Nav only on main screens */}
                            {!['login', 'signup', 'onboarding', 'subscription', 'settings-notifications', 'settings-general', 'support', 'edit-profile', 'pomodoro'].includes(screen) && (
                                <BottomNav
                                    activeTab={screen}
                                    onNavigate={setScreen}
                                    onAdd={() => setShowAI(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;