# Troubleshooting 502 Bad Gateway Errors

## Quick Diagnosis Checklist

If you encounter a **502 Bad Gateway** error, follow these steps:

### 1. Check if the React Dev Server is Running
```bash
ps aux | grep node | grep :3000
lsof -i :3000
```

Expected: You should see a Node.js process listening on port 3000.

### 2. Verify Environment Variables
```bash
cat .env
```

Required variables:
- `REACT_APP_API_URL` (must be present!)
- Example: `REACT_APP_API_URL=http://localhost:3001`

⚠️ **Critical**: Environment variables MUST start with `REACT_APP_` to be accessible in React.

### 3. Check for Compilation Errors
Look at the terminal where `npm start` is running. You should see:
```
Compiled successfully!
You can now view react-kavia in the browser.
```

If you see errors, fix them before proceeding.

### 4. Test Local Access
```bash
curl http://localhost:3000
```

Expected: Should return HTML with `<div id="root"></div>`.

### 5. Verify Backend Connectivity
```bash
curl http://localhost:3001/
```

Expected: Should return a health check response like:
```json
{"message":"Healthy","status":"ok"}
```

### 6. Check CORS Configuration
The backend must allow requests from your frontend origin. Test:
```bash
curl -H "Origin: https://your-frontend-url" -X OPTIONS http://localhost:3001/api/chat -v
```

Look for: `access-control-allow-origin` in the response headers.

## Common Causes of 502 Errors

### Cause 1: Missing or Incorrect Environment Variables
**Symptom**: App starts but API calls fail
**Fix**: 
1. Ensure `.env` file exists
2. Check `REACT_APP_API_URL` is set correctly
3. Restart dev server after changing `.env`

### Cause 2: React App Not Running
**Symptom**: nginx error or connection refused
**Fix**:
```bash
cd ai_copilot_frontend
npm start
```

### Cause 3: Port Conflict
**Symptom**: Port 3000 already in use
**Fix**:
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Cause 4: Build/Compilation Errors
**Symptom**: Dev server starts but pages don't load
**Fix**:
1. Check terminal for error messages
2. Fix any import errors or syntax issues
3. Clear cache if needed:
   ```bash
   rm -rf node_modules/.cache
   npm start
   ```

### Cause 5: Backend Not Accessible
**Symptom**: Frontend loads but API calls fail
**Fix**:
1. Verify backend is running on port 3001
2. Check backend URL in `.env`
3. Test backend health endpoint

### Cause 6: nginx Misconfiguration (Production)
**Symptom**: 502 only in production/preview
**Fix**:
1. Check nginx is running: `ps aux | grep nginx`
2. Verify nginx config points to correct port
3. Check nginx error logs: `/var/log/nginx/error.log`

## Quick Fix Commands

### Restart Everything
```bash
# Kill processes
pkill -f "react-scripts start"

# Restart
cd ai_copilot_frontend
npm start
```

### Clean Restart
```bash
# Full cleanup
rm -rf node_modules package-lock.json
npm install
npm start
```

### Check Logs
```bash
# React dev server output
# (Look at terminal where npm start is running)

# System logs
journalctl -xe

# nginx logs (if applicable)
tail -f /var/log/nginx/error.log
```

## Environment-Specific Issues

### Development (localhost)
- Backend URL should be: `http://localhost:3001`
- Both frontend and backend run on localhost
- No proxy needed

### Preview/Staging
- Backend must be accessible via public URL or domain
- Update `REACT_APP_API_URL` to point to backend URL
- Ensure CORS allows preview domain

### Production
- Use production backend URL
- Build with: `npm run build`
- Serve static files via nginx or CDN
- Configure nginx to proxy API requests

## Still Having Issues?

1. **Check Browser Console**: Open DevTools (F12) and look for errors
2. **Network Tab**: Check if API requests are being made and their status
3. **Verify Ports**: Ensure nothing else is using port 3000
4. **Check Firewall**: Ensure port 3000 is not blocked
5. **Review Recent Changes**: Did you modify any config files?

## Prevention Tips

1. ✅ Always use `.env.example` to document required variables
2. ✅ Test locally before deploying
3. ✅ Keep environment variables consistent across environments
4. ✅ Monitor dev server output for warnings
5. ✅ Use `npm ci` instead of `npm install` in CI/CD
6. ✅ Don't commit `.env` file to version control

## Success Indicators

When everything is working correctly:
- ✅ `npm start` completes without errors
- ✅ Browser shows React app (not 502 error)
- ✅ No console errors in browser DevTools
- ✅ API calls succeed (check Network tab)
- ✅ Backend health check passes
