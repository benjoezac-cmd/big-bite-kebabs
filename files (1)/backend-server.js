// server.js - Big Bite Kebabs Backend API
// Complete Express server with Retell AI integration

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============================================================================
// CONFIGURATION
// ============================================================================

const RETELL_API_KEY = process.env.RETELL_API_KEY;
const RETELL_AGENT_ID = process.env.RETELL_AGENT_ID;
const RETELL_API_BASE = 'https://api.retellai.com/v2';

// Menu data (would typically come from database)
const menuData = {
  popular: [
    { id: 'mkr', name: 'Mix Kebab Roll', price: 20.00, category: 'kebabs' },
    { id: 'msp', name: 'Mix Snack Pack', price: 19.00, category: 'snackPacks' },
    { id: 'ham', name: 'Hungry Attack Meal', price: 34.00, category: 'meals' },
    { id: 'msp2', name: 'Mix Shish Plate', price: 47.00, category: 'plates' },
    { id: 'chips', name: 'Chips', price: 8.00, category: 'sides' },
  ],
  items: [
    // Kebabs
    { id: 'ckr', name: 'Chicken Kebab Roll', price: 18.00, category: 'kebabs' },
    { id: 'lkr', name: 'Lamb Kebab Roll', price: 19.00, category: 'kebabs' },
    { id: 'bkr', name: 'Beef Kebab Roll', price: 19.00, category: 'kebabs' },
    { id: 'mkr', name: 'Mix Kebab Roll', price: 20.00, category: 'kebabs' },
    // Snack Packs
    { id: 'csp', name: 'Chicken Snack Pack', price: 17.00, category: 'snackPacks' },
    { id: 'lsp', name: 'Lamb Snack Pack', price: 18.00, category: 'snackPacks' },
    { id: 'msp', name: 'Mix Snack Pack', price: 19.00, category: 'snackPacks' },
    // Plates
    { id: 'cp', name: 'Chicken Plate', price: 42.00, category: 'plates' },
    { id: 'lp', name: 'Lamb Plate', price: 45.00, category: 'plates' },
    { id: 'msp2', name: 'Mix Shish Plate', price: 47.00, category: 'plates' },
    // Sides
    { id: 'chips', name: 'Chips', price: 8.00, category: 'sides' },
  ]
};

