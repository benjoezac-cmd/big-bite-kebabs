# Big Bite Kebabs - Voice-Powered Ordering System
## Complete System Architecture & Retell AI Integration Guide

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Website Structure](#website-structure)
3. [Retell AI Integration](#retell-ai-integration)
4. [Voice Agent Configuration](#voice-agent-configuration)
5. [API Architecture](#api-architecture)
6. [Conversation Flow](#conversation-flow)
7. [Implementation Guide](#implementation-guide)
8. [Testing & Deployment](#testing--deployment)

---

## 1. System Overview

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                    User (Mobile/Desktop)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              React Frontend (Next.js/Vite)                   │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │  Homepage  │  │ Menu Page  │  │ Voice Call Interface │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Retell AI Web Client SDK                        │
│              (Voice Recognition & TTS)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend API Server                         │
│                   (Node.js/Express)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  /api/retell/start-call    (Generate Access Token)  │  │
│  │  /api/retell/register-call (Webhook Handler)        │  │
│  │  /api/orders/create        (Process Order)          │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         ▼                             ▼
┌──────────────────┐         ┌──────────────────┐
│   Retell AI API  │         │  Database/Store  │
│   (Voice Agent)  │         │  (Orders, Menu)  │
└──────────────────┘         └──────────────────┘
```

### Technology Stack
- **Frontend**: React 18+ with Hooks
- **Styling**: CSS-in-JS (styled-jsx) or Tailwind CSS
- **Voice**: Retell AI Web Client SDK
- **Backend**: Node.js with Express
- **Database**: PostgreSQL/MongoDB (for production) or Mock API (for demo)
- **Hosting**: Vercel/Netlify (Frontend) + Railway/Render (Backend)

---

## 2. Website Structure

### Pages & Components

#### A. Homepage (`/`)
**Purpose**: Main landing page with voice ordering CTA

**Components**:
- Hero Section with restaurant info
- Primary CTA: "Order by Voice" button
- Popular items showcase
- "How It Works" section
- Secondary navigation to menu

**Key Features**:
- Responsive design (mobile-first)
- Animated elements (fade-in, stagger)
- Clear value proposition
- Prominent voice ordering button

#### B. Menu Page (`/menu`)
**Purpose**: Traditional menu browsing experience

**Components**:
- Back navigation
- Categorized menu sections
- Item cards with prices
- Sticky footer with voice order button

**Key Features**:
- Searchable/filterable (optional enhancement)
- Category navigation
- Quick order from menu items

#### C. Voice Call Interface (Modal Overlay)
**Purpose**: Active voice ordering session

**Components**:
- Voice animation (pulsing microphone)
- Call status indicators
- Conversation tips
- End call button

**States**:
- `connecting`: "Connecting to AI Assistant..."
- `active`: "AI Assistant is Listening"
- `ended`: Transition to order summary

#### D. Order Summary (Modal Overlay)
**Purpose**: Review and confirm order before payment

**Components**:
- Order items list
- Total calculation
- Customer details
- Order type (pickup/delivery)
- Action buttons (Confirm/Cancel)

---

## 3. Retell AI Integration

### Installation

```bash
# Install Retell AI Web Client
npm install @retellai/web-client

# Or via CDN in HTML
<script src="https://cdn.jsdelivr.net/npm/@retellai/web-client@latest/dist/index.umd.min.js"></script>
```

### Frontend Integration

```javascript
import { RetellWebClient } from '@retellai/web-client';

// Initialize client
const retellClient = new RetellWebClient();

// Start call
async function startVoiceOrder() {
  try {
    // 1. Get access token from your backend
    const response = await fetch('/api/retell/start-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantId: 'big-bite-kebabs',
        menuContext: menuData
      })
    });
    
    const { accessToken } = await response.json();
    
    // 2. Start the call
    await retellClient.startCall({
      accessToken: accessToken,
      sampleRate: 24000,
      enableUpdate: true,
      captureDeviceId: 'default' // microphone
    });
    
    // 3. Listen to events
    retellClient.on('call_started', () => {
      console.log('Call started');
      setCallStatus('active');
    });
    
    retellClient.on('call_ended', () => {
      console.log('Call ended');
      setCallStatus('ended');
    });
    
    retellClient.on('update', (update) => {
      console.log('Call update:', update);
      // Handle real-time updates (transcripts, etc.)
    });
    
    retellClient.on('error', (error) => {
      console.error('Call error:', error);
      setCallStatus('error');
    });
    
  } catch (error) {
    console.error('Failed to start call:', error);
  }
}

// Stop call
function stopVoiceOrder() {
  retellClient.stopCall();
}
```

### Backend API Endpoints

#### `/api/retell/start-call` - Generate Access Token

```javascript
// backend/routes/retell.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/start-call', async (req, res) => {
  try {
    const { restaurantId, menuContext } = req.body;
    
    // Call Retell AI to register a new call
    const response = await axios.post(
      'https://api.retellai.com/v2/create-web-call',
      {
        agent_id: process.env.RETELL_AGENT_ID, // Your configured agent
        metadata: {
          restaurantId,
          menuContext: JSON.stringify(menuContext)
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Return access token to frontend
    res.json({
      accessToken: response.data.access_token,
      callId: response.data.call_id
    });
    
  } catch (error) {
    console.error('Error creating web call:', error);
    res.status(500).json({ error: 'Failed to start call' });
  }
});

module.exports = router;
```

#### `/api/retell/webhook` - Handle Agent Events

```javascript
// backend/routes/retell.js
router.post('/webhook', async (req, res) => {
  try {
    const { event, call } = req.body;
    
    switch (event) {
      case 'call_started':
        console.log('Call started:', call.call_id);
        break;
        
      case 'call_ended':
        console.log('Call ended:', call.call_id);
        // Extract order from call transcript
        await processOrderFromTranscript(call);
        break;
        
      case 'call_analyzed':
        console.log('Call analyzed:', call.analysis);
        break;
    }
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook failed' });
  }
});

async function processOrderFromTranscript(call) {
  // Extract structured order data from call.transcript
  // This would use call.custom_analysis_data if configured
  const orderData = extractOrderFromCall(call);
  
  // Save to database
  await saveOrder(orderData);
  
  // Send to Uber Eats API or internal system
  await submitToOrderingSystem(orderData);
}
```

---

## 4. Voice Agent Configuration

### Retell AI Agent Setup

Create an agent in the Retell AI dashboard with the following configuration:

#### Agent Prompt (System Instructions)

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

Categories:
- Kebabs (chicken, lamb, beef, mix)
- Snack Packs (chips with meat and sauce)
- Plates (full meals with rice/salad)
- Burgers, Salads, Pide, Gozleme
- Desserts, Drinks

CONVERSATION FLOW:
1. Greet the customer warmly
2. Ask if they'd like pickup or delivery
3. Ask what they'd like to order
4. Suggest popular items if they're unsure
5. Confirm quantities and any customizations
6. Read back the complete order with prices
7. Ask for their name and phone number
8. Confirm total and delivery/pickup time
9. Thank them and end the call

IMPORTANT RULES:
- Always be friendly and patient
- Speak clearly and naturally
- If they ask for something not on the menu, politely explain it's not available
- Confirm the order before collecting personal details
- Keep the conversation efficient but warm
- For delivery, ask for their address
- For pickup, confirm they know the location

EXAMPLE CONVERSATION:
Agent: "Hi! Welcome to Big Bite Kebabs. Are you ordering for pickup or delivery today?"
Customer: "Pickup please"
Agent: "Great! What can I get for you?"
Customer: "Two mix kebab rolls and one chips"
Agent: "Perfect! So that's two Mix Kebab Rolls at $20 each, and one Chips at $8. 
That comes to $48. Can I get your name and phone number for the pickup?"
Customer: "John, 0412 345 678"
Agent: "Thanks John! Your order will be ready for pickup in about 15 minutes at 
Crossroads Homemaker Centre. Your total is $48. See you soon!"
```

#### Function Calling Configuration

Configure custom functions for the agent to use:

**Function 1: `calculate_order_total`**
```json
{
  "name": "calculate_order_total",
  "description": "Calculate the total price for an order",
  "parameters": {
    "type": "object",
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {"type": "string"},
            "quantity": {"type": "number"},
            "price": {"type": "number"}
          }
        }
      }
    },
    "required": ["items"]
  }
}
```

**Function 2: `submit_order`**
```json
{
  "name": "submit_order",
  "description": "Submit the completed order",
  "parameters": {
    "type": "object",
    "properties": {
      "items": {"type": "array"},
      "total": {"type": "number"},
      "orderType": {"type": "string", "enum": ["pickup", "delivery"]},
      "customerName": {"type": "string"},
      "customerPhone": {"type": "string"},
      "customerAddress": {"type": "string"}
    },
    "required": ["items", "total", "orderType", "customerName", "customerPhone"]
  }
}
```

#### Voice Settings
```json
{
  "voice_id": "11labs-Rachel", // or other Retell AI voice
  "voice_speed": 1.0,
  "voice_temperature": 0.8,
  "response_delay": 100,
  "interruption_sensitivity": 0.5,
  "language": "en-US"
}
```

---

## 5. API Architecture

### Complete Backend Structure

```
backend/
├── server.js                 # Express server setup
├── routes/
│   ├── retell.js            # Retell AI endpoints
│   └── orders.js            # Order management
├── services/
│   ├── retellService.js     # Retell AI client wrapper
│   ├── orderService.js      # Order processing logic
│   └── uberEatsService.js   # Uber Eats API integration
├── models/
│   ├── Order.js             # Order database model
│   └── Menu.js              # Menu items model
├── utils/
│   ├── validators.js        # Input validation
│   └── logger.js            # Logging utility
└── config/
    └── index.js             # Environment config
```

### Key API Flows

#### Flow 1: Start Voice Call
```
Frontend                Backend                 Retell AI
   |                       |                        |
   |--POST /start-call---->|                        |
   |                       |--POST /v2/create-web---|
   |                       |        call            |
   |                       |<---access_token--------|
   |<--{accessToken}-------|                        |
   |                       |                        |
   |--startCall(token)-------------------->|
   |                       |                |
```

#### Flow 2: Process Order During Call
```
Retell AI Agent          Backend Webhook         Database
      |                       |                      |
      |--call_analyzed------->|                      |
      |  (structured data)    |                      |
      |                       |--INSERT order------->|
      |                       |<--order_id-----------|
      |                       |                      |
      |                       |--POST to Uber Eats-->|
      |                       |                      |
```

### Environment Variables

```bash
# .env file
RETELL_API_KEY=your_retell_api_key_here
RETELL_AGENT_ID=your_agent_id_here
DATABASE_URL=postgresql://user:pass@host:5432/bigbite
UBER_EATS_API_KEY=your_uber_eats_key (optional)
PORT=3001
NODE_ENV=production
```

---

## 6. Conversation Flow

### Complete Conversation Script

**STEP 1: Greeting**
```
Agent: "Hi! Welcome to Big Bite Kebabs. Are you calling to place an 
order for pickup or delivery?"

Expected Responses:
- "Pickup" → Continue to Step 2
- "Delivery" → Ask for address, then Step 2
- "I'm not sure" → Explain both options
```

**STEP 2: Menu Introduction**
```
Agent: "Great! What would you like to order today? Our most popular 
items are the Mix Kebab Roll for $20, Mix Snack Pack for $19, and 
our Hungry Attack Meal for $34. Or I can tell you about other menu items."

Expected Responses:
- Names specific item → Confirm and ask quantity
- "What else do you have?" → List categories
- "What do you recommend?" → Suggest popular items
```

**STEP 3: Item Selection & Quantity**
```
Agent: "How many Mix Kebab Rolls would you like?"

Expected Responses:
- Number → Add to order, ask if anything else
- "Just one" → Add to order
- "Actually, can I get..." → Adjust order
```

**STEP 4: Order Confirmation**
```
Agent: "Let me confirm your order: You have two Mix Kebab Rolls at 
$20 each, and one Chips at $8. That's a total of $48. Is that correct?"

Expected Responses:
- "Yes" → Proceed to Step 5
- "No, I want to change..." → Allow modifications
- "Can you add..." → Add more items
```

**STEP 5: Customer Information**
```
Agent: "Perfect! Can I get your name and phone number for the order?"

Expected Responses:
- Provides both → Confirm and move to Step 6
- Provides only name → Ask for phone
- Unclear → Ask to repeat
```

**STEP 6: Finalization**
```
For PICKUP:
"Thanks, John! Your order will be ready for pickup in about 15-20 
minutes at our Crossroads Homemaker Centre location in Casula. 
Your total is $48. See you soon!"

For DELIVERY:
"Thanks, John! Your order will be delivered to [address] in about 
30-40 minutes. Your total is $48 including delivery. We'll call 
you when we're on the way!"
```

### Error Handling Scripts

**Item Not Available**
```
"I'm sorry, we don't have [item] on our menu right now. Can I suggest 
our [similar item] instead? Or would you like me to tell you what we 
do have?"
```

**Unclear Input**
```
"I didn't quite catch that. Could you repeat what you'd like to order?"
```

**Large/Complex Order**
```
"That's quite a big order! Let me read it back to make sure I got 
everything right..."
```

---

## 7. Implementation Guide

### Step-by-Step Setup

#### Phase 1: Retell AI Setup (30 minutes)

1. **Create Retell AI Account**
   - Go to https://retellai.com
   - Sign up for an account
   - Get API key from dashboard

2. **Create Voice Agent**
   - Navigate to "Agents" in dashboard
   - Click "Create New Agent"
   - Paste the agent prompt from Section 4
   - Configure voice settings
   - Enable function calling
   - Test in playground

3. **Configure Webhooks**
   - Add webhook URL: `https://your-backend.com/api/retell/webhook`
   - Enable events: `call_started`, `call_ended`, `call_analyzed`
   - Set authentication (if needed)

#### Phase 2: Backend Setup (1-2 hours)

1. **Initialize Node.js Project**
```bash
mkdir big-bite-backend
cd big-bite-backend
npm init -y
npm install express axios dotenv cors body-parser
```

2. **Create Server Structure**
```bash
mkdir routes services models config
touch server.js .env
```

3. **Implement Core Endpoints**
   - Create `/api/retell/start-call`
   - Create `/api/retell/webhook`
   - Create `/api/orders/create`

4. **Test with Postman**
   - Test token generation
   - Test webhook reception
   - Verify order creation

#### Phase 3: Frontend Setup (2-3 hours)

1. **Initialize React Project**
```bash
npx create-react-app big-bite-frontend
cd big-bite-frontend
npm install @retellai/web-client lucide-react
```

2. **Build Components**
   - Implement HomePage
   - Implement MenuPage
   - Implement VoiceCallInterface
   - Implement OrderSummary

3. **Integrate Retell SDK**
   - Initialize client
   - Implement start/stop call functions
   - Handle call events
   - Test microphone permissions

4. **Style with CSS**
   - Apply brand colors (orange gradient)
   - Make responsive
   - Add animations
   - Test on mobile

#### Phase 4: Testing (1-2 hours)

1. **Voice Agent Testing**
   - Test different order scenarios
   - Test error handling
   - Test interruptions
   - Test unclear speech

2. **Integration Testing**
   - End-to-end order flow
   - Test order submission
   - Verify webhook delivery
   - Test on multiple devices

3. **User Acceptance Testing**
   - Get feedback from real users
   - Measure completion rate
   - Check for confusion points

#### Phase 5: Deployment (1 hour)

1. **Deploy Backend**
   - Choose platform (Railway, Render, Heroku)
   - Add environment variables
   - Deploy and get URL

2. **Deploy Frontend**
   - Choose platform (Vercel, Netlify)
   - Configure API endpoint
   - Deploy and test

3. **Update Retell Webhook**
   - Update webhook URL to production backend
   - Test production flow

---

## 8. Testing & Deployment

### Testing Checklist

**Functional Testing**
- [ ] Voice call starts successfully
- [ ] Microphone permissions handled correctly
- [ ] Agent understands common phrases
- [ ] Order items are correctly captured
- [ ] Quantities are accurate
- [ ] Prices calculate correctly
- [ ] Customer details are collected
- [ ] Order type (pickup/delivery) is recorded
- [ ] Order summary displays correctly
- [ ] Call can be ended gracefully
- [ ] Multiple items can be ordered
- [ ] Modifications are handled

**Edge Cases**
- [ ] Network interruption during call
- [ ] Microphone denied
- [ ] Very noisy environment
- [ ] Strong accents
- [ ] Multiple speakers
- [ ] Very long orders
- [ ] Invalid menu items requested
- [ ] Missing customer information
- [ ] Browser compatibility (Chrome, Safari, Firefox)

**Performance**
- [ ] Call connects in < 3 seconds
- [ ] Voice latency < 500ms
- [ ] No audio dropouts
- [ ] Page loads in < 2 seconds
- [ ] Smooth animations
- [ ] Mobile responsive

### Deployment Configuration

**Frontend (Vercel)**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "react",
  "env": {
    "REACT_APP_API_URL": "https://your-backend.railway.app"
  }
}
```

**Backend (Railway)**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Production Environment Variables

```bash
# Frontend (.env.production)
REACT_APP_API_URL=https://bigbite-api.railway.app
REACT_APP_RETELL_PUBLIC_KEY=pk_live_xxxxx

# Backend (.env)
RETELL_API_KEY=sk_live_xxxxx
RETELL_AGENT_ID=agent_xxxxx
DATABASE_URL=postgresql://...
WEBHOOK_SECRET=your_webhook_secret
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://bigbitke kebabs.com
```

### Monitoring & Analytics

**Recommended Tools**
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics / Mixpanel
- **Uptime**: UptimeRobot
- **Logs**: Datadog / LogRocket

**Key Metrics to Track**
1. Call completion rate
2. Average order time
3. Order accuracy rate
4. User satisfaction (post-order survey)
5. Technical error rate
6. Peak usage times
7. Most popular items ordered via voice

---

## Sample Environment Setup

### Complete `.env.example`

```bash
# Retell AI Configuration
RETELL_API_KEY=your_api_key_here
RETELL_AGENT_ID=your_agent_id_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bigbite
DB_POOL_MIN=2
DB_POOL_MAX=10

# Server
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# External Services (Optional)
UBER_EATS_API_KEY=your_uber_eats_key
UBER_EATS_STORE_ID=your_store_id

# Security
JWT_SECRET=your_jwt_secret_here
WEBHOOK_SECRET=your_webhook_secret_here

# Feature Flags
ENABLE_VOICE_ORDERING=true
ENABLE_DELIVERY=true
ENABLE_PAYMENT=false
```

---

## Next Steps & Enhancements

### Phase 1 MVP (Current Scope)
- ✅ Voice ordering interface
- ✅ Menu display
- ✅ Order summary
- ✅ Basic Retell AI integration

### Phase 2 Enhancements
- [ ] Payment integration (Stripe/Square)
- [ ] Order tracking
- [ ] SMS confirmations
- [ ] Email receipts
- [ ] Customer accounts
- [ ] Order history

### Phase 3 Advanced Features
- [ ] Multi-language support (Arabic, Turkish)
- [ ] Loyalty program
- [ ] Special offers/coupons
- [ ] Dietary preferences (no onions, extra sauce)
- [ ] Scheduled orders
- [ ] Catering orders

### Phase 4 Analytics
- [ ] Dashboard for restaurant owner
- [ ] Sales analytics
- [ ] Popular items tracking
- [ ] Peak hours analysis
- [ ] Customer insights

---

## Support & Resources

**Retell AI Documentation**
- https://docs.retellai.com
- https://docs.retellai.com/api-reference

**Example Code Repositories**
- Retell AI Examples: https://github.com/RetellAI/examples
- Web Client Demo: https://github.com/RetellAI/web-client-demo

**Community Support**
- Retell AI Discord: [Join Link]
- Stack Overflow: Tag `retell-ai`

**Contact**
- Technical Issues: support@retellai.com
- Big Bite Kebabs: +61 2 9609 4752

---

## License & Credits

This project template is created for Big Bite Kebabs restaurant.
Powered by Retell AI voice technology.

Built with ❤️ for seamless voice-powered food ordering.
