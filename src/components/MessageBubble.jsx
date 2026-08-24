import React, { useState } from 'react';

export const SearchResultCard = ({ result, idx }) => (
  <div
    className="result-card glass fade-up"
    style={{
      borderRadius: '14px',
      padding: '14px 16px',
      border: '1px solid rgba(255,255,255,0.12)',
      transition: 'all 0.25s ease',
      animationDelay: `${idx * 0.08}s`,
      cursor: 'pointer',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
      <h3 style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0, flex: 1, lineHeight: 1.4 }}>
        <a href={result.url} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'none' }}>
          {result.title}
        </a>
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {result.rating && (
          <span style={{ color: '#f59e0b', fontSize: '0.75rem', fontWeight: 600 }}>★ {result.rating}</span>
        )}
        <span style={{
          fontSize: '0.65rem', color: '#94a3b8',
          background: 'rgba(255,255,255,0.08)',
          padding: '2px 8px', borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.1)',
          fontWeight: 500, whiteSpace: 'nowrap'
        }}>
          {result.source}
        </span>
      </div>
    </div>
    <p style={{ fontSize: '0.8375rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 10px' }}>
      {result.snippet}
    </p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>🔗 Web Result</span>
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '0.75rem', color: '#818cf8', textDecoration: 'none',
          padding: '4px 12px',
          background: 'rgba(99,102,241,0.15)',
          borderRadius: '7px', fontWeight: 600,
          border: '1px solid rgba(99,102,241,0.3)',
          transition: 'all 0.2s'
        }}
      >
        Visit →
      </a>
    </div>
  </div>
);

export const SuggestionChips = ({ suggKey, onSelect }) => {
  const SUGGESTIONS = {
    track:    ['Show carrier tracking sites', 'Amazon order tracking', 'Order not arrived yet?'],
    return:   ['Amazon return process', 'How to get a refund?', 'Free return shipping?'],
    shipping: ['Express delivery options', 'International shipping', 'Free shipping tips'],
    payment:  ['Safe payment methods', 'Dispute a charge', 'Buy now pay later options'],
    default:  ['Find best prices', 'Compare products', 'Read reviews'],
  };
  const chips = SUGGESTIONS[suggKey] || SUGGESTIONS.default;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: '10px', marginLeft: '46px' }}>
      {chips.map((c, i) => (
        <button
          key={i}
          className="action-chip"
          onClick={() => onSelect(c)}
          style={{
            fontSize: '0.75rem', padding: '5px 12px',
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '9999px', color: '#a5b4fc',
            cursor: 'pointer', fontWeight: 500,
            transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
            animationDelay: `${i * 0.07}s`
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export const MessageBubble = ({ msg, onSuggest }) => {
  const isUser = msg.sender === 'user';
  const [copied, setCopied] = useState(false);
  const [reacted, setReacted] = useState(null);

  const handleCopy = () => {
    navigator.clipboard?.writeText(msg.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fade-up">
      <div style={{
        display: 'flex', gap: '10px',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start'
      }}>
        {!isUser && (
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px', flexShrink: 0,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(99,102,241,0.4)'
          }}>🤖</div>
        )}

        <div style={{ maxWidth: '75%' }}>
          <div style={{
            padding: '12px 16px', borderRadius: '16px',
            ...(isUser ? {
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderBottomRightRadius: '4px',
              boxShadow: '0 4px 15px rgba(99,102,241,0.35)'
            } : {
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderBottomLeftRadius: '4px',
              backdropFilter: 'blur(10px)'
            })
          }}>
            <div style={{
              fontSize: '0.875rem', lineHeight: 1.7,
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              color: isUser ? 'white' : '#e2e8f0'
            }}>
              {msg.text}
            </div>
            <div style={{
              fontSize: '0.65rem', marginTop: '6px',
              color: isUser ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'
            }}>
              <span>{msg.time}</span>
              {!isUser && (
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <button
                    className="copy-btn"
                    onClick={handleCopy}
                    title="Copy message"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: copied ? '#34d399' : '#64748b',
                      fontSize: '0.7rem', padding: '2px 6px',
                      borderRadius: '5px', transition: 'all 0.2s',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {copied ? '✓ Copied' : '⎘ Copy'}
                  </button>
                  {['👍', '👎'].map(r => (
                    <button
                      key={r}
                      className="reaction-btn"
                      onClick={() => setReacted(r)}
                      title={r === '👍' ? 'Helpful' : 'Not helpful'}
                      style={{
                        background: reacted === r
                          ? (r === '👍' ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)')
                          : 'none',
                        border: 'none', cursor: 'pointer',
                        fontSize: '0.75rem', padding: '2px 5px',
                        borderRadius: '5px', transition: 'all 0.2s'
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {isUser && (
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px', flexShrink: 0,
            background: 'linear-gradient(135deg, #0891b2, #0284c7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(6,182,212,0.3)'
          }}>👤</div>
        )}
      </div>

      {!isUser && msg.results && msg.results.length > 0 && (
        <div style={{ marginLeft: '48px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {msg.results.map((r, i) => (
            <SearchResultCard key={i} result={r} idx={i} />
          ))}
        </div>
      )}

      {!isUser && msg.suggKey && (
        <SuggestionChips suggKey={msg.suggKey} onSelect={onSuggest} />
      )}
    </div>
  );
};
