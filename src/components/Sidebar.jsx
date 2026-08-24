import React from 'react';
import { CATEGORIES } from '../data/botData';

const Sidebar = ({ activeCategory, setActiveCategory, stats, onClearChat }) => (
  <div
    className="glass"
    style={{
      width: '230px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(255,255,255,0.08)',
      padding: '20px 0',
      height: '100%',
      overflowY: 'auto',
    }}
  >
    {/* Logo */}
    <div style={{ padding: '0 18px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', animation: 'float 3s ease-in-out infinite'
        }}>🛒</div>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }} className="gradient-text">BuyerBot</div>
          <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 500 }}>AI Shopping Assistant</div>
        </div>
      </div>
      {/* Online badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
        borderRadius: '8px', padding: '5px 10px',
        fontSize: '0.72rem', fontWeight: 600, color: '#34d399'
      }}>
        <span style={{
          width: '7px', height: '7px', background: '#10b981',
          borderRadius: '50%', animation: 'pulse-ring 2s infinite'
        }} />
        Online • AI Ready
      </div>
    </div>

    {/* Session Stats */}
    <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
        Session Stats
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { val: stats.messages, label: 'Messages' },
          { val: stats.searches, label: 'Searches' },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: 'rgba(255,255,255,0.05)',
            borderRadius: '10px', padding: '8px',
            textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#818cf8' }}>{s.val}</div>
            <div style={{ fontSize: '0.6rem', color: '#64748b' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Shop Categories */}
    <div style={{ padding: '14px 18px', flex: 1 }}>
      <div style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
        Shop Categories
      </div>
      {CATEGORIES.map(cat => (
        <button
          key={cat.label}
          className={`sidebar-item ${activeCategory === cat.label ? 'active' : ''}`}
          onClick={() => setActiveCategory(cat.label === activeCategory ? null : cat.label)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 10px', borderRadius: '9px',
            background: 'transparent', border: 'none',
            color: activeCategory === cat.label ? '#a5b4fc' : '#94a3b8',
            cursor: 'pointer', fontSize: '0.8375rem', fontWeight: 500,
            transition: 'all 0.2s', textAlign: 'left',
            fontFamily: 'Inter, sans-serif', marginBottom: '2px',
            borderLeft: activeCategory === cat.label ? '3px solid #818cf8' : '3px solid transparent',
          }}
        >
          <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>

    {/* Clear Chat + Footer */}
    <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        className="clear-btn"
        onClick={onClearChat}
        style={{
          width: '100%', padding: '9px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: '10px', color: '#f87171',
          cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
          transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px'
        }}
      >
        🗑️ Clear Chat
      </button>
      <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#334155', marginTop: '10px' }}>
        BuyerBot v2.0 • Made with ❤️
      </div>
    </div>
  </div>
);

export default Sidebar;
