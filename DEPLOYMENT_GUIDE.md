# Deployment Guide - Christmas Drawing with AWS

This guide covers testing and deploying your updated Christmas Drawing app with AWS backend.

## Quick Start Checklist

- [ ] AWS infrastructure set up (S3, Lambda, API Gateway) - see `AWS_SETUP_GUIDE.md`
- [ ] API Gateway URL obtained
- [ ] Frontend code updated with API URL
- [ ] Tested locally
- [ ] Deployed to Firebase Hosting

---

## Step 1: Update API Configuration

After completing the AWS setup guide, you should have your API Gateway URL.

**Edit:** `app/christmas-drawing/api-config.ts`

Replace:
```typescript
baseUrl: 'YOUR_API_GATEWAY_URL_HERE',
```

With your actual URL (without trailing slash):
```typescript
baseUrl: 'https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod',
```

**Example:**
```typescript
export const API_CONFIG = {
  baseUrl: 'https://xyz789abc.execute-api.us-east-1.amazonaws.com/prod',
  endpoints: {
    drawing: '/drawing'
  }
};
```

---

## Step 2: Test Locally

Before deploying, test the app locally to make sure it connects to AWS.

### Build and Run:

```bash
# From the project root
cd C:\repos\jb_portfolio_site\jb-portfolio

# Install dependencies (if needed)
npm install

# Run development server
npm run dev
```

### Navigate to:
```
http://localhost:3000/christmas-drawing
```

### Test the Following:

1. **Login:**
   - Enter password: `cyberlion2024`
   - Should see the main drawing page

2. **Generate Drawing:**
   - Click "Generate 2025 Drawing" (or current year)
   - Should see 6 family assignments
   - Check browser console - no errors?

3. **Check AWS:**
   - Go to S3 Console
   - Open your bucket (`christmas-drawing-data`)
   - Should see `christmas-drawing-history.json` file
   - Download and open it - should contain your drawing data

4. **Refresh Page:**
   - Refresh the browser
   - Login again
   - Should see the same drawing (proves API is working!)

5. **Test Reveal/Hide:**
   - Click "Reveal" on any family
   - Should show the receiver
   - Refresh page and login - should still be hidden (reveal state is local)

6. **Test Lock/Delete:**
   - Try locking the year
   - Try deleting (should prompt confirmation)
   - Generate new drawing after deleting

### Troubleshooting Local Testing:

**CORS Error:**
```
Access to fetch at 'https://...' has been blocked by CORS policy
```
- Go back to API Gateway
- Make sure CORS is enabled on `/drawing` resource
- Redeploy the API (Actions → Deploy API → prod)

**API 404 Error:**
```
Failed to load resource: the server responded with a status of 404
```
- Check `api-config.ts` has correct URL
- Make sure URL includes `/prod` (or your stage name)
- Verify in API Gateway: should have `/drawing` resource with GET and POST methods

**API 500 Error:**
```
API error: 500
```
- Check Lambda CloudWatch logs (Lambda Console → Monitor → View CloudWatch logs)
- Verify Lambda environment variables are set (S3_BUCKET_NAME, AWS_REGION)
- Check IAM role has S3 permissions

**"Failed to load drawing history":**
- Open browser console (F12) to see detailed error
- Check network tab - is the request going to the right URL?
- Is your API Gateway deployed?

---

## Step 3: Build for Production

Once local testing works, build the production version:

```bash
# From project root
npm run build
```

This creates an optimized production build in the `out/` or `.next/` directory.

---

## Step 4: Deploy to Firebase Hosting

### If using Firebase Hosting (static export):

1. **Make sure `next.config.js` has static export enabled:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // ... other config
};
```

2. **Build static export:**

```bash
npm run build
# Should create an 'out' directory
```

3. **Deploy to Firebase:**

```bash
firebase deploy --only hosting
```

4. **Navigate to your live site:**
```
https://your-app.web.app/christmas-drawing
```

---

## Step 5: Final Security (Optional but Recommended)

### Lock Down CORS:

Right now, your API allows requests from anywhere (`Access-Control-Allow-Origin: *`). Let's lock it to your domain.

1. **Edit:** `app/christmas-drawing/lambda/index.js`

2. **Change line 10:**
```javascript
// Before:
"Access-Control-Allow-Origin": "*",