// In-memory order storage (use database in production)
const orders = [];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function findMenuItem(nameOrId) {
  const searchTerm = nameOrId.toLowerCase();
  return menuData.items.find(item => 
    item.id === searchTerm || 
    item.name.toLowerCase().includes(searchTerm)
  );
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function generateOrderId() {
  return `BBK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// ============================================================================
// RETELL AI ENDPOINTS
// ============================================================================

/**
 * POST /api/retell/start-call
 * Creates a new web call and returns access token
 */
app.post('/api/retell/start-call', async (req, res) => {
  try {
    console.log('Starting new Retell AI call...');
    
    const { restaurantId, sessionId } = req.body;
    
    // Create web call with Retell AI
    const response = await axios.post(
      `${RETELL_API_BASE}/create-web-call`,
      {
        agent_id: RETELL_AGENT_ID,
        metadata: {
          restaurantId: restaurantId || 'big-bite-kebabs',
          sessionId: sessionId || generateOrderId(),
          timestamp: new Date().toISOString()
        },
        retell_llm_dynamic_variables: {
          restaurant_name: 'Big Bite Kebabs',
          location: 'Crossroads Homemaker Centre, Casula NSW',
          current_time: new Date().toLocaleTimeString('en-AU'),
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Web call created:', response.data.call_id);
    
    res.json({
      success: true,
      accessToken: response.data.access_token,
      callId: response.data.call_id,
      agentId: response.data.agent_id
    });
    
  } catch (error) {
    console.error('Error creating web call:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to start call',
      details: error.response?.data || error.message
    });
  }
});

/**
 * POST /api/retell/webhook
 * Handles webhooks from Retell AI
 */
app.post('/api/retell/webhook', async (req, res) => {
  try {
    const { event, call, data } = req.body;
    
    console.log(`Received webhook event: ${event}`);
    console.log('Call ID:', call?.call_id);
    
    switch (event) {
      case 'call_started':
        console.log('Call started successfully');
        break;
        
      case 'call_ended':
        console.log('Call ended');
        if (call?.transcript) {
          console.log('Transcript:', call.transcript);
          // Process order from transcript
          await processOrderFromCall(call);
        }
        break;
        
      case 'call_analyzed':
        console.log('Call analyzed');
        if (data?.analysis) {
          console.log('Analysis:', JSON.stringify(data.analysis, null, 2));
          // Extract structured data from analysis
          await handleCallAnalysis(call, data.analysis);
        }
        break;
        
      case 'call_recording_completed':
        console.log('Recording completed:', data?.recording_url);
        break;
        
      default:
        console.log('Unknown event type:', event);
    }
    
    // Always respond with 200 to acknowledge receipt
    res.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Process order from completed call
 */
async function processOrderFromCall(call) {
  try {
    // Extract order information from call metadata or custom analysis
    // In production, this would use structured output from Retell AI
    
    console.log('Processing order from call:', call.call_id);
    
    // Example: Parse from custom_analysis_data if configured
    if (call.custom_analysis_data) {
      const orderData = JSON.parse(call.custom_analysis_data);
      
      const order = {
        orderId: generateOrderId(),
        callId: call.call_id,
        items: orderData.items || [],
        total: calculateTotal(orderData.items || []),
        orderType: orderData.orderType || 'pickup',
        customerName: orderData.customerName || 'Unknown',
        customerPhone: orderData.customerPhone || '',
        customerAddress: orderData.customerAddress || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Save order
      orders.push(order);
      console.log('Order saved:', order.orderId);
      
      // Send to external system (Uber Eats, POS, etc.)
      await submitToOrderingSystem(order);
      
      return order;
    }
    
  } catch (error) {
    console.error('Error processing order:', error);
  }
}

/**
 * Handle structured analysis from call
 */
async function handleCallAnalysis(call, analysis) {
  try {
    // Extract entities and intent from analysis
    console.log('Handling call analysis...');
    
    // Example analysis structure:
    // {
    //   "intent": "place_order",
    //   "entities": {
    //     "items": [...],
    //     "orderType": "pickup",
    //     "customerInfo": {...}
    //   }
    // }
    
    if (analysis.intent === 'place_order' && analysis.entities) {
      const { items, orderType, customerInfo } = analysis.entities;
      
      const order = {
        orderId: generateOrderId(),
        callId: call.call_id,
        items: items || [],
        total: calculateTotal(items || []),
        orderType: orderType || 'pickup',
        customerName: customerInfo?.name || 'Unknown',
        customerPhone: customerInfo?.phone || '',
        customerAddress: customerInfo?.address || '',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      orders.push(order);
      console.log('Order confirmed from analysis:', order.orderId);
    }
    
  } catch (error) {
    console.error('Error handling analysis:', error);
  }
}

/**
 * Submit order to external system
 */
async function submitToOrderingSystem(order) {
  try {
    console.log('Submitting order to external system...');
    
    // Example: Send to Uber Eats API
    if (process.env.UBER_EATS_API_KEY) {
      // await axios.post('https://api.uber.com/v1/eats/orders', order, {...});
      console.log('Order sent to Uber Eats (mock)');
    }
    
    // Example: Send to POS system
    // await sendToPOS(order);
    
    // Example: Send confirmation SMS
    // await sendSMS(order.customerPhone, `Your order ${order.orderId} is confirmed!`);
    
    console.log('Order submitted successfully');
    
  } catch (error) {
    console.error('Error submitting order:', error);
  }
}

// ============================================================================
// RETELL AI FUNCTION CALLING HANDLERS
// ============================================================================

/**
 * POST /api/functions/calculate-total
 * Called by Retell AI agent to calculate order total
 */
app.post('/api/functions/calculate-total', (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items array' });
    }
    
    const total = calculateTotal(items);
    
    res.json({
      success: true,
      total: total.toFixed(2),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
    });
    
  } catch (error) {
    console.error('Error calculating total:', error);
    res.status(500).json({ error: 'Calculation failed' });
  }
});

/**
 * POST /api/functions/validate-menu-item
 * Called by Retell AI agent to validate menu items
 */
app.post('/api/functions/validate-menu-item', (req, res) => {
  try {
    const { itemName } = req.body;
    
    const item = findMenuItem(itemName);
    
    if (item) {
      res.json({
        success: true,
        valid: true,
        item: {
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category
        }
      });
    } else {
      res.json({
        success: true,
        valid: false,
        message: `Sorry, we don't have "${itemName}" on our menu.`
      });
    }
    
  } catch (error) {
    console.error('Error validating menu item:', error);
    res.status(500).json({ error: 'Validation failed' });
  }
});

