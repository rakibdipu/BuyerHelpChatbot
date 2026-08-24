// Bot knowledge base — keyword matching & responses
export const BOT_KNOWLEDGE = [
  {
    match: t => /track|order|package|parcel|where.*my|shipped/i.test(t),
    key: 'track',
    response: `📦 **Order Tracking Guide**

**Step-by-step:**
1. Log into the retailer → "My Orders"
2. Click your order → view real-time status
3. Use the tracking number on the carrier's site directly

**Major carriers:**
• FedEx → fedex.com/tracking
• UPS → ups.com/track
• USPS → tools.usps.com
• DHL → dhl.com/tracking
• Shopee/Daraz → check app notifications

💡 **Pro tip:** Amazon users — open the app → "Your Orders" for live map tracking!`,
  },
  {
    match: t => /return|refund|exchange|send back|money back/i.test(t),
    key: 'return',
    response: `🔄 **Return & Refund Policies**

| Retailer | Window | Free Return? |
|----------|--------|-------------|
| Amazon   | 30 days | ✅ Prime |
| Walmart  | 30–90 days | ✅ In-store |
| Best Buy | 15 days | ✅ Members |
| Target   | 90 days | ✅ RedCard |
| eBay     | Per seller | ⚠️ Varies |

📌 **Tips to make returns smooth:**
• Keep original packaging
• Photograph item before returning
• Request prepaid return label`,
  },
  {
    match: t => /ship|deliver|arrive|how long|dispatch/i.test(t),
    key: 'shipping',
    response: `🚚 **Shipping & Delivery**

**Estimated delivery times:**
⚡ Same-day — select cities (Amazon, Walmart)
🚀 Overnight — next business day
📦 Expedited — 2–3 business days
📬 Standard — 5–7 business days
🌏 International — 7–30 days

**Free shipping options:**
• Amazon Prime ($139/yr) — FREE 1–2 day
• Walmart+ ($98/yr) — FREE shipping
• Orders over $25–35 on most sites

💡 Track shipments in real-time with your tracking number!`,
  },
  {
    match: t => /pay|credit|debit|declined|charge|billing|invoice/i.test(t),
    key: 'payment',
    response: `💳 **Payment Help Center**

**Common issues:**
🚫 **Declined card** — verify billing address matches bank; try incognito mode
💸 **Double charge** — wait 24–48h (usually a hold); dispute if not resolved
⚠️ **Unauthorized charge** — call bank immediately → report to retailer

**Safest payment methods (ranked):**
1. 🥇 Credit card (best fraud protection)
2. 🥈 PayPal (buyer protection)
3. 🥉 Buy Now Pay Later (Klarna, Afterpay)
4. ❌ Wire transfer / gift cards — AVOID for unknown sellers

🔒 Always look for HTTPS 🔒 before entering payment info!`,
  },
  {
    match: t => /coupon|discount|promo|deal|sale|voucher|code/i.test(t),
    key: 'default',
    response: `🏷️ **Finding Best Deals & Coupons**

**Browser extensions (install these!):**
• 🍯 **Honey** — auto-applies coupon codes at checkout
• 💰 **Rakuten** — 1–40% cashback at 3500+ stores
• 🔔 **Capital One Shopping** — compares prices instantly

**Deal tracking sites:**
• 🐪 **CamelCamelCamel** — Amazon price history & alerts
• ⚡ **Slickdeals** — community-curated deals
• 🛒 **RetailMeNot** — coupon codes for 100K+ stores

💡 **Secret tips:**
- Abandon your cart overnight (retailers often send 10–20% off)
- Sign up for newsletters = welcome discount
- Check student/military discounts!`,
  },
  {
    match: t => /hello|hi|hey|help|start|helo|hii|good|morning|evening|night/i.test(t),
    key: 'default',
    response: `👋 Hey there! Welcome to **BuyerBot AI** 🛒

I'm your intelligent shopping assistant powered by smart response engine.

**Here's what I can do:**
• 🔍 Product search with real web results
• 📦 Order tracking guidance
• 🔄 Return & refund policy lookup
• 🚚 Shipping time estimations
• 💳 Payment troubleshooting
• 🏷️ Finding best deals & coupons
• ⭐ Product recommendations

Ask me anything about your shopping!`,
  },
  {
    match: t => /compar|vs|better|difference|which|recommend/i.test(t),
    key: 'default',
    response: `⚖️ **Product Comparison Guide**

**Key factors to evaluate:**
1. 💰 Price vs. value — not just cheapest, but best value
2. ⭐ Rating — aim for 4.2+ with 100+ reviews
3. 🔧 Warranty & support — 1–2 years preferred
4. 📦 Return policy — generous window = lower risk
5. 🚚 Shipping speed — Prime/fast delivery?

**Best comparison tools:**
• Google Shopping — side-by-side specs & prices
• RTINGS.com — for electronics (TVs, audio)
• GSMArena — for smartphones
• Notebookcheck — for laptops
• Wirecutter (NYT) — expert picks across categories

💡 Tip: Search "[product] Reddit" for honest community reviews!`,
  },
];