// After (use your actual Firebase URL):
"Access-Control-Allow-Origin": "https://your-app.web.app",
```

3. **Redeploy Lambda:**
```bash
cd app/christmas-drawing/lambda
npm install
# Create new lambda.zip (see AWS_SETUP_GUIDE.md Step 3)
# Upload to Lambda console
```

### Add Rate Limiting (Optional):

To prevent abuse, you can add API Gateway usage plans:

1. In API Gateway Console, go to **"Usage Plans"**
2. Create a new plan:
   - **Throttle**: 10 requests per second
   - **Quota**: 1000 requests per day
3. Associate with your API stage

---

## Step 6: Share with Family!

Everyone can now access the same drawing:

1. Share the URL: `https://your-app.web.app/christmas-drawing`
2. Share the password: `cyberlion2024`
3. Each person can:
   - View the drawing
   - Reveal their own assignment
   - See the same data (synced via AWS!)

**Important:** Only ONE person should generate the drawing! Everyone else just views it.

---

## Switching Between localStorage and API

The code has a toggle in case you need to test locally without AWS:

**In:** `app/christmas-drawing/page.tsx`

```typescript
const USE_API = true; // Set to false to use localStorage (for testing)
```

- `true`: Uses AWS API (production mode)
- `false`: Uses browser localStorage (local testing mode)

This is useful if:
- You want to test the UI without AWS
- AWS is down temporarily
- You want to develop new features locally

---

## Monitoring and Maintenance

### Check AWS Costs:

1. Go to [AWS Billing Dashboard](https://console.aws.amazon.com/billing/)
2. Should see $0.00 (within free tier)
3. Set up billing alerts if you want

### View Lambda Logs:

1. Lambda Console → Your function → Monitor tab
2. Click "View CloudWatch logs"
3. See every request/error

### View API Usage:

1. API Gateway Console → Your API → Stages → prod
2. See request count, errors, latency

### Backup Data:

Your drawing history is stored in:
```
S3 Bucket: christmas-drawing-data
File: christmas-drawing-history.json
```

To backup:
1. S3 Console → Your bucket
2. Download `christmas-drawing-history.json`
3. Save somewhere safe!

---

## Future Enhancements

Ideas for improving the app:

1. **Email Notifications:**
   - Use AWS SES to email each family their assignment
   - They don't even need to login!

2. **Admin Authentication:**
   - Replace simple password with AWS Cognito
   - Different permissions (admin can generate, others can only view)

3. **Gift Budget Tracking:**
   - Add budget field to each assignment
   - Track spending over years

4. **Wish Lists:**
   - Let each family add their gift preferences
   - Store in S3 alongside assignments

5. **Mobile App:**
   - Use React Native to create mobile version
   - Same AWS backend!

---

## Troubleshooting Production Issues

### Users can't see the drawing:

**Check:** Are they on the same device that generated it?
- **Solution:** Make sure `USE_API = true` in code
- Verify API URL is correct in `api-config.ts`

### Drawing disappeared:

**Check:** S3 bucket
- S3 Console → Your bucket → Look for `christmas-drawing-history.json`
- If missing, someone may have deleted it
- Restore from backup (if you made one)

### Different users see different drawings:

**Check:** Are they using the API?
- Open browser console (F12)
- Look for fetch requests to your API URL
- If no requests = still using localStorage
- **Solution:** Redeploy with `USE_API = true`

---

## Quick Reference

### Key Files:
- `app/christmas-drawing/page.tsx` - Main React component
- `app/christmas-drawing/api-config.ts` - API URL configuration
- `app/christmas-drawing/lambda/index.js` - Lambda function code
- `AWS_SETUP_GUIDE.md` - AWS infrastructure setup
- `DEPLOYMENT_GUIDE.md` - This file

### Key URLs:
- API Gateway: `https://console.aws.amazon.com/apigateway`
- Lambda: `https://console.aws.amazon.com/lambda`
- S3: `https://console.aws.amazon.com/s3`
- CloudWatch Logs: `https://console.aws.amazon.com/cloudwatch`
- Billing: `https://console.aws.amazon.com/billing`

### Useful Commands:
```bash
# Local development
npm run dev

# Build production
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# Create Lambda ZIP
cd app/christmas-drawing/lambda
npm install
Compress-Archive -Path index.js,package.json,node_modules -DestinationPath lambda.zip
```

---

## Success! 🎉

You've successfully:
- ✅ Created a serverless AWS backend
- ✅ Learned about S3, Lambda, API Gateway, and IAM
- ✅ Built a full-stack React application
- ✅ Deployed to Firebase Hosting
- ✅ Created a synced experience for your family

Merry Christmas! 🎄🎅

---

**Questions or Issues?**
- Check Lambda CloudWatch logs first
- Verify API Gateway is deployed
- Check browser console for errors
- Make sure CORS is enabled