/**
 * POST /api/functions/submit-order
 * Called by Retell AI agent to submit completed order
 */
app.post('/api/functions/submit-order', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Validate order data
    if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Order must contain at least one item' 
      });
    }
    
    if (!orderData.customerName || !orderData.customerPhone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Customer name and phone are required' 
      });
    }
    
    // Create order
    const order = {
      orderId: generateOrderId(),
      items: orderData.items,
      total: calculateTotal(orderData.items),
      orderType: orderData.orderType || 'pickup',
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress || '',
      specialInstructions: orderData.specialInstructions || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedReady: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
    };
    
    // Save order
    orders.push(order);
    console.log('Order submitted via function call:', order.orderId);
    
    // Submit to external systems
    await submitToOrderingSystem(order);
    
    res.json({
      success: true,
      orderId: order.orderId,
      estimatedReady: order.estimatedReady,
      message: `Order confirmed! Your order ${order.orderId} will be ready in 15-20 minutes.`
    });
    
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to submit order' 
    });
  }
});

// ============================================================================
// ORDER MANAGEMENT ENDPOINTS
// ============================================================================

/**
 * GET /api/orders
 * Get all orders (with optional filters)
 */
app.get('/api/orders', (req, res) => {
  try {
    const { status, customerPhone, limit = 50 } = req.query;
    
    let filteredOrders = [...orders];
    
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }
    
    if (customerPhone) {
      filteredOrders = filteredOrders.filter(o => o.customerPhone === customerPhone);
    }
    
    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    res.json({
      success: true,
      orders: filteredOrders.slice(0, parseInt(limit)),
      total: filteredOrders.length
    });
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

/**
 * GET /api/orders/:orderId
 * Get specific order by ID
 */
app.get('/api/orders/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = orders.find(o => o.orderId === orderId);
    
    if (order) {
      res.json({
        success: true,
        order
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

/**
 * POST /api/orders/create
 * Manually create order (non-voice)
 */
app.post('/api/orders/create', async (req, res) => {
  try {
    const orderData = req.body;
    
    const order = {
      orderId: generateOrderId(),
      items: orderData.items,
      total: calculateTotal(orderData.items),
      orderType: orderData.orderType,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress || '',
      specialInstructions: orderData.specialInstructions || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      source: 'web'
    };
    
    orders.push(order);
    
    res.json({
      success: true,
      order
    });
    
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

/**
 * PATCH /api/orders/:orderId/status
 * Update order status
 */
app.patch('/api/orders/:orderId/status', (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date().toISOString();
      
      res.json({
        success: true,
        order: orders[orderIndex]
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ============================================================================
// MENU ENDPOINTS
// ============================================================================

/**
 * GET /api/menu
 * Get full menu
 */
app.get('/api/menu', (req, res) => {
  try {
    res.json({
      success: true,
      menu: menuData
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

/**
 * GET /api/menu/:itemId
 * Get specific menu item
 */
app.get('/api/menu/:itemId', (req, res) => {
  try {
    const { itemId } = req.params;
    const item = findMenuItem(itemId);
    
    if (item) {
      res.json({
        success: true,
        item
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'Big Bite Kebabs API',
    version: '1.0.0',
    endpoints: {
      retell: [
        'POST /api/retell/start-call',
        'POST /api/retell/webhook'
      ],
      functions: [
        'POST /api/functions/calculate-total',
        'POST /api/functions/validate-menu-item',
        'POST /api/functions/submit-order'
      ],
      orders: [
        'GET /api/orders',
        'GET /api/orders/:orderId',
        'POST /api/orders/create',
        'PATCH /api/orders/:orderId/status'
      ],
      menu: [
        'GET /api/menu',
        'GET /api/menu/:itemId'
      ]
    }
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║           Big Bite Kebabs - Backend API Server            ║
║                                                            ║
║  Server running on port ${PORT}                              ║
║  Environment: ${process.env.NODE_ENV || 'development'}                              ║
║  Retell AI Agent ID: ${RETELL_AGENT_ID ? '✓ Configured' : '✗ Missing'}                    ║
║                                                            ║
║  API Documentation: http://localhost:${PORT}/                ║
║  Health Check: http://localhost:${PORT}/health             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  process.exit(0);
});

module.exports = app;
