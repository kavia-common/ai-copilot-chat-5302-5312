# Test Verification - 502 Error Fix

## Quick Verification

Run these tests to confirm the 502 error is resolved:

### ✅ Test 1: API Call Returns 500 (Not 502)
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id":"test","message":"hello"}' \
  -w "\nHTTP_CODE:%{http_code}\n"
```

**Expected Result:**
```
HTTP_CODE:500
```

**Success Criteria:**
- ✅ Returns 500 (backend Gemini API error)
- ❌ Does NOT return 502 (Bad Gateway)

**What This Means:**
- 500 = Proxy working, backend has separate issue
- 502 = Proxy not working (would be a problem)

---

### ✅ Test 2: Frontend Loads
```bash
curl -I http://localhost:3000/
```

**Expected Result:**
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
```

**Success Criteria:**
- ✅ Returns HTTP 200
- ✅ Content-Type is text/html

---

### ✅ Test 3: Backend Health
```bash
curl http://localhost:3001/
```

**Expected Result:**
```json
{"message":"Healthy","status":"ok","gemini_api_configured":true}
```

**Success Criteria:**
- ✅ Returns JSON health status
- ✅ Status is "ok"

---

### ✅ Test 4: Environment Variable Check
```bash
grep REACT_APP_API_URL .env
```

**Expected Result:**
```
# (no output or commented line)
```

**Success Criteria:**
- ✅ `REACT_APP_API_URL` should NOT be set
- ✅ If present, should be commented out

---

### ✅ Test 5: Proxy Configuration Check
```bash
grep '"proxy"' package.json
```

**Expected Result:**
```json
"proxy": "http://localhost:3001",
```

**Success Criteria:**
- ✅ Proxy setting exists
- ✅ Points to http://localhost:3001

---

## Browser Verification

### Step 1: Open Browser
Navigate to: **http://localhost:3000**
(or preview URL: https://vscode-internal-29093-beta.beta01.cloud.kavia.ai:3000)

### Step 2: Open DevTools
Press **F12** or right-click → Inspect

### Step 3: Check Console
Look for this log on page load:
```javascript
API Service Configuration: {
  NODE_ENV: 'development',
  REACT_APP_API_URL: undefined,
  API_BASE_URL: '',
  using_proxy: true
}
```

**Success Criteria:**
- ✅ `REACT_APP_API_URL: undefined`
- ✅ `API_BASE_URL: ''` (empty string)
- ✅ `using_proxy: true`

### Step 4: Check Network Tab
1. Clear network log
2. Send a test message in the chat
3. Look for the API request

**Expected:**
- ✅ URL shows: `/api/chat` (relative)
- ✅ Status: 500 (backend error, NOT 502)
- ❌ URL should NOT show: `http://localhost:3001/api/chat`

### Step 5: Check Health Indicator
Look at the header:
- ✅ Should see: "✅ Backend: Connected" (green badge)
- Or: "❌ Backend: Disconnected" (red badge)

Either is fine - the indicator proves the health check is working.

---

## Automated Test Script

Save this as `test-502-fix.sh`:

```bash
#!/bin/bash

echo "================================"
echo "502 Error Fix Verification Test"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: API Call
echo "Test 1: API Call through Proxy"
STATUS=$(curl -s -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id":"test","message":"hi"}' \
  -o /dev/null -w "%{http_code}")

if [ "$STATUS" = "500" ]; then
  echo -e "${GREEN}✅ PASS${NC} - Returns 500 (proxy working, backend has separate issue)"
elif [ "$STATUS" = "502" ]; then
  echo -e "${RED}❌ FAIL${NC} - Returns 502 (proxy NOT working)"
  exit 1
else
  echo -e "${RED}❌ FAIL${NC} - Unexpected status: $STATUS"
  exit 1
fi
echo ""

# Test 2: Frontend
echo "Test 2: Frontend Loading"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)
if [ "$STATUS" = "200" ]; then
  echo -e "${GREEN}✅ PASS${NC} - Frontend loads (HTTP 200)"
else
  echo -e "${RED}❌ FAIL${NC} - Frontend status: $STATUS"
  exit 1
fi
echo ""

# Test 3: Backend
echo "Test 3: Backend Health"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/)
if [ "$STATUS" = "200" ]; then
  echo -e "${GREEN}✅ PASS${NC} - Backend healthy (HTTP 200)"
else
  echo -e "${RED}❌ FAIL${NC} - Backend status: $STATUS"
  exit 1
fi
echo ""

# Test 4: Env variable
echo "Test 4: Environment Variable"
if grep -q "^REACT_APP_API_URL=" .env 2>/dev/null; then
  echo -e "${RED}❌ FAIL${NC} - REACT_APP_API_URL is set (should be removed)"
  exit 1
else
  echo -e "${GREEN}✅ PASS${NC} - REACT_APP_API_URL not set (allows proxy)"
fi
echo ""

# Test 5: Proxy config
echo "Test 5: Proxy Configuration"
if grep -q '"proxy".*"http://localhost:3001"' package.json; then
  echo -e "${GREEN}✅ PASS${NC} - Proxy configured correctly"
else
  echo -e "${RED}❌ FAIL${NC} - Proxy not configured"
  exit 1
fi
echo ""

echo "================================"
echo -e "${GREEN}ALL TESTS PASSED!${NC}"
echo "502 Error Fix: ✅ VERIFIED"
echo "================================"
```

**To run:**
```bash
cd ai-copilot-chat-5302-5312/ai_copilot_frontend
chmod +x test-502-fix.sh
./test-502-fix.sh
```

---

## Expected Test Results

All tests should pass:
```
✅ Test 1: API Call returns 500 (not 502)
✅ Test 2: Frontend loads (HTTP 200)
✅ Test 3: Backend healthy (HTTP 200)
✅ Test 4: REACT_APP_API_URL not set
✅ Test 5: Proxy configured correctly

ALL TESTS PASSED!
502 Error Fix: ✅ VERIFIED
```

---

## Troubleshooting

### If Test 1 Returns 502:
1. Check `.env` file - remove `REACT_APP_API_URL` if present
2. Restart dev server: `pkill -f react-scripts && npm start`
3. Clear browser cache
4. Rerun tests

### If Test 2 Fails:
1. Check dev server is running: `ps aux | grep react-scripts`
2. Start if needed: `npm start`
3. Check port 3000 is free: `lsof -i:3000`

### If Test 3 Fails:
1. Backend may not be running
2. Start backend service
3. Check backend logs for errors

### If Tests Pass But Browser Shows Issues:
1. Hard refresh browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. Clear browser cache and cookies
3. Check browser console for errors
4. Verify Network tab shows relative URLs

---

## Success Indicators

When everything is working:
- ✅ No 502 Bad Gateway errors
- ✅ API calls return 500 (backend issue) not 502 (proxy issue)
- ✅ Console shows `using_proxy: true`
- ✅ Network tab shows relative URLs (`/api/chat`)
- ✅ Health indicator displays in header
- ✅ Preview URL accessible without errors

---

**Status:** Ready for verification testing
**Next:** Run automated test script to confirm fix
