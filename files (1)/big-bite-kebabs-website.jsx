import React, { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Clock, Star, Mic, MicOff, Menu as MenuIcon, ChevronRight, Loader } from 'lucide-react';

// ============================================================================
// BIG BITE KEBABS - VOICE-POWERED ORDERING WEBSITE
// Retell AI Integration for Restaurant Orders
// ============================================================================

const BigBiteKebabs = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [callStatus, setCallStatus] = useState('idle'); // idle, connecting, active, ended
  const [orderSummary, setOrderSummary] = useState(null);
  const retellWebClientRef = useRef(null);

  // Menu data based on business info
  const menuData = {
    popular: [
      { name: 'Mix Kebab Roll', price: 20.00, description: 'Traditional Turkish kebab with mixed meats' },
      { name: 'Mix Snack Pack', price: 19.00, description: 'Chips topped with mixed meats and sauce' },
      { name: 'Hungry Attack Meal', price: 34.00, description: 'Large combo meal for the hungry' },
      { name: 'Mix Shish Plate', price: 47.00, description: 'Premium mixed shish kebab plate' },
    ],
    sides: [
      { name: 'Chips', price: 8.00, description: 'Golden crispy chips' },
    ],
    categories: {
      kebabs: ['Chicken Kebab', 'Lamb Kebab', 'Mix Kebab', 'Beef Kebab'],
      plates: ['Mix Shish Plate', 'Chicken Plate', 'Lamb Plate'],
      snackPacks: ['Chicken Snack Pack', 'Lamb Snack Pack', 'Mix Snack Pack'],
      other: ['Burgers', 'Salads', 'Pide', 'Gozleme', 'Desserts', 'Drinks']
    }
  };

  const businessInfo = {
    name: 'Big Bite Kebabs',
    address: '25 Parkers Farm Pl, Casula NSW 2170',
    location: 'Crossroads Homemaker Centre',
    phone: '+61 2 9609 4752',
    hours: '10:00 AM - 9:00 PM Daily',
    rating: 4.6,
    cuisine: 'Turkish / Halal Kebabs'
  };

  // Initialize Retell AI Web Client
  useEffect(() => {
    // In production, load Retell SDK from CDN
    // <script src="https://cdn.jsdelivr.net/npm/@retellai/web-client@latest/dist/index.umd.min.js"></script>
    
    // For this demo, we'll simulate the initialization
    const initRetellClient = async () => {
      // const RetellWebClient = window.RetellWebClient;
      // retellWebClientRef.current = new RetellWebClient();
      
      console.log('Retell AI Client would be initialized here');
    };

    initRetellClient();

    return () => {
      // Cleanup
      if (retellWebClientRef.current) {
        // retellWebClientRef.current.stopCall();
      }
    };
  }, []);

  // Start voice call with Retell AI
  const startVoiceOrder = async () => {
    setCallStatus('connecting');
    
    try {
      // In production, call your backend to get access token
      // const response = await fetch('/api/retell/start-call', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const { accessToken } = await response.json();
      
      // Start the call
      // await retellWebClientRef.current.startCall({
      //   accessToken: accessToken,
      //   sampleRate: 24000,
      //   enableUpdate: true,
      // });

      // Simulate connection for demo
      setTimeout(() => {
        setCallStatus('active');
        setIsVoiceActive(true);
      }, 1500);

      console.log('Voice call started - Retell AI agent is active');
    } catch (error) {
      console.error('Error starting voice call:', error);
      setCallStatus('idle');
    }
  };

  // Stop voice call
  const stopVoiceOrder = () => {
    if (retellWebClientRef.current) {
      // retellWebClientRef.current.stopCall();
    }
    setCallStatus('ended');
    setIsVoiceActive(false);
    
    // Show order summary after call ends
    setTimeout(() => {
      setOrderSummary({
        items: [
          { name: 'Mix Kebab Roll', quantity: 2, price: 40.00 },
          { name: 'Chips', quantity: 1, price: 8.00 }
        ],
        total: 48.00,
        type: 'pickup',
        customerName: 'John',
        customerPhone: '0412 345 678'
      });
    }, 500);
  };

  // Pages components
  const HomePage = () => (
    <div className="page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="logo-badge">
            <Star className="star-icon" fill="currentColor" />
            <span>{businessInfo.rating}</span>
          </div>
          
          <h1 className="hero-title">
            Big Bite<br />
            <span className="kebabs-text">Kebabs</span>
          </h1>
          
          <p className="hero-subtitle">{businessInfo.cuisine}</p>
          
          <div className="hero-info">
            <div className="info-item">
              <MapPin size={16} />
              <span>{businessInfo.location}</span>
            </div>
            <div className="info-item">
              <Clock size={16} />
              <span>{businessInfo.hours}</span>
            </div>
          </div>

          {/* Main CTA - Voice Ordering */}
          <button 
            className="voice-order-btn primary-cta"
            onClick={startVoiceOrder}
          >
            <div className="btn-content">
              <Mic size={24} />
              <span>Order by Voice</span>
            </div>
            <div className="btn-subtitle">AI-powered ordering in seconds</div>
          </button>

          {/* Secondary CTA */}
          <button 
            className="secondary-btn"
            onClick={() => setCurrentPage('menu')}
          >
            <MenuIcon size={20} />
            <span>View Menu</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Popular Items */}
      <div className="popular-section">
        <h2 className="section-title">Popular Items</h2>
        <div className="popular-grid">
          {menuData.popular.map((item, index) => (
            <div key={index} className="popular-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-header">
                <h3>{item.name}</h3>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>
              <p className="card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2 className="section-title">How Voice Ordering Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Tap "Order by Voice"</h3>
            <p>Allow microphone access when prompted</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Tell our AI what you want</h3>
            <p>Say your order naturally - our AI understands</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Confirm & collect</h3>
            <p>Review your order and choose pickup or delivery</p>
          </div>
        </div>
      </div>
    </div>
  );

  const MenuPage = () => (
    <div className="page-container menu-page">
      <div className="menu-header">
        <button className="back-btn" onClick={() => setCurrentPage('home')}>
          ← Back
        </button>
        <h1>Our Menu</h1>
      </div>

      <div className="menu-content">
        <section className="menu-section">
          <h2>Popular Items</h2>
          <div className="menu-items">
            {menuData.popular.map((item, i) => (
              <div key={i} className="menu-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2>Sides</h2>
          <div className="menu-items">
            {menuData.sides.map((item, i) => (
              <div key={i} className="menu-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2>Full Menu Categories</h2>
          {Object.entries(menuData.categories).map(([category, items]) => (
            <div key={category} className="category-group">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>

      <div className="menu-footer">
        <button className="voice-order-btn" onClick={() => { setCurrentPage('home'); startVoiceOrder(); }}>
          <Mic size={20} />
          Order by Voice
        </button>
      </div>
    </div>
  );

  const VoiceCallInterface = () => (
    <div className="voice-overlay">
      <div className="voice-modal">
        <div className="voice-status">
          {callStatus === 'connecting' && (
            <>
              <Loader className="spinner" size={48} />
              <h2>Connecting to AI Assistant...</h2>
              <p>Please wait a moment</p>
            </>
          )}
          
          {callStatus === 'active' && (
            <>
              <div className="voice-animation">
                <div className="pulse-ring"></div>
                <div className="pulse-ring delay-1"></div>
                <div className="pulse-ring delay-2"></div>
                <Mic className="mic-icon-active" size={48} />
              </div>
              <h2>AI Assistant is Listening</h2>
              <p>Speak naturally - tell us what you'd like to order</p>
              
              <div className="voice-tips">
                <div className="tip">Try: "I'd like two mix kebab rolls"</div>
                <div className="tip">Try: "One snack pack for pickup"</div>
              </div>
            </>
          )}
        </div>

        <button 
          className="end-call-btn"
          onClick={stopVoiceOrder}
        >
          <MicOff size={20} />
          End Call
        </button>
      </div>
    </div>
  );

  const OrderSummary = () => (
    <div className="voice-overlay">
      <div className="summary-modal">
        <h2>Order Confirmed!</h2>
        
        <div className="summary-content">
          <div className="summary-section">
            <h3>Your Order</h3>
            {orderSummary.items.map((item, i) => (
              <div key={i} className="summary-item">
                <span>{item.quantity}x {item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-section">
            <h3>Details</h3>
            <div className="detail-row">
              <span>Order Type:</span>
              <span>{orderSummary.type === 'pickup' ? 'Pickup' : 'Delivery'}</span>
            </div>
            <div className="detail-row">
              <span>Name:</span>
              <span>{orderSummary.customerName}</span>
            </div>
            <div className="detail-row">
              <span>Phone:</span>
              <span>{orderSummary.customerPhone}</span>
            </div>
          </div>
        </div>

        <div className="summary-actions">
          <button className="confirm-btn">Proceed to Payment</button>
          <button className="cancel-btn" onClick={() => setOrderSummary(null)}>Start New Order</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">Big Bite Kebabs</div>
          <a href={`tel:${businessInfo.phone}`} className="phone-link">
            <Phone size={18} />
            <span className="phone-number">{businessInfo.phone}</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'menu' && <MenuPage />}
      </main>

      {/* Voice Call Overlay */}
      {(callStatus === 'connecting' || callStatus === 'active') && <VoiceCallInterface />}
      
      {/* Order Summary Overlay */}
      {orderSummary && <OrderSummary />}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
        }

        /* Header */
        .app-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #ff6b35, #ff8e53);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .phone-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ff6b35;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .phone-link:hover {
          color: #ff8e53;
          transform: translateY(-2px);
        }

        .phone-number {
          display: none;
        }

        @media (min-width: 640px) {
          .phone-number {
            display: inline;
          }
        }

        /* Main Content */
        .app-main {
          padding-top: 64px;
          min-height: 100vh;
        }

        .page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          padding: 4rem 0;
          margin-bottom: 4rem;
          overflow: hidden;
        }

        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 142, 83, 0.1) 0%, transparent 50%);
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 107, 53, 0.2);
          border: 1px solid rgba(255, 107, 53, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 600;
          color: #ff8e53;
          margin-bottom: 2rem;
          animation: fadeInUp 0.6s ease-out;
        }

        .star-icon {
          color: #ffd700;
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 12vw, 7rem);
          line-height: 0.9;
          margin-bottom: 1rem;
          letter-spacing: 2px;
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .kebabs-text {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .hero-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          margin-bottom: 3rem;
          animation: fadeInUp 1.2s ease-out 0.6s both;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }

        /* Buttons */
        .voice-order-btn {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
          border: none;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 400px;
          margin: 0 auto 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          animation: fadeInUp 1.4s ease-out 0.8s both;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        }

        .voice-order-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.4);
        }

        .btn-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
        }

        .btn-subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }

        .secondary-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          transition: all 0.3s ease;
          animation: fadeInUp 1.6s ease-out 1s both;
        }

        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Popular Items */
        .popular-section {
          margin: 4rem 0;
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-align: center;
          letter-spacing: 1px;
        }

        .popular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .popular-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out both;
        }

        .popular-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 107, 53, 0.3);
          transform: translateY(-4px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 0.75rem;
        }

        .card-header h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
        }

        .price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: #ff6b35;
        }

        .card-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* How It Works */
        .how-it-works {
          margin: 4rem 0;
          padding: 3rem 0;
          background: rgba(255, 107, 53, 0.03);
          border-radius: 20px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding: 0 1.5rem;
        }

        .step-card {
          text-align: center;
          padding: 2rem 1rem;
        }

        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b35, #ff8e53);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        }

        .step-card h3 {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }

        .step-card p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Menu Page */
        .menu-page {
          padding-bottom: 100px;
        }

        .menu-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-4px);
        }

        .menu-header h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          letter-spacing: 1px;
        }

        .menu-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .menu-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
        }

        .menu-section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #ff6b35;
          letter-spacing: 1px;
        }

        .menu-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: start;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .item-info h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .item-info p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .item-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          color: #ff6b35;
          white-space: nowrap;
          margin-left: 1rem;
        }

        .category-group {
          margin-bottom: 1.5rem;
        }

        .category-group h3 {
          font-size: 1.2rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .category-group ul {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.5rem;
        }

        .category-group li {
          color: rgba(255, 255, 255, 0.7);
          padding: 0.5rem 0;
          font-size: 0.95rem;
        }

        .menu-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .menu-footer .voice-order-btn {
          max-width: 600px;
          flex-direction: row;
          padding: 1.25rem 2rem;
          gap: 0.75rem;
          font-size: 1.1rem;
        }

        /* Voice Overlay */
        .voice-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .voice-modal {
          background: rgba(20, 20, 20, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 3rem 2rem;
          max-width: 500px;
          width: 90%;
          text-align: center;
        }

        .voice-status {
          margin-bottom: 2rem;
        }

        .voice-status h2 {
          font-size: 1.8rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }

        .voice-status p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
          color: #ff6b35;
          margin: 0 auto 1.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .voice-animation {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 2rem auto;
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border: 2px solid #ff6b35;
          border-radius: 50%;
          animation: pulse 2s ease-out infinite;
        }

        .pulse-ring.delay-1 {
          animation-delay: 0.5s;
        }

        .pulse-ring.delay-2 {
          animation-delay: 1s;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        .mic-icon-active {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #ff6b35;
        }

        .voice-tips {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tip {
          background: rgba(255, 107, 53, 0.1);
          border: 1px solid rgba(255, 107, 53, 0.2);
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .end-call-btn {
          background: rgba(255, 59, 59, 0.2);
          border: 1px solid rgba(255, 59, 59, 0.3);
          padding: 1rem 2rem;
          border-radius: 12px;
          color: #ff6b6b;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .end-call-btn:hover {
          background: rgba(255, 59, 59, 0.3);
          transform: translateY(-2px);
        }

        /* Order Summary */
        .summary-modal {
          background: rgba(20, 20, 20, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 2.5rem;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .summary-modal h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #ff6b35;
          letter-spacing: 1px;
        }

        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .summary-section h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          margin-top: 0.5rem;
          border-top: 2px solid rgba(255, 107, 53, 0.3);
          font-size: 1.3rem;
          font-weight: 700;
          color: #ff6b35;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          color: rgba(255, 255, 255, 0.8);
        }

        .summary-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .confirm-btn {
          background: linear-gradient(135deg, #ff6b35, #ff8e53);
          border: none;
          padding: 1.25rem 2rem;
          border-radius: 12px;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .confirm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
        }

        .cancel-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section {
            padding: 2rem 0;
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }

          .popular-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BigBiteKebabs;
