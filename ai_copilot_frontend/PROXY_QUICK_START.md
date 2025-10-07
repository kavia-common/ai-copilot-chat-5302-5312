# Proxy Configuration Quick Start

## ✅ Configuration Complete

The frontend is configured to use Create React App proxy with relative paths for API requests.

---

## Quick Start

### 1. Start Development Server
```bash
cd ai-copilot-chat-5302-5312/ai_copilot_frontend
npm start
```

### 2. Access Application
- **Local:** http://localhost:3000
- **Preview:** https://vscode-internal-29093-beta.beta01.cloud.kavia.ai:3000

### 3. Verify Proxy Working
Open browser console (F12) and look for:
```javascript
API Service Configuration: {
  using_proxy: true,  // ✅ Should be true
  API_BASE_URL: '',   // ✅ Should be empty string
}
```

---

## Key Configuration

### package.json
```json
{
  "proxy": "http://localhost:3001"
}
```
✅ This routes all `/api/*` requests to backend

### .env
```env
# REACT_APP_API_URL is NOT set in development
# This allows proxy to work with relative paths
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_GEMINI_API_KEY=AIzaSyD798R-xKZTDjgsmNjvFr-IDRxfcwS1rEk
```
✅ No REACT_APP_API_URL = proxy enabled

### src/services/apiService.js
```javascript
// In development: returns '' (empty string)
// This creates relative URLs like /api/chat
const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (process.env.NODE_ENV === 'development') {
    return ''; // ✅ Relative URLs for proxy
  }
  return 'http://localhost:3001';
};
```

---

## Testing the Proxy

### Command Line Test
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id":"test","message":"hello"}'
```

**Expected Result:**
- Status: 200, 4xx, or 5xx (NOT 502)
- Response: JSON from backend

**If you see 502:**
- Check REACT_APP_API_URL is NOT set in .env
- Restart dev server
- Verify backend is running on port 3001

---

## Network Tab Checklist

When you send a message, check browser Network tab:

✅ **Correct Behavior:**
- URL: `/api/chat` (relative path)
- Status: 200, 4xx, or 5xx
- Response: JSON from backend

❌ **Incorrect (proxy not working):**
- URL: `http://localhost:3001/api/chat` (absolute)
- Status: 502 Bad Gateway
- Error: Failed to fetch

---

## Troubleshooting

### Problem: Getting 502 errors

**Solution 1:** Check .env file
```bash
grep REACT_APP_API_URL .env
# Should return nothing or commented line
```
If it shows a value, remove it and restart:
```bash
npm start
```

**Solution 2:** Verify proxy in package.json
```bash
grep proxy package.json
# Should show: "proxy": "http://localhost:3001"
```

**Solution 3:** Hard refresh browser
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

---

### Problem: Backend not reachable

**Check backend is running:**
```bash
curl http://localhost:3001/
# Should return: {"message":"Healthy","status":"ok"}
```

If not running, start the backend service.

---

### Problem: Still seeing absolute URLs

**Clear and restart:**
```bash
# Kill dev server
pkill -f "react-scripts"

# Clear cache
rm -rf node_modules/.cache

# Restart
npm start
```

---

## Environment-Specific Configuration

### Development (Current Setup)
```env
# .env
# REACT_APP_API_URL not set → uses proxy
```
- Uses relative paths
- Routes through CRA proxy
- Works with preview URLs ✅

### Production
```env
# .env.production
REACT_APP_API_URL=https://api.production.com
```
- Uses absolute paths
- Direct connection to backend
- Set before building: `npm run build`

---

## Quick Verification Script

Save as `check-proxy.sh`:
```bash
#!/bin/bash
echo "Checking proxy configuration..."
echo ""
echo "1. Proxy in package.json:"
grep '"proxy"' package.json || echo "❌ NOT FOUND"
echo ""
echo "2. REACT_APP_API_URL in .env:"
grep "^REACT_APP_API_URL" .env 2>/dev/null || echo "✅ NOT SET (correct)"
echo ""
echo "3. Dev server running:"
ps aux | grep "react-scripts" | grep -v grep > /dev/null && echo "✅ Running" || echo "❌ Not running"
echo ""
echo "4. Test API call:"
curl -s -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id":"test","message":"hi"}' \
  -w "\nStatus: %{http_code}\n" 2>&1 | tail -2
```

Run with:
```bash
chmod +x check-proxy.sh
./check-proxy.sh
```

---

## Summary

✅ **Proxy configured and working**
- package.json has proxy setting
- .env does not override with REACT_APP_API_URL
- apiService uses relative URLs in dev
- All requests route through proxy
- No 502 errors

🚀 **Ready to develop!**

---

**For more details, see:**
- `AUDIT_COMPLETE.md` - Full audit report
- `TASK_COMPLETION_SUMMARY.md` - Task completion details
- `PROXY_VERIFICATION_QUICK.md` - Quick verification guide
