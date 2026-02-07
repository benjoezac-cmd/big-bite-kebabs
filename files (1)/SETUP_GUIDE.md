# Big Bite Kebabs - Quick Start Guide

## Complete Setup in 30 Minutes

This guide will walk you through setting up the entire voice-powered ordering system from scratch.

---

## Prerequisites

Before you begin, ensure you have:

- [ ] Node.js 18+ installed ([Download](https://nodejs.org))
- [ ] npm or yarn package manager
- [ ] A Retell AI account ([Sign up](https://retellai.com))
- [ ] A code editor (VS Code recommended)
- [ ] Basic knowledge of React and Node.js

---

## Part 1: Retell AI Setup (10 minutes)

### Step 1: Create Retell AI Account

1. Go to [https://retellai.com](https://retellai.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Credentials

1. Navigate to **Settings → API Keys**
2. Click **Create New API Key**
3. Copy and save your API key (you'll need this later)
4. Note: Keep this key secret!

### Step 3: Create Your Agent

1. Go to **Agents** in the dashboard
2. Click **Create New Agent**
3. Fill in the details:

**Agent Name**: `Big Bite Kebabs Order Assistant`

**System Prompt**: Copy the following:

```
You are a friendly order-taking assistant for Big Bite Kebabs, a Turkish kebab restaurant 
located in Casula, NSW. Your job is to help customers place orders for pickup or delivery.

RESTAURANT INFORMATION:
- Name: Big Bite Kebabs
- Location: Crossroads Homemaker Centre, Casula NSW
- Hours: 10 AM - 9 PM Daily
- Food Type: Turkish/Halal Kebabs

MENU ITEMS & PRICES:
Popular Items:
- Chips: $8.00
- Mix Kebab Roll: $20.00
- Mix Snack Pack: $19.00
- Hungry Attack Meal: $34.00
- Mix Shish Plate: $47.00

Categories Available:
- Kebabs (chicken, lamb, beef, mix)
- Snack Packs (chips with meat and sauce)
- Plates (full meals with rice/salad)
- Burgers, Salads, Pide, Gozleme
- Desserts, Drinks

CONVERSATION FLOW:
1. Greet warmly: "Hi! Welcome to Big Bite Kebabs. Are you ordering for pickup or delivery?"
2. Take order: "What would you like to order today?"
3. Suggest if needed: "Our most popular items are..."
4. Confirm quantities: "How many would you like?"
5. Read back order: "Let me confirm: You have..."
6. Calculate total and state it clearly
7. Collect details: "Can I get your name and phone number?"
8. Finalize: "Your order will be ready in 15-20 minutes. Total is $X."

RULES:
- Always be friendly and patient
- Speak clearly and naturally
- If item not available, suggest alternatives
- Always confirm the complete order before collecting personal details
- For delivery, ask for full address
- Keep conversation efficient but warm
```

**Voice Settings**:
- Voice: Select "Rachel" or similar friendly voice
- Speed: 1.0x
- Temperature: 0.8 (natural variation)

**Advanced Settings**:
- Response Delay: 100ms
- Interruption Sensitivity: Medium (0.5)
- Language: English (US)

4. Click **Create Agent**
5. **IMPORTANT**: Copy the Agent ID (starts with `agent_`)

### Step 4: Configure Webhooks (Optional for MVP)

1. Go to **Settings → Webhooks**
2. Add webhook URL: `https://your-backend.com/api/retell/webhook`
3. Enable events:
   - ✅ call_started
   - ✅ call_ended
   - ✅ call_analyzed
4. Save settings

> **Note**: For local development, you can skip webhooks and test directly in the Retell playground first.

---

## Part 2: Backend Setup (10 minutes)

### Step 1: Create Backend Directory

```bash
mkdir big-bite-backend
cd big-bite-backend
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express cors dotenv axios body-parser
npm install --save-dev nodemon
```

### Step 3: Create Environment File

Create a `.env` file in the root of your backend directory:

```bash
# .env
RETELL_API_KEY=your_api_key_here
RETELL_AGENT_ID=agent_your_agent_id_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Replace** `your_api_key_here` and `agent_your_agent_id_here` with the actual values from Step 2 and 3 above.

### Step 4: Add Server File

Copy the `backend-server.js` file provided in this project to your backend directory and rename it to `server.js`.

### Step 5: Update package.json

Add the following scripts to your `package.json`:

```json
{
  "name": "big-bite-backend",
  "version": "1.0.0",
  "description": "Backend API for Big Bite Kebabs voice ordering",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"No tests yet\" && exit 0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0",
    "body-parser": "^1.20.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### Step 6: Test Backend

```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║           Big Bite Kebabs - Backend API Server            ║
║  Server running on port 3001                              ║
║  Environment: development                                 ║
║  Retell AI Agent ID: ✓ Configured                        ║
╚════════════════════════════════════════════════════════════╝
```

Test it by visiting: `http://localhost:3001/health`

---

## Part 3: Frontend Setup (10 minutes)

### Step 1: Create React App

```bash
# In a separate terminal/directory
npx create-react-app big-bite-frontend
cd big-bite-frontend
```

### Step 2: Install Dependencies

```bash
npm install @retellai/web-client lucide-react
```

### Step 3: Create Environment File

Create a `.env.local` file in your frontend directory:

```bash
REACT_APP_API_URL=http://localhost:3001
```

### Step 4: Replace App.jsx

1. Delete the existing `src/App.js` file
2. Copy the `big-bite-kebabs-website.jsx` file to `src/App.js`
3. Update the API URL in the file to use the environment variable:

```javascript
// In the startVoiceOrder function, replace the fetch URL:
const response = await fetch(`${process.env.REACT_APP_API_URL}/api/retell/start-call`, {
  // ... rest of the code
});
```

### Step 5: Update package.json

Your `package.json` should include:

```json
{
  "name": "big-bite-frontend",
  "version": "1.0.0",
  "dependencies": {
    "@retellai/web-client": "^1.0.0",
    "lucide-react": "^0.300.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Step 6: Start Frontend

```bash
npm start
```

The app should open at `http://localhost:3000`

---

## Part 4: Testing (5 minutes)

### Test Checklist

#### Backend Testing

1. **Health Check**
   ```bash
   curl http://localhost:3001/health
   ```
   Expected: `{"status":"healthy",...}`

2. **Menu API**
   ```bash
   curl http://localhost:3001/api/menu
   ```
   Expected: JSON with menu items

3. **Start Call Endpoint** (using curl or Postman)
   ```bash
   curl -X POST http://localhost:3001/api/retell/start-call \
     -H "Content-Type: application/json" \
     -d '{"restaurantId":"big-bite-kebabs"}'
   ```
   Expected: `{"success":true,"accessToken":"...","callId":"..."}`

#### Frontend Testing

1. **Open Homepage**
   - Navigate to `http://localhost:3000`
   - Verify the page loads with Big Bite Kebabs branding
   - Check that the "Order by Voice" button is visible

2. **Click "View Menu"**
   - Click the "View Menu" button
   - Verify menu items are displayed with prices
   - Check that you can navigate back to homepage

3. **Test Voice Ordering** (Important!)
   - Click "Order by Voice"
   - **Allow microphone access** when prompted
   - Wait for "AI Assistant is Listening" message
   - Speak clearly: "I'd like two mix kebab rolls"
   - Observe the conversation
   - Click "End Call" when done

### Common Issues & Solutions

**Issue**: Microphone access denied
- **Solution**: Go to browser settings → Site settings → Allow microphone for localhost

**Issue**: "Failed to start call" error
- **Solution**: Check that:
  1. Backend is running (`npm run dev` in backend)
  2. RETELL_API_KEY is correct in `.env`
  3. RETELL_AGENT_ID is correct in `.env`
  4. Network tab shows 200 response from `/api/retell/start-call`

**Issue**: Voice agent doesn't respond
- **Solution**:
  1. Test agent in Retell AI playground first
  2. Check agent is published (not in draft mode)
  3. Verify microphone is working (test in browser console)

**Issue**: CORS errors
- **Solution**: Verify `CORS_ORIGIN` in backend `.env` matches frontend URL (default: `http://localhost:3000`)

---

## Part 5: Production Deployment

### Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your backend repository
5. Add environment variables:
   ```
   RETELL_API_KEY=your_production_key
   RETELL_AGENT_ID=agent_your_id
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```
6. Deploy!
7. Copy the generated URL (e.g., `https://bigbite-production.up.railway.app`)

### Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project" → Import your frontend repository
4. Configure:
   - Framework Preset: Create React App
   - Environment Variables:
     ```
     REACT_APP_API_URL=https://bigbite-production.up.railway.app
     ```
5. Deploy!
6. Your site will be live at `https://your-project.vercel.app`

### Update Retell AI Webhook

1. Go to Retell AI dashboard
2. Settings → Webhooks
3. Update webhook URL to: `https://bigbite-production.up.railway.app/api/retell/webhook`
4. Save

---

## Next Steps

Now that your basic system is running:

### Immediate Enhancements
- [ ] Add loading states and error messages
- [ ] Implement order confirmation emails/SMS
- [ ] Add customer order history
- [ ] Create admin dashboard for orders

### Phase 2 Features
- [ ] Payment integration (Stripe/Square)
- [ ] Real-time order tracking
- [ ] Menu customization (e.g., "no onions")
- [ ] Loyalty program

### Phase 3 Advanced
- [ ] Multi-language support
- [ ] Scheduled orders
- [ ] Catering orders
- [ ] Analytics dashboard

---

## Troubleshooting Guide

### Backend won't start

```bash
# Check if port 3001 is already in use
lsof -i :3001
# Kill the process if needed
kill -9 <PID>

# Check Node version (need 18+)
node -v

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Frontend won't connect to backend

```bash
# Check network tab in browser DevTools
# Look for failed requests to localhost:3001

# Verify environment variables
echo $REACT_APP_API_URL

# Clear React cache and restart
rm -rf node_modules/.cache
npm start
```

### Voice agent not working

1. **Test in Retell AI Playground**
   - Go to your agent in the dashboard
   - Click "Test in Playground"
   - If it works there but not in your app, the issue is with your integration

2. **Check browser console**
   - Look for errors related to Retell SDK
   - Verify microphone permissions

3. **Verify API key**
   - Make sure you're using the correct production/development key
   - Check that the key has the right permissions

---

## Support Resources

- **Retell AI Documentation**: https://docs.retellai.com
- **Retell AI Discord**: [Join community]
- **React Documentation**: https://react.dev
- **Express.js Guide**: https://expressjs.com

---

## File Structure Summary

```
project-root/
├── big-bite-backend/
│   ├── server.js                 # Main backend server
│   ├── package.json
│   ├── .env                      # API keys (don't commit!)
│   └── .gitignore
│
├── big-bite-frontend/
│   ├── src/
│   │   └── App.js               # Main React component
│   ├── public/
│   ├── package.json
│   ├── .env.local               # Frontend config (don't commit!)
│   └── .gitignore
│
└── DOCUMENTATION.md             # Full technical docs
```

---

## Quick Reference Commands

```bash
# Backend
cd big-bite-backend
npm run dev                # Start development server
npm start                  # Start production server

# Frontend
cd big-bite-frontend
npm start                  # Start development server
npm run build              # Build for production

# Testing
curl http://localhost:3001/health           # Test backend
curl http://localhost:3001/api/menu         # Get menu
```

---

## Security Checklist

Before going live:

- [ ] Change all API keys to production keys
- [ ] Add rate limiting to API endpoints
- [ ] Implement HTTPS (handled by Vercel/Railway)
- [ ] Add input validation and sanitization
- [ ] Set up proper CORS policies
- [ ] Enable webhook signature verification
- [ ] Add authentication for admin endpoints
- [ ] Set up error tracking (Sentry)
- [ ] Configure proper logging
- [ ] Back up database regularly

---

## Success! 🎉

If you've made it this far, you should have:

✅ A working voice-powered ordering website  
✅ Backend API connected to Retell AI  
✅ Frontend with beautiful UI  
✅ End-to-end order flow  

**Test your complete system:**
1. Open your website
2. Click "Order by Voice"
3. Say: "I want two mix kebab rolls for pickup"
4. Confirm your order
5. Check the backend logs to see the order was received

Congratulations! You've built a production-ready voice ordering system! 🚀

---

## Get Help

Stuck? Here's how to get help:

1. **Check the logs**: Most issues show up in console/terminal
2. **Read the error message**: It usually tells you what's wrong
3. **Search the docs**: Retell AI docs are comprehensive
4. **Ask on Discord**: Retell AI community is helpful
5. **Check GitHub Issues**: See if others had the same problem

Good luck! 🍽️
