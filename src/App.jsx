import React, { useState, useRef, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import { MessageBubble } from './components/MessageBubble';
import { generateResponse, QUICK_ACTIONS } from './data/botData';

// Typing animation dot
const TypingDot = ({ delay = '0s' }) => (
  <div style={{
    width: '8px', height: '8px',
    background: 'linear-gradient(135deg, #818cf8, #c084fc)',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out',
    animationDelay: delay,
    animationFillMode: 'both'
  }} />
);

const INIT_MESSAGE = {
  id: 1,
  sender: 'bot',
  results: [],
  suggKey: 'default',
  text: `👋 Welcome to **BuyerBot AI** — your smart shopping companion!

I'm here to help you shop smarter. Ask me about:
• 🔍 Products, prices & comparisons
• 📦 Order tracking
• 🔄 Return & refund policies
• 🚚 Shipping & delivery
• 💳 Payment help
• 🏷️ Coupons & deals

Type a message or click a Quick Action below ↓`,
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const App = () => {
  const [messages, setMessages] = useState([INIT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [stats, setStats] = useState({ messages: 0, searches: 0 });

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isSearching]);

  // Category click → auto-send search
  useEffect(() => {
    if (activeCategory) {
      sendMessage(`Show me best ${activeCategory} products and deals`);
    }
  }, [activeCategory]);

  const sendMessage = useCallback(async (textOverride) => {
    const text = (textOverride || input).trim();
    if (!text || isTyping || isSearching) return;

    setInput('');
    inputRef.current?.focus();

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      results: [],
      suggKey: null,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setStats(s => ({ ...s, messages: s.messages + 1 }));
    setIsTyping(true);

    setTimeout(async () => {
      const resp = await generateResponse(text, (val) => {
        setIsSearching(val);
        if (val) setStats(s => ({ ...s, searches: s.searches + 1 }));
      });
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: resp.text,
        results: resp.results,
        suggKey: resp.suggKey,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 400);
  }, [input, isTyping, isSearching]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([INIT_MESSAGE]);
    setStats({ messages: 0, searches: 0 });
    setActiveCategory(null);
  };

  const busy = isTyping || isSearching;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* ── Sidebar ── */}
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        stats={stats}
        onClearChat={handleClearChat}
      />

      {/* ── Main chat area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <div className="glass" style={{
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '10px', height: '10px',
              background: '#10b981', borderRadius: '50%',
              animation: 'pulse-ring 2s infinite'
            }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#e2e8f0' }}>
              Buyer Help Assistant
            </span>
            <span style={{
              fontSize: '0.65rem', padding: '2px 8px',
              background: 'rgba(99,102,241,0.2)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '9999px', color: '#a5b4fc', fontWeight: 500
            }}>AI Powered</span>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#475569' }}>
            {messages.length} messages
          </span>
        </div>

        {/* Quick actions bar */}
        <div className="glass" style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', gap: '8px', flexWrap: 'wrap',
          flexShrink: 0
        }}>
          {QUICK_ACTIONS.map((a, i) => (
            <button
              key={i}
              className="quick-btn"
              onClick={() => sendMessage(a.text)}
              disabled={busy}
              style={{
                padding: '5px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '9999px', fontSize: '0.77rem',
                color: '#94a3b8', cursor: busy ? 'not-allowed' : 'pointer',
                fontWeight: 500, transition: 'all 0.2s',
                opacity: busy ? 0.5 : 1,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Messages list */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          {messages.map(m => (
            <MessageBubble key={m.id} msg={m} onSuggest={sendMessage} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="fade-up" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem',
                boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
                animation: 'glow 2s ease-in-out infinite'
              }}>🤖</div>
              <div style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px', borderBottomLeftRadius: '4px',
                padding: '14px 18px', backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <TypingDot delay="0s" />
                  <TypingDot delay="0.2s" />
                  <TypingDot delay="0.4s" />
                </div>
              </div>
            </div>
          )}

          {/* Searching indicator */}
          {isSearching && (
            <div className="fade-up" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(6,182,212,0.4)'
              }}>🔍</div>
              <div style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px', borderBottomLeftRadius: '4px',
                padding: '12px 18px', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <div style={{
                  background: 'linear-gradient(90deg, rgba(99,102,241,0) 0%, rgba(99,102,241,0.5) 50%, rgba(99,102,241,0) 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                  height: '2px', width: '80px', borderRadius: '2px'
                }} />
                <span style={{ fontSize: '0.8rem', color: '#67e8f9', fontStyle: 'italic', fontWeight: 500 }}>
                  Searching the web…
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="glass" style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything about shopping…"
              disabled={busy}
              style={{
                flex: 1, padding: '12px 18px',
                background: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.12)',
                borderRadius: '12px', fontSize: '0.9rem',
                color: '#e2e8f0', transition: 'all 0.25s',
                fontFamily: 'Inter, sans-serif',
                backdropFilter: 'blur(10px)',
                opacity: busy ? 0.7 : 1
              }}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || busy}
              style={{
                padding: '12px 22px', flexShrink: 0,
                background: (!input.trim() || busy)
                  ? 'rgba(99,102,241,0.3)'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none', borderRadius: '12px',
                color: 'white', fontSize: '0.9rem', fontWeight: 700,
                cursor: (!input.trim() || busy) ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s', whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
                boxShadow: (!input.trim() || busy) ? 'none' : '0 4px 15px rgba(99,102,241,0.4)'
              }}
            >
              Send ➤
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.65rem', color: '#334155', marginTop: '8px' }}>
            Press Enter to send &nbsp;•&nbsp; BuyerBot AI v2.0 &nbsp;•&nbsp; Powered by Smart Response Engine
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;