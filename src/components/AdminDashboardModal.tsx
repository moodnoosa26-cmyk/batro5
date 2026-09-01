import React, { useState } from 'react';
import { 
  X, Lock, ShieldCheck, Plus, Edit2, Trash2, Eye, EyeOff, 
  Save, RefreshCw, Download, Upload, DollarSign, Image as ImageIcon, 
  Phone, MessageCircle, Sparkles, CheckCircle2, AlertCircle, 
  FileText, TrendingUp, Settings, Package, Utensils, Key
} from 'lucide-react';
import { Dish, DishCategory, ActiveOrder, StoreSettings } from '../types';
import { MENU_CATEGORIES } from '../data/menuData';
import { PROMPT_STUDIO_ITEMS, PROMPT_CATEGORIES } from '../data/promptsData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: Dish[];
  onUpdateDishes: (updated: Dish[]) => void;
  onResetDishes: () => void;
  activeOrder?: ActiveOrder | null;
  ordersHistory: ActiveOrder[];
  storeSettings: StoreSettings;
  onUpdateStoreSettings: (settings: StoreSettings) => void;
  onViewInvoice: (order: ActiveOrder) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  dishes,
  onUpdateDishes,
  onResetDishes,
  activeOrder,
  ordersHistory,
  storeSettings,
  onUpdateStoreSettings,
  onViewInvoice,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'settings' | 'prompts'>('menu');
  
  // Menu Editing State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(storeSettings);

  // Prompts filter
  const [activePromptCat, setActivePromptCat] = useState<string>('all');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim();
    if (cleanInput === 'بطروخ' || cleanInput === 'batroukh' || cleanInput === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('تم تسجيل الدخول للوحة التحكم بنجاح! 👑');
    } else {
      setAuthError('كلمة المرور غير صحيحة! جرب: بطروخ');
    }
  };

  const handleSaveDish = (dish: Dish) => {
    if (isAddingNew) {
      onUpdateDishes([dish, ...dishes]);
      showToast(`تم إضافة الصنف "${dish.name}" بنجاح! ✨`);
    } else {
      onUpdateDishes(dishes.map((d) => (d.id === dish.id ? dish : d)));
      showToast(`تم تعديل الصنف "${dish.name}" بنجاح! 💾`);
    }
    setEditingDish(null);
    setIsAddingNew(false);
  };

  const handleDeleteDish = (dishId: string, dishName: string) => {
    if (window.confirm(`هل أنت متأكد من حذف الصنف "${dishName}" من المنيو؟`)) {
      onUpdateDishes(dishes.filter((d) => d.id !== dishId));
      showToast(`تم حذف "${dishName}" من المنيو.`);
    }
  };

  const handleToggleAvailability = (dishId: string) => {
    const updated = dishes.map((d) => 
      d.id === dishId ? { ...d, isAvailable: d.isAvailable === false ? true : false } : d
    );
    onUpdateDishes(updated);
    showToast('تم تحديث حالة توفر الصنف.');
  };

  const handleExportMenuJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dishes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `batroukh_menu_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('تم تصدير ملف المنيو بنجاح!');
  };

  const handleImportMenuJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            onUpdateDishes(parsed);
            showToast(`تم استيراد ${parsed.length} صنف بنجاح!`);
          }
        } catch {
          alert('ملف غير صالح!');
        }
      };
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStoreSettings(settingsForm);
    showToast('تم حفظ إعدادات المطعم بنجاح!');
  };

  if (!isOpen) return null;

  // 1. Password Verification Screen (if not logged in)
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/90 backdrop-blur-md">
        <div className="relative w-full max-w-md bg-[#0A1128] border border-orange-500/30 rounded-[32px] p-6 sm:p-8 shadow-[0_0_50px_rgba(234,88,12,0.3)] text-center">
          
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-600 to-amber-500 p-0.5 mx-auto mb-4 shadow-lg shadow-orange-600/40 flex items-center justify-center">
            <div className="w-full h-full bg-[#050A18] rounded-[22px] flex items-center justify-center text-orange-400">
              <Lock className="w-8 h-8" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-heading text-white mb-1">
            لوحة تحكم مطعم بطروخ المشفرة
          </h3>
          
          <p className="text-xs text-white/60 mb-6">
            منطقة الإدارة وتعديل الأسعار والمنيو والفواتير. أدخل كلمة المرور للمتابعة.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div>
              <label className="text-xs font-bold text-white/80 block mb-1.5">
                كلمة مرور لوحة الإدارة 🔑:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="اكتب: بطروخ"
                  className="w-full px-4 py-3 rounded-2xl bg-[#050A18] border border-white/15 text-white text-sm focus:outline-none focus:border-orange-500 text-center font-bold tracking-widest"
                  autoFocus
                />
              </div>
              {authError && (
                <p className="text-xs text-red-400 font-bold mt-1.5 flex items-center gap-1 justify-center">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-sm shadow-lg shadow-orange-600/30 transition-all active:scale-95"
            >
              فتح لوحة التحكم 🚀
            </button>
          </form>

          <div className="mt-4 text-[11px] text-white/40">
            💡 كلمة المرور الافتراضية: <span className="text-orange-400 font-bold">بطروخ</span>
          </div>

        </div>
      </div>
    );
  }

  // Filtered dishes for menu management
  const filteredDishes = dishes.filter((dish) => {
    const matchCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchSearch = 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#030712]/95 backdrop-blur-xl">
      
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0A1128] border border-orange-500/30 rounded-[32px] shadow-2xl flex flex-col overflow-hidden text-right">
        
        {/* Toast notification banner */}
        {notification && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#050A18]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-heading text-white">
                  لوحة إدارة مطعم بطروخ 👑
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                  محمية ومفعلة
                </span>
              </div>
              <p className="text-xs text-white/50">
                التحكم بالمنيو، الأسعار، الصور، الفواتير، الإعدادات، واستوديو البرومبتات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold transition-colors"
              title="قفل لوحة التحكم"
            >
              قفل 🔒
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 py-2 border-b border-white/10 bg-[#070E22] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'menu'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>إدارة المنيو والأسعار ({dishes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>سجل الفواتير والطلبات ({ordersHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات المطعم والتوصيل</span>
          </button>

          <button
            onClick={() => setActiveTab('prompts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'prompts'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>استوديو البرومبتات والتسويق (Flow Studio) 🔐</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* ================= TAB 1: MENU MANAGEMENT ================= */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              
              {/* Actions & Filters Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#050A18] p-3.5 rounded-2xl border border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setIsAddingNew(true);
                      setEditingDish({
                        id: `custom-dish-${Date.now()}`,
                        name: '',
                        category: 'casseroles',
                        price: 150,
                        description: '',
                        image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
                        isAvailable: true,
                        prepTimeMinutes: 15,
                        servesCount: 1,
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة صنف جديد</span>
                  </button>

                  <button
                    onClick={handleExportMenuJSON}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-bold transition-colors"
                    title="تصدير نسخة احتياطية من المنيو"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تصدير JSON</span>
                  </button>

                  <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-bold transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>استيراد</span>
                    <input type="file" accept=".json" onChange={handleImportMenuJSON} className="hidden" />
                  </label>

                  <button
                    onClick={() => {
                      if (window.confirm('هل تريد استعادة المنيو الأصلي لبطروخ وحذف التعديلات المخصصة؟')) {
                        onResetDishes();
                        showToast('تم استعادة منيو بطروخ الأصلي!');
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 text-xs font-bold transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>استعادة الأصلي</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن صنف بالاسم أو الوصف..."
                    className="w-full md:w-64 px-3 py-1.5 rounded-xl bg-[#0A1128] border border-white/15 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat.nameAr}
                  </button>
                ))}
              </div>

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      dish.isAvailable === false
                        ? 'bg-red-950/20 border-red-500/30 opacity-60'
                        : 'bg-[#050A18] border-white/10 hover:border-orange-500/40'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white truncate">{dish.name}</h4>
                          {dish.badge && (
                            <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold shrink-0">
                              {dish.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/50 line-clamp-1 mb-2">{dish.description}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-orange-400 font-mono">
                            {dish.price} جنيه
                          </span>
                          {dish.originalPrice && (
                            <span className="text-xs text-white/40 line-through font-mono">
                              {dish.originalPrice} ج
                            </span>
                          )}
                          <span className="text-[10px] text-white/40">
                            {dish.prepTimeMinutes || 15} دقيقة
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleAvailability(dish.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          dish.isAvailable === false
                            ? 'bg-red-500/20 border-red-500/40 text-red-400'
                            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        }`}
                        title={dish.isAvailable === false ? 'تفعيل الصنف' : 'تعطيل الصنف (غير متوفر)'}
                      >
                        {dish.isAvailable === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          setIsAddingNew(false);
                          setEditingDish({ ...dish });
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-orange-600/30 border border-white/10 text-white/70 hover:text-orange-400 transition-colors"
                        title="تعديل الصنف والسعر والصورة"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteDish(dish.id, dish.name)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-600/30 border border-white/10 text-white/70 hover:text-red-400 transition-colors"
                        title="حذف الصنف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredDishes.length === 0 && (
                <div className="text-center py-12 text-white/40 text-sm">
                  لا توجد أصناف مطابقة للبحث.
                </div>
              )}
            </div>
          )}

          {/* ================= EDIT / ADD DISH MODAL ================= */}
          {editingDish && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="w-full max-w-lg bg-[#0A1128] border border-orange-500/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">
                    {isAddingNew ? 'إضافة صنف جديد للمنيو' : `تعديل صنف: ${editingDish.name}`}
                  </h3>
                  <button
                    onClick={() => setEditingDish(null)}
                    className="p-1 rounded-full text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-white/80 block mb-1">اسم الصنف باللغة العربية:</label>
                    <input
                      type="text"
                      value={editingDish.name}
                      onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#050A18] border border-white/15 text-white font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-white/80 block mb-1">السعر الحالي (جنيه):</label>
                      <input
                        type="number"
                        value={editingDish.price}
                        onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#050A18] border border-white/15 text-white font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-white/80 block mb-1">السعر قبل الخصم (اختياري):</label>
                      <input
                        type="number"
                        value={editingDish.originalPrice || ''}
                        onChange={(e) => setEditingDish({ ...editingDish, originalPrice: Number(e.target.value) || undefined })}
                        className="w-full px-3 py-2 rounded-xl bg-[#050A18] border border-white/15 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-white/80 block mb-1">القسم الرئيسي:</label>
                      <select
                        value={editingDish.category}
                        onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value as DishCategory })}
                        className="w-full px-3 py-2 rounded-xl bg-[#050A18] border border-white/15 text-white"
                      >
                        {MENU_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nameAr}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-white/80 block mb-1">شارة مميزة (Badge):</label>
                      <input
                        type="text"
                        value={editingDish.badge || ''}
                        onChange={(e) => setEditingDish({ ...editingDish, badge: e.target.value || undefined })}
                        placeholder="مثال: الأكثر مبيعاً 🔥"
                        className="w-full px-3 py-2 rounded-xl bg-[#050A18] border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-white/80 block mb-1">رابط صورة الصنف (Image URL):</label>
                    <input
                      type="text"
                      value={editingDish.image}
                      onChange={(e) => setEditingDish({ ...editingDish, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#050A18] border border-white/15 text-white font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-white/80 block mb-1">وصف الصنف والمكونات بالتفصيل:</label>
                    <textarea
                      rows={3}
                      value={editingDish.description}
                      onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#050A18] border border-white/15 text-white"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingDish.isAvailable !== false}
                        onChange={(e) => setEditingDish({ ...editingDish, isAvailable: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-500"
                      />
                      <span className="text-white font-bold">متوفر في المطبخ الآن</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingDish.isPopular || false}
                        onChange={(e) => setEditingDish({ ...editingDish, isPopular: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-500"
                      />
                      <span className="text-white font-bold">نجم الشباك (Popular)</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleSaveDish(editingDish)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ الصنف في المنيو</span>
                  </button>
                  <button
                    onClick={() => setEditingDish(null)}
                    className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 font-bold text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: INVOICES & ORDERS ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400" />
                  <span>فواتير وطلبات العملاء المسجلة</span>
                </h3>
                <span className="text-xs text-white/50">
                  إجمالي الطلبات: {ordersHistory.length} أوردر
                </span>
              </div>

              {ordersHistory.length === 0 && !activeOrder ? (
                <div className="text-center py-16 bg-[#050A18] rounded-3xl border border-white/10 text-white/50 text-xs">
                  لم يتم تسجيل أي طلبات حتى الآن. عند قيام العميل بالطلب ستظهر الفاتورة هنا فوراً.
                </div>
              ) : (
                <div className="space-y-3">
                  {/* If active order exists */}
                  {activeOrder && (
                    <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                            أوردر حالي نشط #{activeOrder.orderNumber}
                          </span>
                          <span className="text-xs text-white/70">
                            العميل: {activeOrder.customerName} ({activeOrder.customerPhone})
                          </span>
                        </div>
                        <p className="text-xs text-white/60">
                          الموعد المجدول: {activeOrder.scheduledTimeSlot} | الأصناف: {activeOrder.items.length} صنف | الإجمالي: <strong className="text-emerald-400">{activeOrder.netTotal} ج</strong>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onViewInvoice(activeOrder)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors shadow"
                        >
                          معاينة وطباعة الفاتورة 📄
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Orders history list */}
                  {ordersHistory.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-[#050A18] border border-white/10 hover:border-white/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-orange-400 font-mono">
                            #{ord.orderNumber}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {ord.customerName}
                          </span>
                          <span className="text-[11px] text-white/40">
                            ({ord.customerPhone})
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-white/60 text-[10px]">
                            {ord.orderType === 'delivery' ? 'دليفري 🛵' : 'استلام من المطعم 🏃'}
                          </span>
                        </div>
                        <p className="text-xs text-white/60">
                          الموعد: {ord.scheduledTimeSlot} | {ord.items.map((i) => `${i.quantity}x ${i.dish.name}`).join(' + ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-left font-mono">
                          <span className="text-sm font-black text-white">{ord.netTotal} ج</span>
                        </div>
                        <button
                          onClick={() => onViewInvoice(ord)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-bold transition-colors"
                        >
                          عرض الفاتورة 🧾
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: STORE SETTINGS ================= */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl bg-[#050A18] p-5 rounded-3xl border border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <Settings className="w-4 h-4 text-orange-400" />
                <span>إعدادات الاتصال والتوصيل وشريط الإعلانات</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-white/80 block mb-1">رقم الواتساب لاستلام الأوردرات:</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A1128] border border-white/15 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-white/80 block mb-1">رقم الخط الساخن والاتصال المباشر:</label>
                  <input
                    type="text"
                    value={settingsForm.hotline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hotline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A1128] border border-white/15 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-white/80 block mb-1">تكلفة التوصيل الثابتة (جنيه):</label>
                  <input
                    type="number"
                    value={settingsForm.deliveryFee}
                    onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A1128] border border-white/15 text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-white/80 block mb-1">رسوم خدمة الصالة (%):</label>
                  <input
                    type="number"
                    value={settingsForm.taxOrServiceRate * 100}
                    onChange={(e) => setSettingsForm({ ...settingsForm, taxOrServiceRate: Number(e.target.value) / 100 })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A1128] border border-white/15 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-white/80 block mb-1 text-xs">نص الشريط الإعلاني العلوي (Ticker):</label>
                <input
                  type="text"
                  value={settingsForm.bannerAnnouncement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bannerAnnouncement: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A1128] border border-white/15 text-white text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition-all active:scale-95"
                >
                  حفظ التغييرات 💾
                </button>
              </div>
            </form>
          )}

          {/* ================= TAB 4: ENCRYPTED MARKETING PROMPTS ================= */}
          {activeTab === 'prompts' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white">
                      استوديو البرومبتات والتسويق الرقمي (Flow Studio & Marketing Kit)
                    </h3>
                  </div>
                  <p className="text-xs text-purple-200/70 mt-1">
                    هذا القسم مشفر ومخفي عن الزوار العاديين ومخصص لإدارة الحملات وصناعة محتوى بطروخ بالذكاء الاصطناعي.
                  </p>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {PROMPT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActivePromptCat(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      activePromptCat === cat.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat.nameAr}
                  </button>
                ))}
              </div>

              {/* Prompts list */}
              <div className="space-y-3">
                {PROMPT_STUDIO_ITEMS.filter(
                  (p) => activePromptCat === 'all' || p.category === activePromptCat
                ).map((prompt) => (
                  <div
                    key={prompt.id}
                    className="p-4 rounded-2xl bg-[#050A18] border border-purple-500/20 hover:border-purple-500/40 space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{prompt.title}</span>
                      </h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(prompt.promptText);
                          showToast('تم نسخ البرومبت بنجاح! 📋');
                        }}
                        className="px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-bold transition-colors"
                      >
                        نسخ البرومبت 📋
                      </button>
                    </div>

                    <p className="text-[11px] text-white/60">{prompt.description}</p>

                    <div className="p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-[11px] text-white/80 leading-relaxed max-h-36 overflow-y-auto" dir="ltr">
                      {prompt.promptText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
