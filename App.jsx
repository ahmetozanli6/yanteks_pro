import React, { useState, useEffect } from 'react';

// ============================================================================
// İKONLAR
// ============================================================================
const SvgIcon = ({ children, size = 24, className = '', fill = 'none' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const LayoutDashboard = (p) => <SvgIcon {...p}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></SvgIcon>;
const Package = (p) => <SvgIcon {...p}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></SvgIcon>;
const Users = (p) => <SvgIcon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></SvgIcon>;
const CircleDollarSign = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></SvgIcon>;
const Send = (p) => <SvgIcon {...p}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></SvgIcon>;
const FileText = (p) => <SvgIcon {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></SvgIcon>;
const Menu = (p) => <SvgIcon {...p}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></SvgIcon>;
const X = (p) => <SvgIcon {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></SvgIcon>;
const Search = (p) => <SvgIcon {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></SvgIcon>;
const Bell = (p) => <SvgIcon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></SvgIcon>;
const Plus = (p) => <SvgIcon {...p}><path d="M5 12h14"/><path d="M12 5v14"/></SvgIcon>;
const Calculator = (p) => <SvgIcon {...p}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16.01" y1="14" y2="14"/><line x1="16" x2="16.01" y1="18" y2="18"/><line x1="12" x2="12.01" y1="14" y2="14"/><line x1="12" x2="12.01" y1="18" y2="18"/><line x1="8" x2="8.01" y1="14" y2="14"/><line x1="8" x2="8.01" y1="18" y2="18"/></SvgIcon>;
const ArrowRight = (p) => <SvgIcon {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></SvgIcon>;
const TrendingUp = (p) => <SvgIcon {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></SvgIcon>;
const Clock = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></SvgIcon>;
const CheckCircle = (p) => <SvgIcon {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></SvgIcon>;
const Smartphone = (p) => <SvgIcon {...p}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></SvgIcon>;
const Zap = (p) => <SvgIcon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></SvgIcon>;
const Edit2 = (p) => <SvgIcon {...p}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></SvgIcon>;
const Trash2 = (p) => <SvgIcon {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></SvgIcon>;
const RefreshCw = (p) => <SvgIcon {...p}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></SvgIcon>;
const AlertCircle = (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></SvgIcon>;

// ============================================================================
// SUPABASE
// ============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://zmlbdpjcergcvcurihuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbGJkcGpjZXJnY3ZjdXJpaHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MTA2MzIsImV4cCI6MjA5MTA4NjYzMn0.Jh4e_UXSL7CH7EzLBhhXtQYM0-iQwrFU3GHnoe-njBM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// YARDIMCILAR
// ============================================================================
const getVal = (item, possibleKeys, fallback = null) => {
  if (!item) return fallback;
  const originalKeys = Object.keys(item);
  for (let pKey of possibleKeys) {
    const cleanSearchKey = pKey.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9ğüşöçı]/g, '');
    for (let oKey of originalKeys) {
      const cleanOriginalKey = oKey.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9ğüşöçı]/g, '');
      if (cleanOriginalKey === cleanSearchKey && item[oKey] !== null && item[oKey] !== '') return item[oKey];
    }
  }
  for (let pKey of possibleKeys) {
    const cleanSearchKey = pKey.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9ğüşöçı]/g, '');
    if (cleanSearchKey.length < 3) continue;
    for (let oKey of originalKeys) {
      const cleanOriginalKey = oKey.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9ğüşöçı]/g, '');
      if (cleanOriginalKey.includes(cleanSearchKey) && item[oKey] !== null && item[oKey] !== '') return item[oKey];
    }
  }
  return fallback;
};

const getDebugVal = (item, possibleKeys) => {
  const val = getVal(item, possibleKeys, null);
  if (val !== null) return val;
  if (item && Object.keys(item).length > 0) {
    const keys = Object.keys(item).filter(k => !['id', 'created_at'].includes(k)).join(', ');
    return `[Gerçek Sütun Adlarınız: ${keys}]`;
  }
  return '-';
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (e) { return dateStr; }
};

// ============================================================================
// TEMA SABİTLERİ — Yanteks Pro renk paleti
// ============================================================================
const T = {
  // sidebar
  sidebarBg:      '#0F172A',
  sidebarHeadBg:  '#0A1520',
  sidebarBorder:  'rgba(255,255,255,0.07)',
  navText:        'rgba(255,255,255,0.5)',
  navHover:       'rgba(255,255,255,0.08)',
  navActiveBg:    'linear-gradient(135deg, #0672A0, #0891B2)',
  navActiveGlow:  '0 4px 14px rgba(8,145,178,0.35)',
  // içerik
  pageBg:         '#F3F5F7',
  surface:        '#FFFFFF',
  border:         'rgba(30,45,61,0.1)',
  border2:        'rgba(30,45,61,0.16)',
  textPrimary:    '#0A1520',
  textSecondary:  '#4A6880',
  // aksan
  teal:           '#0891B2',
  tealLight:      '#38BDF8',
  tealSoft:       'rgba(8,145,178,0.1)',
  tealGlow:       'rgba(8,145,178,0.2)',
  navy:           '#1E2D3D',
  blue:           '#1D4ED8',
  green:          '#15803D',
  greenSoft:      'rgba(21,128,61,0.1)',
  amber:          '#D97706',
  amberSoft:      'rgba(217,119,6,0.1)',
  red:            '#991B1B',
  redSoft:        'rgba(153,27,27,0.1)',
  orange:         '#EA580C',
  orangeSoft:     'rgba(234,88,12,0.1)',
};

// ============================================================================
// ANA UYGULAMA
// ============================================================================
export default function App() {
  const [activeTab, setActiveTab]     = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading]     = useState(true);
  const [dbError, setDbError]         = useState(null);

  const [customers, setCustomers] = useState([]);
  const [samples,   setSamples]   = useState([]);
  const [prices,    setPrices]    = useState([]);
  const [costs,     setCosts]     = useState([]);
  const [notes,     setNotes]     = useState([]);

  const navItems = [
    { id: 'dashboard', label: 'Özet Panel',  icon: LayoutDashboard },
    { id: 'samples',   label: 'Numuneler',   icon: Package },
    { id: 'customers', label: 'Müşteriler',  icon: Users },
    { id: 'prices',    label: 'Fiyatlar',    icon: CircleDollarSign },
    { id: 'cost',      label: 'Maliyet',     icon: Calculator },
    { id: 'offers',    label: 'Teklifler',   icon: Send },
    { id: 'notes',     label: 'Notlarım',    icon: FileText },
  ];

  useEffect(() => { fetchAllData(); }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    setDbError(null);
    try {
      let errorMessages = [];

      const { data: customersData, error: customersError } = await supabase.from('musteriler').select('*');
      if (customersError) errorMessages.push(`Müşteriler: ${customersError.message}`);
      else setCustomers(customersData || []);

      let { data: samplesData, error: samplesError } = await supabase.from('numuneler').select('*');
      if (samplesError) {
        const { data: sData2, error: sErr2 } = await supabase.from('Numune takip').select('*');
        if (!sErr2) samplesData = sData2;
      }
      if (samplesData) setSamples(samplesData || []);

      const { data: pricesData, error: pricesError } = await supabase.from('fiyatlar').select('*');
      if (pricesError) errorMessages.push(`Fiyatlar: ${pricesError.message}`);
      else setPrices(pricesData || []);

      const { data: costsData, error: costsError } = await supabase.from('maliyetler').select('*');
      if (!costsError) setCosts(costsData || []);

      let { data: notesData, error: notesError } = await supabase.from('notlar').select('*');
      if (notesError) {
        const { data: nData2, error: nErr2 } = await supabase.from('genel_notlar').select('*');
        if (!nErr2) notesData = nData2;
      }
      if (notesData) setNotes(notesData || []);

      if (errorMessages.length > 0) setDbError(errorMessages.join(' | '));
    } catch (error) {
      setDbError(`Sistemsel Hata: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* ── Global stiller ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { font-family: 'Inter', sans-serif; background: ${T.pageBg}; }
        .yp-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.12) transparent; }
        .yp-scrollbar::-webkit-scrollbar { width: 4px; }
        .yp-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 4px; }
        .yp-anim { animation: fadeUp .22s both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .yp-spin { animation: spin .9s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .mono { font-family: 'JetBrains Mono', monospace; }

        /* Sidebar — mobil: fixed, gizli başlar; masaüstü: her zaman görünür */
        .yp-sidebar {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          transform: translateX(-100%);
          transition: transform .28s cubic-bezier(.32,.72,0,1);
          z-index: 30;
        }
        .yp-sidebar.open { transform: translateX(0); }

        @media (min-width: 1024px) {
          .yp-sidebar {
            position: relative !important;
            transform: translateX(0) !important;
            transition: none !important;
            flex-shrink: 0;
          }
          .yp-menu-btn { display: none !important; }
          .yp-sidebar-close { display: none !important; }
          .yp-search { display: flex !important; }
        }
        @media (max-width: 1023px) {
          .yp-search { display: none !important; }
        }
      `}</style>

      <div style={{ display:'flex', height:'100vh', background: T.pageBg, color: T.textPrimary, fontFamily:'Inter,sans-serif' }}>

        {/* ── Overlay (mobil) ── */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(10,21,32,0.65)', zIndex:20, backdropFilter:'blur(3px)' }}
          />
        )}

        {/* ════════════════ SIDEBAR ════════════════ */}
        <aside
          style={{
            width: 252,
            background: T.sidebarBg,
            borderRight: `1px solid ${T.sidebarBorder}`,
            boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
            display: 'flex', flexDirection: 'column',
          }}
          className={`yp-sidebar${isSidebarOpen ? ' open' : ''}`}
        >

          {/* Logo alanı */}
          <div style={{
            height: 72,
            padding: '0 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: T.sidebarHeadBg,
            borderBottom: `1px solid ${T.sidebarBorder}`,
            flexShrink: 0,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: 'linear-gradient(135deg, #0672A0, #0891B2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', boxShadow:'0 2px 10px rgba(8,145,178,0.4)',
              }}>
                <Zap size={18} />
              </div>
              <span style={{ fontSize:18, fontWeight:800, color:'#fff', letterSpacing:'-.01em' }}>
                Yanteks<span style={{ color: T.tealLight }}>Pro</span>
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="yp-sidebar-close"
              style={{ background:'none', border:'none', color:'rgba(255,255,255,0.45)', cursor:'pointer', padding:6, borderRadius:8, display:'flex' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="yp-scrollbar" style={{ flex:1, overflowY:'auto', padding:'12px 0' }}>
            <p style={{ padding:'8px 20px 6px', fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.25)', letterSpacing:'.13em', textTransform:'uppercase' }}>
              ANA MENÜ
            </p>
            {navItems.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px',
                    margin: '2px 8px',
                    width: 'calc(100% - 16px)',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter,sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    transition: 'background .15s, color .15s',
                    background: active ? T.navActiveBg : 'transparent',
                    boxShadow: active ? T.navActiveGlow : 'none',
                    color: active ? '#fff' : T.navText,
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = T.navHover; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.navText; } }}
                >
                  <span style={{ width:22, textAlign:'center', flexShrink:0, opacity: active ? 1 : 0.75 }}>
                    <Icon size={18} />
                  </span>
                  <span>{label}</span>
                  {active && (
                    <span style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,0.7)' }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div style={{
            padding: '14px 20px',
            borderTop: `1px solid ${T.sidebarBorder}`,
            fontSize: 10, fontWeight:600,
            color:'rgba(255,255,255,0.2)',
            letterSpacing:'.06em',
          }}>
            YANTEKS PRO v2.0
          </div>
        </aside>

        {/* ════════════════ ANA İÇERİK ════════════════ */}
        <main style={{ flex:1, display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden', minWidth:0 }}>

          {/* ── Topbar ── */}
          <header style={{
            height: 72,
            background: T.surface,
            borderBottom: `1.5px solid ${T.border2}`,
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 28px',
            flexShrink: 0,
            zIndex: 10,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="yp-menu-btn"
                style={{
                  background:'none', border: `1px solid ${T.border}`,
                  borderRadius:10, padding:8, cursor:'pointer',
                  color: T.textSecondary,
                  display:'flex', alignItems:'center',
                }}
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 style={{ fontSize:18, fontWeight:800, color: T.textPrimary, letterSpacing:'-.02em' }}>
                  {navItems.find(i => i.id === activeTab)?.label}
                </h2>
                <p style={{ fontSize:11, color: T.textSecondary, fontWeight:500, marginTop:1 }}>
                  Sisteme hoş geldiniz, iyi çalışmalar.
                </p>
              </div>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {/* Arama kutusu */}
              <div className="yp-search" style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color: T.textSecondary, display:'flex' }}>
                  <Search size={15} />
                </span>
                <input
                  type="text"
                  placeholder="Müşteri veya ürün ara..."
                  style={{
                    paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9,
                    width: 260,
                    background: T.pageBg,
                    border: `1px solid ${T.border2}`,
                    borderRadius: 22,
                    fontSize: 12, fontWeight:500,
                    color: T.textPrimary,
                    fontFamily:'Inter,sans-serif',
                    outline:'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = T.teal; e.target.style.boxShadow = `0 0 0 3px ${T.tealGlow}`; }}
                  onBlur={e =>  { e.target.style.borderColor = T.border2; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Yenile */}
              <button
                onClick={fetchAllData}
                title="Verileri Yenile"
                style={{
                  background:'none', border:`1px solid ${T.border}`, borderRadius:10,
                  padding:8, cursor:'pointer', color: T.textSecondary, display:'flex',
                }}
              >
                <span className={isLoading ? 'yp-spin' : ''} style={{ display:'flex' }}>
                  <RefreshCw size={18} />
                </span>
              </button>

              {/* Bildirim */}
              <button style={{ background:'none', border:`1px solid ${T.border}`, borderRadius:10, padding:8, cursor:'pointer', color: T.textSecondary, display:'flex', position:'relative' }}>
                <Bell size={18} />
                <span style={{ position:'absolute', top:7, right:7, width:8, height:8, background:'#DC2626', borderRadius:'50%', border:'2px solid #fff' }} />
              </button>

              {/* Avatar */}
              <div style={{
                width: 38, height: 38, borderRadius:'50%',
                background: 'linear-gradient(135deg, #0672A0, #0891B2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', fontWeight:800, fontSize:13, cursor:'pointer',
                boxShadow:'0 2px 8px rgba(8,145,178,0.35)',
                border:'3px solid #fff',
              }}>
                YP
              </div>
            </div>
          </header>

          {/* ── Sayfa içeriği ── */}
          <div style={{ flex:1, overflowY:'auto', padding:28 }} className="yp-scrollbar">
            <div style={{ maxWidth:1280, margin:'0 auto' }}>

              {/* Hata */}
              {dbError && (
                <div style={{
                  background:'#FEF2F2', borderLeft:`4px solid #DC2626`,
                  padding:'16px 20px', marginBottom:28,
                  borderRadius:'0 12px 12px 0',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, color:'#991B1B', fontWeight:700, marginBottom:6 }}>
                    <AlertCircle size={18} /> Veritabanı Uyarısı
                  </div>
                  <p style={{ fontSize:13, color:'#B91C1C', fontWeight:500 }}>{dbError}</p>
                </div>
              )}

              {/* Yükleniyor */}
              {isLoading ? (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:280, gap:14 }}>
                  <span className="yp-spin" style={{ color: T.teal, display:'flex' }}><RefreshCw size={38} /></span>
                  <p style={{ color: T.textSecondary, fontWeight:500 }}>Supabase verileri yükleniyor…</p>
                </div>
              ) : (
                <>
                  {activeTab === 'dashboard'  && <DashboardView customers={customers} samples={samples} prices={prices} notes={notes} />}
                  {activeTab === 'customers'  && <CustomersView data={customers} />}
                  {activeTab === 'samples'    && <SamplesView data={samples} />}
                  {activeTab === 'prices'     && <PricesView data={prices} />}
                  {activeTab === 'cost'       && <CostView data={costs} />}
                  {activeTab === 'notes'      && <NotesView data={notes} />}
                  {activeTab === 'offers' && (
                    <div style={{
                      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                      height:'60vh', background: T.surface, borderRadius:20,
                      border:`2px dashed ${T.border2}`,
                    }}>
                      <div style={{ width:72, height:72, borderRadius:'50%', background: T.pageBg, display:'flex', alignItems:'center', justifyContent:'center', color: T.border2, marginBottom:20 }}>
                        <Smartphone size={32} />
                      </div>
                      <h3 style={{ fontSize:22, fontWeight:800, color: T.textPrimary }}>Modül Hazırlanıyor</h3>
                      <p style={{ color: T.textSecondary, marginTop:8, textAlign:'center', maxWidth:380 }}>
                        "Teklifler" modülü üzerinde çalışmalarımız devam ediyor.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// ============================================================================
// ÖZET PANELİ (Dashboard)
// ============================================================================
function DashboardView({ customers, samples, prices, notes }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:28 }}>

      {/* KPI Kartları */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:18 }}>
        <KpiCard title="Toplam Müşteri"   value={customers.length || '0'} icon={Users}           gradient="linear-gradient(135deg,#0672A0,#0891B2)" glow="rgba(8,145,178,0.3)" />
        <KpiCard title="Numune Kaydı"     value={samples.length   || '0'} icon={Package}         gradient="linear-gradient(135deg,#C2410C,#EA580C)"  glow="rgba(234,88,12,0.3)" />
        <KpiCard title="Fiyat Kalemi"     value={prices.length    || '0'} icon={CircleDollarSign} gradient="linear-gradient(135deg,#15803D,#16A34A)"  glow="rgba(22,163,74,0.3)" />
        <KpiCard title="Bağlantı Durumu"  value="Aktif"                   icon={CheckCircle}     gradient="linear-gradient(135deg,#162332,#1E2D3D)"  glow="rgba(30,45,61,0.35)" badge="Supabase Bağlı" />
      </div>

      {/* Alt iki blok */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:20 }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:20 }}>

          {/* Son Numune Talepleri */}
          <div style={{ background: T.surface, borderRadius:20, border:`1px solid ${T.border}`, overflow:'hidden', boxShadow:'0 1px 8px rgba(10,20,35,0.07)' }}>
            <div style={{ padding:'18px 24px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <h3 style={{ fontSize:15, fontWeight:800, color: T.textPrimary }}>Son Numune Talepleri</h3>
              <button style={{
                fontSize:12, fontWeight:700, color: T.teal,
                background: T.tealSoft, border:'none', borderRadius:8,
                padding:'6px 12px', cursor:'pointer', display:'flex', alignItems:'center', gap:4,
              }}>
                Tümü <ArrowRight size={14} />
              </button>
            </div>
            <div>
              {samples.slice(0, 5).map((s, idx) => (
                <div key={s.id || idx} style={{
                  padding:'14px 24px',
                  borderBottom: idx < 4 ? `1px solid ${T.border}` : 'none',
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  transition:'background .15s',
                }} className="yp-anim"
                  onMouseEnter={e => e.currentTarget.style.background = '#F7FAFB'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <div style={{ width:44, height:44, borderRadius:14, background: T.tealSoft, display:'flex', alignItems:'center', justifyContent:'center', color: T.teal, flexShrink:0 }}>
                      <Package size={20} />
                    </div>
                    <div>
                      <p style={{ fontWeight:700, fontSize:13, color: T.textPrimary }}>
                        {getVal(s, ['musteri','müşteri','firma','firmaadi','firmaadı','customer','isim','alici','alıcı','kime'])}
                      </p>
                      <p style={{ fontSize:11, color: T.textSecondary, marginTop:2 }}>
                        {getDebugVal(s, ['cinsi','cins','urun','ürün','type','iplik','kalite','detay','aciklama','açıklama'])}
                        <span style={{ margin:'0 6px', color: T.border2 }}>•</span>
                        <span style={{ color: T.teal, fontWeight:600 }}>
                          {getDebugVal(s, ['miktar','quantity','kg','adet','agirlik','ağırlık','gramaj','kilo','bobin'])}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span className="mono" style={{ fontSize:10, color: T.textSecondary, background: T.pageBg, padding:'4px 8px', borderRadius:6, fontWeight:600 }}>
                      {formatDate(getVal(s, ['tarih','date','created_at','eklenme']))}
                    </span>
                    <StatusBadge status={getVal(s, ['durum','status','asama','aşama'], 'Beklemede')} />
                  </div>
                </div>
              ))}
              {samples.length === 0 && (
                <div style={{ padding:24, textAlign:'center', color: T.textSecondary, fontSize:13 }}>Henüz numune kaydı yok.</div>
              )}
            </div>
          </div>

          {/* Son Notlar */}
          <div style={{ background: T.surface, borderRadius:20, border:`1px solid ${T.border}`, overflow:'hidden', boxShadow:'0 1px 8px rgba(10,20,35,0.07)', display:'flex', flexDirection:'column' }}>
            <div style={{ padding:'18px 24px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <h3 style={{ fontSize:15, fontWeight:800, color: T.textPrimary }}>Son Notlar</h3>
              <button style={{ width:32, height:32, borderRadius:'50%', background: T.pageBg, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color: T.textSecondary }}>
                <Plus size={16} />
              </button>
            </div>
            <div style={{ padding:'20px 24px', flex:1, display:'flex', flexDirection:'column', gap:20 }}>
              {notes.slice(0, 3).map((note, idx) => (
                <div key={note.id || idx} style={{ position:'relative', paddingLeft:18 }}>
                  {idx < 2 && <div style={{ position:'absolute', left:6, top:18, bottom:-20, width:2, background: T.border }} />}
                  <div style={{ position:'absolute', left:-1, top:4, width:14, height:14, borderRadius:'50%', background: T.surface, border:`3px solid ${T.teal}`, boxShadow:`0 0 0 2px ${T.tealGlow}` }} />
                  <h4 style={{ fontSize:13, fontWeight:700, color: T.textPrimary }}>
                    {getVal(note, ['baslik','başlık','title','konu'])}
                  </h4>
                  <p style={{ fontSize:12, color: T.textSecondary, marginTop:4, lineHeight:1.5,
                    overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                    {getVal(note, ['icerik','içerik','content','not','detay'])}
                  </p>
                  <span className="mono" style={{ fontSize:10, color: T.textSecondary, display:'block', marginTop:6, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em' }}>
                    {formatDate(getVal(note, ['tarih','date','created_at']))}
                  </span>
                </div>
              ))}
              {notes.length === 0 && <div style={{ textAlign:'center', color: T.textSecondary, fontSize:12, marginTop:12 }}>Not bulunamadı.</div>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MÜŞTERİLER
// ============================================================================
function CustomersView({ data }) {
  return (
    <div style={{ background: T.surface, borderRadius:20, border:`1px solid ${T.border}`, overflow:'hidden', boxShadow:'0 1px 8px rgba(10,20,35,0.07)' }}>
      <div style={{ padding:'20px 28px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h3 style={{ fontSize:17, fontWeight:800, color: T.textPrimary }}>Müşteri Portföyü</h3>
          <p style={{ fontSize:12, color: T.textSecondary, marginTop:3 }}>Sistemde kayıtlı tüm firmalar ve iletişim bilgileri.</p>
        </div>
        <button style={{
          background:'linear-gradient(135deg,#0672A0,#0891B2)',
          color:'#fff', border:'none', borderRadius:12,
          padding:'10px 18px', fontSize:13, fontWeight:700, cursor:'pointer',
          display:'flex', alignItems:'center', gap:6,
          boxShadow:'0 4px 12px rgba(8,145,178,0.35)',
        }}>
          <Plus size={16} /> Yeni Müşteri
        </button>
      </div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr style={{ background: T.pageBg, fontSize:11, fontWeight:700, color: T.textSecondary, textTransform:'uppercase', letterSpacing:'.07em' }}>
              {['Firma Adı','İletişim Kişisi','Telefon','Durum','İşlem'].map((h, i) => (
                <th key={i} style={{ padding:'12px 24px', textAlign: i === 4 ? 'right' : 'left', borderBottom:`1px solid ${T.border2}`, whiteSpace:'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((c, idx) => (
              <tr key={c.id || idx}
                style={{ borderBottom:`1px solid ${T.border}`, transition:'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = T.tealSoft}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding:'14px 24px', fontWeight:700, color: T.textPrimary }}>
                  {getVal(c, ['firma','firmaadi','firmaadı','name','musteri','müşteri','unvan'])}
                </td>
                <td style={{ padding:'14px 24px', color: T.textSecondary }}>
                  {getVal(c, ['yetkili','contact','isim','iletisim','iletişim','kisi','kişi'])}
                </td>
                <td style={{ padding:'14px 24px', color: T.textSecondary }} className="mono">
                  {getVal(c, ['telefon','tel','phone','cep','gsm','numara'])}
                </td>
                <td style={{ padding:'14px 24px' }}>
                  <StatusBadge status={getVal(c, ['durum','status'], 'Aktif')} />
                </td>
                <td style={{ padding:'14px 24px', textAlign:'right' }}>
                  <button style={{ background:'none', border:'none', cursor:'pointer', color: T.border2, padding:6, borderRadius:8 }}
                    onMouseEnter={e => e.currentTarget.style.color = T.teal}
                    onMouseLeave={e => e.currentTarget.style.color = T.border2}
                  >
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan="5" style={{ padding:28, textAlign:'center', color: T.textSecondary }}>Kayıt bulunamadı.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// NUMUNELER
// ============================================================================
function SamplesView({ data }) {
  return (
    <div style={{ background: T.surface, borderRadius:20, border:`1px solid ${T.border}`, overflow:'hidden', boxShadow:'0 1px 8px rgba(10,20,35,0.07)' }}>
      <div style={{ padding:'20px 28px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h3 style={{ fontSize:17, fontWeight:800, color: T.textPrimary }}>Numune Takibi</h3>
          <p style={{ fontSize:12, color: T.textSecondary, marginTop:3 }}>Müşterilere gönderilen numunelerin anlık durumları.</p>
        </div>
        <button style={{
          background:'linear-gradient(135deg,#C2410C,#EA580C)',
          color:'#fff', border:'none', borderRadius:12,
          padding:'10px 18px', fontSize:13, fontWeight:700, cursor:'pointer',
          display:'flex', alignItems:'center', gap:6,
          boxShadow:'0 4px 12px rgba(234,88,12,0.35)',
        }}>
          <Plus size={16} /> Numune Talebi
        </button>
      </div>
      <div style={{ padding:20, display:'flex', flexDirection:'column', gap:12 }}>
        {data.map((s, idx) => (
          <div key={s.id || idx} className="yp-anim" style={{
            display:'flex', alignItems:'center', gap:16, padding:'16px 20px',
            background: T.surface, border:`1px solid ${T.border}`,
            borderRadius:16, cursor:'pointer',
            transition:'border-color .18s, box-shadow .18s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.boxShadow = `0 4px 16px ${T.tealGlow}`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width:52, height:52, borderRadius:16, background: T.tealSoft, display:'flex', alignItems:'center', justifyContent:'center', color: T.teal, flexShrink:0 }}>
              <Package size={22} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <h4 style={{ fontWeight:800, fontSize:14, color: T.textPrimary }}>
                  {getVal(s, ['musteri','müşteri','firma','firmaadi','firmaadı','customer','isim','alici','alıcı','kime'])}
                </h4>
                <StatusBadge status={getVal(s, ['durum','status','asama','aşama'], 'Bekliyor')} />
              </div>
              <p style={{ fontSize:12, color: T.textSecondary, marginTop:4 }}>
                {getDebugVal(s, ['cinsi','cins','urun','ürün','type','iplik','kalite','detay','aciklama','açıklama'])}
                <span style={{ margin:'0 6px', color: T.border2 }}>•</span>
                <strong style={{ color: T.teal }}>
                  {getDebugVal(s, ['miktar','quantity','kg','adet','agirlik','ağırlık','gramaj','kilo','bobin'])}
                </strong>
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:8, fontSize:11, color: T.textSecondary, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em' }} className="mono">
                <Clock size={12} />
                {formatDate(getVal(s, ['tarih','date','created_at','zaman']))}
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div style={{ padding:24, textAlign:'center', color: T.textSecondary, border:`1px solid ${T.border}`, borderRadius:14 }}>Kayıt bulunamadı.</div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// FİYATLAR
// ============================================================================
function PricesView({ data }) {
  return (
    <div style={{ background: T.surface, borderRadius:20, border:`1px solid ${T.border}`, overflow:'hidden', boxShadow:'0 1px 8px rgba(10,20,35,0.07)' }}>
      <div style={{ padding:'20px 28px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h3 style={{ fontSize:17, fontWeight:800, color: T.textPrimary }}>Güncel İplik Fiyatları</h3>
          <p style={{ fontSize:12, color: T.textSecondary, marginTop:3 }}>Ürün bazında piyasa ve satış fiyatlandırmaları.</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <button style={{ background:'none', border:`1px solid ${T.border2}`, borderRadius:12, padding:'10px 16px', fontSize:12, fontWeight:700, color: T.textSecondary, cursor:'pointer' }}>
            Dışa Aktar
          </button>
          <button style={{
            background:'linear-gradient(135deg,#15803D,#16A34A)',
            color:'#fff', border:'none', borderRadius:12,
            padding:'10px 18px', fontSize:13, fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', gap:6,
            boxShadow:'0 4px 12px rgba(22,163,74,0.35)',
          }}>
            <Plus size={16} /> Fiyat Ekle
          </button>
        </div>
      </div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr style={{ background: T.pageBg, fontSize:11, fontWeight:700, color: T.textSecondary, textTransform:'uppercase', letterSpacing:'.07em' }}>
              {['Ürün / Kalite','Birim Fiyat','Birim','Son Güncelleme'].map((h, i) => (
                <th key={i} style={{ padding:'12px 24px', textAlign:'left', borderBottom:`1px solid ${T.border2}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((p, idx) => (
              <tr key={p.id || idx}
                style={{ borderBottom:`1px solid ${T.border}`, transition:'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = T.greenSoft}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding:'16px 24px', fontWeight:700, fontSize:14, color: T.textPrimary }}>
                  {getVal(p, ['urun','ürün','kalite','item','isim','cinsi','cins'])}
                </td>
                <td style={{ padding:'16px 24px', color:'#15803D', fontWeight:900, fontSize:16 }} className="mono">
                  {getVal(p, ['fiyat','price','tutar'])}
                </td>
                <td style={{ padding:'16px 24px', color: T.textSecondary, fontWeight:500 }}>
                  {getVal(p, ['birim','unit'], 'kg')}
                </td>
                <td style={{ padding:'16px 24px', color: T.textSecondary, fontWeight:500 }} className="mono">
                  {formatDate(getVal(p, ['tarih','updatedate','created_at']))}
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan="4" style={{ padding:28, textAlign:'center', color: T.textSecondary }}>Kayıt bulunamadı.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// MALİYET
// ============================================================================
function CostView({ data }) {
  return (
    <div style={{ background: T.surface, borderRadius:20, border:`1px solid ${T.border}`, overflow:'hidden', boxShadow:'0 1px 8px rgba(10,20,35,0.07)' }}>
      <div style={{ padding:'20px 28px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <div>
          <h3 style={{ fontSize:17, fontWeight:800, color: T.textPrimary }}>İplik Maliyet Hesaplama</h3>
          <p style={{ fontSize:12, color: T.textSecondary, marginTop:3 }}>Hammadde, fire ve işletme giderleri dahil üretim maliyetleri.</p>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <select style={{
            background: T.pageBg, border:`1px solid ${T.border2}`,
            color: T.textPrimary, fontWeight:600, fontSize:12,
            borderRadius:12, padding:'10px 14px', cursor:'pointer',
            fontFamily:'Inter,sans-serif', outline:'none',
          }}>
            <option>1. Tesis (Ana Fabrika)</option>
            <option>2. Tesis</option>
            <option>Tüm Tesisler</option>
          </select>
          <button style={{
            background:'linear-gradient(135deg,#0672A0,#0891B2)',
            color:'#fff', border:'none', borderRadius:12,
            padding:'10px 18px', fontSize:13, fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', gap:6,
            boxShadow:'0 4px 12px rgba(8,145,178,0.35)',
          }}>
            <RefreshCw size={15} /> Güncelle
          </button>
        </div>
      </div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, whiteSpace:'nowrap' }}>
          <thead>
            <tr style={{ background: T.pageBg, fontSize:10, fontWeight:700, color: T.textSecondary, textTransform:'uppercase', letterSpacing:'.1em' }}>
              {['Cinsi','Ne','Harman','Boya','No','Fire','Hammadde','Maliyet','İşlem'].map((h, i) => (
                <th key={i} style={{ padding:'11px 18px', textAlign: i === 8 ? 'center' : 'left', borderBottom:`1px solid ${T.border2}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || idx}
                style={{ borderBottom:`1px solid ${T.border}`, transition:'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = T.pageBg}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding:'13px 18px', fontWeight:700, color: T.textPrimary }}>
                  {getVal(item, ['cinsi','urun','ürün','iplik'])}
                </td>
                <td style={{ padding:'13px 18px' }}>
                  <span className="mono" style={{ background: T.tealSoft, color: T.teal, fontWeight:800, padding:'4px 10px', borderRadius:8 }}>
                    {getVal(item, ['ne','numara','kalinlik'])}
                  </span>
                </td>
                <td style={{ padding:'13px 18px', color: T.textSecondary }}>
                  {getVal(item, ['harman','karisim','karışım','icerik'])}
                </td>
                <td style={{ padding:'13px 18px', color: T.textSecondary }}>
                  {getVal(item, ['boya','renk','color'])}
                </td>
                <td style={{ padding:'13px 18px' }}>
                  <span className="mono" style={{ background: T.pageBg, border:`1px solid ${T.border2}`, color: T.textSecondary, fontSize:10, padding:'3px 8px', borderRadius:6, fontWeight:700 }}>
                    {getVal(item, ['no','id'])}
                  </span>
                </td>
                <td style={{ padding:'13px 18px', color:'#991B1B', fontWeight:700 }} className="mono">
                  {getVal(item, ['fire','kayip','fireorani'])}
                </td>
                <td style={{ padding:'13px 18px', color: T.textSecondary }} className="mono">
                  {getVal(item, ['hammadde','hammaddefiyati','materyal'])}
                </td>
                <td style={{ padding:'13px 18px', color:'#15803D', fontWeight:900, fontSize:14 }} className="mono">
                  {getVal(item, ['maliyet','toplam','cost'])}
                </td>
                <td style={{ padding:'13px 18px', textAlign:'center' }}>
                  <div style={{ display:'flex', justifyContent:'center', gap:8 }}>
                    <button style={{ background:'none', border:'none', cursor:'pointer', color: T.border2, padding:4, borderRadius:6 }}
                      onMouseEnter={e => e.currentTarget.style.color = T.teal}
                      onMouseLeave={e => e.currentTarget.style.color = T.border2}
                    ><Edit2 size={14} /></button>
                    <button style={{ background:'none', border:'none', cursor:'pointer', color: T.border2, padding:4, borderRadius:6 }}
                      onMouseEnter={e => e.currentTarget.style.color = '#DC2626'}
                      onMouseLeave={e => e.currentTarget.style.color = T.border2}
                    ><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan="9" style={{ padding:28, textAlign:'center', color: T.textSecondary }}>Kayıt bulunamadı.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// NOTLARIM
// ============================================================================
function NotesView({ data }) {
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24, flexWrap:'wrap', gap:14 }}>
        <div>
          <h3 style={{ fontSize:26, fontWeight:800, color: T.textPrimary, letterSpacing:'-.02em' }}>Kişisel Notlar</h3>
          <p style={{ color: T.textSecondary, marginTop:4, fontWeight:500 }}>Önemli toplantılar, hatırlatmalar ve planlar.</p>
        </div>
        <button style={{
          background:'linear-gradient(135deg,#4F46E5,#6366F1)',
          color:'#fff', border:'none', borderRadius:12,
          padding:'11px 20px', fontSize:13, fontWeight:700, cursor:'pointer',
          display:'flex', alignItems:'center', gap:6,
          boxShadow:'0 4px 12px rgba(99,102,241,0.35)',
        }}>
          <Plus size={16} /> Yeni Not Ekle
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:18 }}>
        {data.map((note, idx) => (
          <div key={note.id || idx} className="yp-anim" style={{
            background:'#FFFBEB', border:'1px solid #FDE68A',
            borderRadius:18, padding:24, position:'relative',
            cursor:'pointer', transition:'box-shadow .18s, transform .18s',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(217,119,6,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <h4 style={{ fontWeight:800, fontSize:15, color: T.textPrimary, marginBottom:10, paddingRight:24 }}>
              {getVal(note, ['baslik','başlık','title','konu'])}
            </h4>
            <p style={{ fontSize:13, color:'#78350F', lineHeight:1.6, marginBottom:32,
              overflow:'hidden', display:'-webkit-box', WebkitLineClamp:4, WebkitBoxOrient:'vertical' }}>
              {getVal(note, ['icerik','içerik','content','detay'])}
            </p>
            <div style={{ position:'absolute', bottom:16, left:24, display:'flex', alignItems:'center', gap:5, fontSize:10, color:'#92400E', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em' }} className="mono">
              <Clock size={11} /> {formatDate(getVal(note, ['tarih','date','created_at']))}
            </div>
            <button style={{ position:'absolute', top:16, right:16, background:'none', border:'none', cursor:'pointer', color:'#FCD34D', fontSize:16 }}
              onMouseEnter={e => e.currentTarget.style.color = '#DC2626'}
              onMouseLeave={e => e.currentTarget.style.color = '#FCD34D'}
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {data.length === 0 && (
          <div style={{ gridColumn:'1/-1', padding:28, textAlign:'center', color: T.textSecondary, background: T.surface, borderRadius:18, border:`1px solid ${T.border}` }}>
            Kayıtlı not bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// YARDIMCI BİLEŞENLER
// ============================================================================
function KpiCard({ title, value, icon: Icon, gradient, glow, badge }) {
  return (
    <div style={{
      background: T.surface, borderRadius:18, padding:'22px 24px',
      border:`1px solid ${T.border}`,
      boxShadow:'0 1px 8px rgba(10,20,35,0.07)',
      position:'relative', overflow:'hidden',
      transition:'box-shadow .22s, transform .22s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 24px rgba(10,20,35,0.1)'; e.currentTarget.style.transform='translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='0 1px 8px rgba(10,20,35,0.07)'; e.currentTarget.style.transform='translateY(0)'; }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <p style={{ fontSize:10, fontWeight:700, color: T.textSecondary, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:8 }}>{title}</p>
          <h3 style={{ fontSize:30, fontWeight:900, color: T.textPrimary, letterSpacing:'-.02em', lineHeight:1 }} className="mono">{value}</h3>
        </div>
        <div style={{
          width:50, height:50, borderRadius:14,
          background: gradient,
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', boxShadow: `0 4px 14px ${glow}`,
          flexShrink:0,
        }}>
          <Icon size={22} />
        </div>
      </div>
      <div style={{ marginTop:16, fontSize:10, fontWeight:700, color: T.textSecondary, background: T.pageBg, display:'inline-flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:8, border:`1px solid ${T.border}` }}>
        {badge || 'Canlı Veri'}
      </div>
      {/* Dekoratif daire */}
      <div style={{ position:'absolute', right:-20, bottom:-20, width:100, height:100, borderRadius:'50%', background: gradient, opacity:.05 }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    'Aktif':        { bg:'rgba(21,128,61,0.1)',   color:'#15803D', border:'rgba(21,128,61,0.25)' },
    'Pasif':        { bg:'rgba(71,85,105,0.1)',   color:'#475569', border:'rgba(71,85,105,0.2)'  },
    'Beklemede':    { bg:'rgba(217,119,6,0.1)',   color:'#B45309', border:'rgba(217,119,6,0.25)' },
    'Bekliyor':     { bg:'rgba(217,119,6,0.1)',   color:'#B45309', border:'rgba(217,119,6,0.25)' },
    'Gönderildi':   { bg:'rgba(29,78,216,0.1)',   color:'#1D4ED8', border:'rgba(29,78,216,0.25)' },
    'Hazırlanıyor': { bg:'rgba(91,33,182,0.1)',   color:'#5B21B6', border:'rgba(91,33,182,0.25)' },
    'Onaylandı':    { bg:'rgba(21,128,61,0.1)',   color:'#15803D', border:'rgba(21,128,61,0.25)' },
    'Takip Et':     { bg:'rgba(8,145,178,0.1)',   color:'#0891B2', border:'rgba(8,145,178,0.25)' },
    'Reddedildi':   { bg:'rgba(153,27,27,0.1)',   color:'#991B1B', border:'rgba(153,27,27,0.25)' },
  };
  const style = map[status] || { bg:'rgba(71,85,105,0.1)', color:'#475569', border:'rgba(71,85,105,0.2)' };
  return (
    <span style={{
      padding:'4px 11px', borderRadius:8,
      fontSize:11, fontWeight:700,
      background: style.bg, color: style.color,
      border: `1px solid ${style.border}`,
      whiteSpace:'nowrap',
    }}>
      {status}
    </span>
  );
}
