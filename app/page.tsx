'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Home,
  Calendar,
  Plus,
  Bell,
  User,
  Mic,
  ChevronRight,
  MapPin,
  Clock,
  MoreHorizontal,
  CheckCircle,
  X,
  Sparkles,
  Lock,
  Mail,
  Smartphone,
  Check,
  Zap,
  Crown,
  LogOut,
  Settings,
  CreditCard,
  ChevronLeft,
  Moon,
  Globe,
  Shield,
  HelpCircle,
  Volume2,
  BellRing,
  RefreshCw,
  Trash2,
  ArrowUp,
  Send,
  Users,
  ShoppingBag,
  ListTodo,
  Activity,
  Repeat,
  Coins,
  Plane,
  CheckSquare,
  Edit2,
  Share2,
  MessageCircle,
  FileText,
  AlertTriangle,
  Sun,
  Lightbulb,
  Car,
  CloudSun,
  ClipboardList,
  Wind,
  Droplets,
  Camera,
  PieChart,
  BarChart3,
  Hourglass,
  Filter,
  Info
} from 'lucide-react';

// --- Theme Context ---
const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => { }
});

// --- Types & Interfaces ---
type Screen = 'login' | 'signup' | 'home' | 'calendar-week' | 'calendar-month' | 'notifications' | 'profile' | 'edit-profile' | 'subscription' | 'settings-notifications' | 'settings-general' | 'support';

type CardType = 'event' | 'shopping' | 'habit' | 'expense' | 'trip' | 'todo';

interface EventData {
  id: string;
  type: CardType;
  title: string;
  time: string;
  date?: string;
  location?: string;
  tag: string;
  tagColor: string;
  participants?: string[];
  items?: string[];
  amount?: string;
  recurrence?: string;
  note?: string;
  tips?: string;
  travelTime?: string;
  weather?: string;
  prepList?: string[];
  completed?: boolean;
}

// --- Shared Components ---

const GlassCard = ({
  children,
  className = '',
  onClick,
  style
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => (
  <div
    onClick={onClick}
    className={`backdrop-blur-xl rounded-2xl transition-all duration-300 ${className}`}
    style={{
      backgroundColor: 'var(--glass-bg)',
      borderColor: 'var(--glass-border)',
      borderWidth: '1px',
      borderStyle: 'solid',
      ...style
    }}
  >
    {children}
  </div>
);

const PrimaryButton = ({ children, onClick, className = '' }: { children: React.ReactNode, onClick?: () => void, className?: string }) => (
  <button
    onClick={onClick}
    className={`w-full py-4 rounded-2xl bg-gradient-to-r from-[#7F56D9] to-[#A48FFC] text-white font-semibold text-lg shadow-[0_4px_20px_rgba(164,143,252,0.4)] active:scale-[0.98] transition-transform ${className}`}
  >
    {children}
  </button>
);

const GlowInput = ({ icon: Icon, placeholder, type = "text", defaultValue }: { icon: any, placeholder: string, type?: string, defaultValue?: string }) => (
  <div className="relative group mb-4">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#A48FFC] transition-colors">
      <Icon size={20} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="w-full border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#A48FFC]/50 focus:ring-1 focus:ring-[#A48FFC]/50 transition-all placeholder-gray-500"
      style={{
        backgroundColor: 'var(--input-bg)',
        borderColor: 'var(--glass-border)',
        color: 'var(--text-primary)'
      }}
    />
  </div>
);

const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
  <div
    onClick={onChange}
    className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300`}
    style={{ backgroundColor: checked ? '#A48FFC' : 'var(--glass-border)' }}
  >
    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
  </div>
);

const BottomNav = ({ activeTab, onNavigate, onAdd }: { activeTab: string, onNavigate: (s: Screen) => void, onAdd: () => void }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'calendar-week', icon: Calendar, label: 'Calendar' },
    { id: 'add', icon: Plus, label: 'Add', isFab: true },
    { id: 'notifications', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[90px] backdrop-blur-lg border-t flex items-center justify-around px-2 z-50 rounded-t-[30px] transition-colors duration-300"
      style={{
        backgroundColor: 'var(--nav-bg)',
        borderColor: 'var(--glass-border)'
      }}
    >
      {items.map((item) => {
        const isActive = activeTab === item.id || (activeTab === 'calendar-month' && item.id === 'calendar-week');

        if (item.isFab) {
          return (
            <button
              key={item.id}
              onClick={onAdd}
              className="relative -top-6 bg-gradient-to-br from-[#7F56D9] to-[#A48FFC] p-4 rounded-full shadow-[0_0_20px_rgba(164,143,252,0.6)] border-4 transform transition-transform hover:scale-110 active:scale-95"
              style={{ borderColor: 'var(--bg-primary)' }}
            >
              <Sparkles className="text-white w-7 h-7" />
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={`flex flex-col items-center justify-center p-2 transition-all ${isActive ? 'text-[#A48FFC]' : 'text-gray-400 hover:text-gray-500'}`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-[#A48FFC]/20' : ''}`}>
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
          </button>
        );
      })}
    </div>
  );
};

