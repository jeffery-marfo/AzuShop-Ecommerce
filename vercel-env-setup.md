# Vercel Environment Variables Setup

To fix the CORS error on your deployed site, you need to set up environment variables in Vercel:

## 1. Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Go to your project dashboard
3. Click on "Settings" tab
4. Click on "Environment Variables" in the left sidebar

## 2. Add These Environment Variables

### For Production:
```
VITE_API_BASE_URL = https://azushop-backend.onrender.com/api
VITE_PAYSTACK_PUBLIC_KEY = pk_live_3498486ee595514f29e1cdbe2ef44aea6afed664
```

### For Preview (optional):
```
VITE_API_BASE_URL = https://azushop-backend.onrender.com/api
VITE_PAYSTACK_PUBLIC_KEY = pk_live_3498486ee595514f29e1cdbe2ef44aea6afed664
```

## 3. Redeploy
After adding the environment variables:
1. Go to "Deployments" tab
2. Click "Redeploy" on your latest deployment
3. Or push a new commit to trigger a new deployment

## 4. Backend CORS Configuration (Important!)

Your backend on Render.com needs to allow requests from your Vercel domain. 

### Add this to your backend CORS configuration:
```javascript
const corsOptions = {
  origin: [
    'https://azu-shop-ecommerce.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### Or use this more permissive setting for development:
```javascript
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true,
  optionsSuccessStatus: 200
};
```

## 5. Test the Fix
After making these changes:
1. Wait for Vercel to redeploy (usually 2-3 minutes)
2. Visit your deployed site
3. Try to register a new account
4. Check browser console for any remaining errors
