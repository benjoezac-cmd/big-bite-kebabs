# 🎤 Big Bite Kebabs - Voice-Powered Ordering System

A complete voice-powered food ordering website built with React and Retell AI, designed for Big Bite Kebabs restaurant in Casula, NSW.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Retell AI](https://img.shields.io/badge/Retell%20AI-Integrated-orange.svg)

---

## 🌟 Features

### Voice Ordering
- **AI-Powered Conversations**: Natural language ordering via Retell AI
- **Real-time Voice Processing**: Low-latency voice recognition and response
- **Smart Menu Understanding**: AI understands menu items and variations
- **Order Confirmation**: Automatic order summary and confirmation

### Web Interface
- **Beautiful UI**: Modern, responsive design with dark theme
- **Mobile-First**: Optimized for phones and tablets
- **Traditional Menu**: Browse menu items with prices
- **Smooth Animations**: Polished micro-interactions and transitions

### Backend System
- **RESTful API**: Clean API architecture with Express.js
- **Retell AI Integration**: Complete webhook handling and function calling
- **Order Management**: Track and manage customer orders
- **Extensible**: Ready for payment integration, POS systems, etc.

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Customization](#-customization)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Quick Start

Get up and running in 3 steps:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/big-bite-kebabs.git
cd big-bite-kebabs
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Retell AI credentials
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm start
```

**Visit**: http://localhost:3000

---

## 📁 Project Structure

```
big-bite-kebabs/
│
├── frontend/                      # React frontend application
│   ├── src/
│   │   ├── App.js                # Main React component
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Global styles
│   ├── public/
│   ├── package.json
│   └── .env.local                # Frontend environment variables
│
├── backend/                       # Express backend server
│   ├── server.js                 # Main server file
│   ├── package.json
│   └── .env                      # Backend environment variables
│
├── docs/                          # Documentation
│   ├── DOCUMENTATION.md          # Technical documentation
│   ├── SETUP_GUIDE.md            # Detailed setup guide
│   └── UI_WIREFRAMES.md          # Design specifications
│
└── README.md                      # This file
```

---

## 💻 Installation

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Retell AI Account** ([Sign up here](https://retellai.com))
- **Git** (for cloning)

### System Requirements

- **macOS**: 10.15 (Catalina) or higher
- **Windows**: 10 or higher
- **Linux**: Ubuntu 20.04 or equivalent

### Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

---

## ⚙️ Configuration

### Retell AI Setup

1. **Create Account** at [https://retellai.com](https://retellai.com)

2. **Get API Key**:
   - Go to Settings → API Keys
   - Create new API key
   - Copy and save securely

3. **Create Agent**:
   - Navigate to Agents
   - Click "Create New Agent"
   - Use the agent prompt from `docs/SETUP_GUIDE.md`
   - Configure voice settings
   - Copy the Agent ID

4. **Configure Webhooks** (Optional):
   - Add webhook URL: `https://your-backend.com/api/retell/webhook`
   - Enable events: `call_started`, `call_ended`, `call_analyzed`

### Environment Variables

#### Backend `.env`
```bash
RETELL_API_KEY=sk_test_your_api_key
RETELL_AGENT_ID=agent_your_agent_id
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Frontend `.env.local`
```bash
REACT_APP_API_URL=http://localhost:3001
```

See `.env.example` for all available options.

---

## 🛠️ Development

### Start Backend Server

```bash
cd backend
npm run dev
```

Server runs at: http://localhost:3001

**Available Endpoints**:
- `GET /health` - Health check
- `GET /api/menu` - Get menu items
- `POST /api/retell/start-call` - Start voice call
- `POST /api/retell/webhook` - Retell AI webhooks
- `GET /api/orders` - Get orders

### Start Frontend App

```bash
cd frontend
npm start
```

App runs at: http://localhost:3000

**Hot Reload**: Changes to code automatically refresh the browser

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Linting & Formatting

```bash
# Check for issues
npm run lint

# Auto-format code
npm run format
```

---

## 🌐 Deployment

### Deploy Backend (Railway)

1. **Create Railway Account**: [railway.app](https://railway.app)

2. **New Project**:
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Add Environment Variables**:
   - Go to your project settings
   - Add production environment variables
   - Set `NODE_ENV=production`

4. **Deploy**:
   ```bash
   railway deploy
   ```

5. **Get URL**: Copy the generated Railway URL

### Deploy Frontend (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment**:
   - Add `REACT_APP_API_URL` with your Railway URL
   - Set production values

4. **Production Deploy**:
   ```bash
   vercel --prod
   ```

### Post-Deployment

1. **Update CORS**: Set `CORS_ORIGIN` in backend to your Vercel URL
2. **Update Webhooks**: Set webhook URL in Retell AI dashboard
3. **Test Production**: Verify voice ordering works
4. **Monitor**: Set up error tracking (Sentry recommended)

---

## 📚 API Documentation

### REST API Endpoints

#### Start Voice Call
```http
POST /api/retell/start-call
Content-Type: application/json

{
  "restaurantId": "big-bite-kebabs",
  "sessionId": "optional-session-id"
}

Response:
{
  "success": true,
  "accessToken": "token_...",
  "callId": "call_...",
  "agentId": "agent_..."
}
```

#### Get Menu
```http
GET /api/menu

Response:
{
  "success": true,
  "menu": {
    "popular": [...],
    "items": [...]
  }
}
```

#### Create Order
```http
POST /api/orders/create
Content-Type: application/json

{
  "items": [
    {"name": "Mix Kebab Roll", "quantity": 2, "price": 20.00}
  ],
  "orderType": "pickup",
  "customerName": "John",
  "customerPhone": "0412345678"
}

Response:
{
  "success": true,
  "order": {
    "orderId": "BBK-...",
    "total": 40.00,
    ...
  }
}
```

#### Get Orders
```http
GET /api/orders?status=pending&limit=10

Response:
{
  "success": true,
  "orders": [...],
  "total": 10
}
```

Full API documentation available in `docs/DOCUMENTATION.md`

---

## 🎨 Customization

### Branding

**Colors**: Edit CSS variables in `frontend/src/App.js`:
```css
--color-primary: #ff6b35;        /* Change main brand color */
--color-primary-light: #ff8e53;  /* Change light accent */
--color-background: #0a0a0a;     /* Change background */
```

**Fonts**: Update font imports:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

**Logo**: Replace logo text with your restaurant name:
```javascript
<div className="logo">Your Restaurant Name</div>
```

### Menu Items

Edit menu data in `backend/server.js`:
```javascript
const menuData = {
  popular: [
    { id: 'item1', name: 'Your Item', price: 15.00, category: 'main' },
    // Add more items...
  ]
};
```

### Agent Prompts

Customize conversation flow in Retell AI dashboard:
- Update greeting message
- Change menu item descriptions
- Modify confirmation flow
- Add special instructions

---

## 🐛 Troubleshooting

### Common Issues

#### "Failed to start call"
**Cause**: Invalid API key or Agent ID  
**Solution**: 
1. Verify `RETELL_API_KEY` in `.env`
2. Check `RETELL_AGENT_ID` is correct
3. Ensure agent is published (not draft)

#### "Microphone access denied"
**Cause**: Browser permissions  
**Solution**: 
1. Go to browser settings
2. Allow microphone for localhost
3. Reload the page

#### "CORS error"
**Cause**: Mismatched origins  
**Solution**: 
1. Check `CORS_ORIGIN` in backend `.env`
2. Ensure it matches frontend URL
3. Restart backend server

#### Voice agent doesn't respond
**Cause**: Various  
**Solution**: 
1. Test agent in Retell AI playground
2. Check browser console for errors
3. Verify microphone is working
4. Check network tab for failed requests

### Debug Mode

Enable verbose logging:
```bash
# Backend
LOG_LEVEL=debug npm run dev

# Frontend
REACT_APP_DEBUG=true npm start
```

### Get Help

- **Documentation**: See `docs/` folder
- **Retell AI Docs**: https://docs.retellai.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/big-bite-kebabs/issues)
- **Community**: Retell AI Discord

---

## 🤝 Contributing

We welcome contributions! Here's how:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Coding Standards

- **JavaScript**: Use ES6+ syntax
- **React**: Functional components with hooks
- **Formatting**: Run `npm run format` before committing
- **Linting**: Fix all `npm run lint` errors
- **Comments**: Document complex logic

### Testing

All contributions should include:
- Unit tests for new functions
- Integration tests for API endpoints
- Manual testing checklist

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Retell AI** for voice technology
- **React** team for the amazing framework
- **Express.js** for backend simplicity
- **Big Bite Kebabs** for the delicious inspiration

---

## 📞 Contact

**Big Bite Kebabs**  
📍 25 Parkers Farm Pl, Casula NSW 2170, Australia  
📞 +61 2 9609 4752  
🌐 Located in Crossroads Homemaker Centre  

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ Voice ordering with Retell AI
- ✅ Menu browsing
- ✅ Order management
- ✅ Responsive design

### Version 1.1 (Planned)
- [ ] Payment integration (Stripe/Square)
- [ ] SMS order confirmations
- [ ] Email receipts
- [ ] Customer accounts

### Version 2.0 (Future)
- [ ] Multi-language support
- [ ] Loyalty program
- [ ] Scheduled orders
- [ ] Admin dashboard
- [ ] Analytics & reporting

---

## 📊 Project Status

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: February 2026  
**Maintained**: Yes  

---

## ⭐ Star History

If this project helps you, please give it a star! ⭐

---

**Built with ❤️ for Big Bite Kebabs and the power of voice AI**