// --- ADAPTIVE EVENT CARD ---
const EventCard = ({
  type = 'event',
  time,
  title,
  location,
  tag,
  tagColor,
  participants = [],
  items = [],
  amount,
  recurrence,
  tips,
  completed,
  onClick
}: {
  type?: CardType,
  time?: string,
  title: string,
  location?: string,
  tag: string,
  tagColor: string,
  participants?: string[],
  items?: string[],
  amount?: string,
  recurrence?: string,
  tips?: string,
  completed?: boolean,
  onClick?: () => void
}) => (
  <GlassCard onClick={onClick} className="p-4 relative group hover:bg-white/10 transition-all active:scale-[0.99] cursor-pointer">
    <div className="flex justify-between items-start">
      <div className="pr-2 flex-1">
        <h3 className={`font-semibold text-lg leading-snug mb-1 ${completed ? 'line-through opacity-50' : ''}`} style={{ color: 'var(--text-primary)' }}>{title}</h3>

        {/* Render Content Based on Type */}
        {type === 'event' && (
          <>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-gray-400 group-hover:text-gray-500 transition-colors mb-2">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#A48FFC]" />
                <span className="text-xs font-medium">{time}</span>
              </div>
              {location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#79D4FF]" />
                  <span className="text-xs font-medium text-gray-400">{location}</span>
                </div>
              )}
            </div>
            {participants && participants.length > 0 && (
              <div className="flex items-center mt-2">
                <div className="flex -space-x-2 mr-2">
                  {participants.map((initial, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center" style={{ borderColor: 'var(--bg-primary)' }}>
                      <span className="text-[9px] font-bold text-white uppercase">{initial}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* TYPE: SHOPPING LIST */}
        {type === 'shopping' && items && (
          <div className="mt-2 space-y-1.5">
            {items.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-400">
                <div className="w-4 h-4 rounded border flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors" style={{ borderColor: 'var(--text-secondary)' }}>
                  {/* Checkbox Placeholder */}
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-[10px] text-gray-400 pl-6">+ อีก {items.length - 3} รายการ</p>
            )}
          </div>
        )}

        {/* TYPE: EXPENSE */}
        {type === 'expense' && (
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-bold text-red-400">-{amount}</span>
            <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>{tag}</span>
          </div>
        )}

        {/* TYPE: HABIT */}
        {type === 'habit' && (
          <div className="mt-1 flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1.5">
              <Repeat size={14} className="text-[#4ADE80]" />
              <span className="text-xs font-medium">{recurrence}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#A48FFC]" />
              <span className="text-xs font-medium">{time}</span>
            </div>
          </div>
        )}

        {/* TYPE: TODO */}
        {type === 'todo' && (
          <div className="mt-1 flex items-center gap-1.5 text-gray-400">
            <div className={`w-4 h-4 rounded border flex items-center justify-center ${completed ? 'bg-[#A48FFC] border-[#A48FFC]' : ''}`} style={{ borderColor: completed ? '#A48FFC' : 'var(--text-secondary)' }}>
              {completed && <Check size={10} className="text-white" />}
            </div>
            <span className="text-xs font-medium">ทำเครื่องหมายว่าเสร็จ</span>
          </div>
        )}

        {/* Minimal Tips Indicator */}
        {tips && (
          <div className="mt-3 flex items-center gap-1.5 opacity-70">
            <Lightbulb size={12} className="text-[#A48FFC]" />
            <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>มีคำแนะนำ</span>
          </div>
        )}

      </div>

      {/* Tag Positioned Top Right */}
      {type === 'expense' ? (
        <div className="p-2 rounded-full bg-red-500/10 text-red-400">
          <Coins size={18} />
        </div>
      ) : type === 'habit' ? (
        <div className="p-2 rounded-full bg-green-500/10 text-green-400">
          <Activity size={18} />
        </div>
      ) : type === 'todo' ? (
        <div className="p-2 rounded-full bg-gray-500/10 text-gray-400">
          <CheckSquare size={18} />
        </div>
      ) : (
        <span
          className="shrink-0 text-[10px] px-3 py-1 rounded-full font-medium border tracking-wide backdrop-blur-md"
          style={{
            backgroundColor: `${tagColor}20`,
            color: tagColor,
            borderColor: `${tagColor}30`,
            boxShadow: `0 0 10px ${tagColor}15`
          }}
        >
          {tag}
        </span>
      )}
    </div>
  </GlassCard>
);

const AICommandBar = ({ onClick }: { onClick?: () => void }) => (
  <GlassCard onClick={onClick} className="flex items-center p-1 pl-4 pr-2 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-black/5 transition-colors">
    <Sparkles className="text-[#A48FFC] w-5 h-5 mr-3 animate-pulse" />
    <span className="flex-1 text-sm font-medium py-3" style={{ color: 'var(--text-secondary)' }}>บอก VURENO ให้...</span>
    <button className="p-2 rounded-xl hover:bg-black/5 transition-colors" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)' }}>
      <Mic size={18} />
    </button>
  </GlassCard>
);

// --- COMPONENT: Event Detail Overlay ---
const EventDetailOverlay = ({ event, onClose }: { event: EventData, onClose: () => void }) => {
  return (
    <div className="absolute inset-0 z-[70] backdrop-blur-xl flex flex-col animate-in fade-in duration-200" style={{ backgroundColor: 'var(--bg-overlay)' }}>
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--glass-border)' }}>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5" style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)' }}>
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-black/5" style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)' }}>
            <Share2 size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-black/5" style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)' }}>
            <Edit2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        <div className="flex justify-start mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ backgroundColor: `${event.tagColor}20`, color: event.tagColor, borderColor: 'var(--glass-border)' }}
          >
            {event.tag}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>{event.title}</h1>

        <div className="grid gap-4 mb-8">
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#A48FFC]/20 flex items-center justify-center text-[#A48FFC]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">เวลา</p>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{event.time} {event.recurrence && `(${event.recurrence})`}</p>
            </div>
          </GlassCard>

          {event.location && (
            <GlassCard className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#79D4FF]/20 flex items-center justify-center text-[#79D4FF]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400">สถานที่</p>
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{event.location}</p>
              </div>
            </GlassCard>
          )}

          {event.type === 'expense' && event.amount && (
            <GlassCard className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                <Coins size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400">จำนวนเงิน</p>
                <p className="text-2xl font-bold text-red-400">-{event.amount}</p>
              </div>
            </GlassCard>
          )}
        </div>

        {/* --- AI Insight Modules --- */}
        <div className="grid gap-3 mb-8">
          {/* Travel AI */}
          {event.travelTime && (
            <div className="p-3.5 rounded-xl border flex gap-3 animate-in slide-in-from-bottom-2" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--glass-border)' }}>
              <div className="p-2 rounded-full h-fit bg-blue-500/10 text-blue-400">
                <Car size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold mb-0.5 text-blue-400">แนะนำเวลาเดินทาง</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.travelTime}</p>
              </div>
            </div>
          )}

          {/* Weather AI */}
          {event.weather && (
            <div className="p-3.5 rounded-xl border flex gap-3 animate-in slide-in-from-bottom-3" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--glass-border)' }}>
              <div className="p-2 rounded-full h-fit bg-yellow-500/10 text-yellow-400">
                <CloudSun size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold mb-0.5 text-yellow-400">สภาพอากาศ</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.weather}</p>
              </div>
            </div>
          )}

          {/* Preparation AI */}
          {event.prepList && event.prepList.length > 0 && (
            <div className="p-3.5 rounded-xl border flex flex-col gap-2 animate-in slide-in-from-bottom-4" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--glass-border)' }}>
              <div className="flex gap-3 items-center">
                <div className="p-2 rounded-full h-fit bg-purple-500/10 text-purple-400">
                  <ClipboardList size={18} />
                </div>
                <h4 className="text-sm font-bold text-purple-400">สิ่งที่ต้องเตรียม</h4>
              </div>
              <div className="pl-11 space-y-1.5">
                {event.prepList.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50"></div>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {event.type === 'shopping' && event.items && (
          <div className="mb-8">
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <ListTodo size={18} className="text-[#A48FFC]" />
              รายการ ({event.items.length})
            </h3>
            <div className="space-y-2">
              {event.items.map((item, i) => (
                <GlassCard key={i} className="p-4 flex items-center gap-3 hover:bg-black/5 cursor-pointer">
                  <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: 'var(--text-secondary)' }}></div>
                  <span style={{ color: 'var(--text-primary)' }}>{item}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* General AI Tips */}
        {event.tips && (
          <div className="mb-8 p-4 rounded-xl border flex gap-3" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--glass-border)' }}>
            <div className="p-2 rounded-full h-fit" style={{ backgroundColor: 'rgba(164, 143, 252, 0.1)', color: '#A48FFC' }}>
              <Lightbulb size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold mb-1" style={{ color: '#A48FFC' }}>AI Tips</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.tips}</p>
            </div>
          </div>
        )}

        {event.note && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">บันทึกช่วยจำ</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.note}</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t backdrop-blur-md" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--nav-bg)' }}>
        <button className="w-full py-4 bg-[#A48FFC] text-white rounded-xl font-bold text-lg hover:bg-[#9061F9] transition-colors flex items-center justify-center gap-2 shadow-lg">
          <CheckCircle size={20} />
          ทำเครื่องหมายว่าเสร็จ
        </button>
        <button className="w-full mt-3 py-3 text-red-400 font-medium text-sm hover:bg-red-500/10 rounded-xl transition-colors flex items-center justify-center gap-2">
          <Trash2 size={16} />
          ลบกิจกรรม
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT: AI Input Overlay ---
const AIInputOverlay = ({ onClose }: { onClose: () => void }) => {
  const [text, setText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeInput = (input: string) => {
    const lowerInput = input.toLowerCase();

    // 1. Travel / Trip
    if (lowerInput.includes("จอง") || lowerInput.includes("เที่ยว") || lowerInput.includes("โรงแรม")) {
      return {
        type: 'event', // Treat as event but with travel info
        title: "ทริปหัวหิน",
        location: "The Standard Hua Hin",
        time: "Check-in 14:00",
        date: "25-27 ธ.ค.",
        tag: "ท่องเที่ยว",
        tagColor: "#8B5CF6", // Purple
        participants: ['A', 'F'],
        // AI Insights Mock
        travelTime: "ควรออกจากบ้านเวลา 10:00 น. เพื่อเลี่ยงรถติดพระราม 2 (ใช้เวลาเดินทาง 3 ชม.)",
        weather: "แดดจ้า 32°C เหมาะกับการเล่นน้ำทะเล พกครีมกันแดดไปด้วยนะ",
        prepList: ["ชุดว่ายน้ำ", "ครีมกันแดด", "แว่นกันแดด", "Power Bank"],
        tips: "โรงแรมนี้มี Beach Club สวยมาก อย่าลืมเตรียมชุดสวยๆ ไปถ่ายรูปช่วง Sunset นะครับ"
      };
    }

    // 2. Expense
    if (lowerInput.includes("บาท") || lowerInput.includes("จ่าย")) {
      const amountMatch = input.match(/\d+/);
      const amount = amountMatch ? amountMatch[0] : "0";
      return {
        type: 'expense',
        title: lowerInput.replace(amount, "").replace("บาท", "").replace("จ่ายค่า", "").trim() || "รายการใช้จ่าย",
        amount: `฿${amount}`,
        tag: "ค่าใช้จ่าย",
        tagColor: "#EF4444",
        date: "วันนี้",
        note: "จ่ายด้วยบัตรเครดิต",
        tips: "การบันทึกรายรับรายจ่ายช่วยให้คุณเห็นภาพรวมการเงินได้ชัดเจนขึ้น"
      };
    }

    // 3. Shopping
    if (lowerInput.includes("ซื้อ")) {
      let items = ["รายการ 1", "รายการ 2"];
      if (lowerInput.includes("ไข่")) items = ["ไข่ไก่", "นม", "ขนมปัง"];
      return {
        type: 'shopping',
        title: "รายการซื้อของ",
        items: items,
        location: "7-Eleven",
        tag: "ช้อปปิ้ง",
        tagColor: "#F97316",
        date: "วันนี้",
        tips: "ลองตรวจสอบวันหมดอายุของสินค้าก่อนซื้อด้วยนะครับ"
      };
    }

    // 4. Habit
    if (lowerInput.includes("กินยา") || lowerInput.includes("วิตามิน")) {
      return {
        type: 'habit',
        title: "ทานยา/วิตามิน",
        time: "08:00",
        recurrence: "ทุกวัน",
        tag: "สุขภาพ",
        tagColor: "#4ADE80",
        date: "วันนี้",
        tips: "ดื่มน้ำตามเยอะๆ เพื่อช่วยการดูดซึมวิตามิน"
      };
    }

    // 5. Default Meeting
    return {
      type: 'event',
      title: "ประชุมทีม Design",
      time: "10:00",
      location: "ตึก G-tower",
      date: "พรุ่งนี้",
      tag: "งาน",
      tagColor: "#79D4FF",
      prepList: ["Slide นำเสนอ", "สรุป Report เดือนก่อน", "ตัวอย่าง Mockup"],
      tips: "เตรียมเอกสารการประชุมล่วงหน้า 15 นาทีจะช่วยลดความตื่นเต้นได้"
    };
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (text.length > 5) {
        setIsThinking(true);
        setResult(null);
        setTimeout(() => {
          const analysis = analyzeInput(text);
          setIsThinking(false);
          setResult(analysis);
        }, 1000);
      } else {
        setResult(null);
        setIsThinking(false);
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const setDemoText = (demo: string) => setText(demo);

  return (
    <div className="absolute inset-0 z-[60] backdrop-blur-xl flex flex-col p-6 animate-in fade-in duration-200" style={{ backgroundColor: 'var(--bg-overlay)' }}>
      <div className="flex justify-between items-center mb-6">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5" style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)' }}>
          <X size={24} />
        </button>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border bg-[#A48FFC]/20 border-[#A48FFC]/30">
          <Sparkles size={14} className="text-[#A48FFC]" />
          <span className="text-xs font-bold text-[#A48FFC] uppercase tracking-wider">VURENO AI</span>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center animate-in fade-in slide-in-from-bottom-4" style={{ color: 'var(--text-primary)' }}>
          ให้ช่วยอะไรดีครับ?
        </h2>

        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='เช่น "จองโรงแรมที่หัวหิน...", "ประชุมทีม..."'
            className="w-full h-32 bg-transparent text-xl font-medium placeholder-gray-500 focus:outline-none resize-none text-center"
            style={{ color: 'var(--text-primary)' }}
            autoFocus
          />
        </div>

        {!text && (
          <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in delay-200">
            {["จองโรงแรมที่หัวหิน 25-27 นี้", "พรุ่งนี้ประชุมทีม 10 โมง ที่ G-Tower", "แวะ 7-11 ซื้อ ไข่ นม ขนมปัง", "จ่ายค่ากาแฟ 120 บาท"].map((demo, i) => (
              <button key={i} onClick={() => setDemoText(demo)} className="px-4 py-2 rounded-full border text-xs hover:bg-white/10 transition-colors" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-secondary)' }}>
                {i === 0 ? "🏖️ เที่ยว" : i === 1 ? "📅 นัดหมาย" : i === 2 ? "🛒 ซื้อของ" : "💰 รายจ่าย"}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1">
          {isThinking && (
            <div className="flex flex-col items-center justify-center gap-3 text-[#A48FFC] animate-pulse py-10">
              <Sparkles size={32} />
              <span className="text-sm font-medium">กำลังวิเคราะห์...</span>
            </div>
          )}

          {result && !isThinking && (
            <div className="animate-in slide-in-from-bottom-8 duration-700 fade-in zoom-in-95">
              <div className="bg-gradient-to-br from-[#7F56D9]/20 to-[#A48FFC]/20 border border-[#A48FFC]/50 rounded-2xl p-5 relative overflow-hidden shadow-lg">
                <div className="space-y-4 relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full shadow-[0_0_8px]" style={{ backgroundColor: result.tagColor, boxShadow: `0 0 8px ${result.tagColor}` }}></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: result.tagColor }}>{result.tag}</p>
                      <p className="text-xl font-bold text-white leading-tight">{result.title}</p>
                    </div>
                  </div>

                  {/* --- DYNAMIC PREVIEW CONTENT --- */}
                  {/* Travel Info in Preview */}
                  {(result.travelTime || result.weather) && (
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      {result.travelTime && (
                        <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-blue-300">
                            <Car size={14} /> <span className="text-[10px] font-bold">TRAVEL</span>
                          </div>
                          <p className="text-[10px] text-white/80 line-clamp-2">{result.travelTime}</p>
                        </div>
                      )}
                      {result.weather && (
                        <div className="bg-white/10 p-2 rounded-lg border border-white/10 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-yellow-300">
                            <CloudSun size={14} /> <span className="text-[10px] font-bold">WEATHER</span>
                          </div>
                          <p className="text-[10px] text-white/80 line-clamp-2">{result.weather}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Case: Shopping */}
                  {result.type === 'shopping' && (
                    <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                      <p className="text-[10px] text-gray-300 mb-2 uppercase tracking-wide flex items-center gap-1">
                        <ListTodo size={10} /> รายการ ({result.items.length})
                      </p>
                      <div className="space-y-2">
                        {result.items?.map((item: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center">
                              {/* Check placeholder */}
                            </div>
                            <span className="text-sm text-white">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Case: Expense */}
                  {result.type === 'expense' && (
                    <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white font-medium">
                          <Coins size={16} className="text-red-300" />
                          <span>จำนวนเงิน</span>
                        </div>
                        <span className="text-xl font-bold text-white">{result.amount}</span>
                      </div>
                    </div>
                  )}

                  {/* Case: General Event / Habit */}
                  {(result.type === 'event' || result.type === 'habit') && (
                    <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Clock size={16} />
                        <span>{result.time}</span>
                      </div>
                      {result.location && (
                        <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                          <MapPin size={14} />
                          <span>{result.location}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Tips Section in Preview */}
                  {result.tips && (
                    <div className="mt-2 p-3 rounded-xl bg-[#A48FFC]/10 border border-[#A48FFC]/20 flex gap-3">
                      <div className="p-1.5 rounded-full bg-[#A48FFC]/20 h-fit text-[#A48FFC]">
                        <Lightbulb size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#A48FFC] block mb-0.5">AI Tip</span>
                        <p className="text-xs text-white/80 leading-snug">{result.tips}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={onClose} className="flex-1 py-3.5 bg-gradient-to-r from-[#7F56D9] to-[#A48FFC] rounded-xl text-white text-base font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
                  <CheckCircle size={20} />
                  บันทึก
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mic Button at bottom for Voice Mode */}
      {!text && !result && !isThinking && (
        <div className="flex justify-center pb-10 mt-auto animate-in fade-in duration-500">
          <button
            onClick={() => setDemoText("พรุ่งนี้มีประชุม 10 โมงที่ตึก G-tower")}
            className="relative group p-6 rounded-full bg-[#A48FFC]/10 border border-[#A48FFC]/30 hover:bg-[#A48FFC]/20 transition-all active:scale-95"
          >
            <div className="absolute inset-0 bg-[#A48FFC] rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Mic size={32} className="text-white group-hover:text-[#A48FFC] transition-colors relative z-10" />
          </button>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS (NEW for Calendar) ---

const FilterChips = ({ selected, onSelect }: { selected: string, onSelect: (f: string) => void }) => (
  <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2 px-1 w-full mask-linear-fade shrink-0">
    {['ทั้งหมด', 'งาน', 'ส่วนตัว', 'สุขภาพ', 'เที่ยว', 'ช้อปปิ้ง', 'การเรียน', 'ครอบครัว', 'การเงิน'].map((f, i) => (
      <button
        key={i}
        onClick={() => onSelect(f)}
        className={`whitespace-nowrap shrink-0 px-4 py-1.5 rounded-full text-xs border transition-all duration-200 ${f === selected
          ? 'bg-[#A48FFC] text-white border-[#A48FFC] font-bold shadow-lg shadow-purple-500/20'
          : 'bg-transparent text-gray-500 font-medium hover:text-white border-white/10 hover:bg-white/5'
          }`}
        style={{
          color: f === selected ? 'white' : 'var(--text-secondary)',
          borderColor: f === selected ? '#A48FFC' : 'var(--glass-border)',
          backgroundColor: f === selected ? '#A48FFC' : 'transparent'
        }}
      >
        {f}
      </button>
    ))}
  </div>
);

const DayPlanningWidget = ({ count, busyLevel }: { count: number, busyLevel: 'low' | 'medium' | 'high' }) => (
  <div className="p-4 mb-4 rounded-xl border relative overflow-hidden group shrink-0" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--glass-border)' }}>
    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
      <BarChart3 size={40} className="text-[#A48FFC]" />
    </div>

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs font-medium opacity-70 mb-1" style={{ color: 'var(--text-secondary)' }}>ภาพรวมวันนี้</p>
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{count > 0 ? `${count} กิจกรรม` : 'ว่างตลอดวัน'}</h3>
        </div>
        {count > 0 && (
          <div className="px-2 py-1 rounded-lg bg-[#A48FFC]/10 text-[#A48FFC] text-xs font-bold">
            {busyLevel === 'high' ? 'งานแน่น' : busyLevel === 'medium' ? 'ปานกลาง' : 'สบายๆ'}
          </div>
        )}
      </div>

      {/* Progress Bar Mock */}
      <div className="h-1.5 w-full bg-gray-700/30 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-gradient-to-r from-[#7F56D9] to-[#A48FFC] rounded-full" style={{ width: busyLevel === 'high' ? '85%' : busyLevel === 'medium' ? '50%' : '20%' }}></div>
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>08:00</span>
        <div className="flex items-center gap-1">
          <Hourglass size={10} className="text-[#A48FFC]" />
          <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>เหลือเวลาว่าง ~4 ชม.</span>
        </div>
        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>20:00</span>
      </div>
    </div>
  </div>
);

// --- SCREENS ---

const LoginScreen = ({ onLogin, onSwitch }: { onLogin: () => void, onSwitch: () => void }) => (
  <div className="h-full flex flex-col p-8 justify-center relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[30%] bg-[#A48FFC] rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute top-[40%] -right-[20%] w-[60%] h-[40%] bg-[#79D4FF] rounded-full blur-[120px] opacity-10"></div>
    </div>

    <div className="z-10 w-full max-w-sm mx-auto">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>ยินดีต้อนรับกลับ</h1>
      <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>กรอกข้อมูลเพื่อเข้าถึงผู้ช่วยของคุณ</p>

      <GlowInput icon={Mail} placeholder="อีเมล" type="email" />
      <GlowInput icon={Lock} placeholder="รหัสผ่าน" type="password" />

      <div className="flex justify-end mb-6">
        <button className="text-[#A48FFC] text-sm hover:underline">ลืมรหัสผ่าน?</button>
      </div>

      <PrimaryButton onClick={onLogin} className="mb-8">เข้าสู่ระบบ</PrimaryButton>

      <div className="flex items-center gap-4 mb-8">
        <div className="h-[1px] flex-1" style={{ backgroundColor: 'var(--glass-border)' }}></div>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>หรือดำเนินการต่อด้วย</span>
        <div className="h-[1px] flex-1" style={{ backgroundColor: 'var(--glass-border)' }}></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <button className="flex items-center justify-center py-3 border rounded-2xl transition-colors hover:bg-black/5" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)', backgroundColor: 'var(--glass-bg)' }}>
          <span className="font-medium">Google</span>
        </button>
        <button className="flex items-center justify-center py-3 border rounded-2xl transition-colors hover:bg-black/5" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)', backgroundColor: 'var(--glass-bg)' }}>
          <span className="font-medium">Apple</span>
        </button>
      </div>

      <div className="text-center">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>ยังไม่มีบัญชีใช่ไหม? </span>
        <button onClick={onSwitch} className="text-[#A48FFC] font-semibold text-sm hover:underline">ลงทะเบียน</button>
      </div>
    </div>
  </div>
);

const SignupScreen = ({ onSignup, onSwitch }: { onSignup: () => void, onSwitch: () => void }) => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('');

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="h-full flex flex-col p-8 justify-center relative overflow-hidden">
      {/* Background blobs - keep existing */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[30%] bg-[#A48FFC] rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="z-10 w-full max-w-sm mx-auto flex-1 flex flex-col justify-center">
        {/* Header Text */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 transition-all" style={{ color: 'var(--text-primary)' }}>
            {step === 1 ? 'สร้างบัญชีใหม่' : step === 2 ? 'ข้อมูลส่วนตัว' : 'ตั้งรหัสผ่าน'}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {step === 1 ? 'เริ่มจัดระเบียบชีวิตของคุณตั้งแต่วันนี้' : step === 2 ? 'เพื่อให้เรารู้จักคุณมากขึ้น' : 'ขั้นตอนสุดท้ายแล้ว!'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-[#A48FFC]' : 'w-2 bg-gray-600/30'}`}></div>
          ))}
        </div>

        {/* Steps */}
        <div className="min-h-[300px]">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
              <GlowInput icon={User} placeholder="ชื่อ-นามสกุล" />
              <GlowInput icon={Mail} placeholder="อีเมล" type="email" />
              <PrimaryButton onClick={nextStep} className="mt-4">ถัดไป</PrimaryButton>

              {/* Social Login only on Step 1 */}
              <div className="flex items-center gap-4 my-8">
                <div className="h-[1px] flex-1" style={{ backgroundColor: 'var(--glass-border)' }}></div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>หรือ</span>
                <div className="h-[1px] flex-1" style={{ backgroundColor: 'var(--glass-border)' }}></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center py-3 border rounded-2xl transition-colors hover:bg-black/5" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)', backgroundColor: 'var(--glass-bg)' }}>
                  <span className="font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center py-3 border rounded-2xl transition-colors hover:bg-black/5" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)', backgroundColor: 'var(--glass-bg)' }}>
                  <span className="font-medium">Apple</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
              <GlowInput icon={Smartphone} placeholder="เบอร์โทรศัพท์" type="tel" />

              {/* Birthday - using GlowInput structure but modified for date */}
              <div className="relative group mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar size={20} />
                </div>
                <input
                  type="date"
                  className="w-full border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#A48FFC]/50 focus:ring-1 focus:ring-[#A48FFC]/50 transition-all placeholder-gray-500"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-primary)',
                    colorScheme: 'dark'
                  }}
                />
              </div>

              {/* Gender */}
              <div className="mb-6">
                <label className="text-xs ml-1 mb-2 block" style={{ color: 'var(--text-secondary)' }}>เพศ</label>
                <div className="grid grid-cols-3 gap-3">
                  {['ชาย', 'หญิง', 'อื่นๆ'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all ${gender === g ? 'bg-[#A48FFC] text-white border-[#A48FFC]' : 'hover:bg-black/5'}`}
                      style={{
                        borderColor: gender === g ? '#A48FFC' : 'var(--glass-border)',
                        color: gender === g ? 'white' : 'var(--text-primary)',
                        backgroundColor: gender === g ? '#A48FFC' : 'var(--glass-bg)'
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={prevStep} className="px-6 py-4 rounded-2xl border font-medium hover:bg-black/5 transition-colors" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
                  ย้อนกลับ
                </button>
                <PrimaryButton onClick={nextStep} className="flex-1">ถัดไป</PrimaryButton>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
              <GlowInput icon={Lock} placeholder="รหัสผ่าน" type="password" />
              <GlowInput icon={Lock} placeholder="ยืนยันรหัสผ่าน" type="password" />

              <div className="flex gap-3 mt-8">
                <button onClick={prevStep} className="px-6 py-4 rounded-2xl border font-medium hover:bg-black/5 transition-colors" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
                  ย้อนกลับ
                </button>
                <PrimaryButton onClick={onSignup} className="flex-1">ลงทะเบียน</PrimaryButton>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>มีบัญชีอยู่แล้ว? </span>
          <button onClick={onSwitch} className="text-[#A48FFC] font-semibold text-sm hover:underline">เข้าสู่ระบบ</button>
        </div>
      </div>
    </div>
  );
}

const CalendarWeekScreen = ({ onSwitchMode, onSelectEvent }: { onSwitchMode: () => void, onSelectEvent: (event: EventData) => void }) => {
  const [selectedDate, setSelectedDate] = useState(13);
  const [activeFilter, setActiveFilter] = useState('ทั้งหมด');
  const days = [
    { d: 'อา', n: 7 }, { d: 'จ', n: 8 }, { d: 'อ', n: 9 }, { d: 'พ', n: 10 },
    { d: 'พฤ', n: 11 }, { d: 'ศ', n: 12 }, { d: 'ส', n: 13 }
  ];

  // Mock Events for different days
  const getEventsForDate = (date: number) => {
    if (date === 13) return [
      { id: 'w1', type: 'event' as CardType, title: "ประชุมทีม Design", time: "09:00", location: "Zoom", participants: ['M', 'J'], tag: "งาน", tagColor: "#79D4FF", tips: "เตรียมไฟล์สรุป Sprint ที่แล้วไว้ด้วยนะ" },
      { id: 'w2', type: 'event' as CardType, title: "ทานข้าวกับลูกค้า", time: "12:00", location: "Siam Paragon", tag: "ส่วนตัว", tagColor: "#F97316" },
      { id: 'w3', type: 'event' as CardType, title: "ส่งรายงานสรุป", time: "15:30", tag: "งาน", tagColor: "#A48FFC" },
      { id: 't1', type: 'todo' as CardType, title: "ตอบอีเมลลูกค้า K.Som", time: "ภายในวัน", tag: "งาน", tagColor: "#79D4FF" }
    ];
    if (date === 7) return [
      { id: 'w4', type: 'shopping' as CardType, title: "ซื้อของเข้าบ้าน", time: "10:00", items: ['นม', 'ไข่', 'ผัก'], tag: "ช้อปปิ้ง", tagColor: "#F97316", location: "Lotus's", tips: "วันนี้ไข่ลดราคาพิเศษนะ!" }
    ];
    if (date === 14) return [
      { id: 'w5', type: 'habit' as CardType, title: "ออกกำลังกาย", time: "07:00", location: "สวนลุมพินี", tag: "สุขภาพ", tagColor: "#4ADE80", recurrence: "ทุกวัน" }
    ];
    return [];
  };

  const currentEvents = getEventsForDate(selectedDate);

  // Filter Logic
  const filteredEvents = currentEvents.filter(e => activeFilter === 'ทั้งหมด' || e.tag === activeFilter);
  const busyLevel = filteredEvents.length > 3 ? 'high' : filteredEvents.length > 1 ? 'medium' : 'low';

  return (
    <div className="pb-24 px-6 pt-14 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>ธันวาคม 2025</h1>
        <div className="flex gap-2">
          <button onClick={onSwitchMode} className="p-2 rounded-xl border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
            <Calendar size={20} />
          </button>
          <button className="p-2 bg-[#A48FFC] rounded-xl text-white shadow-lg shadow-purple-500/30">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="flex justify-between mb-5 shrink-0">
        {days.map((day, i) => {
          const isActive = day.n === selectedDate;
          return (
            <div
              key={i}
              onClick={() => setSelectedDate(day.n)}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
            >
              <span className="text-xs font-medium" style={{ color: isActive ? '#A48FFC' : 'var(--text-secondary)' }}>{day.d}</span>
              <div className={`w-10 h-10 flex flex-col items-center justify-center rounded-full transition-all ${isActive ? 'bg-[#A48FFC] text-white shadow-lg shadow-purple-500/40' : 'border'}`} style={{ borderColor: isActive ? 'transparent' : 'var(--glass-border)', color: isActive ? 'white' : 'var(--text-primary)' }}>
                <span className="text-sm font-semibold">{day.n}</span>
              </div>
              {/* Dot Indicator */}
              {(day.n === 13 || day.n === 7 || day.n === 14) && (
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isActive ? 'bg-white' : 'bg-[#A48FFC]'}`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Planning Section */}
      <DayPlanningWidget count={filteredEvents.length} busyLevel={busyLevel} />

      <FilterChips selected={activeFilter} onSelect={setActiveFilter} />

      <div className="mb-2 shrink-0 flex justify-between items-end">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedDate} ธันวาคม • {selectedDate === 13 ? 'วันเสาร์' : 'วันทั่วไป'}</p>
      </div>

      <div className="space-y-3 overflow-y-auto pb-4 no-scrollbar grow">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event: any) => (
            <EventCard
              key={event.id}
              {...event}
              onClick={() => onSelectEvent(event)}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
            <Sparkles size={40} className="mb-2" />
            <p className="text-sm">ไม่มีกิจกรรมในหมวดนี้</p>
            <button className="mt-2 text-xs text-[#A48FFC] underline">เพิ่มกิจกรรม</button>
          </div>
        )}
      </div>
    </div>
  );
};

const CalendarMonthScreen = ({ onSwitchMode, onSelectEvent }: { onSwitchMode: () => void, onSelectEvent: (event: EventData) => void }) => {
  const [selectedDate, setSelectedDate] = useState(13);
  const [activeFilter, setActiveFilter] = useState('ทั้งหมด');
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Mock events
  const getEventsForDate = (date: number) => {
    if (date === 13) return [
      { id: 'm1', type: 'event' as CardType, title: "ประชุมทีม Design", time: "09:00", location: "Zoom", tag: "งาน", tagColor: "#79D4FF", tips: "อย่าลืมอัดวิดีโอการประชุมไว้ดูย้อนหลังนะ" },
      { id: 'm2', type: 'event' as CardType, title: "ทานข้าวกับลูกค้า", time: "12:00", location: "Siam Paragon", tag: "ส่วนตัว", tagColor: "#F97316" }
    ];
    if (date === 25) return [
      {
        id: 'm3', type: 'event' as CardType, title: "ทริปหัวหิน", time: "10:00", location: "Hua Hin", tag: "เที่ยว", tagColor: "#8B5CF6",
        travelTime: "ควรออก 07:00 น.", weather: "แดดจ้า 32°C", prepList: ["ชุดว่ายน้ำ", "แว่นกันแดด"]
      }
    ];
    return [];
  };

  const currentEvents = getEventsForDate(selectedDate);
  const filteredEvents = currentEvents.filter(e => activeFilter === 'ทั้งหมด' || e.tag === activeFilter);

  return (
    <div className="pb-24 px-6 pt-14 h-full flex flex-col overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>ธันวาคม 2025</h1>
        <div className="flex gap-2">
          <button onClick={onSwitchMode} className="p-2 rounded-xl border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
            <MoreHorizontal size={20} />
          </button>
          <button className="p-2 bg-[#A48FFC] rounded-xl text-white shadow-lg shadow-purple-500/30">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <FilterChips selected={activeFilter} onSelect={setActiveFilter} />

      <div className="grid grid-cols-7 gap-2 text-center mb-2 shrink-0">
        {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(d => (
          <span key={d} className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-8 shrink-0">
        <div></div>
        {days.map(d => {
          const isSelected = d === selectedDate;
          const hasDot = [7, 13, 25].includes(d);
          const dotColor = d === 25 ? 'bg-purple-400' : 'bg-green-400';

          return (
            <div
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all ${isSelected ? 'bg-[#A48FFC] text-white shadow-lg shadow-purple-500/40' : 'hover:bg-black/5'}`} style={{ color: isSelected ? 'white' : 'var(--text-primary)' }}>
                {d}
              </div>
              {hasDot && (
                <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : dotColor}`}></div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mb-3 border-t pt-4" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="flex justify-between items-end mb-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedDate} ธันวาคม • {selectedDate === 25 ? 'วันคริสต์มาส' : 'วันทั่วไป'}</p>
          <span className="text-xs font-medium" style={{ color: '#A48FFC' }}>{filteredEvents.length} กิจกรรม</span>
        </div>

        <div className="space-y-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onClick={() => onSelectEvent(event)}
              />
            ))
          ) : (
            <div className="py-8 flex flex-col items-center justify-center text-gray-500 opacity-60">
              <p className="text-sm">ไม่มีกิจกรรมในหมวดนี้</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const NotificationsScreen = ({ onSelectEvent }: { onSelectEvent: (event: EventData) => void }) => {
  // Mock Notifications Data
  const newNotifications = [
    {
      id: 'n1',
      type: 'event' as CardType,
      title: 'เตือนความจำ: ประชุมทีม Design',
      time: 'ใน 30 นาที',
      desc: 'อย่าลืมเตรียมไฟล์ Present',
      icon: Calendar,
      iconColor: 'text-[#79D4FF]',
      unread: true,
      data: {
        id: 'n1-e',
        type: 'event' as CardType,
        title: "ประชุมทีม Design",
        time: "10:00",
        location: "Zoom",
        tag: "งาน",
        tagColor: "#79D4FF",
        tips: "การประชุมครั้งก่อนคุยค้างเรื่อง Color Palette ไว้ ลองเปิดดูโน้ตเก่าเตรียมไว้ด้วยนะครับ"
      }
    },
    {
      id: 'n2',
      type: 'expense' as CardType,
      title: 'ถึงกำหนดชำระ: ค่าบัตรเครดิต',
      time: 'วันนี้',
      desc: 'ยอด 12,500 บาท',
      icon: CreditCard,
      iconColor: 'text-red-400',
      unread: true,
      data: {
        id: 'n2-e',
        type: 'expense' as CardType,
        title: "ค่าบัตรเครดิต",
        time: "วันนี้",
        amount: "12,500",
        tag: "บิล",
        tagColor: "#EF4444",
        tips: "ชำระก่อน 18:00 น. เพื่อหลีกเลี่ยงค่าปรับล่าช้า และตรวจสอบแต้มสะสมด้วยนะครับ"
      }
    }
  ];

  const oldNotifications = [
    {
      id: 'n3',
      type: 'habit' as CardType,
      title: 'สำเร็จ: ดื่มน้ำครบ 8 แก้ว',
      time: '2 ชั่วโมงที่แล้ว',
      desc: 'ทำได้ดีมาก! รักษาระดับไว้นะ',
      icon: CheckCircle,
      iconColor: 'text-green-400',
      unread: false,
      data: {
        id: 'n3-e',
        type: 'habit' as CardType,
        title: "ดื่มน้ำ",
        time: "ตลอดวัน",
        recurrence: "ทุกวัน",
        tag: "สุขภาพ",
        tagColor: "#4ADE80",
        tips: "การดื่มน้ำสม่ำเสมอช่วยให้สมองแล่นขึ้น 20% ลองตั้งขวดน้ำไว้ข้างโต๊ะทำงานดูสิครับ"
      }
    },
    {
      id: 'n4',
      type: 'event' as CardType,
      title: 'ระบบ: อัปเดตแพทช์ใหม่',
      time: 'เมื่อวาน',
      desc: 'VURENO v1.2.0 พร้อมใช้งานแล้ว',
      icon: Info,
      iconColor: 'text-gray-400',
      unread: false,
      data: null
    }
  ];

  return (
    <div className="pb-32 px-6 pt-14 h-full overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>การแจ้งเตือน</h1>
        <button className="text-xs font-medium text-[#A48FFC]">ล้างทั้งหมด</button>
      </div>

      <h2 className="text-xs font-semibold mb-3 tracking-wider uppercase" style={{ color: 'var(--text-secondary)' }}>ใหม่</h2>

      {/* AI Insight Card (Keep as special highlight) */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A48FFC]/20 to-[#79D4FF]/20 blur-xl rounded-2xl"></div>
        <GlassCard className="relative p-5 border-[#A48FFC]/30">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#A48FFC]/20 flex items-center justify-center shrink-0">
              <Sparkles className="text-[#A48FFC]" size={20} />
            </div>
            <div>
              <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>ข้อเสนอแนะจาก AI</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                ดูเหมือนคุณจะมีเวลาว่างช่วงบ่าย 2 สนใจเพิ่ม "อ่านหนังสือ" เข้าไปไหม?
              </p>
            </div>
          </div>
          <div className="flex gap-4 pl-14">
            <button className="text-[#79D4FF] text-sm font-semibold hover:text-white transition-colors">เพิ่มเลย</button>
            <button className="text-sm font-medium hover:text-gray-300 transition-colors" style={{ color: 'var(--text-secondary)' }}>ปฏิเสธ</button>
          </div>
        </GlassCard>
      </div>

      <div className="space-y-3 mb-6">
        {newNotifications.map((notif) => (
          <GlassCard
            key={notif.id}
            onClick={() => notif.data && onSelectEvent(notif.data)}
            className="p-4 flex items-start gap-4 hover:bg-black/5 cursor-pointer relative overflow-hidden group"
          >
            {notif.unread && (
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#A48FFC]"></div>
            )}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'event' ? 'bg-[#79D4FF]/10' : 'bg-red-400/10'}`}>
              <notif.icon size={20} className={notif.iconColor} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{notif.title}</p>
              <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>{notif.desc}</p>
              <p className="text-[10px] opacity-60" style={{ color: 'var(--text-secondary)' }}>{notif.time}</p>

              {/* TIP INDICATOR: This is where the tip shows up in the list */}
              {notif.data?.tips && (
                <div className="mt-2 flex items-center gap-1.5 p-1.5 rounded-lg bg-[#A48FFC]/5 border border-[#A48FFC]/10">
                  <Lightbulb size={12} className="text-[#A48FFC] shrink-0" />
                  <span className="text-[10px] text-[#A48FFC] font-medium">มีคำแนะนำเพิ่มเติม</span>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      <h2 className="text-xs font-semibold mb-3 tracking-wider uppercase" style={{ color: 'var(--text-secondary)' }}>ก่อนหน้านี้</h2>

      <div className="space-y-3">
        {oldNotifications.map((notif) => (
          <GlassCard
            key={notif.id}
            onClick={() => notif.data && onSelectEvent(notif.data)}
            className="p-4 flex items-start gap-4 hover:bg-black/5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--input-bg)' }}>
              <notif.icon size={18} className={notif.iconColor} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{notif.title}</p>
              <p className="text-xs text-gray-500 mb-1">{notif.desc}</p>
              <p className="text-[10px] text-gray-500 opacity-60">{notif.time}</p>

              {/* TIP INDICATOR for old items too */}
              {notif.data?.tips && (
                <div className="mt-2 flex items-center gap-1.5 p-1.5 rounded-lg bg-[#A48FFC]/5 border border-[#A48FFC]/10">
                  <Lightbulb size={12} className="text-[#A48FFC] shrink-0" />
                  <span className="text-[10px] text-[#A48FFC] font-medium">มีคำแนะนำเพิ่มเติม</span>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

const ProfileScreen = ({ onToSub, onNavigate }: { onToSub: () => void, onNavigate: (s: Screen) => void }) => (
  <div className="pb-32 px-6 pt-14 h-full overflow-y-auto no-scrollbar">
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A48FFC] to-[#79D4FF] rounded-full blur opacity-50"></div>
        <div className="relative w-full h-full rounded-full border-2 flex items-center justify-center overflow-hidden" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--input-bg)' }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <User size={40} className="text-white" />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Alex Doe</h1>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>alex.doe@example.com</p>

      <div className="flex gap-8 mt-6">
        <div className="text-center">
          <span className="block text-xl font-bold" style={{ color: 'var(--text-primary)' }}>12</span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>งานวันนี้</span>
        </div>
        <div className="w-[1px] h-8" style={{ backgroundColor: 'var(--glass-border)' }}></div>
        <div className="text-center">
          <span className="block text-xl font-bold" style={{ color: 'var(--text-primary)' }}>85%</span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>เสร็จสิ้น</span>
        </div>
      </div>
    </div>

    <div onClick={onToSub} className="cursor-pointer mb-8 relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#7F56D9] to-[#A48FFC] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
      <GlassCard className="relative p-0 overflow-hidden bg-gradient-to-r from-[#7F56D9]/90 to-[#A48FFC]/90 border-none">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Crown className="text-white" size={20} />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">อัปเกรดเป็น Pro</p>
              <p className="text-white/80 text-xs">ปลดล็อกฟีเจอร์ AI ทั้งหมด</p>
            </div>
          </div>
          <ChevronRight className="text-white" size={20} />
        </div>
      </GlassCard>
    </div>

    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold mb-3 ml-1" style={{ color: 'var(--text-secondary)' }}>บัญชี</h3>
        <div className="space-y-3">
          <GlassCard onClick={() => onNavigate('edit-profile')} className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                <User size={18} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>แก้ไขข้อมูลส่วนตัว</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </GlassCard>
          <GlassCard className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                <CreditCard size={18} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>การชำระเงิน</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </GlassCard>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold mb-3 ml-1" style={{ color: 'var(--text-secondary)' }}>การตั้งค่า</h3>
        <div className="space-y-3">
          <GlassCard onClick={() => onNavigate('settings-notifications')} className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                <Bell size={18} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>การแจ้งเตือน</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </GlassCard>

          <GlassCard onClick={() => onNavigate('settings-general')} className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                <Settings size={18} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>ตั้งค่าทั่วไป</span>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
);

// --- NEW SCREEN: Edit Profile Screen ---
const EditProfileScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center mb-8 shrink-0">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 mr-4 border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>แก้ไขข้อมูลส่วนตัว</h1>
      </div>

      {/* Avatar Edit */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 overflow-hidden" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--input-bg)' }}>
            <div className="w-full h-full flex items-center justify-center bg-black/20">
              <User size={64} className="text-white" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 rounded-full shadow-lg" style={{ backgroundColor: '#A48FFC', color: 'white' }}>
            <Camera size={16} />
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-secondary)' }}>ชื่อ - นามสกุล</label>
          <GlowInput icon={User} placeholder="Alex Doe" defaultValue="Alex Doe" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-secondary)' }}>อีเมล</label>
          <GlowInput icon={Mail} placeholder="alex.doe@example.com" type="email" defaultValue="alex.doe@example.com" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-secondary)' }}>เบอร์โทรศัพท์</label>
          <GlowInput icon={Smartphone} placeholder="+66 81 234 5678" type="tel" defaultValue="+66 81 234 5678" />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onBack}>บันทึกการเปลี่ยนแปลง</PrimaryButton>
      </div>
    </div>
  );
};

// --- Subscription Screen (Enhanced) ---
const SubscriptionScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar relative z-10">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#A48FFC] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

    <div className="flex items-center mb-8 shrink-0 relative z-20">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 mr-4 border transition-colors" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>VURENO Pro</h1>
    </div>

    <div className="space-y-6 relative z-20">
      {/* Free Plan */}
      <GlassCard className="p-6 relative overflow-hidden transition-transform hover:scale-[1.01]">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Free</h2>
          <p className="text-sm mb-6 opacity-70" style={{ color: 'var(--text-secondary)' }}>สำหรับเริ่มต้นจัดระเบียบชีวิต</p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="p-1 rounded-full bg-green-500/10 text-green-400"><Check size={12} strokeWidth={3} /></div>
              สร้างกิจกรรมได้ไม่จำกัด
            </li>
            <li className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="p-1 rounded-full bg-green-500/10 text-green-400"><Check size={12} strokeWidth={3} /></div>
              AI ผู้ช่วยพื้นฐาน
            </li>
            <li className="flex items-center gap-3 text-sm opacity-50" style={{ color: 'var(--text-secondary)' }}>
              <div className="p-1 rounded-full bg-red-500/10 text-red-400"><X size={12} strokeWidth={3} /></div>
              ไม่มีโฆษณา
            </li>
          </ul>

          <button className="w-full py-3.5 rounded-xl border font-medium text-sm transition-all active:scale-95" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-secondary)' }}>
            ใช้งานปัจจุบัน
          </button>
        </div>
      </GlassCard>

      {/* Pro Plan - Enhanced */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#7F56D9] to-[#A48FFC] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <GlassCard className="relative p-0 border-none overflow-hidden h-full">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7F56D9]/10 to-[#A48FFC]/5 pointer-events-none"></div>

          <div className="p-6 relative z-10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-[#A48FFC] to-[#79D4FF] bg-clip-text text-transparent">Pro</h2>
                <p className="text-xs font-medium text-[#A48FFC]">ปลดล็อกศักยภาพ AI เต็มรูปแบบ</p>
              </div>
              <div className="p-2 bg-[#A48FFC]/20 rounded-lg text-[#A48FFC] shadow-[0_0_15px_rgba(164,143,252,0.3)]">
                <Crown size={24} fill="currentColor" className="text-[#A48FFC]" />
              </div>
            </div>

            <div className="my-6 space-y-4">
              {[
                'ไม่มีโฆษณา',
                'AI วิเคราะห์เชิงลึก (Deep Learning)',
                'ธีมพิเศษและไอคอนพรีเมียม',
                'ซิงค์ปฏิทิน Google/Apple แบบ Real-time',
                'Priority Support 24/7'
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-[#A48FFC] text-white shadow-sm shrink-0">
                    <Check size={10} strokeWidth={4} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-bold text-white">฿129</span>
                <span className="text-sm mb-1.5 opacity-60" style={{ color: 'var(--text-secondary)' }}>/ เดือน</span>
              </div>

              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7F56D9] to-[#A48FFC] text-white font-bold text-lg shadow-[0_4px_20px_rgba(164,143,252,0.4)] active:scale-[0.98] transition-all hover:shadow-[0_4px_25px_rgba(164,143,252,0.6)]">
                อัปเกรดเป็น Pro
              </button>
              <p className="text-center text-[10px] mt-3 opacity-50" style={{ color: 'var(--text-secondary)' }}>ยกเลิกได้ตลอดเวลา • ต่ออายุอัตโนมัติ</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  </div>
);

const NotificationSettingsScreen = ({ onBack }: { onBack: () => void }) => {
  const [toggles, setToggles] = useState({
    push: true,
    email: false,
    sound: true,
    vibrate: true,
    ai: true,
    work: true,
    personal: true,
    health: false
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
      <div className="flex items-center mb-6 shrink-0">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 mr-4 border border-white/5">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">ตั้งค่าการแจ้งเตือน</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-[#A48FFC] text-xs font-bold uppercase tracking-wider mb-4">ทั่วไป</h3>
          <GlassCard className="divide-y divide-white/10">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing size={20} className="text-gray-400" />
                <span className="text-white text-sm font-medium">การแจ้งเตือนแบบ Push</span>
              </div>
              <Toggle checked={toggles.push} onChange={() => handleToggle('push')} />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400" />
                <span className="text-white text-sm font-medium">แจ้งเตือนผ่านอีเมล</span>
              </div>
              <Toggle checked={toggles.email} onChange={() => handleToggle('email')} />
            </div>
          </GlassCard>
        </div>

        <div>
          <h3 className="text-[#A48FFC] text-xs font-bold uppercase tracking-wider mb-4">เสียงและการสั่น</h3>
          <GlassCard className="divide-y divide-white/10">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 size={20} className="text-gray-400" />
                <span className="text-white text-sm font-medium">เสียงแจ้งเตือน</span>
              </div>
              <Toggle checked={toggles.sound} onChange={() => handleToggle('sound')} />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone size={20} className="text-gray-400" />
                <span className="text-white text-sm font-medium">ระบบสั่น</span>
              </div>
              <Toggle checked={toggles.vibrate} onChange={() => handleToggle('vibrate')} />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: General Settings ---
const GeneralSettingsScreen = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (s: Screen) => void }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
      <div className="flex items-center mb-6 shrink-0">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 mr-4 border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>ตั้งค่าทั่วไป</h1>
      </div>

      <div className="space-y-6">
        <GlassCard className="divide-y" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                <Globe size={18} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>ภาษา (Language)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>ไทย</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>โหมดมืด (Dark Mode)</span>
            </div>
            <Toggle checked={isDarkMode} onChange={toggleTheme} />
          </div>
        </GlassCard>

        <GlassCard className="divide-y" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                <RefreshCw size={18} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>ซิงค์ปฏิทิน</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#A48FFC] text-xs">อัตโนมัติ</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                <Shield size={18} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>นโยบายความเป็นส่วนตัว</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </GlassCard>

        <GlassCard className="divide-y" style={{ borderColor: 'var(--glass-border)' }}>
          <div onClick={() => onNavigate('support')} className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>
                <HelpCircle size={18} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>ช่วยเหลือและสนับสนุน</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </GlassCard>

        <div className="pt-4">
          <button className="w-full p-4 flex items-center justify-center gap-2 text-red-500 bg-red-500/10 rounded-2xl hover:bg-red-500/20 transition-colors border border-red-500/20">
            <Trash2 size={18} />
            <span className="font-medium text-sm">ลบบัญชีผู้ใช้</span>
          </button>
          <p className="text-center text-gray-500 text-xs mt-4">VURENO v1.1.0</p>
        </div>

      </div>
    </div>
  );
};

const HomeScreen = ({ onOpenAI, onSelectEvent }: { onOpenAI: () => void, onSelectEvent: (event: EventData) => void }) => {
  const timelineEvents: EventData[] = [
    {
      id: '1', type: 'event', title: "ประชุม Design System", time: "10:00", location: "Zoom Meeting", participants: ['A', 'B', 'K'], tag: "งาน", tagColor: "#79D4FF",
      tips: "เตรียมสรุปประเด็นสำคัญจากการประชุมครั้งก่อนไว้ด้วยนะ จะได้คุยต่อได้ลื่นไหล"
    },
    {
      id: '2', type: 'event', title: "ทานข้าวกับส้ม", time: "12:30", location: "Siam Paragon", tag: "ส่วนตัว", tagColor: "#A48FFC",
      tips: "ช่วงเที่ยงคนเยอะ ลองจองโต๊ะล่วงหน้าผ่านแอพ QueQ ไหม?"
    },
    {
      id: '3', type: 'habit', title: "ออกกำลังกาย", time: "17:00", recurrence: "ทุกวัน", tag: "สุขภาพ", tagColor: "#4ADE80", location: "สวนลุมพินี",
      tips: "วอร์มอัพร่างกาย 10 นาทีก่อนวิ่งเพื่อลดอาการบาดเจ็บนะครับ"
    },
    {
      id: '4', type: 'expense', title: "ค่าอาหารเย็น", time: "19:30", amount: "350", tag: "ค่าใช้จ่าย", tagColor: "#EF4444", note: "ร้าน Sushi Hiro",
      tips: "วันนี้ใช้จ่ายไปประมาณ 30% ของงบรายวันแล้ว ยังอยู่ในเกณฑ์ที่ดีครับ"
    },
    {
      id: '5', type: 'shopping', title: "ซื้อของเข้าบ้าน", time: "20:00", items: ['นมสด', 'ไข่ไก่', 'ขนมปัง', 'ผักสลัด'], tag: "ช้อปปิ้ง", tagColor: "#F97316", location: "Big C",
      tips: "อย่าลืมพกถุงผ้าไปด้วยนะ ช่วยลดโลกร้อนแถมประหยัดค่าถุงพลาสติก"
    },
    {
      id: '6', type: 'event', title: "ทริปหัวหิน (จองโรงแรม)", time: "14:00", location: "The Standard Hua Hin", tag: "เที่ยว", tagColor: "#8B5CF6", date: "25 ธ.ค.",
      travelTime: "ควรออกจากบ้านเวลา 10:00 น.",
      weather: "แดดจ้า 32°C",
      prepList: ["ชุดว่ายน้ำ", "แว่นกันแดด", "ครีมกันแดด"],
      tips: "ช่วงเทศกาลรถอาจจะติด แนะนำให้เผื่อเวลาเดินทางอีก 30 นาทีครับ"
    }
  ];

  return (
    <div className="pb-32 px-6 pt-14 h-full overflow-y-auto no-scrollbar">
      {/* HEADER SECTION: Clean & Minimal */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>สวัสดีตอนเช้า 👋</p>
          <h1 className="text-2xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>คุณ Alex</h1>

          {/* Location - Minimal Text */}
          <div className="flex items-center gap-1 mt-1 opacity-70">
            <MapPin size={12} className="text-[#A48FFC]" />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>สาทร</span>
          </div>
        </div>

        {/* Avatar with Progress Ring */}
        <div className="relative w-12 h-12">
          <div className="w-full h-full rounded-full p-[2px] relative z-10">
            <div className="w-full h-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--input-bg)' }}>
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 text-white">
                <User size={20} />
              </div>
            </div>
          </div>
          {/* Progress Ring SVG */}
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--glass-border)"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#A48FFC"
              strokeWidth="2"
              strokeDasharray="75, 100"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* WEATHER & INSIGHT: Unified & Clean */}
      <div className="mb-6 space-y-3">
        {/* Weather Info Line - No borders, just clean text & icons */}
        <div className="flex items-center gap-4 text-xs font-medium opacity-90 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
            <CloudSun size={16} className="text-yellow-400" />
            <span>28°C</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10"></div>
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
            <Wind size={16} className="text-green-400" />
            <span>35</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10"></div>
          <div className="flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
            <Droplets size={16} className="text-blue-400" />
            <span>10%</span>
          </div>
        </div>

        {/* AI Insight - Subtle Glass Container */}
        <div className="p-3 rounded-xl flex items-start gap-3 border transition-colors"
          style={{
            background: 'linear-gradient(90deg, rgba(164,143,252,0.1) 0%, rgba(164,143,252,0.02) 100%)',
            borderColor: 'rgba(164,143,252,0.15)'
          }}>
          <Sparkles size={16} className="text-[#A48FFC] mt-0.5 shrink-0" />
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            วันนี้อากาศดี เหมาะแก่การออกกำลังกายที่สวนลุมฯ นะครับ 🏃
          </p>
        </div>
      </div>

      {/* Next Event Card */}
      <div className="mb-6 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#A48FFC] to-[#79D4FF] rounded-[20px] blur opacity-20"></div>
        <GlassCard className="p-5 relative">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-secondary)' }}>ถัดไป</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>ใน 20 นาที</span>
          </div>
          <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>ประชุม Design System</h2>
          <p className="text-sm mb-5 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
            Zoom Meeting • อัปเดตความคืบหน้า
          </p>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
              เข้าร่วม
            </button>
            <button className="flex-1 border py-2.5 rounded-xl font-medium text-sm hover:bg-black/5 transition-colors" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
              เลื่อน
            </button>
          </div>
        </GlassCard>
      </div>

      <AICommandBar onClick={onOpenAI} />

      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
        {['เพิ่มเวลาโฟกัสงาน', 'เตือนดื่มน้ำ', 'วางแผนเที่ยวสุดสัปดาห์'].map((chip, i) => (
          <button key={i} className="whitespace-nowrap px-4 py-2 rounded-full border text-xs font-medium hover:bg-black/5 transition-colors" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--glass-bg)', color: 'var(--text-secondary)' }}>
            {chip}
          </button>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>วันนี้</h3>
          <button className="text-[#A48FFC] text-sm font-medium hover:text-[#79D4FF] transition-colors">ดูปฏิทิน</button>
        </div>

        <div className="relative pl-6">
          <div className="absolute left-[7px] top-3 bottom-8 w-[2px] bg-gradient-to-b from-[#A48FFC] via-gray-500/20 to-transparent"></div>
          <div className="space-y-5">
            {timelineEvents.map((event) => (
              <div key={event.id} className="relative z-10">
                <div className={`absolute -left-[22px] top-5 w-3.5 h-3.5 rounded-full border-2 ${event.type === 'expense' ? 'border-red-500' : event.type === 'shopping' ? 'border-orange-500' : event.type === 'habit' ? 'border-green-400' : 'border-[#A48FFC]'}`} style={{ backgroundColor: 'var(--bg-primary)' }}></div>
                <EventCard
                  {...event}
                  onClick={() => onSelectEvent(event)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- NEW SCREEN: Support Screen ---
const SupportScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="h-full flex flex-col pt-14 px-6 pb-6 overflow-y-auto no-scrollbar">
      <div className="flex items-center mb-6 shrink-0">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 mr-4 border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>ช่วยเหลือและสนับสนุน</h1>
      </div>

      <div className="space-y-6">
        {/* Contact Channels */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A48FFC' }}>ติดต่อเรา</h3>
          <div className="grid grid-cols-2 gap-4">
            <GlassCard className="p-4 flex flex-col items-center justify-center gap-3 hover:bg-black/5 cursor-pointer text-center">
              <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Live Chat</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>ตอบกลับใน 5 นาที</p>
              </div>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col items-center justify-center gap-3 hover:bg-black/5 cursor-pointer text-center">
              <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                <Mail size={24} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Email</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>support@vurenio.com</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A48FFC' }}>คำถามที่พบบ่อย (FAQ)</h3>
          <div className="space-y-3">
            {['วิธีเปลี่ยนรหัสผ่าน', 'ยกเลิกสมาชิก VURENO Pro', 'วิธีเชื่อมต่อ Google Calendar'].map((q, i) => (
              <GlassCard key={i} className="p-4 flex items-center justify-between hover:bg-black/5 cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-gray-400" />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{q}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Report Problem */}
        <GlassCard className="p-5 mt-4 border-red-500/20 bg-red-500/5">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-500/10 rounded-full text-red-500 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-red-500 mb-1">แจ้งปัญหาการใช้งาน</h3>
              <p className="text-xs text-gray-500 mb-3">พบข้อผิดพลาดหรือบัคในแอป? แจ้งให้เราทราบเพื่อปรับปรุง</p>
              <button className="text-xs font-bold text-red-500 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                เขียนรายงาน
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function VurenoApp() {
  const [screen, setScreen] = useState<Screen>('login');
  const [showAI, setShowAI] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Define CSS Variables based on Theme
  const themeStyles = isDarkMode ? `
  --bg-primary: #0A0D1A;
  --bg-overlay: rgba(10, 13, 26, 0.95);
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-border: rgba(255, 255, 255, 0.1);
  --input-bg: #15192B;
  --nav-bg: rgba(10, 13, 26, 0.9);
  ` : `
  --bg-primary: #F3F4F6;
  --bg-overlay: rgba(243, 244, 246, 0.95);
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.05);
  --input-bg: #ffffff;
  --nav-bg: rgba(255, 255, 255, 0.8);
  `;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Simple Router
  const renderScreen = () => {
    switch (screen) {
      case 'login': return <LoginScreen onLogin={() => setScreen('home')} onSwitch={() => setScreen('signup')} />;
      case 'signup': return <SignupScreen onSignup={() => setScreen('home')} onSwitch={() => setScreen('login')} />;
      case 'home': return <HomeScreen onOpenAI={() => setShowAI(true)} onSelectEvent={setSelectedEvent} />;
      case 'calendar-week': return <CalendarWeekScreen onSwitchMode={() => setScreen('calendar-month')} onSelectEvent={setSelectedEvent} />;
      case 'calendar-month': return <CalendarMonthScreen onSwitchMode={() => setScreen('calendar-week')} onSelectEvent={setSelectedEvent} />;
      case 'notifications': return <NotificationsScreen onSelectEvent={setSelectedEvent} />;
      case 'profile': return <ProfileScreen onToSub={() => setScreen('subscription')} onNavigate={(s) => setScreen(s)} />;
      case 'edit-profile': return <EditProfileScreen onBack={() => setScreen('profile')} />;
      case 'subscription': return <SubscriptionScreen onBack={() => setScreen('profile')} />;
      case 'settings-notifications': return <NotificationSettingsScreen onBack={() => setScreen('profile')} />;
      case 'settings-general': return <GeneralSettingsScreen onBack={() => setScreen('profile')} onNavigate={(s) => setScreen(s)} />;
      case 'support': return <SupportScreen onBack={() => setScreen('settings-general')} />;
      default: return <HomeScreen onOpenAI={() => setShowAI(true)} onSelectEvent={setSelectedEvent} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className="w-full min-h-screen font-sans overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <style>{`:root { ${themeStyles} } .no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* Global Background Elements */}
        <div className="fixed -top-[200px] -right-[200px] w-[500px] h-[500px] bg-[#79D4FF] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"></div>
        <div className="fixed -bottom-[200px] -left-[200px] w-[500px] h-[500px] bg-[#A48FFC] rounded-full blur-[150px] opacity-[0.1] pointer-events-none"></div>

        {/* Main App Wrapper - mobile first */}
        <div className="relative z-10 w-full max-w-[480px] mx-auto min-h-screen overflow-hidden">
          <div className="h-full w-full overflow-hidden relative pb-[90px]">
            {renderScreen()}

            {/* Overlays */}
            {showAI && <AIInputOverlay onClose={() => setShowAI(false)} />}
            {selectedEvent && <EventDetailOverlay event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
          </div>

          {/* Bottom Nav for main screens */}
          {!['login', 'signup', 'subscription', 'settings-notifications', 'settings-general', 'support', 'edit-profile'].includes(screen) && (
            <BottomNav
              activeTab={screen}
              onNavigate={(s) => setScreen(s)}
              onAdd={() => setShowAI(true)}
            />
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}