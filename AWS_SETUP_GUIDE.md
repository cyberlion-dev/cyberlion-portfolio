# AWS Setup Guide for Christmas Drawing App

This guide will walk you through setting up AWS infrastructure for the Christmas Drawing app. You'll learn about S3, Lambda, API Gateway, and IAM along the way!

## Prerequisites

- AWS Account (free tier eligible)
- AWS CLI installed (optional but recommended)
- Basic understanding of command line

## Architecture Overview

```
Frontend (Firebase Hosting)
    ↓
API Gateway (REST API)
    ↓
Lambda Function (Node.js)
    ↓
S3 Bucket (JSON storage)
```

---

## Step 1: Create an S3 Bucket

S3 (Simple Storage Service) is AWS's object storage - think of it like a super reliable hard drive in the cloud.

### Via AWS Console:

1. Go to [S3 Console](https://console.aws.amazon.com/s3)
2. Click **"Create bucket"**
3. Settings:
   - **Bucket name**: `christmas-drawing-data` (must be globally unique, so add your name if taken)
   - **Region**: Choose closest to you (e.g., `us-east-1`)
   - **Block all public access**: ✅ KEEP CHECKED (we'll use Lambda to access it)
   - Leave other settings as default
4. Click **"Create bucket"**

**What you learned:** S3 buckets are private by default. We're keeping it locked down and only Lambda will have access.

---

## Step 2: Create an IAM Role for Lambda

IAM (Identity and Access Management) controls who/what can access AWS services. Lambda needs permission to read/write to S3.

### Via AWS Console:

1. Go to [IAM Console](https://console.aws.amazon.com/iam)
2. Click **"Roles"** in left sidebar
3. Click **"Create role"**
4. **Trusted entity type**: AWS service
5. **Use case**: Lambda → Click **"Next"**
6. **Permissions**: Search and select these policies:
   - `AWSLambdaBasicExecutionRole` (for CloudWatch logs)
   - Click **"Next"**
7. **Role name**: `ChristmasDrawingLambdaRole`
8. Click **"Create role"**

### Add S3 Permissions to the Role:

1. Find your new role in the list and click it
2. Click **"Add permissions"** → **"Create inline policy"**
3. Click **"JSON"** tab
4. Paste this policy (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

5. Click **"Review policy"**
6. **Name**: `S3ChristmasDrawingAccess`
7. Click **"Create policy"**

**What you learned:** IAM roles define permissions. Lambda assumes this role and gets S3 access. This is the "principle of least privilege" - only grant the minimum permissions needed.

---

## Step 3: Create the Lambda Function

Lambda runs your code without managing servers. You only pay when your code runs!

### Via AWS Console:

1. Go to [Lambda Console](https://console.aws.amazon.com/lambda)
2. Click **"Create function"**
3. Settings:
   - **Function name**: `ChristmasDrawingAPI`
   - **Runtime**: Node.js 20.x (or latest)
   - **Architecture**: x86_64
   - **Permissions**:
     - Expand "Change default execution role"
     - Select **"Use an existing role"**
     - Choose: `ChristmasDrawingLambdaRole`
4. Click **"Create function"**

### Upload Lambda Code:

#### Option A: ZIP Upload (Easiest)

1. On your computer, navigate to:
   ```
   C:\repos\jb_portfolio_site\jb-portfolio\app\christmas-drawing\lambda\
   ```

2. Open terminal/command prompt in that directory

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a ZIP file containing:
   - `index.js`
   - `package.json`
   - `node_modules/` folder

   **Windows (PowerShell):**
   ```powershell
   Compress-Archive -Path index.js,package.json,node_modules -DestinationPath lambda.zip
   ```

   **Mac/Linux:**
   ```bash
   zip -r lambda.zip index.js package.json node_modules/
   ```

5. Back in Lambda console:
   - Click **"Upload from"** → **".zip file"**
   - Upload your `lambda.zip`
   - Click **"Save"**

#### Option B: Inline Code (For testing)

1. In the Lambda console, scroll to **"Code source"**
2. Replace the default code with contents from `app/christmas-drawing/lambda/index.js`
3. Click **"Deploy"**
4. Note: You'll need to add the `@aws-sdk/client-s3` layer separately (Option A is easier)

### Configure Environment Variables:

1. Click the **"Configuration"** tab
2. Click **"Environment variables"** in left sidebar
3. Click **"Edit"**
4. Add these variables:
   - **Key**: `S3_BUCKET_NAME`, **Value**: Your bucket name (e.g., `christmas-drawing-data`)
   - **Key**: `AWS_REGION`, **Value**: Your region (e.g., `us-east-1`)
5. Click **"Save"**

**What you learned:** Lambda functions are event-driven and stateless. Environment variables keep configuration separate from code (best practice).

---

## Step 4: Create API Gateway

API Gateway creates a REST API endpoint that triggers your Lambda function.

### Via AWS Console:

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Click **"Create API"**
3. Choose **"REST API"** (not Private or HTTP API)
4. Click **"Build"**
5. Settings:
   - **Protocol**: REST
   - **Create new API**: New API
   - **API name**: `ChristmasDrawingAPI`
   - **Endpoint Type**: Regional
6. Click **"Create API"**

### Create Resource and Methods:

1. In the Resources panel, click **"Actions"** → **"Create Resource"**
   - **Resource Name**: `drawing`
   - **Resource Path**: `/drawing`
   - ✅ **Enable API Gateway CORS**
   - Click **"Create Resource"**

2. With `/drawing` selected, click **"Actions"** → **"Create Method"** → Select **"GET"** → Click ✓
   - **Integration type**: Lambda Function
   - ✅ **Use Lambda Proxy integration**
   - **Lambda Function**: `ChristmasDrawingAPI`
   - Click **"Save"**
   - Click **"OK"** to give API Gateway permission

3. With `/drawing` selected, click **"Actions"** → **"Create Method"** → Select **"POST"** → Click ✓
   - Same settings as GET
   - **Lambda Function**: `ChristmasDrawingAPI`
   - Click **"Save"** → **"OK"**

4. With `/drawing` selected, click **"Actions"** → **"Enable CORS"**
   - Keep defaults (allows all origins)
   - Click **"Enable CORS and replace existing CORS headers"**
   - Click **"Yes, replace existing values"**

### Deploy the API:

1. Click **"Actions"** → **"Deploy API"**
2. **Deployment stage**: [New Stage]
3. **Stage name**: `prod`
4. Click **"Deploy"**

### Get Your API URL:

1. After deploying, you'll see **"Invoke URL"** at the top
2. Copy this URL - it will look like:
   ```
   https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod
   ```
3. Your full endpoint will be:
   ```
   https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/drawing
   ```

**What you learned:** API Gateway is a managed service that creates REST APIs. It handles CORS, rate limiting, authentication, and more.

---

## Step 5: Test Your API

Let's make sure everything works!

### Test with cURL (or PowerShell):

**Get drawing history (should return empty):**

```bash
# Mac/Linux/Git Bash
curl https://YOUR-API-URL/prod/drawing

# Windows PowerShell
Invoke-RestMethod -Uri "https://YOUR-API-URL/prod/drawing"
```

Expected response:
```json
{"years":[]}
```

**Post test data:**

```bash
# Mac/Linux/Git Bash
curl -X POST https://YOUR-API-URL/prod/drawing \
  -H "Content-Type: application/json" \
  -d '{"years":[{"year":2024,"assignments":[],"generatedDate":"2024-12-25","locked":false}]}'

# Windows PowerShell
$body = @{years=@(@{year=2024;assignments=@();generatedDate="2024-12-25";locked=$false})} | ConvertTo-Json
Invoke-RestMethod -Uri "https://YOUR-API-URL/prod/drawing" -Method Post -Body $body -ContentType "application/json"
```

**Get again to verify:**
```bash
curl https://YOUR-API-URL/prod/drawing
```

Should return the data you just posted!

---

## Step 6: Update Frontend Code

Now we need to update the React app to use your API instead of localStorage.

**Create a new file:** `app/christmas-drawing/api-config.ts`

```typescript
export const API_CONFIG = {
  baseUrl: 'https://YOUR-API-URL/prod',
  endpoints: {
    drawing: '/drawing'
  }
};
```

I'll update the main page component in the next step!

---

## Step 7: Security Improvements (Optional but Recommended)

### Update CORS to Your Domain:

1. In Lambda function code (`index.js`), change line 10:
   ```javascript
   "Access-Control-Allow-Origin": "https://your-firebase-app.web.app",
   ```

2. Redeploy Lambda (upload new ZIP)

### Add API Key (Rate Limiting):

1. In API Gateway, click **"API Keys"** → **"Actions"** → **"Create API Key"**
2. Create a usage plan and associate your API
3. Update Lambda to check for `x-api-key` header

---

## Costs & Free Tier

All of this fits comfortably in AWS Free Tier:

- **Lambda**: 1 million requests/month free
- **API Gateway**: 1 million requests/month free (first 12 months)
- **S3**: 5GB storage free, 20,000 GET requests/month
- **Estimated cost for this app**: **$0/month** 🎉

After free tier (if you exceed limits):
- Lambda: $0.20 per 1M requests
- API Gateway: $3.50 per 1M requests
- S3: ~$0.023 per GB/month

For a family app with 6 users, you'd never come close to these limits.

---

## Troubleshooting

### Lambda returns 500 error:
- Check CloudWatch Logs: Lambda Console → Monitor → View CloudWatch logs
- Verify environment variables are set
- Verify IAM role has S3 permissions

### CORS errors:
- Make sure you enabled CORS in API Gateway
- Verify OPTIONS method exists
- Check Lambda CORS headers

### S3 Access Denied:
- Verify bucket name in environment variable matches actual bucket
- Check IAM role has the inline policy for S3 access
- Verify the ARN in the policy matches your bucket name

---

## Next Steps

Once your API is working:
1. I'll update the frontend React code to use the API
2. You'll redeploy your static site to Firebase Hosting
3. Everyone in your family can access the same drawing!

---

## Useful AWS Resources for Learning

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [S3 Documentation](https://docs.aws.amazon.com/s3/)
- [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)
- [AWS Free Tier Details](https://aws.amazon.com/free/)

Good luck! 🎄🎅
