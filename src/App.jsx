import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hello! I'm your Buyer Help Assistant. I can help you with shopping, orders, return policies, and product information. What can I help you with today?",
      timestamp: new Date().toLocaleTimeString(),
      searchResults: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isSearching]);

  // Smart rule-based response engine + simulated web search results
  const searchWeb = async (query) => {
    setIsSearching(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const searchQuery = encodeURIComponent(query);
      const lower = query.toLowerCase();
      const results = [];

      if (lower.includes('laptop')) {
        results.push(
          {
            title: `Best Laptops 2025 – Top Picks & Prices`,
            snippet: `Compare the best laptops for work, gaming, and students. Updated deals from Amazon, Best Buy, Newegg and more.`,
            url: `https://www.techradar.com/best/best-laptops`,
            source: 'TechRadar'
          },
          {
            title: `Laptop Price Comparison – Google Shopping`,
            snippet: `Shop ${query} with current pricing, availability, and shipping. Compare specs across major retailers.`,
            url: `https://shopping.google.com/search?q=${searchQuery}`,
            source: 'Google Shopping'
          }
        );
      } else if (lower.includes('phone') || lower.includes('iphone') || lower.includes('samsung')) {
        results.push(
          {
            title: `Best Smartphones 2025 – CNET`,
            snippet: `Current smartphone prices, specs, and deals. Compare iPhone, Samsung Galaxy, Google Pixel and more with expert reviews.`,
            url: `https://www.cnet.com/tech/mobile/best-smartphones/`,
            source: 'CNET'
          },
          {
            title: `${query} – Phone Deals & Comparison`,
            snippet: `Shop for ${query} with live pricing and availability. Find unlocked, carrier deals, and trade-in offers.`,
            url: `https://shopping.google.com/search?q=${searchQuery}`,
            source: 'Google Shopping'
          }
        );
      } else if (lower.includes('headphone') || lower.includes('earbuds') || lower.includes('audio')) {
        results.push(
          {
            title: `Best Headphones & Earbuds 2025 – RTINGS`,
            snippet: `Objective headphone reviews, measurements, and rankings. Find the best headphones for your budget and use case.`,
            url: `https://www.rtings.com/headphones`,
            source: 'RTINGS.com'
          },
          {
            title: `${query} – Audio Gear Deals`,
            snippet: `Compare prices and read reviews for ${query}. Shop deals from Amazon, B&H, and specialty audio stores.`,
            url: `https://shopping.google.com/search?q=${searchQuery}`,
            source: 'Google Shopping'
          }
        );
      } else if (lower.includes('price') || lower.includes('buy') || lower.includes('deal') || lower.includes('cheap')) {
        results.push(
          {
            title: `Best Deals on ${query}`,
            snippet: `Find the lowest price for ${query}. Real-time price comparison across hundreds of online stores.`,
            url: `https://www.google.com/search?q=${searchQuery}+best+price`,
            source: 'Google Search'
          },
          {
            title: `${query} – CamelCamelCamel Price History`,
            snippet: `Track price history and set alerts for ${query} on Amazon. See the lowest price ever and when to buy.`,
            url: `https://camelcamelcamel.com/search?sq=${searchQuery}`,
            source: 'CamelCamelCamel'
          }
        );
      } else {
        results.push(
          {
            title: `${query} – Latest Information & Reviews`,
            snippet: `Find comprehensive information, reviews, and buying guides for ${query}. Community ratings and expert opinions included.`,
            url: `https://www.google.com/search?q=${searchQuery}`,
            source: 'Google Search'
          },
          {
            title: `${query} – Wikipedia`,
            snippet: `Background information and detailed overview of ${query} from the free encyclopedia.`,
            url: `https://en.wikipedia.org/wiki/Special:Search/${searchQuery}`,
            source: 'Wikipedia'
          }
        );
      }

      setIsSearching(false);
      return results;
    } catch (error) {
      setIsSearching(false);
      console.error('Search failed:', error);
      return [];
    }
  };

  // Smart keyword-based bot response engine
  const generateBotResponse = async (userMessage) => {
    const lower = userMessage.toLowerCase();

    // Order tracking
    if (lower.includes('track') || lower.includes('order') || lower.includes('where is my')) {
      return {
        text: `📦 **Order Tracking Help**\n\nTo track your order:\n1. Go to the retailer's website and log into your account\n2. Navigate to "My Orders" or "Order History"\n3. Click on your order to see real-time tracking\n4. You can also use your tracking number directly on the carrier's site (FedEx, UPS, USPS, DHL)\n\n💡 If you placed the order on Amazon, check the **Amazon app** → "Your Orders" for the fastest update!`,
        searchResults: []
      };
    }

    // Return & refund
    if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
      return {
        text: `🔄 **Return & Refund Policy Guide**\n\nGeneral return policies:\n• **Amazon** — 30-day returns on most items, free for Prime members\n• **Best Buy** — 15 days standard, 30 days for Elite/Plus members\n• **Walmart** — 30 days for most items, 90 days for electronics\n• **eBay** — Varies by seller; look for "eBay Money Back Guarantee"\n\n📌 **Tips:**\n- Keep your original packaging\n- Take photos of the item before returning\n- Check if the seller offers free return shipping`,
        searchResults: []
      };
    }

    // Shipping info
    if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('ship')) {
      return {
        text: `🚚 **Shipping & Delivery Information**\n\n**Typical delivery times:**\n• Standard shipping — 5–7 business days\n• Expedited — 2–3 business days\n• Overnight — Next business day\n• Amazon Prime — 1–2 days (free for members)\n\n**Free shipping options:**\n• Amazon Prime membership\n• Walmart+ membership\n• Orders over \$35 on many sites\n\n💡 Use your order's tracking number to get real-time updates from the carrier!`,
        searchResults: []
      };
    }

    // Payment issues
    if (lower.includes('payment') || lower.includes('pay') || lower.includes('credit card') || lower.includes('charge')) {
      return {
        text: `💳 **Payment Help**\n\nCommon payment issues & solutions:\n• **Declined card** — Check billing address matches bank records, or try a different payment method\n• **Double charge** — Wait 24–48 hours (may be a pending hold), then contact support if not resolved\n• **Unauthorized charge** — Contact your bank immediately to dispute, then report to the retailer\n\n🔒 **Safe shopping tips:**\n- Look for HTTPS in the URL\n- Use credit cards (easier to dispute charges)\n- Avoid paying via wire transfer or gift cards`,
        searchResults: []
      };
    }

    // Greetings
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower === 'helo') {
      return {
        text: `👋 Hello! Great to meet you! I'm your Buyer Help Assistant.\n\nI can help you with:\n• 🔍 Finding best prices & product comparisons\n• 📦 Order tracking guidance\n• 🔄 Return & refund policies\n• 🚚 Shipping information\n• 💳 Payment help\n\nWhat would you like help with today?`,
        searchResults: []
      };
    }

    // Default — do a web search
    const results = await searchWeb(userMessage);

    if (results.length > 0) {
      return {
        text: `🔍 I searched the web for **"${userMessage}"** and found these results:`,
        searchResults: results
      };
    }

    return {
      text: `I couldn't find specific information about that right now. Try asking about:\n• Product prices & comparisons\n• Order tracking\n• Return & refund policies\n• Shipping information`,
      searchResults: []
    };
  };

  const sendMessage = async (textOverride) => {
    const messageText = (textOverride || input).trim();
    if (!messageText || isTyping || isSearching) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString(),
      searchResults: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      const response = await generateBotResponse(messageText);
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString(),
        searchResults: response.searchResults || []
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { label: '📦 Track my order', text: 'Track my order' },
    { label: '💰 Find best prices', text: 'Find best laptop prices' },
    { label: '🔄 Return policy', text: 'What is the return policy?' },
    { label: '🚚 Shipping info', text: 'Shipping and delivery information' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>🛒</div>
            <div>
              <h1 style={styles.title}>BuyerBot</h1>
              <p style={styles.subtitle}>AI-Powered Shopping Assistant</p>
            </div>
          </div>
          <div style={styles.headerBadge}>
            <span style={styles.liveDot}></span>
            Live
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div style={styles.chatContainer}>
        <div style={styles.chatBox}>

          {/* Chat Header */}
          <div style={styles.chatHeader}>
            <div style={styles.chatHeaderContent}>
              <div style={styles.messageIcon}>💬</div>
              <div>
                <h2 style={styles.chatTitle}>Buyer Help Assistant</h2>
                <p style={styles.chatStatus}>🟢 Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.quickActions}>
            <p style={styles.quickActionsLabel}>Quick actions:</p>
            <div style={styles.quickActionButtons}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(action.text)}
                  style={styles.quickActionButton}
                  disabled={isTyping || isSearching}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={styles.messagesContainer}>
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  style={{
                    ...styles.messageWrapper,
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {message.sender === 'bot' && (
                    <div style={styles.botAvatar}>🤖</div>
                  )}

                  <div style={{
                    ...styles.messageBubble,
                    ...(message.sender === 'user' ? styles.userMessage : styles.botMessage)
                  }}>
                    <div style={styles.messageText}>{message.text}</div>
                    <div style={styles.messageTime}>{message.timestamp}</div>
                  </div>

                  {message.sender === 'user' && (
                    <div style={styles.userAvatar}>👤</div>
                  )}
                </div>

                {/* Search Results Cards */}
                {message.searchResults && message.searchResults.length > 0 && (
                  <div style={styles.searchResults}>
                    {message.searchResults.map((result, index) => (
                      <div key={index} style={styles.searchResult}>
                        <div style={styles.searchResultHeader}>
                          <h3 style={styles.searchResultTitle}>
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={styles.searchResultLink}
                            >
                              {result.title}
                            </a>
                          </h3>
                          <span style={styles.searchResultSource}>{result.source}</span>
                        </div>
                        <p style={styles.searchResultSnippet}>{result.snippet}</p>
                        <div style={styles.searchResultFooter}>
                          <span style={styles.webIndicator}>🔗 Web Result</span>
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.visitButton}
                          >
                            Visit Site →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={styles.messageWrapper}>
                <div style={styles.botAvatar}>🤖</div>
                <div style={{ ...styles.messageBubble, ...styles.botMessage }}>
                  <div style={styles.typingIndicator}>
                    <div style={styles.typingDot}></div>
                    <div style={{ ...styles.typingDot, animationDelay: '0.2s' }}></div>
                    <div style={{ ...styles.typingDot, animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Searching Indicator */}
            {isSearching && (
              <div style={styles.messageWrapper}>
                <div style={styles.botAvatar}>🔍</div>
                <div style={{ ...styles.messageBubble, ...styles.botMessage }}>
                  <div style={styles.searchingText}>Searching the web...</div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} style={{ height: 1 }} />
          </div>

          {/* Input */}
          <div style={styles.inputContainer}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                style={styles.input}
                disabled={isTyping || isSearching}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping || isSearching}
                style={{
                  ...styles.sendButton,
                  opacity: (!input.trim() || isTyping || isSearching) ? 0.5 : 1,
                  cursor: (!input.trim() || isTyping || isSearching) ? 'not-allowed' : 'pointer'
                }}
              >
                Send ➤
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        button:hover:not(:disabled) {
          filter: brightness(1.05);
        }
        a:hover {
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.875rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem'
  },
  logoIcon: {
    fontSize: '2.25rem',
    lineHeight: 1
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
    letterSpacing: '-0.5px'
  },
  subtitle: {
    color: '#6b7280',
    margin: 0,
    fontSize: '0.8125rem',
    fontWeight: '500'
  },
  headerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    backgroundColor: '#ecfdf5',
    color: '#059669',
    fontSize: '0.8125rem',
    fontWeight: '600',
    padding: '0.375rem 0.875rem',
    borderRadius: '9999px',
    border: '1px solid #a7f3d0'
  },
  liveDot: {
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'livePulse 2s ease-in-out infinite'
  },
  chatContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1.5rem'
  },
  chatBox: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.18)',
    overflow: 'hidden'
  },
  chatHeader: {
    background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
    color: 'white',
    padding: '1rem 1.25rem'
  },
  chatHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  messageIcon: {
    fontSize: '1.75rem'
  },
  chatTitle: {
    fontWeight: '700',
    margin: 0,
    fontSize: '1.125rem'
  },
  chatStatus: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.8125rem',
    margin: 0,
    fontWeight: '500'
  },
  quickActions: {
    padding: '0.875rem 1.25rem',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb'
  },
  quickActionsLabel: {
    fontSize: '0.8125rem',
    color: '#6b7280',
    margin: '0 0 0.5rem 0',
    fontWeight: '500'
  },
  quickActionButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  quickActionButton: {
    padding: '0.4rem 0.875rem',
    backgroundColor: 'white',
    borderRadius: '9999px',
    fontSize: '0.8125rem',
    border: '1px solid #d1d5db',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    color: '#374151'
  },
  messagesContainer: {
    height: '460px',
    overflowY: 'auto',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    scrollBehavior: 'smooth'
  },
  messageWrapper: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start'
  },
  botAvatar: {
    width: '2.25rem',
    height: '2.25rem',
    backgroundColor: '#dbeafe',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '1.1rem',
    border: '2px solid #bfdbfe'
  },
  userAvatar: {
    width: '2.25rem',
    height: '2.25rem',
    backgroundColor: '#e0e7ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '1.1rem',
    border: '2px solid #c7d2fe'
  },
  messageBubble: {
    maxWidth: '72%',
    padding: '0.75rem 1rem',
    borderRadius: '1rem'
  },
  userMessage: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderBottomRightRadius: '0.25rem'
  },
  botMessage: {
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
    borderBottomLeftRadius: '0.25rem'
  },
  messageText: {
    fontSize: '0.875rem',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  },
  messageTime: {
    fontSize: '0.6875rem',
    marginTop: '0.375rem',
    opacity: 0.65
  },
  typingIndicator: {
    display: 'flex',
    gap: '0.375rem',
    padding: '0.25rem 0',
    alignItems: 'center'
  },
  typingDot: {
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: '#9ca3af',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out',
    animationFillMode: 'both'
  },
  searchingText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontStyle: 'italic',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  searchResults: {
    marginLeft: '3rem',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  searchResult: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '1rem',
    backgroundColor: 'white',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s'
  },
  searchResultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
    gap: '0.75rem'
  },
  searchResultTitle: {
    fontSize: '0.9375rem',
    fontWeight: '600',
    margin: 0,
    flex: 1,
    lineHeight: '1.4'
  },
  searchResultLink: {
    color: '#2563eb',
    textDecoration: 'none'
  },
  searchResultSource: {
    fontSize: '0.6875rem',
    color: '#6b7280',
    flexShrink: 0,
    backgroundColor: '#f3f4f6',
    padding: '0.2rem 0.5rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  searchResultSnippet: {
    fontSize: '0.875rem',
    color: '#4b5563',
    lineHeight: '1.6',
    margin: '0 0 0.75rem 0'
  },
  searchResultFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  webIndicator: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  visitButton: {
    fontSize: '0.75rem',
    color: '#2563eb',
    textDecoration: 'none',
    padding: '0.25rem 0.75rem',
    backgroundColor: '#eff6ff',
    borderRadius: '0.375rem',
    fontWeight: '600',
    border: '1px solid #bfdbfe',
    transition: 'all 0.2s'
  },
  inputContainer: {
    padding: '1rem 1.25rem',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: 'white'
  },
  inputWrapper: {
    display: 'flex',
    gap: '0.75rem'
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '1.5px solid #d1d5db',
    borderRadius: '0.625rem',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    color: '#1f2937',
    backgroundColor: 'white'
  },
  sendButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.625rem',
    fontSize: '0.9375rem',
    fontWeight: '600',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    whiteSpace: 'nowrap'
  }
};

export default App;