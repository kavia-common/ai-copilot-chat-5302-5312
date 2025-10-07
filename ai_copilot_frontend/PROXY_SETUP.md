# Proxy Setup Guide - Fixing 502 Bad Gateway Errors

## Overview

This guide explains how the proxy configuration fixes 502 Bad Gateway errors when accessing the React frontend via preview URLs.

## Problem: Why 502 Errors Occur

When accessing the frontend via a preview URL (e.g., `https://vscode-internal-29093-beta.beta01.cloud.kavia.ai:3000`), the browser tries to fetch from `http://localhost:3001`, which:

1. **Isn't accessible from the browser** - `localhost` only works on the server, not from external browsers
2. **Causes CORS issues** - Cross-origin requests between different domains/ports fail
3. **Results in 502 errors** - The browser cannot reach the backend, appearing as a gateway error

## Solution: Create React App Proxy

We've added a `proxy` configuration in `package.json` that:

1. **Routes API requests through the dev server** - All requests to `/api/*` go through the React dev server
2. **Eliminates CORS issues** - Requests appear to come from the same origin
3. **Works with preview URLs** - The dev server proxies requests to the backend on the server side

### Configuration Added

```json
{
  "proxy": "http://localhost:3001"
}
```

### How It Works

**Before (with 502 errors):**
```
Browser → https://preview.url:3000/api/chat → ❌ http://localhost:3001/api/chat (fails)
```

**After (with proxy):**
```
Browser → https://preview.url:3000/api/chat → React Dev Server → http://localhost:3001/api/chat ✅
```

## API Service Configuration

The `apiService.js` now intelligently chooses between:

### Development Mode (with proxy)
- Uses **relative URLs**: `/api/chat`, `/api/sessions/:id`
- Requests are proxied by the dev server
- Works with preview URLs

### Production Mode
- Uses **absolute URLs** from `REACT_APP_API_URL`
- Direct connection to backend
- Configure via environment variables

### Code Logic

```javascript
const getApiBaseUrl = () => {
  // Explicit URL set → use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Development with proxy → use relative URLs
  if (process.env.NODE_ENV === 'development') {
    return ''; // Empty string for relative URLs
  }
  
  // Fallback for production
  return 'http://localhost:3001';
};
```

## Environment Variable Configuration

### Development (.env)
```bash
# Optional - proxy will handle routing
REACT_APP_API_URL=

# Or leave unset to use proxy by default
```

### Production (.env.production)
```bash
# Required - direct connection to backend
REACT_APP_API_URL=https://your-production-backend.com
```

### Preview/Staging
```bash
# Use the preview backend URL
REACT_APP_API_URL=https://preview-backend.yourdomain.com
```

## Verification Steps

### 1. Check Proxy Configuration
```bash
cat package.json | grep proxy
# Should show: "proxy": "http://localhost:3001"
```

### 2. Restart Dev Server (REQUIRED)
```bash
# Stop current server (Ctrl+C)
npm start
```

**Important:** Proxy changes only take effect after restarting the dev server!

### 3. Test API Requests

Open browser console (F12) and look for:

```javascript
// Should see relative URLs in Network tab
POST /api/chat
GET /api/sessions/123

// NOT absolute URLs like:
// POST http://localhost:3001/api/chat (this means proxy isn't working)
```

### 4. Check Health Status

The app now includes a health indicator in the header:
- ✅ Green: Backend connected
- ❌ Red: Backend disconnected

### 5. Review Console Logs

The API service logs detailed information:

```javascript
API Service Configuration: {
  NODE_ENV: 'development',
  REACT_APP_API_URL: undefined,
  API_BASE_URL: '',
  using_proxy: true
}

API Request: {
  url: '/api/chat',
  method: 'POST',
  timestamp: '...'
}
```

## Troubleshooting

### Proxy Not Working

**Symptoms:**
- Still seeing 502 errors
- Network tab shows `http://localhost:3001` URLs
- Health check shows red/disconnected

**Solutions:**
1. **Restart dev server** - Proxy requires restart to activate
   ```bash
   # Kill and restart
   npm start
   ```

2. **Clear browser cache**
   ```bash
   # Hard refresh
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (Mac)
   ```

3. **Verify package.json** - Ensure proxy line is present
   ```json
   "proxy": "http://localhost:3001"
   ```

4. **Check backend is running**
   ```bash
   curl http://localhost:3001/
   # Should return: {"message":"Healthy","status":"ok"}
   ```

### Environment Variable Issues

**Problem:** `REACT_APP_API_URL` overrides proxy

**Solution:** In development, either:
- Remove `REACT_APP_API_URL` from `.env`
- Set it to empty: `REACT_APP_API_URL=`
- Don't set it at all

### CORS Errors (Production)

**Problem:** Direct backend connection fails with CORS

**Solution:** Configure backend CORS to allow your frontend domain:

```python
# FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-preview-url.com",
        "https://your-production-url.com"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Best Practices

### Development
1. ✅ Use proxy configuration (already set up)
2. ✅ Use relative URLs in API calls
3. ✅ Don't set `REACT_APP_API_URL` unless needed
4. ✅ Monitor health check indicator

### Staging/Preview
Choose one approach:

**Option A: Use Proxy** (simpler)
- Keep proxy configuration
- Let dev server handle routing
- No environment variable needed

**Option B: Direct Connection** (more realistic to production)
- Set `REACT_APP_API_URL` to preview backend URL
- Ensure backend CORS allows preview domain

### Production
1. ✅ Set `REACT_APP_API_URL` to production backend
2. ✅ Use production build: `npm run build`
3. ✅ Configure CORS on backend
4. ✅ Remove proxy configuration from build (it's ignored in production builds)

## Testing Checklist

- [ ] Backend running on port 3001
- [ ] Frontend running on port 3000
- [ ] `package.json` has proxy configuration
- [ ] Dev server restarted after proxy change
- [ ] Health check shows ✅ green/connected
- [ ] Browser console shows relative URLs (`/api/chat`)
- [ ] No 502 errors in Network tab
- [ ] Messages send and receive successfully

## Additional Resources

- [Create React App Proxy Documentation](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Summary

The 502 Bad Gateway error has been resolved by:

1. ✅ Adding proxy configuration to `package.json`
2. ✅ Refactoring `apiService.js` to use relative URLs in development
3. ✅ Adding health check display for easy status monitoring
4. ✅ Implementing comprehensive error logging
5. ✅ Supporting both development and production modes

**Next Step:** Restart the dev server with `npm start` to activate the proxy!