// Simulated web search results
export const searchWeb = async (query, setIsSearching) => {
  setIsSearching(true);
  await new Promise(r => setTimeout(r, 1600));

  const enc = encodeURIComponent(query);
  const lower = query.toLowerCase();
  const results = [];

  if (/laptop|notebook|macbook|chromebook/i.test(lower)) {
    results.push(
      { title: 'Best Laptops 2025 – TechRadar', snippet: 'Top-rated laptops for work, gaming, students & creators. Expert-tested deals updated weekly.', url: 'https://www.techradar.com/best/best-laptops', source: 'TechRadar', rating: '4.8' },
      { title: `${query} – Price Comparison`, snippet: `Compare prices for "${query}" across Amazon, Best Buy, Newegg, and Costco. Find the lowest price with fast shipping.`, url: `https://shopping.google.com/search?q=${enc}`, source: 'Google Shopping', rating: null },
      { title: 'Laptop Deals & Reviews – NotebookCheck', snippet: 'In-depth laptop reviews with benchmarks and real-world tests. Find the best laptop for every budget.', url: 'https://www.notebookcheck.net', source: 'NotebookCheck', rating: '4.7' }
    );
  } else if (/phone|iphone|samsung|pixel|oneplus|xiaomi/i.test(lower)) {
    results.push(
      { title: 'Best Smartphones 2025 – CNET', snippet: 'Expert picks for the best phones of the year. Updated reviews with camera tests and battery life comparisons.', url: 'https://www.cnet.com/tech/mobile/best-smartphones/', source: 'CNET', rating: '4.9' },
      { title: `${query} – Specs & Prices`, snippet: `Full specifications, pricing history, and user reviews for ${query}. Compare with similar devices.`, url: `https://www.gsmarena.com/search.php3?sQuickSearch=${enc}`, source: 'GSMArena', rating: '4.6' }
    );
  } else if (/headphone|earbuds|airpods|speaker|audio/i.test(lower)) {
    results.push(
      { title: 'Best Headphones 2025 – RTINGS.com', snippet: 'Objective measurements and expert reviews. Data-driven recommendations for every budget.', url: 'https://www.rtings.com/headphones', source: 'RTINGS.com', rating: '4.9' },
      { title: `${query} – Audio Deals`, snippet: `Current prices and deals for ${query} from Amazon, B&H Photo, and specialty audio stores.`, url: `https://shopping.google.com/search?q=${enc}`, source: 'Google Shopping', rating: null }
    );
  } else if (/tv|television|monitor|display/i.test(lower)) {
    results.push(
      { title: 'Best TVs 2025 – RTINGS.com', snippet: 'Comprehensive TV reviews with HDR, gaming, and picture quality tests.', url: 'https://www.rtings.com/tv', source: 'RTINGS.com', rating: '4.9' },
      { title: `${query} – TV Deals`, snippet: `Compare ${query} prices across retailers with warranty and return policy info.`, url: `https://shopping.google.com/search?q=${enc}`, source: 'Google Shopping', rating: null }
    );
  } else if (/price|buy|deal|cheap|cost/i.test(lower)) {
    results.push(
      { title: `Best Price for "${query}"`, snippet: 'Real-time price comparison across all major retailers including shipping.', url: `https://www.google.com/search?q=${enc}+best+price`, source: 'Google', rating: null },
      { title: 'Price History – CamelCamelCamel', snippet: `Track price history for ${query} on Amazon. See all-time low and get drop alerts.`, url: `https://camelcamelcamel.com/search?sq=${enc}`, source: 'CamelCamelCamel', rating: '4.7' }
    );
  } else {
    results.push(
      { title: `"${query}" – Search Results`, snippet: `Best prices, reviews, and information about ${query}. Curated from trusted sources.`, url: `https://www.google.com/search?q=${enc}`, source: 'Google', rating: null },
      { title: `${query} – Wirecutter Picks`, snippet: `Expert recommendations for ${query}. Tested and reviewed by professional editors.`, url: `https://www.nytimes.com/wirecutter/search/?q=${enc}`, source: 'Wirecutter', rating: '4.8' }
    );
  }

  setIsSearching(false);
  return results;
};

// Generate bot response
export const generateResponse = async (text, setIsSearching) => {
  for (const entry of BOT_KNOWLEDGE) {
    if (entry.match(text)) {
      await new Promise(r => setTimeout(r, 700));
      return { text: entry.response, results: [], suggKey: entry.key };
    }
  }
  const results = await searchWeb(text, setIsSearching);
  return {
    text: results.length > 0
      ? `🔍 Here's what I found for **"${text}"**:`
      : `I couldn't find specific info. Try asking about products, prices, shipping, or returns!`,
    results,
    suggKey: 'default',
  };
};

// Constants
export const CATEGORIES = [
  { icon: '💻', label: 'Electronics' },
  { icon: '👟', label: 'Fashion' },
  { icon: '🏠', label: 'Home & Garden' },
  { icon: '📱', label: 'Phones' },
  { icon: '🎮', label: 'Gaming' },
  { icon: '📚', label: 'Books' },
  { icon: '💄', label: 'Beauty' },
  { icon: '🚗', label: 'Auto' },
];

export const QUICK_ACTIONS = [
  { label: '📦 Track Order',    text: 'How do I track my order?' },
  { label: '🔄 Return Policy',  text: 'What is the return policy?' },
  { label: '🚚 Shipping Info',  text: 'Shipping and delivery times' },
  { label: '💰 Best Deals',     text: 'Find best laptop deals' },
  { label: '💳 Payment Help',   text: 'My payment was declined' },
  { label: '🏷️ Coupons',       text: 'How to find discount coupons?' },
];

export const SUGGESTIONS = {
  track:    ['Show carrier tracking sites', 'Amazon order tracking', 'Order not arrived yet?'],
  return:   ['Amazon return process', 'How to get a refund?', 'Free return shipping?'],
  shipping: ['Express delivery options', 'International shipping', 'Free shipping tips'],
  payment:  ['Safe payment methods', 'Dispute a charge', 'Buy now pay later options'],
  default:  ['Find best prices', 'Compare products', 'Read reviews'],
};
